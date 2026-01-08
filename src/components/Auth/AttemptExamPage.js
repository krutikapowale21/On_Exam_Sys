import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AttemptExamPage.css";

function AttemptExamPage() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const student = JSON.parse(localStorage.getItem("student")); // logged student


  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  /* ========================
     FETCH EXAM + QUESTIONS
  ======================== */
  useEffect(() => {
    const fetchData = async () => {
      const examRes = await fetch(
        `http://localhost:5000/api/exams/${examId}`
      );
      const examData = await examRes.json();
      setExam(examData);

      setTimeLeft(examData.duration * 60); // minutes → seconds

      const qRes = await fetch(
        `http://localhost:5000/api/questions/${examId}`
      );
      const qData = await qRes.json();
      setQuestions(qData);
    };

    fetchData();
  }, [examId]);

  /* ========================
     TIMER LOGIC
  ======================== */
  useEffect(() => {
    if (timeLeft <= 0 && !submitted) {
      handleSubmitExam(); // AUTO SUBMIT
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  /* ========================
     HANDLE ANSWER
  ======================== */
  const handleOptionChange = (qid, option) => {
    setSelectedAnswers({ ...selectedAnswers, [qid]: option });
  };

  /* ========================
     SUBMIT EXAM
  ======================== */
  const handleSubmitExam = async () => {
    if (submitted) return;
    setSubmitted(true);

    const payload = {
      studentId: student._id,
      examId,
      answers: Object.keys(selectedAnswers).map((qid) => ({
        questionId: qid,
        selected: selectedAnswers[qid],
      })),
    };

    await fetch("http://localhost:5000/api/results/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Exam Submitted");
    navigate("/student-results");
  };

  /* ========================
     FORMAT TIMER
  ======================== */
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (!exam) return <p>Loading...</p>;

  return (
    <div className="attempt-exam-page">
      <h2>{exam.examName}</h2>

      <div className="timer">
        ⏳ Time Left: {minutes}:{seconds < 10 ? "0" : ""}
        {seconds}
      </div>

      {questions.map((q, index) => (
        <div key={q._id} className="question-box">
          <p>
            <b>Q{index + 1}.</b> {q.questionText}
          </p>

          {q.options.map((op, i) => (
            <label key={i} className="option">
              <input
                type="radio"
                name={q._id}
                value={op}
                checked={selectedAnswers[q._id] === op}
                onChange={() => handleOptionChange(q._id, op)}
              />
              {op}
            </label>
          ))}
        </div>
      ))}

      <button className="submit-btn" onClick={handleSubmitExam}>
        Submit Exam
      </button>
    </div>
  );
}

export default AttemptExamPage;
