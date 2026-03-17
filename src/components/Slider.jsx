import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { ApiContext } from "../config/Api";

import RINGS from "vanta/dist/vanta.rings.min.js";
import GLOBE from "vanta/dist/vanta.globe.min.js";

import aiVideo from "../assets/ai.mp4";

const effects = [RINGS, GLOBE];

/* DEMO SLIDES */
const demoSlides = [
  {
    _id: "courses",
    title: "Master Industry-Ready Courses",
    subtitle:
      "Upgrade your skills with practical courses in Web Development, App Development, AI, and modern technologies.",
    type: "image",
    media:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },

  {
    _id: "internship",
    title: "Professional Internship Programs",
    subtitle:
      "Gain real-world experience by working on live industry projects guided by experienced mentors.",
    type: "image",
    media:
      "https://images.unsplash.com/photo-1552664730-d307ca884978",
  },

  {
    _id: "appdev",
    title: "Mobile App Development",
    subtitle:
      "Learn to build powerful Android and iOS applications using modern frameworks and tools.",
    type: "image",
    media:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3",
  },

  {
    _id: "webdev",
    title: "Modern Web Development",
    subtitle:
      "Design and develop responsive, fast, and scalable websites using modern technologies.",
    type: "image",
    media:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },

  {
    _id: "ai-ml",
    title: "Artificial Intelligence & Machine Learning",
    subtitle:
      "Build intelligent systems and data-driven applications using AI, ML, and advanced analytics.",
    type: "video",
    media: aiVideo,
  },

  {
    _id: "logo-design",
    title: "Creative Logo & Brand Design",
    subtitle:
      "Create professional brand identities, modern logos, and visual designs that stand out.",
    type: "image",
    media:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d",
  },
];

export default function Hero() {

  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  const [slides, setSlides] = useState(demoSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentEffect, setCurrentEffect] = useState(0);

  /* FETCH SLIDES */

  useEffect(() => {

    axios
      .get(`${ApiContext}/slides`)
      .then((res) => {

        const backendSlides = res.data.map((s) => ({
          ...s,
          media: ApiContext.replace("/api", "") + s.media,
        }));

        setSlides([...demoSlides, ...backendSlides]);

      })
      .catch(console.error);

  }, []);

  /* VANTA SWITCH */

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentEffect((p) => (p + 1) % effects.length);
    }, 8000);

    return () => clearInterval(interval);

  }, []);

  /* VANTA INIT */

  useEffect(() => {

    if (vantaEffect) vantaEffect.destroy();

    const Selected = effects[currentEffect];

    const effect = Selected({
      el: vantaRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      color: 0x38bdf8,
      backgroundAlpha: 0,
    });

    setVantaEffect(effect);

    return () => effect.destroy();

  }, [currentEffect]);

  /* AUTO SLIDE */

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentSlide((p) => (p + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);

  }, [slides]);

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.06 },
    },
  };

  const word = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const mediaVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    },
    exit: { opacity: 0, scale: 0.9 },
  };

  const s = slides[currentSlide];

  return (
    <section className="relative min-h-screen overflow-hidden text-white bg-[#04070d]">

      {/* BACKGROUND GLOW */}

      <div className="absolute top-0 left-0 w-80 h-80 blur-[160px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 blur-[200px]" />

      {/* VANTA */}

      <div ref={vantaRef} className="absolute inset-0 z-[1]" />

      {/* CONTENT */}

      <div
        className="relative z-[2] max-w-7xl mx-auto px-6
        min-h-screen flex flex-col-reverse md:flex-row
        items-center gap-16"
      >

        {/* TEXT */}

        <AnimatePresence mode="wait">
          <motion.div
            key={s._id}
            variants={textVariants}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full md:w-1/2 space-y-6"
          >

            <motion.h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">

              {s.title.split(" ").map((w, i) => (

                <motion.span
                  key={i}
                  variants={word}
                  className={`inline-block mr-2 ${
                    i % 2 === 0 ? "text-cyan-400" : "text-white"
                  } drop-shadow-[0_0_20px_rgba(56,189,248,0.4)]`}
                >
                  {w}
                </motion.span>

              ))}

            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 max-w-xl"
            >
              {s.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 flex-wrap"
            >

              <Link
                to="/comingsoon"
                className="px-7 py-3 rounded-full bg-cyan-400
                text-black font-semibold
                shadow-[0_0_25px_rgba(0,255,255,0.5)]
                hover:scale-105 transition"
              >
                Explore
              </Link>

              <Link
                to="/comingsoon"
                className="px-7 py-3 rounded-full border border-cyan-400
                text-cyan-400 font-semibold
                hover:bg-cyan-400 hover:text-black transition"
              >
                Join Now
              </Link>

            </motion.div>

          </motion.div>
        </AnimatePresence>

        {/* MEDIA */}

        <AnimatePresence mode="wait">
          <motion.div
            key={s.media}
            variants={mediaVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            className="w-full md:w-1/2 flex justify-center"
          >

            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="rounded-2xl overflow-hidden
              border border-white/10 max-w-lg
              shadow-[0_0_40px_rgba(56,189,248,0.35)]"
            >

              {s.type === "video" ? (
                <video
                  src={s.media}
                  autoPlay
                  muted
                  loop
                  className="w-full h-[420px] object-cover"
                />
              ) : (
                <img
                  src={s.media}
                  alt=""
                  className="w-full h-[420px] object-cover"
                />
              )}

            </motion.div>

          </motion.div>
        </AnimatePresence>

      </div>

      {/* SLIDE DOTS */}

      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2
        flex gap-2 z-[3]"
      >

        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2.5 h-2.5 rounded-full transition ${
              i === currentSlide ? "bg-cyan-400" : "bg-white/30"
            }`}
          />
        ))}

      </div>

    </section>
  );
}