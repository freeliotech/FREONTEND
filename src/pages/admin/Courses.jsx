import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ApiContext } from "../../config/Api";

export default function ManageCourses() {

const API = ApiContext;

  const [courses, setCourses] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    image: "",
    courseLink: "",
    providedBy: "",
  });

  /* ================= LOAD COURSES ================= */

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {

    try {

      const res = await axios.get(`${API}/courses`);
      setCourses(res.data.data || res.data);

    } catch (err) {

      console.error("Load courses error:", err);

    } finally {

      setLoading(false);

    }
  };

  /* ================= SUBMIT ================= */

  const submit = async (e) => {

    e.preventDefault();

    try {

      if (editId) {

        await axios.put(`${API}/courses/${editId}`, form);

      } else {

        await axios.post(`${API}/courses`, form);

      }

      await loadCourses();
      resetForm();

    } catch (err) {

      console.error("Save error:", err);
      alert("Error saving course");

    }
  };

  /* ================= RESET ================= */

  const resetForm = () => {

    setForm({
      title: "",
      description: "",
      duration: "",
      price: "",
      image: "",
      courseLink: "",
      providedBy: "",
    });

    setEditId(null);

  };

  /* ================= DELETE ================= */

  const del = async (id) => {

    if (!window.confirm("Delete this course?")) return;

    try {

      await axios.delete(`${API}/courses/${id}`);
      loadCourses();

    } catch (err) {

      console.error("Delete error:", err);

    }

  };

  /* ================= EDIT ================= */

  const editCourse = (course) => {

    setForm({
      title: course.title || "",
      description: course.description || "",
      duration: course.duration || "",
      price: course.price || "",
      image: course.image || "",
      courseLink: course.courseLink || "",
      providedBy: course.providedBy || "",
    });

    setEditId(course._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  /* ================= UI ================= */

  return (

    <div className="p-8 bg-black text-white min-h-screen">

      <h2 className="text-3xl font-bold text-cyan-400 text-center uppercase mt-10">
        Manage Courses
      </h2>

      {/* ================= FORM ================= */}

      <form
        onSubmit={submit}
        className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
      >

        {[
          "title",
          "description",
          "duration",
          "price",
          "image",
          "courseLink",
          "providedBy",
        ].map((field) => (

          <input
            key={field}
            value={form[field]}
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
            placeholder={field.toUpperCase()}
            className="p-3 bg-gray-900 border border-cyan-400 rounded-lg outline-none"
            required
          />

        ))}

        <button className="sm:col-span-2 bg-cyan-500 py-3 rounded-lg text-black font-bold hover:bg-cyan-400 transition">
          {editId ? "Update Course" : "Add Course"}
        </button>

        {editId && (

          <button
            type="button"
            onClick={resetForm}
            className="sm:col-span-2 bg-gray-600 py-2 rounded-lg"
          >
            Cancel Edit
          </button>

        )}

      </form>

      {/* ================= COURSE LIST ================= */}

      {loading ? (

        <p className="text-center mt-12 text-gray-400">
          Loading courses...
        </p>

      ) : (

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">

          {courses.map((c) => (

            <motion.div
              key={c._id}
              whileHover={{ scale: 1.03 }}
              className="p-5 bg-gray-800 border border-cyan-500 rounded-xl shadow-lg"
            >

              <img
                src={c.image || "https://via.placeholder.com/300"}
                alt={c.title}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />

              <h3 className="text-xl text-cyan-300 font-semibold">
                {c.title}
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                {c.description}
              </p>

              <p className="text-yellow-400 mt-2">
                {c.duration}
              </p>

              <p className="text-green-400 font-bold">
                ₹{c.price}
              </p>

              <p className="text-blue-400 text-sm mt-1">
                By: {c.providedBy}
              </p>

              <a
                href={c.courseLink}
                target="_blank"
                rel="noreferrer"
                className="block mt-3 text-center bg-cyan-600 py-1 rounded-md hover:bg-cyan-500"
              >
                View Course
              </a>

              <div className="flex gap-2 mt-3">

                <button
                  onClick={() => editCourse(c)}
                  className="bg-yellow-500 w-full py-1 rounded-md hover:bg-yellow-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => del(c._id)}
                  className="bg-red-500 w-full py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>

              </div>

            </motion.div>

          ))}

        </div>

      )}

    </div>

  );
}