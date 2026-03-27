import { motion } from "framer-motion";
import {
  FaRocket,
  FaLaptopCode,
  FaUserGraduate,
  FaProjectDiagram,
} from "react-icons/fa";

const ABOUT_IMAGE =
  "https://virtunexa.com/wp-content/uploads/2024/03/55.png";

export default function AboutUsSection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden text-white font-Poppins">

      {/* BACKGROUND GLOW */}

      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-0 left-0 w-80 h-80 bg-purple-500/20 blur-[160px]"
      />

      <motion.div
        animate={{ scale: [1, 1.5, 1], opacity: [0.15, 0.4, 0.15] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 blur-[200px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT IMAGE */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="flex justify-center relative"
        >

          {/* FLOATING ICON */}

          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-6 left-10 text-cyan-400 text-3xl"
          >
            <FaLaptopCode />
          </motion.div>

          <motion.img
            src={ABOUT_IMAGE}
            alt="About FreeLioTech"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="w-[90%] max-w-md drop-shadow-[0_0_35px_rgba(56,189,248,0.5)]"
          />
        </motion.div>

        {/* RIGHT CONTENT */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="space-y-6"
        >

          {/* BADGE */}

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm text-gray-300">
            <FaRocket className="text-cyan-400" />
            Empowering Future Developers
          </div>

          {/* HEADING */}

          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
            At{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Tech Training, Innovation & Certification Hub
            </span>
            , we build the next generation of IT innovators
          </h2>

          {/* DESCRIPTION */}

          <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
            We are dedicated to providing students with industry-ready skills
            through hands-on internships, real-world projects, and expert
            mentorship. Our mission is to bridge the gap between academic
            learning and real industry requirements.
          </p>

          <p className="text-gray-400 text-base leading-relaxed max-w-xl">
            By combining modern technologies, collaborative learning, and
            practical project development, we help students gain confidence,
            technical expertise, and the experience needed to succeed in the
            competitive IT industry.
          </p>

          {/* FEATURES */}

          <div className="grid grid-cols-2 gap-4 pt-2">

            <div className="flex items-center gap-2 text-gray-300">
              <FaLaptopCode className="text-cyan-400" />
              Cutting-edge technologies
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <FaProjectDiagram className="text-cyan-400" />
              Live industry projects
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <FaUserGraduate className="text-cyan-400" />
              Internship programs
            </div>

            <div className="flex items-center gap-2 text-gray-300">
              <FaRocket className="text-cyan-400" />
              Career mentorship
            </div>

          </div>

          {/* STATS */}

     

   

        </motion.div>

      </div>
    </section>
  );
}