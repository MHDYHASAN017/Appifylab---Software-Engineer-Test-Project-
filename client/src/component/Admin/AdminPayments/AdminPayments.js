import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPayment } from "../../../Redux/Actions/PaymentActions";
import Heading from "../../UI/Heading/Heading";
import Message from "../../UI/Message/Message";

const AdminPayments = () => {
  const userRed = useSelector((state) => state.userReducer);
  const {  loading, user } = userRed;
  const paymentRed = useSelector((state) => state.paymentReducer);
  const { payments } = paymentRed;
  console.log(payments);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPayment());
  }, [dispatch]);

  if (payments.length === 0) {
    return <div>Loading</div>;
  }

  if (loading === false && user === null) {
    return (
      <div>
        <Message />
      </div>
    );
  }
  if (loading === false && user !== null && user.isAdmin === false) {
    return (
      <div>
        <Message />
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div>
        <Heading heading="All Payment Records" />

        <div className="row my-5">
          {payments.map((pay, idx) => (
            <div key={idx} className="col-12 space-y-3 card p-3">
              <div className="text-3xl">UserId : {pay.userId}</div>
              <div className="text-3xl">Email : {pay.email}</div>
              <div className="text-3xl">
                TransactionId : {pay.transactionId}
              </div>
              <div className="text-3xl">
                Payment Time : {pay.createdAt.slice(0, 10)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
