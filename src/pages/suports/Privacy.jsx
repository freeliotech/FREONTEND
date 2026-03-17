import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-[#050b14] to-black text-gray-200 flex items-center justify-center px-6 py-20 font-inter mt-5">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full bg-black/60 backdrop-blur-xl border border-green-500/20 rounded-2xl p-10 shadow-[0_0_60px_rgba(34,197,94,0.15)]"
      >
        {/* Title */}
        <motion.h2
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-green-400 mb-10 drop-shadow-[0_0_20px_#4ade80]"
        >
          Privacy Policy
        </motion.h2>

        <div className="space-y-6 leading-relaxed text-center md:text-left">

          <p className="text-lg">
            At <span className="text-green-400 font-semibold">Freeliotech</span>,  
            we respect your privacy and are committed to protecting your personal data.
          </p>

          <Section title="1. Information We Collect">
            <li>Name, email address, and phone number</li>
            <li>Login activity, browser & device information</li>
            <li>Uploaded documents for internship or ID verification</li>
            <li>Mock test results, progress, and performance data</li>
          </Section>

          <Section title="2. Purpose of Data Collection">
            <li>User authentication & account management</li>
            <li>Certificate and scorecard generation</li>
            <li>Platform improvement and analytics</li>
            <li>Fraud prevention and system security</li>
          </Section>

          <Section title="3. Data Sharing Policy">
            <li>No selling of personal data</li>
            <li>Trusted verification & certification partners</li>
            <li>Secure payment gateways</li>
            <li>Legal authorities if required by law</li>
          </Section>

          <Section title="4. Cookies & Tracking">
            <p>
              Cookies help us manage sessions, analyze traffic, and improve user experience.
            </p>
          </Section>

          <Section title="5. Data Security">
            <li>Encrypted storage & secure servers</li>
            <li>Token-based authentication</li>
            <li>Protected cloud infrastructure</li>
            <li>Regular security audits</li>
          </Section>

          <Section title="6. Your Rights">
            <li>Request account deletion</li>
            <li>Edit or update personal data</li>
            <li>Opt-out of notifications</li>
            <li>Request a copy of stored information</li>
          </Section>

          <Section title="7. Policy Updates">
            <p>
              This policy may be updated periodically. Continued use implies acceptance.
            </p>
          </Section>

        </div>
      </motion.div>
    </section>
  );
}

/* Reusable Section Component */
function Section({ title, children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="bg-green-500/5 border border-green-500/10 rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold text-green-300 mb-3">{title}</h3>
      {Array.isArray(children) ? (
        <ul className="list-disc ml-6 space-y-1 text-gray-300">
          {children}
        </ul>
      ) : (
        <div className="text-gray-300">{children}</div>
      )}
    </motion.div>
  );
}
