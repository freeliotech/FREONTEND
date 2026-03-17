import React, { useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Particles from "react-tsparticles";

import {
  FaShoppingCart,
  FaUtensils,
  FaGraduationCap,
  FaTaxi,
  FaUsers,
  FaBriefcase,
  FaReact,
  FaNodeJs,
  FaAndroid,
  FaApple,
} from "react-icons/fa";

import { SiFlutter, SiFirebase, SiMongodb } from "react-icons/si";

export default function AppDevelopmentPage() {
  const cardsRef = useRef([]);

  const handleMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 15;
    const rotateY = (x - centerX) / 15;

    gsap.to(card, {
      rotateX,
      rotateY,
      scale: 1.05,
      duration: 0.35,
    });
  };

  const handleLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.4,
    });
  };

  const apps = [
    {
      title: "E-Commerce App",
      icon: <FaShoppingCart />,
      img: "https://images.unsplash.com/photo-1607082352121-fa243f3dde32",
    },

    {
      title: "Food Delivery",
      icon: <FaUtensils />,
      img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
    },

    {
      title: "Education App",
      icon: <FaGraduationCap />,
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    },

    {
      title: "Taxi Booking",
      icon: <FaTaxi />,
      img: "https://images.unsplash.com/photo-1502877338535-766e1452684a",
    },

    {
      title: "Social Media",
      icon: <FaUsers />,
      img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
    },

    {
      title: "Business App",
      icon: <FaBriefcase />,
      img: "https://images.unsplash.com/photo-1556155092-8707de31f9c4",
    },
  ];

  return (
    <section className="relative text-white min-h-screen bg-black overflow-hidden">
      {/* PARTICLES */}

      <Particles
        className="absolute inset-0 -z-10"
        options={{
          particles: {
            number: { value: 60 },
            size: { value: 3 },
            move: { speed: 1 },
            links: { enable: true, color: "#22d3ee" },
          },
        }}
      />

      {/* HERO */}

      <div className="relative overflow-hidden">
        <motion.div
          animate={{ y: [0, -40, 0] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute top-0 left-0 w-72 h-72 bg-pink-500 rounded-full opacity-30 blur-2xl"
        />

        <motion.div
          animate={{ y: [0, 40, 0] }}
          transition={{ repeat: Infinity, duration: 7 }}
          className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 rounded-full opacity-30 blur-2xl"
        />

        <div className="max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center">
          {/* TEXT */}

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-6xl font-bold leading-tight mb-6">
              APP <br />
              <span className="text-gray-300">DEVELOPMENT</span>
            </h1>

            <p className="text-gray-400 max-w-md mb-8">
              We build modern Android, iOS and cross-platform mobile
              applications using powerful technologies like React Native,
              Flutter and Node.js.
            </p>

            <button className="px-8 py-3 bg-cyan-400 text-black rounded-full font-semibold hover:scale-105 transition">
              GET STARTED
            </button>
          </motion.div>

          {/* IMAGE */}

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="flex justify-center"
          >
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/mobile-app-development-3874584.png"
              className="max-w-lg"
            />
          </motion.div>
        </div>
      </div>

      {/* APPS */}

      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-bold mb-12">Apps We Build</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {apps.map((app, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              onMouseMove={(e) => handleMove(e, i)}
              onMouseLeave={() => handleLeave(i)}
              className="bg-white/5 backdrop-blur rounded-2xl p-8 border border-cyan-400/20"
            >
              <div className="w-[140px] h-[260px] mx-auto mb-6 rounded-[30px] overflow-hidden border-4 border-cyan-400/30">
                <img src={app.img} className="w-full h-full object-cover" />
              </div>

              <div className="text-cyan-400 text-2xl mb-2">{app.icon}</div>

              <h3 className="font-semibold">{app.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* TECH STACK */}

      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-10">Tech Stack</h2>

        <div className="flex justify-center gap-10 text-4xl text-cyan-400 flex-wrap">
          <FaReact />
          <FaNodeJs />
          <SiFlutter />
          <SiFirebase />
          <SiMongodb />
          <FaAndroid />
          <FaApple />
        </div>
      </div>

      {/* STATS */}

      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-10">Developer Stats</h2>

        <div className="grid md:grid-cols-4 gap-10 max-w-4xl mx-auto">
          <div>
            <h3 className="text-4xl text-cyan-400 font-bold">25+</h3>
            <p>Projects</p>
          </div>

          <div>
            <h3 className="text-4xl text-cyan-400 font-bold">15+</h3>
            <p>Clients</p>
          </div>

          <div>
            <h3 className="text-4xl text-cyan-400 font-bold">2+</h3>
            <p>Years</p>
          </div>

          <div>
            <h3 className="text-4xl text-cyan-400 font-bold">10+</h3>
            <p>Technologies</p>
          </div>
        </div>
      </div>
    </section>
  );
}
