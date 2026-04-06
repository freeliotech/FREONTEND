import React, { useRef, useState, useEffect, useContext } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import logo from "../assets/logo.png";
import { ApiContext } from "../config/Api";

export default function CertificateGenerator() {
  const certRef = useRef();
  const API_BASE_URL = useContext(ApiContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    domain: "",
    duration: "",
    collegeName: "",
    rollNumber: "",
  });

  const [certId, setCertId] = useState("");

  useEffect(() => {
    const id = "TTI-" + Math.floor(100000 + Math.random() * 900000);
    setCertId(id);
  }, []);

  /* =========================
     HANDLE INPUT
  ========================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =========================
     SAVE TO DATABASE
  ========================= */
  const generateCertificate = async () => {
    try {
      if (!form.name || !form.email) {
        alert("Name & Email required");
        return;
      }

      const res = await axios.post(
        `${API_BASE_URL}/certificate/create`,
        {
          ...form,
          certificateId: certId,
        }
      );

      console.log(res.data);

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
    const canvas = await html2canvas(certRef.current, { scale: 3 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");
    pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
    pdf.save(`${form.name || "certificate"}.pdf`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">

      {/* FORM */}
      <div className="max-w-md mx-auto bg-[#111] p-6 rounded-xl border">
        <h2 className="text-2xl text-cyan-400 text-center mb-4">
          Generate Certificate
        </h2>

        {["name","email","domain","duration","collegeName","rollNumber"].map((field)=>(
          <input
            key={field}
            name={field}
            placeholder={field}
            onChange={handleChange}
            className="w-full p-2 mb-3 bg-black border rounded"
          />
        ))}

        <div className="flex gap-3">
          <button onClick={generateCertificate} className="bg-cyan-500 w-full p-2 rounded">
            Save
          </button>

          <button onClick={downloadPDF} className="bg-green-500 w-full p-2 rounded">
            Download
          </button>
        </div>
      </div>

      {/* CERTIFICATE */}
      <div className="flex justify-center mt-10">
        <div ref={certRef} className="w-[1100px] h-[650px] bg-black border p-10 text-center">

          <img src={logo} className="w-20 absolute left-10 top-10" />

          <h1 className="text-4xl text-cyan-400">Certificate</h1>

          <h2 className="text-3xl mt-5">
            {form.name || "Student Name"}
          </h2>

          <p>{form.email}</p>

          <h3 className="text-2xl text-purple-400 mt-3">
            {form.domain}
          </h3>

          <p>Duration: {form.duration}</p>

          <p className="mt-2">
            Certificate ID: <span className="text-cyan-400">{certId}</span>
          </p>

          {/* QR */}
          <div className="mt-5 flex justify-center">
            <QRCodeCanvas
              value={`https://ttichub.co.in/verify/${certId}`}
              size={100}
            />
          </div>

        </div>
      </div>
    </div>
  );
}