import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ApiContext } from "../config/Api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Sv1 from "../assets/in1.png";
import Sv2 from "../assets/in3.jpg";
import Sv6 from "../assets/in6.png";
import Sv7 from "../assets/in7.png";

const demoSlides = [
  {
    _id: "demo1",
    title: "Internship Program",
    subtitle: "Gain real-world experience with live projects and mentorship.",
    media: Sv1,
  },
  {
    _id: "demo2",
    title: "Tech Courses",
    subtitle: "Learn Web, AI, Data Science & Cloud technologies.",
    media: Sv2,
  },
  {
    _id: "demo3",
    title: "Web Development",
    subtitle: "Build modern responsive websites using React.",
    media: Sv7,
  },
  {
    _id: "demo4",
    title: "App Development",
    subtitle: "Create Android & iOS apps.",
    media: Sv6,
  },
];

export default function Hero() {
  const [slides, setSlides] = useState(demoSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [pause, setPause] = useState(false);

  useEffect(() => {
    axios.get(`${ApiContext}/slides`)
      .then((res) => {
        const backendSlides = res.data.map((s) => ({
          ...s,
          media: ApiContext.replace("/api", "") + s.media,
        }));
        setSlides([...demoSlides, ...backendSlides]);
      })
      .catch(() => setSlides(demoSlides));
  }, []);

  useEffect(() => {
    if (pause) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides, pause]);

  const nextSlide = () => {
    setPause(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setPause(true);
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const s = slides[currentSlide];

  return (
    <section className="relative w-full min-h-[75vh] md:min-h-[90vh] overflow-hidden">

      {/* BACKGROUND */}
      <AnimatePresence mode="wait">
        <motion.img
          key={s.media}
          src={s.media}
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* 🌈 MULTI COLOR OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-br 
        from-black/70 via-black/60 to-black/80" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 min-h-[75vh] md:min-h-[90vh]">

        <AnimatePresence mode="wait">
          <motion.div
            key={s._id}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
          >

            {/* 🔥 3D TITLE */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold
              bg-gradient-to-r from-pink-500 via-blue-400 to-green-400
              bg-clip-text text-transparent
              tracking-wide
              drop-shadow-[0_8px_20px_rgba(0,0,0,0.8)]
              [text-shadow:2px_2px_0_rgba(255,255,255,0.1),4px_4px_15px_rgba(0,0,0,0.9)]"
            >
              {s.title}
            </h1>

            {/* SUBTITLE */}
            <p className="mt-5 max-w-2xl text-gray-300 text-sm sm:text-base md:text-lg 
              leading-relaxed tracking-wide
              drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]">
              {s.subtitle}
            </p>

          </motion.div>
        </AnimatePresence>

      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20
        w-12 h-12 rounded-full 
        bg-white/10 backdrop-blur-md border border-white/20
        text-white flex items-center justify-center
        hover:scale-110 hover:bg-white/20 transition"
      >
        <FaChevronLeft />
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20
        w-12 h-12 rounded-full 
        bg-white/10 backdrop-blur-md border border-white/20
        text-white flex items-center justify-center
        hover:scale-110 hover:bg-white/20 transition"
      >
        <FaChevronRight />
      </button>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setPause(true);
              setCurrentSlide(i);
            }}
            className={`w-3 h-3 rounded-full transition ${
              i === currentSlide
                ? "bg-gradient-to-r from-pink-500 to-green-400 scale-125"
                : "bg-white/30"
            }`}
          />
        ))}
      </div>

    </section>
  );
}