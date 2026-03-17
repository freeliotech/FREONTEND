import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaTrash, FaPlus, FaBell } from "react-icons/fa";
import { ApiContext } from "../../config/Api"; // 👈 ADD

export default function AdminNotices() {
  const API_BASE_URL = useContext(ApiContext); // 👈 ADD

  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({
    title: "",
    type: "General",
    pdfUrl: "",
    important: false,
  });

  const load = async () => {
    const res = await axios.get(`${API_BASE_URL}/notices`);
    setNotices(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.title) return alert("Title is required");

    await axios.post(`${API_BASE_URL}/notices`, form);

    setForm({
      title: "",
      type: "General",
      pdfUrl: "",
      important: false,
    });

    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this notice?")) return;

    await axios.delete(`${API_BASE_URL}/notices/${id}`);
    load();
  };

  return (
    <section className="min-h-screen bg-[#020617] text-white px-6 py-24">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-cyan-500/20 blur-[220px]" />
      <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] bg-purple-500/20 blur-[240px]" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-14">

        {/* HEADER */}
        <div className="flex items-center gap-4">
          <FaBell className="text-cyan-400 text-3xl" />
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Admin – Notice Management
          </h1>
        </div>

        {/* ================= ADD NOTICE FORM ================= */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={submit}
          className="
            bg-white/5 backdrop-blur-xl
            border border-white/10
            rounded-2xl p-8
            shadow-[0_0_35px_rgba(56,189,248,0.25)]
            grid md:grid-cols-2 gap-6
          "
        >
          <div className="md:col-span-2">
            <label className="text-sm text-gray-400">Notice Title</label>
            <input
              className="w-full mt-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400 outline-none"
              placeholder="Enter notice title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Notice Type</label>
            <select
              className="w-full mt-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400 outline-none"
              value={form.type}
              onChange={(e) =>
                setForm({ ...form, type: e.target.value })
              }
            >
              <option>General</option>
              <option>Exam</option>
              <option>Academic</option>
              <option>Registration</option>
              <option>Result</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400">PDF URL (optional)</label>
            <input
              className="w-full mt-1 px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-cyan-400 outline-none"
              placeholder="https://example.com/file.pdf"
              value={form.pdfUrl}
              onChange={(e) =>
                setForm({ ...form, pdfUrl: e.target.value })
              }
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.important}
              onChange={(e) =>
                setForm({ ...form, important: e.target.checked })
              }
              className="w-5 h-5 accent-red-400"
            />
            <span className="text-sm text-red-400 font-medium">
              Mark as Important
            </span>
          </div>

          <div className="md:col-span-2">
            <button
              className="
                w-full flex items-center justify-center gap-2
                px-6 py-3 rounded-xl font-bold
                bg-gradient-to-r from-cyan-400 to-blue-500
                text-black
                hover:scale-[1.02] transition
                shadow-[0_0_20px_rgba(56,189,248,0.6)]
              "
            >
              <FaPlus />
              Add Notice
            </button>
          </div>
        </motion.form>

        {/* ================= NOTICE LIST ================= */}
        <div className="space-y-4">
          {notices.map((n, i) => (
            <motion.div
              key={n._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="
                flex flex-col md:flex-row md:items-center md:justify-between gap-4
                bg-white/5 backdrop-blur-xl
                border border-white/10
                rounded-xl p-5
                hover:border-cyan-400/40
                transition
              "
            >
              <div>
                <h3 className="font-semibold text-lg">
                  {n.title}
                  {n.important && (
                    <span className="ml-3 text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                      Important
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {n.type} • {new Date(n.date).toDateString()}
                </p>
              </div>

              <button
                onClick={() => remove(n._id)}
                className="
                  flex items-center gap-2
                  px-4 py-2 rounded-xl
                  bg-red-500/10 text-red-400
                  hover:bg-red-500/20
                  transition
                "
              >
                <FaTrash />
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}