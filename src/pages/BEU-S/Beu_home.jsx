import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import BeuSidebar from "./BeuSidebar";
import BeuSection from "./BeuSection";
import MasterclassSection from "./MasterclassSection";
import StudyResources from "./StudyResources";
import Vision from "./Vision";
export default function BiharEngineeringPage() {
  return (
   <div className="mt-15">

  <BeuSidebar />
    <BeuSection />
    <StudyResources />
    <MasterclassSection />

    <Vision />
</div>

 
  );
}
