import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

/* ================= BASE URL ================= */
const BASE_URL = "https://backend-production-7a212.up.railway.app";

export default function CollegeSection() {
  const [colleges, setColleges] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // 🔥 LOADING

  useEffect(() => {
    loadColleges();
  }, []);

  const loadColleges = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/colleges`);
      setColleges(res.data);
    } catch (err) {
      console.error("Failed to load colleges");
    } finally {
      setLoading(false);
    }
  };

  const filteredColleges = colleges.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="relative min-h-screen py-20 px-6 text-white overflow-hidden">

      {/* 🔥 BACKGROUND */}
      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/20 blur-[160px]" />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-cyan-400/20 blur-[180px]" />

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

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-3xl text-center font-bold
                     text-transparent bg-clip-text 
                     bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500
                     mb-12 mt-5 uppercase"
        >
          <span className="text-sky-400">Bihar Engineering</span>{" "}
          University Colleges
        </motion.h2>

        {/* SEARCH */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-xl mx-auto mt-6 mb-16"
        >
          <div
            className="flex items-center bg-white/5 backdrop-blur-xl
                       border border-white/10 rounded-xl
                       px-4 py-3 focus-within:border-sky-400/40 transition"
          >
            <input
              type="text"
              placeholder="Search college name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-white
                         placeholder-gray-400 outline-none text-sm"
            />
          </div>
        </motion.div>

        {/* GRID */}
        {!loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {filteredColleges.length === 0 && (
              <p className="col-span-full text-center text-gray-400">
                No colleges found
              </p>
            )}

            {filteredColleges.map((college, index) => (
              <motion.div
                key={college._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -8, scale: 1.03 }}
                onClick={() => window.open(college.link, "_blank")}
                className="cursor-pointer text-center
                           bg-white/5 backdrop-blur-xl
                           border border-white/10 rounded-2xl p-5
                           transition-all duration-300
                           hover:border-sky-400/40
                           hover:shadow-[0_0_35px_rgba(56,189,248,0.25)]"
              >
                {/* IMAGE */}
                <div className="w-full h-28 mb-4 flex items-center
                                justify-center rounded-xl bg-black/40 overflow-hidden">
                  <img
                    src={college.img}
                    alt={college.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* NAME */}
                <h3 className="text-sm font-medium text-gray-200 leading-snug">
                  {college.name}
                </h3>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
