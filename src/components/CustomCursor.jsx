import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TrailCursor() {
  const [points, setPoints] = useState([]);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Detect device
    const checkDevice = () => {
      setIsDesktop(window.innerWidth > 768 && !("ontouchstart" in window));
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (!isDesktop) return; // ❌ Stop on mobile

    const handleMove = (e) => {
      const pos = { x: e.clientX, y: e.clientY };
      setCursor(pos);

      setPoints((prev) => {
        const newPoint = {
          x: pos.x,
          y: pos.y,
          id: Math.random(),
        };

        const updated = [...prev, newPoint];
        if (updated.length > 12) updated.shift();
        return updated;
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isDesktop]);

  // ❌ Don't render anything on mobile
  if (!isDesktop) return null;

  return (
    <>
      {/* TRAIL */}
      {points.map((p) => (
        <motion.div
          key={p.id}
          className="fixed pointer-events-none z-[9998]"
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            left: p.x - 4,
            top: p.y - 4,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "cyan",
            boxShadow: "0 0 10px cyan",
          }}
        />
      ))}

      {/* CURSOR */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: cursor.x - 5,
          top: cursor.y - 5,
          width: 20,
          height: 20,
          borderRadius: "50%",
          boxShadow: "0 0 14px cyan",
        }}
      />
    </>
  );
}