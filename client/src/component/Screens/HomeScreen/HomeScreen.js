import React, { useEffect } from "react";
import "./homeScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterQuizType, getAllQuiz } from "../../../Redux/Actions/QuizActions";
import Payment from "../../Payment/Payment";

const HomeScreen = () => {
  const quizRed = useSelector((state) => state.quizReducer);
  const userRed = useSelector((state) => state.userReducer);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allQuiz } = quizRed;
  const { isAuth, user } = userRed;
  // console.log(userRed);
  // console.log(user);

  useEffect(() => {
    dispatch(getAllQuiz());
  }, [dispatch]);

  const handleQuizTypeChange = (e) => {
    e.preventDefault()
    dispatch(filterQuizType(e.target.value))
  }

  // const buttons = ()

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="mb-3">
          <select onChange={handleQuizTypeChange} className='bg-orange-600 text-white py-1 px-5'>
            <option value="all" className="bg-slate-800 text-white">All</option>
            <option value="free" className="bg-slate-800 text-white">Free</option>
            <option value="paid" className="bg-slate-800 text-white">Paid</option>
          </select>
        </div>
      </div>
      <div className="row">
        {allQuiz.map((quiz) => (
          <div key={quiz._id} className="col-md-6 my-2">
            <div className="card p-3 bg_color cursor-pointer">
              <div className="flex space-x-4">
                <div className="w-48">
                  <img
                    src={quiz.picture}
                    className="h-full w-full object-cover img-fluid rounded-md"
                    alt="quiz_cover_pic"
                  />
                </div>
                <div className=" space-y-4">
                  <div className="text-3xl">{quiz.quizname}</div>
                  <div className="text-2xl">quiz type : {quiz.quiztype}</div>
                  <div className="text-2xl">
                    quiz time : {quiz.allquestiontime} min
                  </div>
                  <div className="text-2xl">
                    can retake : {quiz.numofretake} times
                  </div>
                  <div className="text-2xl">
                    quiz submissions : {quiz.users.length}
                  </div>
                  <div className="flex flex-col space-y-3">
                    {isAuth === false ? (
                      <>
                        <button className="btn btn-danger">
                          <Link
                            to={`/login`}
                            className="text-white no-underline"
                          >
                            please login to take test
                          </Link>
                        </button>
                      </>
                    ) : (
                      <>
                        {/* {quiz} */}
                        {quiz.quiztype === "paid" && user.isPaid === true ? (
                          <>
                            <button disabled={false} className="btn btn-danger">
                              <Link
                                to={`/quiz/${quiz._id}`}
                                className="text-white no-underline"
                              >
                                test yourself
                              </Link>
                            </button>
                          </>
                        ) : null}
                        {quiz.quiztype === "free" && (
                          <>
                            <button disabled={false} className="btn btn-danger">
                              <Link
                                to={`/quiz/${quiz._id}`}
                                className="text-white no-underline"
                              >
                                test yourself
                              </Link>
                            </button>
                          </>
                        )}
                        {user.isPaid === false ? <Payment amount={17} /> : null}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
