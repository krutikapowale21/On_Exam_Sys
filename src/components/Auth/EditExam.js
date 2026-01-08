import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CreateExam.css";

function EditExam() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    examName: "",
    subject: "",
    semester: "",
    examDate: "",
    totalMarks: "",
    duration: "",
    totalQuestions: "",
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/exams")
      .then((res) => res.json())
      .then((data) => {
        const exam = data.find((e) => e._id === id);

        if (!exam) {
          alert("Exam not found");
          navigate("/exams");
          return;
        }

        setForm({
          examName: exam.examName,
          subject: exam.subject,
          semester: exam.semester,
          examDate: exam.examDate?.slice(0, 10),
          totalMarks: exam.totalMarks,
          duration: exam.duration,
          totalQuestions: exam.totalQuestions,
        });
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/api/exams/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert("Update failed");
      return;
    }

    alert("Exam Updated Successfully");
    navigate("/exams");
  };

  return (
    <div className="create-exam-page">
      <div className="create-exam-card">
        <h2>Edit Exam</h2>

        <form onSubmit={handleSubmit} className="create-exam-form">

          <label>Exam Name</label>
          <input name="examName" value={form.examName} onChange={handleChange} />

          <label>Subject</label>
          <input name="subject" value={form.subject} onChange={handleChange} />

          <label>Semester</label>
          <input name="semester" value={form.semester} onChange={handleChange} />

          <label>Exam Date</label>
          <input type="date" name="examDate" value={form.examDate} onChange={handleChange} />

          <label>Total Marks</label>
          <input type="number" name="totalMarks" value={form.totalMarks} onChange={handleChange} />

          <label>Duration (minutes)</label>
          <input type="number" name="duration" value={form.duration} onChange={handleChange} />

          <label>Total Questions</label>
          <input type="number" name="totalQuestions" value={form.totalQuestions} onChange={handleChange} />

          <button type="submit">Update Exam</button>
        </form>
      </div>
    </div>
  );
}

export default EditExam;
