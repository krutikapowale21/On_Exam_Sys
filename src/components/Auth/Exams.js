import React, { useEffect, useState } from "react";
import "./Exams.css";
import { FaBookOpen, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Exams() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  const fetchExams = async () => {
    const res = await fetch("http://localhost:5000/api/exams");
    const data = await res.json();
    setExams(data);
  };

  useEffect(() => {
    fetchExams();
  }, []);

  // DELETE EXAM
  const deleteExam = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this exam?"
    );
    if (!confirm) return;

    await fetch(`http://localhost:5000/api/exams/${id}`, {
      method: "DELETE",
    });

    fetchExams();
  };

  // SEND / PUBLISH EXAM
  const sendExam = async (id) => {
    await fetch(`http://localhost:5000/api/exams/publish/${id}`, {
      method: "PUT",
    });

    alert("Exam sent to students");
    fetchExams(); // reload exams safely
  };

  return (
    <div className="exam-page">
      <h2 className="exam-title">
        <FaBookOpen /> All Exams
      </h2>

      <div className="exam-grid">
        {exams.length === 0 ? (
          <p className="no-exam">No exams created yet</p>
        ) : (
          exams.map((exam) => (
            <div className="exam-card" key={exam._id}>
              <h3>{exam.examName}</h3>

              <p>
                <b>Subject:</b> {exam.subject}
              </p>
              <p>
                <b>Semester:</b> {exam.semester}
              </p>
              <p>
                <b>Date:</b>{" "}
                {new Date(exam.examDate).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p>
                <b>Total Marks:</b> {exam.totalMarks}
              </p>
              <p>
                <b>Total Questions:</b> {exam.totalQuestions}
              </p>

              <div className="exam-btns">
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit-exam/${exam._id}`)}
                >
                  <FaEdit /> Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteExam(exam._id)}
                >
                  <FaTrash /> Delete
                </button>

                <button
                  className="add-btn"
                  onClick={() => navigate(`/add-question/${exam._id}`)}
                >
                  <FaPlus /> Add Questions
                </button>

                {/* SEND EXAM BUTTON */}
                <button
                  className="send-btn"
                  disabled={exam.isPublished}
                  onClick={() => sendExam(exam._id)}
                >
                  {exam.isPublished ? "Sent" : "Send Exam"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Exams;
