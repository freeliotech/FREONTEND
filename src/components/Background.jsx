// TechBackground.jsx - Minimal Black with Subtle Depth
import { motion } from "framer-motion";

export default function TechBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Deep black base with minimal depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#050505] to-black" />
      
      {/* Optional: extremely faint grid (barely visible) */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}