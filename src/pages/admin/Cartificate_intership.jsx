import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [certs, setCerts] = useState([]);

  const loadData = async () => {
    try {
      const res = await axios.get(
        "https://backend-production-7a212.up.railway.app/api/certificate/all"
      );
      setCerts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl text-cyan-400 mb-6">All Certificates</h1>

      <table className="w-full border border-gray-700">
        <thead className="bg-cyan-500 text-black">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Domain</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {certs.map((c) => (
            <tr key={c._id} className="border-b border-gray-700">
              <td>{c.certificateId}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.domain}</td>
              <td>{c.duration}</td>
              <td>
                {c.status === "approved" ? "✅ Approved" : "⏳ Pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}