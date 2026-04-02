import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
const ICON_SIZE = 24; // 🔥 yahan se sab icons control honge

import {
  FcNews,
  FcFactoryBreakdown,
  FcGraduationCap,
  FcOnlineSupport,
  FcSurvey,
  FcBusiness,
  FcFinePrint,
  FcBusinessman,
  FcDocument,
} from "react-icons/fc";
import {
  FaMobileAlt,
  FaAndroid,
  FaApple,
  FaCode,
  FaGlobe,
  FaLaptopCode,
  FaReact,
  FaPalette,
  FaPenNib,
  FaBezierCurve,
} from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa"; // ✅ CORRECT
import { MdLibraryBooks } from "react-icons/md";
import { FiLogOut, FiLogIn } from "react-icons/fi";

import logo from "../assets/logo.png";

/* ================= BASE URL ================= */
const BASE_URL = "https://backend-production-7a212.up.railway.app/api/auth";
const UPLOADS_URL = "https://backend-production-7a212.up.railway.app/uploads";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  /* ================= LOAD USER ================= */
  useEffect(() => {
    if (!token) return;

    axios
      .get(`${BASE_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
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

  const dashboardRoute = role === "admin" ? "/admin" : "/student-dashboard";

  const navLink =
    "relative text-lg font-semibold text-white/90 hover:text-cyan-300 transition hover:scale-110";

  const dropItem =
    "flex items-center gap-2 px-4 py-2 rounded-lg text-white/90 hover:bg-cyan-500/20 hover:text-cyan-300 transition";

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-2xl py-2 shadow-lg"
            : "bg-black/60 backdrop-blur-xl py-4"
        } border-b border-cyan-500/20`}
      >
        <div className="max-w-[1600px] mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            {/* LOGO IMAGE */}
            <motion.img
              src={logo}
              alt="TTIC Hub Logo"
              className="h-14 w-14 object-contain"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.3 }}
            />

            {/* TEXT CONTENT (Hidden on mobile) */}
            <div className="hidden md:flex flex-col leading-tight">
              {/* MAIN NAME */}
              <h1
                className="text-3xl md:text-4xl font-bold 
bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 
bg-clip-text text-transparent 

