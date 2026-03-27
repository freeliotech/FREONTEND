import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Intership from "./Intership";
import Intership_slide from "./Intership_slide";
// ✅ Capital name

export default function BiharEngineeringPage() {
  return (
    <div className="mt-15">
      
      <Intership_slide />
      <Intership />

    </div>
  );
}