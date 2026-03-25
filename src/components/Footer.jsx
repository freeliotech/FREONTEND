
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
    { Icon: FaFacebookF, link: "https://www.facebook.com/share/184mrVvWrq/", color: "hover:text-blue-500" },
    { Icon: FaInstagram, link: "https://www.instagram.com/ttichub?utm_source=qr&igsh=NTY1ZmEwbHBiaTg1", color: "hover:text-pink-500" },
    { Icon: FaYoutube, link: "https://youtube.com/@ttichub?si=WS_hLLNNfn5xh4Wx", color: "hover:text-red-500" },
    { Icon: FaLinkedinIn, link: "https://www.linkedin.com/company/freeliotech/", color: "hover:text-sky-500" },
    
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

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h1 className="text-3xl md:text-4xl font-extrabold 
            bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 
            bg-clip-text text-transparent 
            drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]">
              TTICHUB
            </h1>

            <p className="mt-3 text-sm leading-relaxed">
              <span className="text-cyan-400 font-semibold text-[12px]">
                Tech Training, Innovation & Certification Hub
              </span>
              <br />
              <span className="text-gray-400 text-[9px]">
               Empowering students with practical skills, innovation, and industry-ready certification through real-world training and internships.
              </span>
            </p>
          </motion.div>
{/* CONTACT */}
<motion.div variants={fadeUp} initial="hidden" whileInView="visible" custom={1}>
  <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>

  <ul className="space-y-4 text-sm">

    {/* LOCATION */}
    <li className="flex gap-3 hover:text-white transition">
      <FaMapMarkerAlt className="text-cyan-400 mt-1" />
      <a
        href="https://www.google.com/maps?q=Bhagalpur,Bihar,India"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Bhagalpur & Patna, Bihar
      </a>
    </li>

    

    {/* WHATSAPP */}
    <li className="flex gap-3 hover:text-white transition">
      <FaPhoneAlt className="text-green-400" />
      <a
        href="https://wa.me/918292928328"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        WhatsApp Support
      </a>
    </li>

    {/* EMAIL */}
    <li className="flex gap-3 break-all hover:text-white transition">
      <FaEnvelope className="text-cyan-400" />
      <a
        href="mailto:admin@ttichub.co.in"
        className="hover:underline"
      >
        admin@ttichub.co.in
      </a>
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
        {/* COPYRIGHT */}
        <div className="mt-6 text-center text-xs text-gray-500 flex justify-center">
          <span className="flex items-center gap-1">
            © {new Date().getFullYear()}

            <span className="text-white flex items-center gap-1">
              Ttichub

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

