import React from "react";
import { Navigate } from "react-router-dom";

export default function StudentRoute({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;    // Not logged in → login
  // if (role !== "student") return <Navigate to="/" replace />; // Admin → home redirect

  return children;
}
