import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ApiContext } from "../config/Api";
import Sv1 from "../assets/in1.png";
import Sv2 from "../assets/in3.jpg";
import Sv6 from "../assets/in6.png";
import Sv7 from "../assets/in7.png";
/* ✅ DEMO SLIDES (Fallback + Default) */

 const demoSlides = [
  {
    _id: "demo1",
    title: "Internship Program",
    subtitle:
      "Gain real-world experience with live projects, expert mentorship, and industry-level training designed to make you job-ready.",
    type: "image",
    media:Sv1,
  },

  {
    _id: "demo2",
    title: "Tech Courses",
    subtitle:
      "Explore in-demand technologies like Web Development, AI, Data Science, Cybersecurity, and Cloud Computing with hands-on learning.",
    type: "image",
    media:Sv2,
  },

  {
    _id: "demo3",
    title: "Web Development",
    subtitle:
      "Build modern, responsive websites using HTML, CSS, JavaScript, React, and backend technologies with real-world project experience.",
    type: "image",
    media:Sv7
    ,
  },

  {
    _id: "demo4",
    title: "App Development",
    subtitle:
      "Learn to create powerful Android and iOS apps using modern frameworks like Flutter, React Native, and real-time backend integration.",
    type: "image",
    media:Sv6,
  },

 
];


export default function Hero() {
  const [slides, setSlides] = useState(demoSlides);
  const [currentSlide, setCurrentSlide] = useState(0);

  /* 🔥 FETCH BACKEND SLIDES */
  useEffect(() => {
    axios.get(`${ApiContext}/slides`)
      .then((res) => {
        const backendSlides = res.data.map((s) => ({
          ...s,
          media: ApiContext.replace("/api", "") + s.media,
        }));

        // ✅ MERGE demo + backend
        setSlides([...demoSlides, ...backendSlides]);
      })
      .catch(() => {
        // ❌ agar backend fail → sirf demo chalega
        setSlides(demoSlides);
      });
  }, []);

  /* 🔥 AUTO SLIDE */
  useEffect(() => {
    if (!slides.length) return;

    const interval = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [slides]);

  const s = slides[currentSlide];

  return (
  <section className="relative w-full h-auto md:h-[80vh] overflow-hidden mt-20 md:mt-20">

  {/* 🔥 BACKGROUND (RIGHT → LEFT MOVE) */}
  <motion.div
    key={s.media}
    initial={{ x: "0%" }}
    animate={{ x: "-5%" }}
    transition={{ duration: 8, ease: "linear" }}
    className="absolute inset-0"
  >
    {s.type === "video" ? (
      <video
        src={s.media}
        autoPlay
        muted
        loop
        playsInline
        className="w-[110%] h-full object-cover scale-105"
      />
    ) : (
      <img
        src={s.media}
        alt=""
        className="w-[110%] h-full object-cover scale-105"
      />
    )}
  </motion.div>

  {/* ✅ OVERLAY ONLY FOR IMAGE */}
  {s.type !== "video" && (
    <div className="absolute inset-0 bg-black/50" />
  )}

  {/* 🔥 CENTER CONTENT */}
  <AnimatePresence mode="wait">
    <motion.div
      key={s._id}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 flex flex-col items-center justify-center text-center px-6
                 min-h-[70vh] md:min-h-[80vh]"
    >
      {/* TITLE */}
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white">
        {s.title}
      </h1>

      {/* DESCRIPTION */}
      <p className="text-gray-300 mt-4 max-w-xl text-sm sm:text-base md:text-lg">
        {s.subtitle}
      </p>
    </motion.div>
  </AnimatePresence>

  {/* DOTS */}
  <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
    {slides.map((_, i) => (
      <button
        key={i}
        onClick={() => setCurrentSlide(i)}
        className={`w-2.5 h-2.5 rounded-full ${
          i === currentSlide ? "bg-white" : "bg-white/30"
        }`}
      />
    ))}
  </div>

</section>
  );
}