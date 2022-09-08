const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("question", questionSchema);
