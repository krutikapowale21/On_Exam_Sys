const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      selected: String,
      correct: String,
      isCorrect: Boolean,
    },
  ],
  score: Number,
  totalMarks: Number,
  percentage: Number,
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Result", resultSchema);
