import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function ManagePyq() {
  const [pyqData, setPyqData] = useState({});
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");

  const [newBranch, setNewBranch] = useState("");
  const [newSemester, setNewSemester] = useState("");
  const [newSubject, setNewSubject] = useState("");

  const [year, setYear] = useState("");
  const [img, setImg] = useState("");
  const [pdf, setPdf] = useState(null);

  /* ---------------- LOAD ALL PYQ ---------------- */
  async function loadPYQ() {
    const res = await axios.get("https://backend-production-7a212.up.railway.app/api/pyq");

    const formatted = {};

    res.data.forEach((item) => {
      if (!formatted[item.branch]) formatted[item.branch] = {};
      if (!formatted[item.branch][item.semester])
        formatted[item.branch][item.semester] = {};
      if (!formatted[item.branch][item.semester][item.subject])
        formatted[item.branch][item.semester][item.subject] = [];

      formatted[item.branch][item.semester][item.subject].push(item);
    });

    setPyqData(formatted);
  }

  useEffect(() => {
    loadPYQ();
  }, []);

  /* ---------------- ADD BRANCH ---------------- */
  const addBranch = async () => {
    if (!newBranch) return alert("Enter branch!");

    await axios.post("https://backend-production-7a212.up.railway.app/api/pyq/add-branch", {
      branch: newBranch,
    });

    setPyqData((prev) => ({ ...prev, [newBranch]: {} }));
    setNewBranch("");
    alert("Branch Added!");
  };

  /* ---------------- ADD SEMESTER ---------------- */
  const addSemester = () => {
    if (!branch) return alert("Select branch first!");
    if (!newSemester) return alert("Enter semester!");

    setPyqData((prev) => {
      const updated = { ...prev };
      if (!updated[branch][newSemester]) updated[branch][newSemester] = {};
      return updated;
    });

    setNewSemester("");
    alert("Semester Added!");
  };

  /* ---------------- ADD SUBJECT ---------------- */
  const addSubject = () => {
    if (!branch) return alert("Select branch!");
    if (!semester) return alert("Select semester!");
    if (!newSubject) return alert("Enter subject!");

    setPyqData((prev) => {
      const updated = { ...prev };
      if (!updated[branch][semester][newSubject])
        updated[branch][semester][newSubject] = [];
      return updated;
    });

    setNewSubject("");
    alert("Subject Added!");
  };

  /* ---------------- ADD PYQ (PDF UPLOAD) ---------------- */
  const addPYQ = async () => {
    if (!branch || !semester || !subject)
      return alert("Select all fields!");

    const fd = new FormData();
    fd.append("branch", branch);
    fd.append("semester", semester);
    fd.append("subject", subject);
    fd.append("year", year);
    fd.append("img", img);
    fd.append("pdf", pdf);

    await axios.post("https://backend-production-7a212.up.railway.app/api/pyq/add", fd);

    alert("PYQ Added!");
    setYear("");
    setImg("");
    setPdf(null);
    loadPYQ();
  };

  /* ---------------- DELETE PYQ ---------------- */
  const deletePYQ = async (id) => {
    if (!window.confirm("Are you sure to delete this PYQ ?")) return;

    await axios.delete(`https://backend-production-7a212.up.railway.app/api/pyq/${id}`);
    alert("Deleted Successfully!");
    loadPYQ();
  };

  return (
    <section className="min-h-screen bg-[#020617] text-white p-10">
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-bold text-center text-cyan-400 mb-12 mt-15 drop-shadow-[0_0_25px_cyan]"
      >
        🛠 Manage PYQ — Add Branch, Semester, Subjects & Papers
      </motion.h1>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* ---------------- ADD BRANCH ---------------- */}
        <div className="bg-[#0a0f24]/70 p-6 rounded-2xl border border-yellow-400/40 shadow-xl backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-yellow-400 mb-5">➕ Add Branch</h2>

          <input
            className="w-full bg-black/40 p-3 border border-yellow-400/40 rounded-xl text-yellow-300 mb-4"
            placeholder="Enter Branch (e.g. CSE)"
            value={newBranch}
            onChange={(e) => setNewBranch(e.target.value)}
          />

          <button
            onClick={addBranch}
            className="w-full bg-yellow-400 text-black py-2 rounded-xl font-bold hover:bg-yellow-300"
          >
            Add Branch
          </button>
        </div>

        {/* ---------------- ADD SEMESTER ---------------- */}
        <div className="bg-[#0a0f24]/70 p-6 rounded-2xl border border-purple-400/40 shadow-xl">
          <h2 className="text-2xl font-bold text-purple-400 mb-5">➕ Add Semester</h2>

          <select
            className="w-full bg-black/40 p-3 rounded-xl border border-purple-400/40 mb-3"
            onChange={(e) => setBranch(e.target.value)}
          >
            <option>Select Branch</option>
            {Object.keys(pyqData).map((b) => <option key={b}>{b}</option>)}
          </select>

          <input
            className="w-full bg-black/40 p-3 rounded-xl border border-purple-400/40 mb-3"
            placeholder="Enter Semester (e.g. 1st)"
            value={newSemester}
            onChange={(e) => setNewSemester(e.target.value)}
          />

          <button
            onClick={addSemester}
            className="w-full bg-purple-400 text-black py-2 rounded-xl font-bold hover:bg-purple-300"
          >
            Add Semester
          </button>
        </div>

        {/* ---------------- ADD SUBJECT ---------------- */}
        <div className="bg-[#0a0f24]/70 p-6 rounded-2xl border border-green-400/40 shadow-xl">
          <h2 className="text-2xl font-bold text-green-400 mb-5">➕ Add Subject</h2>

          <select
            className="w-full bg-black/40 p-3 rounded-xl border border-green-400/40 mb-3"
            onChange={(e) => setBranch(e.target.value)}
          >
            <option>Select Branch</option>
            {Object.keys(pyqData).map((b) => <option key={b}>{b}</option>)}
          </select>

          <select
            className="w-full bg-black/40 p-3 rounded-xl border border-green-400/40 mb-3"
            onChange={(e) => setSemester(e.target.value)}
          >
            <option>Select Semester</option>
            {branch &&
              Object.keys(pyqData[branch] || {}).map((s) => (
                <option key={s}>{s}</option>
              ))}
          </select>

          <input
            className="w-full bg-black/40 p-3 rounded-xl border border-green-400/40 mb-3"
            placeholder="Enter Subject"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />

          <button
            onClick={addSubject}
            className="w-full bg-green-400 text-black py-2 rounded-xl font-bold hover:bg-green-300"
          >
            Add Subject
          </button>
        </div>

        {/* ---------------- ADD NEW PYQ ---------------- */}
        <div className="bg-[#0a0f24]/70 p-8 rounded-3xl border border-cyan-400/40 shadow-xl backdrop-blur-xl">
          <h2 className="text-cyan-300 text-2xl font-bold mb-6">📄 Add New PYQ Paper</h2>

          <div className="space-y-4">

            <select
              className="w-full bg-[#0d122b] p-3 rounded-xl border border-cyan-400/40"
              onChange={(e) => setBranch(e.target.value)}
            >
              <option>Select Branch</option>
              {Object.keys(pyqData).map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>

            <select
              className="w-full bg-[#0d122b] p-3 rounded-xl border border-cyan-400/40"
              onChange={(e) => setSemester(e.target.value)}
            >
              <option>Select Semester</option>
              {branch &&
                Object.keys(pyqData[branch] || {}).map((s) => (
                  <option key={s}>{s}</option>
                ))}
            </select>

            <select
              className="w-full bg-[#0d122b] p-3 rounded-xl border border-cyan-400/40"
              onChange={(e) => setSubject(e.target.value)}
            >
              <option>Select Subject</option>
              {branch &&
                semester &&
                Object.keys(pyqData[branch][semester] || {}).map((s) => (
                  <option key={s}>{s}</option>
                ))}
            </select>

            <input
              className="w-full bg-[#0d122b] p-3 rounded-xl border border-cyan-400/40"
              placeholder="Enter Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />

            <input
              className="w-full bg-[#0d122b] p-3 rounded-xl border border-cyan-400/40"
              placeholder="Image URL (optional)"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />

            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdf(e.target.files[0])}
              className="w-full p-3 bg-[#0d122b] border border-cyan-400/40 rounded-xl text-cyan-300"
            />

            <button
              onClick={addPYQ}
              className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 py-3 rounded-xl font-bold"
            >
              Add PYQ
            </button>
          </div>
        </div>
      </div>

      {/* ---------------- LIST of ALL PYQ ---------------- */}
      <h2 className="text-3xl text-cyan-300 font-bold mt-14 mb-4">📚 All PYQ Papers</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {Object.keys(pyqData).map((b) =>
          Object.keys(pyqData[b]).map((sem) =>
            Object.keys(pyqData[b][sem]).map((sub) =>
              pyqData[b][sem][sub].map((p) => (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#0f172a] border border-cyan-400/30 rounded-xl p-5 shadow-xl"
                >
                  <h3 className="text-xl font-bold text-cyan-300">{p.subject}</h3>
                  <p className="text-gray-400">Year: {p.year}</p>
                  <p className="text-gray-400">Branch: {p.branch}</p>

                  {p.img && (
                    <img src={p.img} className="mt-3 rounded-lg h-32 w-full object-cover" />
                  )}

                  {p.pdf && (
                    <a
                      href={`https://api-freeliotech.onrender.com${p.pdf}`}
                      target="_blank"
                      className="block mt-3 bg-cyan-500 text-black py-2 rounded-lg text-center"
                    >
                      📄 View PDF
                    </a>
                  )}

                  <button
                    onClick={() => deletePYQ(p._id)}
                    className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-400"
                  >
                    ❌ Delete
                  </button>
                </motion.div>
              ))
            )
          )
        )}
      </div>
    </section>
  );
}
