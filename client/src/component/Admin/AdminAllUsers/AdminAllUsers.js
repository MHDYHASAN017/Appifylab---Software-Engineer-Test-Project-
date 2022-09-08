import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillTrashFill } from "react-icons/bs";
import { deleteUser, getAllUser } from "../../../Redux/Actions/userActions";
import Heading from "../../UI/Heading/Heading";
import Loader from "../../UI/Loader/Loader";
import Message from "../../UI/Message/Message";

const AdminAllUsers = () => {
  const dispatch = useDispatch();
  const userRed = useSelector((state) => state.userReducer);
  const { users, loading, user } = userRed;

  useEffect(() => {
    dispatch(getAllUser());
  }, [users.length, dispatch]);

  if (loading === true) {
    return <Loader />;
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
      <Heading heading="All Users" />

      <div className="row my-5">
        {users.map((user, idx) => (
          <div key={idx} className=" col-12 mt-2">
            <div className="space-y-3 card p-3">
              <div className="text-3xl">Username : {user.username}</div>
              <div className="text-3xl">Email : {user.email}</div>
              <div className="text-3xl">
                Admin status : {user.isAdmin ? "Admin" : "Not Admin"} member
              </div>
              <div className="text-3xl">
                Payment Status : {user.isPaid ? "Paid" : "Free"} user
              </div>
            </div>
            <div className="mb-5 mt-2">
              <button
                onClick={() => dispatch(deleteUser(user._id))}
                className="flex items-center space-x-2 bg-[#000] text-white py-2 px-10 rounded-md"
              >
                <span>
                  <BsFillTrashFill />
                </span>
                <span>delete this user</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAllUsers;
