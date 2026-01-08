import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ViewClass.css";

function ViewClass() {
  const { id } = useParams(); // classId from URL
  const [cls, setCls] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/class/${id}`)
      .then((res) => res.json())
      .then((data) => setCls(data));
  }, [id]);

  if (!cls) return <p>Loading...</p>;

  return (
    <div className="view-class-container">
      <h2>Class Details</h2>

      <div>
        <p>
        <b>Class Name:</b> {cls.className}
      </p>
      <p>
        <b>Subject:</b> {cls.subject}
      </p>
      <p>
        <b>Semester:</b> {cls.semester}
      </p>
      <p>
        <b>Branch:</b> {cls.branch}
      </p>
      <p>
        <b>Year:</b> {cls.year}
      </p>
      </div>

      <div className="class-link-box">
        <p>
          <b>Class Join Link:</b>
        </p>

        <input value={`http://localhost:3000/join-class/${id}`} readOnly />

        <button
          onClick={() =>
            navigator.clipboard.writeText(
              `http://localhost:3000/join-class/${id}`
            )
          }
        >
          Copy Link
        </button>
      </div>

      <hr />

     <h3>Joined Students ({cls.students.length})</h3>

{cls.students.length === 0 ? (
  <p className="no-students">No students joined yet</p>
) : (
  <table className="students-table">
    <thead>
      <tr>
        <th>Sr. No.</th>
        <th>Enrollment No.</th>
        <th>Student Name</th>
        <th>Password</th>
      </tr>
    </thead>

    <tbody>
      {cls.students.map((s, index) => (
        <tr key={index}>
          <td className="serial">{index + 1}</td>
          <td>{s.enrollment}</td>
          <td>{s.name}</td>
          <td>{s.password}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

    </div>
  );
}

export default ViewClass;
