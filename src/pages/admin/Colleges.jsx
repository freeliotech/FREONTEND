import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ApiContext } from "../../config/Api"; // ✅ CENTRAL API

export default function AdminManageColleges() {
  const API_BASE_URL = useContext(ApiContext); // ✅ from context

  const [colleges, setColleges] = useState([]);
  const [form, setForm] = useState({ name: "", img: "", link: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/colleges`);
      setColleges(res.data);
    } catch (err) {
      console.error(err);
      alert("Error loading colleges");
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addCollege = async () => {
    if (!form.name || !form.img || !form.link) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/colleges/add`, form);
      setForm({ name: "", img: "", link: "" });
      load();
    } catch (err) {
      alert("Failed to add college");
    } finally {
      setLoading(false);
    }
  };

  const deleteCollege = async (id) => {
    if (!window.confirm("Delete this college?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/colleges/delete/${id}`);
      load();
    } catch {
      alert("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-[#05080f] text-white p-8 relative overflow-hidden">

      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-600/30 blur-[200px]" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-600/30 blur-[220px]" />

      {/* Page Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-transparent bg-clip-text 
                   bg-gradient-to-r from-cyan-400 to-purple-400 mb-10 drop-shadow-[0_0_20px_cyan]"
      >
        🎓 Manage Colleges
      </motion.h2>

      {/* Add College Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl p-6 rounded-2xl bg-[#0d1627]/70 backdrop-blur-xl 
                   border border-cyan-400/20 shadow-[0_0_20px_rgba(0,255,255,0.3)] mb-12"
      >
        <h3 className="text-xl font-semibold text-cyan-300 mb-4">
          Add New College
        </h3>

        <div className="space-y-3">
          {["name", "img", "link"].map((field) => (
            <motion.input
              whileFocus={{ scale: 1.03 }}
              key={field}
              name={field}
              placeholder={
                field === "name"
                  ? "College Name"
                  : field === "img"
                  ? "Logo URL"
                  : "Official Website"
              }
              value={form[field]}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-[#111b2e] border border-cyan-300/20
                         focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/50
                         outline-none transition-all"
            />
          ))}

          <motion.button
            onClick={addCollege}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 
                       text-black font-bold rounded-lg py-3 shadow-[0_0_20px_cyan]
                       hover:from-cyan-300 hover:to-blue-400 transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add College"}
          </motion.button>
        </div>
      </motion.div>

      {/* College List */}
      <div className="space-y-5 max-w-4xl">
        {colleges.length === 0 && (
          <p className="text-gray-400">No colleges added yet.</p>
        )}

        {colleges.map((c, index) => (
          <motion.div
            key={c._id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="relative bg-[#0e182b]/80 p-5 rounded-xl border border-cyan-400/20 
                       shadow-[0_0_18px_rgba(0,255,255,0.2)] flex items-center justify-between
                       hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition"
          >
            <div className="flex items-center gap-4">
              <img
                src={c.img}
                alt={c.name}
                className="w-14 h-14 rounded-lg object-contain bg-white p-1 shadow-lg"
              />

              <div>
                <h3 className="text-lg font-bold text-cyan-300">{c.name}</h3>
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-400 text-sm underline hover:text-blue-300"
                >
                  Visit Website
                </a>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => deleteCollege(c._id)}
              className="px-4 py-2 text-red-400 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
            >
              Delete
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}