import React from "react";
import { motion } from "framer-motion";
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
  FaCheckCircle
} from "react-icons/fa";

const inputStyle =
  "w-full px-4 py-3 rounded-xl bg-[#0b1425] border border-white/10 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition-all duration-300";

const labelStyle = "flex items-center gap-2 text-sm font-medium text-gray-300 mb-2";

export default function StepForm({ branch, form, setForm, setStep }) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.2 } }
  };

  return (
    <motion.form
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      onSubmit={(e) => {
        e.preventDefault();
        setStep(3);
      }}
      className="max-w-6xl mx-auto bg-[#0b1425]/80 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-8 md:p-10 space-y-8 shadow-[0_0_40px_rgba(0,255,255,0.1)]"
    >
      {/* TITLE */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-full mb-4">
          <FaCheckCircle className="text-cyan-400 text-sm" />
          <span className="text-cyan-400 text-xs font-medium">STEP 2 OF 3</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
          Internship Application Form
        </h2>
        <p className="text-gray-500 text-sm mt-2">Please fill all the required details carefully</p>
      </motion.div>

      {/* PERSONAL INFO */}
      <motion.div variants={sectionVariants}>
        <div className="flex items-center gap-3 mb-5 pb-2 border-b border-cyan-500/20">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
            <FaUser className="text-white text-sm" />
          </div>
          <h3 className="text-xl font-semibold text-cyan-300">Personal Information</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelStyle}>
              <FaUser className="text-cyan-400 text-xs" />
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              name="name"
              placeholder="Enter your full name"
              className={inputStyle}
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={labelStyle}>
              <FaEnvelope className="text-cyan-400 text-xs" />
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="your@email.com"
              className={inputStyle}
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={labelStyle}>
              <FaPhone className="text-cyan-400 text-xs" />
              Mobile Number <span className="text-red-400">*</span>
            </label>
            <input
              name="mobile"
              placeholder="+91 XXXXXXXXXX"
              className={inputStyle}
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={labelStyle}>
              <FaVenusMars className="text-cyan-400 text-xs" />
              Gender
            </label>
            <select name="gender" className={inputStyle} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelStyle}>
              <FaMapMarkerAlt className="text-cyan-400 text-xs" />
              Address
            </label>
            <textarea
              name="address"
              rows="2"
              placeholder="Your complete address"
              className={inputStyle}
              onChange={handleChange}
            />
          </div>
        </div>
      </motion.div>

      {/* ACADEMIC DETAILS */}
      <motion.div variants={sectionVariants}>
        <div className="flex items-center gap-3 mb-5 pb-2 border-b border-cyan-500/20">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <FaUniversity className="text-white text-sm" />
          </div>
          <h3 className="text-xl font-semibold text-cyan-300">Academic Details</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className={labelStyle}>
              <FaUniversity className="text-cyan-400 text-xs" />
              College / University <span className="text-red-400">*</span>
            </label>
            <input
              name="college"
              placeholder="Name of your college/university"
              className={inputStyle}
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={labelStyle}>
              <FaBook className="text-cyan-400 text-xs" />
              Course / Branch <span className="text-red-400">*</span>
            </label>
            <input
              name="course"
              placeholder="B.Tech / BCA / MCA"
              className={inputStyle}
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={labelStyle}>
              <FaCalendarAlt className="text-cyan-400 text-xs" />
              Semester / Year
            </label>
            <input
              name="semester"
              placeholder="3rd Semester / 2nd Year"
              className={inputStyle}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={labelStyle}>
              <FaIdCard className="text-cyan-400 text-xs" />
              Enrollment / Roll Number
            </label>
            <input
              name="roll"
              placeholder="Your roll number"
              className={inputStyle}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={labelStyle}>
              <FaPercentage className="text-cyan-400 text-xs" />
              CGPA / Percentage
            </label>
            <input
              name="cgpa"
              placeholder="8.5 CGPA / 85%"
              className={inputStyle}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={labelStyle}>
              <FaGraduationCap className="text-cyan-400 text-xs" />
              Selected Branch
            </label>
            <input
              name="branch"
              value={branch?.name || "Not selected"}
              disabled
              className="w-full px-4 py-3 bg-gray-800/50 rounded-xl text-gray-400 border border-gray-700 cursor-not-allowed"
            />
          </div>
        </div>
      </motion.div>

      {/* INTERNSHIP DETAILS */}
      <motion.div variants={sectionVariants}>
        <div className="flex items-center gap-3 mb-5 pb-2 border-b border-cyan-500/20">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <FaLaptopCode className="text-white text-sm" />
          </div>
          <h3 className="text-xl font-semibold text-cyan-300">Internship Preferences</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelStyle}>
              <FaCode className="text-cyan-400 text-xs" />
              Preferred Domain <span className="text-red-400">*</span>
            </label>
            <input
              name="domain"
              placeholder="Web Development / AI/ML / App Development"
              className={inputStyle}
              required
              onChange={handleChange}
            />
          </div>

          <div>
            <label className={labelStyle}>
              <FaClock className="text-cyan-400 text-xs" />
              Duration <span className="text-red-400">*</span>
            </label>
            <select name="duration" className={inputStyle} required onChange={handleChange}>
              <option value="">Select Duration</option>
              <option>1 Month</option>
              <option>2 Months</option>
              <option>3 Months</option>
              <option>6 Months</option>
            </select>
          </div>

          <div>
            <label className={labelStyle}>
              <FaGlobe className="text-cyan-400 text-xs" />
              Mode Preference <span className="text-red-400">*</span>
            </label>
            <select name="mode" className={inputStyle} required onChange={handleChange}>
              <option value="">Select Mode</option>
              <option>Online</option>
              <option>Offline</option>
              <option>Hybrid</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* SKILLS & EXPERIENCE */}
      <motion.div variants={sectionVariants}>
        <div className="flex items-center gap-3 mb-5 pb-2 border-b border-cyan-500/20">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center">
            <FaTools className="text-white text-sm" />
          </div>
          <h3 className="text-xl font-semibold text-cyan-300">Skills & Experience</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={labelStyle}>
              <FaCode className="text-cyan-400 text-xs" />
              Technical Skills
            </label>
            <textarea
              name="skills"
              rows="4"
              placeholder="List your technical skills (e.g., React, Python, Java, SQL, etc.)"
              className={inputStyle}
              onChange={handleChange}
            />
            <p className="text-gray-500 text-xs mt-1">Separate skills with commas</p>
          </div>

          <div>
            <label className={labelStyle}>
              <FaLaptopCode className="text-cyan-400 text-xs" />
              Previous Experience / Projects
            </label>
            <textarea
              name="experience"
              rows="4"
              placeholder="Mention any internships, projects, or relevant experience"
              className={inputStyle}
              onChange={handleChange}
            />
            <p className="text-gray-500 text-xs mt-1">Include links if available</p>
          </div>
        </div>
      </motion.div>

      {/* BUTTONS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-between pt-6 gap-4"
      >
        <button
          type="button"
          onClick={() => setStep(1)}
          className="px-8 py-3 rounded-xl font-semibold bg-gray-800 hover:bg-gray-700 text-white transition-all duration-300 hover:scale-105"
        >
          ← Back
        </button>

        <button
          type="submit"
          className="px-10 py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 flex items-center gap-2 group"
        >
          Review & Pay
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </motion.div>

      {/* Progress Indicator */}
      <div className="pt-4">
        <div className="flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          <div className="w-8 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
        </div>
        <p className="text-center text-gray-600 text-xs mt-3">Step 2 of 3 - Application Details</p>
      </div>
    </motion.form>
  );
}