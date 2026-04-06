import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ApiContext } from "../../config/Api";

export default function ManageCertificates() {
  const API_BASE_URL = useContext(ApiContext);
  const [certificates, setCertificates] = useState([]);

  const loadCertificates = async () => {
    const res = await axios.get(`${API_BASE_URL}/certificate/all`);
    setCertificates(res.data);
  };

  const verifyCertificate = async (id) => {
    await axios.patch(`${API_BASE_URL}/certificate/approve/${id}`);
    loadCertificates();
  };

  const deleteCertificate = async (id) => {
    await axios.delete(`${API_BASE_URL}/certificate/${id}`);
    loadCertificates();
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl mb-4">Certificates</h2>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Ref No</th>
            <th>Status</th>
            <th>QR</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {certificates.map((c) => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.course}</td>
              <td>{c.refNo}</td>

              <td>
                {c.status === "approved" ? "✅ Verified" : "❌ Pending"}
              </td>

              <td>
                <img src={c.qrCode} width="60" />
              </td>

              <td>
                {c.status !== "approved" && (
                  <button onClick={() => verifyCertificate(c._id)}>
                    Verify
                  </button>
                )}

                <button onClick={() => deleteCertificate(c._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}