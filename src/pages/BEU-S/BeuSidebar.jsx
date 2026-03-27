import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CinematicSlider() {
  const slides = [
    {
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      title: "Trendify",
      subtitle: "Smart Electro World",
    },
    {
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      title: "Innovation",
      subtitle: "Modern Technology",
    },
    {
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      title: "Future Ready",
      subtitle: "Next-Gen Products",
    },
  ];

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setDirection(1);
      setIndex((p) => (p + 1) % slides.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const next = () => {
    setDirection(1);
    setIndex((p) => (p + 1) % slides.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((p) => (p - 1 + slides.length) % slides.length);
  };

  /* 🔥 PERFECT SLIDE ANIMATION */
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 1,
    }),
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          background: #000;
          font-family: 'Poppins', sans-serif;
        }

        .arrow {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          transition: 0.3s;
        }

        .arrow:hover {
          box-shadow: 0 0 20px rgba(255,255,255,0.3);
        }
      `}</style>

      {/* 🔥 MAIN CONTAINER */}
      <div className="relative w-full h-[75vh] overflow-hidden bg-black">
        
        {/* 🚀 SLIDES */}
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.8,
              ease: [0.25, 0.8, 0.25, 1], // smooth cubic bezier
            }}
            className="absolute inset-0"
          >
            {/* IMAGE */}
            <img
              src={slides[index].img}
              alt=""
              className="w-full h-full object-cover"
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/60" />

            {/* TEXT */}
            <div className="absolute bottom-10 md:bottom-16 left-6 md:left-16">
              <h1 className="text-3xl md:text-6xl font-bold text-white">
                {slides[index].title}
              </h1>
              <p className="text-gray-300 mt-2 text-sm md:text-xl">
                {slides[index].subtitle}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ⬅ LEFT */}
        <button
          onClick={prev}
          className="arrow absolute left-4 md:left-6 top-1/2 -translate-y-1/2
                     w-10 h-10 md:w-12 md:h-12 rounded-full text-white text-xl"
        >
          ❮
        </button>

        {/* ➡ RIGHT */}
        <button
          onClick={next}
          className="arrow absolute right-4 md:right-6 top-1/2 -translate-y-1/2
                     w-10 h-10 md:w-12 md:h-12 rounded-full text-white text-xl"
        >
          ❯
        </button>
      </div>
    </>
  );
}