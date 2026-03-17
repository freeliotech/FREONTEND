import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-black overflow-hidden">

      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.04]
      bg-[linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)]
      bg-[size:40px_40px]" />

      {/* CYAN GLOW */}
      <motion.div
        animate={{ scale: [1,1.3,1], opacity:[0.2,0.4,0.2] }}
        transition={{ duration:10, repeat:Infinity }}
        className="absolute top-0 left-0 w-[450px] h-[450px] bg-cyan-500/20 blur-[200px]"
      />

      {/* PURPLE GLOW */}
      <motion.div
        animate={{ scale:[1,1.4,1], opacity:[0.2,0.5,0.2] }}
        transition={{ duration:12, repeat:Infinity }}
        className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-purple-500/20 blur-[200px]"
      />

    </div>
  );
}