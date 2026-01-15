const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

/* ======================
   ADD QUESTION
====================== */
router.post("/questions", async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* ======================
   GET QUESTIONS BY EXAM
====================== */
router.get("/questions/:examId", async (req, res) => {
  try {
    const questions = await Question.find({
      examId: req.params.examId,
    });

    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
