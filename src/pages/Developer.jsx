import React from "react";
import { motion } from "framer-motion";

// Skill Icons
import {
  FaReact,
  FaNodeJs,
  FaFigma,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiGreensock,
  SiFramer,
  SiFirebase,
} from "react-icons/si";

import { TbApi } from "react-icons/tb";

import SanujPhoto from "../assets/sanuj.jpg";

// -------------------- Skill List --------------------
const skills = [
  { name: "React", icon: <FaReact className="text-cyan-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-400" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
  { name: "Express.js", icon: <SiExpress className="text-gray-300" /> },
  { name: "TailwindCSS", icon: <SiTailwindcss className="text-cyan-300" /> },
  { name: "GSAP", icon: <SiGreensock className="text-green-300" /> },
  { name: "Framer Motion", icon: <SiFramer className="text-pink-400" /> },
  { name: "Firebase", icon: <SiFirebase className="text-yellow-400" /> },
  { name: "REST API", icon: <TbApi className="text-blue-400" /> },
  { name: "UI/UX Design", icon: <FaFigma className="text-purple-400" /> },
];

// -------------------- Founder Details --------------------
const founder = {
  name: "Sanuj Kumar",
  role: "Founder & Full Stack Developer",
  photo: SanujPhoto,
  about:
    "I am a passionate Full Stack Developer and Founder of FreeLioTech. My mission is to provide high-quality internship training, freelancing services, and modern technical education for students and startups.",
  socials: {
    linkedin: "https://linkedin.com/",
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
  },
};

// -------------------- Animation Variants --------------------
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const staggerSkills = {
  show: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const skillAnim = {
  hidden: { opacity: 0, scale: 0.7 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 140 },
  },
};

export default function DeveloperSection() {
  return (
    <section className="relative bg-black text-white py-20 px-6 font-[Poppins] overflow-hidden">

      {/* 🔥 ANIMATED GLOWING BACKGROUND PARTICLES */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 bg-cyan-400/20 rounded-full blur-2xl"
            initial={{
              x: Math.random() * 1200,
              y: Math.random() * 800,
              scale: Math.random() * 1.8,
            }}
            animate={{
              y: ["0px", "-50px", "0px"],
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
            }}
          ></motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-20">

        {/* -------------------- Title -------------------- */}
        <motion.h2
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-4xl mt-7 font-bold text-center text-cyan-400 mb-4 "
        >
          Founder & Developer
        </motion.h2>

        {/* -------------------- Founder Card -------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.02, rotateX: 8, rotateY: -6 }}
          className="mt-14 bg-gray-900/60 backdrop-blur-xl border border-cyan-400/30 
          rounded-3xl p-10 shadow-[0_0_35px_rgba(0,255,255,0.15)]
          flex flex-col md:flex-row items-center gap-12"
        >

          {/* -------------------- Developer Photo -------------------- */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.img
              whileHover={{ scale: 1.08 }}
              src={founder.photo}
              alt={founder.name}
              className="w-84 h-58 object-cover rounded-full border-1 border-green-400 
              shadow-[0_0_15px_green]"
            />
          </motion.div>

          {/* -------------------- Developer Info -------------------- */}
          <div className="text-left">

            <motion.h3
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-3xl font-bold text-cyan-300"
            >
              {founder.name}
            </motion.h3>

            <p className="text-gray-300 text-lg mb-4">{founder.role}</p>

            <motion.p
              initial="hidden"
              animate="show"
              variants={fadeUp}
              transition={{ delay: 0.1 }}
              className="text-gray-400 leading-relaxed mb-6"
            >
              {founder.about}
            </motion.p>

            {/* -------------------- Skills -------------------- */}
            <motion.h4
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-yellow-400 font-semibold mb-3 text-lg"
            >
              Core Skills
            </motion.h4>

            <motion.div
              variants={staggerSkills}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-3 mb-8"
            >
              {skills.map((s, i) => (
                <motion.div
                  key={i}
                  variants={skillAnim}
                  whileHover={{ scale: 1.12 }}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-400/10 
                  rounded-full border border-cyan-500/30 hover:bg-cyan-500/20
                  shadow-[0_0_10px_green] transition-all cursor-default"
                >
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-sm text-cyan-200">{s.name}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* -------------------- Social Icons -------------------- */}
            <motion.h4
              initial="hidden"
              animate="show"
              variants={fadeUp}
              className="text-yellow-400 font-semibold text-lg mb-3"
            >
              Connect With Me
            </motion.h4>

            <div className="flex gap-6 text-3xl">
              {[
                { icon: <FaLinkedin />, url: founder.socials.linkedin, color: "text-blue-400" },
                { icon: <FaInstagram />, url: founder.socials.instagram, color: "text-pink-400" },
                { icon: <FaFacebook />, url: founder.socials.facebook, color: "text-blue-500" },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.url}
                  target="_blank"
                  whileHover={{ scale: 1.3, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className={`${s.color} drop-shadow-[0_0_12px] hover:opacity-90`}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
