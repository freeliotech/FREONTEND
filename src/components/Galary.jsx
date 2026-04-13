import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ApiContext } from "../config/Api";

export default function MiniGallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    axios
      .get(`${ApiContext}/gallery`)
      .then((res) => {
        setGallery(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="relative py-20 px-4 bg-transparent text-white overflow-hidden">

      {/* 🌈 BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-500/10 blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/10 blur-[120px] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* 🔥 TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-center mb-14"
        >
          <span className="bg-gradient-to-r from-pink-500 via-blue-500 to-green-400 bg-clip-text text-transparent">
            Our Gallery
          </span>
        </motion.h2>

        {/* LOADING */}
        {loading && (
          <div className="text-center text-blue-400 animate-pulse">
            Loading Gallery...
          </div>
        )}

        {/* 🚀 ULTRA SMOOTH SLIDER */}
        <div className="overflow-hidden relative">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }} // smoother loop
            transition={{
              ease: "linear",
              duration: 30, // slower = smoother
              repeat: Infinity,
            }}
          >
            {[...gallery, ...gallery].map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.08, y: -5 }}
                onClick={() => setPreview(img.src)}
                className="min-w-[250px] sm:min-w-[280px] md:min-w-[300px] 
                group relative cursor-pointer rounded-2xl overflow-hidden
                
                bg-white/5 backdrop-blur-xl
                border border-white/10
                
                hover:border-transparent
                hover:shadow-[0_10px_40px_rgba(0,0,0,0.6)]
                
                transition duration-500"
              >

                {/* IMAGE */}
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-52 object-cover transition duration-700 group-hover:scale-110"
                />

                {/* 🌈 GRADIENT OVERLAY */}
                <div className="absolute inset-0 
                  bg-gradient-to-t from-black/80 via-transparent to-transparent
                  opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* TEXT */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition duration-500">
                  <p className="text-white font-semibold text-lg">
                    {img.title}
                  </p>
                </div>

              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* 🔥 PREVIEW MODAL */}
      {preview && (
        <div
          onClick={() => setPreview(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[9999]"
        >
          <motion.img
            src={preview}
            initial={{ scale: 0.6, opacity: 0, rotate: -5 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ duration: 0.4 }}
            className="max-h-[80vh] rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)]"
          />
        </div>
      )}
    </section>
  );
}