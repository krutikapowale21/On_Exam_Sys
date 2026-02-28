import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ExamInstructions.css";

function ExamInstructions() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);

 const startExam = () => {
  localStorage.setItem("instructionAccepted", examId);
  
    // ✅ Open exam page
navigate(`/exam-start/${examId}`);
  };

  return (
    <div className="instruction-page">
      <h2>Examination Instructions</h2>

      <ul className="instruction-list">
        <li>
          The total duration of the examination is fixed and will not be
          extended under any circumstances.
        </li>
        <li>
          Once the examination starts, it cannot be paused, restarted, or
          resumed.
        </li>
        <li>
          Students must not refresh, close, or navigate away from the browser
          window during the examination.
        </li>
        <li>
          Each question carries equal marks unless otherwise specified.
        </li>
        <li>
          Only one option is correct for each question. Multiple selections are
          not allowed.
        </li>
        <li>
          The examination will be automatically submitted when the allotted
          time expires.
        </li>
        <li>
          Any form of malpractice, including switching tabs or using unfair
          means, may result in disqualification.
        </li>
        <li>
          Ensure a stable internet connection and functional device before
          starting the examination.
        </li>
        <li>
          The institution is not responsible for submission failures due to
          power loss, network issues, or system errors at the student’s end.
        </li>
      </ul>

      {/* Agreement */}
      <div className="agree-box">
        <input
          type="checkbox"
          id="agree"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
        />
        <label htmlFor="agree">
          I have read and understood all the instructions and agree to follow
          them.
        </label>
      </div>

      <button
        className="start-btn"
        disabled={!agree}
        onClick={startExam}
      >
        Start Examination
      </button>
    </div>
  );
}

export default ExamInstructions;