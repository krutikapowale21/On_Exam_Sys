const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");

// console.log("Exam model type:", typeof Exam);
// console.log("Exam keys:", Object.keys(Exam));

/* ======================
   CREATE EXAM
====================== */
router.post("/exams", async (req, res) => {
  try {
    console.log("BODY RECEIVED:", req.body);

    const {
      examName,
      branch,
      year,
      semester,
      subject,
      subCode,
      examDate,
      startTime,
      endTime,
      totalQuestions,
      duration,
      totalMarks,
      classId,
    } = req.body;

    // BASIC VALIDATION
    if (
      !examName ||
      !branch ||
      !year ||
      !semester ||
      !subject ||
      !subCode ||
      !examDate ||
      !startTime ||
      !endTime ||
      !classId
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Convert numbers safely
    const safeTotalQuestions = Number(totalQuestions) || 0;
    const safeDuration = Number(duration) || 0;
    const safeTotalMarks = Number(totalMarks) || 0;

    // Convert date safely
    const safeDate = new Date(examDate);

    if (isNaN(safeDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid exam date",
      });
    }

    const exam = new Exam({
      examName,
      branch,
      year,
      semester,
      subject,
      subCode,
      examDate,
      totalQuestions,
      duration,
      totalMarks,
      examDate: safeDate,
      startTime,
      endTime,
      totalQuestions: safeTotalQuestions,
      duration: safeDuration,
      totalMarks: safeTotalMarks,
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
    console.error("CREATE EXAM ERROR FULL:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

/* ======================
   GET ALL EXAMS
====================== */
router.get("/exams", async (req, res) => {
  try {
    const exams = await Exam.find().populate("classId");
    res.json(exams);
  } catch (err) {
    console.error("GET EXAMS ERROR:", err);
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