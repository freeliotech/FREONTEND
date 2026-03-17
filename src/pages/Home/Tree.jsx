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
    <section className="relative py-32 px-6 text-white overflow-hidden">

      {/* Background Glow */}

      <div className="absolute top-0 left-0 w-80 h-80" />
      <div className="absolute bottom-0 right-0 w-96 h-96" />

      <div className="max-w-7xl mx-auto">

        {/* Header */}

       

        {/* Services Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service, i) => (

            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-2xl text-center hover:border-cyan-400 transition"
            >

              <div className="text-cyan-400 text-3xl mb-4 flex justify-center">
                {service.icon}
              </div>

              <h3 className="text-lg font-semibold mb-3">
                {service.title}
              </h3>

              <p className="text-gray-400 text-sm">
                {service.desc}
              </p>

            </motion.div>

          ))}

        </div>

        {/* Bottom Section */}

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-28">

          {/* Image */}

          <motion.img
            src="https://jdlt.co.uk/images/services/web-app-isometric-720.png"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="max-w-md mx-auto"
          />

          {/* Content */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >

            <h3 className="text-3xl font-bold">
              Building Future-Ready Digital Products
            </h3>

            <p className="text-gray-400">
              Our development team combines innovation, modern
              frameworks and industry best practices to build
              scalable digital platforms for businesses worldwide.
            </p>

            <ul className="space-y-3 text-gray-300">
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