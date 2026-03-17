import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ApiContext } from "../../config/Api"; // ✅ Central API

export default function ManageContact() {
  const API_BASE_URL = ApiContext; // ✅ from context
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get(`${API_BASE_URL}/contact`);
    setMessages(res.data);
  };

  const remove = async (id) => {
    await axios.delete(`${API_BASE_URL}/contact/${id}`);
    setSelected(null);
    load();
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">
        📩 Manage Contacts
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.map((m) => (
          <div
            key={m._id}
            className="bg-gray-900 p-5 rounded-xl border border-cyan-500/30 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-cyan-300">
              {m.name}
            </h2>

            <p className="text-gray-300 text-sm">{m.email}</p>

            <p className="mt-2 text-yellow-300 capitalize">
              Requirement: {m.service}
            </p>

            <p className="mt-3 text-gray-400 text-sm line-clamp-2">
              {m.message}
            </p>

            <button
              onClick={() => setSelected(m)}
              className="mt-4 w-full bg-cyan-500 text-black font-bold py-2 rounded-lg"
            >
              Read
            </button>
          </div>
        ))}
      </div>

      {/* READ POPUP */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 flex justify-center items-center p-5">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-xl border border-cyan-400 shadow-xl">
            <h2 className="text-2xl font-semibold text-cyan-300">
              {selected.name}
            </h2>

            <p className="text-gray-400 mt-2">
              <b>Email:</b> {selected.email}
            </p>

            <p className="text-yellow-300 mt-1 capitalize">
              <b>Requirement:</b> {selected.service}
            </p>

            <p className="text-gray-200 mt-5 bg-black/40 p-4 rounded-lg leading-relaxed">
              <b>Description:</b> <br />
              {selected.message}
            </p>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => remove(selected._id)}
                className="flex-1 bg-red-500 py-2 text-black font-bold rounded-lg"
              >
                Delete (Mark as Read)
              </button>

              <button
                onClick={() => setSelected(null)}
                className="flex-1 bg-gray-700 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}