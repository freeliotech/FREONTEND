import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { ApiContext } from "../config/Api";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  MapPin,
  Building,
  Calendar,
  Save,
  Edit2,
  X,
  CheckCircle,
  AlertCircle,
  Loader,
  Github,
  Linkedin,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Briefcase,
  Home,
  Smartphone,
  BookOpen,
  Award,
  Users,
  ArrowLeft,
  Sparkles
} from "lucide-react";

export default function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const API_BASE_URL = ApiContext;
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  // Check if on edit page
  const isEditPage = useMemo(() => location.pathname === "/settings/edit-profile", [location.pathname]);
  
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    college: "",
    mobile: "",
    email: "",
    percentage12: "",
    currentCourse: "",
    bio: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    github: "",
    linkedin: "",
    portfolio: ""
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const UNIVERSAL_PHOTO_URL = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  // Fetch profile data
  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", { replace: true });
        return;
      }
      
      const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000
      });
      
      if (response.data.success) {
        setProfile(response.data.data);
        setFormData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL, navigate]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Handle form changes with debounce
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handlePasswordChange = useCallback((e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  }, []);

  // Submit profile update
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${API_BASE_URL}/auth/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000
      });
      
      if (response.data.success) {
        setProfile(response.data.data);
        setMessage({ type: "success", text: "Profile updated successfully!" });
        setTimeout(() => setMessage({ type: "", text: "" }), 3000);
        if (isEditPage) {
          setTimeout(() => navigate("/my-profile", { replace: true }), 1500);
        }
      }
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.response?.data?.message || "Failed to update profile" 
      });
    } finally {
      setSaving(false);
    }
  }, [API_BASE_URL, formData, isEditPage, navigate]);

  // Submit password change
  const handlePasswordSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match" });
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters" });
      return;
    }
    
    setSaving(true);
    
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_BASE_URL}/auth/change-password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 10000
      });
      
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setMessage({ type: "success", text: "Password changed successfully!" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.response?.data?.message || "Failed to change password" 
      });
    } finally {
      setSaving(false);
    }
  }, [API_BASE_URL, passwordData]);

  // Navigation handlers
  const handleEditClick = useCallback(() => {
    navigate("/settings/edit-profile");
  }, [navigate]);

  const handleBackClick = useCallback(() => {
    navigate("/my-profile", { replace: true });
  }, [navigate]);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const slideIn = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1e2a3a] flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin text-4xl text-purple-400 mx-auto mb-4" />
          <p className="text-white animate-pulse">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Edit Profile Page
  if (isEditPage) {
    return (
      <div className="min-h-screen bg-[#1e2a3a] py-30 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
         

          {/* Message Alert */}
          <AnimatePresence mode="wait">
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

          {/* Edit Form */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 md:p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Edit2 size={24} className="text-purple-400" />
                  Edit Profile
                </h3>
                <p className="text-gray-400 text-sm mt-1">Update your personal information</p>
              </div>
              <button
                onClick={handleBackClick}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-white transition flex items-center gap-2 hover:scale-105"
              >
                <X size={16} />
                Cancel
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email || ""}
                    disabled
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl text-white opacity-50 cursor-not-allowed"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Father's Name</label>
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Mother's Name</label>
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">College/University</label>
                  <input
                    type="text"
                    name="college"
                    value={formData.college || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">12th Percentage</label>
                  <input
                    type="number"
                    name="percentage12"
                    value={formData.percentage12 || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Current Course</label>
                  <input
                    type="text"
                    name="currentCourse"
                    value={formData.currentCourse || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-400 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio || ""}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white transition-all duration-200 focus:ring-2 focus:ring-purple-500/20 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-purple-400" />
                  Address Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-400 mb-1">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode || ""}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Globe size={20} className="text-purple-400" />
                  Social Links
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">GitHub</label>
                    <input
                      type="url"
                      name="github"
                      value={formData.github || ""}
                      onChange={handleChange}
                      placeholder="https://github.com/username"
                      className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">LinkedIn</label>
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin || ""}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Portfolio Website</label>
                    <input
                      type="url"
                      name="portfolio"
                      value={formData.portfolio || ""}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com"
                      className="w-full px-4 py-2.5 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4 border-t border-purple-500/20">
                <motion.button
                  type="button"
                  onClick={handleBackClick}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-white font-semibold transition-all duration-200"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={saving}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-purple-500/20"
                >
                  {saving ? <Loader className="animate-spin" size={20} /> : <Save size={20} />}
                  {saving ? "Saving..." : "Save Changes"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    );
  }

  // Profile View Page
  return (
    <div className="min-h-screen bg-[#1e2a3a] py-30 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Message Alert */}
        <AnimatePresence mode="wait">
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

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            variants={slideIn}
            initial="hidden"
            animate="visible"
            className="lg:col-span-1"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 text-center sticky top-24">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1 mx-auto shadow-lg shadow-purple-500/20">
                  <div className="w-full h-full rounded-full bg-gray-900 overflow-hidden">
                    <img
                      src={UNIVERSAL_PHOTO_URL}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-gray-900">
                  <CheckCircle size={12} className="text-white" />
                </div>
              </div>
              
              <h2 className="text-xl font-bold text-white mt-4">{profile?.name || "User"}</h2>
              <p className="text-purple-400 text-sm flex items-center justify-center gap-1">
                <Sparkles size={14} />
                {profile?.role === "admin" ? "Administrator" : "Student"}
              </p>
              <p className="text-gray-500 text-sm mt-1">{profile?.email}</p>
              
              <div className="mt-6 pt-6 border-t border-purple-500/20">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm group">
                    <span className="text-gray-400">Member Since</span>
                    <span className="text-white group-hover:text-purple-400 transition-colors">
                      {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm group">
                    <span className="text-gray-400">Student ID</span>
                    <span className="text-white font-mono text-xs group-hover:text-purple-400 transition-colors">
                      {profile?._id?.slice(-8) || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setShowPasswordModal(true)}
                className="w-full mt-6 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-white transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105"
              >
                <Lock size={16} />
                Change Password
              </button>
            </div>
          </motion.div>

          {/* Profile Info */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2"
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                    <User size={20} className="text-purple-400" />
                    Personal Information
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">View your profile details</p>
                </div>
                <button
                  onClick={handleEditClick}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white transition-all duration-200 flex items-center gap-2 hover:scale-105 shadow-lg shadow-purple-500/20"
                >
                  <Edit2 size={16} />
                  Edit Profile
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-gray-800/30 rounded-xl p-3 hover:bg-gray-800/50 transition-all duration-200">
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <User size={12} className="text-purple-400" />
                    Full Name
                  </p>
                  <p className="text-white font-medium">{profile?.name || "N/A"}</p>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-3 hover:bg-gray-800/50 transition-all duration-200">
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <Mail size={12} className="text-purple-400" />
                    Email Address
                  </p>
                  <p className="text-white">{profile?.email || "N/A"}</p>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-3 hover:bg-gray-800/50 transition-all duration-200">
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <Phone size={12} className="text-purple-400" />
                    Mobile Number
                  </p>
                  <p className="text-white">{profile?.mobile || "N/A"}</p>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-3 hover:bg-gray-800/50 transition-all duration-200">
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <Users size={12} className="text-purple-400" />
                    Father's Name
                  </p>
                  <p className="text-white">{profile?.fatherName || "N/A"}</p>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-3 hover:bg-gray-800/50 transition-all duration-200">
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <Users size={12} className="text-purple-400" />
                    Mother's Name
                  </p>
                  <p className="text-white">{profile?.motherName || "N/A"}</p>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-3 hover:bg-gray-800/50 transition-all duration-200">
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <Building size={12} className="text-purple-400" />
                    College/University
                  </p>
                  <p className="text-white">{profile?.college || "N/A"}</p>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-3 hover:bg-gray-800/50 transition-all duration-200">
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <Award size={12} className="text-purple-400" />
                    12th Percentage
                  </p>
                  <p className="text-white">{profile?.percentage12 || "N/A"}%</p>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-3 hover:bg-gray-800/50 transition-all duration-200">
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <BookOpen size={12} className="text-purple-400" />
                    Current Course
                  </p>
                  <p className="text-white">{profile?.currentCourse || "N/A"}</p>
                </div>
                <div className="md:col-span-2 bg-gray-800/30 rounded-xl p-3 hover:bg-gray-800/50 transition-all duration-200">
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <Briefcase size={12} className="text-purple-400" />
                    Bio
                  </p>
                  <p className="text-white">{profile?.bio || "No bio provided"}</p>
                </div>
                <div className="md:col-span-2 bg-gray-800/30 rounded-xl p-3 hover:bg-gray-800/50 transition-all duration-200">
                  <p className="text-gray-400 text-xs flex items-center gap-1">
                    <MapPin size={12} className="text-purple-400" />
                    Address
                  </p>
                  <p className="text-white">
                    {profile?.address ? `${profile.address}, ${profile.city || ""}, ${profile.state || ""} ${profile.pincode || ""}` : "No address provided"}
                  </p>
                </div>
              </div>
              
              {/* Social Links */}
              {(profile?.github || profile?.linkedin || profile?.portfolio) && (
                <div className="mt-6 pt-6 border-t border-purple-500/20">
                  <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Globe size={16} className="text-purple-400" />
                    Social Links
                  </h4>
                  <div className="flex gap-3">
                    {profile?.github && (
                      <a href={profile.github} target="_blank" rel="noopener noreferrer" 
                         className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20">
                        <Github size={18} className="text-white" />
                      </a>
                    )}
                    {profile?.linkedin && (
                      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                         className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20">
                        <Linkedin size={18} className="text-blue-400" />
                      </a>
                    )}
                    {profile?.portfolio && (
                      <a href={profile.portfolio} target="_blank" rel="noopener noreferrer"
                         className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20">
                        <Globe size={18} className="text-green-400" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Change Password Modal - Optimized */}
      <AnimatePresence>
        {showPasswordModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPasswordModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-2xl max-w-md w-full p-6 border border-purple-500/30 shadow-2xl shadow-purple-500/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Lock size={20} className="text-purple-400" />
                  Change Password
                </h3>
                <button onClick={() => setShowPasswordModal(false)} className="text-gray-400 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white pr-10 transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white pr-10 transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none text-white pr-10 transition-all duration-200 focus:ring-2 focus:ring-purple-500/20"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-white transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-purple-500/20"
                  >
                    {saving ? <Loader className="animate-spin" size={16} /> : "Update Password"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}