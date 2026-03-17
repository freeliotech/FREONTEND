import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import LEFT_LOGO from "../../assets/logo-x.png";
import { ApiContext } from "../../config/Api"; // ✅ BASE URL STRING

const RIGHT_LOGO =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt1jec6x-DSVQDYoflms5ikkpYk735C-8LJw&s";

const FIELDS = [
  { name: "name", label: "Full Name" },
  { name: "mobile", label: "Mobile Number" },
  { name: "domain", label: "Domain" },
  { name: "jobType", label: "Role / Internship" },
];

export default function IDCardGenerator() {
  // 🔹 Base API URL (future use)
  const API_BASE_URL = ApiContext;

  const idCardRef = useRef(null);
  const imageUrlRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    domain: "",
    jobType: "",
    photo: null,
    approved: false,
    refNumber: `REF-${Math.floor(100000 + Math.random() * 900000)}`,
  });

  useEffect(() => {
    return () => {
      if (imageUrlRef.current) {
        URL.revokeObjectURL(imageUrlRef.current);
      }
    };
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "file" && files?.[0]) {
      if (imageUrlRef.current) {
        URL.revokeObjectURL(imageUrlRef.current);
      }
      imageUrlRef.current = URL.createObjectURL(files[0]);
      setForm((p) => ({ ...p, photo: imageUrlRef.current }));
    } else if (type === "checkbox") {
      setForm((p) => ({ ...p, approved: checked }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  }, []);

  const generatePDF = async () => {
    const canvas = await html2canvas(idCardRef.current, {
      scale: 4,
      backgroundColor: "#000",
    });

    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("portrait", "mm", "a4");

    pdf.addImage(img, "PNG", 35, 30, 140, 190);
    pdf.save(`${form.name || "Employee"}_ID_Card.pdf`);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-black text-white py-12 px-4 font-[Poppins]">

      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-3xl font-bold text-cyan-400 mb-10 uppercase mt-12"
      >
        Employee Premium ID Card
      </motion.h1>

      <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">

        {/* FORM */}
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 space-y-4">
          {FIELDS.map((f) => (
            <div key={f.name}>
              <label className="text-sm text-gray-400">{f.label}</label>
              <input
                name={f.name}
                value={form[f.name]}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-lg bg-black/60 border border-gray-700 focus:border-cyan-400 outline-none"
              />
            </div>
          ))}

          <div>
            <label className="text-sm text-gray-400">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="w-full mt-1 bg-black/60 border border-gray-700 rounded-lg p-2"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.approved}
              onChange={handleChange}
              className="w-5 h-5 accent-cyan-500"
            />
            <span className="text-sm text-gray-300">Approved</span>
          </div>

          <p className="text-sm text-gray-400">
            Ref No: <span className="text-cyan-400">{form.refNumber}</span>
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={generatePDF}
            className="w-full py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-cyan-400 to-blue-500"
          >
            Download ID Card (PDF)
          </motion.button>
        </div>

        {/* ID CARD */}
        <motion.div
          ref={idCardRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-[360px] h-[520px] mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-cyan-400 bg-gradient-to-br from-slate-900 to-black"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-3 bg-cyan-500 shadow-md">
            <img
              src={LEFT_LOGO}
              alt="Company Logo"
              className="w-12 h-12 bg-white rounded-full p-1 object-contain"
            />

            <h2 className="text-black font-bold tracking-widest text-3xl text-blue-900">
              Freeliotech
            </h2>

            <img
              src={RIGHT_LOGO}
              alt="Authority Logo"
              className="w-12 h-12 bg-white rounded-full p-1 object-contain"
            />
          </div>

          {form.approved && (
            <span className="absolute top-16 right-4 bg-gradient-to-r from-green-400 to-green-600 text-black px-4 py-1 rounded-full text-xs font-bold shadow-lg">
              ✔ VERIFIED
            </span>
          )}

          <div className="p-6 text-center">
            <div className="w-28 h-28 mx-auto rounded-full border-4 border-cyan-400 overflow-hidden shadow-lg">
              {form.photo ? (
                <img
                  src={form.photo}
                  className="w-full h-full object-cover"
                  alt="profile"
                />
              ) : (
                <div className="h-full flex items-center justify-center text-4xl text-gray-500">
                  {form.name?.[0] || "?"}
                </div>
              )}
            </div>

            <h2 className="mt-4 text-2xl font-bold text-cyan-400">
              {form.name || "Your Name"}
            </h2>
            <p className="text-gray-400">
              {form.mobile || "Mobile Number"}
            </p>

            <div className="mt-4 text-sm text-gray-300 space-y-1">
              <p><b>Domain:</b> {form.domain || "—"}</p>
              <p><b>Role:</b> {form.jobType || "—"}</p>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={`https://barcodeapi.org/api/128/${form.refNumber}`}
              className="w-52 bg-white p-1 rounded"
              alt="barcode"
            />
          </div>

          <div className="absolute bottom-0 w-full text-center py-4 bg-black/70 border-t border-cyan-400">
            <div className="w-32 mx-auto border-t border-gray-500 mb-1"></div>
            <p className="text-xs text-gray-400">Authorized Signature</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}