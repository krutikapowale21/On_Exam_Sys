const express = require("express");
const router = express.Router();
const Class = require("../models/Class");

// STUDENT LOGIN
router.post("/student/login", async (req, res) => {
  try {
    const { enrollment, password } = req.body;

    if (!enrollment || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const cls = await Class.findOne({
      "students.enrollment": enrollment,
    });

    if (!cls) {
      return res.status(403).json({
        success: false,
        message: "Please join a class first",
      });
    }

    const student = cls.students.find(
      (s) => s.enrollment === enrollment && s.password === password
    );

    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Invalid enrollment or password",
      });
    }

    res.json({
      success: true,
      student: {
        enrollment: student.enrollment,
        name: student.name,
        classId: cls._id,
      },
    });
  } catch (err) {
    console.error("STUDENT LOGIN ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router; // 🔥 THIS LINE IS MANDATORY
