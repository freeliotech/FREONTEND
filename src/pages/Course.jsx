import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Courses_slide from "./Course/Cources_slide";
import { ApiContext } from "../config/Api";
import { FaClock, FaUserGraduate, FaArrowRight } from "react-icons/fa";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = ApiContext;

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/courses`);
      
      // ✅ FIX: Handle both array and object responses
      let courseData = [];
      if (Array.isArray(res.data)) {
        courseData = res.data;
      } else if (res.data && typeof res.data === 'object') {
        courseData = res.data.data || res.data.courses || res.data.result || [];
      }
      
      setCourses(courseData);
    } catch (err) {
      console.error("Error loading courses:", err);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <section className="min-h-screen bg-[#1e2a3a] text-white py-16 px-4">
        <div className="flex justify-center items-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading courses...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#1e2a3a] text-white py-16 px-4 overflow-hidden">
      {/* Top Slider */}
      <Courses_slide />

      {/* Course Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-14">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <motion.div
              key={course._id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => window.open(course.courseLink, "_blank")}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border-2 border-purple-500 cursor-pointer transition-all duration-300 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/10"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=Course+Image";
                  }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Duration badge on image */}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-xs text-cyan-300 flex items-center gap-1">
                  <FaClock size={10} />
                  {course.duration || "Flexible"}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Title */}
                <h3 className="text-lg font-bold mb-2 line-clamp-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  {course.title || "Untitled Course"}
                </h3>

                {/* Provider */}
                <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                  <FaUserGraduate size={10} />
                  <span>By <span className="text-cyan-400">{course.providedBy || "Unknown"}</span></span>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 min-h-[60px]">
                  {course.description || "No description available"}
                </p>

                {/* Price & Button */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/10">
                  <span className="text-xl font-bold bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                    ₹{course.price || "0"}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(course.courseLink, "_blank");
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-medium hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group/btn"
                  >
                    Explore
                    <FaArrowRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <p className="text-gray-400 text-lg">No courses available</p>
          </div>
        )}
      </div>
    </section>
  );
}