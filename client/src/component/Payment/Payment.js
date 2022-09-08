import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { createPayment } from "../../Redux/Actions/PaymentActions";

const Payment = ({amount}) => {

  const dispatch = useDispatch()
  const userRed = useSelector(state => state.userReducer)
  const navigate = useNavigate()
  const {user} = userRed
  console.log(userRed);

  const onToken = (token) => {
    const data = {
      token , 
      amount , 
      userEmail : user.email 
    }
    dispatch(createPayment(data , navigate))
  };

  return (
    <StripeCheckout
      token={onToken}
      stripeKey="pk_test_51KFa1sJkRFJsB3tsiyFHDmahGyqU25bPIVIYfEI3F2lye4SwLprDQGmeukh7kEO8SNRwkyfHxyjmzrbagFTLtqwC00XCFOhu1Z"
      amount={amount*1000}
      currency="BDT"
    >
      <button className="btn btn-dark">be a premium member</button>
    </StripeCheckout>
  );
};

export default Payment;
