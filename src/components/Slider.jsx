import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { ApiContext } from "../config/Api";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import Sv1 from "../assets/in1.png";
import Sv2 from "../assets/in9.png";
import Sv6 from "../assets/in6.png";
import Sv7 from "../assets/in7.png";

/* ✅ DEFAULT SLIDES */
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

  /* ✅ FETCH SLIDES FROM BACKEND */
  useEffect(() => {
    axios
      .get(`${ApiContext}/slides`)
      .then((res) => {
        const backendSlides = res.data.map((s) => ({
          ...s,
          media: `${ApiContext.replace("/api", "")}${s.media}`,
        }));
        setSlides([...demoSlides, ...backendSlides]);
      })
      .catch(() => setSlides(demoSlides));
  }, []);

  /* ✅ AUTO SLIDE */
  useEffect(() => {
    if (pause) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides, pause]);

  /* ✅ NEXT / PREV */
  const nextSlide = () => {
    setPause(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);

    setTimeout(() => setPause(false), 5000); // resume autoplay
  };

  const prevSlide = () => {
    setPause(true);
    setCurrentSlide((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );

    setTimeout(() => setPause(false), 5000);
  };

  const s = slides[currentSlide];

  return (
   <section
  className="
    relative
    w-full

    h-[30vh]
    sm:h-[40vh]
    md:min-h-[80vh]

    overflow-hidden

    mt-16
    md:mt-22
  "
>

      {/* BACKGROUND */}
      <AnimatePresence mode="wait">
        <motion.img
          key={s.media}
          src={s.media}
          alt="slide"
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>


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
              setTimeout(() => setPause(false), 5000);
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