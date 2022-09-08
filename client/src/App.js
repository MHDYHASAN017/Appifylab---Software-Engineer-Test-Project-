import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./component/Admin/Admin";
import Header from "./component/Header/Header";
import HomeScreen from "./component/Screens/HomeScreen/HomeScreen";
import QuizScreen from "./component/Screens/QuizScreen/QuizScreen";
import Login from "./component/Auth/Login/Login";
import Register from "./component/Auth/Register/Register";
// import Profile from './component/Auth/Profile/Profile'

import { clearMessage, loadCurrentUser } from "./Redux/Actions/userActions";
import Profile from "./component/Auth/Profile/Profile/Profile";

function App() {
  const userRed = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { message } = userRed;

  // console.log(message);

  useEffect(() => {
    if (message !== "") {
      toast.info(message, {
        position: toast.POSITION.TOP_MIDDLE,
        theme: "dark",
      });
    }
    dispatch(clearMessage());
    if (localStorage.getItem("token")) {
      dispatch(loadCurrentUser());
    }
  }, [message, dispatch]);

  return (
    <div className="custom_font">
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="/quiz/:id" element={<QuizScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
