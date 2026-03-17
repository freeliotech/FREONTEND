import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const API = "https://backend-production-7a212.up.railway.app/api/admin";

export default function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const token = localStorage.getItem("token");

  /* ================= LOAD USERS ================= */

  const loadUsers = async () => {

    try {

      const res = await axios.get(`${API}/users`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUsers(res.data);

    } catch (err) {

      console.log("Error loading users", err);

    }

  };

  useEffect(() => {
    loadUsers();
  }, []);

  /* ================= DELETE USER ================= */

  const deleteUser = async (id) => {

    if (!window.confirm("Delete this user?")) return;

    await axios.delete(`${API}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    loadUsers();

  };

  /* ================= SEARCH ================= */

  const filteredUsers = users.filter((u) =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= EXPORT PDF ================= */

  const exportPDF = () => {

    const doc = new jsPDF();

    doc.text("Registered Users List", 14, 15);

    const tableColumn = [
      "Name",
      "Email",
      "Mobile",
      "College",
      "Course"
    ];

    const tableRows = [];

    filteredUsers.forEach((u) => {

      const rowData = [
        u.name,
        u.email,
        u.mobile,
        u.college,
        u.currentCourse
      ];

      tableRows.push(rowData);

    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20
    });

    doc.save("users.pdf");

  };

  return (

    <div className="min-h-screen bg-[#020617] text-white p-10">

      <h1 className="text-3xl font-bold text-cyan-400 mb-8">
        Admin Dashboard
      </h1>

      {/* TOP BAR */}

      <div className="grid grid-cols-1 md:grid-cols-3 items-center mb-8 gap-4">

        {/* LEFT : TOTAL USERS */}

        <div className="bg-gray-900 px-1 py-4 rounded-xl border border-cyan-400">

          <h2 className="text-sm text-gray-400">
            Total Users
          </h2>

          <p className="text-2xl font-bold text-cyan-400">
            {users.length}
          </p>

        </div>


        {/* CENTER : SEARCH */}

        <div className="flex justify-center">

          <input
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 w-full md:w-72 bg-black border border-cyan-400 rounded-lg outline-none"
          />

        </div>


        {/* RIGHT : EXPORT PDF */}

        <div className="flex justify-end">

          <button
            onClick={exportPDF}
            className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-lg font-semibold"
          >
            Export PDF
          </button>

        </div>

      </div>


      {/* USERS TABLE */}

      <div className="overflow-x-auto">

        <table className="w-full border border-gray-700">

          <thead className="bg-gray-900">

            <tr>

              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Mobile</th>
              <th className="p-3 border">College</th>
              <th className="p-3 border">Course</th>
              <th className="p-3 border">Action</th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((u) => (

              <tr key={u._id} className="border-t border-gray-800 hover:bg-gray-900">

                <td className="p-3 border">{u.name}</td>

                <td className="p-3 border">{u.email}</td>

                <td className="p-3 border">{u.mobile}</td>

                <td className="p-3 border">{u.college}</td>

                <td className="p-3 border text-cyan-300">
                  {u.currentCourse}
                </td>

                <td className="p-3 border">

                  <button
                    onClick={() => deleteUser(u._id)}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

            {filteredUsers.length === 0 && (

              <tr>

                <td colSpan="6" className="text-center p-6 text-gray-400">
                  No users found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}