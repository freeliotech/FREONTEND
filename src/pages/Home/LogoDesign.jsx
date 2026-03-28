import React from "react";
import { motion } from "framer-motion";
import video  from "../../assets/slide1.mp4"
import {
  FaCheckCircle,
  FaLaptopCode,
  FaMobileAlt,
  FaGlobe,
  FaUserTie,
  FaLightbulb,
  FaRocket,
  FaUsers,
  FaCode
} from "react-icons/fa";

const fade = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0 }
};

const Section = ({ index, title, points, image, reverse, icon }) => {
  return (
    <section className="relative border-b border-white/10 group overflow-hidden">

      {/* Glow Hover Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl"></div>

      {/* Vertical Line */}
      <div className="hidden md:block absolute left-10 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-blue-500 to-transparent animate-pulse"></div>

      <div
        className={`flex flex-col md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        } items-center gap-12 py-20 px-6 md:px-20 relative z-10`}
      >

{/* MEDIA (AUTO IMAGE / VIDEO) */}
<motion.div
  variants={fade}
  initial="hidden"
  whileInView="show"
  transition={{ duration: 0.8 }}
  className="w-full md:w-1/2 flex justify-center"
>
  <div className="relative group w-full max-w-xs">

    {image?.includes(".mp4") ? (
      <video
        src={image}
        autoPlay
        loop
        muted
        playsInline
        className="w-full rounded-xl border border-white/10 shadow-xl object-cover group-hover:scale-110 transition duration-500"
      />
    ) : (
      <img
        src={image}
        alt={title}
        className="w-full rounded-xl border border-white/10 shadow-xl object-cover group-hover:scale-110 transition duration-500"
      />
    )}

    {/* Glow */}
    <div className="absolute inset-0 rounded-xl bg-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition"></div>

  </div>
</motion.div>

        {/* CONTENT */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 relative"
        >

          {/* NUMBER */}
          <div className="absolute -left-14 top-0 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-white/10 text-purple-400 font-bold backdrop-blur-xl">
            {index}
          </div>

          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            {icon} {title}
          </h2>

          <ul className="space-y-4 text-gray-300 text-sm">
            {points.map((p, i) => (
              <li key={i} className="flex gap-3 items-start group/item">
                <FaCheckCircle className="text-purple-400 mt-1 text-sm group-hover/item:scale-125 transition" />
                <span className="group-hover/item:text-white transition">
                  {p}
                </span>
              </li>
            ))}
          </ul>

        </motion.div>
      </div>
    </section>
  );
};

export default function AboutInsaneUI() {
  return (
    <div className="bg-black text-white relative overflow-hidden">

      {/* BACKGROUND ORBS */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>

      {/* HERO */}
      <div className="text-center py-28 px-6 border-b border-white/10 relative z-10">
        <h3 className="text-5xl font-extrabold mb-6">
          About <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">TTIC Hub</span>
        </h3>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Empowering developers with real-world skills, innovation, and next-generation technology experiences.
        </p>
      </div>

      {/* SECTIONS */}
      <Section
        index="01"
        title="Our Culture - Pagg"
        icon={<FaLightbulb />}
        image={video}
        points={[
          "Pagg symbolizes respect, trust, and connection.",
          "We build a strong and supportive learning culture.",
          "Encouraging collaboration and innovation.",
          "Continuous growth mindset for every learner."
        ]}
      />

      <Section
        index="02"
        title="Internship Programs"
        reverse
        icon={<FaLaptopCode />}
        image="https://images.unsplash.com/photo-1552664730-d307ca884978"
        points={[
          "Real-world project-based internships.",
          "Domains: AI/ML, Web, Python, IoT.",
          "Mentorship from experts.",
          "Portfolio + job-ready skills."
        ]}
      />

      <Section
        index="03"
        title="Courses"
        icon={<FaCode />}
        image="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
        points={[
          "Structured beginner to advanced learning.",
          "Modern tech stack (MERN, AI, Cloud).",
          "Hands-on coding approach.",
          "Industry-relevant curriculum."
        ]}
      />

      <Section
        index="04"
        title="Our Mission"
        reverse
        icon={<FaRocket />}
        image="https://images.unsplash.com/photo-1507679799987-c73779587ccf"
        points={[
          "Provide practical education.",
          "Bridge skill gap.",
          "Empower youth.",
          "Create professionals."
        ]}
      />

      <Section
        index="05"
        title="Our Vision"
        icon={<FaUsers />}
        image="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
        points={[
          "Global tech platform.",
          "Strong developer community.",
          "Innovation-driven growth.",
          "Future-ready education."
        ]}
      />

    </div>
  );
}