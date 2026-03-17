import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBell, FaFilePdf } from "react-icons/fa";

export default function BEUNotices() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/notices")
      .then(res => setNotices(res.data));
  }, []);

  return (
    <section className="min-h-screen bg-[#020617] font-bold text-white px-6 py-20  mt-9">
      <h2 className="text-3xl  text-center mb-12 text-cyan-400 uppercase">
        Official Notices
      </h2>

      <div className="max-w-5xl mx-auto space-y-6">
        {notices.map((n) => (
          <motion.div
            key={n._id}
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 border border-white/10 rounded-xl p-6"
          >
            <div className="flex items-center gap-3">
              <FaBell className="text-cyan-400" />
              <h3 className="text-lg font-semibold">{n.title}</h3>
              {n.important && (
                <span className="ml-2 text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-400">
                  Important
                </span>
              )}
            </div>

            <p className="text-gray-400 mt-2 text-sm">
              {n.type} • {new Date(n.date).toDateString()}
            </p>

            {n.pdfUrl && (
              <a
                href={n.pdfUrl}
                target="_blank"
                className="inline-flex items-center gap-2 mt-4 text-cyan-300"
              >
                <FaFilePdf /> View PDF
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
