import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AttemptExamPage.css";

function AttemptExamPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const checked = useRef(false);

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  /* ⏳ TIMER STATES */
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  /* 🔐 INSTRUCTION CHECK */
  useEffect(() => {
    if (checked.current) return;

    const accepted = localStorage.getItem("instructionAccepted");
    if (accepted !== examId) {
      navigate("/attempt-exams");
    }

    checked.current = true;
  }, [examId, navigate]);

  /* 📥 FETCH QUESTIONS + SET TIMER */
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // 🔥 get exam to read duration
        const examRes = await fetch("http://localhost:5000/api/exams");
        const exams = await examRes.json();
        const exam = exams.find((e) => e._id === examId);

        if (!exam) {
          alert("Exam not found");
          navigate("/attempt-exams");
          return;
        }

        setTimeLeft(exam.duration * 60); // minutes → seconds

        const res = await fetch(
          `http://localhost:5000/api/questions/${examId}`
        );
        const data = await res.json();
        setQuestions(data);
      } catch (err) {
        console.log(err);
        alert("Failed to load exam");
        navigate("/attempt-exams");
      }
    };

    fetchQuestions();
  }, [examId, navigate]);

  /* ⏳ TIMER LOGIC */
  useEffect(() => {
    if (timeLeft <= 0 || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  /* 📝 SELECT ANSWER */
  const handleSelect = (qid, option) => {
    setAnswers((prev) => ({
      ...prev,
      [qid]: option,
    }));
  };

  /* ⏮ ⏭ Navigation */
  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1)
      setCurrentIndex(currentIndex + 1);
  };

  /* ✅ SUBMIT */
  const submitExam = () => {
    if (submitted) return;

    setSubmitted(true);
    localStorage.removeItem("instructionAccepted");
    alert("Exam submitted successfully");
    navigate("/StudentHome");
  };

  /* ⏱ FORMAT TIME */
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (questions.length === 0) {
    return <p style={{ textAlign: "center" }}>Loading questions...</p>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="attempt-exam-page">
      <h2 className="exam-title">Online Examination</h2>

      {/* ⏳ TIMER */}
      <div className={`timer ${timeLeft <= 120 ? "danger" : ""}`}>
        ⏳ Time Left: {minutes}:{seconds < 10 ? "0" : ""}
        {seconds}
      </div>

      {/* QUESTION */}
      <div className="question-box">
        <p>
          <b>Q{currentIndex + 1}.</b> {currentQuestion.questionText}
        </p>

        {currentQuestion.options.map((op, i) => (
          <label key={i} className="option">
            <input
              type="radio"
              name={currentQuestion._id}
              checked={answers[currentQuestion._id] === op}
              onChange={() =>
                handleSelect(currentQuestion._id, op)
              }
            />
            {op}
          </label>
        ))}
      </div>

      {/* NAV BUTTONS */}
      <div className="nav-btns">
        <div className="nav-left">
          <button
            className="prev-btn"
            disabled={currentIndex === 0}
            onClick={prevQuestion}
          >
            Previous
          </button>

          <button
            className="next-btn"
            disabled={currentIndex === questions.length - 1}
            onClick={nextQuestion}
          >
            Next
          </button>
        </div>

        <button className="submit-btn" onClick={submitExam}>
          Submit Exam
        </button>
      </div>

      {/* PALETTE */}
      <div className="palette-section">
        <h4 className="palette-title">Questions</h4>

        <div className="question-palette">
          {questions.map((q, index) => (
            <div
              key={q._id}
              onClick={() => setCurrentIndex(index)}
              className={`palette-box 
                ${answers[q._id] ? "attempted" : "not-attempted"} 
                ${currentIndex === index ? "active" : ""}`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AttemptExamPage;
