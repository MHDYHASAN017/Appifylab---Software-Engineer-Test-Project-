import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsFillTrashFill } from "react-icons/bs";
import { getAllQuiz  } from "../../../Redux/Actions/QuizActions";
import { deleteQuiz } from "../../../Redux/Actions/AdminQuizAction";
import Heading from "../../UI/Heading/Heading";
import Loader from "../../UI/Loader/Loader";
import Message from "../../UI/Message/Message";

const AdminAllQuiz = () => {
  const quizRed = useSelector((state) => state.quizReducer);
  const userRed = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { loading, allQuiz } = quizRed;


  const {user} = userRed

  useEffect(() => {
    dispatch(getAllQuiz());
  }, [dispatch,allQuiz.length]);

  if (loading === true) {
    return <Loader />;
  }

  if(loading === false && user === null ){
    return <Message/>
  }
  if(loading === false && user !== null && user.isAdmin === false ){
    return <div><Message/></div>
  }

  return (
    <div className="mt-10">
      <Heading heading="all quiz" />
      <div className="container mt-3">
        {allQuiz.map((quiz) => (
          <div key={quiz._id} className="row">
            <div className="col-8">
              <div className="card p-2 mt-2">
                <div className="text-3xl mt-2 mb-3">{quiz.quizname}</div>
                <Link to={`quiz/details/${quiz._id}`}>
                  <button className="btn btn-danger">View Quiz Details</button>
                </Link>
              </div>
            </div>
            <div className="col-3 flex justify-end">
              <div className="p-2 mt-2">
                <div className="text-3xl cursor-pointer btn btn-danger">
                  <BsFillTrashFill onClick={() => dispatch(deleteQuiz(quiz._id))} className=""/>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAllQuiz;