text-3d"
              >
                TTICHUB
              </h1>

              {/* TAGLINE */}
              <p className="text-[7px] text-white">
                <i> Tech Training, Innovation & Certification Hub</i>
              </p>
            </div>
          </Link>
          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden md:flex items-center gap-10 ml-auto uppercase">
            <NavLink to="/courses" className={navLink}>
              Courses
            </NavLink>
            <NavLink to="/internship" className={navLink}>
              Internship
            </NavLink>

            {/* MORE */}
            <div
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button className="flex  font-bold items-center gap-1 hover:text-cyan-300 uppercase">
                More {moreOpen ? <ChevronUp /> : <ChevronDown />}
              </button>

              <AnimatePresence>
                {moreOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 mt-4 w-58 bg-[#0b1425]/90 backdrop-blur-xl
                               border border-cyan-400/30 rounded-xl p-3 shadow-xl uppercase"
                  >
                    <Link to="/services/app" className={dropItem}>
                      <FaMobileAlt size={ICON_SIZE} />
                      App Develop...
                    </Link>
                    <Link to="/services/web" className={dropItem}>
                      <FaLaptopCode size={ICON_SIZE} />
                      Web Develop...
                    </Link>
                    <Link to="/services/about" className={dropItem}>
                      <FaInfoCircle size={ICON_SIZE} />
                      AboutUs
                    </Link>

                    <Link to="/contact" className={dropItem}>
                      <FcOnlineSupport size={ICON_SIZE} /> Contact
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link
              to="/comingsoon"
              className="px-5 py-2 rounded-xl bg-gradient-to-r
                           from-blue-400 to-purple-500 text-black font-semibold
                           shadow-lg hover:scale-110 transition flex items-center gap-2"
            >
              <FaBookReader /> BEU Guide
            </Link>

            {/* ================= PROFILE ================= */}
            {user ? (
              <div className="relative">
                <img
                  src={
                    "https://img.icons8.com/ios_filled/512/FAB005/contacts.png"
                  }
                  alt="profile"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="h-11 w-11 rounded-full object-cover border border-cyan-400
                             shadow-[0_0_12px_cyan] cursor-pointer hover:scale-110 transition"
                />

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute right-0 mt-3 w-44 bg-black/80
                                 border border-cyan-500/30 rounded-xl p-3 uppercase"
                    >
                      <Link to={dashboardRoute} className={dropItem}>
                        Dashboard
                      </Link>

                      <button onClick={logout} className={dropItem}>
                        <FiLogOut /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-xl bg-gradient-to-r
                           from-cyan-400 to-blue-500 text-black font-semibold
                           shadow-lg hover:scale-110 transition flex items-center gap-2"
              >
                <FiLogIn /> Login
              </Link>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-cyan-400"
          >
            <Menu size={30} />
          </button>
        </div>
      </motion.nav>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {open && (
          <>
            {/* 🔥 OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black backdrop-blur-md z-[998]"
            />
            

            {/* 🚀 LEFT SIDE MENU */}
            <motion.div
              initial={{ x: "-120%" }}
              animate={{ x: 0 }}
              exit={{ x: "-120%" }}
              transition={{
                type: "tween",
                ease: [0.25, 0.8, 0.25, 1],
                duration: 0.5,
              }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm
                   bg-[#05070f]/95 backdrop-blur-xl
                   border-r border-cyan-500/10
                   z-[999] p-6 flex flex-col"
            >
              {/* ❌ CLOSE */}
              <button
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 text-cyan-400"
              >
                <X size={26} />
              </button>

              {/* 🔥 SCROLL AREA */}
              <div className="flex-1 overflow-y-auto pr-2">
                {/* PROFILE */}
                {user ? (
                  <div className="mt-14 flex flex-col items-center gap-4 border-b border-cyan-500/10 pb-6">
                    <img
                      src={`${UPLOADS_URL}/${user.photo}`}
                      className="h-20 w-20 rounded-full border border-cyan-400/40"
                    />
                    <h2 className="text-cyan-300">{user.name}</h2>

                    <Link
                      to={dashboardRoute}
                      onClick={() => setOpen(false)}
                      className="w-full text-center py-2 rounded-xl
                           bg-cyan-500/10 text-cyan-300"
                    >
                      Dashboard
                    </Link>
                  </div>
                ) : (
                  <div className="mt-14 flex justify-center pb-6">
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="px-6 py-3 rounded-xl
                           bg-gradient-to-r from-cyan-400 to-blue-500
                           text-black font-semibold"
                    >
                      Login
                    </Link>
                  </div>
                )}

                <div className="mt-8 flex flex-col gap-2">
                  {[
                    ["Courses", "/courses", <FcGraduationCap />],
                    ["Internship", "/internship", <FcBusiness />],
                    ["App Development", "/services/app", <FaMobileAlt />],
                    ["Web Development", "/services/web", <FaLaptopCode />],
                    ["AboutUs", "/services/logoDesign", <FaInfoCircle />],
                    ["BEU Guide", "/comingsoon", <FaBookReader />],
                    ["Contact", "/contact", <FcOnlineSupport />],
                  ].map(([label, path, icon], i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={path}
                        onClick={() => setOpen(false)}
                        className="group flex items-center gap-4 px-4 py-3 rounded-xl
                   text-white/80 transition-all duration-300
                   hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-blue-500/10
                   hover:text-cyan-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]"
                      >
                        {/* ICON */}
                        <span className="text-xl text-cyan-400 group-hover:scale-125 transition duration-300">
                          {icon}
                        </span>

                        {/* TEXT */}
                        <span className="tracking-wide">{label}</span>

                        {/* RIGHT ARROW (HOVER ONLY) */}
                        <span className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition">
                          →
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            

              {/* 🔥 FIXED LOGOUT */}
              {user && (
                <div className="pt-4 border-t border-cyan-500/10">
                  <button
                    onClick={logout}
                    className="w-full py-3 rounded-xl
                         bg-red-500/10 text-red-400
                         hover:bg-red-500/20 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
