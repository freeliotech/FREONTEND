import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Courses_slide from "./Course/Cources_slide";

export default function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const res = await axios.get(
      "https://backend-production-7a212.up.railway.app/api/courses"
    );
    setCourses(res.data);
  };

  return (
    <section className="bg-[#1e2a3a] text-white py-14 px-4">
      
      {/* TOP SLIDER */}
      <Courses_slide />

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10">
        {courses.map((c, i) => (
          <motion.div
            key={i}
            onClick={() => window.open(c.courseLink, "_blank")}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="group rounded-lg border border-white/50 
                       bg-[#101727] p-4 cursor-pointer 
                       transition-all duration-300
                       hover:border-purple-500 
                       hover:bg-[#101522]
                       hover:shadow-[0_0_12px_rgba(168,85,247,0.25)]"
          >
            {/* IMAGE */}
            <img
              src={c.image}
              alt={c.title}
              className="w-full h-40 object-cover rounded-md mb-3"
            />

            {/* TITLE */}
            <h3 className="text-sm font-medium text-white mb-1 line-clamp-1">
              {c.title}
            </h3>

            {/* PROVIDER */}
            <p className="text-xs text-gray-400 mb-2">
              By {c.providedBy}
            </p>

            {/* DESCRIPTION */}
            <p className="text-xs text-gray-500 line-clamp-2 mb-3">
              {c.description}
            </p>

            {/* FOOTER */}
            <div className="flex justify-between items-center text-xs mt-2">
              <span className="text-yellow-400">{c.duration}</span>
              <span className="text-green-400 font-semibold">
                ₹{c.price}
              </span>
            </div>

            {/* BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open(c.courseLink, "_blank");
              }}
              className="mt-3 w-full text-xs py-2 rounded-md 
                         bg-[#151a24] text-gray-300 
                         hover:bg-purple-600 hover:text-white 
                         transition
                         border-white/50"
            >
              Explore
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}