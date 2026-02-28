const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");

/* ======================
   CREATE EXAM (Teacher)
====================== */
router.post("/exams", async (req, res) => {
  try {
    const {
      examName,
      branch,
      semester,
      subject,
      subCode,
      examDate,
      totalQuestions,
      duration,
      totalMarks,
      classId,
    } = req.body;

    if (
      !examName ||
      !branch ||
      !semester ||
      !subject ||
      !subCode ||
      !examDate ||
      !totalQuestions ||
      !duration ||
      !totalMarks ||
      !classId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields including class are required",
      });
    }

    const exam = new Exam({
      examName,
      branch,
      semester,
      subject,
      subCode,
      examDate,
      totalQuestions,
      duration,
      totalMarks,
      classId,
      isPublished: false,
    });

    await exam.save();

    res.json({
      success: true,
      message: "Exam created successfully",
      exam,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   GET ALL EXAMS (Teacher)
====================== */
router.get("/exams", async (req, res) => {
  try {
    const exams = await Exam.find().populate("classId");
    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   DELETE EXAM
====================== */
router.delete("/exams/:id", async (req, res) => {
  try {
    await Exam.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "Exam deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   PUBLISH EXAM
====================== */
router.put("/exams/publish/:id", async (req, res) => {
  try {
    await Exam.findByIdAndUpdate(req.params.id, {
      isPublished: true,
    });

    res.json({
      success: true,
      message: "Exam sent to students",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   STUDENT – GET EXAMS
   (ONLY PUBLISHED + SAME CLASS)
====================== */
router.get("/exams/student/:classId", async (req, res) => {
  try {
    const exams = await Exam.find({
      classId: req.params.classId,
      isPublished: true,
    });

    res.json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===============================
   TEACHER DASHBOARD – EXAM STATUS
=============================== */
router.get("/dashboard/exams", async (req, res) => {
  try {
    const exams = await Exam.find()
      .populate("classId", "className branch semester year")
      .sort({ examDate: 1 });

    const now = new Date();

    const examsWithStatus = exams.map((exam) => {
      const start = new Date(exam.examDate);
      const end = new Date(start.getTime() + exam.duration * 60000);

      let status = "UPCOMING";

      if (now >= start && now <= end) {
        status = "LIVE";
      } else if (now > end) {
        status = "ENDED";
      }

      return {
        ...exam._doc,
        status,
      };
    });

    res.json(examsWithStatus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;