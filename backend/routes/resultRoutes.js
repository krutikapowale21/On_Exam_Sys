const express = require("express");
const router = express.Router();
const Result = require("../models/Result");
const Question = require("../models/Question");
const Exam = require("../models/Exam");

/* ==========================
   SUBMIT EXAM
========================== */
router.post("/submit", async (req, res) => {
  try {
    const { studentId, examId, answers } = req.body;

    const exam = await Exam.findById(examId);
    const questions = await Question.find({ examId });

    let score = 0;
    let resultAnswers = [];

    questions.forEach((q) => {
      const given = answers.find(a => a.questionId === q._id.toString());

      const isCorrect = given && given.selected === q.correctAnswer;

      if (isCorrect) score += exam.totalMarks / exam.totalQuestions;

      resultAnswers.push({
        questionId: q._id,
        selected: given?.selected || "",
        correct: q.correctAnswer,
        isCorrect,
      });
    });

    const percentage = (score / exam.totalMarks) * 100;

    const result = new Result({
      studentId,
      examId,
      answers: resultAnswers,
      score,
      totalMarks: exam.totalMarks,
      percentage,
    });

    await result.save();

    res.json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================
   GET STUDENT RESULT
========================== */
router.get("/student/:studentId", async (req, res) => {
  const results = await Result.find({ studentId: req.params.studentId })
    .populate("examId", "examName subject");

  res.json(results);
});

module.exports = router;
