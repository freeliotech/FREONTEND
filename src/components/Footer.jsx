import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useCallback, useMemo } from "react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaWhatsapp,
  FaArrowUp,
  FaClock,
  FaTwitter,
  FaGithub,
  FaHeart,
  FaStar,
  FaUsers,
  FaLaptopCode,
} from "react-icons/fa";

/* ================= ENHANCED STATIC ANIMATION SYSTEM ================= */

// Ultra-smooth easing curves
const silkEase = [0.25, 0.1, 0.25, 1];
const elasticEase = [0.68, -0.55, 0.265, 1.55];
const gentleEase = [0.34, 1.56, 0.64, 1];

// Enhanced spring configurations
const elegantSpring = {
  type: "spring",
  stiffness: 260,
  damping: 22,
  mass: 0.6,
  restSpeed: 0.5,
};

const bouncySpring = {
  type: "spring",
  stiffness: 380,
  damping: 14,
  mass: 1.1,
  restSpeed: 0.8,
};

// Enhanced parallax with smoother tracking
const useElegantParallax = (speed = 0.012) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const rafId = useRef(null);
  
  useEffect(() => {
    let isEnabled = true;
    
    const handleMouseMove = (e) => {
      if (!isEnabled || !ref.current) return;
      
      if (rafId.current) cancelAnimationFrame(rafId.current);
      
      rafId.current = requestAnimationFrame(() => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const maxDistance = Math.min(rect.width, rect.height) / 2;
        
        const normalizedX = Math.max(-1, Math.min(1, distanceX / maxDistance));
        const normalizedY = Math.max(-1, Math.min(1, distanceY / maxDistance));
        
        const moveX = normalizedX * maxDistance * speed;
        const moveY = normalizedY * maxDistance * speed;
        
        setPosition({ x: moveX, y: moveY });
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      isEnabled = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [speed]);
  
  return { ref, x: position.x, y: position.y };
};

// Enhanced intersection observer
const useElegantObserver = (threshold = 0.15) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          requestAnimationFrame(() => {
            setTimeout(() => setIsVisible(true), 30);
          });
        }
      },
      { threshold, triggerOnce: true }
    );
    
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    
    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [threshold, isVisible]);
  
  return { ref, isVisible };
};

// Text gradient animation with shimmer effect
const useShimmerEffect = () => {
  const [position, setPosition] = useState(0);
  
  useEffect(() => {
    let startTime = null;
    let animationFrame = null;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % 4000) / 4000;
      setPosition(progress * 200);
      animationFrame = requestAnimationFrame(animate);
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return position;
};

/* ================= ENHANCED ANIMATION VARIANTS ================= */

const fadeUpWithBlur = {
  hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay,
      duration: 0.9,
      ease: silkEase,
    },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay,
      duration: 0.7,
      ease: elasticEase,
    },
  }),
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay,
      duration: 0.8,
      ease: gentleEase,
    },
  }),
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay,
      duration: 0.8,
      ease: gentleEase,
    },
  }),
};

const staggerContainerEnhanced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const pulseHover = {
  scale: 1.08,
  transition: elegantSpring,
};

// Advanced floating animation
const floatVariants = {
  animate: (i) => ({
    y: [0, -15, 0],
    x: [0, (i % 2 === 0 ? 8 : -8), 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 5 + (i % 3) * 1.5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: i * 0.15,
    },
  }),
};

