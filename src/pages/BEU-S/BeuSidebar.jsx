import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

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

  // mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const imgX = useTransform(mouseX, [-50, 50], [-20, 20]);
  const imgY = useTransform(mouseY, [-50, 50], [-20, 20]);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((p) => (p + 1) % slides.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const next = () => setIndex((p) => (p + 1) % slides.length);
  const prev = () => setIndex((p) => (p - 1 + slides.length) % slides.length);

  return (
    <>
      {/* 🔥 INLINE CSS */}
      <style>{`
        body {
          margin: 0;
          background: #000;
          font-family: 'Poppins', sans-serif;
        }
        .neon {
          color: #22d3ee;
          text-shadow: 0 0 10px #22d3ee, 0 0 30px #22d3ee;
        }
        .arrow {
          backdrop-filter: blur(10px);
          background: rgba(255,255,255,0.08);
        }
        .arrow:hover {
          box-shadow: 0 0 25px #22d3ee;
        }
      `}</style>

      {/* 🌌 SLIDER */}
      <div
        className="relative w-[100vw] h-[80vh] overflow-hidden"
        onMouseMove={(e) => {
          mouseX.set(e.clientX / 20);
          mouseY.set(e.clientY / 20);
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: 200, opacity: 0, skewX: -6 }}
            animate={{ x: 0, opacity: 1, skewX: 0 }}
            exit={{ x: -200, opacity: 0, skewX: 6 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute inset-0  mt-5"
          >
            {/* 🖼 IMAGE WITH PARALLAX */}
            <motion.img
              src={slides[index].img}
              alt="slide"
              style={{ x: imgX, y: imgY }}
              className="w-full h-full object-cover scale-110"
            />

            {/* 🌑 DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/55" />

            {/* ✨ LIGHT SWEEP */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r
                         from-transparent via-white/20 to-transparent"
              initial={{ x: "-120%" }}
              animate={{ x: "120%" }}
              transition={{ duration: 2.5 }}
            />

            {/* 📝 TEXT (BOTTOM LEFT – FLOATING) */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-14 left-14 max-w-xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold neon">
                {slides[index].title}
              </h1>
              <p className="mt-3 text-gray-300 text-lg md:text-xl">
                {slides[index].subtitle}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* ⬅ LEFT */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={prev}
          className="arrow absolute left-6 top-1/2 -translate-y-1/2
                     w-12 h-12 rounded-full text-white text-2xl"
        >
          ❮
        </motion.button>

        {/* ➡ RIGHT */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          onClick={next}
          className="arrow absolute right-6 top-1/2 -translate-y-1/2
                     w-12 h-12 rounded-full text-white text-2xl"
        >
          ❯
        </motion.button>

        {/* 🌈 GLOW ORB */}
        <motion.div
          className="absolute -bottom-40 -left-40 w-[520px] h-[520px]
                     bg-cyan-400/30 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>
    </>
  );
}
