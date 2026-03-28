import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* ===== Layout ===== */
import Navbar from "./components/Nav";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Background from "./components/Background";

/* ===== Route Guards ===== */
import AdminRoute from "./components/AdminRoute";
import Student from "./components/StudentRoute";

/* ===== Public Pages ===== */
import Home from "./pages/Home";
import Auth from "./pages/Auth/Auth";
import Contact from "./pages/Contect";
import ComingSoon from "./pages/ComingSoon";
import Developer from "./pages/Developer";
import Course from "./pages/Course";
import Pyq from "./pages/Pyq";
import MockTest from "./pages/MockTest/MockTest";
import StartTest from "./pages/MockTest/StartTest";
import ResultPage from "./pages/MockTest/Result";
import Intership from "./pages/Intership/Intership_home";
import Pms from "./pages/BEU-S/Guide/Pms";
import CertificateForm from "./pages/CertificateForm";
import ChatWidget from "./ChatWidget";
import Collage from "./pages/Collage";
import ErrorPage from "./pages/ErrorPagg/Error";
import BeuNews from "./pages/BEU-S/BEUNotices";

/* ===== Student ===== */
import StudentDashboard from "./pages/StudentDashboard";

/* ===== Admin ===== */
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageCourses from "./pages/admin/Courses";
import ManageInternships from "./pages/admin/ManageInternship";
import InternshipBranch from "./pages/admin/Intership";
import ManagePyq from "./pages/ManagePyq";
import ManageMocktest from "./pages/admin/Mocktest";
import ManageSyllabus from "./pages/admin/ManageSyllabus";
import UserData from "./pages/admin/Userdata";
import Gallerymanage from "./pages/admin/Gallery";
import SlideManage from "./pages/admin/Slide";
import ContactManage from "./pages/admin/Contect";
import CollegeManage from "./pages/admin/Colleges";

import Service from "./pages/admin/ManageServices";
import IDCardGenerator from "./pages/admin/IDCardGenerator";
import BeuNotis from "./pages/admin/AdminNotices";

/* ===== Syllabus ===== */
import SyllabusCard from "./pages/SyllabusCard";
import BranchList from "./pages/syllabus/BranchList";
import SemesterList from "./pages/syllabus/SemesterList";
import SubjectList from "./pages/syllabus/SubjectList";
import SyllabusView from "./pages/syllabus/SyllabusView";

/* ===== Support ===== */
import Terms from "./pages/suports/Terms";
import Privacy from "./pages/suports/Privacy";
import Rules from "./pages/suports/Rules";

/* ===== Extra ===== */
import ServicesWeb from "./pages/Home/Web_dev";
import ServicesApp from "./pages/Home/App_Dov";
import BeuHome from "./pages/BEU-S/Beu_home";
import LogoDesign from "./pages/Home/LogoDesign";
import View_deatils from "./pages/Intership/View_deatils";
import VerifyCertificate from "./pages/VerifyCertificate";
import Cartificate_all from "./pages/admin/Cartificate_intership";
import About_ttic from "./pages/Home"
/* ===== Styles ===== */
import "./styles/pyq.css";

function App() {
return ( <Router> <Background /> <div className="relative z-10"> <CustomCursor /> <Navbar />

    <Routes>

      {/* ===== PUBLIC ===== */}
      <Route path="/" element={<Home />} />
      <Route path="/beu/home" element={<BeuHome />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/comingsoon" element={<ComingSoon />} />
      <Route path="/developer" element={<Developer />} />
      <Route path="/courses" element={<Course />} />

      <Route path="/chatbot" element={<ChatWidget />} />
      <Route path="/college" element={<Collage />} />
      <Route path="/beu-news" element={<BeuNews />} />
      <Route path="/verify/:id" element={<VerifyCertificate/>} />

      {/* ===== SERVICES ===== */}
      <Route path="/services/app" element={<ServicesApp />} />
      <Route path="/services/web" element={<ServicesWeb />} />
      <Route path="/services/about" element={<LogoDesign />} />

      {/* ===== INTERNSHIP ===== */}
      <Route path="/internship" element={<Intership />} />
      <Route path="/internship/details" element={<View_deatils />} />

      {/* ===== BEU ===== */}
      <Route path="/pms" element={<Pms />} />

      {/* ===== PYQ / MOCK ===== */}
      <Route path="/pyq" element={<Pyq />} />
      <Route path="/mocktest" element={<MockTest />} />
      <Route path="/start-test" element={<StartTest />} />
      <Route path="/mock-result" element={<ResultPage />} />

      {/* ===== STUDENT ===== */}
      <Route
        path="/student-dashboard"
        element={
          <Student>
            <StudentDashboard />
          </Student>
        }
      />

      {/* ===== ADMIN ===== */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route path="/admin/courses" element={<AdminRoute><ManageCourses /> </AdminRoute>} />
      <Route path="/admin/internships" element={<AdminRoute><ManageInternships /> </AdminRoute>} />
      <Route path="/admin/internship" element={<AdminRoute><InternshipBranch /> </AdminRoute>} />
      <Route path="/admin/pyq" element={<AdminRoute><ManagePyq /> </AdminRoute>} />
      <Route path="/admin/mocktest" element={<AdminRoute><ManageMocktest /> </AdminRoute>} />
      <Route path="/admin/syllabus" element={<AdminRoute><ManageSyllabus /> </AdminRoute>} />
      <Route path="/admin/userdata" element={<AdminRoute><UserData /> </AdminRoute>} />
      <Route path="/admin/gallery" element={<AdminRoute><Gallerymanage /> </AdminRoute>} />
      <Route path="/admin/slides" element={<AdminRoute><SlideManage /> </AdminRoute>} />
      <Route path="/admin/contacts" element={<AdminRoute><ContactManage /> </AdminRoute>} />
      <Route path="/admin/colleges" element={<AdminRoute><CollegeManage /> </AdminRoute>} />
      <Route path="/admin/services" element={<AdminRoute><Service /> </AdminRoute>} />
      <Route path="/admin/idcards" element={<AdminRoute><IDCardGenerator /> </AdminRoute>} />
      <Route path="/admin/beunotis" element={<AdminRoute><BeuNotis /> </AdminRoute>} />
      <Route path="/admin/certificates" element={<AdminRoute><CertificateForm /> </AdminRoute>} />
      <Route path="/admin/certificates/all" element={<AdminRoute><Cartificate_all /> </AdminRoute>} />

      {/* ===== SYLLABUS ===== */}
      <Route path="/syllabus" element={<SyllabusCard />} />
      <Route path="/syllabus/branches" element={<BranchList />} />
      <Route path="/syllabus/:branchId" element={<SemesterList />} />
      <Route path="/syllabus/:branchId/:semIndex" element={<SubjectList />} />
      <Route
        path="/syllabus/:branchId/:semIndex/:subIndex"
        element={<SyllabusView />}
      />

      {/* ===== SUPPORT ===== */}
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy-policy" element={<Privacy />} />
      <Route path="/rules" element={<Rules />} />
      <Route path="about" element={<About_ttic />} />

      {/* ===== 404 ===== */}
      <Route path="*" element={<ErrorPage />} />
     
    </Routes>
  </div>
  <ChatWidget />

  <Footer />
</Router>


);
}

export default App;
