import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ApiContext } from "../../config/Api"; // ✅ CENTRAL API

export default function AdminManageInternship() {
  const API_BASE_URL = ApiContext; // ✅ base url

  const [data, setData] = useState({ name: "", img: "", description: "" });
  const [internships, setInternships] = useState([]);
  const [editData, setEditData] = useState(null);

  /* ---------------- LOAD ---------------- */
  const load = async () => {
    const res = await axios.get(`${API_BASE_URL}/internships`);
    setInternships(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  /* ---------------- ADD ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE_URL}/internships`, data);
    setData({ name: "", img: "", description: "" });
    load();
  };

  /* ---------------- DELETE ---------------- */
  const deleteItem = async (id) => {
    if (!window.confirm("Delete Internship?")) return;
    await axios.delete(`${API_BASE_URL}/internships/${id}`);
    load();
  };

  /* ---------------- UPDATE ---------------- */
  const updateItem = async (e) => {
    e.preventDefault();
    await axios.put(
      `${API_BASE_URL}/internships/${editData._id}`,
      editData
    );
    setEditData(null);
    load();
  };

  return (
    <div className="min-h-screen bg-[#0A0F18] text-white p-8">

      {/* Page Heading */}
      <h2 className="text-2xl font-bold text-white mb-10">
        Internship Management
      </h2>

      <div className="grid lg:grid-cols-3 gap-10">

        {/* ADD FORM */}
        <div className="lg:col-span-1">
          <div className="bg-[#111827] border border-white/10 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold mb-6">
              Add Internship
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                placeholder="Branch Name"
                className="w-full p-3 bg-[#0D1527] rounded-lg border border-gray-700"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />

              <input
                placeholder="Image URL"
                className="w-full p-3 bg-[#0D1527] rounded-lg border border-gray-700"
                value={data.img}
                onChange={(e) => setData({ ...data, img: e.target.value })}
              />

              <textarea
                rows={4}
                placeholder="Description"
                className="w-full p-3 bg-[#0D1527] rounded-lg border border-gray-700"
                value={data.description}
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
              />

              <button className="w-full bg-blue-600 py-3 rounded-lg font-semibold">
                Add Internship
              </button>
            </form>
          </div>
        </div>

        {/* LIST */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl mb-5 font-semibold">All Internships</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {internships.map((item) => (
              <motion.div
                key={item._id}
                whileHover={{ y: -4 }}
                className="bg-[#111827] rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="h-48 bg-[#0D1527] flex justify-center items-center">
                  <img
                    src={item.img}
                    className="w-full h-full object-contain p-3"
                  />
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-gray-400 text-sm mt-2">
                    {item.description}
                  </p>

                  <div className="flex gap-3 mt-6">
                    <button
                      className="flex-1 bg-blue-600 py-2 rounded-lg"
                      onClick={() => setEditData(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="flex-1 bg-red-600 py-2 rounded-lg"
                      onClick={() => deleteItem(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editData && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-[#111827] p-8 rounded-xl w-full max-w-md"
          >
            <h2 className="text-2xl mb-4">Edit Internship</h2>

            <input
              className="w-full p-3 mb-3 bg-[#0D1527] rounded-lg"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
            />

            <input
              className="w-full p-3 mb-3 bg-[#0D1527] rounded-lg"
              value={editData.img}
              onChange={(e) =>
                setEditData({ ...editData, img: e.target.value })
              }
            />

            <textarea
              rows={4}
              className="w-full p-3 mb-4 bg-[#0D1527] rounded-lg"
              value={editData.description}
              onChange={(e) =>
                setEditData({ ...editData, description: e.target.value })
              }
            />

            <div className="flex gap-4">
              <button
                onClick={updateItem}
                className="flex-1 bg-green-600 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                onClick={() => setEditData(null)}
                className="flex-1 bg-gray-600 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}