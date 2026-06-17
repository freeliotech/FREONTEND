import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ApiContext } from "../../config/Api";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhoneAlt,
  FaGraduationCap,
  FaSyncAlt,
} from "react-icons/fa";

/* API */
const BASE_URL = `${ApiContext}/auth`;

export default function LoginSignup() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [useOtp, setUseOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    percentage12: "",
  });

  /* THREE IMAGES FOR CAROUSEL - NO ARROWS */
  const carouselImages = [
    {
      url: "https://cdni.iconscout.com/illustration/premium/thumb/login-illustration-svg-download-png-8333958.png",
      title: "Secure Login",
      description: "Access your account securely"
    },
    {
      url: "https://cdni.iconscout.com/illustration/premium/thumb/dashboard-illustration-svg-download-png-8333959.png",
      title: "Dashboard",
      description: "Manage everything from one place"
    },
    {
      url: "https://cdni.iconscout.com/illustration/premium/thumb/analytics-illustration-svg-download-png-8333960.png",
      title: "Analytics",
      description: "Track your performance"
    }
  ];

  // Auto-slide images every 4 seconds (NO ARROWS)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(slideInterval);
  }, []);

  /* CAPTCHA */
  const generateCaptcha = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let c = "";
    for (let i = 0; i < 6; i++)
      c += chars[Math.floor(Math.random() * chars.length)];
    setCaptcha(c);
  };

  useEffect(() => generateCaptcha(), []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (captcha !== captchaInput) {
      alert("Wrong captcha");
      return;
    }

    setLoading(true);

    try {
      /* SIGNUP */
      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          setLoading(false);
          return;
        }

        await axios.post(`${BASE_URL}/signup`, formData);
        alert("Signup successful");
        setIsLogin(true);
        setLoading(false);
        return;
      }

      /* LOGIN */
      let res;

      if (useOtp) {
        res = await axios.post(`${BASE_URL}/login-verify-otp`, {
          email: formData.email,
          otp,
        });
      } else {
        res = await axios.post(`${BASE_URL}/login`, {
          emailOrMobile: formData.email,
          password: formData.password,
        });
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate(res.data.role === "admin" ? "/admin" : "/my-profile");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  /* REQUEST OTP */
  const requestOTP = async () => {
    if (!formData.email) {
      alert("Enter email first");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/login-request-otp`, {
        email: formData.email,
      });
      setOtpSent(true);
      setUseOtp(true);
      alert("OTP sent");
    } catch {
      alert("OTP send failed");
    }

    setLoading(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#0f1a30] overflow-hidden px-4">
      {/* 3D MULTICOLOR BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -80, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12 + i,
              repeat: Infinity,
            }}
            className="absolute w-40 h-40 border rounded-xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              borderColor: ["#06b6d4", "#9333ea", "#22c55e", "#06b6d4"][i % 4],
            }}
          />
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full"
          />
        </div>
      )}

      {/* CARD */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-6xl w-full grid lg:grid-cols-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden"
      >
        {/* IMAGE CAROUSEL */}
        <div className="hidden lg:flex items-center justify-center p-8 relative ">
          <div className="relative w-full max-w-md">
            {/* Image Container */}
            <div className="relative h-[400px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <motion.img
                    src={carouselImages[currentImageIndex].url}
                    alt={carouselImages[currentImageIndex].title}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-[80%] mx-auto"
                  />
                  
                  {/* Image Caption */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mt-6"
                  >
                    <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">
                      {carouselImages[currentImageIndex].title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {carouselImages[currentImageIndex].description}
                    </p>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot Indicators Only - No Arrows */}
            <div className="flex justify-center gap-2 mt-6">
              {carouselImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    currentImageIndex === idx
                      ? "w-8 h-2 bg-gradient-to-r from-cyan-400 to-purple-400"
                      : "w-2 h-2 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            {/* Decorative Blur Elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
          </div>
        </div>

        {/* FORM */}
        <div className="p-8 md:p-10 text-white">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>

          {/* TOGGLE */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                isLogin
                  ? "bg-cyan-400 text-black"
                  : "border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                !isLogin
                  ? "bg-cyan-400 text-black"
                  : "border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10"
              }`}
            >
              Signup
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* SIGNUP */}
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
                >
                  <Input
                    icon={FaUser}
                    name="name"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                  <Input
                    icon={FaPhoneAlt}
                    name="mobile"
                    placeholder="Mobile"
                    onChange={handleChange}
                  />
                  <Input
                    icon={FaEnvelope}
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                  <Input
                    icon={FaGraduationCap}
                    name="percentage12"
                    placeholder="12th %"
                    onChange={handleChange}
                  />
                  <Input
                    icon={FaLock}
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <Input
                    icon={FaLock}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* LOGIN */}
            {isLogin && (
              <div className="space-y-4">
                <Input
                  icon={FaEnvelope}
                  name="email"
                  placeholder="Email / Mobile"
                  onChange={handleChange}
                />

                {!useOtp && (
                  <Input
                    icon={FaLock}
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                )}

                {useOtp && otpSent && (
                  <Input
                    icon={FaSyncAlt}
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                )}
              </div>
            )}

            {/* CAPTCHA */}
            <div className="flex gap-3 items-center">
              <div className="px-4 py-2 bg-black/40 rounded-lg font-mono text-cyan-400">
                {captcha}
              </div>
              <input
                placeholder="Captcha"
                onChange={(e) => setCaptchaInput(e.target.value)}
                className={`${input} flex-1`}
              />
              <button
                type="button"
                onClick={generateCaptcha}
                className="p-3 bg-cyan-400 text-black rounded-lg hover:bg-cyan-500 transition"
              >
                <FaSyncAlt />
              </button>
            </div>

            {/* OTP BUTTON */}
            {isLogin && !otpSent && (
              <button
                type="button"
                onClick={requestOTP}
                className="w-full border border-cyan-400 text-cyan-400 py-2 rounded-xl hover:bg-cyan-400 hover:text-black transition-all duration-300"
              >
                Login with OTP
              </button>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 rounded-full font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-black"
            >
              {isLogin ? (useOtp ? "Verify OTP" : "Login") : "Create Account"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

/* INPUT */
function Input({ icon: Icon, ...props }) {
  return (
    <div className={`${input} flex items-center gap-3`}>
      {Icon && <Icon className="text-cyan-400" />}
      <input {...props} className="bg-transparent outline-none w-full" />
    </div>
  );
}

const input =
  "w-full px-4 py-2 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-400 outline-none";