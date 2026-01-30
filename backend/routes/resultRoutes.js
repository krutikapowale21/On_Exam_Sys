const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const Exam = require("../models/Exam");

/* =========================
   SUBMIT RESULT (STUDENT)
========================= */
router.post("/submit", async (req, res) => {
  try {
    const { studentId, examId, answers } = req.body;

    // ⚠️ TEMP logic (later improve)
    const totalMarks = answers.length;
    const marks = totalMarks;
    const percentage = (marks / totalMarks) * 100;
    const resultStatus = percentage >= 40 ? "Pass" : "Fail";

    const result = new Result({
      studentId,
      examId,
      marks,
      percentage,
      result: resultStatus,
    });

    await result.save();

    res.json({
      success: true,
      resultId: result._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ===============================
   ✅ TEACHER VIEW RESULT BY EXAM
   Rank + Pass/Fail
================================ */
router.get("/exam/:examId", async (req, res) => {
  try {
    const { examId } = req.params;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // 🔥 Sort by marks (high → low)
    const results = await Result.find({ examId })
      .populate("studentId", "name enrollment rollNo")
      .sort({ marks: -1 });

    // 🔥 ADD RANK
    const rankedResults = results.map((r, index) => ({
      rollNo: r.studentId.rollNo,
      enrollment: r.studentId.enrollment,
      name: r.studentId.name,
      marks: r.marks,
      percentage: r.percentage,
      result: r.result,
      rank: index + 1,
    }));

    res.json({
      exam: {
        examName: exam.examName,
        subject: exam.subject,
        subCode: exam.subCode,
        branch: exam.branch,
        semester: exam.semester,
        totalMarks: exam.totalMarks,
      },
      results: rankedResults,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
