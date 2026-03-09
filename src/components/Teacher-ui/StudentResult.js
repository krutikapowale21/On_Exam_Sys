import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./StudentResult.css";

function StudentResult() {
  const { resultId } = useParams();
  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/results/${resultId}`)
      .then((res) => res.json())
      .then((data) => setResult(data));
  }, [resultId]);

  if (!result) return <p>Loading Result...</p>;

  return (
    <div className="result-page">
      <div className="result-card">
        <h2>Exam Result</h2>

        <p><b>Exam Name:</b> {result.examId.examName}</p>
        <p><b>Total Questions:</b> {result.totalQuestions}</p>
        <p><b>Correct Answers:</b> {result.correctAnswers}</p>
        <p><b>Wrong Answers:</b> {result.wrongAnswers}</p>

        <hr />

        <p className="score">
          <b>Score:</b> {result.obtainedMarks} / {result.totalMarks}
        </p>

        <button onClick={() => navigate("/student-dashboard")}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default StudentResult;
