const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51KFa1sJkRFJsB3tspZvRCjnyy9KmLYN1WKgZxNb1ICnbFSylrgeWgXn37kEYgFHfY7vqlx5xOFIyl0YpaUNXBkzN00CFt0PtvY"
);
const User = require("../models/userSchema");
const Payment = require("../models/paymentModel");

const createPayment = asyncHandler(async (req, res) => {
  const { token, amount, userEmail } = req.body.data;

  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id,
  });

  const payment = await stripe.charges.create(
    {
      amount: amount * 1000,
      currency: "BDT",
      customer: customer.id,
      receipt_email: token.email,
    },
    {
      idempotencyKey: uuidv4(),
    }
  );

  if (!payment) {
    res.status(400);
    throw new Error("Something Went Wrong");
  } else {
    const findUser = await User.findOne({ email: userEmail });
    findUser.isPaid = true;
    const updateUser = await findUser.save();

    const savePayment = await Payment({
      userId: updateUser._id,
      transactionId: payment.source.id,
      name: updateUser.name,
      email: updateUser.email,
    });

    const pay = await savePayment.save();

    const allUser = await User.find();
    return res.status(200).json({
      allUser: allUser,
      updateUser: updateUser,
      pay: pay,
      message: "payment successfully",
    });
  }
});

const getAllPayment = asyncHandler(async (req, res) => {
  const allPay = await Payment.find({});
  if (!allPay) {
    res.status(400);
    throw new Error("Something Went Wrong");
  } else {
    return res.status(200).json({
      allPay: allPay,
    });
  }
});

module.exports = { createPayment, getAllPayment };
