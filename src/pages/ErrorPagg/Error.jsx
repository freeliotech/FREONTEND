import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="relative h-screen bg-[#020617] flex items-center justify-center text-white overflow-hidden">

      {/* Background Glow Elements */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/20 blur-[150px]"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 blur-[180px]"></div>

      {/* Floating Shapes */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: [ -20, 20, -20 ], opacity: 1 }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl"
      ></motion.div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: [ 30, -30, 30 ], opacity: 1 }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute w-56 h-56 bg-purple-400/10 rounded-full blur-2xl"
      ></motion.div>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center relative z-20 px-6">

        {/* GLITCH EFFECT 404 */}
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          className="
            text-[110px] md:text-[150px] font-extrabold 
            bg-gradient-to-r from-cyan-400 to-yellow-300 bg-clip-text text-transparent
            drop-shadow-[0_0_35px_cyan] glitch
          "
        >
          404
        </motion.h1>

        <p className="text-gray-400 text-lg md:text-xl mt-2">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-300 text-sm mt-2"
        >
          Maybe the URL is incorrect, or the page has been moved.
        </motion.p>

      
      </div>

      {/* Glitch CSS */}
      <style>{`
        .glitch {
          position: relative;
        }
        .glitch::before,
        .glitch::after {
          content: "404";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          overflow: hidden;
          background: transparent;
          color: transparent;
          text-shadow: none;
        }
        .glitch::before {
          animation: glitchTop 1s infinite linear alternate-reverse;
          border-top: 2px solid cyan;
          color: cyan;
        }
        .glitch::after {
          animation: glitchBottom 1s infinite linear alternate-reverse;
          border-bottom: 2px solid yellow;
          color: yellow;
        }

        @keyframes glitchTop {
          0% { clip-path: inset(0 0 85% 0); transform: translate(2px, -2px); }
          100% { clip-path: inset(0 0 20% 0); transform: translate(-2px, 2px); }
        }

        @keyframes glitchBottom {
          0% { clip-path: inset(85% 0 0 0); transform: translate(-2px, 2px); }
          100% { clip-path: inset(20% 0 0 0); transform: translate(2px, -2px); }
        }
      `}</style>

    </div>
  );
}
