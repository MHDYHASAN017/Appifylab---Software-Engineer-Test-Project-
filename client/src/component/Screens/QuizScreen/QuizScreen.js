import React from "react";
import "./quizScreen.css";
import { useState } from "react";
import { useEffect } from "react";
import { Checkbox } from "antd";
import { Statistic } from "antd";
import { BsClockHistory } from "react-icons/bs";
import {  useNavigate, useParams } from "react-router-dom";
import { BsFillPatchQuestionFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleQuiz,
  submitQuiz,
} from "../../../Redux/Actions/QuizActions";
import Heading from "../../UI/Heading/Heading";
import Loader from "../../UI/Loader/Loader";

const QuizScreen = () => {
  const [initTime, setInitTime] = useState(0);
  const [marks, setMarks] = useState(0);
  const [index, setIndex] = useState(0);
  let [ans, setAns] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate()
  const quizRed = useSelector((state) => state.quizReducer);
  const userRed = useSelector((state) => state.userReducer);
  const { loading,  singleQuiz } = quizRed;
  const {user} = userRed
  const { Countdown } = Statistic;

  useEffect(() => {
    dispatch(getSingleQuiz(params.id));
    setInitTime(Date.now());
  }, [dispatch, params.id]);

  const onChange = (checkedValues) => {
    setAns(checkedValues);
  };

  if (loading === true || singleQuiz === null) {
    return <Loader />;
  }

  if (loading === false && singleQuiz.questions === null) {
    return <div>something went wrong</div>;
  }

  const questions = singleQuiz.questions;

  const asignTime = singleQuiz.allquestiontime;

  const deadline = initTime + 1000 * 60 * asignTime;

  const onFinish = () => {
    // console.log("finished!");
    setIndex(questions.length);
  };

  const isCorrectAns = (id) => {
    let correct = true;
    let realAns = questions[index].answer;
    realAns = realAns.sort();
    ans = ans.sort();
    if (realAns.length !== ans.length) {
      correct = false;
    } else {
      for (let i = 0; i < realAns.length; i++) {
        if (realAns[i] !== ans[i]) {
          correct = false;
        }
      }
    }
    if (correct === true) {
      setMarks(marks + 5);
    }
  };

  const nextQuiz = () => {
    if (index - 1 === questions.length) {
      console.log("quiz end");
    } else {
      setIndex(index + 1);
    }
    setAns([]);
  };

  const submitQuizHandler = (e) => {
    e.preventDefault();
    let mark = (marks / (5 * questions.length)) * 100;
    const data = {
      userId:  user._id ,
      username: user.username ,
      mark: mark,
      paid: user.isPaid,
    };
    dispatch(submitQuiz(data, params.id , navigate));
  };

  // console.log(allQuiz[0]);
  if (index === questions.length) {
    let mark = (marks / (5 * questions.length)) * 100;
    return (
      <div className="flex flex-col h-[400px] justify-center items-center space-y-5">
        <div className="text-5xl">quiz ended</div>
        <div className="text-3xl">
          your score : <strong>{mark}%</strong>
        </div>

        {/* <Link to='/'> */}
          <div onClick={submitQuizHandler} className="btn btn-danger">
            Submit Your Test And Go To Home Page
          </div>
        {/* </Link> */}
      </div>
    );
  }

  const questionCount = (
    <div className="text-2xl flex space-x-2 items-center">
      <span>
        <BsFillPatchQuestionFill className="text-orange-500" />
      </span>
      <span className="text-slate-600">
        {index}/{questions.length}
      </span>
    </div>
  );

  const Quiz = (
    <div className="row">
      <div key={questions[index]._id} className="my-3">
        <div className="text-3xl mb-3">
          {/* <span className="font-bold mr-2">{idx + 1}.</span> */}
          <span>Q: {questions[index].question}?</span>
        </div>
        <Checkbox.Group onChange={onChange}>
          <div className="row bg-slate-800  py-5 rounded-md my-2">
            {questions[index].options.map((opt, idx) => (
              <div
                key={idx}
                className={`col-md-5 option bg-slate-300 p-2 rounded-md my-3  mx-auto`}
              >
                <span className="font-bold mr-2">
                  <Checkbox value={idx + 1}></Checkbox>
                </span>
                <span>{opt.option}</span>
              </div>
            ))}
          </div>
        </Checkbox.Group>
      </div>
    </div>
  );

  return (
    <div className="container">
      <Heading heading="Appify Quiz App" className="pt-10" />
      <div className="flex  justify-end mt-3 text-4xl items-center space-x-2">
        <span>
          <BsClockHistory className="text-orange-600" />
        </span>
        <Countdown value={deadline} onFinish={onFinish} />
      </div>
      {questionCount}
      {Quiz}
      <div className="row mb-10">
        <div
          onClick={() => isCorrectAns(questions[index]._id)}
          className="col-md-4 ml-auto -mr-2"
        >
          <button
            onClick={() => {
              nextQuiz();
            }}
            className="btn btn-dark col-12"
            disabled={!ans.length}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
