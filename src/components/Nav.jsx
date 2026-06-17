import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp, Sparkles, Shield, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import { ApiContext } from "../config/Api";

import {
  FcGraduationCap,
  FcOnlineSupport,
  FcBusiness,
  FcServices,
  FcIdea,
} from "react-icons/fc";

import {
  FaMobileAlt,
  FaLaptopCode,
  FaInfoCircle,
  FaBookReader,
  FaRobot,
  FaCloud,
  FaShieldAlt,
} from "react-icons/fa";

import { FiLogOut, FiLogIn, FiUser, FiSettings } from "react-icons/fi";

import { SiGoogleclassroom } from "react-icons/si";

import logo from "../assets/logo.png";

const ICON_SIZE = 24;

/* ================= BASE URL ================= */

const BASE_URL = `${ApiContext}/auth`;

const UPLOADS_URL =
  "https://backend-production-7a212.up.railway.app/uploads";

/* ================= ANIMATION VARIANTS ================= */

const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 20,
      mass: 0.8 
    }
  }
};

const mobileMenuVariants = {
  hidden: { x: "-100%", opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 120, 
      damping: 18,
      mass: 0.6
    }
  },
  exit: { 
    x: "-100%", 
    opacity: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 20 
    }
  }
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 200, 
      damping: 20 
    }
  },
  exit: { 
    opacity: 0, 
    y: -10, 
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

const linkHoverVariants = {
  hover: { 
    scale: 1.05,
    color: "#15803d",
    transition: { type: "spring", stiffness: 400, damping: 10 }
  }
};

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  /* ================= LOAD USER ================= */

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, [token]);

  /* ================= SCROLL EFFECT ================= */

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= LOGOUT ================= */

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const dashboardRoute = role === "admin" ? "/admin" : "/my-profile";

  /* ================= NAV LINKS ================= */

   const navLink = "relative text-[16px] font-semibold text-white transition-all duration-300 uppercase tracking-wide";

  const dropItem = `
    flex items-center gap-3 px-4 py-3 rounded-2xl
    text-white hover:bg-gradient-to-r hover:from-green-500/20 hover:to-cyan-500/20
    hover:text-green-400 transition-all duration-300
    group cursor-pointer
  `;

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/95 backdrop-blur-2xl py-2 shadow-[0_8px_30px_rgba(34,197,94,0.15)] border-b border-green-500/20"
            : "bg-black/90 backdrop-blur-xl py-4 border-b border-white/10"
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-between">
          {/* ================= LOGO ================= */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            >
              <img
                src={logo}
                alt="Logo"
                className="h-16 w-16 object-contain"
              />
            </motion.div>

            <div className="hidden md:flex flex-col leading-tight">
              <motion.h1
                whileHover={{ scale: 1.02 }}
                className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text tracking-wide"
              >
                𝓣𝓽𝓲𝓬𝒽𝓾𝓫
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-[10px] text-green-400/60 tracking-wider"
              >
                TECH TRAINING & INNOVATION HUB
              </motion.p>
            </div>
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden md:flex items-center gap-8 ml-auto ">
            <motion.div
              whileHover="hover"
              variants={linkHoverVariants}
              onHoverStart={() => setHoveredLink("courses")}
              onHoverEnd={() => setHoveredLink(null)}
            >
              <NavLink to="/courses" className={navLink}>
                Courses
                {hoveredLink === "courses" && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-cyan-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </NavLink>
            </motion.div>

            <motion.div
              whileHover="hover"
              variants={linkHoverVariants}
              onHoverStart={() => setHoveredLink("internship")}
              onHoverEnd={() => setHoveredLink(null)}
            >
              <NavLink to="/internship" className={navLink}>
                Internship
                {hoveredLink === "internship" && (
                  <motion.div
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-cyan-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </NavLink>
            </motion.div>
{/* ================= MORE DROPDOWN - ENHANCED ================= */}
<style>{`
  .dropdown-wrapper {
    position: relative;
  }
  
  .dropdown-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 700;
    color: #ffffff;
    font-size: 15px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 8px 4px;
    transition: all 0.3s ease;
    position: relative;
  }
  
  .dropdown-btn:hover {
    color: #22d3ee;
  }
  
  .dropdown-btn-underline {
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #22d3ee, #a78bfa);
    transition: width 0.3s ease;
  }
  
  .dropdown-btn:hover .dropdown-btn-underline {
    width: 100%;
  }
  
  .dropdown-icon {
    transition: all 0.3s ease;
  }
  
  .dropdown-btn:hover .dropdown-icon {
    color: #22d3ee;
  }
  
  .dropdown-menu {
    position: absolute;
    right: 0;
    top: calc(100% + 12px);
    width: 320px;
    background: linear-gradient(180deg, #0a0a0f, #000000);
    border: 1px solid rgba(168, 85, 247, 0.25);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(168, 85, 247, 0.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 999;
  }
  
  /* Header */
  .dropdown-header {
    padding: 14px 20px;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.12), rgba(236, 72, 153, 0.12), rgba(34, 211, 238, 0.12));
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .live-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .live-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #4ade80;
    border-radius: 50%;
    animation: pulse-dot 1.5s ease-in-out infinite;
  }
  
  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.7); }
  }
  
  .header-title {
    color: #d1d5db;
    font-size: 12px;
    font-weight: 500;
  }
  
  .new-badge {
    font-size: 9px;
    color: #22d3ee;
    background: rgba(34, 211, 238, 0.1);
    padding: 2px 10px;
    border-radius: 20px;
    border: 1px solid rgba(34, 211, 238, 0.25);
  }
  
  /* Section */
  .dropdown-section {
    padding: 8px;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 12px;
    margin: 4px 0 10px 0;
  }
  
  .section-line {
    display: inline-block;
    width: 3px;
    height: 16px;
    border-radius: 4px;
  }
  
  .section-title {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 600;
  }
  
  .section-dev .section-title { color: #22d3ee; }
  .section-dev .section-line { background: linear-gradient(180deg, #22d3ee, #3b82f6); }
  
  .section-infra .section-title { color: #a78bfa; }
  .section-infra .section-line { background: linear-gradient(180deg, #a78bfa, #ec4899); }
  
  .section-company .section-title { color: #fb923c; }
  .section-company .section-line { background: linear-gradient(180deg, #fb923c, #fbbf24); }
  
  /* Dropdown Item */
  .drop-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 12px;
    color: #9ca3af;
    text-decoration: none;
    transition: all 0.25s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .drop-item:hover {
    color: #ffffff;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(236, 72, 153, 0.08));
    box-shadow: 0 4px 20px rgba(168, 85, 247, 0.06);
  }
  
  .drop-item .icon-box {
    display: inline-flex;
    width: 32px;
    height: 32px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.25s ease;
  }
  
  .drop-item:hover .icon-box {
    transform: scale(1.05);
  }
  
  .drop-item .item-text {
    flex: 1;
    font-size: 14px;
    font-weight: 500;
    transition: color 0.25s ease;
  }
  
  .drop-item .item-arrow {
    color: #22d3ee;
    opacity: 0;
    transition: all 0.3s ease;
    transform: translateX(0);
  }
  
  .drop-item:hover .item-arrow {
    opacity: 1;
    transform: translateX(4px);
  }
  
  .drop-item .item-badge {
    font-size: 8px;
    padding: 2px 8px;
    border-radius: 12px;
    font-weight: 600;
  }
  
  .badge-fire { 
    background: rgba(168, 85, 247, 0.15); 
    color: #a78bfa; 
  }
  
  .badge-lock { 
    background: rgba(239, 68, 68, 0.15); 
    color: #f87171; 
  }
  
  .section-border {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  /* Footer */
  .dropdown-footer {
    padding: 12px 20px;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.06), rgba(236, 72, 153, 0.06), rgba(34, 211, 238, 0.06));
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .footer-text {
    font-size: 11px;
    color: #6b7280;
  }
  
  .footer-stats {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .stat-badge {
    font-size: 9px;
    color: #fbbf24;
    background: rgba(251, 191, 36, 0.1);
    padding: 2px 10px;
    border-radius: 20px;
    border: 1px solid rgba(251, 191, 36, 0.2);
  }
  
  .progress-bar {
    width: 60px;
    height: 3px;
    background: #374151;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #fbbf24, #fb923c);
    border-radius: 4px;
    width: 78%;
    animation: progress-grow 1.5s ease-out;
  }
  
  @keyframes progress-grow {
    from { width: 0; }
    to { width: 78%; }
  }
`}</style>

<div className="dropdown-wrapper">
  <button
    className="dropdown-btn"
    onMouseEnter={() => setMoreOpen(true)}
    onMouseLeave={() => setMoreOpen(false)}
  >
    <span className="relative">
      More
      <span className="dropdown-btn-underline"></span>
    </span>
    {moreOpen ? (
      <ChevronUp size={16} className="dropdown-icon" style={{ color: '#22d3ee' }} />
    ) : (
      <ChevronDown size={16} className="dropdown-icon" />
    )}
  </button>

  {moreOpen && (
    <div 
      className="dropdown-menu"
      onMouseEnter={() => setMoreOpen(true)}
      onMouseLeave={() => setMoreOpen(false)}
    >
      {/* Header */}
      <div className="dropdown-header">
        <div className="live-indicator">
          <span className="live-dot"></span>
          <span className="header-title">Explore Our Services</span>
        </div>
        <span className="new-badge">✦ NEW</span>
      </div>

      {/* Development Section */}
      <div className="dropdown-section section-dev">
        <div className="section-header">
          <span className="section-line"></span>
          <span className="section-title">Development</span>
        </div>
        
        <Link to="/services/app" className="drop-item">
          <span className="icon-box" style={{ background: 'rgba(34, 211, 238, 0.1)', color: '#22d3ee' }}>
            <FaMobileAlt size={15} />
          </span>
          <span className="item-text">App Development</span>
          <span className="item-arrow">→</span>
        </Link>

        <Link to="/services/web" className="drop-item">
          <span className="icon-box" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }}>
            <FaLaptopCode size={15} />
          </span>
          <span className="item-text">Web Development</span>
          <span className="item-arrow">→</span>
        </Link>

        <Link to="/comingsoon" className="drop-item">
          <span className="icon-box" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a78bfa' }}>
            <FaRobot size={15} />
          </span>
          <span className="item-text">AI & Machine Learning</span>
          <span className="item-badge badge-fire">🔥</span>
          <span className="item-arrow">→</span>
        </Link>
      </div>

      {/* Infrastructure Section */}
      <div className="dropdown-section section-infra section-border">
        <div className="section-header">
          <span className="section-line"></span>
          <span className="section-title">Infrastructure</span>
        </div>
        
        <Link to="/comingsoon" className="drop-item">
          <span className="icon-box" style={{ background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }}>
            <FaCloud size={15} />
          </span>
          <span className="item-text">Cloud Computing</span>
          <span className="item-arrow">→</span>
        </Link>

        <Link to="/comingsoon" className="drop-item">
          <span className="icon-box" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#f87171' }}>
            <FaShieldAlt size={15} />
          </span>
          <span className="item-text">Cyber Security</span>
          <span className="item-badge badge-lock">🔒</span>
          <span className="item-arrow">→</span>
        </Link>
      </div>

      {/* Company Section */}
      <div className="dropdown-section section-company section-border">
        <div className="section-header">
          <span className="section-line"></span>
          <span className="section-title">Company</span>
        </div>
        
        <Link to="/services/about" className="drop-item">
          <span className="icon-box" style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#fbbf24' }}>
            <FaInfoCircle size={15} />
          </span>
          <span className="item-text">About Us</span>
          <span className="item-arrow">→</span>
        </Link>

        <Link to="/contact" className="drop-item">
          <span className="icon-box" style={{ background: 'rgba(251, 146, 60, 0.1)', color: '#fb923c' }}>
            <FcOnlineSupport size={15} />
          </span>
          <span className="item-text">Contact Support</span>
          <span className="item-arrow">→</span>
        </Link>
      </div>

      {/* Footer */}
      <div className="dropdown-footer">
        <span className="footer-text">✨ New courses added weekly</span>
        <div className="footer-stats">
          <span className="stat-badge">⭐ 10K+ students</span>
          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
            {/* ================= BEU GUIDE BUTTON ================= */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/comingsoon"
                className="p-[2px] rounded-2xl bg-gradient-to-r from-green-500 via-cyan-500 to-purple-500 inline-block shadow-lg shadow-green-500/20"
              >
                <span className="px-5 py-2 rounded-2xl bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold flex items-center gap-2 transition-all duration-300 hover:shadow-xl">
                  <FaBookReader size={16} />
                  BEU Guide
                  <Sparkles size={14} className="text-yellow-300" />
                </span>
              </Link>
            </motion.div>

            {/* ================= PROFILE DROPDOWN ================= */}
            {user ? (
              <div className="relative">
                <motion.img
                  whileHover={{ scale: 1.08, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"}
                  alt="profile"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="h-11 w-11 rounded-full object-cover border-2 border-green-500 shadow-lg shadow-green-500/25 cursor-pointer transition-all duration-300"
                />

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-3 w-56 bg-black/90 backdrop-blur-2xl border border-green-500/20 rounded-2xl p-2 shadow-2xl"
                    >
                      <div className="px-3 py-2 border-b border-white/10 mb-2">
                        <p className="text-white font-semibold text-sm">{user.name}</p>
                        <p className="text-green-400 text-xs">{user.email}</p>
                      </div>

                      <Link to={dashboardRoute} className={dropItem}>
                        <FiUser size={18} />
                        Dashboard
                      </Link>

                      <Link to="/settings/edit-profile" className={dropItem}>
                        <FiSettings size={18} />
                        Settings
                      </Link>

                      <div className="h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent my-1" />

                      <button onClick={logout} className={dropItem}>
                        <FiLogOut size={18} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="p-[2px] rounded-2xl bg-gradient-to-r from-green-500 via-cyan-500 to-purple-500 inline-block shadow-lg shadow-green-500/20"
                >
                  <span className="px-5 py-2 rounded-2xl bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold flex items-center gap-2">
                    <FiLogIn size={16} />
                    Login
                  </span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="md:hidden text-white bg-gradient-to-r from-green-500 to-cyan-500 p-2 rounded-xl"
          >
            <Menu size={24} />
          </motion.button>
        </div>
      </motion.nav>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {open && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[998]"
            />

            {/* MOBILE DRAWER */}
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 left-0 h-screen w-[90%] sm:w-[80%] md:w-[420px] bg-gradient-to-br from-gray-900 via-black to-gray-900 backdrop-blur-3xl border-r border-green-500/20 z-[999] p-6 flex flex-col overflow-y-auto shadow-2xl"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between pb-6 border-b border-green-500/20">
                <Link
                  to="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 group"
                >
                  <motion.img
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    src={logo}
                    alt="logo"
                    className="h-12 w-12 rounded-xl object-contain"
                  />
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      𝓣𝓽𝓲𝓬𝒽𝓾𝓫
                    </h1>
                    <p className="text-[8px] text-green-400/60">TECH TRAINING HUB</p>
                  </div>
                </Link>

                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-300"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* PROFILE SECTION */}
              {user ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-5 rounded-3xl bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-white/10"
                >
                  <img
                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s"}
                    alt="profile"
                    className="h-16 w-16 rounded-full border-2 border-purple-500 mx-auto"
                  />
                  <h3 className="text-white font-semibold text-center mt-3">
                    {user.name}
                  </h3>
                  <p className="text-green-400 text-xs text-center">{user.email}</p>
                  <Link
                    to={dashboardRoute}
                    onClick={() => setOpen(false)}
                    className="mt-4 block text-center py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-purple-500/20"
                  >
                    Go to Dashboard
                  </Link>
                </motion.div>
              ) : (
                <div className="mt-6">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="block text-center py-3 rounded-xl bg-gradient-to-r from-green-600 to-cyan-600 text-white font-semibold shadow-lg shadow-green-500/20 hover:scale-[1.02] transition-all duration-300"
                  >
                    Login 
                  </Link>
                </div>
              )}

              {/* MOBILE NAVIGATION LINKS */}
              <div className="mt-8 flex flex-col gap-3">
                {[
                  ["Courses", "/courses", <FcGraduationCap size={20} />, "text-blue-400"],
                  ["Internship", "/internship", <FcBusiness size={20} />, "text-green-400"],
                  ["App Development", "/services/app", <FaMobileAlt size={18} />, "text-cyan-400"],
                  ["Web Development", "/services/web", <FaLaptopCode size={18} />, "text-purple-400"],
                  ["AI & ML", "/comingsoon", <FaRobot size={18} />, "text-pink-400"],
                  ["Cloud Computing", "/comingsoon", <FaCloud size={18} />, "text-sky-400"],
                  ["About Us", "/services/about", <FaInfoCircle size={18} />, "text-yellow-400"],
                  ["BEU Guide", "/comingsoon", <FaBookReader size={18} />, "text-orange-400"],
                  ["Contact", "/contact", <FcOnlineSupport size={20} />, "text-red-400"],
                ].map(([label, path, icon, color], i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      to={path}
                      onClick={() => setOpen(false)}
                      className="group block"
                    >
                      <div className={`flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-200 hover:bg-gradient-to-r hover:from-${color.split('-')[1]}-500/20 hover:to-blue-500/20 hover:border-green-500/30 hover:translate-x-2 transition-all duration-300`}>
                        <span className={color}>{icon}</span>
                        <span className="font-medium text-sm flex-1">{label}</span>
                        <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-green-400">
                          →
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* LOGOUT BUTTON */}
              {user && (
                <div className="mt-auto pt-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={logout}
                    className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FiLogOut size={18} />
                    Logout
                  </motion.button>
                </div>
              )}

              {/* DECORATIVE ELEMENTS */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex justify-center gap-4">
                  <Shield size={16} className="text-green-400/40" />
                  <Zap size={16} className="text-cyan-400/40" />
                  <Sparkles size={16} className="text-purple-400/40" />
                </div>
                <p className="text-center text-[10px] text-gray-500 mt-3">
                  Secure Connection • 256-Bit Encryption
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}