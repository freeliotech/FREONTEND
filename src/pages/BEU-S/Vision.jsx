import React from "react";
import { motion } from "framer-motion";
import { Zap, Target, Aperture, MessageSquare } from "lucide-react";

/* ===============================
   COMMON BACKGROUND COMPONENT
   =============================== */
const SectionBackground = () => (
  <>
    <div className="absolute inset-0 bg-[#020617]" />
    <div className="absolute -top-32 -left-32 w-96 h-96 " />
    <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] " />
  </>
);

/* ===============================
   MISSION SECTION
   =============================== */
const MissionSection = () => {
  return (
    <section className="relative py-28 px-6 overflow-hidden text-gray-200">
      <SectionBackground />

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-extrabold">
            <span className="text-sky-400">Our Mission</span>
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed">
            At <span className="text-sky-400 font-semibold">FreeLioTech</span>, we empower
            students with world-class resources, mentorship, and
            industry-focused learning experiences.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: MessageSquare, title: "Live Courses", desc: "Learn with experts." },
              { icon: Aperture, title: "Premium Notes", desc: "Clear & structured." },
              { icon: Zap, title: "Industry Connect", desc: "Real exposure." },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl bg-white/5 backdrop-blur-xl
                           border border-white/10
                           hover:border-sky-400/40 transition"
              >
                <f.icon className="w-7 h-7 text-sky-400 mb-2" />
                <h4 className="text-white font-semibold text-sm">{f.title}</h4>
                <p className="text-gray-400 text-xs mt-1">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src="https://nsinnventive.com/wp-content/uploads/2024/09/AI-and-Web-Development.webp"
            alt="Mission"
            className="rounded-3xl border border-white/10 shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

/* ===============================
   VISION SECTION
   =============================== */
const VisionSection = () => {
  return (
    <section className="relative py-28 px-6 overflow-hidden text-gray-200">
      <SectionBackground />

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <img
            src="https://miro.medium.com/v2/resize:fit:1358/1*fZsOOTFSFpBcc9DEApeLow.png"
            alt="Vision"
            className="rounded-3xl border border-white/10 shadow-lg"
          />
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-extrabold">
            <span className="text-sky-400">Our Vision</span>
          </h2>

          <p className="text-lg text-gray-300 leading-relaxed">
            We envision a future where every learner has access to
            cutting-edge technology, real mentorship, and global opportunities.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Future Skills", desc: "Industry-ready learning." },
              { icon: Zap, title: "Internships", desc: "Practical exposure." },
              { icon: Aperture, title: "24×7 Mentorship", desc: "Career guidance." },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-4 rounded-xl bg-white/5 backdrop-blur-xl
                           border border-white/10
                           hover:border-cyan-400/40 transition"
              >
                <f.icon className="w-7 h-7 text-cyan-400 mb-2" />
                <h4 className="text-white font-semibold text-sm">{f.title}</h4>
                <p className="text-gray-400 text-xs mt-1">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ===============================
   EXPORT
   =============================== */
export default function MissionVision() {
  return (
    <div className="bg-[#020617] font-inter">
      <MissionSection />
      <VisionSection />
    </div>
  );
}
