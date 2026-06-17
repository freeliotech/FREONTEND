import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRocket, FaStar, FaUsers, FaCode, FaChartLine, FaClock,
  FaCheckCircle, FaCertificate, FaLaptopCode, FaUserGraduate, FaTrophy,
  FaArrowRight, FaReact, FaNodeJs, FaCloud, FaMobileAlt, FaBrain, FaGithub, FaDocker, FaAws
} from "react-icons/fa";
import { SiPython, SiTensorflow, SiMongodb, SiKubernetes } from "react-icons/si";

export default function HeroSection() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [animatedTextIndex, setAnimatedTextIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  useEffect(() => setIsVisible(true), []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / 100,
        y: (e.clientY - window.innerHeight / 2) / 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const animatedTexts = [
    { text: "Master Web Development", icon: "🚀", color: "text-cyan-400" },
    { text: "Build Mobile Apps", icon: "📱", color: "text-purple-400" },
    { text: "Learn AI & ML", icon: "🤖", color: "text-pink-400" },
    { text: "Cloud Computing", icon: "☁️", color: "text-blue-400" },
    { text: "Cyber Security", icon: "🔒", color: "text-green-400" },
    { text: "DevOps Engineering", icon: "⚙️", color: "text-orange-400" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedTextIndex((prev) => (prev + 1) % animatedTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const floatingIcons = [
    { Icon: FaReact, color: "text-cyan-400", delay: 0, duration: 5, x: "5%", y: "15%" },
    { Icon: FaNodeJs, color: "text-green-400", delay: 1, duration: 6, x: "90%", y: "25%" },
    { Icon: FaCloud, color: "text-blue-400", delay: 2, duration: 7, x: "10%", y: "75%" },
    { Icon: FaMobileAlt, color: "text-purple-400", delay: 3, duration: 5.5, x: "85%", y: "80%" },
    { Icon: SiPython, color: "text-yellow-400", delay: 1.5, duration: 6.5, x: "3%", y: "45%" },
    { Icon: SiTensorflow, color: "text-orange-400", delay: 2.5, duration: 7.5, x: "92%", y: "10%" },
    { Icon: SiMongodb, color: "text-emerald-400", delay: 3.5, duration: 5.8, x: "15%", y: "90%" },
    { Icon: FaBrain, color: "text-pink-400", delay: 0.5, duration: 6.2, x: "80%", y: "55%" },
    { Icon: FaGithub, color: "text-gray-400", delay: 2, duration: 7, x: "20%", y: "20%" },
    { Icon: FaDocker, color: "text-blue-500", delay: 3, duration: 6.8, x: "88%", y: "65%" },
    { Icon: SiKubernetes, color: "text-blue-300", delay: 1, duration: 5.5, x: "50%", y: "5%" },
    { Icon: FaAws, color: "text-orange-500", delay: 2.5, duration: 7.2, x: "60%", y: "95%" },
  ];

  const stats = [
    { value: "15,000+", label: "STUDENTS TRAINED", icon: FaUsers, color: "text-green-400" },
    { value: "98%", label: "SUCCESS RATE", icon: FaChartLine, color: "text-blue-400" },
    { value: "50+", label: "EXPERT MENTORS", icon: FaUserGraduate, color: "text-purple-400" },
    { value: "4.9★", label: "STUDENT RATING", icon: FaStar, color: "text-yellow-400" },
    { value: "100+", label: "LIVE PROJECTS", icon: FaCode, color: "text-cyan-400" },
    { value: "24/7", label: "SUPPORT", icon: FaClock, color: "text-pink-400" },
  ];

  const benefits = [
    { text: "Industry-Level Projects", icon: FaCheckCircle, color: "text-green-400" },
    { text: "Internship Certification", icon: FaCertificate, color: "text-blue-400" },
    { text: "100% Practical Learning", icon: FaLaptopCode, color: "text-purple-400" },
    { text: "Placement Assistance", icon: FaTrophy, color: "text-yellow-400" },
    { text: "Live Mentorship Sessions", icon: FaUserGraduate, color: "text-pink-400" },
    { text: "Industry Recognized Certificate", icon: FaCertificate, color: "text-cyan-400" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  const fadeInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -20 },
    visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 0.5, type: "spring" } }
  };

  return (
    <motion.section style={{ opacity, scale }} className="relative min-h-screen flex items-center overflow-hidden bg-transparent">
      {/* ===== Unified Background ===== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/5 rounded-full blur-[160px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((item, idx) => (
          <motion.div key={idx} className={`absolute ${item.color}`} style={{ left: item.x, top: item.y }}
            animate={{ y: [0, -40, 0], x: [0, (idx % 2 === 0 ? 20 : -20), 0], rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: item.duration, repeat: Infinity, delay: item.delay, ease: "easeInOut" }}>
            <item.Icon size={45} className="drop-shadow-lg opacity-60 hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div variants={containerVariants} initial="hidden" animate={isVisible ? "visible" : "hidden"} className="space-y-8">
            <motion.div variants={badgeVariants} className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}><FaRocket className="text-purple-400" size={14} /></motion.div>
              <span className="text-sm text-gray-300 uppercase tracking-wide">TRUSTED BY 15,000+ STUDENTS</span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight">
                <span className="block bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">Start Your Tech</span>
                <span className="block text-white mt-4">Career <span className="text-cyan-400">Today</span></span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="h-12">
              <div className="text-xl md:text-2xl font-semibold">
                <span className="text-gray-300">✨ </span>
                <motion.span key={animatedTextIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={animatedTexts[animatedTextIndex].color}>
                  {animatedTexts[animatedTextIndex].text}
                </motion.span>
                <span className="ml-2 text-2xl">{animatedTexts[animatedTextIndex].icon}</span>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
              Gain real-world experience with live projects, internships, and mentorship from industry experts. Become job-ready in cutting-edge technologies.
            </motion.p>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
              {benefits.map((benefit, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + idx * 0.1 }}
                  className="flex items-center gap-2 text-gray-300 text-sm group hover:translate-x-1 transition-transform">
                  <benefit.icon className={`${benefit.color} text-xs`} />
                  <span>{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-8">
              {stats.map((stat, idx) => (
                <motion.div key={idx} whileHover={{ y: -5, scale: 1.05 }} className="bg-white/5 backdrop-blur-sm border border-white/10 p-3 rounded-xl text-center transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                  <div className={`${stat.color} text-lg mb-1 flex justify-center`}><stat.icon size={20} /></div>
                  <h3 className={`text-sm font-bold ${stat.color}`}>{stat.value}</h3>
                  <p className="text-[9px] text-gray-400 mt-1 uppercase tracking-tighter">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div variants={fadeInRight} initial="hidden" animate={isVisible ? "visible" : "hidden"} className="relative flex justify-center items-center">
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
              <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-2 border border-white/20 shadow-2xl">
                <img src="https://internship.virtunexa.com/wp-content/uploads/2024/06/24.png" alt="Hero" className="w-full max-w-lg rounded-2xl" />
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2"><FaStar className="text-yellow-300" size={12} /><span className="text-white text-xs font-bold">4.9 Rating</span></div>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, type: "spring" }}
                  className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2"><FaUsers className="text-white" size={12} /><span className="text-white text-xs font-bold">15K+ Students</span></div>
                </motion.div>
              </div>
            </motion.div>
            {[...Array(4)].map((_, i) => (
              <motion.div key={i} animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2], rotate: [0, 90, 0] }}
                transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i }} className="absolute rounded-full border border-purple-500/30"
                style={{ width: `${150 + i * 60}px`, height: `${150 + i * 60}px`, left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}