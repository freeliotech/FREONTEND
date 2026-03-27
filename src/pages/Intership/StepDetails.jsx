import React, { useState } from "react";
import { motion } from "framer-motion";
import InternshipDetailsSection from "./View_deatils";

export default function StepDetails({ branch, setStep }) {
  const [agree, setAgree] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4">

      {/* ===== MAIN CONTAINER ===== */}
      <div
        className="
          bg-transparent
          border border-purple-400/20
          rounded-2xl p-5 sm:p-6 md:p-10
          shadow-[0_0_25px_rgba(0,255,255,0.08)]
        "
      >

        {/* ===== HEADING ===== */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.h2
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="
              text-xl sm:text-2xl md:text-4xl font-semibold tracking-wide
              bg-gradient-to-r from-cyan-400 to-purple-500
              text-transparent bg-clip-text
            "
          >
            <span className="font-bold italic">
              {branch.name}
            </span>{" "}
            <span className="italic">
              Internship
            </span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "120px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-[2px] bg-cyan-400 mx-auto mt-2 sm:mt-3"
          />
        </div>

        {/* ===== DETAILS ===== */}
        <div className="mb-5 sm:mb-6">
          <InternshipDetailsSection />
        </div>

        {/* ===== AGREEMENT + BUTTON ===== */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          {/* CHECKBOX */}
          <label className="flex items-center gap-2 sm:gap-3 cursor-pointer text-gray-300 text-xs sm:text-sm">
            <input
              type="checkbox"
              checked={agree}
              onChange={() => setAgree(!agree)}
              className="w-4 h-4 sm:w-5 sm:h-5 accent-cyan-400 cursor-pointer"
            />
            <span>
              I agree to the{" "}
              <span className="text-cyan-400 underline">
                terms & conditions
              </span>
            </span>
          </label>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: agree ? 1.06 : 1 }}
            whileTap={{ scale: agree ? 0.95 : 1 }}
            onClick={() => agree && setStep(2)}
            disabled={!agree}
            className={`
              relative overflow-hidden
              px-6 sm:px-10 py-2.5 sm:py-3
              text-sm sm:text-base
              rounded-xl font-semibold tracking-wide
              flex items-center gap-2
              transition-all duration-300

              ${
                agree
                  ? "text-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_25px_rgba(0,255,255,0.5)] hover:shadow-[0_0_45px_rgba(0,255,255,0.9)]"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {/* Shine effect */}
            {agree && (
              <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition"></span>
            )}

            <span className="relative z-10">Continue</span>

            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: agree ? 6 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative z-10"
            >
              →
            </motion.span>
          </motion.button>

        </div>

      </div>
    </div>
  );
}