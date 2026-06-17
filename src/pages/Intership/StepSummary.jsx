import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ApiContext } from "../../config/Api";
import { 
  FaUser, 
  FaUniversity, 
  FaLaptopCode, 
  FaTools,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaBook,
  FaCalendarAlt,
  FaIdCard,
  FaPercentage,
  FaCode,
  FaClock,
  FaGlobe,
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaRupeeSign,
  FaSpinner
} from "react-icons/fa";

export default function StepSummary({ branch, form, setStep, setApplicationId }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitApplication = async () => {
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${ApiContext}/internship/apply`, {
        ...form,
        branch: branch?.name
      });
      setApplicationId(res.data.data._id);
      setStep(4);
    } catch (err) {
      console.log("Error submitting application", err);
      alert("Application submit failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-5xl mx-auto bg-[#0b1425]/90 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-6 md:p-10 space-y-8 shadow-[0_0_40px_rgba(0,255,255,0.1)]"
    >
      {/* TITLE */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-full mb-4">
          <FaCheckCircle className="text-cyan-400 text-sm" />
          <span className="text-cyan-400 text-xs font-medium">REVIEW YOUR APPLICATION</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
          Application Summary
        </h2>
        <p className="text-gray-500 text-sm mt-2">Please verify your details before proceeding</p>
      </div>

      {/* PROGRESS BAR */}
      <div className="relative">
        <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "75%" }}
            transition={{ duration: 0.8 }}
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Personal</span>
          <span>Academic</span>
          <span>Internship</span>
          <span className="text-cyan-400">Summary</span>
          <span>Payment</span>
        </div>
      </div>

      {/* PERSONAL INFO */}
      <motion.div variants={sectionVariants} className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-5 pb-2 border-b border-cyan-500/20">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
            <FaUser className="text-white text-sm" />
          </div>
          <h3 className="text-lg font-semibold text-cyan-300">Personal Information</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <FaUser className="text-cyan-400 text-xs mt-1" />
            <div>
              <p className="text-gray-500 text-xs">Full Name</p>
              <p className="text-white font-medium">{form.name || "—"}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FaEnvelope className="text-cyan-400 text-xs mt-1" />
            <div>
              <p className="text-gray-500 text-xs">Email Address</p>
              <p className="text-white">{form.email || "—"}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FaPhone className="text-cyan-400 text-xs mt-1" />
            <div>
              <p className="text-gray-500 text-xs">Mobile Number</p>
              <p className="text-white">{form.mobile || "—"}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FaVenusMars className="text-cyan-400 text-xs mt-1" />
            <div>
              <p className="text-gray-500 text-xs">Gender</p>
              <p className="text-white">{form.gender || "—"}</p>
            </div>
          </div>
          <div className="md:col-span-2 flex items-start gap-2">
            <FaMapMarkerAlt className="text-cyan-400 text-xs mt-1" />
            <div>
              <p className="text-gray-500 text-xs">Address</p>
              <p className="text-white">{form.address || "—"}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ACADEMIC INFO */}
      <motion.div variants={sectionVariants} className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-5 pb-2 border-b border-cyan-500/20">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <FaUniversity className="text-white text-sm" />
          </div>
          <h3 className="text-lg font-semibold text-cyan-300">Academic Information</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <FaGraduationCap className="text-cyan-400 text-xs mt-1" />
            <div>
              <p className="text-gray-500 text-xs">College/University</p>
              <p className="text-white">{form.college || "—"}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FaBook className="text-cyan-400 text-xs mt-1" />
            <div>
              <p className="text-gray-500 text-xs">Course/Branch</p>
              <p className="text-white">{form.course || "—"}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FaCalendarAlt className="text-cyan-400 text-xs mt-1" />
            <div>
              <p className="text-gray-500 text-xs">Semester/Year</p>
              <p className="text-white">{form.semester || "—"}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FaIdCard className="text-cyan-400 text-xs mt-1" />
            <div>
              <p className="text-gray-500 text-xs">Roll Number</p>
              <p className="text-white">{form.roll || "—"}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FaPercentage className="text-cyan-400 text-xs mt-1" />
            <div>
              <p className="text-gray-500 text-xs">CGPA/Percentage</p>
              <p className="text-white">{form.cgpa || "—"}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* INTERNSHIP DETAILS */}
      <motion.div variants={sectionVariants} className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-5 pb-2 border-b border-cyan-500/20">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <FaLaptopCode className="text-white text-sm" />
          </div>
          <h3 className="text-lg font-semibold text-cyan-300">Internship Details</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <FaGraduationCap className="text-cyan-400 text-xs mt-1" />
            <div>
              <p className="text-gray-500 text-xs">Selected Branch</p>
              <p className="text-purple-400 font-medium">{branch?.name || "—"}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FaCode className="text-cyan-400 text-xs mt-1" />
            <div>
              <p className="text-gray-500 text-xs">Preferred Domain</p>
              <p className="text-white">{form.domain || "—"}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FaClock className="text-cyan-400 text-xs mt-1" />
            <div>
              <p className="text-gray-500 text-xs">Duration</p>
              <p className="text-white">{form.duration || "—"}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FaGlobe className="text-cyan-400 text-xs mt-1" />
            <div>
              <p className="text-gray-500 text-xs">Mode</p>
              <p className="text-white">{form.mode || "—"}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* SKILLS & EXPERIENCE */}
      <motion.div variants={sectionVariants} className="bg-white/5 rounded-2xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-5 pb-2 border-b border-cyan-500/20">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
            <FaTools className="text-white text-sm" />
          </div>
          <h3 className="text-lg font-semibold text-cyan-300">Skills & Experience</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <FaCode className="text-cyan-400 text-xs mt-1" />
            <div>
              <p className="text-gray-500 text-xs">Technical Skills</p>
              <p className="text-white">{form.skills || "—"}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <FaLaptopCode className="text-cyan-400 text-xs mt-1" />
            <div>
              <p className="text-gray-500 text-xs">Previous Experience</p>
              <p className="text-white">{form.experience || "—"}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* PRICE SUMMARY */}
      <motion.div variants={sectionVariants} className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-6 border border-cyan-400/30">
        <div className="text-center">
          <p className="text-gray-400 text-sm">Total Amount Payable</p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <FaRupeeSign className="text-green-400 text-2xl" />
            <p className="text-4xl font-bold text-green-400">
              ₹{branch?.price || 799}
            </p>
          </div>
          <p className="text-gray-500 text-xs mt-2">*Includes internship fee, certification, and project materials</p>
        </div>
      </motion.div>

      {/* BUTTONS */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setStep(2)}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300"
        >
          <FaArrowLeft size={14} />
          Edit Application
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={submitApplication}
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 px-10 py-3 rounded-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <FaSpinner className="animate-spin" size={16} />
              Processing...
            </>
          ) : (
            <>
              Proceed to Payment
              <FaArrowRight size={14} />
            </>
          )}
        </motion.button>
      </div>

      {/* NOTE */}
      <div className="text-center bg-yellow-500/5 rounded-xl p-3 border border-yellow-500/20">
        <p className="text-gray-500 text-xs">
          ⚠️ Please review all details carefully before proceeding to payment. Changes cannot be made after submission.
        </p>
      </div>
    </motion.div>
  );
}