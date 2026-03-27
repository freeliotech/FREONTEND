import React from "react";

export default function ProcessSection() {
  return (
    <div className="bg-black text-white px-6 md:px-16 py-16 space-y-20">

      {/* ===== PROCESS ===== */}
      <div>
        <h2 className="text-sm tracking-widest text-gray-400 mb-10">
          THE PROCESS
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              no: "01",
              title: "Fill out the online application form",
              desc: "To apply for our internship program, please fill out the online application form.",
            },
            {
              no: "02",
              title: "Attach your resume and cover letter.",
              desc: "Upload your resume and cover letter explaining your interest and goals.",
            },
            {
              no: "03",
              title: "Submit the application.",
              desc: "Make sure all fields are completed accurately before submitting.",
            },
            {
              no: "04",
              title: "Wait for review.",
              desc: "You will be contacted if shortlisted.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="
                bg-[#111]
                border border-white/10
                rounded-2xl p-6
                shadow-[0_0_10px_rgba(255,255,255,0.05)]
                hover:bg-purple-600
                hover:shadow-[0_0_12px_rgba(255,255,255,0.25)]
                transition-all duration-300 ease-in-out
                group
              "
            >
              <h1 className="text-5xl font-bold text-purple-400 mb-6 group-hover:text-white transition">
                {item.no}
              </h1>

              <h3 className="text-lg font-semibold mb-3 group-hover:text-white transition">
                {item.title}
              </h3>

              <p className="text-gray-400 text-sm group-hover:text-gray-200 transition">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ===== DURATION ===== */}
      <div className="border border-white/10 rounded-2xl overflow-hidden">

        <div className="grid md:grid-cols-3">

          {[
            {
              no: "01",
              days: "30 Day's",
              weeks: [
                "Week 1: Orientation and Basic Training",
                "Week 2: Project Assignment",
                "Week 3: Development and Reviews",
                "Week 4: Final Testing & Presentation",
              ],
              duration: "4 week's",
            },
            {
              no: "02",
              days: "45 Day's",
              weeks: [
                "Week 1: Orientation",
                "Tools & Technologies",
                "Project Assignment",
                "Week 2-5: Coding & Work",
                "Week 6: Final Presentation",
              ],
              duration: "6 week's",
            },
            {
              no: "03",
              days: "60 Day's",
              weeks: [
                "Week 1: Training",
                "Week 2-4: Core Projects",
                "Week 5: Review",
                "Week 6-7: Advanced Work",
                "Week 8: Final Presentation",
              ],
              duration: "8 week's",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="
                bg-[#111]
                border-r border-white/10 last:border-none
                p-8
                shadow-[0_0_10px_rgba(255,255,255,0.05)]
                hover:bg-purple-600
                hover:shadow-[0_0_12px_rgba(255,255,255,0.25)]
                transition-all duration-300
                group
              "
            >
              <p className="text-sm text-gray-400 mb-2 group-hover:text-white">
                {item.no}
              </p>

              <h2 className="text-3xl font-bold text-purple-400 mb-6 group-hover:text-white transition">
                {item.days}
              </h2>

              <div className="space-y-2 text-sm text-gray-300 group-hover:text-gray-100 transition">
                {item.weeks.map((w, idx) => (
                  <p key={idx}>{w}</p>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-sm text-gray-400 group-hover:text-white">
                ⏱ {item.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}