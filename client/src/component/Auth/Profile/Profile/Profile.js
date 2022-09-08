import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../../UI/Loader/Loader"

import "./profile.css";

const Profile = () => {
  const userRed = useSelector((state) => state.userReducer);

  const { loading, user, isAuth  } = userRed;

  console.log(userRed);


  if (loading === true && isAuth === false) {
    return <Loader />;
  }
  if (loading === false && isAuth === false) {
    return <div className="text-2xl">user not authenticated</div>;
  }

  return (
    <div className="row">
      <div className="col-md-6 col-lg-4 mx-auto my-5 text-center">
        <div className="card p-3">
          <div className="text-xl">{user.username}</div>
          <div className="text-xl">{user.email}</div>
          <div className="text-xl">{user.message}</div>
          <div className="text-xl">{user.isAdmin ? "Admin User" : "Non Admin User"}</div>
          <div className="text-xl">{user.isPaid ? "Premium User" : "Free User"}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
