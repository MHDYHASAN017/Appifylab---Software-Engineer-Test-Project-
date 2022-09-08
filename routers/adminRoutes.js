const express = require("express");
const router = express.Router();
const {
  createQuizCover,
  createQuizQuestion,
  getAllQuiz,
  getSingleQuiz,
  submitQuiz,
  deleteQuiz,
  getQuizType
} = require("../controllers/adminController");

router.post("/create-quiz-cover", createQuizCover);
router.post("/create-quiz-question", createQuizQuestion);
router.post("/submit-quiz/:quiz_id", submitQuiz);
router.post("/filter-quiz-type", getQuizType);


router.get("/get-all-quiz", getAllQuiz);

router.get("/get-single-quiz/:id", getSingleQuiz);

router.delete("/delete-quiz/:id", deleteQuiz);

module.exports = router;
