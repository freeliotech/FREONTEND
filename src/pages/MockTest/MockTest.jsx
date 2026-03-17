import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function MockTest() {
  const [data, setData] = useState([]);
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    fetch("https://api-freeliotech.onrender.com/api/mocktest")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const branches = [...new Set(data.map((p) => p.branch))];
  const semesters = [
    ...new Set(data.filter((p) => p.branch === branch).map((p) => p.semester)),
  ];
  const subjects = [
    ...new Set(
      data
        .filter((p) => p.branch === branch && p.semester === semester)
        .map((p) => p.subject)
    ),
  ];

  const filtered = data.filter(
    (p) =>
      p.branch === branch &&
      p.semester === semester &&
      p.subject === subject
  );

  return (
    <section className="relative min-h-screen px-6 py-28 text-white overflow-hidden">

      {/* 🔥 SAME GLOBAL BACKGROUND */}
      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/20 blur-[160px]" />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-cyan-400/20 blur-[180px]" />

      <div className="relative z-10 w-full max-w-4xl mx-auto">

        {/* TITLE */}
  
               <motion.h2
                              initial={{ opacity: 0, y: -15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6 }}
                              className="text-3xl sm:text-3xl text-center font-bold text-transparent bg-clip-text 
                                         bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 mb-12 mt-0 uppercase"
                            >
                              🎓Select Mock Test
                            </motion.h2>

        {/* FILTERS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-center gap-5"
        >
          {/* BRANCH */}
          <select
            onChange={(e) => setBranch(e.target.value)}
            className="
              w-full md:w-64 px-4 py-3 rounded-xl
              bg-white/5 backdrop-blur-xl
              border border-white/10
              text-green outline-none
              hover:border-sky-400/40
              focus:ring-2 focus:ring-sky-500/40
              transition
            "
          >
            <option value="">Select Branch</option>
            {branches.map((b, i) => (
              <option key={i}>{b}</option>
            ))}
          </select>

          {/* SEMESTER */}
          <select
            disabled={!branch}
            onChange={(e) => setSemester(e.target.value)}
            className={`
              w-full md:w-64 px-4 py-3 rounded-xl border outline-none transition
              ${
                branch
                  ? "bg-white/5 backdrop-blur-xl border-white/10 text-white hover:border-sky-400/40 focus:ring-2 focus:ring-sky-500/40"
                  : "bg-black/40 border-white/5 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            <option value="">Select Semester</option>
            {semesters.map((s, i) => (
              <option key={i}>{s}</option>
            ))}
          </select>

          {/* SUBJECT */}
          <select
            disabled={!semester}
            onChange={(e) => setSubject(e.target.value)}
            className={`
              w-full md:w-64 px-4 py-3 rounded-xl border outline-none transition
              ${
                semester
                  ? "bg-white/5 backdrop-blur-xl border-white/10 text-white hover:border-sky-400/40 focus:ring-2 focus:ring-sky-500/40"
                  : "bg-black/40 border-white/5 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            <option value="">Select Subject</option>
            {subjects.map((s, i) => (
              <option key={i}>{s}</option>
            ))}
          </select>
        </motion.div>

        {/* START BUTTON */}
        {filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-20"
          >
            <Link
              to={`/start-test?branch=${branch}&semester=${semester}&subject=${subject}`}
              className="
                inline-block px-12 py-4 rounded-2xl
                bg-gradient-to-r from-sky-400 to-cyan-500
                text-black font-bold
                hover:scale-110 transition
                shadow-[0_0_25px_rgba(56,189,248,0.8)]
              "
            >
              🚀 Start Mock Test
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
