import { motion } from "framer-motion";
import {
  FaBrain,
  FaMicrochip,
  FaShieldAlt,
  FaGraduationCap,
} from "react-icons/fa";

export default function HeroExactLikeImage() {
  return (
    <section className="relative bg-[#04070d] text-white min-h-[80vh] flex items-center overflow-hidden mt-15 bottom-0">

      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-80 h-80 " />
      <div className="absolute bottom-0 right-0 w-96 h-96 " />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[40%_60%] gap-12 items-center w-full">

        {/* LEFT CONTENT */}

        <div className="space-y-6">

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold leading-tight"
          >
            <span className="text-gray-400 font-light">FreeLioTech</span>
            <br />

            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Digital Courses
            </span>

            <br />
            Platform
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-md"
          >
            Learn advanced digital technologies from industry experts.
            Build real-world projects and launch your career in tech.
          </motion.p>

          {/* FEATURE LIST */}

          <div className="space-y-4 pt-2">
            <Item icon={<FaBrain />} text="Artificial Intelligence" />
            <Item icon={<FaMicrochip />} text="Semiconductor Technology" />
            <Item icon={<FaShieldAlt />} text="Cyber Security" />
            <Item icon={<FaGraduationCap />} text="Professional Certifications" />
          </div>

        </div>

        {/* RIGHT IMAGE */}

        <div className="relative flex justify-center">

          <div className="relative w-full md:w-[800px]">

            {/* MAIN IMAGE */}

            <motion.img
              src="https://www.ndu.digital/assets/images/Home-banner-01.png"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 w-full object-contain"
            />

            {/* FLOATING ICON */}

            <motion.img
              src="https://www.ndu.digital/assets/images/graduation-cap.png"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute -top-6 right-6 w-20 md:w-40"
            />

          </div>

        </div>

      </div>
    </section>
  );
}

/* FEATURE ITEM */

function Item({ icon, text }) {
  return (
    <motion.div whileHover={{ x: 6 }} className="flex items-center gap-4">
      <span className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-cyan-400">
        {icon}
      </span>
      <span className="text-gray-200">{text}</span>
    </motion.div>
  );
}