import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Pyq() {
  const [data, setData] = useState([]);
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");

  useEffect(() => {
    fetch("https://backend-production-7a212.up.railway.appm/api/pyq")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const branches = [...new Set(data.map((x) => x.branch))];
  const semesters = [
    ...new Set(data.filter((x) => x.branch === branch).map((x) => x.semester)),
  ];
  const subjects = [
    ...new Set(data.filter((x) => x.semester === semester).map((x) => x.subject)),
  ];

  const filtered = data.filter(
    (p) => p.branch === branch && p.semester === semester && p.subject === subject
  );

  return (
    <section className="relative min-h-screen px-6 py-20 text-white overflow-hidden">

      {/* 🔥 SAME GLOBAL BACKGROUND (COPY FROM HERO / COLLEGE / SLIDE) */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* TOP LEFT SKY GLOW */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/20 blur-[160px]" />

      {/* BOTTOM RIGHT CYAN GLOW */}
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-cyan-400/20 blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* TITLE */}

         <motion.h2
                              initial={{ opacity: 0, y: -15 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6 }}
                              className="text-3xl sm:text-3xl text-center font-bold text-transparent bg-clip-text 
                                         bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 mb-12 mt-10 uppercase"
                            >
                              🎓  Previous Year Questions
                            </motion.h2>

        {/* FILTERS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-6 mb-16"
        >
          {[
            { set: setBranch, label: "Select Branch", list: branches },
            { set: setSemester, label: "Select Semester", list: semesters },
            { set: setSubject, label: "Select Subject", list: subjects },
          ].map((item, i) => (
            <select
              key={i}
              onChange={(e) => item.set(e.target.value)}
              className="
                bg-white/5 backdrop-blur-xl
                border border-white/10
                text-white px-5 py-3 rounded-xl
                outline-none
                hover:border-sky-400/40
                focus:ring-2 focus:ring-sky-500/50
                transition
              "
            >
              <option value="">{item.label}</option>
              {item.list.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          ))}
        </motion.div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((p, i) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.04 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="
                bg-white/5 backdrop-blur-xl
                rounded-2xl p-6
                border border-white/10
                hover:border-sky-400/40
                shadow-[0_0_25px_rgba(56,189,248,0.2)]
                hover:shadow-[0_0_40px_rgba(56,189,248,0.35)]
                transition
              "
            >
              <h3 className="text-lg font-semibold text-sky-300 mb-3">
                {p.subject} — {p.year}
              </h3>

              {p.img && (
                <img
                  src={p.img}
                  alt=""
                  className="
                    w-full h-40 object-cover rounded-xl mb-4
                    transition-transform duration-300 hover:scale-105
                  "
                />
              )}

              {p.pdf && (
                <a
                  href={`https://api-freeliotech.onrender.com${p.pdf}`}
                  target="_blank"
                  className="
                    inline-block mt-4 px-5 py-2 rounded-xl
                    bg-gradient-to-r from-sky-400 to-cyan-500
                    text-black font-semibold
                    hover:scale-110 transition
                    shadow-[0_0_18px_rgba(56,189,248,0.7)]
                  "
                >
                  📄 View / Download PDF
                </a>
              )}
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <p className="col-span-full text-center text-gray-400">
              Please select Branch, Semester & Subject
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
