
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import sanuj from "../assets/sanuj.jpg";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTelegramPlane,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

/* ---------------- ANIMATION ---------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export default function Footer() {
  const socials = [
    { Icon: FaFacebookF, link: "https://facebook.com", color: "hover:text-blue-500" },
    { Icon: FaInstagram, link: "https://instagram.com", color: "hover:text-pink-500" },
    { Icon: FaYoutube, link: "https://youtube.com", color: "hover:text-red-500" },
    { Icon: FaLinkedinIn, link: "https://linkedin.com", color: "hover:text-sky-500" },
    { Icon: FaTelegramPlane, link: "https://t.me", color: "hover:text-cyan-400" },
  ];

  return (
    <footer className="relative bg-black text-gray-400 font-Poppins overflow-hidden">

      {/* TOP BORDER */}
      <div className="absolute top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      {/* MULTI COLOR MOVING LINES */}
      <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 1440 320">
        {[...Array(10)].map((_, i) => (
          <motion.path
            key={i}
            d={`M0 ${100 + i * 18} C 300 ${60 + i * 10}, 700 ${200 + i * 10}, 1440 ${120 + i * 18}`}
            fill="transparent"
            stroke={`hsl(${200 + i * 12},80%,60%)`}
            strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
          />
        ))}
      </svg>

      {/* GLOW */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 blur-[180px]" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/10 blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">

        {/* GRID */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* ABOUT */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h3 className="text-white font-bold text-xl mb-4 tracking-wide">
              FreeLioTech
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              A next-generation learning & internship platform delivering
              industry-ready skills and verified certifications.
            </p>
          </motion.div>

          {/* CONTACT */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={1}>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>

            <ul className="space-y-3 text-sm">

              <li className="flex gap-3">
                <FaMapMarkerAlt className="text-cyan-400 mt-1" />

                <a
                  href="https://www.google.com/maps?q=Patna,Bihar,India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  J. P. Nagar, Bengaluru, Karnataka 560078
                </a>
              </li>

              <li className="flex gap-3">
                <FaPhoneAlt className="text-cyan-400" />
                +91 8292928328
              </li>

              <li className="flex gap-3 break-all">
                <FaEnvelope className="text-cyan-400" />
                office@freeliotech.in
              </li>

            </ul>
          </motion.div>

          {/* LEGAL */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={2}>
            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>

            <ul className="space-y-3 text-sm">
              {[
                { name: "Rules & Regulations", path: "/rules" },
                { name: "Terms & Conditions", path: "/terms" },
                { name: "Privacy Policy", path: "/privacy-policy" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="hover:text-white transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* SOCIAL */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={3}>
            <h3 className="text-white font-semibold text-lg mb-4">Follow Us</h3>

            <div className="flex gap-4">
              {socials.map(({ Icon, link, color }, i) => (
                <motion.a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur text-gray-300 ${color} hover:border-cyan-400 transition`}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>

   

        {/* DIVIDER */}
        <div className="mt-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        {/* MOVING DEVELOPER */}
        <div className="overflow-hidden mt-4">
          <Link to="/developer">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-3 whitespace-nowrap cursor-pointer"
            >
              <img
                src={sanuj}
                alt="developer"
                className="w-8 h-8 rounded-full border border-cyan-400"
              />

              <span className="text-cyan-400 text-sm font-medium hover:text-white transition">
                SANUJ KUMAR
              </span>

            </motion.div>
          </Link>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-6 text-center text-xs text-gray-500 flex justify-center">
          <span className="flex items-center gap-1">
            © {new Date().getFullYear()}

            <span className="text-white flex items-center gap-1">
              FreeLioTech

              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="text-red-500"
              >
                <FaHeart />
              </motion.span>

            </span>

            . All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}

