import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function PaymentFailed() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">

      {/* Background */}
      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-500/20 blur-[160px]" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-500/20 blur-[160px]" />

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
          shadow-[0_0_40px_rgba(239,68,68,0.35)]
        "
      >
        {/* Icon */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.6 }}
          className="
            mx-auto mb-6 w-20 h-20
            rounded-full bg-red-500/20
            flex items-center justify-center
            text-4xl
            shadow-[0_0_25px_rgba(239,68,68,0.7)]
          "
        >
          ❌
        </motion.div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-red-400 mb-3">
          Payment Failed
        </h1>
        <p className="text-gray-300 mb-8">
          Something went wrong while processing your payment.  
          Please try again or choose a different method.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <Link
            to="/payment"
            className="
              py-3 rounded-xl font-semibold
              bg-red-500 text-black
              hover:bg-red-400 transition
              shadow-[0_0_15px_rgba(239,68,68,0.6)]
            "
          >
            Try Again
          </Link>

          <Link
            to="/support"
            className="
              py-3 rounded-xl font-semibold
              border border-red-400 text-red-400
              hover:bg-red-400 hover:text-black transition
            "
          >
            Contact Support
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
