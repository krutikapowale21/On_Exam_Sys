const express = require("express");
const router = express.Router();

const Result = require("../models/Result");
const Exam = require("../models/Exam");
const Question = require("../models/Question");

// ======================
// SUBMIT EXAM (STUDENT)
// ======================
router.post("/submit", async (req, res) => {
  try {
    const { studentId, studentName, enrollment, examId, answers } = req.body;

    if (!studentId || !examId || !answers) {
      return res.status(400).json({
        success: false,
        message: "Missing required data",
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
      studentName,
      enrollment,
      examId,
      examName: exam.examName,
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
// GET SINGLE RESULT
// ======================
router.get("/:id", async (req, res) => {
  try {
    const result = await Result.findById(req.params.id)
      .populate("examId")
      .populate("studentId", "name enrollment rollNo");

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ===============================
// TEACHER VIEW RESULT BY EXAM
// Rank + Sort
// ===============================
router.get("/exam/:examId", async (req, res) => {
  try {
    const { examId } = req.params;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const results = await Result.find({ examId })
      .populate("studentId", "name enrollment rollNo")
      .sort({ obtainedMarks: -1 });

    const rankedResults = results.map((r, index) => ({
      rollNo: r.studentId?.rollNo,
      enrollment: r.studentId?.enrollment,
      name: r.studentId?.name,
      obtainedMarks: r.obtainedMarks,
      totalMarks: r.totalMarks,
      correctAnswers: r.correctAnswers,
      wrongAnswers: r.wrongAnswers,
      rank: index + 1,
    }));

    res.json({
      exam: {
        examName: exam.examName,
        subject: exam.subject,
        totalMarks: exam.totalMarks,
      },
      results: rankedResults,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;