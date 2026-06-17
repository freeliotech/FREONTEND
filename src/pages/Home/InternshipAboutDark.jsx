import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  FaRocket,
  FaStar,
  FaClock,
  FaProjectDiagram,
  FaTrophy,
  FaShieldAlt,
  FaComments,
  FaArrowRight,
} from "react-icons/fa";

/* ================= ANIMATION VARIANTS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
};

export default function InternshipAboutDark() {
  const sectionRef = useRef(null);

  // Stats data
  const stats = [
    { value: "500+", label: "INTERNS PLACED", icon: FaUserGraduate, color: "from-emerald-500 to-green-500" },
    { value: "50+", label: "PARTNER COMPANIES", icon: FaUsers, color: "from-blue-500 to-cyan-500" },
    { value: "98%", label: "SUCCESS RATE", icon: FaStar, color: "from-amber-500 to-yellow-500" },
    { value: "1000+", label: "LIVE PROJECTS", icon: FaProjectDiagram, color: "from-purple-500 to-indigo-500" },
  ];

  // Benefits data
  const benefits = [
    { icon: FaLaptopCode, text: "Real Industry Projects", gradient: "from-cyan-500 to-blue-500" },
    { icon: FaChalkboardTeacher, text: "Expert Mentorship", gradient: "from-purple-500 to-pink-500" },
    { icon: FaBrain, text: "Practical Learning", gradient: "from-pink-500 to-rose-500" },
    { icon: FaGlobe, text: "Team Collaboration", gradient: "from-blue-500 to-indigo-500" },
    { icon: FaChartLine, text: "Career Growth", gradient: "from-green-500 to-emerald-500" },
    { icon: FaCertificate, text: "Verified Certificate", gradient: "from-orange-500 to-amber-500" },
    { icon: FaClock, text: "Flexible Timing", gradient: "from-yellow-500 to-amber-500" },
    { icon: FaComments, text: "Daily Standups", gradient: "from-teal-500 to-cyan-500" },
  ];

  const cards = [
    {
      title: "Immersive Onboarding",
      subtitle: "Start with real workflow",
      desc: "Understand tools, workflow and real development process. Get familiar with industry standards.",
      icon: <FaUserGraduate />,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Hands-on Learning",
      subtitle: "Build real projects",
      desc: "Build real applications instead of theory-based learning. Work on production-ready code.",
      icon: <FaHandsHelping />,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Expert Mentorship",
      subtitle: "Learn from professionals",
      desc: "Get guidance from experienced developers with 5+ years of industry experience.",
      icon: <FaChalkboardTeacher />,
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Team Collaboration",
      subtitle: "Work like companies",
      desc: "Collaborate in teams using Git, Agile methodology, and real development flow.",
      icon: <FaUsers />,
      gradient: "from-pink-500 to-rose-500",
    },
    {
      title: "Career Growth",
      subtitle: "Become job ready",
      desc: "Build portfolio, prepare for interviews, and improve career opportunities.",
      icon: <FaChartLine />,
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      title: "Professional Certification",
      subtitle: "Verified credentials",
      desc: "Get industry-recognized internship certification to boost your resume.",
      icon: <FaCertificate />,
      gradient: "from-cyan-500 to-teal-500",
    },
    {
      title: "Live Projects",
      subtitle: "Real-world experience",
      desc: "Work on actual client projects and build a strong portfolio.",
      icon: <FaProjectDiagram />,
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Placement Support",
      subtitle: "Job assistance",
      desc: "Get resume review, mock interviews, and placement assistance.",
      icon: <FaTrophy />,
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Certificate of Completion",
      subtitle: "Verified credentials",
      desc: "Receive a verified certificate upon successful completion of the program.",
      icon: <FaShieldAlt />,
      gradient: "from-slate-500 to-gray-500",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 md:py-3 px-3 bg-transparent overflow-hidden">
      
      {/* ================= TRANSPARENT BACKGROUND ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/5 rounded-full blur-[160px]" />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* ================= HERO SECTION ================= */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-28">
          
          {/* LEFT CONTENT */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full"
            >
              <FaRocket className="text-purple-400" size={14} />
              <span className="text-xs text-gray-300 uppercase tracking-wider font-medium">Limited Seats Available</span>
            </motion.div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                Training Program
              </span>
            </h2>

            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Gain real-world experience through industry-level projects, mentorship, 
              and hands-on learning in Web Development, Cloud Computing, and Mobile Apps.
              Work alongside industry experts and build a portfolio that stands out.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-4 text-center group hover:bg-white/10 transition-all duration-300"
                >
                  <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20 mb-3`}>
                    <stat.icon className="text-white text-xl" />
                  </div>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-3">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.03 }}
                  className="flex items-center gap-2 text-sm text-gray-300 group cursor-default"
                >
                  <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${benefit.gradient} flex items-center justify-center`}>
                    <benefit.icon className="text-white text-xs" />
                  </div>
                  <span className="group-hover:text-white transition-colors">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* RIGHT IMAGE */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-20" />
            <motion.img
              src="https://apply.virtunexa.com/wp-content/uploads/2024/06/54.png"
              alt="Internship"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-full max-w-md relative z-10 drop-shadow-2xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full px-4 py-2 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-300" size={12} />
                <span className="text-white text-xs font-bold">98% Success Rate</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ================= CARDS SECTION ================= */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer"
            >
              {/* Gradient Border on Hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white text-2xl shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {card.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                {card.title}
              </h3>

              {/* Subtitle */}
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                {card.subtitle}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed">
                {card.desc}
              </p>

              {/* Arrow Indicator */}
              <div className="mt-4 flex items-center gap-1 text-purple-400 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-2">
                Learn More <span className="text-lg">→</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}