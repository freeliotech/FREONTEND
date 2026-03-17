import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const API = "https://backend-production-7a212.up.railway.app/api";

export default function ApplyInternship() {

  const navigate = useNavigate();
  const { state } = useLocation();

  const selectedBranch = state?.branch || "";

  const [loading,setLoading] = useState(false);

  const [form,setForm] = useState({

    name:"",
    fatherName:"",
    motherName:"",
    college:"",
    cgpa:"",
    email:"",
    mobile:"",
    branch:selectedBranch,
    semester:""

  });

  const handleChange = (e)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    });

  };

  const submitForm = async (e)=>{

    e.preventDefault();

    try{

      setLoading(true);

      const res = await axios.post(
        `${API}/internship/apply`,
        form
      );

      const applicationId = res.data.data._id;

      /* Redirect to payment with ID */

      navigate("/payment",{
        state:{applicationId}
      });

    }catch(err){

      console.log(err);

      alert("Application submit failed");

    }finally{

      setLoading(false);

    }

  };

  return (

    <section className="min-h-screen bg-[#030712] text-white flex justify-center items-center px-4 py-20">

      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-500 blur-[200px] opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-600 blur-[230px] opacity-20"></div>

      <motion.div
        initial={{opacity:0,scale:0.9,y:30}}
        animate={{opacity:1,scale:1,y:0}}
        transition={{duration:0.7}}
        className="relative w-full max-w-2xl bg-gray-900/60 border border-cyan-400/30 
        shadow-[0_0_25px_rgba(0,255,255,0.3)] backdrop-blur-xl rounded-2xl p-10 z-10"
      >

        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 
        text-transparent bg-clip-text mb-8">

          Internship Application Form

        </h2>

        <form onSubmit={submitForm} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {[
            {label:"Full Name",name:"name"},
            {label:"Father Name",name:"fatherName"},
            {label:"Mother Name",name:"motherName"},
            {label:"College Name",name:"college"},
            {label:"Email Address",name:"email"},
            {label:"Mobile Number",name:"mobile"},
            {label:"Current CGPA/SGPA",name:"cgpa"},
            {label:"Semester",name:"semester"}
          ].map((field,i)=>(
            
            <div key={i} className="relative">

              <input
                name={field.name}
                required
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg 
                text-white focus:border-cyan-400 outline-none"
              />

              <label className="absolute left-3 top-3 text-gray-400 text-sm">

                {field.label}

              </label>

            </div>

          ))}

          {/* Branch */}

          <div>

            <input
              value={form.branch}
              disabled
              className="w-full p-3 bg-gray-700 border border-cyan-500 rounded-lg"
            />

            <p className="text-xs text-cyan-400 mt-1">

              Selected Branch

            </p>

          </div>

          {/* Submit */}

          <button
            disabled={loading}
            className="md:col-span-2 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 
            text-black font-bold rounded-lg"
          >

            {loading ? "Submitting..." : "Proceed to Payment 🚀"}

          </button>

        </form>

      </motion.div>

    </section>

  );

}