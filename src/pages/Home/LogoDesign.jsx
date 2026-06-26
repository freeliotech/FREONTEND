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
} from "react-icons/fa";

// ================= ANIMATION VARIANTS =================
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const float = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

// ================= REUSABLE COMPONENTS =================
const FounderCard = ({ name, role, message, image, linkedin, instagram, facebook }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    whileHover={{ y: -8 }}
    className="group text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
  >
    {/* Circular image with animated border */}
    <div className="relative inline-block">
      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-purple-500/30 group-hover:border-cyan-400 transition-all duration-300 shadow-xl">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
      </div>
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-xs px-3 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition">
        Founder
      </div>
    </div>
    <h3 className="text-xl font-bold mt-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
      {name}
    </h3>
    <p className="text-sm text-cyan-300 mb-3">{role}</p>
    <p className="text-gray-400 text-sm max-w-xs mx-auto px-2">
      <FaQuoteLeft className="inline text-purple-400 mr-1 text-xs" />
      {message}
    </p>
    {/* Social Icons */}
    <div className="flex justify-center gap-3 mt-4">
      <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
        <FaLinkedin size={14} />
      </a>
      <a href={instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400 hover:bg-pink-600 hover:text-white transition-all duration-300">
        <FaInstagram size={14} />
      </a>
      <a href={facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 hover:bg-cyan-600 hover:text-white transition-all duration-300">
        <FaFacebook size={14} />
      </a>
    </div>
  </motion.div>
);

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -6, scale: 1.02 }}
    className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-xl mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const StatCard = ({ value, label, icon, color }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -8, scale: 1.02 }}
    className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center transition-all duration-300 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/20"
  >
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
    <div className="relative z-10">
      <div className="text-4xl text-cyan-400 mb-3 flex justify-center">{icon}</div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-3xl md:text-4xl font-bold text-white"
      >
        {value}
      </motion.div>
      <div className="text-xs text-gray-400 uppercase tracking-wider mt-2">{label}</div>
    </div>
  </motion.div>
);

