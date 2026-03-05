const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
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

    examId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },

    examName: {
      type: String,
      required: true,
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
        selected: String,
        correct: String,
        isCorrect: Boolean,
      },
    ],

    totalQuestions: {
      type: Number,
    },

    correctAnswers: {
      type: Number,
    },

    wrongAnswers: {
      type: Number,
    },

    totalMarks: {
      type: Number,
    },

    obtainedMarks: {
      type: Number,
    },

    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Result", resultSchema);