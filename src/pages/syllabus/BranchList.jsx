import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

/* ================= BASE URL ================= */
const BASE_URL = "http://localhost:5000";

/* -----------------------------------------------------------
 🔥 PERFECT 3D NEON BRANCH CARD 
----------------------------------------------------------- */
function BranchCard({ title, img, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.07 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        relative cursor-pointer group
        bg-[#0f172a]/80 backdrop-blur-xl
        border border-cyan-400/30
        rounded-2xl p-6 flex flex-col items-center
        shadow-[0_0_25px_rgba(0,255,255,0.25)]
        hover:shadow-[0_0_40px_rgba(0,255,255,0.65)]
        transition overflow-hidden
      "
    >
      {/* Glow */}
      <div className="absolute -top-12 -right-10 w-40 h-40 bg-cyan-400/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-12 -left-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />

      {/* Image */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-28 h-28 rounded-full overflow-hidden
                   ring-2 ring-cyan-300 shadow-[0_0_20px_cyan]"
      >
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </motion.div>

      {/* Title */}
      <h2 className="text-2xl font-extrabold mt-4
                     text-transparent bg-clip-text
                     bg-gradient-to-r from-cyan-300 to-blue-400
                     drop-shadow-[0_0_10px_cyan]">
        {title}
      </h2>

      {/* Button */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        className="mt-6 px-6 py-2 rounded-xl font-semibold
                   bg-gradient-to-r from-cyan-400 to-blue-500
                   text-black shadow-[0_0_20px_cyan]"
      >
        Explore →
      </motion.button>
    </motion.div>
  );
}

/* -----------------------------------------------------------
   ⭐ MAIN COMPONENT — BranchList
----------------------------------------------------------- */
export default function BranchList() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true); // 🔥 LOADING
  const navigate = useNavigate();

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/syllabus`);

      const updated = res.data.map((b) => ({
        ...b,
        img:
          b.img && b.img.startsWith("http")
            ? b.img
            : b.img
            ? `${BASE_URL}${b.img}`
            : "https://cdn-icons-png.flaticon.com/512/3135/3135794.png",
      }));

      setBranches(updated);
    } catch (err) {
      console.error("Failed to load branches");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-8 min-h-screen bg-black text-white overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-32 left-10 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-32 right-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full" />

      {/* PAGE TITLE */}
      <h1 className="text-5xl font-extrabold text-center mb-12
                     text-transparent bg-clip-text
                     bg-gradient-to-r from-cyan-400 to-blue-500
                     drop-shadow-[0_0_30px_cyan]">
        📚 Select Your Branch
      </h1>

      {/* 🔥 LOADING OVERLAY */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-black/70
                       flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-16 h-16 border-4 border-cyan-400
                         border-t-transparent rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* GRID */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {branches.map((b) => (
            <BranchCard
              key={b._id}
              title={b.branch}
              img={b.img}
              onClick={() => navigate(`/syllabus/${b._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
