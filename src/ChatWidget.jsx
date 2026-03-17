import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMicrophone,
  FaPaperPlane,
  FaComments,
  FaRobot
} from "react-icons/fa";
import robot from "./assets/robot.png";
export default function FLTBot() {

  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [typing, setTyping] = useState(false);

  const chatEndRef = useRef(null);

  const FAQ = [

{ q: ["hello","hi","hey"], a: "Hello 👋 Welcome to Freeliotech. How can I help you today?" },
{ q: ["course","training"], a: "We offer courses like Full Stack Development, AI, ML, Cyber Security and Data Science." },
{ q: ["internship"], a: "Internships are available in Web Development, MERN Stack, Python and AI." },
{ q: ["fees","price","cost"], a: "Most training programs are affordable between ₹499 - ₹799." },
{ q: ["certificate"], a: "After completing training you will receive a verified digital certificate." },

/* COURSE QUESTIONS */

{ q: ["python"], a: "Yes we provide Python programming course." },
{ q: ["react"], a: "React development training is included in Full Stack course." },
{ q: ["mern"], a: "MERN stack training includes MongoDB, Express, React and Node.js." },
{ q: ["ai"], a: "Artificial Intelligence training is available." },
{ q: ["data science"], a: "Data Science course with real projects is available." },
{ q: ["cyber security"], a: "Cyber Security course is available." },
{ q: ["web development"], a: "Full Stack Web Development course is available." },
{ q: ["duration"], a: "Course duration is usually 1 to 3 months." },
{ q: ["online"], a: "All courses are available online." },
{ q: ["live class"], a: "Yes we provide live training sessions." },

/* INTERNSHIP */

{ q: ["internship duration"], a: "Internship duration is usually 1–2 months." },
{ q: ["remote internship"], a: "Yes internships are completely remote." },
{ q: ["project"], a: "You will work on real industry projects." },
{ q: ["experience letter"], a: "Yes experience letter is provided after internship." },
{ q: ["internship certificate"], a: "Yes verified internship certificate is provided." },

/* PAYMENT */

{ q: ["payment"], a: "Payment can be done via UPI, Debit Card or Credit Card." },
{ q: ["upi"], a: "Yes UPI payments are accepted." },
{ q: ["refund"], a: "Fees are generally non refundable." },
{ q: ["discount"], a: "Discount offers may be available during promotions." },
{ q: ["invoice"], a: "Payment receipt will be provided." },

/* ACCOUNT */

{ q: ["register"], a: "You can register from our website registration page." },
{ q: ["login"], a: "Use your email and password to login." },
{ q: ["forgot password"], a: "Click on forgot password to reset." },
{ q: ["dashboard"], a: "After login you will see your student dashboard." },
{ q: ["profile"], a: "You can update your profile from dashboard settings." },

/* CERTIFICATE */

{ q: ["download certificate"], a: "Certificate can be downloaded from your dashboard." },
{ q: ["certificate id"], a: "Each certificate contains unique verification ID." },
{ q: ["qr certificate"], a: "Certificates include QR verification." },
{ q: ["verify certificate"], a: "Companies can verify certificate via QR code." },

/* TECH QUESTIONS */

{ q: ["javascript"], a: "JavaScript training is included in web development course." },
{ q: ["node"], a: "Node.js backend development training is available." },
{ q: ["express"], a: "Express.js API development training is included." },
{ q: ["mongodb"], a: "MongoDB database training is included." },
{ q: ["api"], a: "You will learn how to build APIs." },

/* SUPPORT */

{ q: ["support"], a: "Our support team is available to help you." },
{ q: ["contact"], a: "Contact support@freeliotech.in for help." },
{ q: ["email"], a: "Support email: support@freeliotech.in" },
{ q: ["help"], a: "I can help with courses, internships, certificates and support." },

/* EXTRA QUESTIONS */

{ q: ["mentor"], a: "Expert mentors will guide you during training." },
{ q: ["portfolio"], a: "You will build real portfolio projects." },
{ q: ["job"], a: "Courses help improve job opportunities." },
{ q: ["placement"], a: "Placement guidance may be provided." },
{ q: ["thank"], a: "You're welcome 😊 Happy learning!" }

];
  /* AUTO SCROLL */

  const scrollBottom = () => {
    setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(chat));
    scrollBottom();
  }, [chat]);

  /* VOICE INPUT */

  const startVoiceInput = () => {

    if (!window.webkitSpeechRecognition) {
      alert("Voice input not supported in this browser");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      setMsg(event.results[0][0].transcript);
    };

    recognition.start();
  };

  /* TEXT TO SPEECH */

  const speak = (text) => {

    const speech = new SpeechSynthesisUtterance(text);

    speech.pitch = 1;
    speech.rate = 1;

    speechSynthesis.speak(speech);
  };

  /* SIMPLE AI LOGIC */
