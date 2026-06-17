import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { ApiContext } from "../../config/Api";
import {
  Users,
  Search,
  Download,
  Trash2,
  Edit,
  Eye,
  X,
  Save,
  Filter,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Briefcase,
  Calendar,
  Github,
  Linkedin,
  Globe,
  Loader,
  CheckCircle,
  AlertCircle,
  FileText
} from "lucide-react";

export default function AdminUsers() {
  const API_BASE_URL = ApiContext;
  const API = `${API_BASE_URL}/admin`;
  
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [roleFilter, setRoleFilter] = useState("all");
  const [message, setMessage] = useState({ type: "", text: "" });
  
  const token = localStorage.getItem("token");

  // Load users
  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.log("Error loading users", err);
      showMessage("error", "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Filter and search
  useEffect(() => {
    let filtered = users;
    
    if (search) {
      filtered = filtered.filter(u =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.mobile?.includes(search) ||
        u.college?.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (roleFilter !== "all") {
      filtered = filtered.filter(u => u.role === roleFilter);
    }
    
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [search, users, roleFilter]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const deleteUser = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}? This action cannot be undone!`)) return;
    
    try {
      await axios.delete(`${API}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMessage("success", `${name} has been deleted successfully`);
      loadUsers();
    } catch (err) {
      showMessage("error", "Failed to delete user");
    }
  };

  const updateUser = async () => {
    try {
      await axios.put(`${API}/users/${editingUser._id}`, editingUser, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showMessage("success", "User updated successfully");
      setShowEditModal(false);
      loadUsers();
    } catch (err) {
      showMessage("error", "Failed to update user");
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("User Management Report", 14, 25);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 45);
    doc.text(`Total Users: ${filteredUsers.length}`, 14, 55);
    
    const tableColumn = ["S.No", "Name", "Email", "Mobile", "College", "Course", "Role", "Joined"];
    const tableRows = [];
    
    filteredUsers.forEach((u, idx) => {
      tableRows.push([
        idx + 1,
        u.name || "N/A",
        u.email || "N/A",
        u.mobile || "N/A",
        u.college || "N/A",
        u.currentCourse || "N/A",
        u.role || "student",
        new Date(u.createdAt).toLocaleDateString()
      ]);
    });
    
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 65,
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255] },
      alternateRowStyles: { fillColor: [240, 240, 240] }
    });
    
    doc.save(`users_${new Date().toISOString().split('T')[0]}.pdf`);
    showMessage("success", "PDF exported successfully");
  };

  const exportToExcel = () => {
    const exportData = filteredUsers.map((u, idx) => ({
      "S.No": idx + 1,
      "Name": u.name,
      "Email": u.email,
      "Mobile": u.mobile,
      "Father Name": u.fatherName,
      "Mother Name": u.motherName,
      "College": u.college,
      "12th Percentage": u.percentage12,
      "Current Course": u.currentCourse,
      "Role": u.role,
      "City": u.city,
      "State": u.state,
      "Joined Date": new Date(u.createdAt).toLocaleDateString()
    }));
    
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, `users_${new Date().toISOString().split('T')[0]}.xlsx`);
    showMessage("success", "Excel exported successfully");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const getRoleBadge = (role) => {
    switch(role) {
      case "admin":
        return <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs font-medium">Admin</span>;
      case "student":
        return <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">Student</span>;
      default:
        return <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full text-xs font-medium">{role}</span>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1e2a3a] flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin text-4xl text-purple-400 mx-auto mb-4" />
          <p className="text-white">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e2a3a] py-30 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                User Management
              </h1>
              <p className="text-gray-400 mt-2">Manage all registered users</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportToPDF}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-white transition flex items-center gap-2"
              >
                <FileText size={18} />
                PDF
              </button>
              <button
                onClick={exportToExcel}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl text-white transition flex items-center gap-2"
              >
                <Download size={18} />
                Excel
              </button>
            </div>
          </div>
        </motion.div>

        {/* Message Alert */}
        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
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
        </AnimatePresence>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{users.length}</p>
              </div>
              <Users size={32} className="text-purple-400 opacity-50" />
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Students</p>
                <p className="text-2xl font-bold text-white">{users.filter(u => u.role === "student").length}</p>
              </div>
              <GraduationCap size={32} className="text-blue-400 opacity-50" />
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Admins</p>
                <p className="text-2xl font-bold text-white">{users.filter(u => u.role === "admin").length}</p>
              </div>
              <Briefcase size={32} className="text-purple-400 opacity-50" />
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">New This Month</p>
                <p className="text-2xl font-bold text-white">
                  {users.filter(u => u.createdAt && new Date(u.createdAt).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
              <Calendar size={32} className="text-green-400 opacity-50" />
            </div>
          </div>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-xl p-4 mb-6 border border-purple-500/30"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, mobile or college..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white"
              />
            </div>
            <div className="relative">
              <Filter size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="pl-10 pr-8 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white appearance-none cursor-pointer"
              >
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="admin">Admins</option>
              </select>
            </div>
            <div className="text-sm text-gray-400 flex items-center">
              Found {filteredUsers.length} user(s)
            </div>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl rounded-xl border border-purple-500/30 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">User</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white hidden md:table-cell">Contact</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white hidden lg:table-cell">College</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Course</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white hidden sm:table-cell">Role</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {currentUsers.map((user, idx) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-white">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm text-gray-300">{user.mobile}</p>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <p className="text-sm text-gray-300">{user.college || "N/A"}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-purple-400">{user.currentCourse || "N/A"}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      {getRoleBadge(user.role)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowModal(true);
                          }}
                          className="p-1.5 bg-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/30 transition"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setEditingUser(user);
                            setShowEditModal(true);
                          }}
                          className="p-1.5 bg-yellow-500/20 rounded-lg text-yellow-400 hover:bg-yellow-500/30 transition"
                          title="Edit User"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteUser(user._id, user.name)}
                          className="p-1.5 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 transition"
                          title="Delete User"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-4 py-12 text-center text-gray-400">
                      <Users size={48} className="mx-auto mb-3 opacity-30" />
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 p-4 border-t border-white/10">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 bg-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-gray-400">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 bg-gray-800 rounded-lg disabled:opacity-50 hover:bg-gray-700 transition"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* View User Modal */}
      <AnimatePresence>
        {showModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gray-900 p-6 border-b border-purple-500/30">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Users size={24} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-white">User Details</h2>
                  </div>
                  <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-xs">Full Name</p>
                    <p className="text-white font-medium">{selectedUser.name}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-xs">Email Address</p>
                    <p className="text-white">{selectedUser.email}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-xs">Mobile Number</p>
                    <p className="text-white">{selectedUser.mobile}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-xs">Role</p>
                    {getRoleBadge(selectedUser.role)}
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-xs">Father's Name</p>
                    <p className="text-white">{selectedUser.fatherName || "N/A"}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-xs">Mother's Name</p>
                    <p className="text-white">{selectedUser.motherName || "N/A"}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-xs">College/University</p>
                    <p className="text-white">{selectedUser.college || "N/A"}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-xs">Current Course</p>
                    <p className="text-purple-400">{selectedUser.currentCourse || "N/A"}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-xs">12th Percentage</p>
                    <p className="text-white">{selectedUser.percentage12 || "N/A"}%</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-xs">Member Since</p>
                    <p className="text-white">{selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleDateString() : "N/A"}</p>
                  </div>
                  <div className="md:col-span-2 bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-xs">Address</p>
                    <p className="text-white">
                      {selectedUser.address || "N/A"}, {selectedUser.city || ""}, {selectedUser.state || ""} {selectedUser.pincode || ""}
                    </p>
                  </div>
                </div>
                
                {(selectedUser.github || selectedUser.linkedin || selectedUser.portfolio) && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-white mb-3">Social Links</h3>
                    <div className="flex gap-3">
                      {selectedUser.github && (
                        <a href={selectedUser.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                          <Github size={18} className="text-white" />
                        </a>
                      )}
                      {selectedUser.linkedin && (
                        <a href={selectedUser.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                          <Linkedin size={18} className="text-blue-400" />
                        </a>
                      )}
                      {selectedUser.portfolio && (
                        <a href={selectedUser.portfolio} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition">
                          <Globe size={18} className="text-green-400" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Edit User Modal */}
      <AnimatePresence>
        {showEditModal && editingUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowEditModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-gray-900 p-6 border-b border-purple-500/30">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-white">Edit User</h2>
                  <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-white">
                    <X size={20} />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editingUser.name || ""}
                      onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Email</label>
                    <input
                      type="email"
                      value={editingUser.email || ""}
                      disabled
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white opacity-50 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Mobile Number</label>
                    <input
                      type="text"
                      value={editingUser.mobile || ""}
                      onChange={(e) => setEditingUser({...editingUser, mobile: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Role</label>
                    <select
                      value={editingUser.role || "student"}
                      onChange={(e) => setEditingUser({...editingUser, role: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white"
                    >
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Father's Name</label>
                    <input
                      type="text"
                      value={editingUser.fatherName || ""}
                      onChange={(e) => setEditingUser({...editingUser, fatherName: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Mother's Name</label>
                    <input
                      type="text"
                      value={editingUser.motherName || ""}
                      onChange={(e) => setEditingUser({...editingUser, motherName: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-400 mb-1">College/University</label>
                    <input
                      type="text"
                      value={editingUser.college || ""}
                      onChange={(e) => setEditingUser({...editingUser, college: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Current Course</label>
                    <input
                      type="text"
                      value={editingUser.currentCourse || ""}
                      onChange={(e) => setEditingUser({...editingUser, currentCourse: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">12th Percentage</label>
                    <input
                      type="number"
                      value={editingUser.percentage12 || ""}
                      onChange={(e) => setEditingUser({...editingUser, percentage12: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-xl text-white transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateUser}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white transition flex items-center justify-center gap-2"
                  >
                    <Save size={18} />
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}