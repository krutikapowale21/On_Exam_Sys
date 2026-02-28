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
  const [submitted, setSubmitted] = useState(false);

  /* 🔐 Instruction Check */
  useEffect(() => {
    if (checked.current) return;
    const accepted = localStorage.getItem("instructionAccepted");
    if (accepted !== examId) navigate("/attempt-exams");
    checked.current = true;
  }, [examId, navigate]);

  /* 📥 Fetch Questions */
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/questions/${examId}`
        );
        const data = await res.json();
        setQuestions(data);
      } catch {
        alert("Failed to load questions");
        navigate("/attempt-exams");
      }
    };
    fetchQuestions();
  }, [examId, navigate]);

  /* 📝 Select Answer */
  const handleSelect = (qid, option) => {
    setAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  /* ⏮ ⏭ Navigation */
  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1)
      setCurrentIndex(currentIndex + 1);
  };

  /* ✅ Submit */
  const submitExam = () => {
    if (submitted) return;

    const attempted = Object.keys(answers).length;
    const unattempted = questions.length - attempted;

    if (unattempted > 0) {
      const ok = window.confirm(
        `You have ${unattempted} unanswered question(s).\nDo you want to submit the exam?`
      );
      if (!ok) return;
    }

    setSubmitted(true);
    localStorage.removeItem("instructionAccepted");
    alert("Exam submitted successfully");
    navigate("/StudentHome");
  };

  if (questions.length === 0)
    return <p style={{ textAlign: "center" }}>Loading questions...</p>;

  const currentQuestion = questions[currentIndex];
  const attemptedCount = Object.keys(answers).length;
  const unattemptedCount = questions.length - attemptedCount;

  return (
    <div className="attempt-exam-layout">
      {/* LEFT : QUESTION AREA */}
      <div className="attempt-exam-page">
       <h2 className="exam-title">Online Examination</h2>


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
                onChange={() => handleSelect(currentQuestion._id, op)}
              />
              {op}
            </label>
          ))}
        </div>

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
      </div>

      {/* RIGHT : PALETTE + STATUS */}
      <div className="exam-status-panel">
        {/* QUESTION PALETTE */}
        <div className="palette-section">
          <h3 className="palette-title">Questions</h3>
          <div className="question-palette">
            {questions.map((q, index) => (
              <div
                key={q._id}
                onClick={() => setCurrentIndex(index)}
                className={`palette-box
                  ${answers[q._id] ? "attempted" : "not-attempted"}
                  ${currentIndex === index ? "active" : ""}
                `}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* STATUS */}
        <h3>Status</h3>
        <div className="status attempted">
          Attempted: <b>{attemptedCount}</b>
        </div>
        <div className="status unattempted">
          Unattempted: <b>{unattemptedCount}</b>
        </div>
        <div className="status total">
          Total Questions: <b>{questions.length}</b>
        </div>
      </div>
    </div>
  );
}

export default AttemptExamPage;