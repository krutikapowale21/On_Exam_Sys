import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FrontPage from "./components/Auth/FrontPage";
import StudentLogin from "./components/Auth/StudentLogin";
import Registration from "./components/Auth/Registration";
import TeacherLogin from "./components/Auth/TeacherLogin";
import TeacherHome from "./components/Auth/TeacherHome";
import StudentHome from "./components/Auth/StudentHome";
import CreateClass from "./components/Auth/CreateClass";
import Classes from "./components/Auth/Classes";
import ViewClass from "./components/Auth/ViewClass";
import CreateExam from "./components/Auth/CreateExam";
import Exams from "./components/Auth/Exams";
import AddQuestion from "./components/Auth/AddQuestion";
import EditExam from "./components/Auth/EditExam";
import AttemptExam from "./components/Auth/AttemptExam";
import AttemptExamPage from "./components/Auth/AttemptExamPage";
import StudentResult from "./components/Auth/StudentResult";
import StudentClassLogin from "./components/Auth/StudentClassLogin";
import JoinClass from "./components/Auth/JoinClass";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} /> {/* Default Page */}
        <Route path="/StudentLogin" element={<StudentLogin />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/TeacherLogin" element={<TeacherLogin />} />
        <Route path="/TeacherHome" element={<TeacherHome />} />
        <Route path="/StudentHome" element={<StudentHome />} />
        <Route path="/CreateClass" element={<CreateClass />} />
        <Route path="/Classes" element={<Classes />} />
        <Route path="/class/:id" element={<ViewClass />} />
        <Route path="/CreateExam" element={<CreateExam />} />
        <Route path="/Exams" element={<Exams />} />
        <Route path="/add-question/:examId" element={<AddQuestion />} />
        <Route path="/edit-exam/:id" element={<EditExam />} />
        <Route path="/attempt-exams" element={<AttemptExam />} />
        <Route path="/attempt-exam/:examId" element={<AttemptExamPage />} />
        <Route path="/student-result/:resultId" element={<StudentResult />} />
        <Route path="/class-login/:classCode" element={<StudentClassLogin />} />
        <Route path="/join-class/:classId" element={<JoinClass />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
