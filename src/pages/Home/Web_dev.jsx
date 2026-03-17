import React from "react";
import { motion } from "framer-motion";
import webimage from "../../assets/web_image.png"
import {
  FaRocket,
  FaShieldAlt,
  FaCloud,
  FaReact,
  FaNodeJs,
  FaLaptopCode,
  FaShoppingBag,
  FaSchool,
  FaHospital,
  FaGlobe,
  FaBriefcase,
} from "react-icons/fa";
import { SiNextdotjs, SiMongodb, SiTailwindcss } from "react-icons/si";

export default function WebsiteDevelopmentPage() {
  const websiteTypes = [
    {
      title: "Business Websites",
      icon: <FaBriefcase />,
      img: "https://images.unsplash.com/photo-1556155092-8707de31f9c4",
    },
    {
      title: "E-Commerce Websites",
      icon: <FaShoppingBag />,
      img: "https://images.unsplash.com/photo-1607082352121-fa243f3dde32",
    },
    {
      title: "Educational Websites",
      icon: <FaSchool />,
      img: "https://img.freepik.com/free-vector/online-education-background_52683-8087.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      title: "Healthcare Websites",
      icon: <FaHospital />,
      img: "https://medixweb.net/wp-content/uploads/2025/08/hospital-website-design.jpg",
    },
    {
      title: "Portfolio Websites",
      icon: <FaLaptopCode />,
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    },
    {
      title: "Global / SaaS Websites",
      icon: <FaGlobe />,
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    },
  ];

  return (
    <section className="relative bg-black text-white overflow-hidden">

      {/* ===== BACKGROUND GLOWS ===== */}
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-cyan-500/20 blur-[220px]" />
      <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] bg-blue-500/20 blur-[220px]" />
      <div className="absolute bottom-0 left-1/4 w-[520px] h-[520px] bg-purple-500/10 blur-[220px]" />

      {/* ================= HERO SECTION ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT IMAGE */}
        <motion.img
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          src={webimage}
          alt="Website Development"
          className="max-w-lg mx-auto drop-shadow-[0_0_50px_rgba(0,255,255,0.45)]"
        />

        {/* RIGHT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-cyan-400/20 text-cyan-400">
            🌐 Website Development Experts
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Modern <span className="text-cyan-400">Website Development</span>
          </h1>

          <p className="text-gray-400 max-w-xl">
            We build fast, responsive, SEO-optimized websites that
            convert visitors into customers and scale globally.
          </p>

          <button className="px-10 py-4 rounded-xl font-bold text-black
            bg-gradient-to-r from-cyan-400 to-blue-400
            shadow-[0_0_35px_rgba(0,255,255,0.6)]
            hover:scale-105 transition">
            🚀 Start Your Website
          </button>
        </motion.div>
      </div>

      {/* ================= TYPES OF WEBSITES ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16 place-items-center">

          {websiteTypes.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative w-[310px] h-[280px] group"
            >

              {/* ROTATING BORDER */}
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full p-[3px]
                bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 via-pink-500 to-orange-400
                opacity-0 group-hover:opacity-100"
              >
                <div className="w-full h-full rounded-full bg-[#020617]" />
              </motion.div>

              {/* CARD */}
              <div className="relative z-10 w-full h-full rounded-full
                bg-white/5 backdrop-blur-xl border border-cyan-400/20
                overflow-hidden flex items-center justify-center">

                <img
                  src={item.img}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 text-center">
                  <div className="w-14 h-14 mx-auto mb-3 rounded-full
                    bg-cyan-400/20 text-cyan-400 text-2xl
                    flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-bold">{item.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= FEATURES & TECHNOLOGIES ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="grid md:grid-cols-3 gap-12 mb-20">
          {[ 
            { icon: <FaRocket />, title: "Lightning Fast Speed" },
            { icon: <FaShieldAlt />, title: "Secure & Reliable" },
            { icon: <FaCloud />, title: "Cloud Optimized" },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -12 }}
              className="bg-white/5 rounded-3xl p-8 border border-cyan-400/20"
            >
              <div className="text-cyan-400 text-3xl mb-4">{f.icon}</div>
              <h3 className="font-bold">{f.title}</h3>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center gap-10 flex-wrap text-4xl text-cyan-400">
          <FaReact />
          <SiNextdotjs />
          <FaNodeJs />
          <SiTailwindcss />
          <SiMongodb />
        </div>
      </div>

    </section>
  );
}