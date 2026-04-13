import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";

/* ANIMATION */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
    },
  }),
};

export default function Footer() {
  const socials = [
    { Icon: FaFacebookF, color: "hover:text-blue-400" },
    { Icon: FaInstagram, color: "hover:text-pink-400" },
    { Icon: FaYoutube, color: "hover:text-red-400" },
    { Icon: FaLinkedinIn, color: "hover:text-sky-400" },
    { Icon: FaWhatsapp, color: "hover:text-green-400" },
  ];

  return (
    <footer className="relative w-full 
    bg-gradient-to-br from-[#050816] via-[#0b1220] to-[#020617]
    text-gray-400 overflow-hidden">

      {/* 🌈 TOP LINE */}
      <div className="absolute top-0 w-full h-[2px] 
      bg-gradient-to-r from-pink-500 via-blue-500 to-green-400" />

      {/* ✨ SOFT GLOW */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-500/10 blur-[120px]" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-green-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14">

        {/* GRID */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

          {/* 🔥 COMPANY */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible">

            {/* LOGO */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-extrabold tracking-wider relative inline-block"
            >
              <span className="bg-gradient-to-r from-pink-500 via-blue-500 to-green-400 bg-clip-text text-transparent">
                TTICHUB
              </span>

              {/* Glow */}
              <span className="absolute inset-0 
              bg-gradient-to-r from-pink-500 via-blue-500 to-green-400 
              blur-xl opacity-20 -z-10" />
            </motion.h1>

            {/* TAGLINE */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-sm leading-relaxed text-gray-400/90"
            >
              Tech Training, Innovation & Certification Hub providing{" "}
              <span className="text-white">industry-ready skills</span>,{" "}
              <span className="text-blue-400">internships</span> &{" "}
              <span className="text-green-400">career growth</span>.
            </motion.p>

            {/* LINE */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "70px" }}
              transition={{ duration: 0.6 }}
              className="mt-4 h-[2px] 
              bg-gradient-to-r from-pink-500 via-blue-500 to-green-400 
              rounded-full"
            />

          </motion.div>

          {/* CONTACT */}
          <motion.div variants={fadeUp} custom={1}>
            <h3 className="text-white font-semibold mb-4">Contact</h3>

            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <FaMapMarkerAlt className="text-green-400 mt-1" />
                Bihar, India
              </li>

              <li className="flex gap-2">
                <FaWhatsapp className="text-green-500 mt-1" />
                WhatsApp Support
              </li>

              <li className="flex gap-2">
                <FaEnvelope className="text-blue-400 mt-1" />
                admin@ttichub.co.in
              </li>
            </ul>
          </motion.div>

          {/* LINKS */}
          <motion.div variants={fadeUp} custom={2}>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2 text-sm">
              {["Home", "About", "Courses", "Internship"].map((item, i) => (
                <li key={i}>
                  <Link
                    to="/"
                    className="relative inline-block group hover:text-white transition"
                  >
                    {item}

                    {/* UNDERLINE */}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] 
                    bg-gradient-to-r from-pink-500 via-blue-500 to-green-400
                    transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* LEGAL */}
          <motion.div variants={fadeUp} custom={3}>
            <h3 className="text-white font-semibold mb-4">Legal</h3>

            <ul className="space-y-2 text-sm">
              <li><Link to="/rules" className="hover:text-blue-400">Rules</Link></li>
              <li><Link to="/terms" className="hover:text-blue-400">Terms</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-blue-400">Privacy</Link></li>
            </ul>
          </motion.div>

          {/* SOCIAL */}
          <motion.div variants={fadeUp} custom={4}>
            <h3 className="text-white font-semibold mb-4">Connect</h3>

            <div className="flex gap-3">
              {socials.map(({ Icon, color }, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  className={`w-9 h-9 flex items-center justify-center 
                  rounded-full border border-white/10 bg-white/5 
                  text-gray-300 ${color}`}
                >
                  <Icon size={14} />
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

        {/* BOTTOM */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-10 border-t border-white/10 pt-4 text-center text-xs text-gray-500"
        >
          © {new Date().getFullYear()} TTICHUB • All rights reserved
        </motion.div>

      </div>
    </footer>
  );
}