const DetailedSection = ({ title, description, points, image, reverse, icon, badge }) => (
  <div className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-12 py-16 border-b border-white/10`}>
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex-1">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-2xl blur-xl" />
        {/* Make the image circular? Not needed for these – keep rectangular for variety */}
        <img src={image} alt={title} className="relative rounded-2xl w-full h-auto object-cover shadow-2xl" />
      </div>
    </motion.div>
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex-1 space-y-4">
      {badge && <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold uppercase tracking-wider">{badge}</span>}
      <div className="flex items-center gap-3">
        <div className="text-3xl text-cyan-400">{icon}</div>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{title}</h2>
      </div>
      <p className="text-gray-300 text-base leading-relaxed">{description}</p>
      <ul className="space-y-3">
        {points.map((point, idx) => (
          <li key={idx} className="flex items-start gap-2 text-gray-400 text-sm">
            <FaCheckCircle className="text-cyan-400 mt-0.5 flex-shrink-0" size={14} />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  </div>
);

const ValueCard = ({ icon, title, description }) => (
  <motion.div
    variants={fadeUp}
    whileHover={{ y: -6 }}
    className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 text-center"
  >
    <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center text-white text-2xl mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </motion.div>
);

const TimelineEvent = ({ year, title, description, delay }) => (
  <motion.div
    variants={fadeUp}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ delay }}
    className="relative pl-8 pb-10 border-l-2 border-purple-500/30 last:border-0"
  >
    <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
    <h3 className="text-cyan-400 text-lg font-bold">{year}</h3>
    <h4 className="text-white text-lg font-semibold mt-1">{title}</h4>
    <p className="text-gray-400 text-sm mt-2">{description}</p>
  </motion.div>
);

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center py-4 text-left">
        <span className="text-white font-medium">{question}</span>
        {open ? <FaChevronUp className="text-cyan-400" /> : <FaChevronDown className="text-cyan-400" />}
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
        <p className="text-gray-400 text-sm pb-4">{answer}</p>
      </motion.div>
    </div>
  );
};

// ================= MAIN ABOUT PAGE =================
export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);

  const founders = [
    {
      name: "Vinay Kumar",
      role: "Co-Founder & CEO",
      message: "Democratizing tech education and creating industry-ready professionals who innovate and lead.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      linkedin: "https://linkedin.com/in/vinay",
      instagram: "https://instagram.com/vinay",
      facebook: "https://facebook.com/vinay",
    }
  ];

  const features = [
    { icon: <FaGraduationCap />, title: "Expert Mentors", description: "Learn from industry professionals with years of experience." },
    { icon: <FaLaptopCode />, title: "Live Projects", description: "Work on real-world projects that build your portfolio." },
    { icon: <FaHandsHelping />, title: "24/7 Support", description: "Get assistance anytime from our dedicated support team." },
    { icon: <FaGlobe />, title: "Global Community", description: "Join a network of learners and alumni from around the world." },
  ];

  const values = [
    { icon: <FaLightbulb />, title: "Innovation", description: "Constantly evolving with emerging technologies." },
    { icon: <FaShieldAlt />, title: "Integrity", description: "Honest, transparent, and ethical practices." },
    { icon: <FaRocket />, title: "Excellence", description: "Striving for the highest quality in everything we do." },
    { icon: <FaHandshake />, title: "Collaboration", description: "Building a community of shared success." },
  ];

  const timeline = [
    { year: "2020", title: "Foundation", description: "TTIC Hub was founded with a vision to transform tech education." },
    { year: "2021", title: "First Batch", description: "Launched our first internship program with 50 students." },
    { year: "2022", title: "Course Expansion", description: "Added 15+ new courses in AI, Cloud, and Cyber Security." },
    { year: "2023", title: "Global Reach", description: "Reached 5,000+ students across 20+ countries." },
    { year: "2024", title: "Partnerships", description: "Partnered with 30+ tech companies for placements." },
  ];

  const faqs = [
    { question: "What courses do you offer?", answer: "We offer Full Stack Development, Data Science, AI/ML, Cyber Security, Cloud Computing, and UI/UX Design. All courses are project-based and include certification." },
    { question: "Are internships paid?", answer: "Internships are performance-based stipend programs. High-performing interns may receive compensation based on project contributions." },
    { question: "Do you provide placement assistance?", answer: "Yes, we offer resume reviews, mock interviews, and connections with our hiring partner network." },
    { question: "Can I attend classes online?", answer: "All programs are available online with live instructor-led sessions and recorded materials." },
  ];

  const partners = [
    "https://via.placeholder.com/120x60?text=Partner+1",
    "https://via.placeholder.com/120x60?text=Partner+2",
    "https://via.placeholder.com/120x60?text=Partner+3",
    "https://via.placeholder.com/120x60?text=Partner+4",
    "https://via.placeholder.com/120x60?text=Partner+5",
    "https://via.placeholder.com/120x60?text=Partner+6",
  ];

  return (
    <div className="bg-black text-white overflow-hidden">
      {/* ========== ENHANCED HERO SECTION WITH CIRCULAR DECORATIONS ========== */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/30" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L55 18.5 L55 41.5 L30 55 L5 41.5 L5 18.5 Z' fill='none' stroke='rgba(168,85,247,0.08)' stroke-width='0.5'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat' }} />

        {/* Floating circular background elements */}
        <motion.div variants={float} animate="animate" className="absolute top-10 left-10 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
        <motion.div variants={float} animate="animate" transition={{ delay: 1 }} className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" />
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight mt-4">
            Empowering the{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">Next Generation</span><br />
            of Tech Innovators
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We are a premier tech training and innovation hub dedicated to bridging the skill gap and creating job‑ready professionals through practical, project‑based learning.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:scale-105 transition-transform duration-300">Explore Programs</button>
            <button className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-all duration-300">Watch Video</button>
          </div>
        </motion.div>
      </section>

      {/* ========== STATS SECTION (with circular hover glow) ========== */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard value="10,000+" label="Students Trained" icon={<FaGraduationCap />} color="from-purple-500 to-purple-600" />
            <StatCard value="98%" label="Success Rate" icon={<FaAward />} color="from-pink-500 to-rose-500" />
            <StatCard value="50+" label="Expert Mentors" icon={<FaUsers />} color="from-cyan-500 to-blue-500" />
            <StatCard value="100%" label="Practical Learning" icon={<FaHeart />} color="from-green-500 to-emerald-500" />
          </motion.div>
        </div>
      </section>

      {/* ========== FOUNDERS SECTION (circular images) ========== */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Meet Our Leadership</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Passionate founders driving innovation and excellence in tech education.</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {founders.map((founder, idx) => <FounderCard key={idx} {...founder} />)}
          </motion.div>
        </div>
      </section>

      {/* ========== CORE VALUES (circular icons) ========== */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Our Core Values</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">The principles that guide everything we do.</p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => <ValueCard key={idx} {...value} />)}
          </motion.div>
        </div>
      </section>

      {/* ========== MISSION & VISION CARDS ========== */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-8 rounded-2xl bg-gradient-to-br from-purple-600/10 to-purple-800/10 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center text-cyan-400 text-2xl mb-4"><FaRocket /></div>
            <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">To empower students and professionals with industry-relevant skills, fostering innovation and bridging the gap between education and employment.</p>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }} className="p-8 rounded-2xl bg-gradient-to-br from-cyan-600/10 to-blue-800/10 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-2xl mb-4"><FaGlobe /></div>
            <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">To become a global leader in tech training, nurturing a community of innovators who drive digital transformation across industries.</p>
          </motion.div>
        </div>
      </section>

      {/* ========== WHY CHOOSE US ========== */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Why Choose Us</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => <FeatureCard key={idx} {...feature} />)}
          </motion.div>
        </div>
      </section>

      {/* ========== OUR JOURNEY TIMELINE ========== */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Our Journey</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          </motion.div>
          <div className="relative">
            {timeline.map((event, idx) => <TimelineEvent key={idx} {...event} delay={idx * 0.1} />)}
          </div>
        </div>
      </section>
{/* ========== DETAILED SECTIONS (with circular images) ========== */}
<div className="max-w-6xl mx-auto px-6">
  <DetailedSection
    title="Training & Internship Programs"
    badge="Hands-on Experience"
    description="Our internship programs immerse you in real-world projects, giving you practical exposure to industry workflows and tools."
    points={[
      "Work on live projects with industry experts",
      "Domains: Web Dev, AI/ML, Data Science, Cyber Security",
      "Internship certificate & experience letter",
      "Flexible remote & hybrid options",
      "Placement assistance & interview prep",
    ]}
    image="https://dropinblog.net/34247982/files/featured/why_internships_are_important.jpg"
    icon={<FaLaptopCode size={32} />}
    circular={true}  // ← THIS MAKES IT CIRCULAR
  />
  
<DetailedSection
  title="Our Courses"
  reverse
  badge="Skill Building"
  description="Structured courses designed to take you from beginner to job-ready professional."
  points={[
    "Full Stack Development (MERN, Next.js)",
    "Data Science & AI with Python",
    "Cloud Computing & DevOps",
    "Cyber Security Fundamentals",
    "Project-based learning with portfolio",
  ]}
  image="https://assets.nationaljurist.com/wp-content/uploads/2025/05/legal-internship-768x512.jpg"
  icon={<FaCode size={32} />}
  circular={true}
/>
</div>

      {/* ========== PARTNERS & CLIENTS ========== */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Trusted By Partners</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((logo, idx) => (
              <motion.img key={idx} variants={fadeUp} src={logo} alt={`Partner ${idx + 1}`} className="h-12 md:h-16 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300" />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== FAQ SECTION ========== */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
          </motion.div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-2">
            {faqs.map((faq, idx) => <FAQItem key={idx} {...faq} />)}
          </motion.div>
        </div>
      </section>

      {/* ========== TESTIMONIAL ========== */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
            <FaQuoteLeft className="text-cyan-400 text-3xl mx-auto mb-4 opacity-60" />
            <p className="text-gray-300 text-lg italic max-w-2xl mx-auto">"TTIC Hub transformed my career. The hands-on projects and mentorship gave me the confidence and skills to land my dream job."</p>
            <p className="text-cyan-400 font-semibold mt-4">— Aditya Sharma, Alumnus</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
