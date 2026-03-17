import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ApiContext } from "../../config/Api";
import { FaLaptopCode } from "react-icons/fa";

export default function StepBranches({ setBranch, setStep }) {

  const API_BASE_URL = ApiContext;
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios
      .get(`${API_BASE_URL}/internships`)
      .then(res => {
        setBranches(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-400 text-lg py-20">
        Loading internships...
      </div>
    );
  }

  if (!branches.length) {
    return (
      <div className="text-center text-gray-500 text-lg py-20">
        No internships available
      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-6">

      {/* Responsive Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {branches.map((b, i) => (

          <motion.div
            key={b._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -12, scale: 1.03 }}
            className="relative group cursor-pointer"
            onClick={() => {
              setBranch(b);
              setStep(1);
            }}
          >

            {/* Gradient Border */}

            <div className="p-[2px] rounded-3xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 group-hover:from-pink-500 group-hover:via-cyan-400 group-hover:to-purple-500 transition-all duration-500">

              <div className="bg-[#04070d] rounded-3xl overflow-hidden">

                {/* Badge */}

                <div className="absolute top-3 left-3 z-10">

                  <span className="flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-full shadow">

                    <FaLaptopCode size={12} />
                    Internship

                  </span>

                </div>

                {/* Image */}

                <div className="overflow-hidden">

                  <img
                    src={b.img}
                    alt={b.name}
                    className="h-48 w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                </div>

                {/* Content */}

                <div className="p-5 space-y-3">

                  <h3 className="text-lg text-cyan-300 font-semibold">
                    {b.name}
                  </h3>

                  <p className="text-gray-400 text-sm line-clamp-2">
                    {b.description}
                  </p>

                  {/* Price */}

                  <div className="flex justify-between items-center pt-2">

                    <span className="text-green-400 font-bold text-lg">
                      ₹{b.price || 799}
                    </span>

                    <motion.span
                      whileHover={{ x: 5 }}
                      className="text-cyan-400 font-semibold text-sm"
                    >
                      Continue →
                    </motion.span>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </div>

  );
}