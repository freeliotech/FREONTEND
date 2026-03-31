import React, { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import logo from "../assets/logo.png"
export default function CertificateGenerator() {
  const certRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");
  const [duration, setDuration] = useState("");
  const [certId, setCertId] = useState("");

  useEffect(() => {
    const id = "FLT-" + Math.floor(100000 + Math.random() * 900000);
    setCertId(id);
  }, []);

  /* =========================
     SAVE TO DATABASE
  ========================= */
  const generateCertificate = async () => {
    try {
      await axios.post(
        "https://backend-production-7a212.up.railway.app/api/certificate/create",
        {
          name,
          email,
          domain,
          duration,
          certificateId: certId,
        }
      );

      alert("✅ Certificate Saved Successfully");
    } catch (err) {
      console.log(err);
      alert("❌ Error saving certificate");
    }
  };

  /* =========================
     DOWNLOAD PDF
  ========================= */
  const downloadPDF = async () => {
    const canvas = await html2canvas(certRef.current, {
      scale: 3,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");
    pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
    pdf.save(`${name || "certificate"}.pdf`);
  };

  return (
    <div className="min-h-screen bg-black text-white mt-15 p-10">
      {/* ================= FORM ================= */}
      <div className="max-w-md mx-auto bg-[#111] p-6 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-cyan-400 text-center">
          🎓 Generate Certificate
        </h2>

        <input
          className="border border-gray-600 bg-black p-2 w-full mb-3 rounded text-white"
          placeholder="Student Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="border border-gray-600 bg-black p-2 w-full mb-3 rounded text-white"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border border-gray-600 bg-black p-2 w-full mb-3 rounded text-white"
          placeholder="Domain"
          onChange={(e) => setDomain(e.target.value)}
        />

        <input
          className="border border-gray-600 bg-black p-2 w-full mb-4 rounded text-white"
          placeholder="Duration"
          onChange={(e) => setDuration(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={generateCertificate}
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-2 rounded w-full"
          >
            Save
          </button>

          <button
            onClick={downloadPDF}
            className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded w-full"
          >
            Download
          </button>
        </div>
      </div>

{/* ================= CERTIFICATE ================= */}
<div className="flex justify-center mt-12">
  <div
    ref={certRef}
    className="relative w-[1100px] h-[650px] bg-gradient-to-br from-gray-900 to-black text-white shadow-2xl rounded-xl overflow-hidden"
  >
    {/* Glow Border */}
    <div className="absolute inset-0 border-[12px] border-cyan-500 rounded-xl opacity-30"></div>
    <div className="absolute inset-3 border-[3px] border-purple-500 rounded-xl opacity-50"></div>

    {/* 🔥 LEFT LOGO */}
    <div className="absolute left-6 top-6">
      <img
        src={logo} 
        alt="logo"
        className="w-24 h-24 object-contain opacity-90"
      />
    </div>


    {/* Content */}
    <div className="relative z-10 p-10 text-center">
      <h1 className="text-5xl font-bold text-cyan-400 tracking-wide">
        Tech Training, Innovation &  Certification Hub
      </h1>

     <h2 className="text-2xl mt-3 text-gray-300 tracking-[4px] uppercase">
 Certificate
</h2>

<p className="mt-1 text-gray-400">
  This is to certify that
</p>

<h1 className="text-4xl font-bold text-white mt-1 tracking-wide">
  {name || "Student Name"}
</h1>

<p className="mt-0 text-gray-500">
  ({email || "student@email.com"})
</p>

<p className="mt-1 text-gray-400 max-w-3xl mx-auto leading-relaxed">
  has successfully completed an internship program in the field of
</p>

<h2 className="text-3xl font-semibold text-purple-400 mt-0">
  {domain || "Artificial Intelligence"}
</h2>

<p className="mt-1 text-gray-400 max-w-3xl mx-auto leading-relaxed">
  During this period, the candidate demonstrated exceptional dedication,
  technical skills, and a strong commitment to learning and innovation.
</p>



<p className="mt-0 text-gray-400">
  Duration :{" "}
  <span className="text-white font-semibold">
    {duration || "2 Months"}
  </span>
</p>

<p className="mt-0 text-gray-400">
  Certificate ID :{" "}
  <span className="text-cyan-400 font-semibold">
    {certId}
  </span>
</p>

      {/* QR CODE */}
      <div className="flex justify-center mt-6">
        <div className="bg-white p-2 rounded">
          <QRCodeCanvas
            value={`https://ttichub.co.in/verify/${certId}`}
            size={100}
          />
        </div>
      </div>

      <p className="mt-2 text-xs text-gray-500">
        Scan to Verify Certificate
      </p>
    </div>

    {/* SIGNATURE */}
    <div className="absolute bottom-10 w-full flex justify-between px-24">
      <div className="text-center">
        <div className="border-t border-gray-400 w-40"></div>
        <p className="mt-2 text-sm text-gray-400">Director</p>
      </div>

      <div className="text-center">
        <div className="border-t border-gray-400 w-40"></div>
        <p className="mt-2 text-sm text-gray-400">HOD</p>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}