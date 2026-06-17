import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function WeProvideDark() {
  const navigate = useNavigate();
  const services = [
    { img: "https://static.vecteezy.com/system/resources/thumbnails/056/409/761/small/mobile-app-ui-design-icons-graphics-and-user-interface-free-png.png", title: "Mobile Applications", desc: "Custom Android & iOS apps with high performance and modern UI/UX.", path: "/services/app" },
    { img: "https://virtunexa.com/wp-content/uploads/2024/02/35.png", title: "Internships", desc: "Real-world internships with live projects and mentorship.", path: "/internship" },
    { img: "https://virtunexa.com/wp-content/uploads/2024/02/25.png", title: "Website Development", desc: "Fast, secure, and visually stunning websites.", path: "/services/web" },
  ];

  return (
    <section className="relative py-9 px-6 bg-transparent overflow-hidden">
      {/* Unified Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-600/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">WE PROVIDE</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ y: -10 }} transition={{ duration: 0.4 }}
              onClick={() => navigate(service.path)} className="group cursor-pointer">
              <div className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 text-center overflow-hidden hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-500">
                <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.img src={service.img} alt={service.title} whileHover={{ scale: 1.08 }} transition={{ duration: 0.3 }} className="h-36 md:h-40 mx-auto mb-6 object-contain relative z-10" />
                <h3 className="text-xl font-bold text-white mb-4 relative z-10 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 relative z-10">{service.desc}</p>
                <div className="relative z-10 w-12 h-12 mx-auto rounded-full flex items-center justify-center bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                  <FaArrowRight />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}