import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaCheckCircle,
  FaLaptopCode,
  FaRocket,
  FaUsers,
  FaCode,
  FaQuoteLeft,
  FaGraduationCap,
  FaHandsHelping,
  FaGlobe,
  FaAward,
  FaHeart,
  FaLightbulb,
  FaShieldAlt,
  FaHandshake,
  FaChartLine,
  FaCalendarAlt,
  FaChevronDown,
  FaChevronUp,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
  FaRegStar,
  FaPlay,
  FaPause,
  FaRobot,
  FaCloud,
} from "react-icons/fa";

// ================= ANIMATION VARIANTS =================
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const float = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  },
};

// ================= REUSABLE COMPONENTS =================

// Enhanced Founder Card with Center Alignment
const FounderCard = ({ name, role, message, image, linkedin, instagram, facebook, twitter, email, phone }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="group text-center p-8 rounded-3xl bg-gradient-to-br from-purple-600/10 to-cyan-600/10 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/60 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 w-full"
  >
    {/* Animated Glow Ring */}
    <div className="relative inline-block">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-2 rounded-full border-2 border-purple-500/30 group-hover:border-cyan-400/50 transition-all duration-300"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-4 rounded-full border border-purple-500/10 group-hover:border-pink-500/30 transition-all duration-300"
      />
      
      <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-purple-500/40 group-hover:border-cyan-400 transition-all duration-500 shadow-2xl shadow-purple-500/30 group-hover:shadow-cyan-500/40">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {/* Online Status Badge */}
      <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-black animate-pulse" />
    </div>

    <h3 className="text-2xl font-bold mt-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
      {name}
    </h3>
    <p className="text-cyan-300 text-sm font-semibold mb-3">{role}</p>
    
    {/* Rating Stars */}
    <div className="flex justify-center gap-1 mb-3">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className="text-yellow-400 text-xs" />
      ))}
    </div>
    
    <p className="text-gray-300 text-sm max-w-xs mx-auto px-2 leading-relaxed">
      <FaQuoteLeft className="inline text-purple-400 mr-1 text-xs opacity-60" />
      {message}
    </p>

    {/* Contact Badges */}
    <div className="flex justify-center gap-2 mt-3 text-xs flex-wrap">
      {email && (
        <span className="px-2 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center gap-1">
          <FaEnvelope size={10} /> Email
        </span>
      )}
      {phone && (
        <span className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 flex items-center gap-1">
          <FaPhone size={10} /> Contact
        </span>
      )}
    </div>

    {/* Social Icons - Enhanced */}
    <div className="flex justify-center gap-3 mt-4 flex-wrap">
      {linkedin && (
        <motion.a 
          href={linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          whileHover={{ y: -4, scale: 1.2 }}
          className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          <FaLinkedin size={16} />
        </motion.a>
      )}
      {instagram && (
        <motion.a 
          href={instagram} 
          target="_blank" 
          rel="noopener noreferrer" 
          whileHover={{ y: -4, scale: 1.2 }}
          className="w-10 h-10 rounded-full bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white transition-all duration-300"
        >
          <FaInstagram size={16} />
        </motion.a>
      )}
      {facebook && (
        <motion.a 
          href={facebook} 
          target="_blank" 
          rel="noopener noreferrer" 
          whileHover={{ y: -4, scale: 1.2 }}
          className="w-10 h-10 rounded-full bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-600 hover:text-white transition-all duration-300"
        >
          <FaFacebook size={16} />
        </motion.a>
      )}
      {twitter && (
        <motion.a 
          href={twitter} 
          target="_blank" 
          rel="noopener noreferrer" 
          whileHover={{ y: -4, scale: 1.2 }}
          className="w-10 h-10 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-gray-400 hover:bg-gray-800 hover:text-white transition-all duration-300"
        >
          <FaTwitter size={16} />
        </motion.a>
      )}
    </div>
  </motion.div>
);

// Enhanced Feature Card
const FeatureCard = ({ icon, title, description, gradient }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -8, scale: 1.03 }}
    className="group p-6 rounded-2xl bg-gradient-to-br from-purple-600/5 to-cyan-600/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/40 transition-all duration-300 relative overflow-hidden"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
    <div className="relative z-10">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/20">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

