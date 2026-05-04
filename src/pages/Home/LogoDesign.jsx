import React from "react";
import { motion } from "framer-motion";
import video from "../../assets/slide1.mp4";
import {
  FaCheckCircle,
  FaLaptopCode,
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

      {/* Glow Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl"></div>

      {/* Line */}
      <div className="hidden md:block absolute left-10 top-0 bottom-0 w-[2px] bg-gradient-to-b from-purple-500 via-blue-500 to-transparent"></div>

      <div
        className={`flex flex-col md:flex-row ${
          reverse ? "md:flex-row-reverse" : ""
        } items-center gap-16 md:gap-20 py-20 px-6 md:px-20 relative z-10`}
      >

        {/* MEDIA */}
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="show"
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <div className="relative group w-full max-w-lg md:max-w-xl lg:max-w-2xl">

            {image?.includes(".mp4") ? (
              <video
                src={image}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[260px] md:h-[340px] lg:h-[420px] rounded-xl border border-white/10 shadow-xl object-cover group-hover:scale-105 transition duration-500"
              />
            ) : (
              <img
                src={image}
                alt={title}
                className="w-full h-[260px] md:h-[340px] lg:h-[420px] rounded-xl border border-white/10 shadow-xl object-cover group-hover:scale-105 transition duration-500"
              />
            )}

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
              <li key={i} className="flex gap-3 items-start">
                <FaCheckCircle className="text-purple-400 mt-1 text-sm" />
                <span>{p}</span>
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

      {/* HERO */}
      <section className="text-center py-28 px-6 border-b border-white/10">
        <p className="text-sm text-purple-400 mb-3 uppercase tracking-wide">
          Innovation • Training • Certification
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mb-5">
          About{" "}
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            TTIC Hub
          </span>
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Empowering developers with real-world skills, hands-on experience,
          and innovation-driven learning.
        </p>
      </section>

      {/* SECTIONS */}

      <Section
        index="01"
        title="Our Culture - Pagg"
        icon={<FaLightbulb />}
        image={video}
        points={[
          "Pagg represents respect, trust, and strong connection.",
          "Supportive and inclusive learning environment.",
          "Collaboration and teamwork focused culture.",
          "Hands-on real-world problem solving.",
          "Continuous learning and growth mindset.",
          "Mentorship-driven skill development."
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
          "Live project experience.",
          "Expert mentorship.",
          "Build strong portfolio.",
          "Job-ready skill development."
        ]}
      />

      <Section
        index="03"
        title="Courses"
        icon={<FaCode />}
        image="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
        points={[
          "Beginner to advanced structured learning.",
          "Modern tech: MERN, AI, Cloud.",
          "Hands-on coding approach.",
          "Project-based learning.",
          "Industry-relevant syllabus.",
          "Strong concept building."
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
          "Bridge academic & industry gap.",
          "Empower youth with skills.",
          "Create job-ready professionals.",
          "Encourage innovation.",
          "Support career growth."
        ]}
      />

      <Section
        index="05"
        title="Our Vision"
        icon={<FaUsers />}
        image="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
        points={[
          "Global tech learning platform.",
          "Strong developer community.",
          "Innovation-driven education.",
          "Future-ready professionals.",
          "Promote creativity & leadership.",
          "Expand tech opportunities."
        ]}
      />

    </div>
  );
}