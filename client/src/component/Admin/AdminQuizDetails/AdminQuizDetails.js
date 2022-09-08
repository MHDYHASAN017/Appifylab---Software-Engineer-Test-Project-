import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleQuiz } from "../../../Redux/Actions/QuizActions";
import Heading from "../../UI/Heading/Heading";
import Loader from "../../UI/Loader/Loader";

const AdminQuizDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const quizRed = useSelector((state) => state.quizReducer);
  const { singleQuiz, loading } = quizRed;
  console.log(singleQuiz);

  useEffect(() => {
    dispatch(getSingleQuiz(params.id));
  }, [dispatch, params.id]);

  if (loading === true || singleQuiz === null) {
    return <Loader />;
  }

  return (
    <div className="mt-10">
      <Heading heading="Quiz Details" />

      <Link to="/admin/all_quiz" className="btn btn-dark my-3">
        Go To All Quiz
      </Link>

      <div className="row">
        <div className="col-md-3 h-48">
          <img
            src={singleQuiz.picture}
            className="h-full w-full object-cover rounded-md"
            alt="pic"
          />
        </div>
        <div className="col-md-8 space-y-3 mt-3 bg-slate-900 text-white rounded-md p-3">
          <div className="text-3xl">Name : {singleQuiz.quizname}</div>
          <div className="text-xl">Quiz Type : {singleQuiz.quizname}</div>
          <div className="">Time : {singleQuiz.quizname} min</div>
          <div className="">
            Num Of Submissions : {singleQuiz.users.length} times
          </div>
          <div className="text-sm">{singleQuiz.updatedAt.slice(0, 10)}</div>
          <div className="">{singleQuiz.description}</div>
          <div className="">
            {singleQuiz.questions.map((question, idx) => (
              <div key={idx}>
                <span className="font-bold">{idx + 1}. </span>
                <span>{question.question}</span>
              </div>
            ))}
          </div>
          <div className="">{singleQuiz.description}</div>
        </div>
      </div>
      <div className="row my-4">
        {singleQuiz.users.map((user, idx) => (
          <div
            key={idx}
            className="col-md-8 bg-[#000] p-3 text-white rounded-md mt-2"
          >
            <div className="flex space-x--2">
              <div className="w-32 border p-1">
                <div>Name</div>
                <hr />
                {user.username}
              </div>
              <div className="w-32 border p-1 text-center">
                <div>user type</div>
                <hr />
                {user.paid ? "Paid" : "Free"}
              </div>
              <div className="w-32 border p-1 text-right">
                <div>obtain marks</div>
                <hr />
                {user.marks}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminQuizDetails;
