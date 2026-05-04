import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaComments,
  FaMicrophone,
  FaPaperPlane,
  FaRobot,
  FaTrash,
  FaVolumeUp,
} from "react-icons/fa";

const STORAGE_KEY = "ttic-chat-history";

const DEFAULT_MESSAGE = {
  id: "welcome-message",
  from: "bot",
  text: "Welcome to TTIC Hub. I can help with courses, internships, certificates, fees, and support.",
  time: "Now",
};

const FAQ = [
  {
    q: ["hello", "hi", "hey", "good morning", "good evening"],
    a: "Hello. Welcome to TTIC Hub. How can I help you today?",
  },
  {
    q: ["course", "training", "program"],
    a: "We offer training in Full Stack Development, AI, Machine Learning, Cyber Security, Data Science, and more.",
  },
  {
    q: ["internship", "internships"],
    a: "Internships are available in Web Development, MERN Stack, Python, and AI with project-based learning.",
  },
  {
    q: ["fees", "fee", "price", "cost"],
    a: "Most training programs are budget-friendly and usually range between Rs. 499 and Rs. 799.",
  },
  {
    q: ["certificate", "certification"],
    a: "After successful completion, you receive a verified digital certificate with a unique verification ID.",
  },
  {
    q: ["python"],
    a: "Yes, we provide Python programming training with practical exercises and projects.",
  },
  {
    q: ["react"],
    a: "React training is included in our Full Stack Development track.",
  },
  {
    q: ["mern"],
    a: "Our MERN stack training covers MongoDB, Express, React, and Node.js.",
  },
  {
    q: ["ai", "artificial intelligence"],
    a: "Artificial Intelligence training is available with practical, industry-focused modules.",
  },
  {
    q: ["data science"],
    a: "Yes, we offer Data Science training with project work and hands-on learning.",
  },
  {
    q: ["cyber security", "cybersecurity"],
    a: "Cyber Security training is available for students interested in security fundamentals and tools.",
  },
  {
    q: ["web development", "full stack"],
    a: "We offer Full Stack Web Development training with frontend, backend, and deployment concepts.",
  },
  {
    q: ["duration", "how long", "months"],
    a: "Most courses run for around 1 to 3 months depending on the program.",
  },
  {
    q: ["online", "remote class", "live class", "live classes"],
    a: "Yes, all major courses are available online, including live training sessions.",
  },
  {
    q: ["internship duration"],
    a: "Internship duration is usually 1 to 2 months.",
  },
  {
    q: ["remote internship", "work from home internship"],
    a: "Yes, internships are remote-friendly and can be completed online.",
  },
  {
    q: ["project", "projects", "portfolio"],
    a: "You will work on real-world projects that help build a strong portfolio.",
  },
  {
    q: ["experience letter"],
    a: "Yes, an experience letter is provided after successful internship completion.",
  },
  {
    q: ["internship certificate"],
    a: "Yes, a verified internship certificate is provided.",
  },
  {
    q: ["payment", "pay", "upi", "debit card", "credit card"],
    a: "Payments can be made via UPI, debit card, or credit card.",
  },
  {
    q: ["refund"],
    a: "Fees are generally non-refundable. Please confirm details before payment.",
  },
  {
    q: ["discount", "offer", "offers"],
    a: "Discounts may be available during special promotions or campaigns.",
  },
  {
    q: ["invoice", "receipt"],
    a: "A payment receipt or invoice is provided after successful payment.",
  },
  {
    q: ["register", "registration", "enroll", "enrollment"],
    a: "You can register through the website registration page and follow the enrollment process there.",
  },
  {
    q: ["login", "sign in"],
    a: "Use your registered email and password to log in to your account.",
  },
  {
    q: ["forgot password", "reset password"],
    a: "Use the forgot password option on the login page to reset your password.",
  },
  {
    q: ["dashboard"],
    a: "After login, your student dashboard shows your courses, certificates, and learning details.",
  },
  {
    q: ["profile", "account settings"],
    a: "You can update your profile from the dashboard settings section.",
  },
  {
    q: ["download certificate"],
    a: "Certificates can be downloaded directly from your student dashboard.",
  },
  {
    q: ["certificate id", "verification id", "verify certificate", "qr certificate"],
    a: "Each certificate includes a unique verification ID and QR-based verification support.",
  },
  {
    q: ["javascript", "node", "express", "mongodb", "api"],
    a: "We cover modern web technologies like JavaScript, Node.js, Express.js, MongoDB, and API development.",
  },
  {
    q: ["support", "contact", "email", "help"],
    a: "Our support team is available at support@freeliotech.in for help with courses, internships, certificates, and account issues.",
  },
  {
    q: ["mentor", "mentors"],
    a: "Expert mentors guide learners throughout training and internship programs.",
  },
  {
    q: ["job", "jobs", "placement"],
    a: "Our programs are designed to improve skills, strengthen portfolios, and support job readiness.",
  },
  {
    q: ["thank", "thanks"],
    a: "You are welcome. Happy learning.",
  },
];

