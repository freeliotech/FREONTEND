import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaDatabase,
  FaRobot,
  FaCloud,
  FaGitAlt,
   FaMicrochip,
  FaProjectDiagram,
  FaCogs,
  FaTools,
} from "react-icons/fa";
import { SiMongodb, SiTensorflow, SiDocker } from "react-icons/si";

const slides = [
  {
    title: "Full Stack",
    highlight: "Web Development",
    desc: "MERN stack with real-world projects, APIs, authentication, and deployment to build powerful, scalable web applications and skills.",
    image: "https://www.varianceinfotech.com/assets/front/images/hire-mern-stack-developers/hire-mern-stack-banner-image.png",
    skills: [FaReact, FaNodeJs, SiMongodb, SiDocker],
  },
  {
    title: "Artificial Intelligence",
    highlight: "Machine Learning",
    desc: "Artificial Intelligence and Machine Learning: work on AI models using Python and real-world data, driving innovation and practical solutions.",
    image: "https://cdn3d.iconscout.com/3d/premium/thumb/ai-data-statistics-3d-icon-png-download-6516826.png",
    skills: [FaPython, SiTensorflow, FaRobot, FaDatabase],
  },
  {
   
  tile: "VLSI",
  highlight: " Very Large Scale IntegrationDesign & Verification",
  desc: "Learn VLSI design fundamentals including digital circuits, Verilog HDL, ASIC flow, and chip design with real-world projects.",
  image: "https://i0.wp.com/saventech.com/wp-content/uploads/2025/03/VLSI-Talent-Outsourcing.png?fit=800%2C539&ssl=1",
  skills: [
      FaMicrochip ,
     FaProjectDiagram ,
      FaCogs,
     FaTools ,
  ],
  }
];

export default function SimpleBlackSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((p) => (p + 1) % slides.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const current = slides[index];

  return (
  <section className="w-full bg-trancparent text-white overflow-hidden relative pt-24 md:pt-28 pb-16">

  <AnimatePresence mode="wait">
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full flex items-center min-h-[50vh]"
    >
          <div className="w-full max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

            {/* LEFT CONTENT */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-6xl font-bold leading-tight">
                {current.title}
                <span className="block text-gray-400">
                  {current.highlight}
                </span>
              </h1>

              <p className="text-gray-500 text-sm md:text-lg max-w-md">
                {current.desc}
              </p>

              {/* SKILLS */}
              <div className="flex gap-4 flex-wrap">
                {current.skills.map((Icon, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 flex items-center justify-center
                               bg-[#111] border border-gray-800
                               rounded-lg text-gray-300"
                  >
                    <Icon />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center md:justify-end relative">
              <motion.img
                src={current.image}
                alt="slide"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="w-[260px] md:w-[420px] object-contain"
              />

              {/* SOFT GLOW */}
              <div className="absolute w-72 h-72 bg-gray-800/40 blur-3xl rounded-full" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* DOT INDICATOR */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition ${
              i === index ? "bg-white" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </section>
  );
}