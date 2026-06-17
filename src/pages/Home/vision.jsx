import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  FaLeaf,
  FaArrowRight,
  FaGlobe,
  FaLightbulb,
  FaGraduationCap,
  FaRocket,
  FaBrain,
  FaCode,
} from "react-icons/fa";

export default function VisionSection() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);

  // Animation variants
  const fadeLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const visionItems = [
    {
      icon: <FaGraduationCap />,
      title: "Modern Education",
      desc: "Industry-aligned curriculum",
      color: "purple"
    },
    {
      icon: <FaLightbulb />,
      title: "Innovation Hub",
      desc: "Creative problem solving",
      color: "cyan"
    },
    {
      icon: <FaGlobe />,
      title: "Global Tech",
      desc: "World-class technology",
      color: "blue"
    },
    {
      icon: <FaBrain />,
      title: "Future Ready",
      desc: "Sustainable career growth",
      color: "pink"
    },
  ];

  const getColorStyles = (color) => {
    const styles = {
      purple: {
        bg: "from-purple-500/20 to-purple-600/10",
        iconBg: "from-purple-500 to-purple-600",
        border: "border-purple-500/20",
        text: "text-purple-400",
        glow: "shadow-purple-500/20"
      },
      cyan: {
        bg: "from-cyan-500/20 to-cyan-600/10",
        iconBg: "from-cyan-500 to-blue-600",
        border: "border-cyan-500/20",
        text: "text-cyan-400",
        glow: "shadow-cyan-500/20"
      },
      blue: {
        bg: "from-blue-500/20 to-blue-600/10",
        iconBg: "from-blue-500 to-indigo-600",
        border: "border-blue-500/20",
        text: "text-blue-400",
        glow: "shadow-blue-500/20"
      },
      pink: {
        bg: "from-pink-500/20 to-pink-600/10",
        iconBg: "from-pink-500 to-rose-600",
        border: "border-pink-500/20",
        text: "text-pink-400",
        glow: "shadow-pink-500/20"
      }
    };
    return styles[color] || styles.purple;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-5 md:py-5 px-6 bg-transparent overflow-hidden"
      style={{ opacity }}
    >
      
      {/* ================= TRANSPARENT BACKGROUND EFFECTS ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Subtle Gradient Orbs */}
        <div className="absolute top-20 left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-600/5 rounded-full blur-[140px]" />
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* ================= LEFT SIDE ================= */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full"
            >
              <FaLeaf className="text-purple-400" size={14} />
              <span className="text-sm text-gray-300 uppercase tracking-wider">OUR VISION</span>
            </motion.div>

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-white">Building a</span>
              <span className="block mt-2 bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
                Smarter Future
              </span>
            </h2>

            {/* Description */}
            <p className="text-gray-400 text-base md:text-lg leading-relaxed">
              Our vision is to empower students and innovators with modern technology, 
              practical learning, industry-ready training, and innovation-driven solutions 
              that create real-world impact.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { value: "10K+", label: "STUDENTS IMPACTED", icon: FaGraduationCap },
                { value: "50+", label: "COURSES", icon: FaCode },
                { value: "100%", label: "PRACTICAL LEARNING", icon: FaRocket },
                { value: "24/7", label: "MENTOR SUPPORT", icon: FaLightbulb },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                >
                  <stat.icon className="text-purple-400 text-xl" />
                  <div>
                    <div className="text-white font-bold">{stat.value}</div>
                    <div className="text-[10px] text-gray-500 uppercase">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

      
          </motion.div>

          {/* ================= RIGHT SIDE ================= */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-2xl">
              
              {/* Card Glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-purple-600/20 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-600/20 rounded-full blur-[80px]" />

              {/* Icon Grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-5"
              >
                {visionItems.map((item, i) => {
                  const colors = getColorStyles(item.color);
                  return (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className={`relative rounded-2xl p-6 bg-gradient-to-br ${colors.bg} border ${colors.border} transition-all duration-300 cursor-pointer`}
                    >
                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.iconBg} flex items-center justify-center text-white text-2xl shadow-lg ${colors.glow}`}>
                        {item.icon}
                      </div>

                      {/* Title */}
                      <h3 className={`mt-5 text-xl font-bold ${colors.text}`}>
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 text-sm text-gray-400">
                        {item.desc}
                      </p>

                      {/* Hover Arrow */}
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="mt-3 text-purple-400 text-sm flex items-center gap-1"
                      >
                        Learn More →
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Floating Decorative Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-2xl opacity-30"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-2xl opacity-30"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}