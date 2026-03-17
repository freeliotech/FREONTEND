import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  FaWpforms,
  FaUserCheck,
  FaClipboardCheck,
  FaUserTie,
  FaLaptopCode,
  FaProjectDiagram,
  FaTimes,
} from "react-icons/fa";

export default function InternshipDetailsSection() {
  const [openCert, setOpenCert] = useState(false);

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-[#04070d] text-white px-6 py-24 relative font-sans">
      {/* LIVE STATS */}

      <div className="max-w-6xl mx-auto mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            ["10,000+", "Students Trained"],
            ["100+", "Industry Projects"],
            ["50+", "Expert Mentors"],
            ["100%", "Verified Certificate"],
          ].map(([num, label], i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.07 }}
              className="
              bg-[#0b1425]/80 backdrop-blur-xl
              border border-cyan-400/20
              rounded-xl p-6 text-center
              shadow-[0_0_20px_rgba(0,255,255,0.08)]
              hover:shadow-[0_0_40px_rgba(0,255,255,0.25)]
              transition
              "
            >
              <p className="text-3xl font-bold text-cyan-400">{num}</p>

              <p className="text-gray-400 text-sm mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PROCESS */}

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-24"
      >
        <h3 className="text-3xl font-semibold tracking-tight mb-8 text-white">
          Internship Process
        </h3>

        <div className="space-y-4">
          {[
            ["Apply Online", "Submit application & resume", <FaWpforms />],
            [
              "Eligibility Check",
              "College enrollment verification",
              <FaUserCheck />,
            ],
            ["Selection", "Screening / interview", <FaClipboardCheck />],
            ["Onboarding", "Mentor assigned & LMS access", <FaUserTie />],
          ].map(([title, desc, icon], i) => (
            <motion.div
              key={i}
              variants={item}
              className="
              grid grid-cols-12 gap-4 items-center
              bg-[#0b1425]/70 backdrop-blur-md
              border border-cyan-400/20
              rounded-xl p-5
              hover:border-cyan-400/40
              hover:shadow-[0_0_25px_rgba(0,255,255,0.15)]
              transition
              "
            >
              <div className="col-span-1 text-cyan-400 text-2xl">{icon}</div>

              <div className="col-span-11">
                <p className="font-semibold text-white">{title}</p>

                <p className="text-gray-400 text-sm">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* PROJECTS */}

      <div className="max-w-6xl mx-auto mb-24">
        <h3 className="text-3xl font-semibold tracking-tight mb-8">
          Projects & Learning
        </h3>

        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="
            bg-[#0b1425]/80 backdrop-blur-xl
            border border-cyan-400/20
            rounded-xl p-6
            hover:border-cyan-400/40
            hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]
            transition
            "
          >
            <FaProjectDiagram className="text-3xl text-cyan-400 mb-3" />

            <p className="font-semibold mb-1">4 Real-World Projects</p>

            <p className="text-gray-400 text-sm">
              Industry-based hands-on projects.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="
            bg-[#0b1425]/80 backdrop-blur-xl
            border border-cyan-400/20
            rounded-xl p-6
            hover:border-cyan-400/40
            hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]
            transition
            "
          >
            <FaLaptopCode className="text-3xl text-cyan-400 mb-3" />

            <p className="font-semibold mb-1">Student LMS Portal</p>

            <p className="text-gray-400 text-sm">
              Learning, submission & certificate access.
            </p>
          </motion.div>
        </div>
      </div>

      {/* CTA */}

      <div className="max-w-6xl mx-auto mb-20">
        <div
          className="
        bg-gradient-to-r from-cyan-500/10 to-blue-500/10
        border border-cyan-400/30 rounded-2xl p-8 text-center
        "
        >
          <h4
            className="
          text-3xl font-bold
          bg-gradient-to-r from-cyan-400 to-blue-500
          text-transparent bg-clip-text mb-4
          "
          >
            Ready to Start Your Career?
          </h4>

          <p className="text-gray-400 text-sm mb-6">
            Certificate · Live Projects · Mentors
          </p>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpenCert(true)}
            className="
            px-10 py-4 rounded-xl
            font-semibold tracking-wide
            text-black
            bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500
            shadow-[0_0_40px_rgba(0,255,255,0.6)]
            hover:shadow-[0_0_60px_rgba(0,255,255,0.9)]
            transition
            "
          >
            View Internship Certificate
          </motion.button>
        </div>
      </div>

      {/* CERTIFICATE MODAL */}

      <AnimatePresence>
        {openCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
            fixed inset-0 bg-black/70 backdrop-blur-md
            flex items-center justify-center z-[999]
            "
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="
              bg-[#0b1425] p-6 rounded-2xl
              max-w-4xl w-full relative
              shadow-[0_0_60px_rgba(0,255,255,0.35)]
              "
            >
              <button
                onClick={() => setOpenCert(false)}
                className="absolute top-4 right-4 text-cyan-400 text-xl"
              >
                <FaTimes />
              </button>

              <h3 className="text-xl font-bold text-center mb-6 text-cyan-400">
                Certificate Preview
              </h3>

              <img
                src="https://marketplace.canva.com/EAE7srfpYAo/1/0/1600w/canva-brown-decorative-certificate-of-completion-YAwShCEKfVg.jpg"
                className="mx-auto rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* TRUSTED PARTNERS */}

   

    </section>
  );
}
