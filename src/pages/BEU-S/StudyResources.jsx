import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function StudyResources() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">

      {/* BACKGROUND (same slide feel) */}
      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 " />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] " />

      <div className="relative z-10">

        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl sm:text-4xl font-bold text-white">
            <span className="text-sky-400">Study</span> Resources
          </h2>
          <p className="mt-4 text-gray-300 text-base sm:text-lg">
            Premium learning materials crafted to accelerate your success.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          {/* CARD 1 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="
              bg-white/5 backdrop-blur-xl
              border border-white/10
              rounded-2xl p-8
              hover:border-sky-400/40
              hover:shadow-[0_0_40px_rgba(56,189,248,0.25)]
              transition
            "
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Reference Books
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              Expert-selected books that simplify complex topics
              and strengthen conceptual clarity.
            </p>

            <img
              src="https://png.pngtree.com/png-vector/20250513/ourmid/pngtree-colorful-books-pens-and-ruler-back-to-school-stationery-png-image_16265965.png"
              alt="Reference Books"
              className="w-56 mx-auto mb-6"
            />

            <button
              className="
                block mx-auto px-6 py-2 text-sm font-medium
                rounded-full
                bg-sky-500 text-black
                hover:bg-sky-400
                shadow-[0_0_20px_rgba(56,189,248,0.6)]
                transition
              "
            >
              Explore
            </button>
          </motion.div>

          {/* CARD 2 (Highlight card like hero slide) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="
              relative
              bg-gradient-to-br from-sky-500/10 to-cyan-500/10
              backdrop-blur-xl
              border border-sky-400/30
              rounded-2xl p-8
              shadow-[0_0_50px_rgba(56,189,248,0.25)]
            "
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              VIDEO Solutions
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed mb-10">
              Step-by-step VIDEO solutions designed to build
              exam-ready confidence.
            </p>

            <span className="absolute top-6 right-6 text-sky-400 text-2xl">
              →
            </span>

            <img
              src="https://png.pngtree.com/png-vector/20230930/ourmid/pngtree-school-materials-clip-art-cartoon-open-book-png-png-image_10147973.png"
              alt="NCERT Solutions"
              className="w-56 mx-auto"
            />
          </motion.div>

          {/* CARD 3 */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="
              bg-white/5 backdrop-blur-xl
              border border-white/10
              rounded-2xl p-8
              hover:border-cyan-400/40
              hover:shadow-[0_0_40px_rgba(34,211,238,0.25)]
              transition
            "
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Notes
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed mb-10">
              Clean, concise notes for fast revision
              and long-term retention.
            </p>

            <img
              src="https://png.pngtree.com/png-vector/20240204/ourmid/pngtree-study-online-via-laptop-png-image_11611978.png"
              alt="Notes"
              className="w-60 mx-auto"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
