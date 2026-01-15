const express = require("express");
const router = express.Router();

const Result = require("../models/Result");
const Question = require("../models/Question");
const Exam = require("../models/Exam");

// ======================
// SUBMIT EXAM
// ======================
router.post("/submit", async (req, res) => {
  try {
    const { studentId, examId, answers } = req.body;

    if (!studentId || !examId || !answers) {
      return res.status(400).json({
        success: false,
        message: "Missing data",
      });
    }

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const questions = await Question.find({ examId });

    let correct = 0;
    let wrong = 0;

    const evaluatedAnswers = questions.map((q) => {
      const studentAnswer = answers.find(
        (a) => a.questionId === q._id.toString()
      );

      const isCorrect =
        studentAnswer && studentAnswer.selected === q.correctAnswer;

      if (isCorrect) correct++;
      else wrong++;

      return {
        questionId: q._id,
        selected: studentAnswer ? studentAnswer.selected : "",
        correct: q.correctAnswer,
        isCorrect,
      };
    });

    const marksPerQuestion =
      exam.totalMarks / exam.totalQuestions;

    const obtainedMarks = correct * marksPerQuestion;

    const result = new Result({
      studentId,
      examId,
      classId: exam.classId,
      answers: evaluatedAnswers,
      totalQuestions: exam.totalQuestions,
      correctAnswers: correct,
      wrongAnswers: wrong,
      totalMarks: exam.totalMarks,
      obtainedMarks,
    });

    await result.save();

    res.json({
      success: true,
      message: "Exam submitted successfully",
      resultId: result._id,
    });
  } catch (err) {
    console.error("SUBMIT EXAM ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ======================
// GET RESULT BY ID
// ======================
router.get("/:id", async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate("examId");

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
