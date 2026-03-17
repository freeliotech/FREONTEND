import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Result() {
  const { state } = useLocation();
  const { questions, answers } = state;

  let score = 0;
  let attempted = 0;

  questions.forEach((q, i) => {
    if (answers[i]) attempted++;
    if (answers[i] === q.correctAnswer) score++;
  });

  const notAttempted = questions.length - attempted;

  return (
    <section className="min-h-screen bg-[#020617] text-white px-6 py-24">

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl text-center text-green-400 font-extrabold mb-6 drop-shadow-[0_0_15px_green]"
      >
        🎉 Test Completed!
      </motion.h2>

      {/* Score Box */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-lg mx-auto bg-[#0b0f1f]/70 border border-green-400/40 
        shadow-[0_0_25px_rgba(0,255,100,0.25)] p-6 rounded-3xl text-center mb-12"
      >
        <h3 className="text-3xl font-bold text-yellow-400">
          Score: {score} / {questions.length}
        </h3>

        <div className="mt-4 space-y-2 text-lg">
          <p className="text-green-300">✔ Attempted: {attempted}</p>
          <p className="text-red-300">✘ Not Attempted: {notAttempted}</p>
        </div>
      </motion.div>

      {/* All Questions Review */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {questions.map((q, i) => {
          const isCorrect = answers[i] === q.correctAnswer;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0b1125] border border-cyan-400/20 shadow-lg 
              p-6 rounded-2xl hover:shadow-[0_0_20px_cyan] transition-all"
            >
              <p className="font-bold text-lg mb-2">
                {i + 1}. {q.question}
              </p>

              {/* Your Answer */}
              <p className="mt-2 text-md font-semibold">
                Your Answer:{" "}
                <span
                  className={`ml-2 px-2 py-1 rounded ${
                    isCorrect
                      ? "text-green-300 bg-green-900/40"
                      : "text-red-300 bg-red-900/40"
                  }`}
                >
                  {answers[i] || "Not Answered"}
                </span>
              </p>

              {/* Correct Answer */}
              <p className="mt-2 text-md font-semibold">
                Correct Answer:{" "}
                <span className="ml-2 text-green-300 bg-green-900/40 px-2 py-1 rounded">
                  {q.correctAnswer}
                </span>
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Back Button */}
      <div className="text-center mt-16">
        <Link
          to="/"
          className="px-8 py-3 bg-cyan-400 text-black font-bold rounded-xl 
          shadow-[0_0_20px_cyan] hover:bg-cyan-300 transition-all"
        >
          🔙 Back to Home
        </Link>
      </div>
    </section>
  );
}
