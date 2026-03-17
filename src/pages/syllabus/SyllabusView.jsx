import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ================= BASE URL ================= */
const BASE_URL = "http://localhost:5000";

export default function SyllabusView() {
  const { branchId, semIndex, subIndex } = useParams();
  const [subject, setSubject] = useState(null);
  const [loading, setLoading] = useState(true); // 🔥 LOADING

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/syllabus`);
      const branch = res.data.find((b) => b._id === branchId);
      const sem = branch.semesters[semIndex];
      setSubject(sem.subjects[subIndex]);
    } catch (err) {
      console.error("Failed to load syllabus");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative p-6 bg-black min-h-screen text-white overflow-hidden">

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

      {!loading && subject && (
        <>
          <h1 className="text-4xl text-cyan-400 font-bold mb-4">
            {subject.name} ({subject.code})
          </h1>

          {subject.modules.map((mod, mi) => (
            <div
              key={mi}
              className="p-4 bg-gray-900 border border-gray-700 rounded-xl mb-4"
            >
              <h2 className="text-xl text-purple-400 font-bold">
                📘 Module {mi + 1}: {mod.title}
              </h2>

              {mod.topics.map((t, ti) => (
                <div key={ti} className="ml-6 mt-2">
                  <p className="text-yellow-300 text-lg font-semibold">
                    ➤ {t.title}
                  </p>

                  {t.subTopics.map((st, si) => (
                    <p key={si} className="ml-6 text-gray-300">
                      - {st.title}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
