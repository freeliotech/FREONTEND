import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-black to-green-800 text-white px-6">

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/10 backdrop-blur-lg p-10 rounded-3xl text-center shadow-xl border border-white/20 max-w-md w-full"
      >
        <FaCheckCircle className="text-green-400 text-6xl mx-auto mb-6" />

        <h1 className="text-3xl font-bold mb-4">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-300 mb-6">
          Your payment has been completed successfully. Thank you for your purchase!
        </p>

        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 bg-green-400 text-black rounded-full font-semibold hover:scale-105 transition"
        >
          Go to Home
        </button>
      </motion.div>
    </div>
  );
}