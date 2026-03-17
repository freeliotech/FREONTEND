import React from "react";
import { motion } from "framer-motion";

export default function ComingSoon() {
  return (
    <div className="relative h-screen w-full bg-black flex items-center justify-center overflow-hidden text-white px-6">

      {/* 3D Floating Cubes Background */}

      <div className="absolute inset-0 overflow-hidden">

        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -80, 0],
              rotateX: [0, 180, 360],
              rotateY: [0, 180, 360]
            }}
            transition={{
              duration: 12 + i,
              repeat: Infinity
            }}
            className="absolute w-40 h-40 border rounded-xl opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              borderColor: ["#06b6d4", "#9333ea", "#22c55e", "#facc15"][i % 4]
            }}
          />
        ))}

      </div>

      {/* Gradient Glow Background */}

      <div className="absolute -top-20 -left-20 w-[380px] h-[380px] bg-cyan-500/20 blur-[180px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-purple-500/20 blur-[200px] rounded-full"></div>

      {/* Floating Orb */}

      <motion.div
        animate={{ y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 blur-3xl rounded-full opacity-50"
      />

      {/* MAIN TEXT */}

      <motion.h1
        initial={{ opacity: 0, scale: 0.6, rotateX: 25 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ duration: 1.3 }}
        className="text-[55px] md:text-[95px] font-extrabold leading-tight text-center
        bg-gradient-to-r from-cyan-300 to-yellow-300 bg-clip-text text-transparent
        drop-shadow-[0_0_55px_rgba(0,255,255,0.7)]"
      >
        COMING<br />SOON
      </motion.h1>

      {/* Description */}

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-32 text-gray-300 text-lg text-center max-w-2xl"
      >
        We are building something futuristic, powerful, and made just for you.
        Get ready for the next generation experience from
        <span className="text-cyan-300 font-semibold"> FreeLioTech</span>.
      </motion.p>

      {/* Neon Line */}

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "330px" }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-24 h-[4px] bg-gradient-to-r
        from-cyan-400 via-white to-yellow-300 rounded-full blur-sm"
      />

    </div>
  );
}