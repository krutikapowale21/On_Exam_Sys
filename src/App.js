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
<<<<<<< HEAD
import JoinClass from "./components/Auth/JoinClass";
import StudentClassLogin from "./components/Auth/StudentClassLogin";

=======
import EditClass from "./components/Auth/EditClass";
>>>>>>> 93376bd1af05580232d9d040a6a6b5f2b121a87e
import CreateExam from "./components/Auth/CreateExam";
import Exams from "./components/Auth/Exams";
import AddQuestion from "./components/Auth/AddQuestion";
import EditExam from "./components/Auth/EditExam";

import AttemptExam from "./components/Auth/AttemptExam";
import ExamInstructions from "./components/Auth/ExamInstructions";
import AttemptExamPage from "./components/Auth/AttemptExamPage";
<<<<<<< HEAD
// import StudentResults from "./components/Auth/StudentResults";
import ExamStartCountdown from "./components/Auth/ExamStartCountdown";
=======
import StudentResults from "./components/Auth/StudentResults";
import StudentClassLogin from "./components/Auth/StudentClassLogin";
import JoinClass from "./components/Auth/JoinClass";
import ExamInstructions from "./components/Auth/ExamInstructions";
>>>>>>> 93376bd1af05580232d9d040a6a6b5f2b121a87e

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
<<<<<<< HEAD
        <Route path="/join-class/:classId" element={<JoinClass />} />
        <Route path="/class-login/:classCode" element={<StudentClassLogin />} />

        {/* TEACHER EXAM */}
=======
        <Route path="/edit-class/:id" element={<EditClass />} />
>>>>>>> 93376bd1af05580232d9d040a6a6b5f2b121a87e
        <Route path="/CreateExam" element={<CreateExam />} />
        <Route path="/Exams" element={<Exams />} />
        <Route path="/add-question/:examId" element={<AddQuestion />} />
        <Route path="/edit-exam/:id" element={<EditExam />} />

        {/* STUDENT EXAM FLOW */}
        <Route path="/attempt-exams" element={<AttemptExam />} />
<<<<<<< HEAD
        <Route path="/exam-instructions/:examId" element={<ExamInstructions />} />
        <Route path="/exam-start/:examId" element={<ExamStartCountdown />}/>
        <Route path="/attempt-exam/:examId" element={<AttemptExamPage />} />

        {/* RESULT */}
        {/* <Route path="/student-results" element={<StudentResults />} /> */}

=======
        <Route path="/exam-instructions/:examId" element={<ExamInstructions/>}/>
        <Route path="/attempt-exam/:examId" element={<AttemptExamPage />} />
        <Route path="/student-results/:examId" element={<StudentResults />} />
        <Route path="/class-login/:classCode" element={<StudentClassLogin />} />
        <Route path="/join-class/:classId" element={<JoinClass />} />
>>>>>>> 93376bd1af05580232d9d040a6a6b5f2b121a87e
      </Routes>
    </BrowserRouter>
  );
}

export default App;
