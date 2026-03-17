import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

/* ==============================
   CARD – CLEAN & MODERN
============================== */
function Card({ title, subtitle, image, onClick, delay = 0 }) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="
        group cursor-pointer
        bg-white/5 backdrop-blur-xl
        border border-white/10
        rounded-2xl p-5
        hover:border-sky-400/40
        hover:shadow-[0_18px_40px_rgba(56,189,248,0.25)]
        transition
      "
    >
      {image && (
        <div className="h-28 mb-4 rounded-xl bg-black/40 flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={title}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}

      <h3 className="text-lg font-semibold text-center text-white">
        {title}
      </h3>

      {subtitle && (
        <p className="text-sm text-center text-gray-400 mt-1">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ==============================
   BACK BUTTON
============================== */
function BackButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: -4 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-2 text-sm text-gray-300 hover:text-white mb-8"
    >
      <span className="text-lg">←</span>
      <span>Back</span>
    </motion.button>
  );
}

/* ==============================
   MAIN COMPONENT
============================== */
export default function Syllabus() {
  const [data, setData] = useState([]);
  const [branch, setBranch] = useState(null);
  const [semester, setSemester] = useState(null);
  const [subject, setSubject] = useState(null);

  useEffect(() => {
    axios
      .get("https://backend-production-7a212.up.railway.app/api/syllabus")
      .then((res) => setData(res.data));
  }, []);

  return (
    <section className="relative min-h-screen px-6 py-24 text-white overflow-hidden">

      {/* 🔥 SAME GLOBAL BACKGROUND */}
      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/20 blur-[160px]" />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-cyan-400/20 blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto">

        <AnimatePresence mode="wait">

          {/* ===== LEVEL 1: BRANCH ===== */}
          {!branch && (
            <motion.div
              key="branch"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
         
               {/* TITLE */}
                    <motion.h2
                      initial={{ opacity: 0, y: -15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-3xl sm:text-3xl text-center font-bold text-transparent bg-clip-text 
                                 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 mb-12 mt-5 uppercase"
                    >
                      🎓Explore Syllabus
                    </motion.h2>

              <p className="text-center text-gray-400 mb-10">
                Select your branch
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
                {data.map((b, i) => {
                  const img =
                    b.img?.startsWith("http")
                      ? b.img
                      : b.img
                      ? `https://backend-production-7a212.up.railway.app${b.img}`
                      : undefined;

                  return (
                    <Card
                      key={i}
                      title={b.branch}
                      subtitle="Open syllabus"
                      image={img}
                      delay={i * 0.05}
                      onClick={() => setBranch(b)}
                    />
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ===== LEVEL 2: SEMESTER ===== */}
          {branch && !semester && (
            <motion.div key="semester" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <BackButton onClick={() => setBranch(null)} />

              <p className="text-center text-gray-400 mb-10">
                {branch.branch} → Select semester
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {branch.semesters.map((s, i) => (
                  <Card
                    key={i}
                    title={`Semester ${s.number}`}
                    subtitle="View subjects"
                    delay={i * 0.05}
                    onClick={() => setSemester(s)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* ===== LEVEL 3: SUBJECT ===== */}
          {semester && !subject && (
            <motion.div key="subject" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <BackButton onClick={() => setSemester(null)} />

              <p className="text-center text-gray-400 mb-10">
                Semester {semester.number} → Subjects
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {semester.subjects.map((s, i) => (
                  <Card
                    key={i}
                    title={s.name}
                    subtitle={s.code}
                    delay={i * 0.05}
                    onClick={() => setSubject(s)}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* ===== LEVEL 4: MODULES ===== */}
          {subject && (
            <motion.div key="modules" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <BackButton onClick={() => setSubject(null)} />

              <p className="text-center text-gray-400 mb-10">
                {subject.name} ({subject.code})
              </p>

              <div className="space-y-6 max-w-4xl mx-auto">
                {subject.modules.map((mod, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="
                      bg-white/5 backdrop-blur-xl
                      border border-white/10
                      rounded-2xl p-6
                    "
                  >
                    <h3 className="font-semibold mb-4">
                      Module {i + 1}: {mod.title}
                    </h3>

                    {mod.topics.map((topic, ti) => (
                      <div key={ti} className="ml-4 mb-2">
                        <p className="text-gray-200">• {topic.title}</p>
                        {topic.subTopics.map((st, si) => (
                          <p key={si} className="ml-4 text-sm text-gray-400">
                            – {st.title}
                          </p>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </section>
  );
}
