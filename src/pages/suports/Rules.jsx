import { motion } from "framer-motion";

export default function Rules() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-[#050b14] to-black text-gray-200 flex items-center justify-center px-6 py-20 font-inter mt-5">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full bg-black/60 backdrop-blur-xl border border-yellow-500/20 rounded-2xl p-10 shadow-[0_0_60px_rgba(234,179,8,0.15)]"
      >
        {/* Title */}
        <motion.h2
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-yellow-400 mb-10 drop-shadow-[0_0_20px_gold]"
        >
          Rules & Regulations
        </motion.h2>

        <div className="space-y-6 leading-relaxed text-center md:text-left">

          <p className="text-lg">
            These rules ensure a safe, fair, and professional environment on  
            <span className="text-yellow-400 font-semibold"> Freeliotech</span>.
          </p>

          <RuleSection title="1. Respect & Conduct">
            <li>No harassment, bullying, or abusive language</li>
            <li>Respect mentors, admins, and fellow users</li>
            <li>Professional behavior is mandatory</li>
          </RuleSection>

          <RuleSection title="2. Academic Integrity">
            <li>No cheating in exams or mock tests</li>
            <li>No impersonation or fake accounts</li>
            <li>Sharing answers or paid content is prohibited</li>
          </RuleSection>

          <RuleSection title="3. Content Usage Rules">
            <li>Paid content must not be downloaded illegally</li>
            <li>Notes, PDFs, videos cannot be shared publicly</li>
            <li>Unauthorized reproduction is a violation</li>
          </RuleSection>

          <RuleSection title="4. Technical Rules">
            <li>No hacking or unauthorized access</li>
            <li>No malicious scripts or harmful activities</li>
            <li>Suspicious behavior may result in a ban</li>
          </RuleSection>

          <RuleSection title="5. Internship Regulations">
            <li>Accurate academic & KYC details required</li>
            <li>Fake documents lead to termination</li>
            <li>Maintain professional communication</li>
          </RuleSection>

          <RuleSection title="6. Penalties">
            <li>Temporary account suspension</li>
            <li>Permanent account ban</li>
            <li>Legal action for serious violations</li>
          </RuleSection>

        </div>
      </motion.div>
    </section>
  );
}

/* Reusable Rule Section */
function RuleSection({ title, children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="bg-yellow-500/5 border border-yellow-500/10 rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold text-yellow-300 mb-3">
        {title}
      </h3>

      <ul className="list-disc ml-6 space-y-1 text-gray-300">
        {children}
      </ul>
    </motion.div>
  );
}
