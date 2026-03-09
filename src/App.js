import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FrontPage from "./components/Authentication/FrontPage";
import StudentLogin from "./components/Student-ui/StudentLogin";
import Registration from "./components/Student-ui/Registration";
import TeacherLogin from "./components/Teacher-ui/TeacherLogin";
import TeacherHome from "./components/Teacher-ui/TeacherHome";
import StudentHome from "./components/Student-ui/StudentHome";

import CreateClass from "./components/Teacher-ui/CreateClass";
import Classes from "./components/Teacher-ui/Classes";
import ViewClass from "./components/Teacher-ui/ViewClass";
import EditClass from "./components/Teacher-ui/EditClass";
import JoinClass from "./components/Student-ui/JoinClass";
import StudentClassLogin from "./components/Student-ui/StudentClassLogin";

import CreateExam from "./components/Teacher-ui/CreateExam";
import Exams from "./components/Teacher-ui/Exams";
import AddQuestion from "./components/Teacher-ui/AddQuestion";
import EditExam from "./components/Teacher-ui/EditExam";

import AttemptExam from "./components/Student-ui/AttemptExam";
import ExamInstructions from "./components/Student-ui/ExamInstructions";
import AttemptExamPage from "./components/Student-ui/AttemptExamPage";

import StudentResults from "./components/Teacher-ui/StudentResults";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<FrontPage />} />
        <Route path="/StudentLogin" element={<StudentLogin />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/TeacherLogin" element={<TeacherLogin />} />
        <Route path="/TeacherHome" element={<TeacherHome />} />
        <Route path="/StudentHome" element={<StudentHome />} />

        {/* CLASS */}
        <Route path="/CreateClass" element={<CreateClass />} />
        <Route path="/Classes" element={<Classes />} />
        <Route path="/class/:id" element={<ViewClass />} />
        <Route path="/edit-class/:id" element={<EditClass />} />
        <Route path="/join-class/:classId" element={<JoinClass />} />
        <Route path="/class-login/:classCode" element={<StudentClassLogin />} />

        {/* TEACHER EXAM */}
        <Route path="/CreateExam" element={<CreateExam />} />
        <Route path="/Exams" element={<Exams />} />
        <Route path="/add-question/:examId" element={<AddQuestion />} />
        <Route path="/edit-exam/:id" element={<EditExam />} />

        {/* STUDENT EXAM FLOW */}
        <Route path="/attempt-exams" element={<AttemptExam />} />
        <Route path="/exam-instructions/:examId" element={<ExamInstructions />} />
        <Route path="/attempt-exam/:examId" element={<AttemptExamPage />} />

        {/* RESULTS */}
        <Route path="/student-results/:examId" element={<StudentResults />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;