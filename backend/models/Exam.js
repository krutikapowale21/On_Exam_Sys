const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
  {
    examName: {
      type: String,
      required: true,
    },
    branch: { 
      type: String, 
      required: true 
    },
    semester: { 
      type: String, 
      required: true 
    },
    subject: {
      type: String,
      required: true,
    },
    subCode: { 
      type: String, 
      required: true 
    },
    examDate: {
      type: Date,
      required: true,
    },
    totalQuestions: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },

    // 🔥 OPTIONAL FOR NOW
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: false,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);
