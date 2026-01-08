const express = require("express");
const router = express.Router();

// TEACHER LOGIN
router.post("/teacher/login", (req, res) => {
  const { UserName, password } = req.body;

  if (!UserName || !password) {
    return res.status(400).json({
      success: false,
      message: "UserName and password required",
    });
  }

  // TEMP static login (college project)
  if (UserName === "teacher@123" && password === "123456") {
    return res.status(200).json({
      success: true,
      teacher: {
        UserName,
        role: "teacher",
      },
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
});

module.exports = router;
