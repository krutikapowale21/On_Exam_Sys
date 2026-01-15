import React, { useEffect, useState } from "react";
import "./Classes.css";
import { useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import gplogo from "../Auth/gplogo.jpeg";

function Classes() {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/classes")
      .then((res) => res.json())
      .then((data) => {console.log("CLASSES:",data);
        setClasses(data);
  });
}, []);

  return (
    <div className="classes-page">
      {/* Header */}
      <h2 className="classes-title">
        <FaUsers /> All Classes
      </h2>

      {/* Classes List */}
      <div className="classes-grid">
        {classes.map((cls) => (
          <div
            key={cls._id}
            className="class-card"
            onClick={() => navigate(`/class/${cls._id}`)}
          >
            <h3>{cls.className}</h3>
            <p>
              <b>Branch:</b> {cls.branch }
            </p>
            <p>
              <b>Semester:</b> {cls.semester}
            </p>
          </div>
        ))}
      </div>

      {/* College Logo */}
      <div className="college-section">
        <img src={gplogo} alt="College Logo" className="college-logo" />
        <p className="college-name">GOV. POLYTECHNIC SAKOLI</p>
      </div>
    </div>
  );
}

export default Classes;
