import React from "react";
import axios from "axios";
import { ApiContext } from "../../config/Api";
import { FaUser, FaUniversity, FaLaptopCode, FaTools } from "react-icons/fa";

export default function StepSummary({ branch, form, setStep, setApplicationId }) {

  const submitApplication = async () => {

    try {

      const res = await axios.post(
        `${ApiContext}/internship/apply`,
        {
          ...form,
          branch: branch?.name
        }
      );

      /* Save application id for payment */
      setApplicationId(res.data.data._id);

      /* Go to payment step */
      setStep(4);

    } catch (err) {

      console.log("Error submitting application", err);
      alert("Application submit failed");

    }

  };

  return (

    <div className="max-w-5xl mx-auto bg-[#0b1425]/90 backdrop-blur-xl border border-cyan-400/20 rounded-3xl p-10 space-y-10 shadow-[0_0_40px_rgba(0,255,255,0.1)]">

      {/* TITLE */}

      <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
        Application Summary
      </h2>

      {/* PERSONAL INFO */}

      <div>
        <h3 className="flex items-center gap-2 text-cyan-300 mb-4 text-lg">
          <FaUser /> Personal Information
        </h3>

        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <p><b>Name:</b> {form.name}</p>
          <p><b>Email:</b> {form.email}</p>
          <p><b>Mobile:</b> {form.mobile}</p>
          <p><b>Gender:</b> {form.gender}</p>
          <p className="md:col-span-2"><b>Address:</b> {form.address}</p>
        </div>
      </div>

      {/* ACADEMIC */}

      <div>
        <h3 className="flex items-center gap-2 text-cyan-300 mb-4 text-lg">
          <FaUniversity /> Academic Information
        </h3>

        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <p><b>College:</b> {form.college}</p>
          <p><b>Course:</b> {form.course}</p>
          <p><b>Semester:</b> {form.semester}</p>
          <p><b>Roll No:</b> {form.roll}</p>
          <p><b>CGPA:</b> {form.cgpa}</p>
        </div>
      </div>

      {/* INTERNSHIP */}

      <div>
        <h3 className="flex items-center gap-2 text-cyan-300 mb-4 text-lg">
          <FaLaptopCode /> Internship Details
        </h3>

        <div className="grid md:grid-cols-2 gap-4 text-gray-300">
          <p><b>Branch:</b> {branch?.name}</p>
          <p><b>Domain:</b> {form.domain}</p>
          <p><b>Duration:</b> {form.duration}</p>
          <p><b>Mode:</b> {form.mode}</p>
        </div>
      </div>

      {/* SKILLS */}

      <div>
        <h3 className="flex items-center gap-2 text-cyan-300 mb-4 text-lg">
          <FaTools /> Skills & Experience
        </h3>

        <div className="space-y-3 text-gray-300">
          <p><b>Skills:</b> {form.skills}</p>
          <p><b>Experience:</b> {form.experience}</p>
        </div>
      </div>

      {/* PRICE */}

      <div className="border-t border-white/10 pt-6 text-center">
        <p className="text-lg text-gray-300">
          Internship Program
        </p>

        <p className="text-3xl font-bold text-green-400 mt-2">
          ₹{branch?.price || 799}
        </p>
      </div>

      {/* BUTTONS */}

      <div className="flex justify-between pt-6">

        <button
          onClick={() => setStep(2)}
          className="px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition"
        >
          Edit Form
        </button>

        <button
          onClick={submitApplication}
          className="px-10 py-3 rounded-xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-black hover:scale-105 transition"
        >
          Pay & Enroll
        </button>

      </div>

    </div>

  );

}