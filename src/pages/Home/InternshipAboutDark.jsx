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
  FaCode,
  FaMobileAlt,
  FaCloud,
  FaPalette
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
    <section className="relative min-h-screen bg-black text-gray-300 px-6 py-24 font-[Poppins] overflow-hidden">

      {/* GRID BACKGROUND */}

      <div className="absolute inset-0 opacity-[0.04]
      bg-[linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)]
      bg-[size:40px_40px]" />

      {/* GLOW EFFECT */}

      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 9, repeat: Infinity }}
        className="absolute top-0 left-0 w-[420px] h-[420px] bg-cyan-500/20 blur-[180px]"
      />

      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 11, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-purple-500/20 blur-[200px]"
      />

      {/* ================= HERO CONTENT ================= */}

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT TEXT */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="space-y-7"
        >

      

          <p className="text-gray-400 text-lg leading-relaxed">
            Gain real-world experience by working on industry-level projects.
            Our internship program focuses on practical learning, mentorship,
            and career growth in modern technologies like Web Development,
            Cloud Computing and Mobile Apps.
          </p>

          {/* FEATURES */}

          <div className="space-y-4">

            <Feature icon={<FaLaptopCode />} text="Work on real industry projects" />
            <Feature icon={<FaChalkboardTeacher />} text="Guidance from expert mentors" />
            <Feature icon={<FaBrain />} text="Skill-based practical learning" />
            <Feature icon={<FaGlobe />} text="Industry exposure & teamwork" />
            <Feature icon={<FaChartLine />} text="Career focused training" />
            <Feature icon={<FaCertificate />} text="Verified internship certificate" />

          </div>

          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 px-7 py-3 bg-cyan-400 text-black font-semibold rounded-lg
            shadow-[0_0_25px_rgba(0,255,255,0.5)]"
          >
            Explore Internship
          </motion.button>

        </motion.div>


        {/* RIGHT IMAGE */}

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >

          <motion.img
            src="https://apply.virtunexa.com/wp-content/uploads/2024/06/54.png"
            alt="Internship"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="w-[85%] max-w-md drop-shadow-[0_0_45px_rgba(0,255,255,0.3)]"
          />

        </motion.div>

      </div>


      {/* ================= INTERNSHIP BENEFITS ================= */}

      <div className="relative z-10 max-w-7xl mx-auto mt-28
      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {cards.map((c, i) => (

          <motion.div
            key={i}
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            className="h-full flex flex-col justify-between
            bg-black
            border border-cyan-500/20
            rounded-2xl p-7
            hover:border-cyan-400
            hover:shadow-[0_0_35px_rgba(0,255,255,0.35)]
            transition"
          >

            <div>

              <div className="text-3xl text-cyan-400 mb-4">
                {c.icon}
              </div>

              <h3 className="text-lg font-semibold text-white mb-2">
                {c.title}
              </h3>

              <p className="text-sm text-gray-400">
                {c.desc}
              </p>

            </div>

          </motion.div>

        ))}

      </div>


      {/* ================= TRAINING SERVICES ================= */}

      
    </section>
  );
}

/* ================= FEATURE ITEM ================= */

function Feature({ icon, text }) {

  return (

    <div className="flex items-center gap-4 text-gray-400 hover:text-cyan-300 transition">

      <span className="text-cyan-400 text-xl">{icon}</span>

      <span>{text}</span>

    </div>

  );

}


/* ================= CARD DATA ================= */

const cards = [

  {
    title: "Immersive Onboarding",
    desc: "Understand company workflow, tools and development process from day one.",
    icon: <FaUserGraduate />
  },

  {
    title: "Hands-on Learning",
    desc: "Build real world applications instead of just theoretical learning.",
    icon: <FaHandsHelping />
  },

  {
    title: "Expert Mentorship",
    desc: "Learn directly from experienced developers and industry mentors.",
    icon: <FaChalkboardTeacher />
  },

  {
    title: "Team Collaboration",
    desc: "Work in teams and learn real software development collaboration.",
    icon: <FaUsers />
  },

  {
    title: "Career Growth",
    desc: "Build a strong portfolio that helps you land internships and jobs.",
    icon: <FaChartLine />
  },

  {
    title: "Verified Certification",
    desc: "Receive professional internship certificate after successful completion.",
    icon: <FaCertificate />
  }

];


/* ================= SERVICES DATA ================= */

const services = [

  {
    icon: <FaCode />,
    title: "Full Stack Development",
    text: "Learn MERN stack development including React, Node.js and MongoDB."
  },

  {
    icon: <FaMobileAlt />,
    title: "Mobile App Development",
    text: "Build Android and cross-platform mobile apps using modern frameworks."
  },

  {
    icon: <FaCloud />,
    title: "Cloud & Deployment",
    text: "Deploy applications on cloud platforms and learn DevOps basics."
  },

  {
    icon: <FaPalette />,
    title: "UI / UX Design",
    text: "Design beautiful responsive interfaces using Tailwind CSS."
  }

];