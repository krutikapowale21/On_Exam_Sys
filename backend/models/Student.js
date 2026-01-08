const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  enrollmentNo: String,
  password: String,

  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
  },
});

module.exports = mongoose.model("Student", studentSchema);
