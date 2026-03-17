import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Courses_slide from "./Course/Cources_slide";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

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
    <>
  
      <section className="relative bg-[#04070d] text-white py-16 px-4 overflow-hidden top">
            <Courses_slide />

        {/* BACKGROUND GLOW ELEMENTS */}
        <div className="absolute top-0 left-0 w-[180px] h-[180px] opacity-25 "></div>
        <div className="absolute bottom-0 right-0 w-[180px] h-[180px] bg-purple-500 blur-[160px] opacity-25"></div>

        {/* COURSES GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto relative z-10">
          {courses.map((c, i) => (
            <motion.div
              key={i}
              onClick={() => window.open(c.courseLink, "_blank")}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative rounded-xl overflow-hidden border border-cyan-500/20
                         bg-[#0d1118]/90 shadow-[0_0_20px_rgba(0,255,255,0.15)]
                         hover:shadow-[0_0_25px_rgba(0,255,255,0.3)]
                         backdrop-blur-lg p-5 group cursor-pointer"
            >
              {/* MULTICOLOR ANIMATED BORDER */}
              <div
                className="absolute inset-0 p-[2px] rounded-xl z-0
                           bg-[conic-gradient(from_var(--angle),#00eaff,#bc13fe,#007bff,#ff00f2,#00eaff)]
                           opacity-30 group-hover:opacity-70 transition animate-spin-slow"
                style={{
                  WebkitMask:
                    "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                  WebkitMaskComposite: "xor",
                }}
              ></div>

              {/* CONTENT */}
              <div className="relative z-10 flex flex-col h-full">

                {/* IMAGE */}
                <motion.img
                  src={c.image}
                  alt={c.title}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-54 object-cover rounded-lg mb-4 shadow-md"
                />

                {/* TEXT CONTENT */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl sm:text-2xl text-cyan-300 mb-1">
                      {c.title}
                    </h3>

                    {/* ✅ ONLY ADDED LINE */}
                    <p className="text-gray-400 text-sm mb-2">
                      By {c.providedBy}
                    </p>

                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3 mb-4">
                      {c.description}
                    </p>
                  </div>

                  {/* FOOTER */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-3">
                    <div className="flex gap-4 text-sm sm:text-base">
                      <p className="text-yellow-400 font-medium">
                        {c.duration}
                      </p>
                      <p className="text-green-400 font-semibold">
                        ₹{c.price}
                      </p>
                    </div>

                   <motion.button
  whileHover={{ scale: 1.08, boxShadow: "0 0 15px cyan" }}
  whileTap={{ scale: 0.95 }}
  onClick={(e) => {
    e.stopPropagation();
    window.open(c.courseLink, "_blank");
  }}
  className="py-2 px-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500
             hover:from-cyan-300 hover:via-blue-300 hover:to-purple-400
             text-black text-sm sm:text-base font-semibold rounded-lg
             shadow-[0_0_12px_rgba(0,255,255,0.4)] transition w-full sm:w-auto"
>
  Explore Now
</motion.button>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* KEYFRAME ANIMATION FOR BORDER */}
        <style>
          {`
            @keyframes spinSlow {
              0% { --angle: 0deg; }
              100% { --angle: 360deg; }
            }
            .animate-spin-slow {
              animation: spinSlow 6s linear infinite;
            }
          `}
        </style>
      </section>
    </>
  );
}