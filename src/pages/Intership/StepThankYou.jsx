import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  FaCheckCircle, 
  FaEnvelope, 
  FaWhatsapp, 
  FaPhone, 
  FaHome,
  FaArrowRight,
  FaIdCard
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function StepThankYou({ applicationId }) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/");
    }
  }, [countdown, navigate]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleExploreMore = () => {
    navigate("/internship");
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center bg-[#0b1425]/90 backdrop-blur-xl border border-green-400/20 rounded-3xl p-8 md:p-12 shadow-[0_0_40px_rgba(0,255,0,0.1)]"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30"
            />
            <FaCheckCircle className="text-green-400 text-7xl relative z-10" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent"
        >
          Application Submitted Successfully!
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 mt-4 text-lg"
        >
          Thank you for applying to our internship program.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 mt-2"
        >
          Our team will review your application and contact you shortly.
        </motion.p>

        {/* Application ID Card */}
        {applicationId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl p-4 border border-cyan-400/30"
          >
            <div className="flex items-center justify-center gap-2">
              <FaIdCard className="text-cyan-400" />
              <span className="text-gray-400 text-sm">Application ID:</span>
              <span className="text-cyan-400 font-mono font-semibold">{applicationId}</span>
            </div>
          </motion.div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-[#04070d] border border-white/10 rounded-xl p-5 text-left space-y-3"
        >
          <p className="text-cyan-400 text-sm font-semibold flex items-center gap-2">
            <FaEnvelope className="text-xs" />
            What's Next?
          </p>
          <div className="space-y-2 text-sm text-gray-400">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-cyan-400/20 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-cyan-400 text-xs">1</span>
              </div>
              <p>Check your email for application confirmation</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-cyan-400/20 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-cyan-400 text-xs">2</span>
              </div>
              <p>Our team will review your application within 24-48 hours</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-cyan-400/20 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-cyan-400 text-xs">3</span>
              </div>
              <p>You will receive onboarding details via email/WhatsApp</p>
            </div>
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm"
        >
          <div className="flex items-center gap-2 text-gray-400">
            <FaWhatsapp className="text-green-400" />
            <span>Need help? </span>
            <a href="https://wa.me/918292928328" className="text-cyan-400 hover:underline">
              +91 82929 28328
            </a>
          </div>
          <div className="hidden sm:block text-gray-600">|</div>
          <div className="flex items-center gap-2 text-gray-400">
            <FaPhone className="text-cyan-400" />
            <span>Call us: </span>
            <a href="tel:+918292928328" className="text-cyan-400 hover:underline">
              +91 82929 28328
            </a>
          </div>
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoHome}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300"
          >
            <FaHome size={16} />
            Back to Home
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExploreMore}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
          >
            Explore More Internships
            <FaArrowRight size={14} />
          </motion.button>
        </div>

        {/* Auto Redirect Info */}
        {countdown > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-600 text-xs">
              Redirecting to home in <span className="text-cyan-400">{countdown}</span> seconds...
            </p>
          </motion.div>
        )}

        {/* Success Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full"
        >
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-400 text-xs">Payment Successful</span>
        </motion.div>
      </motion.div>
    </div>
  );
}