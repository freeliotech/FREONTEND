import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

      {/* Background */}
      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-green-400/20 blur-[160px]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-400/20 blur-[160px]" />

      {/* Card */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
          relative z-10 max-w-md w-full
          bg-white/5 backdrop-blur-xl
          border border-white/10
          rounded-3xl p-10 text-center
          shadow-[0_0_40px_rgba(34,197,94,0.35)]
        "
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="
            mx-auto mb-6 w-20 h-20
            rounded-full bg-green-500/20
            flex items-center justify-center
            text-4xl
            shadow-[0_0_25px_rgba(34,197,94,0.7)]
          "
        >
          🎉
        </motion.div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-green-400 mb-3">
          Payment Successful
        </h1>
        <p className="text-gray-300 mb-8">
          Your payment has been received successfully.  
          You are now enrolled in the course 🚀
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <Link
            to="/student-dashboard"
            className="
              py-3 rounded-xl font-semibold
              bg-green-500 text-black
              hover:bg-green-400 transition
              shadow-[0_0_15px_rgba(34,197,94,0.6)]
            "
          >
            Go to Dashboard
          </Link>

          <Link
            to="/courses"
            className="
              py-3 rounded-xl font-semibold
              border border-green-400 text-green-400
              hover:bg-green-400 hover:text-black transition
            "
          >
            Explore More Courses
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
