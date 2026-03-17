import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  FaCode,
  FaLaptopCode,
  FaUserGraduate,
  FaRocket,
  FaReact,
  FaNodeJs,
  FaCloud,
  FaMobileAlt,
} from "react-icons/fa";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden text-white">

      {/* BACKGROUND GLOW */}

      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/20 blur-[160px]"
      />

      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-[200px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}

        <div className="space-y-7">

          {/* TRUST BADGE */}

          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1 rounded-full text-sm text-gray-300 mt-5">
            <FaRocket className="text-cyan-400" />
            India's Fast Growing IT Training Platform
          </div>

          {/* HEADING */}

          <h3 className="text-4xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
              Learn. Build. Launch.
            </span>

            <span className="block text-white/90 mt-2">
              Your Career in Technology Starts Here
            </span>
          </h3>

          {/* DESCRIPTION */}

          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            Gain real-world experience through industry-level internships, live
            projects, and expert mentorship. We prepare students for careers in
            <span className="text-white"> Web Development</span>,
            <span className="text-white"> Mobile App Development</span>,
            <span className="text-white"> Cloud Computing</span>
            and modern digital technologies.
          </p>

          {/* FEATURE GRID */}

          <div className="grid grid-cols-2 gap-4 text-gray-300 text-sm">

            <div className="flex items-center gap-2">
              <FaCode className="text-cyan-400" />
              Live Project Training
            </div>

            <div className="flex items-center gap-2">
              <FaLaptopCode className="text-cyan-400" />
              Full Stack Development
            </div>

            <div className="flex items-center gap-2">
              <FaUserGraduate className="text-cyan-400" />
              Industry Internship
            </div>

            <div className="flex items-center gap-2">
              <FaRocket className="text-cyan-400" />
              Career Growth
            </div>

          </div>

          {/* BUTTONS */}

          <div className="flex gap-4 pt-4">

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/courses")}
              className="px-8 py-3 rounded-full bg-cyan-400 text-black font-semibold shadow-[0_0_25px_rgba(0,255,255,0.45)]"
            >
              Start Learning
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/courses")}
              className="px-8 py-3 rounded-full border border-cyan-400/60 text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
            >
              View Courses
            </motion.button>

          </div>

          {/* STATS */}

          <div className="flex gap-10 pt-10">

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="relative flex justify-center">

          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-0 left-10 text-cyan-400 text-3xl"
          >
            <FaReact />
          </motion.div>

          <motion.div
            animate={{ y: [0, -18, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-10 left-0 text-green-400 text-3xl"
          >
            <FaNodeJs />
          </motion.div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute top-20 right-0 text-blue-400 text-3xl"
          >
            <FaCloud />
          </motion.div>

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute bottom-0 right-10 text-purple-400 text-3xl"
          >
            <FaMobileAlt />
          </motion.div>

          <motion.img
            src="https://internship.virtunexa.com/wp-content/uploads/2024/06/24.png"
            alt="hero"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="w-full max-w-lg drop-shadow-[0_0_40px_rgba(0,255,255,0.35)]"
          />

        </div>

      </div>

    </section>
  );
}