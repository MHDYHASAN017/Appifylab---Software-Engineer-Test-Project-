import Heading from "../../UI/Heading/Heading";
import "./register.css";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../Redux/Actions/userActions";

const Register = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const dispatch = useDispatch();

  const userRed = useSelector((state) => state.userReducer);

  const { user, message } = userRed;

  const handleSubmitForm = async (data) => {
    // console.log();
    dispatch(registerUser(data));
    reset();
  };
  if (message !== "") {
    return <Navigate to="/login" replace />;
  }
  if (user !== null && message === "") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container">
      <Heading heading="Register" orange  className='py-3'/>
      <div className="row my-3">
        <div className="col-md-6 col-lg-4 mx-auto">
          <form onSubmit={handleSubmit(handleSubmitForm)}>
            <div className="form-group">
              <h4>
                {errors.username && <span>please enter a user name</span>}
              </h4>
              <input
                type="text"
                className="form-control"
                placeholder="enter user name"
                {...register("username", {
                  required: true,
                })}
              />
            </div>
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
            <button className="btn btn-dark mt-3 col-12">Register</button>
          </form>
          <div className="mt-4">
            <Link to="/login" className="register__redirect">
              login your account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
