import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ApiContext } from "../../config/Api"; // 👈 ADD// 👈 ADD

export default function ManageCertificates() {
  const API_BASE_URL = useContext(ApiContext); // 👈 ADD
  const [certificates, setCertificates] = useState([]);

  const loadCertificates = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/certificates/all`);
      setCertificates(res.data);
    } catch (err) {
      console.log("Error loading certificates", err);
    }
  };

  const verifyCertificate = async (id) => {
    try {
      await axios.patch(`${API_BASE_URL}/admin/verify/${id}`);
      loadCertificates();
    } catch (err) {
      console.log("Verification Error", err);
    }
  };

  const deleteCertificate = async (id) => {
    if (!window.confirm("Are you sure you want to delete this certificate?"))
      return;

    try {
      await axios.delete(`${API_BASE_URL}/certificates/${id}`);
      loadCertificates();
    } catch (err) {
      console.log("Delete error", err);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <h1 className="text-4xl font-bold text-cyan-400 mb-6">
        Manage Generated Certificates
      </h1>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-cyan-500 to-purple-600 text-black">
              <th className="p-3">Student Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Course</th>
              <th>Marks</th>
              <th>Grade</th>
              <th>Ref No</th>
              <th>QR</th>
              <th>Status</th>
              <th>Verify</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {certificates.map((c) => (
              <tr
                key={c._id}
                className="border-b border-gray-700 hover:bg-white/5 transition"
              >
                <td className="p-3">{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.course}</td>
                <td className="text-yellow-300">{c.marks}</td>
                <td className="text-green-300">{c.grade}</td>
                <td className="text-purple-300">{c.refNo}</td>

                <td>
                  <img
                    src={c.qrCode}
                    alt="QR"
                    className="w-16 h-16 object-contain"
                  />
                </td>

                <td className="text-sm">
                  {c.verified ? (
                    <span className="text-green-400 font-bold">
                      Verified ✓
                    </span>
                  ) : (
                    <span className="text-red-400 font-bold">Pending</span>
                  )}
                </td>

                <td>
                  {!c.verified && (
                    <button
                      onClick={() => verifyCertificate(c._id)}
                      className="bg-green-500 px-3 py-1 rounded text-black hover:bg-green-400"
                    >
                      Verify
                    </button>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => deleteCertificate(c._id)}
                    className="bg-red-500 px-3 py-1 rounded text-black hover:bg-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty Message */}
      {certificates.length === 0 && (
        <p className="text-center text-gray-400 mt-6">
          No certificates generated yet.
        </p>
      )}
    </div>
  );
}