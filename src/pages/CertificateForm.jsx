import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
import { 
  Download, Save, RefreshCw, CheckCircle, AlertCircle, 
  User, Mail, Phone, BookOpen, Calendar, Building, 
  Hash, Award, TrendingUp, Sparkles, Crown, Star 
} from "lucide-react";

const API_BASE_URL = "https://sanujbackendttic.up.railway.app/api";

export default function CertificateGenerator() {
  const certRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [previewStyle, setPreviewStyle] = useState("modern");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    courseName: "Web Development",
    courseDuration: "2 Months",
    institutionName: "TTIC Hub",
    enrollmentNumber: "",
    grade: "A",
    percentage: "85",
    certificateType: "Course Completion"
  });

  const [certId, setCertId] = useState("");
  const [savedData, setSavedData] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const resetForm = () => {
    setForm({
      fullName: "",
      email: "",
      phoneNumber: "",
      courseName: "Web Development",
      courseDuration: "2 Months",
      institutionName: "TTIC Hub",
      enrollmentNumber: "",
      grade: "A",
      percentage: "85",
      certificateType: "Course Completion"
    });
    setCertId("");
    setSavedData(null);
    setError("");
    setSuccess("");
  };

  const generateCertificate = async () => {
    if (!form.fullName || !form.email) {
      setError("❌ Full Name and Email are required");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    
    try {
      console.log("Sending data:", form);
      const res = await axios.post(`${API_BASE_URL}/certificate/create`, form);
      console.log("Response:", res.data);
      
      if (res.data.success) {
        setCertId(res.data.data.certificateId);
        setSavedData(res.data.data);
        setSuccess("✅ Certificate Saved Successfully! Waiting for admin approval.");
        setTimeout(() => {
          certRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
      } else {
        setError(`❌ ${res.data.message || "Failed to save certificate"}`);
      }
    } catch (err) {
      console.error("Error:", err);
      if (err.response) {
        setError(`❌ Server Error: ${err.response.data?.message || "Something went wrong"}`);
      } else if (err.request) {
        setError("❌ Cannot connect to server. Make sure backend is running on port 5000");
      } else {
        setError(`❌ ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!certId) {
      alert("Please generate certificate first");
      return;
    }
    
    try {
      const canvas = await html2canvas(certRef.current, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
      pdf.save(`${form.fullName || "certificate"}_TTIC_HUB.pdf`);
    } catch (err) {
      console.error(err);
      alert("PDF generation failed");
    }
  };

  const copyVerificationLink = () => {
    if (!certId) return;
    const link = `${window.location.origin}/verify/${certId}`;
    navigator.clipboard.writeText(link);
    alert("Verification link copied to clipboard!");
  };

  const previewStyles = {
    modern: "border-2 border-cyan-500 shadow-2xl",
    classic: "border-4 border-yellow-500 shadow-xl",
    minimal: "border border-white/20 shadow-lg"
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-4 py-2 rounded-full mb-4">
            <Crown size={20} className="text-cyan-400" />
            <span className="text-cyan-400 text-sm font-semibold">TTIC Hub Official</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
            Certificate Generator
          </h1>
          <p className="text-gray-400 mt-3">Generate official digital certificates with unique verification ID</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/20 backdrop-blur-sm border border-red-500 rounded-2xl text-red-400 flex items-center gap-3">
            <AlertCircle size={22} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-500/20 backdrop-blur-sm border border-green-500 rounded-2xl text-green-400 flex items-center gap-3">
            <CheckCircle size={22} />
            <span>{success}</span>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700 p-6 hover:border-cyan-500/50 transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
                <Sparkles size={22} /> Student Information
              </h2>
              <button 
                onClick={resetForm} 
                className="text-gray-400 hover:text-cyan-400 transition flex items-center gap-1 text-sm px-3 py-1 rounded-lg hover:bg-gray-700"
              >
                <RefreshCw size={14} /> Reset
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="group">
                <label className="block text-gray-400 text-sm mb-1 flex items-center gap-2 group-hover:text-cyan-400 transition">
                  <User size={14} /> Full Name <span className="text-red-400">*</span>
                </label>
                <input 
                  type="text" 
                  name="fullName" 
                  placeholder="Enter student's full name" 
                  value={form.fullName} 
                  onChange={handleChange} 
                  className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-xl outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-white" 
                />
              </div>
              
              <div className="group">
                <label className="block text-gray-400 text-sm mb-1 flex items-center gap-2 group-hover:text-cyan-400 transition">
                  <Mail size={14} /> Email Address <span className="text-red-400">*</span>
                </label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="student@example.com" 
                  value={form.email} 
                  onChange={handleChange} 
                  className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-xl outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-white" 
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1 flex items-center gap-2">
                    <Phone size={14} /> Phone Number
                  </label>
                  <input 
                    type="text" 
                    name="phoneNumber" 
                    placeholder="+91 XXXXX XXXXX" 
                    value={form.phoneNumber} 
                    onChange={handleChange} 
                    className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-xl outline-none focus:border-cyan-400 transition-all text-white" 
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1 flex items-center gap-2">
                    <Hash size={14} /> Enrollment No
                  </label>
                  <input 
                    type="text" 
                    name="enrollmentNumber" 
                    placeholder="Enrollment number" 
                    value={form.enrollmentNumber} 
                    onChange={handleChange} 
                    className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-xl outline-none focus:border-cyan-400 transition-all text-white" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1 flex items-center gap-2">
                    <BookOpen size={14} /> Course Name
                  </label>
                  <select 
                    name="courseName" 
                    value={form.courseName} 
                    onChange={handleChange} 
                    className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-xl outline-none focus:border-cyan-400 transition-all text-white"
                  >
                    <option>Web Development</option>
                    <option>App Development</option>
                    <option>AI/ML</option>
                    <option>Cloud Computing</option>
                    <option>Cyber Security</option>
                    <option>Data Science</option>
                    <option>Digital Marketing</option>
                    <option>UI/UX Design</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1 flex items-center gap-2">
                    <Calendar size={14} /> Duration
                  </label>
                  <select 
                    name="courseDuration" 
                    value={form.courseDuration} 
                    onChange={handleChange} 
                    className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-xl outline-none focus:border-cyan-400 transition-all text-white"
                  >
                    <option>1 Month</option>
                    <option>2 Months</option>
                    <option>3 Months</option>
                    <option>6 Months</option>
                    <option>1 Year</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-1 flex items-center gap-2">
                  <Building size={14} /> Institution Name
                </label>
                <input 
                  type="text" 
                  name="institutionName" 
                  value={form.institutionName} 
                  onChange={handleChange} 
                  className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-xl outline-none focus:border-cyan-400 transition-all text-white" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1 flex items-center gap-2">
                    <Award size={14} /> Grade
                  </label>
                  <select 
                    name="grade" 
                    value={form.grade} 
                    onChange={handleChange} 
                    className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-xl outline-none focus:border-cyan-400 transition-all text-white"
                  >
                    <option>A+</option><option>A</option>
                    <option>B+</option><option>B</option><option>C</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1 flex items-center gap-2">
                    <TrendingUp size={14} /> Percentage
                  </label>
                  <input 
                    type="number" 
                    name="percentage" 
                    value={form.percentage} 
                    onChange={handleChange} 
                    className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-xl outline-none focus:border-cyan-400 transition-all text-white" 
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button 
                onClick={generateCertificate} 
                disabled={loading} 
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 p-3 rounded-xl font-semibold text-white disabled:opacity-50 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
              >
                {loading ? 
                  <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>Saving...</> : 
                  <><Save size={18} /> Generate & Save</>
                }
              </button>
              <button 
                onClick={downloadPDF} 
                disabled={!certId} 
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 p-3 rounded-xl font-semibold text-white disabled:opacity-50 flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
              >
                <Download size={18} /> Download PDF
              </button>
            </div>

            {savedData && (
              <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/30">
                <p className="text-green-400 text-sm flex items-center gap-2">
                  <CheckCircle size={16} /> Certificate ID: <span className="font-mono">{savedData.certificateId}</span>
                </p>
                <p className="text-yellow-400 text-xs mt-2 flex items-center gap-2">
                  ⏳ Status: Pending TTIC Hub Admin Approval
                </p>
                <button 
                  onClick={copyVerificationLink}
                  className="mt-3 text-cyan-400 text-xs hover:text-cyan-300 transition flex items-center gap-1"
                >
                  🔗 Copy verification link
                </button>
              </div>
            )}
          </div>

          {/* Certificate Preview */}
          <div className="bg-gray-800/40 backdrop-blur-xl rounded-2xl border border-gray-700 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                <Star size={18} /> Live Preview
              </h2>
              <div className="flex gap-2">
                <button onClick={() => setPreviewStyle("modern")} className={`px-2 py-1 text-xs rounded ${previewStyle === "modern" ? "bg-cyan-500 text-white" : "bg-gray-700"}`}>Modern</button>
                <button onClick={() => setPreviewStyle("classic")} className={`px-2 py-1 text-xs rounded ${previewStyle === "classic" ? "bg-cyan-500 text-white" : "bg-gray-700"}`}>Classic</button>
                <button onClick={() => setPreviewStyle("minimal")} className={`px-2 py-1 text-xs rounded ${previewStyle === "minimal" ? "bg-cyan-500 text-white" : "bg-gray-700"}`}>Minimal</button>
              </div>
            </div>
            
            <div ref={certRef} className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 ${previewStyles[previewStyle]} p-6 text-center rounded-xl transition-all duration-300 overflow-hidden`}>
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-cyan-500 rounded-tl-xl"></div>
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-cyan-500 rounded-tr-xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-cyan-500 rounded-bl-xl"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-cyan-500 rounded-br-xl"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 px-4 py-2 rounded-full mb-4">
                  <Crown size={16} className="text-cyan-400" />
                  <span className="text-cyan-400 text-xs font-semibold">TTIC HUB</span>
                </div>
                
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">CERTIFICATE</h1>
                <p className="text-gray-400 text-sm mt-1">OF ACHIEVEMENT</p>
                
                <p className="text-gray-400 mt-4">This certificate is proudly presented to</p>
                <h2 className="text-2xl mt-2 font-bold text-white">{form.fullName || "Student Name"}</h2>
                <p className="mt-1 text-gray-300 text-sm">{form.email || "student@email.com"}</p>
                
                <div className="mt-4 py-2 px-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 inline-block rounded-full">
                  <p className="text-purple-300 text-xs">for successfully completing</p>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{form.courseName || "Course Name"}</h3>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-2 text-left max-w-md mx-auto">
                  <div className="bg-white/5 p-2 rounded-lg"><p className="text-gray-500 text-xs">DURATION</p><p className="text-cyan-400 font-semibold text-sm">{form.courseDuration || "N/A"}</p></div>
                  <div className="bg-white/5 p-2 rounded-lg"><p className="text-gray-500 text-xs">GRADE</p><p className="text-green-400 font-semibold text-sm">{form.grade || "A"}</p></div>
                  <div className="bg-white/5 p-2 rounded-lg"><p className="text-gray-500 text-xs">PERCENTAGE</p><p className="text-yellow-400 font-semibold text-sm">{form.percentage || "85"}%</p></div>
                  <div className="bg-white/5 p-2 rounded-lg"><p className="text-gray-500 text-xs">ENROLLMENT</p><p className="text-gray-300 text-xs">{form.enrollmentNumber || "N/A"}</p></div>
                </div>
                
                <div className="mt-3 pt-2 border-t border-gray-700">
                  <p className="text-gray-500 text-xs">CERTIFICATE ID</p>
                  <p className="text-cyan-400 font-mono text-xs">{certId || "Not Generated"}</p>
                </div>
                
                {certId && (
                  <div className="mt-3 flex justify-center">
                    <div className="bg-white p-1 rounded-lg">
                      <QRCodeCanvas value={`${window.location.origin}/verify/${certId}`} size={60} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}