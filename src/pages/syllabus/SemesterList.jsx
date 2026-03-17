import React, { useEffect, useState } from "react";
import axios from "axios";
import SyllabusCard from "../SyllabusCard";
import { useNavigate, useParams } from "react-router-dom";

/* ================= BASE URL ================= */
const BASE_URL = "http://localhost:5000";

export default function SemesterList() {
  const { branchId } = useParams();
  const [branch, setBranch] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/syllabus`);
      const found = res.data.find((b) => b._id === branchId);
      setBranch(found);
    } catch (err) {
      console.error("Failed to load semester list");
    }
  };

  if (!branch)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-cyan-400">
        Loading...
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <h1 className="text-4xl text-yellow-400 font-bold mb-6">
        {branch.branch} – Semesters
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {branch.semesters.map((sem, index) => (
          <SyllabusCard
            key={index}
            title={`Semester ${sem.number}`}
            subtitle="View subjects"
            icon="📘"
            onClick={() =>
              navigate(`/syllabus/${branchId}/${index}`)
            }
          />
        ))}
      </div>
    </div>
  );
}
