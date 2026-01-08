const express = require("express");
const router = express.Router();
const Class = require("../models/Class");

// ==============================
// CREATE CLASS
// ==============================
router.post("/classes", async (req, res) => {
  try {
    console.log("REQ BODY:", req.body); // 🔍 DEBUG

    const { className, subject, semester, branch, year } = req.body;

    // ✅ validation
    if (!className || !subject || !semester || !branch || !year) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newClass = new Class({
      className,
      subject,
      semester,
      branch,   // ✅ VERY IMPORTANT
      year,     // ✅ VERY IMPORTANT
      students: [],
    });

    await newClass.save();

    res.status(201).json({
      success: true,
      message: "Class created successfully",
      class: newClass,
    });
  } catch (err) {
    console.error("CREATE CLASS ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


// ==============================
// GET ALL CLASSES
// ==============================
router.get("/classes", async (req, res) => {
  try {
    const classes = await Class.find().sort({ createdAt: -1 });
    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==============================
// GET SINGLE CLASS BY ID
// ==============================
router.get("/class/:id", async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id);

    if (!cls) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.json(cls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// JOIN CLASS
router.post("/class/join/:classId", async (req, res) => {
  console.log("REQ BODY:", req.body);
  try {
    const { enrollment, name, password } = req.body;
    const { classId } = req.params;

    if (!enrollment || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "Enrollment, name and password are required",
      });
    }

    const cls = await Class.findById(classId);
    if (!cls) {
      return res.status(404).json({
        success: false,
        message: "Class not found",
      });
    }

    // BEFORE adding student
const existingClass = await Class.findOne({
  "students.enrollment": enrollment,
});

if (existingClass) {
  return res.status(400).json({
    success: false,
    message: "This enrollment number has already joined a class",
  });
}


    // duplicate check
    const alreadyJoined = cls.students.find(
      (s) => s.enrollment === enrollment
    );

    if (alreadyJoined) {
      return res.status(400).json({
        success: false,
        message: "Student already joined this class",
      });
    }

    cls.students.push({
      enrollment,
      name,
      password,
    });

    await cls.save();

    res.json({
      success: true,
      message: "Joined class successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
