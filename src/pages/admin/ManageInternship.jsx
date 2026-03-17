import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://backend-production-7a212.up.railway.app/api";

export default function AdminPanel() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const res = await axios.get(`${API}/internship/all`);

    setApplications(res.data.data);
  };

  const deleteApplication = async (id) => {
    if (!window.confirm("Delete application?")) return;

    await axios.delete(`${API}/internship/delete/${id}`);

    fetchApplications();
  };

  return (
    <div className="min-h-screen bg-[#04070d] text-white p-10">
      <h1 className="text-3xl font-bold text-cyan-400 mb-10">
        Internship Admin Panel
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-white/10">
          <thead className="bg-[#0b1425]">
            <tr>
              <th className="p-3">Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>College</th>
              <th>Branch</th>
              <th>Domain</th>
              <th>Duration</th>
              <th>Payment</th>
              <th>UTR</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-t border-white/10">
                <td className="p-3">{app.name}</td>

                <td>{app.email}</td>

                <td>{app.mobile}</td>

                <td>{app.college}</td>

                <td>{app.branch}</td>

                <td>{app.domain}</td>

                <td>{app.duration}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded text-sm
${app.paymentStatus === "PAID" ? "bg-green-500" : "bg-yellow-500"}`}
                  >
                    {app.paymentStatus}
                  </span>
                </td>

                <td>{app.utr || "-"}</td>

                <td>
                  <button
                    onClick={() => deleteApplication(app._id)}
                    className="px-3 py-1 bg-red-500 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
