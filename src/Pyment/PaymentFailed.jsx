import React from "react";
import { motion } from "framer-motion";
import { FaTimesCircle } from "react-icons/fa";

export default function PaymentFailed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-black to-red-800 text-white px-6">

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl text-center shadow-xl border border-white/20 max-w-md w-full"
      >
        <FaTimesCircle className="text-red-400 text-6xl mx-auto mb-6" />

        <h1 className="text-3xl font-bold mb-4">
          Payment Failed ❌
        </h1>

        <p className="text-gray-300 mb-6">
          Something went wrong with your payment. Please try again.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => (window.location.href = "/checkout")}
            className="px-6 py-3 bg-red-400 text-black rounded-full font-semibold hover:scale-105 transition"
          >
            Retry
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition"
          >
            Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}