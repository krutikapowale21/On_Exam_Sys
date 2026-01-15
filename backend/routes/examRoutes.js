const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");

/* CREATE EXAM */
router.post("/exams", async (req, res) => {
  try {
    const { examName, subject, duration, totalMarks, classId } = req.body;

    if (!classId) {
      return res.status(400).json({ message: "Class ID required" });
    }

    const exam = new Exam({
      examName,
      subject,
      duration,
      totalMarks,
      classId,
      isPublished: false,
    });

    await exam.save();
    res.json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* GET ALL EXAMS (TEACHER) */
router.get("/exams", async (req, res) => {
  const exams = await Exam.find().populate("classId");
  res.json(exams);
});

/* PUBLISH EXAM */
router.put("/exams/publish/:id", async (req, res) => {
  await Exam.findByIdAndUpdate(req.params.id, {
    isPublished: true,
  });
  res.json({ success: true });
});

/* STUDENT – GET EXAMS BY CLASS */
router.get("/exams/student/:classId", async (req, res) => {
  const exams = await Exam.find({
    classId: req.params.classId,
    isPublished: true,
  });

  res.json(exams);
});

module.exports = router;
