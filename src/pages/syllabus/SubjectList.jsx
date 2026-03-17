import React, { useEffect, useState } from "react";
import axios from "axios";
import SyllabusCard from "../SyllabusCard";
import { useNavigate, useParams } from "react-router-dom";

/* ================= BASE URL ================= */
const BASE_URL = "http://localhost:5000";

export default function SubjectList() {
  const { branchId, semIndex } = useParams();
  const [sem, setSem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/syllabus`);
      const branch = res.data.find((b) => b._id === branchId);
      setSem(branch.semesters[semIndex]);
    } catch (err) {
      console.error("Failed to load subjects");
    }
  };

  if (!sem)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-cyan-400">
        Loading...
      </div>
    );

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <h1 className="text-4xl text-green-400 font-bold mb-6">
        Semester {sem.number} – Subjects
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sem.subjects.map((sub, index) => (
          <SyllabusCard
            key={index}
            title={sub.name}
            subtitle={`Code: ${sub.code}`}
            icon="📚"
            onClick={() =>
              navigate(`/syllabus/${branchId}/${semIndex}/${index}`)
            }
          />
        ))}
      </div>
    </div>
  );
}
