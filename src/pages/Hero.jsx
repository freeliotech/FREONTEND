import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  FaCode,
  FaUserGraduate,
  FaRocket,
  FaReact,
  FaNodeJs,
  FaCloud,
  FaMobileAlt,
  FaStar,
  FaUsers,
  FaCertificate,
  FaCheckCircle,
} from "react-icons/fa";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden text-white">

      {/* 🌈 BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-pink-500/20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/20 blur-[180px]" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/20 blur-[140px] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-8">

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 
            bg-white/10 backdrop-blur-md border border-white/20 
            px-4 py-1 rounded-full text-sm text-gray-300">
            <FaRocket className="text-green-400" />
            Trusted by 10,000+ Students
          </div>

          {/* HEADING */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="block bg-gradient-to-r from-pink-500 via-blue-500 to-green-400 bg-clip-text text-transparent">
              Learn. Build. Launch.
            </span>

            <span className="block text-white/90 mt-3">
              Start Your Tech Career Today 🚀
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            Gain real-world experience with live projects, internships, and mentorship.
            Become job-ready in 
            <span className="text-white"> Web Development</span>,
            <span className="text-white"> App Development</span>, and 
            <span className="text-white"> Cloud Computing</span>.
          </p>

          {/* BENEFITS */}
          <div className="space-y-3 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              Industry-Level Projects
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-blue-400" />
              Internship Certification
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-pink-400" />
              100% Practical Learning
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/courses")}
              className="px-8 py-3 rounded-full 
              bg-gradient-to-r from-pink-500 via-blue-500 to-green-400
              text-white font-semibold shadow-lg"
            >
              Start Learning
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/courses")}
              className="px-8 py-3 rounded-full 
              border border-white/20 text-white/80 
              hover:bg-white/10 backdrop-blur-md"
            >
              Explore Courses
            </motion.button>
          </div>

          {/* 📊 STATS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 pt-8">

            {[
              ["10K+", <FaUsers />, "Students", "text-green-400", "bg-green-500/10"],
              ["50+", <FaCertificate />, "Courses", "text-blue-400", "bg-blue-500/10"],
              ["4.8★", <FaStar />, "Rating", "text-pink-400", "bg-pink-500/10"],
              ["100+", <FaCode />, "Projects", "text-cyan-400", "bg-cyan-500/10"],
              ["24/7", <FaRocket />, "Support", "text-purple-400", "bg-purple-500/10"],
              ["95%", <FaUserGraduate />, "Placement", "text-yellow-400", "bg-yellow-500/10"],
            ].map(([value, icon, label, color, bg], i) => (

              <div
                key={i}
                className="bg-white/5 backdrop-blur-md border border-white/10 
                p-4 rounded-xl text-center
                transition duration-300
                hover:-translate-y-1 hover:bg-white/10 
                hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
              >

                {/* ICON */}
                <div className={`w-10 h-10 mx-auto mb-2 flex items-center justify-center 
                  rounded-full ${bg} ${color} text-lg`}>
                  {icon}
                </div>

                {/* VALUE */}
                <h3 className={`text-lg font-bold ${color}`}>
                  {value}
                </h3>

                {/* LABEL */}
                <p className="text-xs text-gray-400 mt-1">
                  {label}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center">

          {[FaReact, FaNodeJs, FaCloud, FaMobileAlt].map((Icon, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity }}
              className={`absolute text-3xl 
              ${i === 0 && "top-0 left-10 text-cyan-400"}
              ${i === 1 && "bottom-10 left-0 text-green-400"}
              ${i === 2 && "top-20 right-0 text-blue-400"}
              ${i === 3 && "bottom-0 right-10 text-purple-400"}`}
            >
              <Icon />
            </motion.div>
          ))}

          <motion.img
            src="https://internship.virtunexa.com/wp-content/uploads/2024/06/24.png"
            alt="hero"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="w-full max-w-lg drop-shadow-[0_0_40px_rgba(0,255,200,0.3)]"
          />

        </div>

      </div>
    </section>
  );
}