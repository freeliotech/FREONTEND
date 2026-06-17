import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaMicrophone,
  FaPaperPlane,
  FaRobot,
  FaTrash,
  FaVolumeUp,
  FaTimes,
  FaArrowRight,
  FaGraduationCap,
  FaLaptopCode,
  FaCertificate,
  FaShieldAlt,
} from "react-icons/fa";

const STORAGE_KEY = "ttic-chat-history";

const DEFAULT_MESSAGE = {
  id: "welcome",
  from: "bot",
  text: "👋 Hi! I'm your TTIC Assistant. I can help with:\n• Courses & Training\n• Internships\n• Fees & Payments\n• Certificates\n• Technical Support\nHow can I assist you today?",
  time: "Now",
};

// Extended FAQ with rich answers
const FAQ = [
  { keywords: ["hello", "hi", "hey"], answer: "Hello! Welcome to TTIC Hub. Need help with courses, internships, or anything else?" },
  { keywords: ["courses", "training", "program", "learn"], answer: "🎓 We offer: Full Stack Dev, AI/ML, Cyber Security, Data Science, Cloud Computing, UI/UX Design. All include live projects & certificate. Which one interests you?" },
  { keywords: ["internship", "internships"], answer: "💼 Internships available: Web Dev (MERN), Python, AI, Cyber Security. Duration: 1-2 months. Remote, with experience letter & certificate. Want more details?" },
  { keywords: ["fees", "fee", "price", "cost", "payment"], answer: "💰 Most courses: ₹499 - ₹799. Payments via UPI, card, net banking. Discounts available for group registrations. Need specific course pricing?" },
  { keywords: ["certificate", "certification"], answer: "📜 You get a verified digital certificate with unique QR code & verification ID after course/internship completion. Download from dashboard." },
  { keywords: ["python"], answer: "🐍 Python training: Basics to advanced, data structures, OOP, and projects. Duration: 2 months. Enroll now!" },
  { keywords: ["react", "reactjs"], answer: "⚛️ React is part of Full Stack Web Dev course. Learn hooks, state, router, context API, and build real apps." },
  { keywords: ["mern", "full stack"], answer: "🌐 MERN Stack: MongoDB, Express, React, Node.js. Build full‑stack apps. Course includes 5+ projects." },
  { keywords: ["ai", "artificial intelligence", "machine learning", "ml"], answer: "🤖 AI/ML course: Python, Pandas, Scikit‑learn, TensorFlow, real‑world projects. Duration: 3 months." },
  { keywords: ["data science"], answer: "📊 Data Science: Python, SQL, statistics, data visualization, machine learning. Portfolio projects included." },
  { keywords: ["cyber security", "cybersecurity"], answer: "🔒 Cyber Security: Network security, ethical hacking, cryptography, risk management. Hands‑on labs." },
  { keywords: ["cloud", "aws", "azure", "cloud computing"], answer: "☁️ Cloud Computing: AWS, Azure, deployment, serverless, DevOps basics. Practical training." },
  { keywords: ["web development"], answer: "💻 Web Development: HTML, CSS, JS, React, Node.js, MongoDB. Build responsive websites." },
  { keywords: ["duration", "how long", "months"], answer: "⏱️ Most courses: 1‑3 months. Internships: 1‑2 months. Self‑paced options available." },
  { keywords: ["online", "live class", "remote"], answer: "💻 All courses online with live instructor sessions + recorded videos." },
  { keywords: ["project", "projects", "portfolio"], answer: "🛠️ Real‑world projects: e‑commerce, dashboard, AI model, security audit – add to your portfolio." },
  { keywords: ["experience letter"], answer: "✉️ Yes, experience letter provided after completing internship with performance review." },
  { keywords: ["refund", "refund policy"], answer: "⚠️ Fees are non‑refundable. Please confirm all details before payment. Demo classes available." },
  { keywords: ["discount", "offer", "scholarship"], answer: "🎁 Seasonal discounts & referral offers active. Contact support for current deals." },
  { keywords: ["register", "enroll", "signup"], answer: "📝 Register through the website registration form. Fill details, choose course, pay fees, and start learning." },
  { keywords: ["login", "sign in"], answer: "🔐 Use your registered email & password to login. Dashboard shows your courses, certificates, progress." },
  { keywords: ["forgot password", "reset password"], answer: "🔑 Click 'Forgot Password' on login page – reset link sent to your email." },
  { keywords: ["dashboard"], answer: "📊 Student dashboard: view enrolled courses, download certificates, track projects, access support." },
  { keywords: ["profile", "update profile"], answer: "👤 Go to Dashboard → Settings → Update profile, change password, upload photo." },
  { keywords: ["download certificate", "get certificate"], answer: "📄 After course completion, certificate appears in your dashboard. Click 'Download'." },
  { keywords: ["verify certificate", "certificate id"], answer: "✅ Each certificate has a unique ID & QR code. Anyone can verify using the verification page." },
  { keywords: ["javascript", "node.js", "express", "mongodb"], answer: "⚡ We cover JS, Node, Express, MongoDB in Full Stack & Backend courses. Real APIs." },
  { keywords: ["support", "contact", "email", "help"], answer: "📧 Email support@freeliotech.in. Response within 24h. Also chat with us here!" },
  { keywords: ["mentor", "mentorship"], answer: "👨‍🏫 Industry experts mentor you through projects, code reviews, and career guidance." },
  { keywords: ["job", "placement", "career"], answer: "🎯 Resume building, interview prep, LinkedIn optimization. We help you get job‑ready." },
  { keywords: ["thank", "thanks", "appreciate"], answer: "🙏 You're welcome! Keep learning. Is there anything else I can help with?" },
];

