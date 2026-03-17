import { useState, useEffect } from "react";
import axios from "axios";
import { ApiContext } from "../../config/Api"; // ✅ CENTRAL API

export default function ManageMocktest() {
  const API_BASE_URL = ApiContext;

  const [mockData, setMockData] = useState({});
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");

  const [newBranch, setNewBranch] = useState("");
  const [newSemester, setNewSemester] = useState("");
  const [newSubject, setNewSubject] = useState("");

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState({ A: "", B: "", C: "", D: "" });
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [duration, setDuration] = useState("");

  /* ---------------- LOAD MOCKTEST DATA ---------------- */
  useEffect(() => {
    axios.get(`${API_BASE_URL}/mocktest`).then((res) => {
      const format = {};

      res.data.forEach((item) => {
        if (!format[item.branch]) format[item.branch] = {};
        if (!format[item.branch][item.semester])
          format[item.branch][item.semester] = {};
        if (!format[item.branch][item.semester][item.subject])
          format[item.branch][item.semester][item.subject] = [];

        format[item.branch][item.semester][item.subject].push(item);
      });

      setMockData(format);
    });
  }, []);

  /* ---------------- ADD BRANCH (LOCAL) ---------------- */
  const addBranch = () => {
    if (!newBranch) return alert("Enter branch!");
    setMockData((p) => ({ ...p, [newBranch]: {} }));
    setNewBranch("");
  };

  /* ---------------- ADD SEMESTER (LOCAL) ---------------- */
  const addSemester = () => {
    if (!branch) return alert("Select branch!");
    if (!newSemester) return alert("Enter semester!");

    setMockData((prev) => {
      const u = { ...prev };
      if (!u[branch][newSemester]) u[branch][newSemester] = {};
      return u;
    });

    setNewSemester("");
  };

  /* ---------------- ADD SUBJECT (LOCAL) ---------------- */
  const addSubject = () => {
    if (!branch || !semester) return alert("Select branch & semester!");
    if (!newSubject) return alert("Enter subject!");

    setMockData((prev) => {
      const u = { ...prev };
      if (!u[branch][semester][newSubject])
        u[branch][semester][newSubject] = [];
      return u;
    });

    setNewSubject("");
  };

  /* ---------------- ADD QUESTION (API) ---------------- */
  const addQuestion = async () => {
    if (!branch || !semester || !subject)
      return alert("Select all fields!");

    const data = {
      branch,
      semester,
      subject,
      question,
      options,
      correctAnswer,
      duration,
    };

    await axios.post(`${API_BASE_URL}/mocktest/add`, data);

    setMockData((prev) => {
      const u = { ...prev };
      u[branch][semester][subject].push(data);
      return u;
    });

    setQuestion("");
    setOptions({ A: "", B: "", C: "", D: "" });
    setCorrectAnswer("");
    setDuration("");

    alert("Mock Test Question Added!");
  };

  return (
    <div className="pyq-container">
      <h1 className="title">Manage Mocktest</h1>

      {/* ADD BRANCH */}
      <div className="box">
        <h2>Add Branch</h2>
        <input
          className="input"
          value={newBranch}
          placeholder="Branch Name"
          onChange={(e) => setNewBranch(e.target.value)}
        />
        <button className="btn" onClick={addBranch}>
          Add
        </button>
      </div>

      {/* ADD SEMESTER */}
      <div className="box">
        <h2>Add Semester</h2>
        <select
          className="select"
          onChange={(e) => setBranch(e.target.value)}
        >
          <option>Select Branch</option>
          {Object.keys(mockData).map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>

        <input
          className="input"
          placeholder="Semester"
          value={newSemester}
          onChange={(e) => setNewSemester(e.target.value)}
        />

        <button className="btn" onClick={addSemester}>
          Add
        </button>
      </div>

      {/* ADD SUBJECT */}
      <div className="box">
        <h2>Add Subject</h2>

        <select
          className="select"
          onChange={(e) => setSemester(e.target.value)}
        >
          <option>Select Semester</option>
          {branch &&
            Object.keys(mockData[branch] || {}).map((s) => (
              <option key={s}>{s}</option>
            ))}
        </select>

        <input
          className="input"
          placeholder="Subject"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />

        <button className="btn" onClick={addSubject}>
          Add
        </button>
      </div>

      {/* ADD QUESTION */}
      <div className="box">
        <h2>Add Mocktest Question</h2>

        <select
          className="select"
          onChange={(e) => setSubject(e.target.value)}
        >
          <option>Select Subject</option>
          {branch &&
            semester &&
            Object.keys(mockData[branch][semester] || {}).map((s) => (
              <option key={s}>{s}</option>
            ))}
        </select>

        <input
          className="input"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <input
          className="input"
          placeholder="Option A"
          value={options.A}
          onChange={(e) =>
            setOptions({ ...options, A: e.target.value })
          }
        />
        <input
          className="input"
          placeholder="Option B"
          value={options.B}
          onChange={(e) =>
            setOptions({ ...options, B: e.target.value })
          }
        />
        <input
          className="input"
          placeholder="Option C"
          value={options.C}
          onChange={(e) =>
            setOptions({ ...options, C: e.target.value })
          }
        />
        <input
          className="input"
          placeholder="Option D"
          value={options.D}
          onChange={(e) =>
            setOptions({ ...options, D: e.target.value })
          }
        />

        <select
          className="select"
          onChange={(e) => setCorrectAnswer(e.target.value)}
        >
          <option>Select Correct Answer</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
          <option>D</option>
        </select>

        <input
          className="input"
          placeholder="Time Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <button className="btn" onClick={addQuestion}>
          Add Question
        </button>
      </div>
    </div>
  );
}