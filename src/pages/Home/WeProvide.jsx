import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function WeProvideDark() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-transparent py-24 px-6 overflow-hidden font-Poppins text-white">

      {/* HEADING */}
      <div className="relative z-10 text-center mb-16">
        <h4 className="text-3xl md:text-3xl font-extrabold bg-gradient-to-r from-cyan-300 to-blue-500 bg-clip-text text-transparent">
          WE PROVIDE
        </h4>

        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full"/>
      </div>


      {/* CARDS */}

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">

        <DarkCard
          img="https://static.vecteezy.com/system/resources/thumbnails/056/409/761/small/mobile-app-ui-design-icons-graphics-and-user-interface-free-png.png"
          title="Mobile Applications"
          desc="Elevate your business with custom Android applications designed for performance, scalability, and modern user experience."
          onClick={() => navigate("/services/app")}
        />

        <DarkCard
          img="https://virtunexa.com/wp-content/uploads/2024/02/35.png"
          title="Internships"
          desc="Industry-focused internships with real projects, expert mentorship, and skill-building for future-ready careers."
          onClick={() => navigate("/internship")}
        />

        <DarkCard
          img="https://virtunexa.com/wp-content/uploads/2024/02/25.png"
          title="Website Development"
          desc="High-quality websites tailored to your brand, delivering speed, security, and stunning user interfaces."
          onClick={() => navigate("/services/web")}
        />

      </div>

    </section>
  );
}


/* ---------------- CARD ---------------- */
function DarkCard({ img, title, desc, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div
        className="
        border border-gray-700
        rounded-2xl
        p-6
        text-center
        bg-[#0a0a0a]
        transition-all duration-300
        hover:border-purple-500
        hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]
      "
      >
        {/* IMAGE */}
        <motion.img
          src={img}
          alt={title}
          whileHover={{ scale: 1.05 }}
          className="h-36 mx-auto mb-5 object-contain"
        />

        {/* TITLE */}
        <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-purple-400 transition">
          {title}
        </h3>

        {/* DESC */}
        <p className="text-gray-400 text-sm mb-6">
          {desc}
        </p>

        {/* BUTTON */}
        <div
          className="
          w-10 h-10 mx-auto flex items-center justify-center
          rounded-full
          border border-gray-600
          text-gray-300
          transition-all duration-300
          group-hover:border-purple-500
          group-hover:text-purple-400
        "
        >
          <FaArrowRight />
        </div>
      </div>
    </motion.div>
  );
}
