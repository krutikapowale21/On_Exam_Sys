// // import React, { useEffect, useState } from "react";

// // function StudentResults() {
// //   const [results, setResults] = useState([]);
// //   const student = JSON.parse(localStorage.getItem("student"));

// //   useEffect(() => {
// //     if (!student || !student._id) {
// //       alert("Please login again");
// //       return;
// //     }

// //     fetch(
// //       `http://localhost:5000/api/results/student/${student._id}`
// //     )
// //       .then((res) => res.json())
// //       .then((data) => setResults(data))
// //       .catch((err) => console.log(err));
// //   }, []);

// //   return (
//     <div>
// //       <h2>My Results</h2>

// //       {results.length === 0 ? (
// //         <p>No results found</p>
// //       ) : (
// //         results.map((r, index) => (
// //           <div key={index}>
// //             <p><b>Exam:</b> {r.examName}</p>
// //             <p><b>Marks:</b> {r.marks}</p>
// //             <p><b>Result:</b> {r.result}</p>
// //             <hr />
// //           </div>
// //         ))
// //       )}
// //     </div>
// //   );
// // }

// // export default StudentResults;
