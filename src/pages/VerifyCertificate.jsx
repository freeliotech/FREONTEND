import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function VerifyCertificate() {
  const { id } = useParams();

  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        `https://backend-production-7a212.up.railway.app/api/certificate/verify/${id}`
      )
      .then((res) => {
        setCert(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  // 🔄 Loading
  if (loading)
    return (
      <h2 className="text-center text-white mt-10">Loading...</h2>
    );

  // ❌ Invalid
  if (!cert || !cert.valid)
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl text-red-500 font-bold">
          ❌ Certificate Invalid
        </h2>
      </div>
    );

  // ✅ Valid
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-[#111] p-8 rounded-xl shadow-lg border border-green-500">
        
        <h1 className="text-3xl font-bold text-green-400 mb-4">
          ✅ Certificate Verified
        </h1>

        <div className="space-y-2 text-left">
          <p><b>Name:</b> {cert.data.name}</p>
          <p><b>Email:</b> {cert.data.email}</p>
          <p><b>Domain:</b> {cert.data.domain}</p>
          <p><b>Duration:</b> {cert.data.duration}</p>
          <p><b>College:</b> {cert.data.collegeName}</p>
          <p><b>Roll No:</b> {cert.data.rollNumber}</p>
          <p><b>Status:</b> {cert.data.status}</p>
        </div>

        {/* QR */}
        <div className="mt-4 flex justify-center">
          <img src={cert.data.qrCode} alt="QR" className="w-32" />
        </div>
      </div>
    </div>
  );
}