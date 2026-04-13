import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function WeProvideDark() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-transparent py-24 px-6 overflow-hidden font-Poppins text-white">

      {/* 🌈 BACKGROUND GLOW */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/20 blur-[150px]" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 blur-[180px]" />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/10 blur-[120px] -translate-x-1/2 -translate-y-1/2" />

      {/* HEADING */}
      <div className="relative z-10 text-center mb-16">
        <h4 className="text-3xl md:text-4xl font-extrabold 
          bg-gradient-to-r from-pink-500 via-blue-500 to-green-400 
          bg-clip-text text-transparent tracking-wide">
          WE PROVIDE
        </h4>

        <div className="w-24 h-[3px] bg-gradient-to-r 
          from-pink-500 via-blue-500 to-green-400 
          mx-auto mt-4 rounded-full"/>
      </div>

      {/* CARDS */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        <DarkCard
          img="https://static.vecteezy.com/system/resources/thumbnails/056/409/761/small/mobile-app-ui-design-icons-graphics-and-user-interface-free-png.png"
          title="Mobile Applications"
          desc="Custom Android apps with high performance, scalability, and modern UI/UX experience."
          onClick={() => navigate("/services/app")}
        />

        <DarkCard
          img="https://virtunexa.com/wp-content/uploads/2024/02/35.png"
          title="Internships"
          desc="Real-world internships with live projects, mentorship, and career-focused training."
          onClick={() => navigate("/internship")}
        />

        <DarkCard
          img="https://virtunexa.com/wp-content/uploads/2024/02/25.png"
          title="Website Development"
          desc="Fast, secure, and visually stunning websites tailored to your business needs."
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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="
        relative
        p-[2px] rounded-2xl
        bg-gradient-to-r from-pink-500 via-blue-500 to-green-400
      ">
        
        {/* INNER CARD */}
        <div className="
          rounded-2xl p-6 text-center
          bg-[#0b0f1a]/90 backdrop-blur-xl
          border border-white/10
          transition-all duration-500

          group-hover:bg-[#0b0f1a]
          group-hover:shadow-[0_15px_50px_rgba(0,0,0,0.7)]
        ">

          {/* IMAGE */}
          <motion.img
            src={img}
            alt={title}
            whileHover={{ scale: 1.1 }}
            className="h-36 mx-auto mb-5 object-contain drop-shadow-[0_0_20px_rgba(0,255,200,0.2)]"
          />

          {/* TITLE */}
          <h3 className="
            text-lg font-semibold mb-3
            text-white
            group-hover:bg-gradient-to-r 
            group-hover:from-pink-400 group-hover:via-blue-400 group-hover:to-green-400
            group-hover:bg-clip-text group-hover:text-transparent
            transition
          ">
            {title}
          </h3>

          {/* DESC */}
          <p className="text-gray-400 text-sm mb-6 leading-relaxed">
            {desc}
          </p>

          {/* BUTTON */}
          <div className="
            w-11 h-11 mx-auto flex items-center justify-center
            rounded-full
            bg-white/5 border border-white/10
            text-gray-300

            transition-all duration-300

            group-hover:bg-gradient-to-r 
            group-hover:from-pink-500 group-hover:via-blue-500 group-hover:to-green-400
            group-hover:text-white
            group-hover:scale-110
          ">
            <FaArrowRight />
          </div>

        </div>

      </div>
    </motion.div>
  );
}