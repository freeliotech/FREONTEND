import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import { ApiContext } from "../../config/Api";
import LEFT_LOGO from "../../assets/logo.png";
import {
  User,
  Phone,
  Mail,
  Briefcase,
  GraduationCap,
  CheckCircle,
  Download,
  Camera,
  X,
  Calendar,
  Fingerprint,
  Award,
  Shield,
  Save,
  Loader,
  AlertCircle
} from "lucide-react";

const RIGHT_LOGO = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt1jec6x-DSVQDYoflms5ikkpYk735C-8LJw&s";

export default function IDCardGenerator() {
  const API_BASE_URL = ApiContext;
  const idCardRef = useRef(null);
  const imageUrlRef = useRef(null);
  
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    domain: "",
    jobType: "",
    photo: null,
    approved: true,
    issueDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
  });

  useEffect(() => {
    return () => {
      if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
    };
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "file" && files?.[0]) {
      if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
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
      useCORS: true,
      logging: false,
    });

    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("portrait", "mm", "a4");
    pdf.addImage(img, "PNG", 35, 30, 140, 190);
    pdf.save(`${form.name || "Employee"}_ID_Card.pdf`);
    setMessage({ type: "success", text: "ID Card downloaded successfully!" });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const saveToDatabase = async () => {
    if (!form.name || !form.mobile || !form.email || !form.domain || !form.jobType) {
      setMessage({ type: "error", text: "Please fill all required fields" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      return;
    }

    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("mobile", form.mobile);
      formData.append("email", form.email);
      formData.append("domain", form.domain);
      formData.append("jobType", form.jobType);
      formData.append("approved", form.approved);
      formData.append("issueDate", form.issueDate);
      formData.append("expiryDate", form.expiryDate);
      
      if (imageUrlRef.current) {
        const response = await fetch(imageUrlRef.current);
        const blob = await response.blob();
        formData.append("photo", blob, "profile.jpg");
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_BASE_URL}/id-card/create`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      if (response.data.success) {
        setSaved(true);
        setMessage({ type: "success", text: "ID Card saved successfully!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      }
    } catch (error) {
      setMessage({ type: "error", text: error.response?.data?.message || "Failed to save ID Card" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setForm({
      name: "",
      mobile: "",
      email: "",
      domain: "",
      jobType: "",
      photo: null,
      approved: true,
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    });
    if (imageUrlRef.current) {
      URL.revokeObjectURL(imageUrlRef.current);
      imageUrlRef.current = null;
    }
    setSaved(false);
  };

  const employeeId = `EMP-${Date.now().toString().slice(-8)}`;
  const refNumber = `REF-${Date.now().toString().slice(-8)}${Math.floor(100 + Math.random() * 900)}`;

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-full mb-4">
            <Shield className="text-purple-400" size={16} />
            <span className="text-purple-400 text-sm font-medium">ID Card Generator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Employee ID Card
          </h1>
          <p className="text-gray-400 mt-2">Generate professional employee identification cards</p>
        </motion.div>

        {/* Message Alert */}
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              message.type === "success" 
                ? "bg-green-500/20 border border-green-500/30 text-green-400"
                : "bg-red-500/20 border border-red-500/30 text-red-400"
            }`}
          >
            {message.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <span>{message.text}</span>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* LEFT - FORM SECTION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6"
          >
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-purple-500/30">
              <div className="w-1 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <h2 className="text-xl font-semibold text-white">Employee Information</h2>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                  <User size={14} className="text-purple-400" />
                  Full Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white transition"
                />
              </div>

              {/* Mobile & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                    <Phone size={14} className="text-purple-400" />
                    Mobile Number *
                  </label>
                  <input
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                    <Mail size={14} className="text-purple-400" />
                    Email Address *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="employee@company.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white"
                  />
                </div>
              </div>

              {/* Domain & Role */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                    <Briefcase size={14} className="text-purple-400" />
                    Domain / Department *
                  </label>
                  <input
                    name="domain"
                    value={form.domain}
                    onChange={handleChange}
                    placeholder="Web Development"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                    <Award size={14} className="text-purple-400" />
                    Role / Position *
                  </label>
                  <input
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                    placeholder="Senior Developer"
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white"
                  />
                </div>
              </div>

              {/* Issue & Expiry Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                    <Calendar size={14} className="text-purple-400" />
                    Issue Date
                  </label>
                  <input
                    type="date"
                    name="issueDate"
                    value={form.issueDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                    <Calendar size={14} className="text-purple-400" />
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    name="expiryDate"
                    value={form.expiryDate}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-gray-800 border border-gray-700 focus:border-purple-500 focus:outline-none text-white"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-1">
                  <Camera size={14} className="text-purple-400" />
                  Profile Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl p-2.5 text-white file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                />
                {form.photo && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={form.photo} alt="Preview" className="w-10 h-10 rounded-full object-cover border border-purple-500" />
                    <span className="text-xs text-gray-400">Photo uploaded</span>
                  </div>
                )}
              </div>

              {/* Verified Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.approved}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-300">Verified Employee</span>
              </div>

              {/* Generated IDs */}
              <div className="bg-gray-800/50 rounded-xl p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Employee ID:</span>
                  <span className="text-purple-400 font-mono">{employeeId}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-400">Reference No:</span>
                  <span className="text-cyan-400 font-mono">{refNumber}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generatePDF}
                  className="flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download PDF
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={saveToDatabase}
                  disabled={loading}
                  className="flex-1 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? <Loader className="animate-spin" size={18} /> : <Save size={18} />}
                  {loading ? "Saving..." : "Save to Database"}
                </motion.button>
                <button
                  onClick={clearForm}
                  className="px-4 py-3 rounded-xl text-gray-300 bg-gray-800 hover:bg-gray-700 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {saved && (
                <div className="text-center text-green-400 text-sm flex items-center justify-center gap-2">
                  <CheckCircle size={14} />
                  ID Card saved to database!
                </div>
              )}
            </div>
          </motion.div>

          {/* RIGHT - ID CARD PREVIEW */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex justify-center items-center"
          >
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
              
              {/* ID Card */}
              <div
                ref={idCardRef}
                className="relative w-[380px] h-[580px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-black border border-white/10"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-4">
                  <div className="flex items-center justify-between">
                    <img
                      src={LEFT_LOGO}
                      alt="Company Logo"
                      className="w-12 h-12 bg-white rounded-full p-1 object-contain shadow-lg"
                    />
                    <div className="text-center">
                      <h1 className="text-white font-bold text-lg tracking-wider text-[25px]">
𝓣𝓽𝓲𝓬𝒽𝓾𝓫</h1>
                      <p className="text-white/70 text-[10px]">Corporate Identification</p>
                    </div>
                    <img
                      src={RIGHT_LOGO}
                      alt="Authority Logo"
                      className="w-12 h-12 bg-white rounded-full p-1 object-contain shadow-lg"
                    />
                  </div>
                </div>

                {/* Verified Badge */}
                {form.approved && (
                  <div className="absolute top-20 right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 z-10">
                    <CheckCircle size={12} />
                    VERIFIED
                  </div>
                )}

                {/* ID Numbers */}
                <div className="absolute top-20 left-4 text-[10px] text-gray-500">
                  <div>ID: {employeeId}</div>
                  <div>REF: {refNumber.slice(-12)}</div>
                </div>

                {/* Photo Section */}
                <div className="text-center mt-12">
                  <div className="w-28 h-28 mx-auto rounded-full border-4 border-purple-500 overflow-hidden shadow-xl bg-gray-800">
                    {form.photo ? (
                      <img src={form.photo} className="w-full h-full object-cover" alt="Profile" />
                    ) : (
                      <div className="h-full flex items-center justify-center text-5xl text-purple-500 font-bold">
                        {form.name?.[0] || "?"}
                      </div>
                    )}
                  </div>
                </div>

                {/* Employee Details */}
                <div className="text-center mt-4 px-5">
                  <h3 className="text-xl font-bold text-white">{form.name || "Employee Name"}</h3>
                  <p className="text-purple-400 text-sm mt-1">{form.jobType || "Position"}</p>
                  
                  <div className="mt-4 space-y-2 text-left">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone size={14} className="text-purple-400" />
                      <span className="text-gray-300">{form.mobile || "Mobile Number"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail size={14} className="text-purple-400" />
                      <span className="text-gray-300 text-xs break-all">{form.email || "Email Address"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase size={14} className="text-purple-400" />
                      <span className="text-gray-300">Domain: {form.domain || "—"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar size={14} className="text-purple-400" />
                      <span className="text-gray-300 text-xs">Valid Till: {new Date(form.expiryDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Barcode Section */}
                <div className="absolute bottom-16 left-0 right-0 flex justify-center">
                  <div className="bg-white rounded-lg p-2">
                    <img
                      src={`https://barcodeapi.org/api/128/${refNumber}`}
                      className="w-48 h-12"
                      alt="barcode"
                      crossOrigin="anonymous"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 w-full text-center py-3 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border-t border-white/10">
                  <p className="text-[10px] text-gray-400">Authorized Signature</p>
                  <div className="w-20 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-1"></div>
                  <p className="text-[8px] text-gray-500 mt-1">This is a computer generated ID card</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}