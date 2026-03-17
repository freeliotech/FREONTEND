import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUserGraduate, FaCertificate, FaProjectDiagram } from "react-icons/fa";
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
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(res.data);
      setUpdated(res.data);

    } catch (err) {

      console.log(err);
      alert("Failed to load profile");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
    loadUser();
  }, []);

  /* ================= SAVE PROFILE ================= */

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
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Profile Updated");
      setEditMode(false);
      loadUser();

    } catch (err) {

      console.log(err);
      alert("Update failed");

    } finally {

      setLoading(false);

    }

  };

  /* ================= LOADING ================= */

  if (!user) {

    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-14 h-14 border-4 border-cyan-400 border-t-transparent rounded-full"
        />
      </div>
    );

  }

  return (

    <div className="flex min-h-screen bg-black text-white mt-20">

      {/* ================= SIDEBAR ================= */}

      <div className="w-64 border-r border-white/10 p-6 bg-black backdrop-blur-xl">

        <h2 className="text-xl font-bold text-cyan-400 mb-6">
          Student Dashboard
        </h2>

        <nav className="space-y-3">

          <MenuItem icon={<FaUserGraduate />} label="Profile" id="profile" active={active} setActive={setActive}/>
          <MenuItem icon={<MdWork />} label="Internship" id="internship" active={active} setActive={setActive}/>
          <MenuItem icon={<FaProjectDiagram />} label="Projects" id="projects" active={active} setActive={setActive}/>
          <MenuItem icon={<FaCertificate />} label="Certificate" id="certificate" active={active} setActive={setActive}/>
          <MenuItem icon={<RiFilePaper2Fill />} label="LOR" id="lor" active={active} setActive={setActive}/>

        </nav>

      </div>

      {/* ================= CONTENT ================= */}

      <div className="flex-1 p-10 relative overflow-auto">

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

          <div className="max-w-lg mx-auto bg-gradient-to-b from-[#0b1220] to-[#020617]
          border border-cyan-500/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,255,255,0.1)]">

            <h1 className="text-center text-3xl font-bold mb-6 text-cyan-400">
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
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-2 border-cyan-400"
              />

              {editMode && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setUpdated((prev) => ({
                      ...prev,
                      photo: e.target.files[0]
                    }))
                  }
                  className="mt-3 text-sm"
                />
              )}

              <h2 className="mt-4 text-xl">{user?.name}</h2>
              <p className="text-gray-400">{user?.email}</p>
              <p className="text-gray-400">{user?.mobile}</p>

            </div>

            <div className="mt-6 space-y-2">

              <Info label="Father Name" value={updated?.fatherName} name="fatherName" editMode={editMode} setUpdated={setUpdated}/>
              <Info label="Mother Name" value={updated?.motherName} name="motherName" editMode={editMode} setUpdated={setUpdated}/>
              <Info label="College" value={updated?.college} name="college" editMode={editMode} setUpdated={setUpdated}/>
              <Info label="12th %" value={updated?.percentage12} name="percentage12" editMode={editMode} setUpdated={setUpdated}/>
              <Info label="Course" value={updated?.currentCourse} name="currentCourse" editMode={editMode} setUpdated={setUpdated}/>

            </div>

            <div className="mt-6 flex justify-between">

              {!editMode ? (

                <button
                  onClick={() => setEditMode(true)}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-lg"
                >
                  Edit Profile
                </button>

              ) : (

                <>
                  <button
                    onClick={saveChanges}
                    className="px-6 py-2 bg-green-500 text-black rounded-lg"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditMode(false)}
                    className="px-6 py-2 bg-red-500 text-black rounded-lg"
                  >
                    Cancel
                  </button>
                </>

              )}

            </div>

          </div>

        )}

        {/* ================= INTERNSHIP ================= */}

        {active === "internship" && (
          <ContentCard title="Internship Details">
            <ComingSoon/>
          </ContentCard>
        )}

        {/* ================= PROJECTS ================= */}

        {active === "projects" && (
          <ContentCard title="Projects">
            <ComingSoon/>
          </ContentCard>
        )}

        {/* ================= CERTIFICATE ================= */}

        {active === "certificate" && (

          <ContentCard title="Internship Certificate">

            {user?.certificate ? (

              <button
                onClick={() => window.open(`/verify/${user.certificate}`)}
                className="px-6 py-2 bg-green-500 text-black rounded"
              >
                View Certificate
              </button>

            ) : (

              <ComingSoon/>

            )}

          </ContentCard>

        )}

        {/* ================= LOR ================= */}

        {active === "lor" && (

          <ContentCard title="Letter of Recommendation">

            {user?.lor ? (

              <button
                onClick={() => window.open(`${UPLOADS_URL}/lor.pdf`)}
                className="px-6 py-2 bg-purple-500 text-black rounded-lg"
              >
                Download LOR
              </button>

            ) : (

              <ComingSoon/>

            )}

          </ContentCard>

        )}

      </div>

    </div>

  );

}

/* ================= MENU ITEM ================= */

function MenuItem({ icon, label, id, active, setActive }) {

  return (

    <button
      onClick={()=>setActive(id)}
      className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition
      ${active===id 
      ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black" 
      : "hover:bg-white/10"}`}
    >
      {icon}
      {label}
    </button>

  );

}

/* ================= CONTENT CARD ================= */

function ContentCard({ title, children }) {

  return (

    <div className="max-w-lg mx-auto bg-[#0b1220] border border-cyan-500/20
    rounded-xl p-6 space-y-3">

      <h2 className="text-xl font-bold text-cyan-400">{title}</h2>

      {children}

    </div>

  );

}

/* ================= INFO ================= */

function Info({ label, value, name, editMode, setUpdated }) {

  return (

    <div className="flex justify-between items-center bg-[#020617] px-4 py-2 rounded-xl
    border border-cyan-500/10">

      <span className="text-gray-400">{label}</span>

      {editMode ? (

        <input
          type="text"
          defaultValue={value || ""}
          onChange={(e) =>
            setUpdated((prev) => ({
              ...prev,
              [name]: e.target.value
            }))
          }
          className="bg-black/40 border border-cyan-400/30 px-2 py-1 rounded text-right outline-none"
        />

      ) : (

        <span>{value || "-"}</span>

      )}

    </div>

  );

}

/* ================= COMING SOON ================= */

function ComingSoon(){

  return(
    <div className="text-center py-6 text-yellow-400 text-xl">
      Coming Soon 🚀
    </div>
  )

}