const aiReply = async (input) => {

  setTyping(true);

  await new Promise((res) => setTimeout(res, 900));

  const text = input.toLowerCase();

  let reply = "Sorry, I couldn't understand. Please contact support.";

  for (let item of FAQ) {
    if (item.q.some(keyword => text.includes(keyword))) {
      reply = item.a;
      break;
    }
  }

  setTyping(false);

  return reply;
};
  /* SEND MESSAGE */

  const sendMessage = async () => {

    if (!msg.trim()) return;

    const userMsg = { from: "user", text: msg };

    setChat((prev) => [...prev, userMsg]);

    const botText = await aiReply(msg);

    const botMsg = { from: "bot", text: botText };

    setChat((prev) => [...prev, botMsg]);

    speak(botText);

    setMsg("");
  };

  return (
    <>

      {/* FLOATING FLT BOT BUTTON */}

    {/* FLOATING ROBOT IMAGE BUTTON */}

{!open && (

<div className="fixed bottom-6 right-6 z-[9999]">

<button
onClick={() => setOpen(true)}
className="relative hover:scale-110 transition"
>

<img
src={robot}
alt="FLT Bot"
className="w-16 h-16 rounded-full shadow-2xl"
/>

{/* Pulse animation */}

<span className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-40"></span>

</button>

</div>

)}


      {/* CHAT WINDOW */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="
              fixed bottom-20 right-6 w-96
              bg-[#0a0f1d]
              border border-cyan-400/30
              rounded-2xl shadow-2xl
              backdrop-blur-xl z-50
              overflow-hidden
            "
          >

            {/* HEADER */}

            <div className="p-4 bg-cyan-700/40 border-b border-cyan-400/30 flex justify-between items-center">

              <div className="flex items-center gap-2">

                <FaRobot className="text-cyan-300 text-xl" />

                <h2 className="text-xl font-bold text-cyan-300">
                  FLT- AI
                </h2>

              </div>

              <button
                onClick={() => setOpen(false)}
                className="text-gray-300 text-lg"
              >
                ✕
              </button>

            </div>

            {/* CHAT BODY */}

            <div className="h-96 overflow-y-auto px-4 py-3 space-y-3">

              {chat.map((c, i) => (

                <div
                  key={i}
                  className={`max-w-[75%] px-3 py-2 rounded-xl ${
                    c.from === "user"
                      ? "ml-auto bg-cyan-400 text-black"
                      : "mr-auto bg-gray-800 text-gray-200 border border-cyan-400/20"
                  }`}
                >
                  {c.text}
                </div>

              ))}

              {/* TYPING ANIMATION */}

              {typing && (
                <div className="mr-auto bg-gray-700 px-3 py-2 rounded-xl text-gray-300 flex gap-1 w-fit">
                  <span className="animate-pulse">●</span>
                  <span className="animate-pulse">●</span>
                  <span className="animate-pulse">●</span>
                </div>
              )}

              <div ref={chatEndRef}></div>

            </div>

            {/* INPUT */}

            <div className="p-3 bg-[#0e152a] border-t border-cyan-400/20 flex gap-2">

              <button
                onClick={startVoiceInput}
                className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-400"
              >
                <FaMicrophone />
              </button>

              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Ask FLT-Bot..."
                className="
                  flex-1 px-3 py-2 bg-black/40
                  border border-gray-700 rounded-lg
                  outline-none text-gray-200
                "
              />

              <button
                onClick={sendMessage}
                className="p-2 bg-cyan-400 text-black rounded-lg hover:bg-cyan-300"
              >
                <FaPaperPlane />
              </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </>
  );
}