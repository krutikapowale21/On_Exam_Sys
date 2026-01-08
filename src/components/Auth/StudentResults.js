import React, { useEffect, useState } from "react";
import "./StudentResults.css";

function StudentResults() {
  const [results, setResults] = useState([]);
  const student = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    fetch(`http://localhost:5000/api/results/student/${student._id}`)
      .then(res => res.json())
      .then(data => setResults(data));
  }, []);

  return (
    <div className="result-page">
      <h2>My Results</h2>

      {results.map(r => (
        <div className="result-card" key={r._id}>
          <h3>{r.examId.examName}</h3>
          <p><b>Subject:</b> {r.examId.subject}</p>
          <p><b>Score:</b> {r.score} / {r.totalMarks}</p>
          <p><b>Percentage:</b> {r.percentage.toFixed(2)}%</p>
        </div>
      ))}
    </div>
  );
}

export default StudentResults;
