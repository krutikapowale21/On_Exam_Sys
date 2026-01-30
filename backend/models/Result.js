const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    examName: {
      type: String,
      required: true,
    },

    studentName: {
      type: String,
      required: true,
    },

    enrollment: {
      type: String,
      required: true,
    },

    totalQuestions: Number,
    correctAnswers: Number,
    marks: Number,

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);
