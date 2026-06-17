import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import webimage from "../../assets/web_image.png";

import {
  FaRocket,
  FaShieldAlt,
  FaCloud,
  FaReact,
  FaNodeJs,
  FaLaptopCode,
  FaShoppingBag,
  FaSchool,
  FaHospital,
  FaGlobe,
  FaBriefcase,
  FaStar,
  FaPlay,
  FaQuoteLeft,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaChevronDown,
  FaCode,
  FaChartLine,
  FaMobileAlt,
  FaSearch,
  FaUsers,
  FaAward,
  FaClock,
  FaHeadset,
} from "react-icons/fa";

import { SiNextdotjs, SiMongodb, SiTailwindcss, SiFirebase, SiGraphql, SiTypescript, SiPrisma, SiDocker } from "react-icons/si";

export default function WebsiteDevelopmentPage() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [counters, setCounters] = useState({
    websites: 0,
    clients: 0,
    satisfaction: 0,
    speed: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCounters(prev => ({
        websites: prev.websites < 250 ? prev.websites + 3 : 250,
        clients: prev.clients < 180 ? prev.clients + 2 : 180,
        satisfaction: prev.satisfaction < 99 ? prev.satisfaction + 1 : 99,
        speed: prev.speed < 100 ? prev.speed + 1 : 100
      }));
    }, 30);
    return () => clearInterval(timer);
  }, []);

  const websiteTypes = [
    {
      title: "Business Websites",
      icon: <FaBriefcase />,
      img: "https://images.unsplash.com/photo-1556155092-8707de31f9c4?w=400&h=400&fit=crop",
      description: "Professional corporate websites that build trust and credibility",
      features: ["Company Profile", "Services Showcase", "Contact Forms", "Blog Integration", "Client Portal"]
    },
    {
      title: "E-Commerce Websites",
      icon: <FaShoppingBag />,
      img: "https://images.unsplash.com/photo-1607082352121-fa243f3dde32?w=400&h=400&fit=crop",
      description: "Powerful online stores with seamless payment integration",
      features: ["Product Catalog", "Cart & Checkout", "Payment Gateway", "Order Tracking", "Inventory Management"]
    },
    {
      title: "Educational Websites",
      icon: <FaSchool />,
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop",
      description: "Interactive learning management systems for modern education",
      features: ["Course Management", "Video Lectures", "Quizzes & Exams", "Certificates", "Student Dashboard"]
    },
    {
      title: "Healthcare Websites",
      icon: <FaHospital />,
      img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=400&fit=crop",
      description: "HIPAA compliant medical websites for healthcare providers",
      features: ["Appointment Booking", "Patient Portal", "Telemedicine", "Prescriptions", "Medical Records"]
    },
    {
      title: "Portfolio Websites",
      icon: <FaLaptopCode />,
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop",
      description: "Stunning portfolios that showcase your best work",
      features: ["Project Gallery", "Case Studies", "Client Testimonials", "Contact Forms", "Resume/CV"]
    },
    {
      title: "SaaS Websites",
      icon: <FaGlobe />,
      img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=400&fit=crop",
      description: "Scalable software-as-a-service platforms with subscription models",
      features: ["Subscription Plans", "User Dashboard", "API Access", "Analytics", "Billing System"]
    }
  ];

  const liveProjects = [
    {
      title: "TechStore E-Commerce",
      category: "E-Commerce",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?w=600&h=400&fit=crop",
      description: "Modern electronics store with 10k+ products and seamless checkout"
    },
    {
      title: "EduLearn Platform",
      category: "Education",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?w=600&h=400&fit=crop",
      description: "Online learning platform with 50k+ students and interactive courses"
    },
    {
      title: "MediCare Portal",
      category: "Healthcare",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?w=600&h=400&fit=crop",
      description: "Patient management system for hospitals with 24/7 support"
    }
  ];

  const technologies = [
    { name: "React.js", icon: <FaReact />, level: "95%", color: "#61DAFB", description: "Frontend Library" },
    { name: "Next.js", icon: <SiNextdotjs />, level: "92%", color: "#000000", description: "React Framework" },
    { name: "Node.js", icon: <FaNodeJs />, level: "90%", color: "#339933", description: "Backend Runtime" },
    { name: "TypeScript", icon: <SiTypescript />, level: "88%", color: "#3178C6", description: "Type Safety" },
    { name: "MongoDB", icon: <SiMongodb />, level: "87%", color: "#47A248", description: "NoSQL Database" },
    { name: "TailwindCSS", icon: <SiTailwindcss />, level: "94%", color: "#06B6D4", description: "CSS Framework" },
    { name: "Firebase", icon: <SiFirebase />, level: "89%", color: "#FFCA28", description: "Backend Service" },
    { name: "GraphQL", icon: <SiGraphql />, level: "85%", color: "#E10098", description: "API Query Language" }
  ];

  const features = [
    { icon: <FaRocket />, title: "Lightning Fast Speed", desc: "Optimized performance with 95+ PageSpeed score and instant loading", color: "from-cyan-400 to-blue-400" },
    { icon: <FaShieldAlt />, title: "Secure & Reliable", desc: "SSL encryption, XSS protection, firewalls, and regular security backups", color: "from-green-400 to-emerald-400" },
    { icon: <FaCloud />, title: "Cloud Optimized", desc: "AWS, Vercel, Netlify deployment with auto-scaling and CDN", color: "from-purple-400 to-pink-400" },
    { icon: <FaMobileAlt />, title: "Fully Responsive", desc: "Perfect display on all devices - desktop, tablet, and mobile", color: "from-orange-400 to-red-400" },
    { icon: <FaSearch />, title: "SEO Optimized", desc: "Rank higher on Google with meta tags, sitemaps, and structured data", color: "from-blue-400 to-indigo-400" },
    { icon: <FaChartLine />, title: "Analytics Ready", desc: "Track user behavior, conversions, and ROI with Google Analytics", color: "from-pink-400 to-rose-400" }
  ];

  const faqs = [
    {
      q: "How long does it take to build a website?",
      a: "Simple websites: 2-3 weeks | Business websites: 4-6 weeks | E-commerce: 6-8 weeks | Complex platforms: 2-3 months. We provide a detailed timeline after understanding your requirements."
    },
    {
      q: "Do you offer responsive design?",
      a: "Yes! All websites we build are 100% responsive and work flawlessly on desktops, tablets, and mobile devices. We test on multiple screen sizes."
    },
    {
      q: "Will my website be SEO friendly?",
      a: "Absolutely! We implement SEO best practices including meta tags, structured data, XML sitemaps, fast loading, and mobile optimization."
    },
    {
      q: "Do you provide maintenance services?",
      a: "Yes, we offer ongoing maintenance packages including updates, backups, security monitoring, bug fixes, and 24/7 technical support."
    },
    {
      q: "Can I update the website myself?",
      a: "Yes! We build custom CMS solutions or use WordPress, allowing you to easily manage content without any coding knowledge."
    },
    {
      q: "What is the cost of website development?",
      a: "Basic website: $2k-5k | Business website: $5k-10k | E-commerce: $10k-20k | Custom platform: $20k+. Contact us for a detailed quote based on your needs."
    },
    {
      q: "Do you offer custom design?",
      a: "Yes, every website is uniquely designed based on your brand identity, target audience, and business goals. No templates!"
    },
    {
      q: "What about post-launch support?",
      a: "We provide 3 months of free support including bug fixes, minor updates, and technical assistance. Extended support plans available."
    }
  ];

  const testimonials = [
    {
      name: "Michael Brown",
      role: "CEO, TechCorp",
      comment: "Our new website has increased conversions by 150%. The team delivered exceptional quality and continues to provide excellent support.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    {
      name: "Jennifer Lee",
      role: "Founder, StyleStore",
      comment: "Best web development experience! Our e-commerce site looks stunning, loads instantly, and performs flawlessly.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/33.jpg"
    },
    {
      name: "Robert Wilson",
      role: "Marketing Director",
      comment: "Professional, creative, and technically excellent. They delivered ahead of schedule and exceeded our expectations.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/22.jpg"
    }
  ];

  const partners = [
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/6/6c/Amazon_logo.svg",
  ];

  return (
    <div className="min-h-screen bg-black via-purple-900 to-gray-900 text-white overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-cyan-500/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute top-1/3 -right-40 w-[520px] h-[520px] bg-blue-500/20 rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 left-1/4 w-[520px] h-[520px] bg-purple-500/20 rounded-full blur-[150px] animate-pulse" />
        </div>

        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-semibold mb-6"
              >
                🌐 Trusted by 500+ Companies Worldwide
              </motion.div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Modern
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}Website Development
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We build fast, responsive, SEO-optimized websites that convert visitors into customers. 
                From startups to enterprises, we deliver digital excellence.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full font-bold text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/50 transition-all"
                >
                  🚀 Start Your Project <FaArrowRight className="inline ml-2" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 border-2 border-cyan-400 rounded-full font-bold text-lg hover:bg-cyan-400/10 transition-all"
                >
                  View Portfolio
                </motion.button>
              </div>

              <div className="flex items-center gap-6 mt-10 pt-6 border-t border-gray-700">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://randomuser.me/api/portraits/${i%2===0?'women':'men'}/${i}.jpg`} 
                         className="w-12 h-12 rounded-full border-2 border-cyan-500" alt="client" />
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400 text-sm">★★★★★ (4.9)</div>
                  <p className="text-gray-300">250+ Websites Launched</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-40" />
              <img 
                src={webimage}
                className="relative z-10 w-full max-w-lg mx-auto"
                alt="Website Development"
              />
            </motion.div>
          </div>
        </div>

      </section>

      {/* Stats Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: counters.websites, label: "Websites Built", icon: <FaCode />, suffix: "+" },
            { value: counters.clients, label: "Happy Clients", icon: <FaUsers />, suffix: "+" },
            { value: counters.satisfaction, label: "Client Satisfaction", icon: <FaStar />, suffix: "%" },
            { value: counters.speed, label: "Speed Score", icon: <FaRocket />, suffix: "/100" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="text-center p-6 bg-white/5 backdrop-blur rounded-2xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
            >
              <div className="text-4xl text-cyan-400 mb-3">{stat.icon}</div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {Math.floor(stat.value)}{stat.suffix}
              </h3>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Website Types Section */}
      <section className="py-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">What We Build</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore our diverse portfolio of websites across industries
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {websiteTypes.map((website, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={website.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={website.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute top-4 right-4 text-3xl text-cyan-400">
                  {website.icon}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{website.title}</h3>
                <p className="text-gray-300 mb-3">{website.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {website.features.slice(0,3).map((feature, idx) => (
                    <span key={idx} className="text-xs bg-cyan-400/10 text-cyan-400 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                  {website.features.length > 3 && (
                    <span className="text-xs bg-gray-700 text-gray-400 px-2 py-1 rounded-full">
                      +{website.features.length - 3} more
                    </span>
                  )}
                </div>
                <button className="text-cyan-400 flex items-center gap-2 group-hover:gap-3 transition-all">
                  Learn More <FaArrowRight className="text-sm" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Live Projects Section */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-4">Live Website Demos</h2>
            <p className="text-xl text-gray-300">See our websites in action</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {liveProjects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-800/50 rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-cyan-500/20 transition-all"
                onClick={() => setActiveVideo(activeVideo === i ? null : i)}
              >
                <div className="relative aspect-video">
                  {activeVideo === i ? (
                    <iframe src={project.videoUrl} className="w-full h-full" title={project.title} allowFullScreen />
                  ) : (
                    <>
                      <img src={project.thumbnail} className="w-full h-full object-cover" alt={project.title} />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/40 transition">
                        <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center hover:scale-110 transition">
                          <FaPlay className="text-white text-2xl ml-1" />
                        </div>
                      </div>
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 rounded-full text-sm font-semibold">
                        {project.category}
                      </div>
                    </>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">Why Choose Us</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We deliver excellence in every project with cutting-edge solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/5 rounded-2xl p-6 text-center border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
            >
              <div className={`text-5xl mb-4 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-4">Our Tech Stack</h2>
            <p className="text-xl text-gray-300">Cutting-edge technologies we master</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-800/50 rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl" style={{ color: tech.color }}>{tech.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold">{tech.name}</h3>
                    <p className="text-gray-400 text-sm">{tech.description}</p>
                  </div>
                </div>
                <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: tech.level }}
                    transition={{ duration: 1 }}
                    className="absolute h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                  />
                </div>
                <p className="text-right text-sm mt-1 text-cyan-400">{tech.level}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-xl text-gray-300">What our clients say about us</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
            >
              <FaQuoteLeft className="text-cyan-400 text-3xl mb-4 opacity-50" />
              <p className="text-gray-300 mb-4 leading-relaxed">"{testimonial.comment}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-700">
                <img src={testimonial.image} className="w-12 h-12 rounded-full" alt={testimonial.name} />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  <div className="flex text-yellow-400 text-sm mt-1">★★★★★</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-300">Everything you need to know</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-gray-800/50 rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-white/5 transition"
                >
                  <span className="font-semibold text-left">{faq.q}</span>
                  <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}>
                    <FaChevronDown className="text-cyan-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-4"
                    >
                      <p className="text-gray-300 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl p-12 border border-cyan-500/20"
        >
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
              <p className="text-gray-300 text-lg mb-8">Get a free consultation from our experts today!</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                    <FaEnvelope />
                  </div>
                  <span className="group-hover:text-cyan-400 transition">admin@ttichub.co.in</span>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                    <FaPhone />
                  </div>
                  <span className="group-hover:text-cyan-400 transition">+91 8292928328</span>
                </div>
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition">
                    <FaMapMarkerAlt />
                  </div>
                  <span className="group-hover:text-cyan-400 transition">Patna, Bihar, India</span>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <motion.div whileHover={{ y: -3 }} className="cursor-pointer">
                  <FaGithub className="text-2xl hover:text-cyan-400 transition" />
                </motion.div>
                <motion.div whileHover={{ y: -3 }} className="cursor-pointer">
                  <FaLinkedin className="text-2xl hover:text-cyan-400 transition" />
                </motion.div>
                <motion.div whileHover={{ y: -3 }} className="cursor-pointer">
                  <FaTwitter className="text-2xl hover:text-cyan-400 transition" />
                </motion.div>
              </div>
            </div>
            <div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text" 
                  placeholder="Your Full Name" 
                  className="w-full px-4 py-3 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" 
                />
                <input 
                  type="email" 
                  placeholder="Your Email Address" 
                  className="w-full px-4 py-3 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" 
                />
                <input 
                  type="text" 
                  placeholder="Phone Number" 
                  className="w-full px-4 py-3 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition" 
                />
                <textarea 
                  placeholder="Tell us about your project..." 
                  rows="4" 
                  className="w-full px-4 py-3 bg-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 transition resize-none"
                ></textarea>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  Send Message <FaArrowRight className="inline ml-2" />
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}