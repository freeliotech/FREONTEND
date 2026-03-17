import { motion } from "framer-motion";
import {
  FaUserCheck,
  FaUserTimes,
  FaFileAlt,
  FaUniversity,
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaTimesCircle,
  FaPhoneAlt,
} from "react-icons/fa";

export default function PMSGuidelines() {
  return (
    <section className="relative py-28 px-6 bg-[#020617] text-white overflow-hidden font-inter">

      {/* BACKGROUND GLOW */}
      <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-cyan-500/20 blur-[200px]" />
      <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] bg-purple-500/20 blur-[200px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-7xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-14 shadow-[0_0_40px_rgba(56,189,248,0.25)]"
      >

        {/* HEADER */}
        <h1 className="text-4xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-sky-500 text-transparent bg-clip-text">
          PMS Scholarship Guidelines
        </h1>

        <p className="text-gray-400 mt-4 max-w-3xl leading-relaxed">
          The <b>Post Matric Scholarship (PMS)</b> supports students from
          economically backward sections by providing financial assistance for
          post-matric education under government schemes.
        </p>

        {/* ELIGIBILITY */}
        <InfoTable
          icon={<FaUserCheck />}
          title="Eligibility Criteria"
          color="text-cyan-300"
          data={[
            ["Category", "EBC / BC / SC / ST"],
            ["Income Limit", "As per state government norms"],
            ["Course Level", "Class 11 to Post Graduation"],
            ["Institute", "Government recognized"],
          ]}
        />

        {/* BENEFITS */}
        <InfoTable
          icon={<FaMoneyBillWave />}
          title="Scholarship Benefits"
          color="text-green-300"
          data={[
            ["Tuition Fee", "Full / Partial reimbursement"],
            ["Maintenance Allowance", "Monthly stipend"],
            ["Hostel Support", "Additional allowance for hostellers"],
            ["Direct Benefit Transfer", "Amount credited to bank account"],
          ]}
        />

        {/* DOCUMENTS */}
        <InfoTable
          icon={<FaFileAlt />}
          title="Required Documents"
          color="text-yellow-300"
          data={[
            ["Aadhaar Card", "Identity verification"],
            ["Income Certificate", "Issued by competent authority"],
            ["Caste Certificate", "Mandatory for category validation"],
            ["Bank Passbook", "Student name & active account"],
            ["Marksheet", "Previous academic record"],
          ]}
        />

        {/* TIMELINE */}
        <InfoTable
          icon={<FaCalendarAlt />}
          title="Application Timeline"
          color="text-purple-300"
          data={[
            ["Application Start", "July – August"],
            ["Last Date", "October – November"],
            ["Verification", "November – December"],
            ["Disbursement", "January – March"],
          ]}
        />

        {/* REJECTION */}
        <InfoTable
          icon={<FaTimesCircle />}
          title="Common Rejection Reasons"
          color="text-red-400"
          data={[
            ["Incorrect Documents", "Blurred or invalid uploads"],
            ["Bank Issues", "Inactive or mismatched account"],
            ["Duplicate Application", "Multiple form submissions"],
            ["Academic Failure", "Failed in previous year"],
          ]}
        />

        {/* PORTALS */}
        <div className="mt-16">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-green-300 mb-6">
            <FaUniversity /> Official Application Portals
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 max-w-xl">
            <ApplyLink href="https://state.bihar.gov.in" label="EBC / BC Portal" />
            <ApplyLink href="https://scholarships.gov.in" label="SC / ST Portal" />
          </div>
        </div>

        {/* HELPLINE */}
        <div className="mt-16 bg-cyan-400/10 border border-cyan-400/30 rounded-2xl p-6">
          <h2 className="flex items-center gap-3 text-xl font-bold text-cyan-300 mb-3">
            <FaPhoneAlt /> Help & Support
          </h2>
          <p className="text-gray-300">
            For technical or application-related issues, contact the respective
            scholarship portal helpline or visit your institute’s scholarship
            nodal office.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

/* ================= RESPONSIVE TABLE ================= */

function InfoTable({ icon, title, color, data }) {
  return (
    <div className="mt-14">
      <h2 className={`flex items-center gap-3 text-2xl font-bold ${color} mb-6`}>
        {icon} {title}
      </h2>

      <div className="grid gap-4">
        {data.map(([key, value], i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            <span className="font-semibold text-gray-300">{key}</span>
            <span className="text-gray-400">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= BUTTON ================= */

function ApplyLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-white/5 border border-cyan-400/30 text-cyan-300 font-semibold hover:bg-cyan-400/10 hover:border-cyan-400 transition shadow-[0_0_15px_rgba(0,255,255,0.25)]"
    >
      {label} <FaExternalLinkAlt className="text-sm" />
    </a>
  );
}
