import { motion } from "framer-motion";
import {
  FaCode,
  FaMobileAlt,
  FaCloud,
  FaPalette
} from "react-icons/fa";

const services = [
  {
    icon: <FaCode />,
    title: "Custom Software",
    desc: "Tailored enterprise software solutions built for performance, scalability and security."
  },
  {
    icon: <FaMobileAlt />,
    title: "Web & Mobile Apps",
    desc: "Modern responsive applications for web, Android and iOS platforms."
  },
  {
    icon: <FaCloud />,
    title: "Cloud Solutions",
    desc: "Secure cloud infrastructure and DevOps solutions for scalable applications."
  },
  {
    icon: <FaPalette />,
    title: "UI / UX Design",
    desc: "Beautiful and intuitive user interfaces that enhance user experience."
  }
];

export default function FreeliotechModernSection() {
  return (
    <section className="py-20 px-4 md:px-6 text-white">

      <div className="max-w-7xl mx-auto">

        {/* SERVICES GRID */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {services.map((service, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className="bg-[#0a0a0a] border border-gray-700
                         p-6 rounded-xl text-center
                         transition-all duration-300
                         hover:border-cyan-400"
            >

              {/* ICON */}
              <div className="text-cyan-400 text-2xl mb-3 flex justify-center">
                {service.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-base font-semibold mb-2">
                {service.title}
              </h3>

              {/* DESC */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {service.desc}
              </p>

            </motion.div>

          ))}

        </div>

        {/* BOTTOM SECTION */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-16">

          {/* IMAGE */}
          <motion.img
            src="https://jdlt.co.uk/images/services/web-app-isometric-720.png"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-sm mx-auto"
          />

          {/* CONTENT */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-4 text-center lg:text-left"
          >

            <h3 className="text-2xl md:text-3xl font-bold">
              Building Future-Ready Digital Products
            </h3>

            <p className="text-gray-400 text-sm md:text-base">
              Our development team combines innovation, modern
              frameworks and industry best practices to build
              scalable digital platforms.
            </p>

            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✔ Agile Development Process</li>
              <li>✔ Modern Technology Stack</li>
              <li>✔ Scalable Architecture</li>
              <li>✔ Performance Optimized Solutions</li>
            </ul>

          </motion.div>

        </div>

      </div>
    </section>
  );
}