const QUICK_ACTIONS = [
  "Courses",
  "Internship",
  "Fees",
  "Certificate",
  "Support",
];

const getCurrentTime = () =>
  new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const createMessage = (from, text) => ({
  id: `${from}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  from,
  text,
  time: getCurrentTime(),
});

const normalizeText = (value) => value.toLowerCase().replace(/[^\w\s]/g, " ");

const getBestReply = (input) => {
  const normalizedInput = normalizeText(input);
  const words = normalizedInput.split(/\s+/).filter(Boolean);

  let bestMatch = null;
  let bestScore = 0;

  FAQ.forEach((item) => {
    const score = item.q.reduce((total, keyword) => {
      const normalizedKeyword = normalizeText(keyword).trim();

      if (!normalizedKeyword) {
        return total;
      }

      if (normalizedInput.includes(normalizedKeyword)) {
        return total + normalizedKeyword.split(" ").length + 2;
      }

      if (words.includes(normalizedKeyword)) {
        return total + 1;
      }

      return total;
    }, 0);

    if (score > bestScore) {
      bestScore = score;
      bestMatch = item;
    }
  });

  if (bestMatch) {
    return bestMatch.a;
  }

  return "I could not fully understand that. Please ask about courses, internships, fees, certificates, or contact support@freeliotech.in.";
};

export default function FLTBot() {
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [typing, setTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [chat, setChat] = useState(() => {
    if (typeof window === "undefined") {
      return [DEFAULT_MESSAGE];
    }

    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      const parsed = saved ? JSON.parse(saved) : null;

      return Array.isArray(parsed) && parsed.length ? parsed : [DEFAULT_MESSAGE];
    } catch {
      return [DEFAULT_MESSAGE];
    }
  });

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  const SpeechRecognition =
    typeof window !== "undefined"
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;

  useEffect(() => {
    setVoiceSupported(Boolean(SpeechRecognition));
  }, [SpeechRecognition]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(chat));
  }, [chat]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [chat, typing]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop?.();

      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const quickPrompts = useMemo(() => QUICK_ACTIONS, []);

  const speak = (text) => {
    if (!speechEnabled || typeof window === "undefined" || !window.speechSynthesis) {
      return;
    }

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);
    speech.pitch = 1;
    speech.rate = 1;
    window.speechSynthesis.speak(speech);
  };

  const aiReply = async (input) => {
    setTyping(true);
    await new Promise((resolve) => window.setTimeout(resolve, 850));
    const reply = getBestReply(input);
    setTyping(false);
    return reply;
  };

  const sendMessage = async (customText) => {
    const text = (customText ?? msg).trim();

    if (!text || typing) {
      return;
    }

    setMsg("");
    setChat((prev) => [...prev, createMessage("user", text)]);

    const botText = await aiReply(text);
    setChat((prev) => [...prev, createMessage("bot", botText)]);
    speak(botText);
  };

  const clearChat = () => {
    setChat([DEFAULT_MESSAGE]);

    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const startVoiceInput = () => {
    if (!SpeechRecognition) {
      window.alert("Voice input is not supported in this browser.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop?.();
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript ?? "";
      setMsg(transcript);
      inputRef.current?.focus();
    };

    recognition.start();
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="fixed bottom-5 right-5 z-[9999]"
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group relative flex items-center gap-3 rounded-full border border-cyan-300/40 bg-slate-950/90 px-4 py-3 text-white shadow-[0_20px_60px_rgba(6,182,212,0.25)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-300/80"
            aria-label="Open TTIC chat assistant"
          >
            <span className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl transition duration-300 group-hover:bg-cyan-300/30" />
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 text-slate-950">
              <FaComments className="text-lg" />
            </span>
            <span className="relative hidden text-left sm:block">
              <span className="block text-xs uppercase tracking-[0.28em] text-cyan-200/70">
                TTIC Help Desk
              </span>
              <span className="block text-sm font-semibold text-white">
                Chat with our assistant
              </span>
            </span>
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-3 bottom-3 z-[9999] mx-auto flex max-h-[85vh] w-auto max-w-[420px] flex-col overflow-hidden rounded-[28px] border border-cyan-300/20 bg-slate-950/95 shadow-[0_28px_80px_rgba(15,23,42,0.75)] backdrop-blur-2xl sm:right-6 sm:left-auto sm:bottom-6 sm:w-[390px]"
          >
            <div className="relative overflow-hidden border-b border-cyan-300/15 bg-gradient-to-r from-cyan-500/20 via-sky-500/10 to-blue-500/20 p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_30%)]" />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-300 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20">
                    <FaRobot className="text-xl" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">TTIC AI Assistant</h2>
                    <p className="text-xs text-cyan-100/70">
                      Online now | Courses | Internships | Support
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSpeechEnabled((prev) => !prev)}
                    className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${
                      speechEnabled
                        ? "border-cyan-300/30 bg-cyan-300/15 text-cyan-100"
                        : "border-white/10 bg-white/5 text-slate-300"
                    }`}
                    aria-label={speechEnabled ? "Disable speech" : "Enable speech"}
                  >
                    <FaVolumeUp />
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10"
                    aria-label="Close chat"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

            <div className="border-b border-cyan-300/10 px-4 py-3">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-100/45">
                  Quick questions
                </p>
                <button
                  type="button"
                  onClick={clearChat}
                  className="flex items-center gap-2 text-xs text-slate-400 transition hover:text-white"
                >
                  <FaTrash />
                  Clear chat
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    className="rounded-full border border-cyan-300/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto bg-[linear-gradient(180deg,rgba(8,47,73,0.12),rgba(2,6,23,0))] px-4 py-4">
              {chat.map((entry) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${entry.from === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-lg ${
                      entry.from === "user"
                        ? "rounded-br-md bg-gradient-to-r from-cyan-300 to-sky-400 text-slate-950"
                        : "rounded-bl-md border border-cyan-300/10 bg-slate-900/80 text-slate-100"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-6">{entry.text}</p>
                    <p
                      className={`mt-2 text-[11px] ${
                        entry.from === "user" ? "text-slate-800/70" : "text-slate-400"
                      }`}
                    >
                      {entry.time}
                    </p>
                  </div>
                </motion.div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md border border-cyan-300/10 bg-slate-900/80 px-4 py-3 text-slate-300 shadow-lg">
                    <div className="flex items-center gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.2s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.1s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            <div className="border-t border-cyan-300/10 bg-slate-950/90 p-4">
              <div className="mb-2 flex items-center justify-between text-xs text-slate-400">
                <span>{voiceSupported ? "Voice input ready" : "Voice input unavailable"}</span>
                <span>{isListening ? "Listening..." : "Press Enter to send"}</span>
              </div>

              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={startVoiceInput}
                  disabled={!voiceSupported}
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl text-white transition ${
                    voiceSupported
                      ? isListening
                        ? "bg-rose-500 hover:bg-rose-400"
                        : "bg-sky-600 hover:bg-sky-500"
                      : "cursor-not-allowed bg-slate-800 text-slate-500"
                  }`}
                  aria-label="Start voice input"
                >
                  <FaMicrophone />
                </button>

                <div className="flex-1 rounded-2xl border border-cyan-300/15 bg-white/[0.04] px-3 py-2 focus-within:border-cyan-300/40">
                  <input
                    ref={inputRef}
                    value={msg}
                    onChange={(event) => setMsg(event.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Ask about courses, internships, fees, certificates..."
                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => sendMessage()}
                  disabled={!msg.trim() || typing}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                  aria-label="Send message"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
