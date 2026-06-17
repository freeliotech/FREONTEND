import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  CheckCircle, XCircle, Trash2, RefreshCw, Eye, 
  Download, Filter, Search, User, Mail, BookOpen, 
  Hash, Calendar, Building, AlertCircle, Crown,
  Activity, CheckSquare, Square, Shield, TrendingUp,
  Users, Award, Clock, BarChart3, FileCheck
} from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api";

export default function CertificateInternship() {
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0, rejected: 0 });
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    fetchCertificates();
    fetchStats();
  }, []);

  useEffect(() => {
    filterCertificates();
  }, [searchTerm, statusFilter, certificates]);

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const filterCertificates = () => {
    let filtered = [...certificates];
    if (statusFilter !== "all") {
      filtered = filtered.filter(cert => cert.status === statusFilter);
    }
    if (searchTerm) {
      filtered = filtered.filter(cert =>
        cert.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.certificateId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.courseName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredCertificates(filtered);
  };

  const fetchCertificates = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/certificate/all`);
      setCertificates(res.data.data || []);
      showToast("Certificates refreshed", "success");
    } catch (error) {
      showToast("Failed to fetch certificates", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/certificate/stats`);
      setStats(res.data.data || { total: 0, approved: 0, pending: 0, rejected: 0 });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const approveCertificate = async (id) => {
    if (!window.confirm("Approve this certificate?")) return;
    try {
      const response = await axios.put(`${API_BASE_URL}/certificate/approve/${id}`);
      if (response.data.success) {
        showToast("✅ Certificate Approved Successfully!", "success");
        await fetchCertificates();
        await fetchStats();
      }
    } catch (error) {
      showToast("Failed to approve certificate", "error");
    }
  };

  const rejectCertificate = async (id) => {
    if (!window.confirm("Reject this certificate?")) return;
    try {
      const response = await axios.put(`${API_BASE_URL}/certificate/reject/${id}`);
      if (response.data.success) {
        showToast("❌ Certificate Rejected!", "warning");
        await fetchCertificates();
        await fetchStats();
      }
    } catch (error) {
      showToast("Failed to reject certificate", "error");
    }
  };

  const activateCertificate = async (id) => {
    if (!window.confirm("Activate this certificate?")) return;
    try {
      const response = await axios.put(`${API_BASE_URL}/certificate/activate/${id}`);
      if (response.data.success) {
        showToast("✅ Certificate Activated Successfully!", "success");
        await fetchCertificates();
        await fetchStats();
      }
    } catch (error) {
      showToast("Failed to activate certificate", "error");
    }
  };

  const deleteCertificate = async (id) => {
    if (!window.confirm("Delete this certificate? This action cannot be undone!")) return;
    try {
      const response = await axios.delete(`${API_BASE_URL}/certificate/delete/${id}`);
      if (response.data.success) {
        showToast("🗑️ Certificate Deleted Successfully!", "success");
        await fetchCertificates();
        await fetchStats();
      }
    } catch (error) {
      showToast("Failed to delete certificate", "error");
    }
  };

  const bulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} certificates? This cannot be undone!`)) return;
    
    for (const id of selectedIds) {
      await axios.delete(`${API_BASE_URL}/certificate/delete/${id}`);
    }
    showToast(`🗑️ ${selectedIds.length} certificates deleted!`, "success");
    setSelectedIds([]);
    fetchCertificates();
    fetchStats();
  };

  const bulkApprove = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Approve ${selectedIds.length} certificates?`)) return;
    
    for (const id of selectedIds) {
      await axios.put(`${API_BASE_URL}/certificate/approve/${id}`);
    }
    showToast(`✅ ${selectedIds.length} certificates approved!`, "success");
    setSelectedIds([]);
    fetchCertificates();
    fetchStats();
  };

  const exportToCSV = () => {
    const dataToExport = filteredCertificates.map(cert => ({
      "Full Name": cert.fullName,
      Email: cert.email,
      Phone: cert.phoneNumber,
      Course: cert.courseName,
      Duration: cert.courseDuration,
      Institution: cert.institutionName,
      Enrollment: cert.enrollmentNumber,
      Grade: cert.grade,
      Percentage: cert.percentage,
      "Certificate ID": cert.certificateId,
      Status: cert.status,
      "Issue Date": new Date(cert.issueDate).toLocaleDateString()
    }));
    
    const headers = Object.keys(dataToExport[0] || {});
    const csvRows = [headers.join(',')];
    for (const row of dataToExport) {
      const values = headers.map(header => `"${(row[header] || '').toString().replace(/"/g, '""')}"`);
      csvRows.push(values.join(','));
    }
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ttic_certificates_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    showToast("📊 Data exported successfully!", "success");
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredCertificates.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredCertificates.map(c => c._id));
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved": 
        return <span className="px-2 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-semibold">✓ Active</span>;
      case "rejected": 
        return <span className="px-2 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-xs font-semibold">✗ Rejected</span>;
      default: 
        return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-semibold">⏳ Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Animated Purple Glow Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-800 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-purple-900/5 via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-8 px-4">
        {/* Toast Notification */}
        {toast.show && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-2xl transition-all duration-300 animate-slideIn ${
            toast.type === "success" ? "bg-purple-600" : toast.type === "error" ? "bg-red-600" : "bg-yellow-500"
          } text-white`}>
            {toast.message}
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Crown size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                TTIC Hub - Admin Portal
              </h1>
              <p className="text-gray-500 text-sm">Manage internship certificates</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 text-center border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <FileCheck size={24} className="text-purple-400" />
              <span className="text-2xl font-bold text-white">{stats.total}</span>
            </div>
            <p className="text-gray-400 text-sm">Total Certificates</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 text-center border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle size={24} className="text-purple-400" />
              <span className="text-2xl font-bold text-white">{stats.approved}</span>
            </div>
            <p className="text-gray-400 text-sm">Active</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 text-center border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <Clock size={24} className="text-yellow-400" />
              <span className="text-2xl font-bold text-white">{stats.pending}</span>
            </div>
            <p className="text-gray-400 text-sm">Pending</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-5 text-center border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <XCircle size={24} className="text-red-400" />
              <span className="text-2xl font-bold text-white">{stats.rejected}</span>
            </div>
            <p className="text-gray-400 text-sm">Rejected</p>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedIds.length > 0 && (
          <div className="bg-purple-500/10 backdrop-blur-sm rounded-xl p-4 mb-6 flex items-center justify-between border border-purple-500/30 flex-wrap gap-3">
            <span className="text-purple-400">{selectedIds.length} certificate(s) selected</span>
            <div className="flex gap-3">
              <button onClick={bulkApprove} className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition flex items-center gap-2 text-white">
                <CheckCircle size={16} /> Approve All
              </button>
              <button onClick={bulkDelete} className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition flex items-center gap-2 text-white">
                <Trash2 size={16} /> Delete All
              </button>
              <button onClick={() => setSelectedIds([])} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-purple-500/30">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
              <input 
                type="text" 
                placeholder="Search by name, email, ID or course..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full pl-10 pr-4 py-2.5 bg-black/50 border border-gray-700 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-500 transition-all" 
              />
            </div>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)} 
              className="px-4 py-2.5 bg-black/50 border border-gray-700 rounded-lg focus:border-purple-500 text-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Active</option>
              <option value="rejected">Rejected</option>
            </select>
            <div className="flex gap-2">
              <button onClick={fetchCertificates} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 rounded-lg transition text-white">
                <RefreshCw size={16} /> Refresh
              </button>
              <button onClick={exportToCSV} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-white">
                <Download size={16} /> Export
              </button>
            </div>
          </div>
        </div>

        {/* Certificates Table */}
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/30">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                <p className="mt-4 text-gray-400">Loading certificates...</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-purple-500/10 border-b border-purple-500/30">
                  <tr>
                    <th className="p-4 w-10">
                      <button onClick={toggleSelectAll}>
                        {selectedIds.length === filteredCertificates.length && filteredCertificates.length > 0 ? 
                          <CheckSquare size={18} className="text-purple-400" /> : 
                          <Square size={18} className="text-gray-500" />}
                      </button>
                    </th>
                    <th className="p-4 text-left text-sm font-semibold text-purple-300">Name</th>
                    <th className="p-4 text-left text-sm font-semibold text-purple-300 hidden md:table-cell">Email</th>
                    <th className="p-4 text-left text-sm font-semibold text-purple-300">Course</th>
                    <th className="p-4 text-left text-sm font-semibold text-purple-300 hidden lg:table-cell">Certificate ID</th>
                    <th className="p-4 text-left text-sm font-semibold text-purple-300">Status</th>
                    <th className="p-4 text-left text-sm font-semibold text-purple-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCertificates.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center p-12 text-gray-400">No certificates found</td>
                    </tr>
                  ) : (
                    filteredCertificates.map((cert, index) => (
                      <tr key={cert._id} className={`border-b border-gray-800 hover:bg-purple-500/5 transition ${index % 2 === 0 ? 'bg-transparent' : 'bg-gray-800/30'}`}>
                        <td className="p-4">
                          <button onClick={() => toggleSelect(cert._id)}>
                            {selectedIds.includes(cert._id) ? 
                              <CheckSquare size={16} className="text-purple-400" /> : 
                              <Square size={16} className="text-gray-500" />}
                          </button>
                        </td>
                        <td className="p-4 font-medium text-white">{cert.fullName}</td>
                        <td className="p-4 text-gray-400 hidden md:table-cell">{cert.email}</td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">{cert.courseName}</span>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          <code className="text-purple-400 text-xs font-mono">{cert.certificateId?.slice(-12)}</code>
                        </td>
                        <td className="p-4">{getStatusBadge(cert.status)}</td>
                        <td className="p-4">
                          <div className="flex gap-2 flex-wrap">
                            {cert.status === "pending" && (
                              <>
                                <button onClick={() => approveCertificate(cert._id)} className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition text-white" title="Approve">
                                  <CheckCircle size={14} />
                                </button>
                                <button onClick={() => rejectCertificate(cert._id)} className="p-2 bg-red-600 hover:bg-red-500 rounded-lg transition text-white" title="Reject">
                                  <XCircle size={14} />
                                </button>
                              </>
                            )}
                            {cert.status === "rejected" && (
                              <button onClick={() => activateCertificate(cert._id)} className="p-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition text-white" title="Activate">
                                <Activity size={14} />
                              </button>
                            )}
                            <button onClick={() => deleteCertificate(cert._id)} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-white" title="Delete">
                              <Trash2 size={14} />
                            </button>
                            <button onClick={() => setSelectedCert(cert)} className="p-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition text-white" title="View Details">
                              <Eye size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
          <div>Showing {filteredCertificates.length} of {certificates.length} certificates</div>
          <div className="flex gap-2">
            <button onClick={() => setStatusFilter("all")} className={`px-2 py-1 rounded ${statusFilter === "all" ? "text-purple-400" : "text-gray-500"}`}>All</button>
            <button onClick={() => setStatusFilter("pending")} className={`px-2 py-1 rounded ${statusFilter === "pending" ? "text-purple-400" : "text-gray-500"}`}>Pending</button>
            <button onClick={() => setStatusFilter("approved")} className={`px-2 py-1 rounded ${statusFilter === "approved" ? "text-purple-400" : "text-gray-500"}`}>Active</button>
            <button onClick={() => setStatusFilter("rejected")} className={`px-2 py-1 rounded ${statusFilter === "rejected" ? "text-purple-400" : "text-gray-500"}`}>Rejected</button>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {selectedCert && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn" 
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30 shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gray-900 p-6 border-b border-purple-500/30 flex justify-between items-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Certificate Details
              </h2>
              <button onClick={() => setSelectedCert(null)} className="text-gray-400 hover:text-purple-400 transition">
                <XCircle size={24} />
              </button>
            </div>
            <div className="p-6 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs">Full Name</p>
                  <p className="text-white font-semibold">{selectedCert.fullName}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs">Email</p>
                  <p className="text-white">{selectedCert.email}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs">Phone</p>
                  <p className="text-white">{selectedCert.phoneNumber || "N/A"}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs">Enrollment No</p>
                  <p className="text-white">{selectedCert.enrollmentNumber || "N/A"}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs">Course</p>
                  <p className="text-purple-400">{selectedCert.courseName}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs">Duration</p>
                  <p className="text-white">{selectedCert.courseDuration}</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs">Grade</p>
                  <p className="text-green-400">{selectedCert.grade} ({selectedCert.percentage}%)</p>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <p className="text-gray-400 text-xs">Institution</p>
                  <p className="text-white">{selectedCert.institutionName}</p>
                </div>
              </div>
              <div className="mt-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                <p className="text-gray-400 text-xs">Certificate ID</p>
                <code className="text-purple-400 text-sm break-all">{selectedCert.certificateId}</code>
              </div>
              <div className="text-center text-gray-400 text-xs">
                Issue Date: {new Date(selectedCert.issueDate).toLocaleDateString()}
              </div>
              {selectedCert.qrCode && (
                <div className="text-center">
                  <img src={selectedCert.qrCode} alt="QR" className="w-20 h-20 mx-auto bg-white p-1 rounded" />
                </div>
              )}
            </div>
            <div className="p-6 pt-0">
              <button onClick={() => setSelectedCert(null)} className="w-full p-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition text-white font-medium">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.05); }
        }
        .animate-pulse {
          animation: pulse 4s ease-in-out infinite;
        }
        .bg-gradient-radial {
          background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.08) 0%, transparent 70%);
        }
      `}</style>
    </div>
  );
}