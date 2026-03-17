import React from "react";
import InternshipDetailsSection from "./View_deatils";

export default function StepDetails({ branch, setStep }) {

  return (

    <div className="max-w-6xl mx-auto">

      <h2 className="text-3xl text-center text-cyan-400 mb-0">
        {branch.name} Internship
      </h2>

      <InternshipDetailsSection/>

      <div className="flex justify-end mt-0">

        <button
        onClick={()=>setStep(2)}
        className="px-8 py-3 rounded-xl bg-cyan-400 text-black"
        >
        Continue →
        </button>

      </div>

    </div>

  );

}