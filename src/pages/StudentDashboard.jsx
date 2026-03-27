import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaCertificate,
  FaProjectDiagram,
} from "react-icons/fa";
import { MdWork } from "react-icons/md";
import { RiFilePaper2Fill } from "react-icons/ri";

/* ================= API ================= */
const BASE_URL = "https://backend-production-7a212.up.railway.app/api/auth";
const UPLOADS_URL = "https://backend-production-7a212.up.railway.app/uploads";

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [active, setActive] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [updated, setUpdated] = useState({});
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  /* ================= LOAD USER ================= */
  const loadUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setUpdated(res.data);
    } catch {
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  /* ================= SAVE ================= */
  const saveChanges = async () => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(updated).forEach((key) => {
      if (updated[key]) formData.append(key, updated[key]);
    });

    try {
      await axios.put(`${BASE_URL}/update-profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile Updated");
      setEditMode(false);
      loadUser();
    } catch {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADING ================= */
  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-14 h-14 border-4 border-cyan-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white mt-20">
      
      {/* ================= SIDEBAR ================= */}
      <div className="w-full md:w-64 border-b md:border-r border-white/10 p-4 md:p-6 bg-black backdrop-blur-xl">
        
        <h2 className="text-xl font-bold text-cyan-400 mb-4 md:mb-6">
          Dashboard
        </h2>

        {/* MOBILE → horizontal scroll */}
        <nav className="flex md:flex-col gap-2 overflow-x-auto">
          <MenuItem icon={<FaUserGraduate />} label="Profile" id="profile" active={active} setActive={setActive}/>
          <MenuItem icon={<MdWork />} label="Internship" id="internship" active={active} setActive={setActive}/>
          <MenuItem icon={<FaProjectDiagram />} label="Projects" id="projects" active={active} setActive={setActive}/>
          <MenuItem icon={<FaCertificate />} label="Certificate" id="certificate" active={active} setActive={setActive}/>
          <MenuItem icon={<RiFilePaper2Fill />} label="LOR" id="lor" active={active} setActive={setActive}/>
        </nav>

      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 p-4 md:p-10 relative overflow-auto">
        
        {loading && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="w-14 h-14 border-4 border-cyan-400 border-t-transparent rounded-full"
            />
          </div>
        )}

        {/* ================= PROFILE ================= */}
        {active === "profile" && (
          <div className="w-full max-w-lg mx-auto bg-[#0b1220]
          border border-cyan-500/20 rounded-3xl p-4 md:p-8">

            <h1 className="text-center text-2xl md:text-3xl font-bold mb-6 text-cyan-400">
              Student Profile
            </h1>

            <div className="flex flex-col items-center text-center">
              <img
                src={
                  updated?.photo instanceof File
                    ? URL.createObjectURL(updated.photo)
                    : user?.photo
                    ? `${UPLOADS_URL}/${user.photo}`
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                className="w-24 md:w-28 h-24 md:h-28 rounded-full border-2 border-cyan-400"
              />

              <h2 className="mt-4 text-lg md:text-xl">{user?.name}</h2>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>

            <div className="mt-6 space-y-2">
              <Info label="Father Name" value={updated?.fatherName} name="fatherName" editMode={editMode} setUpdated={setUpdated}/>
              <Info label="College" value={updated?.college} name="college" editMode={editMode} setUpdated={setUpdated}/>
              <Info label="Course" value={updated?.currentCourse} name="currentCourse" editMode={editMode} setUpdated={setUpdated}/>
            </div>

            <div className="mt-6 flex flex-col md:flex-row gap-3 justify-between">
              {!editMode ? (
                <button onClick={() => setEditMode(true)}
                  className="px-6 py-2 bg-cyan-400 text-black rounded-lg">
                  Edit
                </button>
              ) : (
                <>
                  <button onClick={saveChanges}
                    className="px-6 py-2 bg-green-500 text-black rounded-lg">
                    Save
                  </button>
                  <button onClick={() => setEditMode(false)}
                    className="px-6 py-2 bg-red-500 text-black rounded-lg">
                    Cancel
                  </button>
                </>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

/* ================= MENU ITEM ================= */
function MenuItem({ icon, label, id, active, setActive }) {
  return (
    <button
      onClick={() => setActive(id)}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap
      ${active === id
        ? "bg-cyan-400 text-black"
        : "hover:bg-white/10"}`}
    >
      {icon}
      {label}
    </button>
  );
}

/* ================= INFO ================= */
function Info({ label, value, name, editMode, setUpdated }) {
  return (
    <div className="flex justify-between items-center bg-[#020617] px-3 py-2 rounded-xl">
      <span className="text-gray-400 text-sm">{label}</span>
      {editMode ? (
        <input
          defaultValue={value || ""}
          onChange={(e) =>
            setUpdated((prev) => ({ ...prev, [name]: e.target.value }))
          }
          className="bg-black px-2 py-1 rounded text-right text-sm"
        />
      ) : (
        <span className="text-sm">{value || "-"}</span>
      )}
    </div>
  );
}