import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaUsers,
  FaCertificate,
  FaIdBadge,
  FaBook,
  FaImages,
  FaWpforms,
  FaEnvelopeOpenText,
  FaStickyNote,
  FaBell,
  FaLayerGroup,
} from "react-icons/fa";
import { MdLibraryBooks } from "react-icons/md";
import { FaServicestack } from "react-icons/fa6";

/* ROUTE ITEMS */

const items = [
  { to: "/admin/userdata", title: "Users", icon: FaUsers },

  { to: "/admin/certificates", title: "Certificates", icon: FaCertificate },
  { to: "/admin/idcards", title: "ID Cards", icon: FaIdBadge },

  { to: "/admin/courses", title: "Courses", icon: FaBook },
  { to: "/admin/syllabus", title: "Syllabus", icon: MdLibraryBooks },

  { to: "/admin/internship", title: "Internship Forms", icon: FaWpforms },
  { to: "/admin/internships", title: "Internship Data", icon: FaLayerGroup },

  { to: "/admin/contacts", title: "Contacts", icon: FaEnvelopeOpenText },
  { to: "/admin/notes", title: "Notes", icon: FaStickyNote },

  { to: "/admin/gallery", title: "Gallery", icon: FaImages },
  { to: "/admin/slides", title: "Slides", icon: FaLayerGroup },

  { to: "/admin/services", title: "Services", icon: FaServicestack },

  { to: "/admin/certificates/all", title: "All Certificates", icon: FaCertificate },
];

export default function AdminDashboard() {
  return (
    <section className="relative min-h-screen bg-black text-white px-6 py-20 overflow-hidden">

      {/* ===== Animated Background Squares ===== */}

      <div className="absolute inset-0 pointer-events-none">

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 border border-indigo-500/20 rounded-lg"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 20, 0],
            }}
            transition={{
              duration: 10 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

      </div>

      {/* HEADER */}

      <div className="max-w-6xl mx-auto mb-16 relative z-10">

        <h1 className="text-4xl font-bold tracking-tight uppercase mt-5 text-center">
          Admin Dashboard
        </h1>

        <p className="text-gray-400 mt-2 text-sm text-center">
          Manage platform content, users and operations
        </p>

      </div>

      {/* GRID */}

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">

        {items.map(({ to, title, icon: Icon }, i) => (

          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >

            <Link
              to={to}
              className="
              group block rounded-2xl p-6
              bg-[#020617]
              border border-white/10
              hover:border-indigo-400/70
              hover:shadow-[0_0_35px_rgba(99,102,241,0.3)]
              transition
              "
            >

              {/* ICON */}

              <div
                className="
                w-14 h-14 mb-4 rounded-xl
                bg-indigo-500/10
                flex items-center justify-center
                text-indigo-400
                group-hover:scale-110
                group-hover:bg-indigo-500/20
                transition
                "
              >
                <Icon size={22} />
              </div>

              {/* TITLE */}

              <h3 className="text-base font-semibold mb-1">
                {title}
              </h3>

              <p className="text-xs text-gray-400">
                Open & manage →
              </p>

            </Link>

          </motion.div>

        ))}

      </div>

    </section>
  );
}