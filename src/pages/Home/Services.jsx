import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../../styles/Global.css";

/* ---------------- API ---------------- */
const API = "http://localhost:5000/api/services";

/* ---------------- COMPONENT ---------------- */
export default function OurServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get(API)
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Service load error:", err));
  }, []);

  return (
    <section className="relative py-28 px-6 bg-transparent overflow-hidden font-['Inter']">
      {/* BACKGROUND GLOW */}
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] " />
      <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] " />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* HEADING */}
        <h2 className="text-4xl md:text-4xl font-extrabold text-center mb-16">
          <span className="text-white">Our</span>{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Services
          </span>
        </h2>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service) => (
            <FlipCard key={service._id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FLIP CARD ---------------- */
function FlipCard({ service }) {
  return (
    <div className="perspective-[1400px] group">
      <motion.div
        className="relative h-[360px] w-full preserve-3d transition-transform duration-700"
        whileHover={{
          rotateY: window.innerWidth >= 1024 ? 180 : 0, // desktop only
        }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 backface-hidden">
          <div
            className="
              h-full rounded-3xl p-8
              bg-white/5 backdrop-blur-xl
              border border-white/10
              flex flex-col items-center text-center
              transition-all duration-500
              hover:border-cyan-400/40
              hover:shadow-[0_0_45px_rgba(56,189,248,0.35)]
            "
          >
            {/* TAG */}
            <span className="absolute top-5 right-5 text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300">
              {service.tag}
            </span>

            {/* IMAGE */}
            <div className="w-56 h-49 mb-6 rounded-2xl bg-cyan-400/15 flex items-center justify-center">
              <img
                src={service.img}
                alt={service.title}
                className="w-47 object-contain"
              />
            </div>

            {/* TITLE */}
            <h3 className="text-lg font-semibold text-white mb-3">
              {service.title}
            </h3>

            {/* HINT */}
            <p className="text-sm text-gray-400 mt-auto">
              Hover to view details →
            </p>
          </div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 backface-hidden rotate-y-180">
          <div
            className="
              h-full rounded-3xl p-8
              bg-gradient-to-br from-[#0b1225] to-[#020617]
              border border-cyan-400/30
              flex flex-col justify-center text-center
              shadow-[0_0_50px_rgba(34,211,238,0.35)]
            "
          >
            <h3 className="text-xl font-bold text-cyan-300 mb-4">
              {service.title}
            </h3>

            <p className="text-sm text-gray-300 leading-relaxed">
              {service.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
