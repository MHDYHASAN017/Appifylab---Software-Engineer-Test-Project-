// const { default: mongoose } = require("mongoose");
// const mongoose = require(mongoose);

const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    quizname: {
      type: String,
      require: true,
    },
    picture: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    quiztype: {
      type: String,
      require: true,
    },
    numofretake: {
      type: Number,
      require: true,
    },
    allquestiontime: {
      type: String,
    },
    singlequestiontime: {
      type: String,
    },
    questions: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "question",
        },
        question: {
          type: String,
          require: true,
        },
        options: [
          {
            id: {
              type: Number,
              required: true,
            },
            option: {
              type: String,
              required: true,
            },
          },
        ],
        answer: [
          {
            type: Number,
          },
        ],
      },
    ],
    users: [
      {
        userId: {
          type: String,
        },
        username: {
          type: String,
        },
        useremail: {
          type: String,
        },
        marks: {
          type: Number,
        },
        paid: {
          type: Boolean,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("quiz", quizSchema);
