import React, { useState } from "react";
import Student from "../../components/StudentRoute";
import StepBranches from "./StepBranches";
import StepDetails from "./StepDetails";
import StepForm from "./StepForm";
import StepSummary from "./StepSummary";
import StepPayment from "./StepPayment";
import StepThankYou from "./StepThankYou";

export default function InternshipFlow() {

  const [step, setStep] = useState(0);
  const [branch, setBranch] = useState(null);
  const [form, setForm] = useState({});
  const [utr, setUtr] = useState("");
  const [applicationId, setApplicationId] = useState(null);

  return (

    <section className="min-h-screen bg-[#1e2a3a] text-white px-6 py-28">

      {step === 0 && (
        <StepBranches setBranch={setBranch} setStep={setStep} />
      )}

      {step === 1 && (
        <StepDetails branch={branch} setStep={setStep} />
      )}
      
      {step === 2 && (
          <Student>
        <StepForm
          branch={branch}
          form={form}
          setForm={setForm}
          setStep={setStep}
        />
              </Student>
      )}



      {step === 3 && (
        <StepSummary
          branch={branch}
          form={form}
          setStep={setStep}
          setApplicationId={setApplicationId}
        />
      )}

      {step === 4 && (
        <StepPayment
          utr={utr}
          setUtr={setUtr}
          setStep={setStep}
          applicationId={applicationId}
        />
      )}

      {step === 5 && <StepThankYou />}

    </section>

  );
}