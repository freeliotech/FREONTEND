import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ApiContext } from "../../config/Api"; // ✅ CENTRAL API

export default function ManageSlides() {
  const API_BASE_URL = ApiContext;
  const SERVER_URL = API_BASE_URL.replace("/api", ""); // for media

  const [slides, setSlides] = useState([]);

  /* ---------- ADD ---------- */
  const [newSlide, setNewSlide] = useState({
    title: "",
    subtitle: "",
    type: "image",
  });
  const [newFile, setNewFile] = useState(null);

  /* ---------- EDIT ---------- */
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    subtitle: "",
    type: "image",
  });
  const [editFile, setEditFile] = useState(null);

  /* ---------------- LOAD SLIDES ---------------- */
  useEffect(() => {
    loadSlides();
  }, []);

  async function loadSlides() {
    const res = await axios.get(`${API_BASE_URL}/slides`);
    const list = res.data.map((s) => ({
      ...s,
      media: SERVER_URL + s.media,
    }));
    setSlides(list);
  }

  /* ---------------- ADD SLIDE ---------------- */
  async function addSlide(e) {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", newSlide.title);
    fd.append("subtitle", newSlide.subtitle);
    fd.append("type", newSlide.type);
    fd.append("media", newFile);

    await axios.post(`${API_BASE_URL}/slides`, fd);

    alert("Slide Added Successfully");
    setNewSlide({ title: "", subtitle: "", type: "image" });
    setNewFile(null);
    loadSlides();
  }

  /* ---------------- DELETE SLIDE ---------------- */
  async function deleteSlide(id) {
    if (!window.confirm("Delete this slide?")) return;
    await axios.delete(`${API_BASE_URL}/slides/${id}`);
    loadSlides();
  }

  /* ---------------- START EDIT ---------------- */
  function startEdit(slide) {
    setEditing(slide._id);
    setEditData({
      title: slide.title,
      subtitle: slide.subtitle,
      type: slide.type,
    });
    setEditFile(null);
  }

  /* ---------------- UPDATE SLIDE ---------------- */
  async function updateSlide(e) {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", editData.title);
    fd.append("subtitle", editData.subtitle);
    fd.append("type", editData.type);
    if (editFile) fd.append("media", editFile);

    await axios.put(`${API_BASE_URL}/slides/${editing}`, fd);

    alert("Updated!");
    setEditing(null);
    loadSlides();
  }

  return (
    <div className="min-h-screen bg-[#05050c] px-6 py-10 text-white">

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-cyan-400 mb-15 mt-15 drop-shadow-[0_0_25px_cyan] uppercase"
      >
        ⚡ Manage Hero Slides
      </motion.h1>

      {/* ADD SLIDE */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0b0f1f]/60 border border-cyan-400/30 backdrop-blur-xl p-8 rounded-2xl shadow mb-12"
      >
        <h2 className="text-2xl text-cyan-300 font-semibold mb-6">
          ➕ Add New Slide
        </h2>

        <form onSubmit={addSlide} className="grid md:grid-cols-2 gap-6">
          <input
            className="bg-black/20 p-3 rounded-lg border border-cyan-300/30"
            placeholder="Slide Title"
            value={newSlide.title}
            onChange={(e) =>
              setNewSlide({ ...newSlide, title: e.target.value })
            }
          />

          <input
            className="bg-black/20 p-3 rounded-lg border border-cyan-300/30"
            placeholder="Subtitle"
            value={newSlide.subtitle}
            onChange={(e) =>
              setNewSlide({ ...newSlide, subtitle: e.target.value })
            }
          />

          <select
            className="bg-black/20 p-3 rounded-lg border border-purple-300/40"
            value={newSlide.type}
            onChange={(e) =>
              setNewSlide({ ...newSlide, type: e.target.value })
            }
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>

          <input
            type="file"
            className="bg-black/20 p-3 rounded-lg border border-purple-300/40"
            onChange={(e) => setNewFile(e.target.files[0])}
          />

          <button className="col-span-2 bg-gradient-to-r from-cyan-400 to-purple-500 p-3 rounded-xl text-black font-bold">
            Add Slide
          </button>
        </form>
      </motion.div>

      {/* EDIT SLIDE */}
      {editing && (
        <div className="bg-[#0a0e1d]/80 border border-yellow-400/30 p-8 rounded-2xl mb-12">
          <h2 className="text-2xl text-yellow-300 mb-4">✏ Edit Slide</h2>

          <form onSubmit={updateSlide} className="grid md:grid-cols-2 gap-6">
            <input
              className="bg-black/20 p-3 rounded-lg border border-yellow-300/40"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />

            <input
              className="bg-black/20 p-3 rounded-lg border border-yellow-300/40"
              value={editData.subtitle}
              onChange={(e) =>
                setEditData({ ...editData, subtitle: e.target.value })
              }
            />

            <select
              className="bg-black/20 p-3 rounded-lg border border-yellow-300/40"
              value={editData.type}
              onChange={(e) =>
                setEditData({ ...editData, type: e.target.value })
              }
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>

            <input
              type="file"
              className="bg-black/20 p-3 rounded-lg border border-yellow-300/40"
              onChange={(e) => setEditFile(e.target.files[0])}
            />

            <button className="col-span-2 bg-yellow-400 text-black p-3 rounded-xl font-bold">
              Update Slide
            </button>
          </form>
        </div>
      )}

      {/* SLIDES LIST */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {slides.map((slide) => (
          <motion.div
            key={slide._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.04 }}
            className="rounded-2xl bg-[#0d1020]/80 border border-cyan-400/20 p-5"
          >
            <h3 className="text-xl font-bold text-cyan-300">
              {slide.title}
            </h3>
            <p className="text-gray-400 mb-4">{slide.subtitle}</p>

            {slide.type === "video" ? (
              <video
                src={slide.media}
                controls
                className="w-full h-48 object-cover rounded-xl"
              />
            ) : (
              <img
                src={slide.media}
                className="w-full h-48 object-cover rounded-xl"
                alt="slide"
              />
            )}

            <div className="flex justify-between mt-5">
              <button
                onClick={() => startEdit(slide)}
                className="px-4 py-2 rounded-lg bg-purple-500"
              >
                Edit
              </button>

              <button
                onClick={() => deleteSlide(slide._id)}
                className="px-4 py-2 rounded-lg bg-red-500"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}