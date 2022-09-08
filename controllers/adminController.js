const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Quiz = require("../models/quizSchema");
const Question = require("../models/questionSchema");

const createQuizCover = asyncHandler(async (req, res) => {
  const {
    quizname,
    picture,
    description,
    quiztype,
    numofretake,
    allquestiontime,
  } = req.body;

  const buildQuiz = await new Quiz({
    quizname,
    picture,
    description,
    quiztype,
    numofretake,
    allquestiontime,
  });

  const createQuiz = await buildQuiz.save();

  return res.status(200).json({
    createQuiz,
    message: "created quiz cover sucessfully",
  });
});

const createQuizQuestion = asyncHandler(async (req, res) => {
  const { question, options, answer } = req.body;

  const buildQuiz = await new Question({
    question,
    options,
    answer,
  });

  const createQuiz = await buildQuiz.save();

  const allQuiz = await Quiz.find({});

  const quiz = allQuiz[allQuiz.length - 1];
  quiz.questions.push(createQuiz);
  await quiz.save();

  return res.status(200).json({
    createQuiz,
    message: "quiz created sucessfully",
  });
});

const getAllQuiz = asyncHandler(async (req, res) => {
  const allQuiz = await Quiz.find({});

  if (!allQuiz) {
  } else {
    return res.status(200).json({
      allQuiz,
    });
  }
});

const getQuizType = asyncHandler(async (req, res) => {
  const { quiz } = req.body;

  if (quiz.toLowerCase() === "all") {
    const allQuiz = await Quiz.find();
    return res.status(200).json({
      allQuiz,
    });
  } else {
    const allQuiz = await Quiz.find({quiztype : quiz});
    return res.status(200).json({
      allQuiz,
    });
  }
});

const getSingleQuiz = asyncHandler(async (req, res) => {
  const singleQuiz = await Quiz.findById(req.params.id);

  if (!singleQuiz) {
  } else {
    return res.status(200).json({
      singleQuiz,
    });
  }
});

const submitQuiz = asyncHandler(async (req, res) => {
  const user = {
    userId: req.body.userId,
    username: req.body.username,
    useremail: req.body.email,
    marks: req.body.mark,
    paid: req.body.paid,
  };

  const findQuiz = await Quiz.findById(req.params.quiz_id);
  findQuiz.users.push(user);
  const saveSubmit = await findQuiz.save();

  return res.status(200).json({
    saveSubmit: saveSubmit,
    message: "Quiz Submitted Sucessfully",
  });
});

const deleteQuiz = asyncHandler(async (req, res) => {
  const deleteQuiz = await Quiz.findByIdAndDelete(req.params.id);
  const allQuiz = await Quiz.find({});
  if (!deleteQuiz) {
    res.status(400);
    throw new Error("Something Went Wrong!");
  } else {
    return res.status(200).json({
      deleteQuiz,
      allQuiz,
      message: "deleted successfully",
    });
  }
});

module.exports = {
  createQuizCover,
  createQuizQuestion,
  getAllQuiz,
  getSingleQuiz,
  submitQuiz,
  deleteQuiz,
  getQuizType,
};
