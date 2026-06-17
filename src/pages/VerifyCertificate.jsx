import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { 
  Search, CheckCircle, XCircle, Loader,
  User, Mail, Phone, BookOpen, Calendar, Building, Hash, Award,
  FileText, Shield, Clock, Download, Share2, Fingerprint,
  Calendar as CalendarIcon, GraduationCap, MapPin, CreditCard, Verified
} from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

export default function VerifyCertificate() {
  const { certificateId: paramId } = useParams();
  const [certificateId, setCertificateId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verified, setVerified] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches
  useEffect(() => {
    const saved = localStorage.getItem("recentCertificates");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Auto-verify from URL
  useEffect(() => {
    if (paramId) {
      setCertificateId(paramId);
      handleVerify(paramId);
    }
  }, [paramId]);

  const saveToRecent = (id) => {
    const updated = [id, ...recentSearches.filter(s => s !== id)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem("recentCertificates", JSON.stringify(updated));
  };

  const handleVerify = async (id = certificateId) => {
    if (!id || id.trim() === "") {
      setError("Please enter a valid Certificate ID");
      return;
    }

    setLoading(true);
    setError("");
    setCertificate(null);
    setVerified(false);

    try {
      const response = await axios.get(`${API_BASE_URL}/certificate/verify/${id}`);
      
      if (response.data.valid) {
        setCertificate(response.data.data);
        setVerified(true);
        saveToRecent(id);
      } else {
        setError(response.data.message || "Certificate not found or invalid");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || "Certificate not found");
      } else if (err.request) {
        setError("Unable to connect to verification server. Please try again.");
      } else {
        setError("Verification failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!certificate) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate of Achievement - ${certificate.fullName}</title>
          <meta charset="UTF-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: 'Georgia', 'Times New Roman', serif;
              background: #0a0a0a;
              padding: 40px;
              text-align: center;
            }
            .certificate-container {
              max-width: 900px;
              margin: 0 auto;
              background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
              border: 2px solid #7c3aed;
              padding: 50px;
              position: relative;
              border-radius: 20px;
              box-shadow: 0 20px 40px rgba(124, 58, 237, 0.2);
            }
            .certificate-container:before {
              content: '';
              position: absolute;
              top: 15px;
              left: 15px;
              right: 15px;
              bottom: 15px;
              border: 1px solid #a78bfa;
              border-radius: 12px;
              pointer-events: none;
            }
            .organization {
              font-size: 14px;
              letter-spacing: 3px;
              color: #a78bfa;
              margin-bottom: 20px;
            }
            h1 {
              font-size: 36px;
              color: #c4b5fd;
              margin-bottom: 10px;
              letter-spacing: 2px;
            }
            .subtitle {
              font-size: 18px;
              color: #9ca3af;
              border-bottom: 1px solid #374151;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .presented-to {
              font-size: 16px;
              color: #9ca3af;
              margin-top: 30px;
            }
            .recipient-name {
              font-size: 32px;
              font-weight: bold;
              color: #ffffff;
              margin: 15px 0;
              letter-spacing: 1px;
            }
            .course-name {
              font-size: 22px;
              color: #a78bfa;
              margin: 20px 0;
              font-weight: bold;
            }
            .details-table {
              width: 80%;
              margin: 30px auto;
              border-collapse: collapse;
              text-align: left;
            }
            .details-table td {
              padding: 10px;
              border-bottom: 1px solid #374151;
              color: #d1d5db;
            }
            .details-table td:first-child {
              font-weight: bold;
              width: 40%;
              color: #a78bfa;
            }
            .footer {
              margin-top: 40px;
              font-size: 12px;
              color: #6b7280;
              border-top: 1px solid #374151;
              padding-top: 20px;
            }
            .signature {
              margin-top: 40px;
              display: flex;
              justify-content: space-between;
              padding: 0 40px;
            }
            .sign-line {
              text-align: center;
            }
            .sign-line hr {
              width: 150px;
              margin-bottom: 8px;
              border-color: #7c3aed;
            }
            .sign-line small {
              color: #9ca3af;
            }
            .certificate-id {
              font-size: 11px;
              color: #6b7280;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="certificate-container">
            <div class="organization">TTIC HUB</div>
            <h1>CERTIFICATE OF ACHIEVEMENT</h1>
            <div class="subtitle">This certificate is awarded to</div>
            
            <div class="recipient-name">${certificate.fullName}</div>
            
            <div class="presented-to">for successfully completing the program</div>
            <div class="course-name">${certificate.courseName}</div>
            
            <table class="details-table">
              <tr><td>Duration</td><td>${certificate.courseDuration}</td></tr>
              <tr><td>Grade Achieved</td><td>${certificate.grade} (${certificate.percentage}%)</td></tr>
              <tr><td>Enrollment Number</td><td>${certificate.enrollmentNumber || 'N/A'}</td></tr>
              <tr><td>Issue Date</td><td>${new Date(certificate.issueDate).toLocaleDateString()}</td></tr>
            </table>
            
            <div class="signature">
              <div class="sign-line"><hr /><small>Authorized Signatory</small></div>
              <div class="sign-line"><hr /><small>Director, TTIC Hub</small></div>
            </div>
            
            <div class="certificate-id">Certificate ID: ${certificate.certificateId}</div>
            <div class="footer">Verify at: ${window.location.origin}/verify/${certificate.certificateId}</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleShare = () => {
    if (!certificate) return;
    const url = `${window.location.origin}/verify/${certificate.certificateId}`;
    navigator.clipboard.writeText(url);
    alert("Verification link copied to clipboard");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-md text-sm font-medium">✓ Verified</span>;
      case "rejected":
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-md text-sm font-medium">✗ Rejected</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-md text-sm font-medium">⏳ Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Animated Purple Glow Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8 mt-19">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 mb-4">
            <Shield size={16} className="text-purple-400" />
            <span className="text-purple-400 text-xs font-medium">Official Verification Portal</span>
          </div>
          <h5 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Certificate Verification
          </h5>
          <p className="text-gray-500 mt-2">Enter the certificate ID to verify authenticity</p>
        </div>

        {/* Search Box */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-purple-500/30 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
              <input
                type="text"
                placeholder="Enter Certificate ID"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleVerify()}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-500"
              />
            </div>
            <button
              onClick={() => handleVerify()}
              disabled={loading}
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader size={18} className="animate-spin" /> : <Search size={18} />}
              Verify
            </button>
          </div>
          <p className="text-gray-600 text-xs mt-3 text-center">
            Format: TTIC-YYYYMMDD-XXXXXX-XXXX
          </p>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && !certificate && !loading && !error && (
          <div className="mb-6">
            <p className="text-gray-500 text-sm mb-2 flex items-center gap-2">
              <Clock size={14} className="text-purple-400" /> Recent Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((id, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCertificateId(id);
                    handleVerify(id);
                  }}
                  className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-full text-sm text-purple-400 transition border border-purple-500/30"
                >
                  {id.slice(-16)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-purple-500/30 p-12 text-center">
            <Loader size={40} className="animate-spin text-purple-500 mx-auto mb-4" />
            <p className="text-gray-400">Verifying certificate...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-8 text-center">
            <XCircle size={48} className="text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-red-400 mb-1">Invalid Certificate</h3>
            <p className="text-gray-400">{error}</p>
            <button
              onClick={() => setCertificateId("")}
              className="mt-4 px-4 py-1 text-sm text-purple-400 hover:text-purple-300"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Success State */}
        {verified && certificate && (
          <div className="animate-fadeIn">
            {/* Success Banner */}
            <div className="bg-purple-500/10 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2">
                <Verified size={20} className="text-purple-400" />
                <span className="text-purple-400 font-medium">Certificate Verified Successfully</span>
              </div>
            </div>

            {/* Certificate Card */}
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-purple-500/30 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-6 py-4 border-b border-purple-500/30">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <FileText size={20} className="text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">Certificate of Achievement</h2>
                      <p className="text-gray-500 text-sm">TTIC Hub Official</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleDownloadPDF}
                      className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition flex items-center gap-2 text-sm text-gray-300 border border-gray-700"
                    >
                      <Download size={14} /> PDF
                    </button>
                    <button
                      onClick={handleShare}
                      className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition flex items-center gap-2 text-sm text-gray-300 border border-gray-700"
                    >
                      <Share2 size={14} /> Share
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Recipient Info */}
                <div className="text-center mb-6">
                  <p className="text-gray-500 text-sm">This certificate is awarded to</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{certificate.fullName}</h3>
                  <p className="text-gray-500 text-sm mt-2">for successfully completing</p>
                  <p className="text-lg font-semibold text-purple-400 mt-1">{certificate.courseName}</p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <CalendarIcon size={16} className="text-purple-400" />
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="text-sm font-medium text-white">{certificate.courseDuration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <Award size={16} className="text-purple-400" />
                    <div>
                      <p className="text-xs text-gray-500">Grade</p>
                      <p className="text-sm font-medium text-white">{certificate.grade} ({certificate.percentage}%)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <Hash size={16} className="text-purple-400" />
                    <div>
                      <p className="text-xs text-gray-500">Enrollment Number</p>
                      <p className="text-sm font-medium text-white">{certificate.enrollmentNumber || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <Building size={16} className="text-purple-400" />
                    <div>
                      <p className="text-xs text-gray-500">Institution</p>
                      <p className="text-sm font-medium text-white">{certificate.institutionName}</p>
                    </div>
                  </div>
                </div>

                {/* Certificate ID & Status */}
                <div className="bg-gray-800/50 rounded-lg p-4 mb-4 border border-purple-500/30">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Fingerprint size={16} className="text-purple-400" />
                      <span className="text-sm text-gray-400">Certificate ID:</span>
                      <code className="text-sm font-mono text-purple-400">{certificate.certificateId}</code>
                    </div>
                    {getStatusBadge(certificate.status)}
                  </div>
                </div>

                {/* Issue Date */}
                <div className="flex justify-between items-center text-sm text-gray-500 border-t border-gray-800 pt-4 mb-4">
                  <span>📅 Issue Date: {new Date(certificate.issueDate).toLocaleDateString()}</span>
                  <span>🏛 TTIC Hub</span>
                </div>

                {/* QR Code */}
                {certificate.qrCode && (
                  <div className="text-center border-t border-gray-800 pt-4">
                    <p className="text-xs text-gray-500 mb-2">Verification QR Code</p>
                    <img src={certificate.qrCode} alt="QR Code" className="w-20 h-20 mx-auto bg-white p-1 rounded" />
                  </div>
                )}

                {/* Footer */}
                <div className="text-center text-xs text-gray-600 border-t border-gray-800 pt-4 mt-4">
                  <p>Electronically generated certificate. Verify at {window.location.origin}/verify/{certificate.certificateId}</p>
                </div>
              </div>
            </div>

            {/* Verification Seal */}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/5">
                <Shield size={14} className="text-purple-400" />
                <span className="text-purple-400 text-xs">Verified by TTIC Hub Certification Authority</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}