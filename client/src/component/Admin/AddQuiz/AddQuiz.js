import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createQuizCover,
  createQuizQuestion,
  quizCreatedSuccessfully,
} from "../../../Redux/Actions/AdminQuizAction";
import Heading from "../../UI/Heading/Heading";
import { Checkbox } from "antd";
import Message from "../../UI/Message/Message";

const AddQuiz = () => {
  
  const [questionForm, setQuestionForm] = useState(false);
  const [quizname, setQuizname] = useState("");
  const [picture, setPicture] = useState("");
  const [picurl, setPicurl] = useState("");
  const [description, setDescription] = useState("");
  const [quizType, setQuizType] = useState("free");
  const [retake, setRetake] = useState("");
  const [time, setTime] = useState("");
  const [questionList, setQuestionList] = useState([]);
  const [question, setQuestion] = useState("");
  const [option, setOption] = useState("");
  const [index, setIndex] = useState(1);
  const [optionList, setOptionList] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const userRed = useSelector((state) => state.userReducer);
  const quizRed = useSelector((state) => state.quizReducer);

  const { loading } = quizRed;
  const {user} = userRed

  const uploadImageAndgetUrl = (data) => {
    if (picture !== "" && picture !== undefined) {
      const format = picture.name.split(".");
      if (format[1] === "png" || format[1] === "jpg" || format[1] === "jpeg") {
        const imgData = new FormData();
        imgData.append("file", picture);
        imgData.append("upload_preset", "heroku-upload-practice");
        imgData.append("cloud_name", "doctog5my");
        fetch(`https://api.cloudinary.com/v1_1/doctog5my/image/upload`, {
          method: "post",
          body: imgData,
        })
          .then((res) => res.json())
          .then((imgData) => {
            setPicurl(imgData.url);
            setMessage("");
          })
          .catch((err) => {
            // console.log(err);
          });
      }
    } else {
      setMessage("Please Enter A Valid Cover Image");
    }
  };

  const quizCoverHandler = (e) => {
    e.preventDefault();
    const questionObj = {
      quizname,
      picture: picurl,
      description,
      quiztype: quizType,
      numofretake: retake,
      allquestiontime: time,
    };
    dispatch(createQuizCover(questionObj));
    setQuestionForm(true);
    setQuizname("");
    setPicurl("");
    setDescription("");
    setQuizType("free");
    setRetake("");
    setTime("");
  };

  const optionAddHandler = () => {
    const optionObj = {
      id: index,
      option: option,
    };
    setOptionList([...optionList, optionObj]);
    setOption("");
  };

  const onChange = (checkedValues) => {
    setAnswer(checkedValues);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log("submit");
    // console.log(question);
    // console.log(optionList);
    // console.log(answer);
    const questionObj = {
      question,
      options: optionList,
      answer,
    };
    setQuestionList([...questionList, questionObj]);
    dispatch(createQuizQuestion(questionObj));
    setQuestion("");
    setAnswer([]);
    setOptionList([]);
    setIndex(1);
    // console.log(question);
  };

  const fixStr = (str) => {
    console.log(str);
    let s = str.join(",");
    return s;
  };

  const totalQuizSubmitHandler = (e) => {
    e.preventDefault();
    setQuestionForm(false);
    setQuestionList([]);
    dispatch(quizCreatedSuccessfully());
  };

  if (loading === false && user === null) {
    return (
      <div>
        <Message />
      </div>
    );
  }
  if (loading === false && user !== null && user.isAdmin === false) {
    return (
      <div>
        <Message />
      </div>
    );
  }

  return (
    <div className="mt-10 lg:pl-10 md:pl-5 mb-5">
      <Heading form heading="add quiz" />
      <div className="row">
        <div className="col-md-9 col-lg-8">
          <form className="space-y-3 mt-4">
            {questionForm === false ? (
              <>
                <div className="form-group">
                  <div className="my-2">{message && message}</div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter quiz name"
                    value={quizname}
                    onChange={(e) => setQuizname(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="file"
                    placeholder="select photo"
                    onChange={(e) => setPicture(e.target.files[0])}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="enter quiz description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onClick={uploadImageAndgetUrl}
                  />
                </div>
                <div className="form-group">
                  <select
                    value={quizType}
                    onChange={(e) => setQuizType(e.target.value)}
                    className="form-control"
                  >
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="number of retake"
                    value={retake}
                    onChange={(e) => setRetake(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="number"
                    placeholder="enter total minutes of time for this quiz"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <button
                    onClick={(e) => {
                      quizCoverHandler(e);
                    }}
                    type="button"
                    className="btn btn-dark col-12"
                    disabled={
                      !quizname ||
                      !picture ||
                      !description ||
                      !quizType ||
                      !retake ||
                      !time
                    }
                  >
                    Insert All Values And Click Here
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter question name"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                  </div>
                  <div className="text-2xl my-3">Question : {question} ?</div>
                  <Checkbox.Group onChange={onChange}>
                    <div className="my-3">
                      {optionList.map((opt, idx) => (
                        <div key={idx} className="flex items-center">
                          <Checkbox value={opt.id} className="text-xl">
                            <span className=" -mt-1 ml-2">{opt.option}</span>
                          </Checkbox>
                        </div>
                      ))}
                    </div>
                  </Checkbox.Group>
                  {answer.length === 0 && (
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="enter question options"
                        value={option}
                        onChange={(e) => setOption(e.target.value)}
                      />
                    </div>
                  )}

                  {answer.length === 0 ? (
                    <button
                      type="button"
                      onClick={() => {
                        optionAddHandler();
                        setIndex(index + 1);
                      }}
                      className="btn btn-dark col-12"
                      disabled={!question}
                    >
                      Inset A Option For This Question
                    </button>
                  ) : (
                    <div className="form-group">
                      <button
                        type="button"
                        onClick={submitHandler}
                        className="btn btn-dark col-12"
                      >
                        Save Answer And Submit
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </form>
        </div>
      </div>
      <div className="row mt-4">
        {questionForm === true && (
          <>
            <div className="col-12">
              {questionList.length !== 0 && (
                <div className="text-3xl">Review Your Questions</div>
              )}
              {questionList.map((ql, idx) => (
                <div key={idx} className="mt-3 mb-1">
                  <div className="">
                    <div className="text-3xl">Question Num : {idx + 1}</div>
                    <div className="text-2xl">{ql.question}</div>
                  </div>
                  <div>
                    <div>Options : </div>
                    {ql.options.map((op, idx) => (
                      <div key={idx}>
                        <div className="text-xl">
                          {idx + 1} : {op.option}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="font-bold">
                      Answer Is Option : {fixStr(ql.answer)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-12">
              {questionList.length !== 0 && (
                <button
                  onClick={totalQuizSubmitHandler}
                  className="btn btn-danger mt-5"
                >
                  Submit Total Quiz
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddQuiz;
