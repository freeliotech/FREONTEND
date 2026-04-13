import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaChalkboardTeacher,
  FaBrain,
  FaGlobe,
  FaChartLine,
  FaCertificate,
  FaUserGraduate,
  FaHandsHelping,
  FaUsers,
} from "react-icons/fa";

/* ================= ANIMATION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function InternshipAboutDark() {
  return (
    <section className="relative min-h-screen text-gray-300 px-0 py-0 overflow-hidden">

      {/* 🌈 BACKGROUND */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500/20 blur-[120px]" />

      {/* ================= HERO ================= */}

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

        {/* LEFT */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          className="space-y-6"
        >

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Internship Program 🚀
          </h2>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            Gain real-world experience through industry-level projects,
            mentorship, and hands-on learning in Web Development,
            Cloud Computing, and Mobile Apps.
          </p>

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            <Feature icon={<FaLaptopCode />} text="Real Industry Projects" />
            <Feature icon={<FaChalkboardTeacher />} text="Expert Mentorship" />
            <Feature icon={<FaBrain />} text="Practical Learning" />
            <Feature icon={<FaGlobe />} text="Team Collaboration" />
            <Feature icon={<FaChartLine />} text="Career Growth" />
            <Feature icon={<FaCertificate />} text="Verified Certificate" />

          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mt-4 px-6 py-3 rounded-full 
            bg-gradient-to-r from-pink-500 via-blue-500 to-green-400
            text-white font-semibold shadow-md"
          >
            Explore Internship
          </motion.button>

        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="flex justify-center"
        >
          <motion.img
            src="https://apply.virtunexa.com/wp-content/uploads/2024/06/54.png"
            alt="Internship"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="w-[85%] max-w-md"
          />
        </motion.div>

      </div>

      {/* ================= CARDS ================= */}

      <div className="relative z-10 max-w-7xl mx-auto mt-20
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {cards.map((c, i) => (

          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="bg-white/5 backdrop-blur-md border border-white/10
            rounded-xl p-6 transition duration-300
            hover:bg-white/10 hover:border-white/20"
          >

            {/* ICON */}
            <div className={`
              w-12 h-12 flex items-center justify-center 
              rounded-lg mb-4 text-xl
              
              ${i === 0 && "bg-green-500/10 text-green-400"}
              ${i === 1 && "bg-blue-500/10 text-blue-400"}
              ${i === 2 && "bg-pink-500/10 text-pink-400"}
              ${i === 3 && "bg-yellow-500/10 text-yellow-400"}
              ${i === 4 && "bg-purple-500/10 text-purple-400"}
              ${i === 5 && "bg-cyan-500/10 text-cyan-400"}
            `}>
              {c.icon}
            </div>

            {/* TITLE */}
            <h3 className="text-lg font-semibold text-white">
              {c.title}
            </h3>

            {/* SUBTITLE */}
            <p className="text-xs text-gray-500 mt-1">
              {c.subtitle}
            </p>

            {/* DESC */}
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              {c.desc}
            </p>

          </motion.div>

        ))}

      </div>

    </section>
  );
}

/* ================= FEATURE ================= */

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition">
      <span className="text-cyan-400">{icon}</span>
      {text}
    </div>
  );
}

/* ================= DATA ================= */

const cards = [
  {
    title: "Immersive Onboarding",
    subtitle: "Start with real workflow",
    desc: "Understand tools, workflow and real development process.",
    icon: <FaUserGraduate />
  },
  {
    title: "Hands-on Learning",
    subtitle: "Build real projects",
    desc: "Build real applications instead of theory-based learning.",
    icon: <FaHandsHelping />
  },
  {
    title: "Expert Mentorship",
    subtitle: "Learn from professionals",
    desc: "Get guidance from experienced developers.",
    icon: <FaChalkboardTeacher />
  },
  {
    title: "Team Collaboration",
    subtitle: "Work like companies",
    desc: "Collaborate in teams and learn real development flow.",
    icon: <FaUsers />
  },
  {
    title: "Career Growth",
    subtitle: "Become job ready",
    desc: "Build portfolio and improve career opportunities.",
    icon: <FaChartLine />
  },
  {
    title: "Certification",
    subtitle: "Verified credentials",
    desc: "Get professional internship certification.",
    icon: <FaCertificate />
  }
];