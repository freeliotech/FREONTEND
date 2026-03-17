import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function AdminManageCourses() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: "", img: "", desc: "" });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/courses");
    setCourses(res.data);
  };

  const addCourse = async () => {
    await axios.post("http://localhost:5000/api/admin/courses", newCourse);
    setNewCourse({ name: "", img: "", desc: "" });
    fetchCourses();
  };

  const deleteCourse = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="p-10 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">📘 Manage Courses</h1>

      {/* Add Course Form */}
      <div className="mb-8 space-y-3">
        <input type="text" placeholder="Course Name" value={newCourse.name} onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} className="w-full p-2 rounded text-black" />
        <input type="text" placeholder="Image URL" value={newCourse.img} onChange={(e) => setNewCourse({ ...newCourse, img: e.target.value })} className="w-full p-2 rounded text-black" />
        <textarea placeholder="Description" value={newCourse.desc} onChange={(e) => setNewCourse({ ...newCourse, desc: e.target.value })} className="w-full p-2 rounded text-black" />
        <motion.button whileHover={{ scale: 1.05 }} onClick={addCourse} className="bg-yellow-500 px-6 py-2 rounded-lg font-bold text-black">Add Course</motion.button>
      </div>

      {/* List Courses */}
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <motion.div key={course._id} whileHover={{ scale: 1.05 }} className="bg-gray-800 p-4 rounded-lg text-center">
            <img src={course.img} alt={course.name} className="w-20 h-20 mx-auto mb-4" />
            <h2 className="text-yellow-400 font-bold">{course.name}</h2>
            <p className="text-gray-300 text-sm mt-2">{course.desc}</p>
            <button onClick={() => deleteCourse(course._id)} className="mt-3 bg-red-500 text-white px-4 py-1 rounded">Delete</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
