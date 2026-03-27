import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaHeart,
  FaWhatsapp,
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
    { Icon: FaFacebookF, link: "https://www.facebook.com/people/Tech-Training-innovation-Cartification-Hub/61576121840140/?rdid=fuRWg9xGfwmV47u9&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F184mrVvWrq%2F", color: "text-blue-500" },
    { Icon: FaInstagram, link: "https://www.instagram.com/ttichub?utm_source=qr", color: "text-pink-500" },
    { Icon: FaYoutube, link: "https://youtube.com/@ttichub?si=WS_hLLNNfn5xh4Wx", color: "text-red-500" },
    { Icon: FaLinkedinIn, link: "https://www.linkedin.com/company/freeliotech/", color: "text-sky-500" },
    { Icon: FaWhatsapp, link: "Follow the Tech Training Innovation & Cartification Hub channel on WhatsApp: https://whatsapp.com/channel/0029Vb7evq96buMMbol85M1a", color: "text-green-500" },
  ];

  return (
    <footer className="relative bg-black text-gray-400 overflow-hidden">

      {/* TOP BORDER */}
      <div className="absolute top-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

      {/* 🔥 BACKGROUND PARTICLES */}
      {[...Array(20)].map((_, i) => {
        const size = i % 3 === 0 ? "w-2 h-2" : "w-1 h-1";

        return (
          <motion.div
            key={i}
            className={`absolute ${size} bg-cyan-400 rounded-full opacity-30 shadow-[0_0_10px_rgba(0,255,255,0.8)]`}
            style={{
              top: `${(i * 13) % 100}%`,
              left: `${(i * 29) % 100}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 4 + (i % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        );
      })}

      {/* 🔥 GLOW BACKGROUND */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-cyan-500/10 blur-[200px]" />
      <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] bg-purple-500/10 blur-[220px]" />

      {/* MAIN */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">

        {/* GRID */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

          {/* COMPANY */}
          <motion.div className="relative" variants={fadeUp} initial="hidden" whileInView="visible">
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 bg-clip-text text-transparent">
              TTICHUB
            </h1>

            <p className="mt-3 text-xs sm:text-sm leading-relaxed">
              Tech Training, Innovation & Certification Hub providing industry-ready skills and internships.
            </p>

            <span className="hidden lg:block absolute right-[-20px] top-0 h-full w-[1px] bg-white/10"></span>
          </motion.div>

          {/* CONTACT */}
          <motion.div className="relative" variants={fadeUp} custom={1}>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>

            <ul className="space-y-3 text-sm">
              <li className="flex gap-2 hover:text-white hover:translate-x-1 transition">
                <FaMapMarkerAlt className="text-cyan-400" />
                Bihar, India
              </li>

              <li>
                <motion.a
                  href="https://wa.me/918292928328"
                  target="_blank"
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-2 text-green-400 hover:text-green-300"
                >
                  <FaWhatsapp /> WhatsApp Chat
                </motion.a>
              </li>

              <li className="flex gap-2 hover:text-white hover:translate-x-1 transition">
                <FaEnvelope className="text-cyan-400" />
                admin@ttichub.co.in
              </li>
            </ul>

            <span className="hidden lg:block absolute right-[-20px] top-0 h-full w-[1px] bg-white/10"></span>
          </motion.div>

          {/* LEGAL */}
          <motion.div className="relative" variants={fadeUp} custom={2}>
            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>

            <ul className="space-y-2 text-sm">
              <li><Link to="/rules" className="hover:text-white hover:translate-x-1 transition">Rules</Link></li>
              <li><Link to="/terms" className="hover:text-white hover:translate-x-1 transition">Terms</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white hover:translate-x-1 transition">Privacy</Link></li>
            </ul>

            <span className="hidden lg:block absolute right-[-20px] top-0 h-full w-[1px] bg-white/10"></span>
          </motion.div>

          {/* IMPORTANT */}
          <motion.div className="relative" variants={fadeUp} custom={3}>
            <h3 className="text-white font-semibold text-lg mb-4">Important</h3>

            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white hover:translate-x-1 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white hover:translate-x-1 transition">About</Link></li>
              <li><Link to="/courses" className="hover:text-white hover:translate-x-1 transition">Courses</Link></li>
              <li><Link to="/internship" className="hover:text-white hover:translate-x-1 transition">Internship</Link></li>
            </ul>

            <span className="hidden lg:block absolute right-[-20px] top-0 h-full w-[1px] bg-white/10"></span>
          </motion.div>

          {/* SOCIAL */}
          <motion.div variants={fadeUp} custom={4}>
            <h3 className="text-white font-semibold text-lg mb-4">Connect</h3>

            <div className="flex gap-3">
              {socials.map(({ Icon, link, color }, i) => (
                <motion.a
                  key={i}
                  href={link}
                  target="_blank"
                  whileHover={{ y: -4, scale: 1.1 }}
                  className={`w-9 h-9 flex items-center justify-center rounded-full border border-white/20 bg-white/5 ${color}`}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>

        {/* BOTTOM */}
        <div className="mt-10 border-t border-white/10 pt-4 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} TTICHUB ❤️ All rights reserved.
        </div>

      </div>
    </footer>
  );
}