// Enhanced Stat Card
const StatCard = ({ value, label, icon, gradient, delay }) => (
  <motion.div
    variants={fadeUp}
    custom={delay}
    whileHover={{ y: -10, scale: 1.05 }}
    className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 p-6 text-center transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
    <div className="relative z-10">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-4xl text-cyan-400 mb-3 flex justify-center"
      >
        {icon}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="text-3xl md:text-4xl font-bold text-white"
      >
        {value}
      </motion.div>
      <div className="text-xs text-gray-400 uppercase tracking-wider mt-2">{label}</div>
    </div>
  </motion.div>
);

// Enhanced FAQ Item with Icons
const FAQItem = ({ question, answer, icon }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      variants={fadeUp}
      className="border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-5 text-left hover:bg-purple-500/5 transition-colors duration-300"
      >
        <div className="flex items-center gap-4">
          <span className="text-cyan-400 text-xl">{icon}</span>
          <span className="text-white font-medium text-base">{question}</span>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0"
        >
          <FaChevronDown className="text-cyan-400 text-sm" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="p-5 pt-0 border-t border-white/5">
          <p className="text-gray-300 text-sm leading-relaxed">{answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Value Card
const ValueCard = ({ icon, title, description, gradient }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -8, scale: 1.02 }}
    className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 text-center"
  >
    <motion.div
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.6 }}
      className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl mb-4 shadow-lg shadow-purple-500/20`}
    >
      {icon}
    </motion.div>
    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </motion.div>
);

// Timeline Event
const TimelineEvent = ({ year, title, description, delay, icon }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ delay }}
    className="relative pl-10 pb-12 border-l-2 border-purple-500/30 last:border-0 group hover:border-cyan-400/50 transition-colors duration-300"
  >
    <div className="absolute left-0 top-0 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:scale-125 transition-transform duration-300 shadow-lg shadow-purple-500/30" />
    <div className="absolute left-0 top-0 -translate-x-1/2 w-12 h-12 -ml-1 -mt-1 rounded-full border-2 border-purple-500/20 group-hover:border-cyan-400/30 transition-all duration-300" />
    
    <div className="flex items-center gap-3 mb-2">
      <span className="text-cyan-400 text-lg">{icon}</span>
      <h3 className="text-cyan-400 text-lg font-bold">{year}</h3>
    </div>
    <h4 className="text-white text-lg font-semibold mt-1">{title}</h4>
    <p className="text-gray-400 text-sm mt-2 leading-relaxed">{description}</p>
  </motion.div>
);

// ================= MAIN ABOUT PAGE =================
export default function AboutPage() {
  const { scrollYProgress } = useScroll();

  const founders = [
    {
      name: "Vinay Kumar",
      role: "Co-Founder & CEO",
      message: "Democratizing tech education and creating industry-ready professionals who innovate and lead with integrity and excellence.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      linkedin: "https://linkedin.com/in/vinay",
      instagram: "https://instagram.com/vinay",
      facebook: "https://facebook.com/vinay",
      twitter: "https://twitter.com/vinay",
      email: "vinay@ttichub.co.in",
      phone: "+91 97085 09504",
    },
    {
      name: "Priya Sharma",
      role: "Co-Founder & CTO",
      message: "Building the future of tech education through innovative curriculum design and industry-aligned training programs.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      linkedin: "https://linkedin.com/in/priya",
      instagram: "https://instagram.com/priya",
      facebook: "https://facebook.com/priya",
      twitter: "https://twitter.com/priya",
      email: "priya@ttichub.co.in",
      phone: "+91 98765 43210",
    },
    {
      name: "Amit Singh",
      role: "Co-Founder & COO",
      message: "Passionate about creating opportunities for aspiring tech professionals and building a global community of innovators.",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      linkedin: "https://linkedin.com/in/amit",
      instagram: "https://instagram.com/amit",
      facebook: "https://facebook.com/amit",
      twitter: "https://twitter.com/amit",
      email: "amit@ttichub.co.in",
      phone: "+91 87654 32109",
    },
  ];

  const features = [
    { 
      icon: <FaGraduationCap />, 
      title: "Expert Mentors", 
      description: "Learn from industry professionals with 10+ years of experience and real-world expertise.",
      gradient: "from-purple-600/20 to-purple-800/20"
    },
    { 
      icon: <FaLaptopCode />, 
      title: "Live Projects", 
      description: "Work on real-world projects that build your portfolio and showcase your skills to employers.",
      gradient: "from-cyan-600/20 to-blue-800/20"
    },
    { 
      icon: <FaHandsHelping />, 
      title: "24/7 Support", 
      description: "Get assistance anytime from our dedicated support team and community of learners.",
      gradient: "from-green-600/20 to-emerald-800/20"
    },
    { 
      icon: <FaGlobe />, 
      title: "Global Community", 
      description: "Join a network of 10,000+ learners and alumni from 50+ countries around the world.",
      gradient: "from-pink-600/20 to-rose-800/20"
    },
  ];

  const values = [
    { 
      icon: <FaLightbulb />, 
      title: "Innovation", 
      description: "Constantly evolving with emerging technologies and industry trends.",
      gradient: "from-yellow-500/20 to-orange-500/20"
    },
    { 
      icon: <FaShieldAlt />, 
      title: "Integrity", 
      description: "Honest, transparent, and ethical practices in all our operations.",
      gradient: "from-blue-500/20 to-indigo-500/20"
    },
    { 
      icon: <FaRocket />, 
      title: "Excellence", 
      description: "Striving for the highest quality in everything we do and deliver.",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    { 
      icon: <FaHandshake />, 
      title: "Collaboration", 
      description: "Building a community of shared success and mutual growth.",
      gradient: "from-cyan-500/20 to-teal-500/20"
    },
  ];

  const timeline = [
    { 
      year: "2020", 
      title: "Foundation", 
      description: "TTIC Hub was founded with a vision to transform tech education and bridge the skill gap.",
      icon: <FaRocket />
    },
    { 
      year: "2021", 
      title: "First Batch", 
      description: "Launched our first internship program with 50 students and achieved 95% satisfaction rate.",
      icon: <FaGraduationCap />
    },
    { 
      year: "2022", 
      title: "Course Expansion", 
      description: "Added 15+ new courses in AI, Cloud Computing, Cyber Security, and Full Stack Development.",
      icon: <FaCode />
    },
    { 
      year: "2023", 
      title: "Global Reach", 
      description: "Reached 5,000+ students across 20+ countries with our online training programs.",
      icon: <FaGlobe />
    },
    { 
      year: "2024", 
      title: "Partnerships", 
      description: "Partnered with 30+ tech companies for placements and industry collaborations.",
      icon: <FaHandshake />
    },
  ];

  const faqs = [
    { 
      question: "What courses do you offer?", 
      answer: "We offer comprehensive courses in Full Stack Development (MERN, Next.js), Data Science & AI with Python, Cloud Computing & DevOps, Cyber Security Fundamentals, and UI/UX Design. All courses are project-based and include industry-recognized certification.",
      icon: <FaGraduationCap />
    },
    { 
      question: "Are internships paid?", 
      answer: "Our internships are performance-based stipend programs. High-performing interns receive competitive compensation based on project contributions and performance evaluations. We also provide internship certificates and experience letters.",
      icon: <FaHandsHelping />
    },
    { 
      question: "Do you provide placement assistance?", 
      answer: "Yes, we offer comprehensive placement assistance including resume reviews, mock interviews, portfolio building, and direct connections with our hiring partner network of 30+ tech companies.",
      icon: <FaChartLine />
    },
    { 
      question: "Can I attend classes online?", 
      answer: "All our programs are available online with live instructor-led sessions, recorded materials for self-paced learning, and interactive doubt-solving sessions. We also offer flexible schedules for working professionals.",
      icon: <FaLaptopCode />
    },
    { 
      question: "What is the duration of courses?", 
      answer: "Course durations vary from 3 months to 6 months depending on the program. We offer both intensive bootcamps and extended learning paths to suit different learning needs and schedules.",
      icon: <FaCalendarAlt />
    },
    { 
      question: "Do you offer certifications?", 
      answer: "Yes, upon successful completion of any course, you receive a verified industry-recognized certification from TTIC Hub. Our certificates are valued by employers and can be verified online.",
      icon: <FaAward />
    },
  ];

  const partners = [
    { name: "Google", logo: "https://via.placeholder.com/120x60?text=Google" },
    { name: "Microsoft", logo: "https://via.placeholder.com/120x60?text=Microsoft" },
    { name: "Amazon", logo: "https://via.placeholder.com/120x60?text=Amazon" },
    { name: "IBM", logo: "https://via.placeholder.com/120x60?text=IBM" },
    { name: "Deloitte", logo: "https://via.placeholder.com/120x60?text=Deloitte" },
    { name: "TCS", logo: "https://via.placeholder.com/120x60?text=TCS" },
  ];

  const stats = [
    { value: "10,000+", label: "Students Trained", icon: <FaGraduationCap />, gradient: "from-purple-600 to-purple-800" },
    { value: "98%", label: "Success Rate", icon: <FaAward />, gradient: "from-pink-600 to-rose-800" },
    { value: "50+", label: "Expert Mentors", icon: <FaUsers />, gradient: "from-cyan-600 to-blue-800" },
    { value: "100%", label: "Practical Learning", icon: <FaHeart />, gradient: "from-green-600 to-emerald-800" },
  ];

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* ========== ENHANCED HERO SECTION ========== */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-center px-6 py-20 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-cyan-900/40" />
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 5 L75 20 L75 60 L40 75 L5 60 L5 20 Z' fill='none' stroke='rgba(168,85,247,0.1)' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat' 
        }} />

        {/* Floating Orbs */}
        <motion.div variants={float} animate="animate" className="absolute top-10 left-10 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px]" />
        <motion.div variants={float} animate="animate" transition={{ delay: 1 }} className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-600/30 rounded-full blur-[120px]" />
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-pink-600/20 rounded-full blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block px-6 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-semibold mb-6 mt-5"
          >
            🚀 Welcome to the Future of Tech Education
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Empowering the{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">Next Generation</span><br />
            of Tech Innovators
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            We are a premier tech training and innovation hub dedicated to bridging the skill gap and 
            creating job‑ready professionals through practical, project‑based learning.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2"
            >
              <FaGraduationCap size={18} />
              Explore Programs
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
            >
              <FaPlay size={14} />
              Watch Video
            </motion.button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-gray-400">
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-cyan-400" />
              Trusted by 10,000+ students
            </span>
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-cyan-400" />
              50+ expert mentors
            </span>
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-cyan-400" />
              98% success rate
            </span>
          </div>
        </motion.div>
      </section>

      {/* ========== STATS SECTION ========== */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} delay={index * 0.1} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== FOUNDERS SECTION - FULLY CENTERED ========== */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Leadership Team
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Meet Our Founders
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 mx-auto mt-4 rounded-full" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Passionate leaders driving innovation and excellence in tech education worldwide.
            </p>
          </motion.div>

          {/* Founder Cards - Perfectly Centered */}
          <motion.div 
            variants={staggerContainer} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            className="flex flex-wrap justify-center items-center gap-8 max-w-6xl mx-auto"
          >
            {founders.map((founder, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="w-full sm:w-[320px] md:w-[340px] lg:w-[350px] flex-shrink-0"
              >
                <FounderCard {...founder} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== DETAILED SECTIONS - IMAGE LEFT, CONTENT RIGHT ========== */}
      <div className="max-w-7xl mx-auto px-6">
        {/* Section 1: Training & Internship Programs */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center gap-12 py-20 border-b border-white/10"
        >
          {/* Left Side - Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20">
                <img 
                  src="https://dropinblog.net/34247982/files/featured/why_internships_are_important.jpg" 
                  alt="Training & Internship Programs"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-purple-500/30">
                  <span className="text-xs text-cyan-300 font-semibold flex items-center gap-2">
                    <FaGraduationCap size={14} />
                    Hands-on Experience
                  </span>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <FaPlay size={24} className="ml-1" />
                </motion.button>
              </div>
              
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-cyan-500/20 rounded-full blur-2xl" />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs text-cyan-300 font-semibold uppercase tracking-wider">Hands-on Experience</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Training & Internship Programs
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Our internship programs immerse you in real-world projects, giving you practical exposure 
              to industry workflows and tools.
            </p>

            <div className="space-y-4">
              {[
                { icon: <FaCode className="text-cyan-400" />, text: "Work on live projects with industry experts" },
                { icon: <FaGlobe className="text-purple-400" />, text: "Domains: Web Dev, AI/ML, Data Science, Cyber Security" },
                { icon: <FaAward className="text-yellow-400" />, text: "Internship certificate & experience letter" },
                { icon: <FaLaptopCode className="text-green-400" />, text: "Flexible remote & hybrid options" },
                { icon: <FaHandsHelping className="text-pink-400" />, text: "Placement assistance & interview prep" },
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3 group hover:translate-x-2 transition-transform duration-300"
                >
                  <div className="mt-1 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-gray-300 text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2"
            >
              <FaGraduationCap size={18} />
              Apply Now
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Section 2: Our Courses - Image Left, Content Right */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row items-center gap-12 py-20 border-b border-white/10"
        >
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-500/20">
                <img 
                  src="https://assets.nationaljurist.com/wp-content/uploads/2025/05/legal-internship-768x512.jpg" 
                  alt="Our Courses"
                  className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-purple-500/30">
                  <span className="text-xs text-cyan-300 font-semibold flex items-center gap-2">
                    <FaCode size={14} />
                    Skill Building
                  </span>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-cyan-500/20 rounded-full blur-2xl" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex-1 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs text-cyan-300 font-semibold uppercase tracking-wider">Skill Building</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Our Courses
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              Structured courses designed to take you from beginner to job-ready professional.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: "Full Stack Development (MERN, Next.js)", icon: <FaCode />, color: "from-purple-500/20 to-purple-600/20" },
                { name: "Data Science & AI with Python", icon: <FaRobot />, color: "from-cyan-500/20 to-blue-600/20" },
                { name: "Cloud Computing & DevOps", icon: <FaCloud />, color: "from-blue-500/20 to-indigo-600/20" },
                { name: "Cyber Security Fundamentals", icon: <FaShieldAlt />, color: "from-green-500/20 to-emerald-600/20" },
                { name: "UI/UX Design", icon: <FaGlobe />, color: "from-pink-500/20 to-rose-600/20" },
                { name: "Project-based learning with portfolio", icon: <FaAward />, color: "from-yellow-500/20 to-orange-600/20" },
              ].map((course, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className={`p-3 rounded-xl bg-gradient-to-r ${course.color} border border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400">{course.icon}</span>
                    <span className="text-gray-300 text-xs font-medium">{course.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2"
            >
              <FaCode size={18} />
              Explore Courses
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* ========== CORE VALUES ========== */}
      <section className="py-20 px-6 border-t border-white/10 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Our Principles
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Core Values
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <ValueCard key={idx} {...value} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== MISSION & VISION ========== */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            variants={fadeLeft} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            className="p-8 rounded-3xl bg-gradient-to-br from-purple-600/10 to-purple-800/10 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group"
          >
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center text-cyan-400 text-3xl mb-4 group-hover:scale-110 transition-transform duration-300"
            >
              <FaRocket />
            </motion.div>
            <h3 className="text-3xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              To empower students and professionals with industry-relevant skills, fostering innovation and bridging the gap between education and employment.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeRight} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            className="p-8 rounded-3xl bg-gradient-to-br from-cyan-600/10 to-blue-800/10 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 group"
          >
            <motion.div 
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-3xl mb-4 group-hover:scale-110 transition-transform duration-300"
            >
              <FaGlobe />
            </motion.div>
            <h3 className="text-3xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              To become a global leader in tech training, nurturing a community of innovators who drive digital transformation across industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="py-20 px-6 bg-gradient-to-b from-purple-900/10 to-cyan-900/10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Why Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Why Choose TTIC Hub
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== OUR JOURNEY TIMELINE ========== */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Our Story
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Our Journey
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="relative">
            {timeline.map((event, idx) => (
              <TimelineEvent key={idx} {...event} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== ENHANCED FAQ SECTION ========== */}
      <section className="py-20 px-6 bg-white/5 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Help Center
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Find answers to the most common questions about our programs, services, and policies.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
            {faqs.map((faq, idx) => (
              <FAQItem key={idx} {...faq} />
            ))}
          </motion.div>

          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-600/10 to-cyan-600/10 border border-white/10 text-center"
          >
            <p className="text-gray-300">
              Still have questions? <a href="/contact" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">Contact us</a> and we'll be happy to help!
            </p>
          </motion.div>
        </div>
      </section>

      {/* ========== PARTNERS SECTION ========== */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-green-500/20 text-green-300 text-xs font-semibold uppercase tracking-wider mb-4">
              Our Partners
            </span>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Trusted By Partners
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ scale: 1.1, y: -5 }}
                className="grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              >
                <img src={partner.logo} alt={partner.name} className="h-12 md:h-16 w-auto" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== TESTIMONIAL SECTION ========== */}
      <section className="py-20 px-6 bg-gradient-to-b from-cyan-900/10 to-purple-900/10 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center p-10 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-cyan-600/10" />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative z-10"
            >
              <FaQuoteLeft className="text-cyan-400 text-5xl mx-auto mb-4 opacity-40" />
            </motion.div>
            
            <p className="text-gray-200 text-xl md:text-2xl italic max-w-2xl mx-auto leading-relaxed">
              "TTIC Hub transformed my career. The hands-on projects and mentorship gave me the confidence and skills to land my dream job."
            </p>
            
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
                AS
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">Aditya Sharma</p>
                <p className="text-cyan-400 text-sm">Software Engineer at Google</p>
                <div className="flex gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xs" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
