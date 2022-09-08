import React from "react";
import { Route, Routes } from "react-router-dom";
import AddQuiz from "./AddQuiz/AddQuiz";
import AdminAllQuiz from "./AdminAllQuiz/AdminAllQuiz";
import AdminQuizDetails from "./AdminQuizDetails/AdminQuizDetails";
import AdminAllUsers from "./AdminAllUsers/AdminAllUsers";
import AdminUserDetails from './AdminUserDetails/AdminUserDetails'
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import Dashboard from "./Dashboard/Dashboard";
import AdminPayments from "./AdminPayments/AdminPayments";

const Admin = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <AdminSidebar />
        </div>
        <div className="col-md-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<AddQuiz />} />
            <Route path="/all_quiz" element={<AdminAllQuiz />} />
            <Route path="/all_quiz/quiz/details/:id" element={<AdminQuizDetails />} />
            <Route path="/all_users" element={<AdminAllUsers/>} />
            <Route path="/payments" element={<AdminPayments/>} />
            <Route path="/user/details/:id" element={<AdminUserDetails/>} />
            {/* <Route path="/create" element={<AddQuiz />} /> */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
