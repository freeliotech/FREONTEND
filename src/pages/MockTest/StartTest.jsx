import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function StartTest() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const branch = searchParams.get("branch");
  const semester = searchParams.get("semester");
  const subject = searchParams.get("subject");

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [review, setReview] = useState({});
  const [time, setTime] = useState(0);

  /* ------------ LOAD QUESTIONS ------------- */
  useEffect(() => {
    fetch("https://api-freeliotech.onrender.com/api/mocktest")
      .then((res) => res.json())
      .then((all) => {
        const filtered = all.filter(
          (q) =>
            q.branch === branch &&
            q.semester === semester &&
            q.subject === subject
        );
        setQuestions(filtered);
        if (filtered.length) setTime(filtered[0].duration * 60);
      });
  }, []);

  /* ------------ TIMER ------------- */
  useEffect(() => {
    if (time <= 0 && questions.length > 0) return submitTest();
    const t = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(t);
  }, [time]);

  const submitTest = () => {
    navigate("/mock-result", { state: { questions, answers } });
  };

  const total = questions.length;
  const attempted = Object.keys(answers).length;
  const reviewed = Object.keys(review).length;
  const notAttempted = total - attempted;
  const progress = questions.length
    ? ((index + 1) / questions.length) * 100
    : 0;

  const q = questions[index];

  return (
    <section className="relative min-h-screen px-6 py-10 pt-28 text-white overflow-hidden">

      {/* 🔥 SAME GLOBAL BACKGROUND */}
      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/20 blur-[160px]" />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-cyan-400/20 blur-[180px]" />

      {/* ================= HEADER ================= */}
      <div className="
        fixed top-0 left-0 w-full z-50
        bg-[#0a0f24]/80 backdrop-blur-xl
        border-b border-white/10
        px-6 py-4 flex justify-between items-center
      ">
        <h2 className="text-xl font-bold text-sky-400">
          {subject} — Mock Test
        </h2>

        <motion.div
          initial={{ scale: 0.85 }}
          animate={{ scale: 1 }}
          className="
            bg-red-500 text-black font-bold
            px-4 py-2 rounded-xl
            shadow-[0_0_18px_rgba(239,68,68,0.8)]
          "
        >
          ⏳ {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
        </motion.div>
      </div>

      {/* ================= MAIN ================= */}
      <div className="relative z-10 flex gap-6 mt-6 max-w-7xl mx-auto">

        {/* LEFT PANEL */}
        <div className="flex-1">

          {/* Progress */}
          <div className="w-full bg-white/10 h-2 rounded-full mt-4">
            <div
              className="bg-sky-400 h-2 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h3 className="text-2xl mt-6 font-bold text-yellow-400">
            Question {index + 1} / {questions.length}
          </h3>

          {q && (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                bg-white/5 backdrop-blur-xl
                mt-6 p-6 rounded-2xl
                border border-white/10
                shadow-[0_0_30px_rgba(56,189,248,0.25)]
              "
            >
              <p className="text-lg font-semibold leading-relaxed mb-6">
                {q.question}
              </p>

              {/* OPTIONS */}
              <div className="space-y-4">
                {["A", "B", "C", "D"].map((opt) => (
                  <label
                    key={opt}
                    className={`
                      block p-4 rounded-xl cursor-pointer
                      border transition
                      ${
                        answers[index] === opt
                          ? "bg-sky-500/20 border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                          : "bg-black/40 border-white/10 hover:border-sky-400/40"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      className="hidden"
                      checked={answers[index] === opt}
                      onChange={() =>
                        setAnswers({ ...answers, [index]: opt })
                      }
                    />
                    <span className="font-bold text-sky-300">{opt}.</span>{" "}
                    {q.options[opt]}
                  </label>
                ))}
              </div>

              {/* REVIEW */}
              <button
                onClick={() =>
                  setReview({ ...review, [index]: !review[index] })
                }
                className={`
                  mt-6 px-4 py-2 rounded-xl font-semibold
                  ${
                    review[index]
                      ? "bg-purple-500 text-black"
                      : "bg-white/10 text-white"
                  }
                `}
              >
                🔖 {review[index] ? "Remove Review" : "Mark for Review"}
              </button>
            </motion.div>
          )}

          {/* NAV BUTTONS */}
          <div className="flex justify-between mt-10">
            <button
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
              className="px-6 py-3 bg-white/10 rounded-xl disabled:opacity-40"
            >
              ⬅ Previous
            </button>

            {index + 1 === questions.length ? (
              <button
                onClick={submitTest}
                className="
                  px-8 py-3 rounded-xl font-bold
                  bg-green-500 text-black
                  shadow-[0_0_20px_rgba(34,197,94,0.8)]
                "
              >
                Submit ✔
              </button>
            ) : (
              <button
                onClick={() => setIndex(index + 1)}
                className="
                  px-8 py-3 rounded-xl
                  bg-sky-500 text-black
                  shadow-[0_0_20px_rgba(56,189,248,0.8)]
                "
              >
                Next ➡
              </button>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="
          w-72 bg-white/5 backdrop-blur-xl
          p-5 rounded-2xl
          border border-white/10
          sticky top-24 h-fit
        ">
          <h3 className="text-xl mb-4 text-sky-300 font-bold">
            📊 Test Summary
          </h3>

          <div className="space-y-2 text-sm">
            <p>Total: <span className="text-yellow-400">{total}</span></p>
            <p>Attempted: <span className="text-green-400">{attempted}</span></p>
            <p>Not Attempted: <span className="text-red-400">{notAttempted}</span></p>
            <p>Review: <span className="text-purple-400">{reviewed}</span></p>
          </div>

          <hr className="my-4 border-white/10" />

          <div className="grid grid-cols-5 gap-3">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`
                  w-10 h-10 rounded-xl font-bold text-sm
                  ${
                    answers[i]
                      ? "bg-green-500 text-black"
                      : review[i]
                      ? "bg-purple-500 text-black"
                      : "bg-white/10 text-white"
                  }
                `}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
