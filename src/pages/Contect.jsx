import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  FaEnvelope,
  FaPhone,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
  FaWhatsapp
} from "react-icons/fa";
import axios from "axios";

const CONTACT_IMAGE =
  "https://virtunexa.com/wp-content/uploads/2024/03/18.png";

export default function Contact({ user }) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "website",
    message: ""
  });

  const [sending, setSending] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (user) {
      setForm((p) => ({
        ...p,
        name: user.name || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    if (!form.name || !form.email || !form.message) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      setSending(false);
      return alert("Please fill all required fields");
    }

    try {
      const res = await axios.post(
        "https://backend-production-7a212.up.railway.app/api/contact",
        form
      );

      alert(res.data.message || "Message sent successfully!");

      setForm((p) => ({
        ...p,
        message: ""
      }));

    } catch {
      alert("Something went wrong");
    }

    setSending(false);
  };

  return (
    <section className="relative min-h-screen px-6 py-24 overflow-hidden text-white">

      {/* BACKGROUND */}

      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-500/20 blur-[160px]" />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-cyan-400/20 blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* IMAGE */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >

          <motion.img
            src={CONTACT_IMAGE}
            alt="Contact"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="w-[85%] sm:w-[70%] lg:w-[90%] max-w-md"
          />

        </motion.div>

        {/* CONTACT CARD */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl"
        >

          <h1 className="text-4xl font-bold mb-4">
            Get in{" "}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>

          <p className="text-gray-400 mb-8">
            Contact our team for internships, courses, projects or any
            technical support.
          </p>

          {/* CONTACT INFO */}

          <div className="grid sm:grid-cols-2 gap-4 mb-8">

            <InfoCard
              icon={<FaEnvelope />}
              label="Admin"
              value="admin@freliotech.in"
            />

            <InfoCard
              icon={<FaEnvelope />}
              label="Internship"
              value="internship@freliotech.in"
            />

            <InfoCard
              icon={<FaEnvelope />}
              label="Courses"
              value="courses@freliotech.in"
            />

            <InfoCard
              icon={<FaEnvelope />}
              label="Support"
              value="support@freliotech.in"
            />

            <InfoCard
              icon={<FaWhatsapp />}
              label="WhatsApp Support"
              value="+91 6205631578"
              link="https://wa.me/916205631578"
            />

          </div>

          {/* SOCIAL */}

          <div className="flex gap-6 text-2xl mb-8">
            {[FaLinkedinIn, FaInstagram, FaYoutube].map((Icon, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2 }}
                className="text-gray-400 hover:text-sky-400 cursor-pointer"
              >
                <Icon />
              </motion.div>
            ))}
          </div>

          {/* FORM */}

          <motion.form
            onSubmit={handleSubmit}
            animate={shake ? { x: [-6, 6, -6, 6, 0] } : {}}
            className="space-y-5"
          >

            <div className="grid md:grid-cols-2 gap-5">

              <Input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
              />

              <Input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
              />

            </div>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Write your message..."
              className={input}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={sending}
              className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-sky-400 to-cyan-500 text-black"
            >

              {sending ? "Sending..." : "Send Message"}

            </motion.button>

          </motion.form>

        </motion.div>

      </div>

    </section>
  );
}

/* INPUT */

const input =
  "w-full p-3 rounded-xl bg-white/5 border border-white/10 focus:border-sky-400 outline-none";

/* INPUT COMPONENT */

function Input(props) {
  return <input {...props} required className={input} />;
}

/* INFO CARD */

function InfoCard({ icon, label, value, link }) {

  const url =
    link ||
    (value.includes("@")
      ? `mailto:${value}`
      : value.includes("+")
      ? `https://wa.me/916205631578`
      : "#");

  return (
    <motion.a
      href={url}
      target="_blank"
      whileHover={{ y: -4 }}
      className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl"
    >

      <div className="text-sky-400 text-xl">{icon}</div>

      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="font-medium text-white">{value}</p>
      </div>

    </motion.a>
  );
}