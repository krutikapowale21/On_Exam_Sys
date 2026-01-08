import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateExam.css";

function CreateExam() {
  const navigate = useNavigate();

  // 🔹 Exam fields
  const [examName, setExamName] = useState("");
  const [classId, setClassId] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [subCode, setSubCode] = useState("");
  const [examDate, setExamDate] = useState("");
  const [totalQuestions, setTotalQuestions] = useState("");
  const [duration, setDuration] = useState("");
  const [totalMarks, setTotalMarks] = useState("");

  // 🔹 Classes from DB
  const [classes, setClasses] = useState([]);

  /* ================= FETCH CLASSES ================= */
  useEffect(() => {
    fetch("http://localhost:5000/api/classes")
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);

  /* 🔹 Subject code mapping */
  const subjectCodeMap = {
    BSC: "311305",
    BEE: "312302",
    EES: "314301",
    MAN: "315301",
    ETI: "316313",
  };

  /* ================= CLASS SELECT HANDLER ================= */
  const handleClassChange = (selectedClassId) => {
    setClassId(selectedClassId);

    const selectedClass = classes.find(
      (c) => c._id === selectedClassId
    );

    if (selectedClass) {
      // 🔥 AUTO FILL
      setBranch(selectedClass.branch);
      setSemester(selectedClass.semester);
      setSubject(selectedClass.subject || "");
      setSubCode(subjectCodeMap[selectedClass.subject] || "");
    }
  };

  /* ================= SUBJECT CHANGE ================= */
  const handleSubjectChange = (value) => {
    setSubject(value);
    setSubCode(subjectCodeMap[value] || "");
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const examData = {
      examName,
      classId,        // 🔥 MOST IMPORTANT
      branch,
      semester,
      subject,
      subCode,
      examDate,
      totalQuestions: Number(totalQuestions),
      duration: Number(duration),
      totalMarks: Number(totalMarks),
    };

    const res = await fetch("http://localhost:5000/api/exams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(examData),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to create exam");
      return;
    }

    alert("Exam Created Successfully");
    navigate("/exams");
  };

  return (
    <div className="create-exam-page">
      <h2>Create Exam</h2>

      <form className="create-exam-form" onSubmit={handleSubmit}>
        {/* Exam Name */}
        <label>Exam Name</label>
        <input
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          required
        />

        {/* CLASS SELECT */}
        <label>Select Class</label>
        <select
          value={classId}
          onChange={(e) => handleClassChange(e.target.value)}
          required
        >
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c._id} value={c._id}>
              {c.className} ({c.branch} - {c.semester})
            </option>
          ))}
        </select>

        {/* AUTO FILLED FIELDS */}
        <label>Branch</label>
        <input value={branch} readOnly />

        <label>Semester</label>
        <input value={semester} readOnly />

        <label>Subject</label>
        <select
          value={subject}
          onChange={(e) => handleSubjectChange(e.target.value)}
          required
        >
          <option value="">Select Subject</option>
          {Object.keys(subjectCodeMap).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <label>Subject Code</label>
        <input value={subCode} readOnly />

        {/* Exam Date */}
        <label>Exam Date</label>
        <input
          type="date"
          value={examDate}
          onChange={(e) => setExamDate(e.target.value)}
          required
        />

        {/* Questions */}
        <label>No. of Questions</label>
        <input
          type="number"
          value={totalQuestions}
          onChange={(e) => setTotalQuestions(e.target.value)}
          required
        />

        {/* Duration */}
        <label>Duration (minutes)</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

        {/* Marks */}
        <label>Total Marks</label>
        <input
          type="number"
          value={totalMarks}
          onChange={(e) => setTotalMarks(e.target.value)}
          required
        />

        <button type="submit">Create Exam</button>
      </form>
    </div>
  );
}

export default CreateExam;
