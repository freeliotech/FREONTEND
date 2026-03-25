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
    <section className="relative py-20 px-4 bg-black text-white overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* TITLE */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
            Our Gallery
          </span>
        </h2>

        {/* LOADING */}
        {loading && (
          <div className="text-center text-cyan-400 animate-pulse">
            Loading Gallery...
          </div>
        )}

        {/* 🔥 AUTO SLIDER (RIGHT → LEFT) */}
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {[...gallery, ...gallery].map((img, i) => (
              <div
                key={i}
                onClick={() => setPreview(img.src)}
                className="min-w-[250px] sm:min-w-[280px] md:min-w-[300px] 
                group relative cursor-pointer rounded-xl overflow-hidden
                border border-white/10 bg-white/5 backdrop-blur
                hover:border-cyan-400
                hover:shadow-[0_0_25px_rgba(0,255,255,0.3)]
                transition duration-300"
              >

                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-52 object-cover transition duration-500 group-hover:scale-110"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <p className="text-cyan-400 font-semibold text-lg">
                    {img.title}
                  </p>
                </div>

              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* PREVIEW MODAL */}
      {preview && (
        <div
          onClick={() => setPreview(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        >
          <motion.img
            src={preview}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-h-[80vh] rounded-xl shadow-lg"
          />
        </div>
      )}

    </section>
  );
}