import React from "react";
import axios from "axios";
import { ApiContext } from "../../config/Api";

export default function StepPayment({ utr, setUtr, setStep, applicationId }) {

  const submitPayment = async () => {

    try {

      await axios.post(
        `${ApiContext}/internship/payment`,
        {
          id: applicationId,
          utr
        }
      );

      setStep(5);

    } catch (err) {

      console.log("Payment update error", err);
      alert("Payment submit failed");

    }

  };

  return (

    <div className="max-w-md mx-auto bg-[#0b1425] p-10 rounded-3xl text-center space-y-6">

      <h2 className="text-2xl text-cyan-400 font-bold">
        Scan & Pay Internship Fee
      </h2>

      {/* QR CODE */}

      <img
        src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=yourupi@upi&pn=Freeliotech&am=799"
        alt="QR Payment"
        className="mx-auto rounded-xl"
      />

      <p className="text-gray-400 text-sm">
        Scan this QR using any UPI app and pay ₹799
      </p>

      {/* UTR INPUT */}

      <input
        placeholder="Enter UTR Number"
        value={utr}
        onChange={(e)=>setUtr(e.target.value)}
        className="w-full px-4 py-3 rounded-xl bg-black border border-gray-600 text-white"
      />

      {/* SUBMIT BUTTON */}

      <button
        disabled={!utr}
        onClick={submitPayment}
        className="w-full py-3 bg-cyan-400 text-black font-bold rounded-xl hover:bg-cyan-300"
      >

        Submit Payment

      </button>

    </div>

  );

}