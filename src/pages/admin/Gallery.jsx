import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ApiContext } from "../../config/Api"; // ✅ STRING BASE URL

export default function ManageGallery() {
  const API_BASE_URL = ApiContext; // ✅ use directly

  const [gallery, setGallery] = useState([]);
  const [src, setSrc] = useState("");
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);

  /* ---------------- FETCH GALLERY ---------------- */
  const loadGallery = async () => {
    const res = await axios.get(`${API_BASE_URL}/gallery`);
    setGallery(res.data);
  };

  useEffect(() => {
    loadGallery();
  }, []);

  /* ---------------- ADD / UPDATE ---------------- */
  const addOrUpdate = async () => {
    if (!src || !title)
      return alert("⚠ Please enter Image URL & Title!");

    if (editId) {
      await axios.put(
        `${API_BASE_URL}/gallery/edit/${editId}`,
        { src, title }
      );
      alert("✔ Updated Successfully!");
    } else {
      await axios.post(
        `${API_BASE_URL}/gallery/add`,
        { src, title }
      );
      alert("✔ Image Added!");
    }

    setSrc("");
    setTitle("");
    setEditId(null);
    loadGallery();
  };

  /* ---------------- DELETE ---------------- */
  const deleteItem = async (id) => {
    if (!window.confirm("Delete this image?")) return;

    await axios.delete(`${API_BASE_URL}/gallery/delete/${id}`);
    loadGallery();
  };

  /* ---------------- EDIT ---------------- */
  const editItem = (g) => {
    setSrc(g.src);
    setTitle(g.title);
    setEditId(g._id);
  };

  return (
    <section className="min-h-screen bg-[#05050c] text-white p-10">
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-cyan-400 drop-shadow-[0_0_20px_cyan] mb-12 mt-15"
      >
        Manage Gallery
      </motion.h1>

      {/* ADD / EDIT PANEL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0b0f1f]/60 backdrop-blur-xl border border-cyan-300/30 shadow-[0_0_35px_rgba(0,255,255,0.2)] max-w-lg mx-auto p-6 rounded-2xl"
      >
        <h2 className="text-xl text-cyan-300 font-semibold mb-4">
          {editId ? "✏ Edit Image" : "➕ Add Image"}
        </h2>

        <input
          type="text"
          placeholder="Image URL"
          className="w-full p-3 mb-4 bg-black/30 border border-cyan-300/40 rounded-xl focus:border-cyan-400 outline-none"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
        />

        <input
          type="text"
          placeholder="Image Title"
          className="w-full p-3 mb-4 bg-black/30 border border-cyan-300/40 rounded-xl focus:border-cyan-400 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={addOrUpdate}
          className="w-full bg-gradient-to-r from-cyan-400 to-yellow-400 text-black font-bold py-3 rounded-xl hover:opacity-90 shadow-lg transition"
        >
          {editId ? "Update" : "Add"}
        </button>
      </motion.div>

      {/* GALLERY GRID */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {gallery.map((g) => (
          <motion.div
            key={g._id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-[#0d1122]/70 backdrop-blur-xl rounded-2xl overflow-hidden border border-cyan-400/20 shadow-[0_0_25px_rgba(0,255,255,0.15)]"
          >
            <img
              src={g.src}
              className="h-44 w-full object-cover rounded-t-xl border-b border-cyan-400/10"
            />

            <div className="p-4">
              <h3 className="text-lg text-cyan-300 font-semibold">
                {g.title}
              </h3>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => editItem(g)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg shadow"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteItem(g._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg shadow"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}