const QUICK_ACTIONS = [
  { label: "Courses", icon: <FaLaptopCode /> },
  { label: "Internship", icon: <FaArrowRight /> },
  { label: "Fees", icon: <FaCertificate /> },
  { label: "Certificate", icon: <FaGraduationCap /> },
  { label: "Support", icon: <FaShieldAlt /> },
];

const getCurrentTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const createMessage = (from, text) => ({
  id: `${from}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
  from,
  text,
  time: getCurrentTime(),
});

const normalizeText = (text) => text.toLowerCase().replace(/[^\w\s]/g, " ");

const getBotReply = (userInput) => {
  const normalized = normalizeText(userInput);
  const words = normalized.split(/\s+/).filter(Boolean);
  let best = null;
  let bestScore = 0;

  FAQ.forEach((item) => {
    let score = 0;
    item.keywords.forEach((kw) => {
      const normKw = normalizeText(kw);
      if (normalized.includes(normKw)) score += normKw.split(" ").length + 3;
      else if (words.includes(normKw)) score += 1;
    });
    if (score > bestScore) {
      bestScore = score;
      best = item;
    }
  });

  if (best) return best.answer;
  return "I'm not sure about that. Could you rephrase? You can ask about courses, internships, fees, certificates, or contact support@freeliotech.in.";
};

export default function FLTBot() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [typing, setTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [chat, setChat] = useState(() => {
    if (typeof window === "undefined") return [DEFAULT_MESSAGE];
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : null;
      return parsed && parsed.length ? parsed : [DEFAULT_MESSAGE];
    } catch {
      return [DEFAULT_MESSAGE];
    }
  });

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  const SpeechRecognition = typeof window !== "undefined"
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : null;

  useEffect(() => setVoiceSupported(Boolean(SpeechRecognition)), []);
  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(chat));
  }, [chat]);
  useEffect(() => {
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  }, [chat, typing]);
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop?.();
      if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  const speak = (text) => {
    if (!speechEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1;
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  const getAIResponse = async (input) => {
    setTyping(true);
    await new Promise((r) => setTimeout(r, 700));
    const reply = getBotReply(input);
    setTyping(false);
    return reply;
  };

  const sendMessage = async (customText) => {
    const text = (customText ?? msg).trim();
    if (!text || typing) return;
    setMsg("");
    setChat((prev) => [...prev, createMessage("user", text)]);
    const botReply = await getAIResponse(text);
    setChat((prev) => [...prev, createMessage("bot", botReply)]);
    speak(botReply);
  };

  const clearChat = () => {
    setChat([DEFAULT_MESSAGE]);
    if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
  };

  const startVoice = () => {
    if (!SpeechRecognition) return alert("Voice input not supported.");
    if (isListening) return recognitionRef.current?.stop?.();
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (e) => {
      const transcript = e.results?.[0]?.[0]?.transcript || "";
      setMsg(transcript);
      inputRef.current?.focus();
    };
    recognition.start();
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Robot Floating Button */}
      {!open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 30 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-5 right-5 z-[9999] cursor-pointer group"
          onClick={() => setOpen(true)}
        >
          <div className="relative">
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-ping opacity-30" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl shadow-purple-500/40 transition-transform duration-300 group-hover:scale-110">
              <FaRobot className="text-3xl text-white" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500"></span>
            </span>
          </div>
        </motion.div>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed inset-x-3 bottom-3 z-[9999] mx-auto flex max-h-[85vh] w-auto max-w-[450px] flex-col overflow-hidden rounded-2xl bg-black/80 backdrop-blur-xl border border-purple-500/30 shadow-2xl shadow-purple-500/25 sm:right-6 sm:left-auto sm:bottom-6 sm:w-[420px]"
          >
            {/* Header */}
            <div className="relative border-b border-purple-500/30 bg-gradient-to-r from-purple-600/20 via-pink-600/15 to-cyan-600/20 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg">
                    <FaRobot className="text-lg" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">TTIC Assistant</h2>
                    <p className="text-xs text-purple-200/70">Powered by AI | Online 24/7</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSpeechEnabled(!speechEnabled)}
                    className={`rounded-lg border px-2 py-1.5 text-xs transition ${
                      speechEnabled ? "bg-purple-500/20 border-purple-400/40 text-purple-200" : "bg-white/5 border-white/10 text-gray-400"
                    }`}
                    title={speechEnabled ? "Disable voice replies" : "Enable voice replies"}
                  >
                    <FaVolumeUp />
                  </button>
                  <button
                    onClick={clearChat}
                    className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-xs text-gray-300 hover:bg-white/10"
                    title="Clear chat"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-gray-300 hover:bg-white/10"
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-b border-purple-500/20 px-4 py-3">
              <p className="mb-2 text-xs uppercase tracking-wider text-purple-300/60">Quick questions</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => sendMessage(action.label)}
                    className="flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-white/5 px-3 py-1.5 text-sm text-gray-200 transition hover:bg-purple-500/20 hover:border-purple-400/50"
                  >
                    {action.icon} {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-purple-500/20">
              {chat.map((msgItem) => (
                <motion.div
                  key={msgItem.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msgItem.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-md ${
                      msgItem.from === "user"
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-br-sm"
                        : "bg-white/10 border border-purple-500/20 text-gray-100 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msgItem.text}</p>
                    <p className={`mt-1 text-[10px] ${msgItem.from === "user" ? "text-purple-200/70" : "text-gray-400"}`}>
                      {msgItem.time}
                    </p>
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-purple-500/20 rounded-2xl rounded-bl-sm px-4 py-2.5">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-purple-500/20 bg-black/50 p-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={startVoice}
                  disabled={!voiceSupported}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                    voiceSupported
                      ? isListening
                        ? "bg-red-500/80 text-white"
                        : "bg-purple-600/60 text-white hover:bg-purple-500"
                      : "bg-gray-800 text-gray-500 cursor-not-allowed"
                  }`}
                  title={voiceSupported ? "Voice input" : "Voice not supported"}
                >
                  <FaMicrophone />
                </button>
                <div className="flex-1 rounded-xl border border-purple-500/30 bg-white/5 px-3 py-2 focus-within:border-purple-400">
                  <input
                    ref={inputRef}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Ask about courses, internships, fees..."
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-400"
                  />
                </div>
                <button
                  onClick={() => sendMessage()}
                  disabled={!msg.trim() || typing}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg hover:scale-105 transition disabled:opacity-50 disabled:scale-100"
                >
                  <FaPaperPlane />
                </button>
              </div>
              <div className="mt-2 flex justify-between text-[10px] text-gray-400">
                <span>{voiceSupported ? (isListening ? "🎙️ Listening..." : "🎤 Voice ready") : "Voice unavailable"}</span>
                <span>Press Enter ↵ to send</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}