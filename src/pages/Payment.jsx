import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

export default function CourseGuidelines() {
  const [agree, setAgree] = useState(false);
  const [email, setEmail] = useState("");
  const amount = 199;
  const title = "Course Enrollment";

  const handlePayment = async () => {
    if (!agree) return alert("Agree to Terms");
    if (!email.includes("@")) return alert("Enter valid email");

    try {
      const res = await axios.post(
        "https://api-freeliotech.onrender.com/api/payu/initiate",
        {
          amount,
          firstname: "Student",
          email,
          phone: "9999999999",
          productinfo: title,
        }
      );

      const data = res.data.payURequest;

      // Auto submit PayU form
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.payuURL;

      Object.keys(data).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data[key];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      alert("Payment initiation failed");
    }
  };

  return (
    <section className="min-h-screen bg-[#04070d] text-white p-10">

      <h1 className="text-4xl font-bold text-cyan-400">
        Course Guidelines & Enrollment
      </h1>

      {/* Terms */}
      <p className="mt-6 text-gray-300">
        Course fee is non-refundable. Certificate after completion.
      </p>

      {/* Email */}
      <input
        className="w-full mt-6 p-3 rounded bg-black border border-cyan-400"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Checkbox */}
      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          checked={agree}
          onChange={() => setAgree(!agree)}
        />
        <span>I agree to Terms & Conditions</span>
      </div>

      {/* Pay Button */}
      <motion.button
        onClick={handlePayment}
        disabled={!agree}
        whileHover={{ scale: 1.05 }}
        className="mt-6 w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-xl"
      >
        Pay ₹199 & Enroll
      </motion.button>

    </section>
  );
}
