import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ApiContext } from "../config/Api";

/* ===== Motion Variants ===== */

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6 },
  },
};

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
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

  }, []);

  return (
    <section className="relative py-28 px-6 bg-transparent overflow-hidden text-white font-Poppins">

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-transparent -to-b from-[#020617] via-[#050b16] to-black"></div>

      {/* GLOW */}

      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[180px]"
      />

      <motion.div
        animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-purple-500/20 blur-[200px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto text-center">

        {/* TITLE */}

        <motion.h2
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-16"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Our Gallery
          </span>
        </motion.h2>

        {/* LOADING */}

        {loading && (
          <div className="text-cyan-400 text-lg animate-pulse">
            Loading Gallery...
          </div>
        )}

        {/* GRID */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >

          {gallery.map((img, i) => (

            <motion.div
              key={i}
              variants={card}
              whileHover={{ scale: 1.05 }}
              onClick={() => setPreview(img.src)}
              className="group relative cursor-pointer rounded-xl overflow-hidden
              border border-white/10 bg-white/5 backdrop-blur
              hover:border-cyan-400
              hover:shadow-[0_0_35px_rgba(0,255,255,0.4)]
              transition duration-300"
            >

              <img
                src={img.src}
                alt={img.title}
                className="w-full h-56 object-cover transition duration-500 group-hover:scale-110"
              />

              {/* OVERLAY */}

              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">

                <p className="text-cyan-400 font-semibold text-lg">
                  {img.title}
                </p>

              </div>

            </motion.div>

          ))}

        </motion.div>

      </div>

      {/* IMAGE PREVIEW MODAL */}

      {preview && (

        <div
          onClick={() => setPreview(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
        >

          <motion.img
            src={preview}
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            className="max-h-[80vh] rounded-xl"
          />

        </div>

      )}

    </section>
  );
}