/* ================= MAIN COMPONENT ================= */

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [hoveredSocial, setHoveredSocial] = useState(null);
  
  const { ref: parallaxRef, x, y } = useElegantParallax(0.012);
  const { ref: contentRef, isVisible: contentVisible } = useElegantObserver(0.1);
  
  const shimmerPosition = useShimmerEffect();
  
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  const socials = useMemo(() => [
    { Icon: FaFacebookF, link: "#", color: "#1877f2", name: "Facebook" },
    { Icon: FaTwitter, link: "#", color: "#1da1f2", name: "Twitter" },
    { Icon: FaInstagram, link: "#", color: "#e4405f", name: "Instagram" },
    { Icon: FaLinkedinIn, link: "#", color: "#0077b5", name: "LinkedIn" },
    { Icon: FaYoutube, link: "#", color: "#ff0000", name: "YouTube" },
    { Icon: FaGithub, link: "#", color: "#6e5494", name: "GitHub" },
    { Icon: FaWhatsapp, link: "#", color: "#25d366", name: "WhatsApp" },
  ], []);
  
  const quickLinks = useMemo(() => [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/services/about" },
    { name: "Courses", path: "/courses" },
    { name: "Internship", path: "/internship" },
    { name: "Mentors", path: "/mentors" },
    { name: "Blog", path: "/blog" },
  ], []);
  
  const services = useMemo(() => [
    "Full Stack Development", "Data Science & AI", "Cloud Architecture",
    "Cyber Security", "UI/UX Design", "Digital Marketing",
  ], []);
  
  const contactItems = useMemo(() => [
    { icon: FaMapMarkerAlt, text: "Patna, Bihar, India", label: "Visit Us" },
    { icon: FaWhatsapp, text: "+91 8292928328", label: "WhatsApp" },
    { icon: FaEnvelope, text: "admin@ttichub.co.in", label: "Email Us" },
    { icon: FaClock, text: "Mon-Sat: 10AM - 6PM", label: "Working Hours" },
  ], []);
  
  return (
    <footer
      ref={parallaxRef}
      className="relative bg-black  text-white overflow-hidden"
      style={{ transform: `translate(${x}px, ${y}px)` }}
    >
      {/* ===== ENHANCED BACKGROUND EFFECTS ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.06, 0.12, 0.06],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: silkEase }}
          className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.04, 0.1, 0.04],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: silkEase }}
          className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-pink-600 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.09, 0.05],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: silkEase }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[140px]"
        />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      {/* ===== ENHANCED FLOATING PARTICLES ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={floatVariants}
            animate="animate"
            className="absolute rounded-full"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              background: `rgba(139, 92, 246, ${0.2 + (i % 5) * 0.05})`,
              left: `${(i * 37) % 100}%`,
              top: `${(i * 23) % 100}%`,
              boxShadow: `0 0 ${4 + (i % 4)}px rgba(139, 92, 246, 0.3)`,
            }}
          />
        ))}
      </div>
      
      {/* ===== MAIN CONTENT ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-1 lg:py-8">
        
        {/* ===== LINKS GRID ===== */}
        <div ref={contentRef}>
          <motion.div
            variants={staggerContainerEnhanced}
            initial="hidden"
            animate={contentVisible ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
          >
            {/* Brand Section with Shimmer */}
            <motion.div variants={fadeUpWithBlur} custom={0}>
              <div className="relative">
                <h1 className="text-4xl font-black mb-4 relative">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto]"
                    style={{ backgroundPosition: `${shimmerPosition}% center` }}>
                    𝓣𝓽𝓲𝓬𝒽𝓾𝓫
                  </span>
                </h1>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Tech Training, Innovation & Certification Hub providing industry-ready skills, 
                internships and career growth opportunities.
              </p>
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={contentVisible ? { width: "4rem", opacity: 1 } : {}}
                transition={{ delay: 0.6, duration: 0.8, ease: elasticEase }}
                className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              />
            </motion.div>
            
            {/* Quick Links */}
            <motion.div variants={slideInFromLeft} custom={1}>
              <h3 className="text-purple-400 font-bold text-lg mb-6 relative inline-block">
                Quick Links
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={contentVisible ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="absolute -bottom-2 left-0 w-full h-0.5 bg-purple-500 origin-left"
                />
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 10 }}
                    transition={elegantSpring}
                  >
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-purple-400 text-sm transition-all duration-300 flex items-center gap-2 group"
                    >
                      <motion.span
                        whileHover={{ x: 3 }}
                        className="text-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        →
                      </motion.span>
                      <span>{link.name}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Services */}
            <motion.div variants={slideInFromRight} custom={2}>
              <h3 className="text-purple-400 font-bold text-lg mb-6 relative inline-block">
                Our Services
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={contentVisible ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="absolute -bottom-2 left-0 w-full h-0.5 bg-purple-500 origin-left"
                />
              </h3>
              <ul className="space-y-3">
                {services.map((service, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 8 }}
                    transition={elegantSpring}
                    className="text-gray-400 hover:text-purple-400 text-sm transition-all duration-300 cursor-pointer flex items-center gap-2 group"
                  >
                    <motion.span
                      whileHover={{ scale: 1.2 }}
                      className="text-purple-500"
                    >
                      •
                    </motion.span>
                    {service}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div variants={fadeUpWithBlur} custom={3}>
              <h3 className="text-purple-400 font-bold text-lg mb-6 relative inline-block">
                Contact Info
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={contentVisible ? { scaleX: 1 } : {}}
                  transition={{ delay: 1.0, duration: 0.5 }}
                  className="absolute -bottom-2 left-0 w-full h-0.5 bg-purple-500 origin-left"
                />
              </h3>
              <ul className="space-y-4">
                {contactItems.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.li
                      key={i}
                      whileHover={{ x: 6 }}
                      transition={elegantSpring}
                    >
                      <div className="flex items-start gap-3 text-gray-400 text-sm group">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={bouncySpring}
                        >
                          <Icon className="text-purple-400 mt-0.5 text-base" />
                        </motion.div>
                        <div>
                          <span className="text-gray-500 text-xs block mb-0.5">{item.label}</span>
                          <span className="group-hover:text-purple-400 transition-colors">{item.text}</span>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        </div>
        
        {/* ===== BOTTOM BAR ===== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={contentVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Icons with Enhanced Hover */}
            <div className="flex gap-3">
              {socials.map((social, i) => {
                const Icon = social.Icon;
                return (
                  <motion.a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      y: -6, 
                      scale: 1.15,
                      backgroundColor: social.color,
                      boxShadow: `0 8px 20px ${social.color}40`
                    }}
                    transition={bouncySpring}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredSocial(i)}
                    onMouseLeave={() => setHoveredSocial(null)}
                  >
                    <Icon 
                      size={16} 
                      className="transition-colors duration-300"
                      style={{ color: hoveredSocial === i ? 'white' : social.color }}
                    />
                  </motion.a>
                );
              })}
            </div>
            
            {/* Copyright */}
            <motion.p
              whileHover={{ scale: 1.02 }}
              className="text-gray-500 text-sm text-center"
            >
              © {currentYear} TTICHUB. All rights reserved.
            </motion.p>
            
            {/* Legal Links & Scroll Top */}
           <div className="flex items-center gap-6">
  {[
    { name: "Privacy", path: "/privacy-policy" },
    { name: "Terms", path: "/terms" },
    { name: "Support", path: "/contact" },
  ].map((item, idx) => (
    <motion.div
      key={idx}
      whileHover={{ y: -2 }}
      transition={elegantSpring}
    >
      <Link
        to={item.path}
        className="text-gray-500 hover:text-purple-400 text-sm transition-colors"
      >
        {item.name}
      </Link>
    </motion.div>
  ))}

  <motion.button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    whileHover={{ y: -5, scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    transition={bouncySpring}
    className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30"
  >
    <FaArrowUp size={13} />
  </motion.button>
</div>
          </div>
        </motion.div>
      </div>
      
      {/* ===== ENHANCED ANIMATED BOTTOM BORDER ===== */}
      <motion.div
        animate={{ 
          x: ["-100%", "100%"],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 via-pink-500 to-transparent w-full"
      />
      
      {/* ===== CORNER DECORATIONS ===== */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-40 h-40 border border-purple-500/10 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-20 -left-20 w-40 h-40 border border-pink-500/10 rounded-full"
      />
    </footer>
  );
}