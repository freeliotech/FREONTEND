import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaPython, FaJava, FaJs } from "react-icons/fa";

export default function Internship_Form() {
  return (
    <section className="relative min-h-screen bg-[#04070d] text-white overflow-hidden pt-24 pb-16">

      {/* Glow Background */}

      <div className="absolute -top-20 -left-20 w-[350px] h-[350px] bg-cyan-500/20 blur-[160px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-[180px] rounded-full" />

      {/* Rotating Icons */}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 text-cyan-400 text-5xl opacity-70"
      >
        <FaReact />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-32 left-20 text-yellow-400 text-4xl opacity-70"
      >
        <FaPython />
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-40 right-20 text-red-400 text-5xl opacity-70"
      >
        <FaJava />
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 right-16 text-yellow-300 text-4xl opacity-70"
      >
        <FaJs />
      </motion.div>

      {/* Content */}

      <div className="relative z-10 max-w-5xl mx-auto px-6">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl md:text-4xl font-bold
          bg-gradient-to-r from-cyan-400 via-purple-400 to-yellow-300
          bg-clip-text text-transparent"
        >
          Internship Application Form
        </motion.h1>

        <p className="text-gray-400 text-center mt-3 mb-10">
          Fill out the form carefully. Our team will review your application.
        </p>

        {/* Form Card */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
        >
          <iframe
            src="https://forms.gle/FeTF74TgepKW3ifQ8"
            title="Internship Form"
            className="w-full h-[80vh] border-0"
          />
        </motion.div>
      </div>
    </section>
  );
}