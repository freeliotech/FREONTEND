import { motion } from "framer-motion";

import {
  FaBrain,
  FaShieldAlt,
  FaGraduationCap,
  FaCode,
} from "react-icons/fa";

export default function HeroExactLikeImage() {
  return (
    <section
      className="
      relative
      min-h-[90vh]

      flex items-center
      overflow-hidden

      bg-[#1f2a3c]

      text-white

      pt-28 pb-16
    "
    >



      {/* ================= MAIN CONTAINER ================= */}

      <div
        className="
        relative z-10

        max-w-7xl
        mx-auto

        px-6

        grid
        lg:grid-cols-[45%_55%]

        gap-14
        items-center
        w-full
      "
      >
        {/* ================= LEFT CONTENT ================= */}

        <div className="space-y-7">

          {/* SMALL BADGE */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}

            className="
            inline-flex items-center gap-2

            px-4 py-2 rounded-full

            bg-blue-500/10
            border border-blue-500/20

            text-blue-300
            text-sm
          "
          >
             Future Ready Learning Platform
          </motion.div>

          {/* ================= HEADING ================= */}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.8 }}

            className="
            text-4xl md:text-6xl

            font-extrabold
            leading-tight
          "
          >
            <span
              className="
              bg-gradient-to-r
              from-blue-200
              via-blue-400
              to-sky-400

              bg-clip-text
              text-transparent
            "
            >
              Tech Training,
              <br />
              Innovation &
              <br />
              Certification Hub
            </span>

            <br />

            <span className="text-gray-400 font-light text-2xl md:text-4xl">
              Digital Courses & Career Growth
            </span>
          </motion.h1>

          {/* ================= DESCRIPTION ================= */}

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

            transition={{ delay: 0.2 }}

            className="
            text-gray-400

            text-base md:text-lg

            max-w-xl
            leading-relaxed
          "
          >
            Learn advanced digital technologies from
            industry experts. Build real-world projects,
            gain practical skills, and launch your
            professional career in the tech industry.
          </motion.p>

          {/* ================= BUTTONS ================= */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

            transition={{ delay: 0.3 }}

            className="flex flex-wrap gap-4 pt-2"
          >
            
          </motion.div>

          {/* ================= FEATURES ================= */}

         
        </div>

        {/* ================= RIGHT IMAGE ================= */}

        <div className="relative flex justify-center">

          {/* MAIN CONTAINER */}

          <div className="relative w-full md:w-[760px]">

            {/* BLUE GLOW */}

            <div
              className="
              absolute inset-0

              bg-blue-500/10
              blur-[120px]

              rounded-full
            "
            />

            {/* MAIN IMAGE */}

            <motion.img
              src="https://www.ndu.digital/assets/images/Home-banner-01.png"

              initial={{
                opacity: 0,
                scale: 0.96,
              }}

              animate={{
                opacity: 1,
                scale: 1,
              }}

              transition={{
                duration: 0.8,
              }}

              className="
              relative z-10
              w-full object-contain

              drop-shadow-[0_20px_60px_rgba(59,130,246,0.25)]
            "
            />

            {/* FLOATING ICON */}

            <motion.img
              src="https://www.ndu.digital/assets/images/graduation-cap.png"

              animate={{
                y: [0, -15, 0],
              }}

              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}

              className="
              absolute

              -top-6 right-6

              w-20 md:w-36

              z-20
            "
            />

            {/* FLOATING CARD */}

            <motion.div
              animate={{
                y: [0, -12, 0],
              }}

              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}

              className="
              absolute

              bottom-10 left-0

              bg-white/10
              backdrop-blur-xl

              border border-blue-500/20

              rounded-2xl

              px-5 py-4

              shadow-2xl
            "
            >
              <h4 className="text-white font-bold text-lg">
                10K+
              </h4>

              <p className="text-blue-200 text-sm">
                Active Students
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= FEATURE ITEM ================= */

function Item({ icon, text }) {
  return (
    <motion.div
      whileHover={{
        x: 8,
      }}

      className="
      flex items-center gap-4

      group
    "
    >
      {/* ICON */}

      <span
        className="
        w-12 h-12

        rounded-2xl

        bg-blue-500/10
        border border-blue-500/20

        flex items-center justify-center

        text-blue-300

        group-hover:bg-gradient-to-r
        group-hover:from-blue-900
        group-hover:via-blue-600
        group-hover:to-sky-400

        group-hover:text-white

        transition-all duration-300
      "
      >
        {icon}
      </span>

      {/* TEXT */}

      <span
        className="
        text-gray-200
        text-base md:text-lg

        group-hover:text-white

        transition duration-300
      "
      >
        {text}
      </span>
    </motion.div>
  );
}