import React from "react";
import { motion } from "framer-motion";
import { FaPalette, FaPenNib, FaMagic, FaRocket } from "react-icons/fa";

const process = [
  {
    icon: <FaPalette />,
    title: "Brand Research",
    desc: "We analyze your brand identity, audience and competitors before designing.",
  },
  {
    icon: <FaPenNib />,
    title: "Concept Creation",
    desc: "Multiple creative logo concepts are designed and refined.",
  },
  {
    icon: <FaMagic />,
    title: "Design Refinement",
    desc: "Typography, colors, balance and style are perfected.",
  },
  {
    icon: <FaRocket />,
    title: "Final Delivery",
    desc: "Final logo files optimized for web, print and social media.",
  },
];

export default function LogoDesignPage() {
  return (
    <section className="relative bg-[#04070d] text-white overflow-hidden">

      {/* Gradient Glow Background */}
      <div className="absolute -top-40 -left-40 w-[400px] h-[400px] bg-cyan-500/20 blur-[180px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-[180px]" />

      {/* ================= HERO ================= */}

      <div className="max-w-7xl mx-auto px-6 py-32 grid md:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7 }}
          className="space-y-8"
        >

          <span className="px-4 py-2 bg-cyan-400/20 text-cyan-300 rounded-full text-sm">
            Professional Logo Design
          </span>

          <h1 className="text-5xl font-extrabold leading-tight">
            Build a <span className="text-cyan-400">Powerful Brand</span> <br/>
            With a Unique Logo
          </h1>

          <p className="text-gray-400 max-w-xl">
            We create memorable logos that communicate your brand identity,
            attract customers and build long-term recognition.
          </p>

          <motion.button
            whileHover={{ scale:1.08 }}
            whileTap={{ scale:0.95 }}
            className="px-8 py-3 rounded-xl font-bold bg-cyan-400 text-black
            shadow-[0_0_25px_rgba(0,255,255,0.6)]"
          >
            Start Your Logo →
          </motion.button>

        </motion.div>

        {/* Hero Image */}

       <div className="relative flex justify-center items-center">

  <div className="absolute w-[400px] h-[400px]
  bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500
  blur-[150px] opacity-30 rounded-full"/>

  <motion.img
    src="https://miro.medium.com/v2/resize:fit:1400/1*4A7BwOPaLRk0CKS2lEw0Tw.png"
    animate={{ y:[0,-20,0] }}
    transition={{ duration:5, repeat:Infinity }}
    className="relative w-80 mx-auto
    drop-shadow-[0_0_70px_rgba(0,255,255,0.7)]
    [mask-image:radial-gradient(circle,white_60%,transparent_100%)]"
  />

</div>

      </div>


      {/* ================= PROCESS ================= */}

      <div className="max-w-6xl mx-auto px-6 py-32 text-center">

        <div className="grid md:grid-cols-4 gap-10">

          {process.map((step,i)=>(
            <motion.div
              key={i}
              whileHover={{ y:-10 }}
              className="p-8 bg-white/5 rounded-2xl border border-cyan-400/20
              backdrop-blur-md"
            >

              <div className="text-cyan-400 text-3xl mb-4">
                {step.icon}
              </div>

              <h3 className="font-semibold text-lg">
                {step.title}
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                {step.desc}
              </p>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}