import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const items = [
  {
    id: "result",
    title: "Results",
    subtitle: "Latest exam results",
    img: "https://tse2.mm.bing.net/th/id/OIP.tP7ben09OLt2jdATRhXpmQHaHa?pid=Api&P=0&h=180",
    href: "https://beu-bih.ac.in/result-one",
  },
  {
    id: "syllabus",
    title: "Syllabus",
    subtitle: "Course outlines",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS20l-O7ZKy85XIRRhP4SB5M4NJyRrSYpp94Q&s",
    href: "/syllabus",
  },
  {
    id: "exam-form",
    title: "Exam Form",
    subtitle: "Apply / registration",
    img: "https://www.kindpng.com/picc/m/242-2423250_exam-png-transparent-image-exam-png-png-download.png",
    href: "/exam-form",
  },
  {
    id: "spoken-tutorials",
    title: "Spoken Tutorials",
    subtitle: "Learning videos",
    img: "https://tse4.mm.bing.net/th/id/OIP.6iEVOJIEEvgyiqZP0b9bKgAAAA?pid=Api&P=0&h=180",
    href: "https://spoken-tutorial.org/",
  },
  {
    id: "pms",
    title: "PMS",
    subtitle: "Management System",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_O5WMt01VoPauJYXdJUtMy8kF4duy5pqiCHVrgpfwk8p2gLPEH3Mu_zKG6dOs9-rsou8&usqp=CAU",
    href: "/pms",
  },
  {
    id: "pyq",
    title: "PYQ",
    subtitle: "Previous Year Question Papers",
    img: "https://media.istockphoto.com/id/1766371663/vector/bible-with-sunshine-above-vector-logo.jpg?s=612x612&w=0&k=20&c=zFLvCCJwFSR7paU3EC2WLjYBtlTxpqeFfxZaD4-9c2c=",
    href: "/pyq",
  },
  {
    id: "nptel",
    title: "NPTEL",
    subtitle: "Online courses",
    img: "https://www.ilce.in/wp-content/uploads/2022/06/nptellg.png",
    href: "https://nptel.ac.in/",
  },
  {
    id: "beu-news",
    title: "BEU News",
    subtitle: "University updates",
    img: "https://img.freepik.com/premium-vector/megaphone-concept-illustration_114360-19564.jpg?w=360",
    href: "/beu-news",
  },
  {
    id: "college-site",
    title: "College Site",
    subtitle: "Your college link",
    img: "https://static.vecteezy.com/system/resources/previews/046/487/466/non_2x/education-logo-illustration-black-and-white-free-vector.jpg",
    href: "/college",
  },
  {
    id: "beu-site",
    title: "BEU Site",
    subtitle: "Official BEU website",
    img: "https://tse2.mm.bing.net/th/id/OIP.u7FxGolaoifEW7QM3y7zwQAAAA?pid=Api&P=0&h=180",
    href: "https://beu-bih.ac.in/",
  },
];

export default function BeuSection() {
  const navigate = useNavigate();

  const handleClick = (href) => {
    if (href.startsWith("/")) navigate(href);
    else window.open(href, "_blank");
  };

  return (
    <section className="relative py-28 px-6 overflow-hidden text-white">

      {/* ✅ SAME BACKGROUND AS OTHER SECTIONS */}
      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute -top-32 -left-32 w-96 h-96 " />
      <div className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] " />

      <div className="relative z-10 max-w-7xl mx-auto">

     <motion.h2
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  viewport={{ once: true }}
  className="text-center font-semibold
  text-xl sm:text-2xl md:text-3xl lg:text-4xl
  text-sky-400 px-4 uppercase"
>
  Bihar Engineering University
</motion.h2>


        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 mt-20">
          {items.map((it, idx) => (
            <motion.div
              key={idx}
              onClick={() => handleClick(it.href)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="
                p-6 rounded-2xl text-center cursor-pointer
                bg-white/5 backdrop-blur-xl
                border border-white/10
                hover:border-sky-400/50
                hover:shadow-[0_0_40px_rgba(56,189,248,0.4)]
                transition
              "
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden
                              ring-2 ring-sky-400/40">
                <img
                  src={it.img}
                  alt={it.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-lg font-semibold text-sky-300">
                {it.title}
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                {it.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
