import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiContext } from "../../config/Api";
import QrCode from "../../assets/Qr.jpeg";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaCopy, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default function StepPayment({ utr, setUtr, setStep, applicationId }) {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [isExpired, setIsExpired] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 30) return "text-red-500";
    if (timeLeft <= 60) return "text-yellow-500";
    return "text-green-400";
  };

  const submitPayment = async () => {
    if (!utr) {
      alert("Please enter UTR Number");
      return;
    }

    if (isExpired) {
      alert("Payment time has expired. Please refresh and try again.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${ApiContext}/internship/payment`, {
        id: applicationId,
        utr
      });
      setStep(5);
    } catch (err) {
      console.log("Payment update error", err);
      alert("Payment submit failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyUPI = () => {
    const upiId = "freeliotech@okhdfcbank";
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-md mx-auto bg-[#0b1425] p-6 md:p-10 rounded-3xl text-center space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Complete Your Payment
        </h2>
        <p className="text-gray-500 text-sm mt-2">Scan QR code to pay internship fee</p>
      </div>

      {/* Timer Section */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`bg-black/40 rounded-xl p-4 border ${
          timeLeft <= 30 ? "border-red-500/30" : "border-cyan-400/30"
        }`}
      >
        <div className="flex items-center justify-center gap-3">
          <FaClock className={`${getTimerColor()} text-xl`} />
          <div>
            <p className="text-gray-500 text-xs">Complete payment within</p>
            <p className={`text-3xl font-bold font-mono ${getTimerColor()}`}>
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>
        {isExpired && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 text-red-400 text-xs flex items-center justify-center gap-2"
          >
            <FaExclamationTriangle size={12} />
            Payment time expired! Please refresh.
          </motion.div>
        )}
      </motion.div>

      {/* QR Code Section */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white p-4 rounded-xl"
      >
        <img
          src={QrCode}
          alt="QR Payment"
          className="mx-auto rounded-lg w-48 h-48 object-contain"
        />
      </motion.div>

      {/* Amount Details */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">Internship Fee</span>
          <span className="text-white font-semibold">₹199</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-400">GST (18%)</span>
          <span className="text-white font-semibold">₹0</span>
        </div>
        <div className="border-t border-gray-700 pt-2 flex justify-between items-center">
          <span className="text-gray-300 font-semibold">Total Amount</span>
          <span className="text-green-400 font-bold text-xl">₹199</span>
        </div>
        <p className="text-gray-500 text-xs">*Includes GST and processing fees</p>
      </div>

      {/* UPI ID for Manual Payment */}
      <div className="bg-black/40 rounded-xl p-3">
        <p className="text-gray-500 text-xs mb-2">Manual Payment (Copy UPI ID)</p>
        <div className="flex items-center gap-2 justify-center">
          <code className="text-cyan-400 text-sm bg-black/50 px-3 py-1 rounded-lg">
            sanuj578@finobank
          </code>
          <button
            onClick={handleCopyUPI}
            className="p-2 bg-cyan-400/10 hover:bg-cyan-400/20 rounded-lg transition"
          >
            {copied ? <FaCheckCircle className="text-green-400" /> : <FaCopy className="text-cyan-400" />}
          </button>
        </div>
      </div>

      {/* UTR Input */}
      <div className="space-y-2 text-left">
        <label className="text-gray-400 text-sm">UTR / Transaction ID</label>
        <input
          placeholder="Enter UTR Number"
          value={utr}
          onChange={(e) => setUtr(e.target.value)}
          disabled={isExpired || isSubmitting}
          className="w-full px-4 py-3 rounded-xl bg-black/50 border border-gray-600 text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition disabled:opacity-50"
        />
        <p className="text-gray-500 text-xs">Enter the UTR number from your payment transaction</p>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={!isExpired && utr && !isSubmitting ? { scale: 1.02 } : {}}
        whileTap={!isExpired && utr && !isSubmitting ? { scale: 0.98 } : {}}
        disabled={!utr || isExpired || isSubmitting}
        onClick={submitPayment}
        className={`w-full py-3 rounded-xl font-bold transition-all duration-300 ${
          !utr || isExpired || isSubmitting
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:shadow-lg hover:shadow-cyan-500/25"
        }`}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            Processing...
          </div>
        ) : (
          "Submit Payment"
        )}
      </motion.button>

      {/* Instructions */}
      <div className="text-left bg-cyan-400/5 rounded-xl p-3 border border-cyan-400/20">
        <p className="text-cyan-400 text-xs font-semibold mb-2">📌 Payment Instructions:</p>
        <ul className="text-gray-400 text-xs space-y-1">
          <li>• Scan QR code using any UPI app (Google Pay, PhonePe, Paytm)</li>
          <li>• Enter the amount ₹199</li>
          <li>• Complete payment within {formatTime(timeLeft)}</li>
          <li>• Enter the UTR number after successful payment</li>
        </ul>
      </div>

      {/* Warning for Expired */}
      {isExpired && (
        <div className="bg-red-500/10 rounded-xl p-3 border border-red-500/30">
          <p className="text-red-400 text-xs text-center">
            ⚠️ Payment time expired. Please refresh the page to try again.
          </p>
        </div>
      )}
    </div>
  );
}