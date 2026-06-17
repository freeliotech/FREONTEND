import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";

import {
  FaShoppingCart,
  FaUtensils,
  FaGraduationCap,
  FaTaxi,
  FaUsers,
  FaBriefcase,
  FaReact,
  FaNodeJs,
  FaAndroid,
  FaApple,
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
  FaCheckCircle,
  FaClock,
  FaRocket,
  FaCode,
} from "react-icons/fa";

import { SiFlutter, SiFirebase, SiMongodb, SiTensorflow, SiKotlin, SiSwift } from "react-icons/si";

export default function AppDevelopmentPage() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [stats, setStats] = useState({
    projects: 0,
    clients: 0,
    experience: 0,
    support: 0,
  });

  // Animated counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        projects: Math.min(prev.projects + 2, 100),
        clients: Math.min(prev.clients + 1, 50),
        experience: Math.min(prev.experience + 0.1, 5),
        support: Math.min(prev.support + 0.1, 24.7),
      }));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const apps = [
    {
      title: "E-Commerce App",
      icon: <FaShoppingCart />,
      img: "https://images.unsplash.com/photo-1607082352121-fa243f3dde32?w=400&h=300&fit=crop",
      description: "Complete online shopping solution with payment gateway integration",
      rating: 4.8,
      features: ["Payment Gateway", "Wishlist", "Order Tracking"],
    },
    {
      title: "Food Delivery",
      icon: <FaUtensils />,
      img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&h=300&fit=crop",
      description: "Real-time tracking and instant delivery system",
      rating: 4.9,
      features: ["Live Tracking", "Restaurant POS", "Reviews"],
    },
    {
      title: "Education App",
      icon: <FaGraduationCap />,
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      description: "Interactive learning with video lectures and quizzes",
      rating: 4.7,
      features: ["Video Courses", "Quiz System", "Certificates"],
    },
    {
      title: "Taxi Booking",
      icon: <FaTaxi />,
      img: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop",
      description: "Uber-like app with live driver tracking",
      rating: 4.6,
      features: ["GPS Tracking", "Payment", "Ride History"],
    },
    {
      title: "Social Media",
      icon: <FaUsers />,
      img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=400&h=300&fit=crop",
      description: "Connect, share and communicate globally",
      rating: 4.9,
      features: ["Chat", "Posts", "Stories"],
    },
    {
      title: "Business App",
      icon: <FaBriefcase />,
      img: "https://images.unsplash.com/photo-1556155092-8707de31f9c4?w=400&h=300&fit=crop",
      description: "Enterprise solution for business management",
      rating: 4.8,
      features: ["CRM", "Analytics", "Reports"],
    },
  ];

  const liveApps = [
    {
      title: "Fashion Store App Demo",
      videoId: "dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      category: "E-Commerce",
      description: "Modern fashion shopping experience with AR try-on",
    },
    {
      title: "Food Delivery Demo",
      videoId: "dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
      category: "Food & Restaurant",
      description: "Real-time food ordering and tracking system",
    },
    {
      title: "Education Platform Demo",
      videoId: "dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
      category: "Education",
      description: "Interactive learning management system",
    },
  ];

  const faqs = [
    {
      q: "How long does it take to develop a mobile app?",
      a: "Development timeline typically ranges from 3-6 months depending on complexity, features, and platform requirements. Simple apps can take 2-3 months, while complex enterprise apps may take 6+ months. We provide detailed timelines during consultation.",
    },
    {
      q: "What platforms do you develop for?",
      a: "We develop for iOS, Android, and cross-platform using React Native and Flutter. We also offer progressive web apps (PWA) for web-based solutions and can help you decide the best approach for your target audience.",
    },
    {
      q: "Do you provide app maintenance and support?",
      a: "Yes, we offer comprehensive maintenance packages including bug fixes, updates, server management, security patches, and 24/7 technical support. We ensure your app runs smoothly post-launch.",
    },
    {
      q: "What is the cost of app development?",
      a: "Costs vary based on features, complexity, and platforms. Basic apps start from $5,000, medium complexity $15,000-$30,000, while complex enterprise apps can range from $40,000 - $100,000+. Contact us for a detailed quote based on your requirements.",
    },
    {
      q: "Will I own the source code?",
      a: "Absolutely! You retain full ownership of all source code, designs, and intellectual property. We provide complete documentation, code repository access, and transfer all assets upon project completion.",
    },
    {
      q: "Do you help with app store submission?",
      a: "Yes, we handle the entire app store submission process for both Google Play Store and Apple App Store, including all necessary assets, metadata, and compliance requirements. We ensure your app meets all guidelines.",
    },
  ];

  const testimonials = [
    {
      name: "John Smith",
      role: "CEO, TechStart Inc.",
      comment: "Excellent team to work with! They delivered our app ahead of schedule and exceeded our expectations. The UI/UX design is outstanding.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      name: "Sarah Johnson",
      role: "Founder, Foodie App",
      comment: "The app has transformed our business. Great UI/UX design and flawless performance. Their support team is responsive and professional.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
      name: "Mike Chen",
      role: "CTO, EduTech",
      comment: "Professional, responsive, and technically skilled. Highly recommended for any app development needs. They truly understand modern tech.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  ];

  const techStack = [
    { icon: <FaReact />, name: "React Native", color: "#61DAFB", desc: "Cross-platform" },
    { icon: <SiFlutter />, name: "Flutter", color: "#02569B", desc: "UI Toolkit" },
    { icon: <FaNodeJs />, name: "Node.js", color: "#339933", desc: "Backend" },
    { icon: <SiFirebase />, name: "Firebase", color: "#FFCA28", desc: "Backend-as-Service" },
    { icon: <SiMongodb />, name: "MongoDB", color: "#47A248", desc: "Database" },
    { icon: <FaAndroid />, name: "Android", color: "#3DDC84", desc: "Native" },
    { icon: <FaApple />, name: "iOS", color: "#999999", desc: "Native" },
    { icon: <SiKotlin />, name: "Kotlin", color: "#7F52FF", desc: "Android" },
    { icon: <SiSwift />, name: "Swift", color: "#FA7343", desc: "iOS" },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Particles Background */}
      <Particles
        className="fixed inset-0 -z-10"
        params={{
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#22d3ee" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: { speed: 2, direction: "none", random: true },
            links: { enable: true, color: "#22d3ee", opacity: 0.2 },
          },
          interactivity: {
            events: { onhover: { enable: true, mode: "repulse" } },
          },
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Gradients */}
        <motion.div
          animate={{ y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 50, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600 rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 100, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-600 rounded-full opacity-20 blur-3xl"
        />

        <div className="container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <span className="text-cyan-400 text-sm font-mono">INNOVATION MEETS EXCELLENCE</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                APP
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}DEVELOPMENT
                </span>
              </h1>
              
              <p className="text-gray-400 text-lg max-w-lg mb-8 leading-relaxed">
                We craft cutting-edge mobile applications for Android, iOS, and cross-platform using 
                React Native, Flutter, and modern backend technologies.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-semibold flex items-center gap-2 shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  Start Your Project <FaArrowRight />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 border-2 border-cyan-400 text-cyan-400 rounded-full font-semibold hover:bg-cyan-400/10 transition-all"
                >
                  View Portfolio
                </motion.button>
              </div>

              <div className="flex items-center gap-8 mt-10 pt-6 border-t border-gray-800">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map((i) => (
                    <img
                      key={i}
                      src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i}.jpg`}
                      className="w-10 h-10 rounded-full border-2 border-black"
                      alt="client"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-sm" />
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm">Trusted by 50+ companies</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl opacity-30" />
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/mobile-app-development-3874584.png"
                className="relative z-10 max-w-lg mx-auto"
                alt="App Development"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: stats.projects, label: "Projects Delivered", icon: <FaCode />, suffix: "+" },
            { value: stats.clients, label: "Happy Clients", icon: <FaUsers />, suffix: "+" },
            { value: stats.experience, label: "Years Experience", icon: <FaClock />, suffix: "+" },
            { value: stats.support, label: "Support", icon: <FaRocket />, suffix: "/7" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gradient-to-br from-white/5 to-transparent backdrop-blur rounded-2xl border border-cyan-400/20 hover:border-cyan-400/50 transition-all"
            >
              <div className="text-4xl text-cyan-400 mb-3 flex justify-center">
                {stat.icon}
              </div>
              <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {Math.floor(stat.value)}{stat.suffix}
              </h3>
              <p className="text-gray-400 mt-2 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Apps Showcase */}
      <section className="py-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Apps We Build</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our portfolio of successful mobile applications across various industries
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.map((app, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-gradient-to-br from-white/5 to-white/0 backdrop-blur rounded-2xl overflow-hidden border border-cyan-400/20 hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={app.img} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt={app.title} 
                />
                <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded-full text-xs flex items-center gap-1 backdrop-blur">
                  <FaStar className="text-yellow-400 text-xs" />
                  <span>{app.rating}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="text-cyan-400 text-3xl mb-3">{app.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{app.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{app.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {app.features.map((feature, idx) => (
                    <span key={idx} className="text-xs bg-cyan-400/10 text-cyan-400 px-2 py-1 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
                <button className="text-cyan-400 text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn More <FaArrowRight className="text-xs" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Live App Videos */}
      <section className="py-20 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">Live App Demos</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Watch our applications in action with interactive demos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {liveApps.map((app, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setActiveVideo(activeVideo === i ? null : i)}
              >
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-transparent border border-cyan-400/20 hover:border-cyan-400/50 transition-all">
                  <div className="relative aspect-video">
                    {activeVideo === i ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${app.videoId}?autoplay=1`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <img src={app.thumbnail} className="w-full h-full object-cover" alt={app.title} />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/50 transition-all">
                          <div className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-all">
                            <FaPlay className="text-white text-2xl ml-1" />
                          </div>
                        </div>
                        <div className="absolute top-4 left-4 bg-cyan-500 px-3 py-1 rounded-full text-xs font-semibold">
                          {app.category}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-2">{app.title}</h3>
                    <p className="text-gray-400 text-sm">{app.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Our Technology Stack</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Cutting-edge technologies powering modern mobile applications
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {techStack.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5 }}
              className="group text-center p-6 bg-gradient-to-br from-white/5 to-transparent rounded-2xl hover:bg-white/10 transition-all border border-cyan-400/20 hover:border-cyan-400/50"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform" style={{ color: tech.color }}>
                {tech.icon}
              </div>
              <p className="font-semibold text-sm mt-2">{tech.name}</p>
              <p className="text-gray-500 text-xs mt-1">{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-t from-transparent via-cyan-500/5 to-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-white/5 to-transparent backdrop-blur rounded-2xl p-6 border border-cyan-400/20 hover:border-cyan-400/50 transition-all"
              >
                <FaQuoteLeft className="text-cyan-400 text-3xl mb-4 opacity-50" />
                <p className="text-gray-300 mb-4 leading-relaxed">"{testimonial.comment}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                  <img src={testimonial.image} className="w-12 h-12 rounded-full" alt={testimonial.name} />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    <div className="flex text-yellow-400 text-xs mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about our app development process
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-cyan-400/20 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-white/5 transition-colors"
              >
                <span className="font-semibold text-lg">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openFaq === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
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
                    className="px-6 pb-5"
                  >
                    <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl p-8 lg:p-12 border border-cyan-400/20"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Build Your App?</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Let's discuss your project and turn your idea into reality. Get a free consultation today!
              </p>
              <div className="space-y-4">
                {[
                  { icon: <FaEnvelope />, text: "admin@ttichub.co.in", href: "mailto:admin@ttichub.co.in" },
                  { icon: <FaPhone />, text: "+91 8292928328", href: "tel:+9108292928328" },
                  { icon: <FaMapMarkerAlt />, text: "Patna, Bihar, India", href: "#" },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-cyan-500/20 rounded-full flex items-center justify-center group-hover:bg-cyan-500/30 transition-all">
                      {item.icon}
                    </div>
                    <span>{item.text}</span>
                  </a>
                ))}
              </div>
              <div className="flex gap-4 mt-8">
                {[FaGithub, FaLinkedin, FaTwitter].map((Icon, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3 }}
                    className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center cursor-pointer hover:bg-cyan-500/20 transition-all"
                  >
                    <Icon className="text-gray-400 hover:text-cyan-400 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-5 py-3 bg-white/5 border border-cyan-400/20 rounded-xl focus:outline-none focus:border-cyan-400 transition-all text-white placeholder-gray-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-5 py-3 bg-white/5 border border-cyan-400/20 rounded-xl focus:outline-none focus:border-cyan-400 transition-all text-white placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full px-5 py-3 bg-white/5 border border-cyan-400/20 rounded-xl focus:outline-none focus:border-cyan-400 transition-all text-white placeholder-gray-500"
                />
                <textarea
                  placeholder="Tell us about your project"
                  rows="4"
                  className="w-full px-5 py-3 bg-white/5 border border-cyan-400/20 rounded-xl focus:outline-none focus:border-cyan-400 transition-all text-white placeholder-gray-500 resize-none"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}