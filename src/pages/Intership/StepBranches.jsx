import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ApiContext } from "../../config/Api";
import { FaLaptopCode } from "react-icons/fa";
import img from "../../assets/logo.png"
export default function StepBranches({ setBranch, setStep }) {
  const API_BASE_URL = ApiContext;
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/internships`)
      .then((res) => {
        setBranches(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-400 py-20">
        Loading internships...
      </div>
    );
  }

  if (!branches.length) {
    return (
      <div className="text-center text-gray-500 py-20">
        No internships available
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {branches.map((b, i) => (
<motion.div
  key={b._id}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: i * 0.08 }}
  whileHover={{ y: -8, scale: 1.02 }}
  className="
     bg-[#101727] border border-white/50
    rounded-xl overflow-hidden
    hover:border-purple-500
    hover:shadow-[0_0_20px_rgba(168,85,247,0.25)]
    transition-all duration-300
    cursor-pointer h-[330px] flex flex-col
    group
  "
  onClick={() => {
    setBranch(b);
    setStep(1);
  }}
>

  {/* IMAGE (60%) */}
  <div className="h-[60%] overflow-hidden relative">

    <img
      src={b.img}
      alt={b.name}
      className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
    />

    {/* DARK OVERLAY */}
    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />

  </div>

  {/* CONTENT (40%) */}
  <div className="h-[40%] p-4 flex flex-col justify-between">

    {/* TEXT */}
    <div>
      <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-purple-400 transition">
        {b.name}
      </h3>

      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 group-hover:text-gray-300 transition">
        {b.description}
      </p>
    </div>

    {/* BOTTOM */}
    <div className="flex items-center justify-between mt-3">

      {/* PRICE + ICON */}
    <div className="flex items-center gap-2 bg-[#1a1a1a] px-2 py-1 rounded-md">

  <img
    src={img}
    alt="icon"
    className="w-4 h-4 object-contain"
  />

  {/* Prices */}
  <div className="flex items-center gap-2">
    {/* Discounted Price (50% OFF) */}
    <span className="text-green-400 font-semibold text-sm">
      ₹{(b.price || 799) / 2}
    </span>

    {/* Original Price */}
    <span className="text-gray-400 text-xs line-through">
      ₹{b.price || 799}
    </span>

    {/* Discount Badge */}
    <span className="text-red-400 text-xs font-semibold">
      50% OFF
    </span>
  </div>

</div>

      {/* BUTTON */}
      <button className="
        text-xs px-3 py-1 rounded-md
        bg-purple-600 hover:bg-purple-700
        hover:shadow-[0_0_10px_rgba(168,85,247,0.6)]
        transition-all duration-300
      ">
          →
      </button>

    </div>
  </div>

</motion.div>
        ))}

      </div>

    </div>
  );
}