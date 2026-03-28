import { motion } from "framer-motion";

/* ENTRY ANIMATIONS */
const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/* PROGRAMMING ICONS */
const techIcons = [
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    angle: 0,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    angle: 60,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    angle: 120,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    angle: 180,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    angle: 240,
  },
  {
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    angle: 300,
  },
];

export default function MasterclassSection() {
  return (
    <motion.section
      className="relative py-32 px-6 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* 🔥 SAME GLOBAL BACKGROUND */}
      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 " />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] " />

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* LEFT : VISUAL */}
        <motion.div
          variants={fadeLeft}
          className="relative flex justify-center items-center min-h-[440px]"
        >
          {/* ROTATING RINGS */}
          {[420, 320, 240].map((size, i) => (
            <motion.div
              key={i}
              className={`absolute w-[${size}px] h-[${size}px] rounded-full border border-sky-400/20`}
              animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
              transition={{
                duration: 40 + i * 15,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}

          {/* ORBITING TECH ICONS */}
          <motion.div
            className="absolute w-[340px] h-[340px]"
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            {techIcons.map((t, i) => (
              <motion.img
                key={i}
                src={t.src}
                alt="tech"
                className="absolute w-7 drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `
                    rotate(${t.angle}deg)
                    translate(160px)
                    rotate(-${t.angle}deg)
                  `,
                }}
                whileHover={{ scale: 1.3 }}
              />
            ))}
          </motion.div>

          {/* CENTER AVATAR */}
          <motion.div
            className="
              relative z-10 w-48 h-48 md:w-60 md:h-60 rounded-full
              bg-white/5 backdrop-blur-xl
              border border-white/10
              flex items-center justify-center
              shadow-[0_0_40px_rgba(56,189,248,0.4)]
            "
           
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/057/228/433/small/a-woman-in-glasses-is-writing-in-a-notebook-free-png.png"
              alt="Student"
              className="w-44 md:w-56 rounded-full object-contain"
            />
          </motion.div>
        </motion.div>

        {/* RIGHT : CONTENT */}
        <motion.div variants={fadeRight} className="max-w-xl">
          <p className="text-sm mb-4">
            <span className="text-sky-400 font-semibold">FreeLioTech</span>{" "}
            <span className="text-gray-400">brings you</span>
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="text-white">Master</span>{" "}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-400 text-transparent bg-clip-text">
              Classes
            </span>
          </h2>

          <p className="text-gray-300 leading-relaxed mb-10">
            Learn industry-demand programming languages with real-world projects,
            expert mentors, and career-focused masterclasses.
          </p>

          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 0 25px #38bdf8" }}
            whileTap={{ scale: 0.95 }}
            className="
              px-8 py-3 rounded-full text-sm font-semibold
              bg-gradient-to-r from-sky-400 to-cyan-500
              text-black
            "
          >
            Explore Masterclass
          </motion.button>
        </motion.div>

      </div>
    </motion.section>
  );
}
