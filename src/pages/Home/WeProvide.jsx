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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -12 }}
      transition={{ duration: 0.5 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >

      {/* GRADIENT BORDER */}

      <div className="p-[2px] rounded-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">

        <div className="
          bg-black
          backdrop-blur-xl
          rounded-3xl
          p-8
          text-center
          h-full
          transition
          group-hover:bg-[#0d1524]/90
        ">

          {/* IMAGE */}

          <motion.img
            src={img}
            alt={title}
            whileHover={{ scale: 1.05 }}
            className="h-44 mx-auto mb-6"
          />

          {/* TITLE */}

          <h3 className="text-2xl font-bold text-cyan-300 mb-4">
            {title}
          </h3>

          {/* DESCRIPTION */}

          <p className="text-gray-400 text-sm leading-relaxed mb-8">
            {desc}
          </p>

          {/* BUTTON */}

          <motion.button
            whileHover={{ scale: 1.15 }}
            className="
            w-12 h-12 mx-auto flex items-center justify-center
            rounded-full
            bg-gradient-to-r from-cyan-400 to-blue-500
            text-black
            shadow-[0_0_20px_rgba(0,255,255,0.6)]
            transition
            "
          >
            <FaArrowRight />
          </motion.button>

        </div>

      </div>

    </motion.div>

  );
}