import React from "react";
import { FaUser, FaUniversity, FaLaptopCode, FaTools } from "react-icons/fa";

const inputStyle =
  "w-full px-4 py-3 rounded-xl bg-[#0b1425] border border-white/10 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none";

export default function StepForm({ branch, form, setForm, setStep }) {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStep(3);
      }}
      className="max-w-6xl mx-auto bg-[#0b1425]/80 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-10 space-y-10 shadow-[0_0_40px_rgba(0,255,255,0.1)]"
    >
      {/* TITLE */}

      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
        Internship Application Form
      </h2>

      {/* PERSONAL INFO */}

      <div>
        <h3 className="flex items-center gap-2 text-lg text-cyan-300 mb-4">
          <FaUser /> Personal Information
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            name="name"
            placeholder="Full Name"
            className={inputStyle}
            required
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email Address"
            className={inputStyle}
            required
            onChange={handleChange}
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            className={inputStyle}
            required
            onChange={handleChange}
          />

          <select name="gender" className={inputStyle} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>

          <textarea
            name="address"
            rows="2"
            placeholder="Address"
            className={inputStyle}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* ACADEMIC DETAILS */}

      <div>
        <h3 className="flex items-center gap-2 text-lg text-cyan-300 mb-4">
          <FaUniversity /> Academic Details
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            name="college"
            placeholder="College / University"
            className={inputStyle}
            required
            onChange={handleChange}
          />

          <input
            name="course"
            placeholder="Course / Branch"
            className={inputStyle}
            required
            onChange={handleChange}
          />

          <input
            name="semester"
            placeholder="Semester / Year"
            className={inputStyle}
            onChange={handleChange}
          />

          <input
            name="roll"
            placeholder="Enrollment / Roll Number"
            className={inputStyle}
            onChange={handleChange}
          />

          <input
            name="cgpa"
            placeholder="CGPA / Percentage"
            className={inputStyle}
            onChange={handleChange}
          />

          <input
            name="branch"
            value={branch?.name}
            disabled
            className="w-full px-4 py-3 bg-gray-700 rounded-xl text-gray-300"
          />
        </div>
      </div>

      {/* INTERNSHIP DETAILS */}

      <div>
        <h3 className="flex items-center gap-2 text-lg text-cyan-300 mb-4">
          <FaLaptopCode /> Internship Preferences
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            name="domain"
            placeholder="Preferred Domain (Web Dev / AI)"
            className={inputStyle}
            required
            onChange={handleChange}
          />

          <select
            name="duration"
            className={inputStyle}
            required
            onChange={handleChange}
          >
            <option value="">Select Duration</option>
            <option>1 Month</option>
            <option>3 Months</option>
            <option>6 Months</option>
          </select>

          <select
            name="mode"
            className={inputStyle}
            required
            onChange={handleChange}
          >
            <option value="">Mode Preference</option>
            <option>Online</option>
            <option>Offline</option>
            <option>Hybrid</option>
          </select>
        </div>
      </div>

      {/* SKILLS */}

      <div>
        <h3 className="flex items-center gap-2 text-lg text-cyan-300 mb-4">
          <FaTools /> Skills & Experience
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <textarea
            name="skills"
            rows="3"
            placeholder="Technical Skills (React, Python, Excel)"
            className={inputStyle}
            onChange={handleChange}
          />

          <textarea
            name="experience"
            rows="3"
            placeholder="Previous Internship / Projects"
            className={inputStyle}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* BUTTONS */}

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition"
        >
          Back
        </button>

        <button
          type="submit"
          className="px-10 py-3 rounded-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-black hover:scale-105 transition"
        >
          Review & Pay →
        </button>
      </div>
    </form>
  );
}
