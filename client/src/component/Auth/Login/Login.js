import Heading from "../../UI/Heading/Heading";
import "./login.css";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../Redux/Actions/userActions";

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const userRed = useSelector((state) => state.userReducer);

  const { user } = userRed;

  // console.log(userRed);

  const handleSubmitForm = async (data) => {
    // console.log(data);
    dispatch(loginUser(data));
    reset();
  };

  if (user !== null) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container">
      <Heading heading="Login" className="py-3" />
      <div className="row my-3">
        <div className="col-md-6 col-lg-4 mx-auto">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="form-group">
              <h4>{errors.email && <span>please enter a valid email</span>}</h4>
              <input
                type="email"
                className="form-control"
                placeholder="enter email"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
              />
            </div>
            <div className="form-group">
              <h4>
                {errors.password && (
                  <span>password length more then 5 characture</span>
                )}
              </h4>
              <input
                className="form-control"
                type="text"
                placeholder="enter password"
                {...register("password", {
                  required: true,
                  minLength: 5,
                })}
              />
            </div>
            <button className="btn btn-dark mt-3 col-12">Login</button>
          </form>
          <div className=" mt-4">
            <Link to="/register" className="login__redirect">
              create a account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
