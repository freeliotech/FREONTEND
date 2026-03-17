import { Routes, Route } from "react-router-dom";
import Certificate from "./Certificates";
import Admin from "./AdminDashboard";

function AdminDashboard() {
  return (
    <Routes>
      <Route path="/certificate" element={<Certificate />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default AdminDashboard;
