import React from "react";
import "./adminSidebar.css";
import { NavLink } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { FaUsersCog } from "react-icons/fa";
import { MdCreateNewFolder, MdQuiz } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import Loader from '../../UI/Loader/Loader'

const AdminSidebar = () => {
  const userRed = useSelector((state) => state.userReducer);
  const { loading , user } = userRed;


  if(loading === true && user === null ){
    return <Loader/>
  }


  return (
    <div className="bg-slate-800 text-white p-3 rounded-md mt-5 space-y-5">
      <NavLink
        to="/admin/"
        className={({ isActive }) =>
          isActive ? "active_link nav-link link" : "nav-link link"
        }
      >
        <div className="flex items-center space-x-2 justify-center md:justify-start text-xl">
          <AiFillDashboard className="text-2xl" /> <span>Dashboard</span>
        </div>
      </NavLink>
      {(loading === false && user === null) ? (null) : (
        <>
          <NavLink
            to="all_quiz"
            className={({ isActive }) =>
              isActive ? "active_link nav-link link" : "nav-link link"
            }
          >
            <div className="flex items-center space-x-2 justify-center md:justify-start text-xl">
              <MdQuiz className="text-2xl" /> <span> All Quiz</span>
            </div>
          </NavLink>
          <NavLink
            to="create"
            className={({ isActive }) =>
              isActive ? "active_link nav-link link" : "nav-link link"
            }
          >
            <div className="flex items-center space-x-2 justify-center md:justify-start text-xl">
              <MdCreateNewFolder className="text-2xl" />{" "}
              <span> Create Quiz</span>
            </div>
          </NavLink>
          <NavLink
            to="all_users"
            className={({ isActive }) =>
              isActive ? "active_link nav-link link" : "nav-link link"
            }
          >
            <div className="flex items-center space-x-2 justify-center md:justify-start text-xl">
              <FaUsersCog className="text-2xl" /> <span>Users</span>
            </div>
          </NavLink>
          <NavLink
            to="payments"
            className={({ isActive }) =>
              isActive ? "active_link nav-link link" : "nav-link link"
            }
          >
            <div className="flex items-center space-x-2 justify-center md:justify-start text-xl">
              <RiSecurePaymentFill className="text-2xl" /> <span>Payments</span>
            </div>
          </NavLink>
        </>
      )}
    </div>
  );
};

export default AdminSidebar;
