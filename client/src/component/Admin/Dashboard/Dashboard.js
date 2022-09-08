import React from "react";
import { useSelector } from "react-redux";
import Heading from "../../UI/Heading/Heading";

const Dashboard = () => {
  const userRed = useSelector((state) => state.userReducer);
  const {  user } = userRed;

  return (
    <div className="mt-10">
      <Heading heading="dashboard" />

      {user === null ? (
        <>
          <div className="text-3xl mt-5">Vai <span className="text-5xl">Login</span> Koren!</div>
          <img src="" alt="" />
        </>
      ) : (
        <>
          <div className="text-4xl mt-4">
            {user.isAdmin === true
              ? "WelCome To DashBoard"
              : "Admin Na Hoye e Admin Page Ashchen :) , Plz Podma Setur moto Site er Nut Khule felien na!! "}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
