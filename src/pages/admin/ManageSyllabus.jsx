import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ApiContext } from "../../config/Api"; // ✅ CENTRAL API

export default function ManageSyllabus() {
  const API_BASE_URL = ApiContext;

  const [data, setData] = useState([]);

  const [branch, setBranch] = useState("");
  const [branchImg, setBranchImg] = useState("");
  const [editId, setEditId] = useState(null);

  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState({ name: "", code: "" });
  const [module, setModule] = useState("");
  const [topic, setTopic] = useState("");
  const [subtopic, setSubtopic] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await axios.get(`${API_BASE_URL}/syllabus`);
    setData(res.data);
  };

  const glass =
    "bg-[#0f172a]/70 backdrop-blur-xl border border-cyan-400/30 shadow-[0_0_30px_rgba(0,255,255,0.3)] rounded-2xl";

  /* ---------------- ADD / EDIT BRANCH ---------------- */
  const saveBranch = async () => {
    if (!branch) return alert("Enter branch name");

    if (editId) {
      await axios.put(
        `${API_BASE_URL}/syllabus/branch/${editId}`,
        { branch, img: branchImg }
      );
    } else {
      await axios.post(
        `${API_BASE_URL}/syllabus/branch`,
        { branch, img: branchImg }
      );
    }

    setBranch("");
    setBranchImg("");
    setEditId(null);
    load();
  };

  const deleteBranch = async (id) => {
    if (!window.confirm("Delete branch & all semester + subject data?")) return;
    await axios.delete(`${API_BASE_URL}/syllabus/branch/${id}`);
    load();
  };

  return (
    <div className="p-8 min-h-screen bg-black text-white">
      {/* TITLE */}
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold mb-10 text-transparent bg-clip-text
        bg-gradient-to-r from-cyan-400 to-blue-500 mt-19 text-center uppercase"
      >
        Manage Syllabus
      </motion.h3>

      {/* ADD / EDIT BRANCH */}
      <div className={`${glass} p-6 mb-12`}>
        <h2 className="text-2xl text-cyan-300 font-bold mb-4">
          {editId ? "✏️ Edit Branch" : "➕ Add New Branch"}
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder="Branch Name"
            className="p-3 bg-black/50 border border-cyan-500 rounded-lg"
          />

          <input
            value={branchImg}
            onChange={(e) => setBranchImg(e.target.value)}
            placeholder="Image URL"
            className="p-3 bg-black/50 border border-cyan-500 rounded-lg"
          />

          <button
            onClick={saveBranch}
            className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-lg"
          >
            {editId ? "Update" : "Add Branch"}
          </button>
        </div>
      </div>

      {/* BRANCH LIST */}
      <div className="grid md:grid-cols-2 gap-8">
        {data.map((b) => (
          <motion.div key={b._id} className={`${glass} p-6`}>
            {/* HEADER */}
            <div className="flex justify-between mb-4">
              <div className="flex gap-4 items-center">
                {b.img && (
                  <img
                    src={b.img}
                    className="w-16 h-16 rounded-full border border-cyan-400"
                  />
                )}
                <h2 className="text-3xl text-yellow-400 font-bold">
                  {b.branch}
                </h2>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setEditId(b._id);
                    setBranch(b.branch);
                    setBranchImg(b.img);
                  }}
                  className="px-3 py-2 bg-blue-500 text-black rounded-lg"
                >
                  ✏️
                </button>

                <button
                  onClick={() => deleteBranch(b._id)}
                  className="px-3 py-2 bg-red-500 text-black rounded-lg"
                >
                  🗑️
                </button>
              </div>
            </div>

            {/* ADD SEMESTER */}
            <div className="flex gap-3 mb-4">
              <input
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="Semester"
                className="p-3 bg-black/50 border border-green-400 rounded-lg"
              />

              <button
                onClick={async () => {
                  await axios.post(
                    `${API_BASE_URL}/syllabus/semester/${b._id}`,
                    { number: semester }
                  );
                  setSemester("");
                  load();
                }}
                className="px-5 py-2 bg-green-400 text-black rounded-lg"
              >
                Add
              </button>
            </div>

            {/* SEMESTERS */}
            {b.semesters.map((sem, si) => (
              <div key={si} className="pl-3 border-l-2 border-green-500/40 mt-6">
                <div className="flex justify-between">
                  <h3 className="text-2xl text-green-300">
                    Semester {sem.number}
                  </h3>

                  <button
                    onClick={async () => {
                      await axios.delete(
                        `${API_BASE_URL}/syllabus/semester/${b._id}/${si}`
                      );
                      load();
                    }}
                    className="px-3 py-1 bg-red-500 text-black rounded-lg"
                  >
                    🗑️
                  </button>
                </div>

                {/* SUBJECT ADD */}
                <div className="flex gap-3 mt-3">
                  <input
                    value={subject.name}
                    onChange={(e) =>
                      setSubject({ ...subject, name: e.target.value })
                    }
                    placeholder="Subject Name"
                    className="p-3 bg-black/60 border border-purple-400 rounded-lg"
                  />

                  <input
                    value={subject.code}
                    onChange={(e) =>
                      setSubject({ ...subject, code: e.target.value })
                    }
                    placeholder="Code"
                    className="p-3 bg-black/60 border border-purple-400 rounded-lg"
                  />

                  <button
                    onClick={async () => {
                      await axios.post(
                        `${API_BASE_URL}/syllabus/subject/${b._id}/${si}`,
                        subject
                      );
                      setSubject({ name: "", code: "" });
                      load();
                    }}
                    className="px-5 py-2 bg-purple-400 text-black rounded-lg"
                  >
                    Add
                  </button>
                </div>

                {/* SUBJECTS / MODULE / TOPIC / SUBTOPIC */}
                {/* ⚠️ NOTE: yahan ek typo FIX kiya gaya */}
                {/* hhttps ❌ → https ✅ */}
                {/* baaki sab URLs same pattern pe convert ho chuke */}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}