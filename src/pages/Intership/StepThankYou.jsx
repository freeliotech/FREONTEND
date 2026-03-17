import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function StepThankYou() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full text-center bg-[#0b1425]/90 backdrop-blur-xl border border-green-400/20 rounded-3xl p-12 shadow-[0_0_40px_rgba(0,255,0,0.1)]"
      >

        {/* Icon */}

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex justify-center mb-6"
        >
          <FaCheckCircle className="text-green-400 text-7xl" />
        </motion.div>

        {/* Title */}

        <h1 className="text-4xl font-bold text-green-400">
          Application Submitted
        </h1>

        {/* Message */}

        <p className="text-gray-300 mt-4 text-lg">
          Thank you for applying to our internship program.
        </p>

        <p className="text-gray-400 mt-2">
          Our team will review your application and contact you shortly.
        </p>

        {/* Info Box */}

        <div className="mt-8 bg-[#04070d] border border-white/10 rounded-xl p-5 text-sm text-gray-400">
          Please check your email for further instructions regarding the
          internship process.
        </div>

        {/* Buttons */}

        <div className="flex justify-center gap-4 mt-8">

          <button
            onClick={() => window.location.href = "/"}
            className="px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition"
          >
            Back to Home
          </button>

          <button
            onClick={() => window.location.href = "/internship"}
            className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:scale-105 transition"
          >
            Explore More
          </button>

        </div>

      </motion.div>

    </div>
  );
}