import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaDatabase,
  FaRobot,
  FaCloud,
  FaGitAlt,
} from "react-icons/fa";
import { SiMongodb, SiTensorflow, SiDocker } from "react-icons/si";

/* ================= SKILL BRAND COLORS ================= */
const skillStyles = {
  FaReact: "text-sky-400",
  FaNodeJs: "text-green-400",
  SiMongodb: "text-green-500",
  SiDocker: "text-blue-500",
  FaGitAlt: "text-orange-500",
  FaPython: "text-yellow-400",
  SiTensorflow: "text-orange-400",
  FaRobot: "text-pink-400",
  FaDatabase: "text-indigo-400",
  FaJava: "text-red-400",
  FaCloud: "text-cyan-400",
};

/* ================= INTERNSHIP SLIDES ================= */
const slides = [
  {
    badge: "Live Industry Internship",
    title: "Full Stack",
    highlight: "Web Development",
    desc: "Work on real-world MERN projects, APIs, deployment & teamwork with mentor guidance.",
    image: "https://www.ndu.digital/assets/images/Home-banner-01.png",
    skills: [FaReact, FaNodeJs, SiMongodb, SiDocker, FaGitAlt, FaCloud],
  },
  {
    badge: "AI Career Internship",
    title: "Artificial Intelligence",
    highlight: "& Machine Learning",
    desc: "Hands-on ML models, Python programming, data analysis & real AI use-cases.",
    image: "https://www.ndu.digital/assets/images/Home-banner-01.png",
    skills: [FaPython, SiTensorflow, FaRobot, FaDatabase, FaCloud],
  },
  {
    badge: "Core Engineering Internship",
    title: "Java &",
    highlight: "DSA Internship",
    desc: "Build strong problem-solving skills with DSA, Java & placement interview preparation.",
    image: "https://www.ndu.digital/assets/images/Home-banner-01.png",
    skills: [FaJava, FaDatabase, FaGitAlt, FaCloud],
  },
];

export default function BeuInternshipHeroSlider() {
  const [index, setIndex] = useState(0);
  const [angle, setAngle] = useState(0);

  /* AUTO SLIDE */
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  /* ORBIT ROTATION */
  useEffect(() => {
    const orbit = setInterval(() => {
      setAngle((prev) => prev + 0.25);
    }, 30);
    return () => clearInterval(orbit);
  }, []);

  const current = slides[index];

  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[#04070d] text-white">

      {/* 🔥 SAME GLOWS AS WeProvideDark */}
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/30 blur-[160px]"
      />

      <motion.div
        animate={{ scale: [1, 1.35, 1], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 11, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-96 h-96  blur-[200px]"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-7xl mx-auto px-6
                     grid lg:grid-cols-2 gap-20 items-center min-h-[90vh]"
        >
          {/* ================= LEFT CONTENT ================= */}
          <div className="space-y-6">
            <span className="inline-block px-4 py-1 rounded-full
              bg-cyan-400/20 text-cyan-400 text-sm font-semibold">
              {current.badge}
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold">
              {current.title}
              <span className="block text-cyan-400">
                {current.highlight}
              </span>
            </h1>

            <p className="text-gray-400 max-w-xl text-lg">
              {current.desc}
            </p>


          </div>

          {/* ================= RIGHT ORBIT ================= */}
          <div className="relative flex justify-center items-center">

            {/* ORBIT RINGS */}
            <motion.div
              animate={{ rotate: angle }}
              className="absolute w-[420px] h-[420px]
                         border border-purple-400/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -angle }}
              className="absolute w-[320px] h-[320px]
                         border border-purple-400/20 rounded-full"
            />

            {/* ROUND SKILL LOGOS */}
            {current.skills.map((Icon, i) => {
              const radius = 210;
              const theta =
                (i / current.skills.length) * 2 * Math.PI + angle * 0.01;
              const iconName = Icon.name;

              return (
                <motion.div
                  key={i}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity }}
                  style={{
                    transform: `translate(${Math.cos(theta) * radius}px, ${Math.sin(theta) * radius}px)`,
                  }}
                  className={`
                    absolute w-14 h-14 rounded-full
                    flex items-center justify-center
                    bg-white/10 backdrop-blur-md
                    border border-white/25
                    ring-1 ring-cyan-400/30
                    hover:scale-110 transition
                    ${skillStyles[iconName] || "text-cyan-400"}
                  `}
                >
                  <Icon className="text-2xl" />
                </motion.div>
              );
            })}

            {/* CENTER IMAGE */}
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative z-10 w-72 h-72 rounded-full
                bg-cyan-400/20 flex items-center justify-center
                shadow-[0_0_80px_rgba(0,255,255,0.5)]"
            >
              <img
                src={current.image}
                alt="Internship"
                className="w-56 h-56 object-contain rounded-full
                           bg-black/30 p-4"
              />
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* PROGRESS BAR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2
                      w-[320px] h-1 bg-white/20 rounded-full overflow-hidden">
        <motion.div
          key={index}
          initial={{ width: 0 }}
          animate={{ width: `${((index + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.6 }}
          className="h-full bg-cyan-400"
        />
      </div>
    </section>
  );
}
