import { motion } from "framer-motion";

export default function Terms() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-[#050b14] to-black text-gray-200 flex items-center justify-center px-6 py-20 font-inter mt-5">
      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl w-full bg-black/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-10 shadow-[0_0_60px_rgba(34,211,238,0.15)]"
      >
        {/* Title */}
        <motion.h2
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center text-cyan-400 mb-10 drop-shadow-[0_0_20px_cyan]"
        >
          Terms & Conditions
        </motion.h2>

        <div className="space-y-6 leading-relaxed text-center md:text-left text-gray-300">

          <p className="text-lg">
            These Terms & Conditions govern your access and use of{" "}
            <span className="text-cyan-400 font-semibold">
Tech Training, Innovation & Certification Hub</span>. 
            By using our services, you agree to comply with these Terms.
          </p>

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing this platform, you confirm that you have read,
              understood, and agreed to all policies and applicable laws.
              If you disagree, please stop using the platform immediately.
            </p>
          </Section>

          <Section title="2. User Eligibility">
            <li>Minimum age requirement: 16 years</li>
            <li>Accurate and verifiable user information</li>
            <li>Parental consent required for users under 18</li>
          </Section>

          <Section title="3. Account Responsibilities">
            <li>Maintain confidentiality of login credentials</li>
            <li>No responsibility for unauthorized account usage</li>
            <li>Multiple or fake accounts may lead to suspension</li>
          </Section>

          <Section title="4. Payments & Billing">
            <p>
              All payments for courses, mock tests, certifications, and internships
              are final and non-refundable once activated.
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>No refunds after activation</li>
              <li>Gateway charges may apply</li>
              <li>Pricing may change without prior notice</li>
            </ul>
          </Section>

          <Section title="5. User Restrictions">
            <li>No redistribution or resale of premium content</li>
            <li>No hacking, malware, or system abuse</li>
            <li>No misuse of mock tests or exam systems</li>
          </Section>

          <Section title="6. Intellectual Property">
            <p>
              All videos, notes, mock tests, logos, codes, and digital assets
              belong exclusively to Freeliotech. Unauthorized use may
              result in legal action.
            </p>
          </Section>

          <Section title="7. Modification of Terms">
            <p>
              Freeliotech reserves the right to update these Terms at any time.
              Continued usage indicates acceptance of revised terms.
            </p>
          </Section>

          <Section title="8. Termination of Services">
            <p>
              We may suspend or terminate accounts for rule violations,
              suspicious activity, or legal compliance issues.
            </p>
          </Section>

        </div>
      </motion.div>
    </section>
  );
}

/* Reusable Section Component (same as Privacy Policy) */
function Section({ title, children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="bg-cyan-500/5 border border-cyan-500/10 rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold text-cyan-300 mb-3">{title}</h3>
      {Array.isArray(children) ? (
        <ul className="list-disc ml-6 space-y-1">{children}</ul>
      ) : (
        <div>{children}</div>
      )}
    </motion.div>
  );
}
