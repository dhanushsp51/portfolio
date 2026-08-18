import React, { useEffect, useState, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  FileText,
  ExternalLink,
  Award,
  Briefcase,
  MapPin,
  Download,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";

/**
 * Production-ready single-file App.jsx
 * - Uses Tailwind utility classes for styling
 * - Uses framer-motion for reveals and micro-interactions
 * - Uses lucide-react for icons
 *
 * Ensure fonts (Space Grotesk / Inter and a monospace) are loaded globally for exact typography.
 */

const ROLE_LIST = [
  "FULL STACK WEB DEVELOPER",
  "MERN SPECIALIST",
  "AI APPLICATION DEVELOPER",
  "BACKEND ARCHITECT",
];

const USER = {
  name: "DHANUSH S P",
  brand: "DHANUSH S P",
  phone: "+91 7892862983",
  email: "dhanushsp89@gmail.com",
  linkedin: "https://www.linkedin.com/in/mr-nayak-160654364?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  github: "https://share.google/1zy2pKranC5iooAj8",
  location: "Tumakuru, Karnataka, India",
  pitch:
    "Passionate and results-driven Full Stack Web Developer and AI Application Developer with hands-on experience in building responsive web applications, AI-powered platforms, REST APIs, and intelligent automation solutions. Skilled in MERN stack development, Python, Java, AI tools, NLP, API integration, database management, authentication, and modern UI development. Strong ability to transform ideas into scalable, user-focused applications by combining software engineering principles with emerging AI technologies.",
  stats: [
    { label: "Projects Built", value: "2+" },
    { label: "Certifications", value: "4" },
    { label: "Core Stack", value: "MERN + AI" },
  ],
  projects: [
    {
      title: "CareerZyra AI – An AI-Powered Career Assistance Platform",
      tagline: "Prepare Today. Get Hired Tomorrow.",
      categories: ["AI", "NLP", "FULLSTACK"],
      features: [
        "AI-powered Resume Builder (ATS-friendly)",
        "AI Resume Analysis & job-match insights",
        "AI Mock Interview with real-time evaluation & webcam features",
        "Personalized Job Discovery & Recommendation engine",
        "Career Analytics & Activity History",
        "Responsive glassmorphism UI",
      ],
      tech: [
        "AI",
        "NLP",
        "Computer Vision",
        "React.js",
        "Next.js",
        "Node.js",
        "Express.js",
        "FastAPI",
        "MongoDB",
        "Tailwind CSS",
      ],
      github: "https://share.google/1zy2pKranC5iooAj8",
      live: "https://careerzyra.com",
    },
    {
      title: "JARVIS – AI Virtual Assistant",
      tagline: "AI Virtual Assistant for conversational control & automation",
      categories: ["PYTHON", "AI AUTOMATION"],
      features: [
        "Voice command processing & NLU",
        "OpenAI ChatGPT integration",
        "Real-time services: weather, news",
        "Intelligent task automation engine",
        "Conversational history backed by Supabase",
        "Desktop app combining Python & web technologies",
      ],
      tech: [
        "Python",
        "OpenAI API",
        "NLP",
        "React.js",
        "Node.js",
        "Supabase",
        "HTML/CSS/JS",
      ],
      github: "https://share.google/1zy2pKranC5iooAj8",
      live: "https://jarvis-ai.com",
    },
  ],
  education: [
    {
      title: "Bachelor of Computer Application",
      duration: "2022 – 2025",
      institution:
        "Sree Siddaganga College of Arts, Science and Commerce, Tumakuru – 572102",
      grade: "CGPA: 7.6",
    },
    {
      title: "PUC",
      duration: "2022",
      institution: "Govt PU College, Koratagere – 572129",
      grade: "Percentage: 68.66%",
    },
    {
      title: "SSLC",
      duration: "2019 – 2020",
      institution: "Govt High School, Duddanahalli",
      grade: "Percentage: 95.04%",
    },
  ],
  certifications: [
    { name: "Java Full Stack - NASSCOM" },
    { name: "Cloud Computing - ExcelR" },
    { name: "Skills Dev Training - MAGIC BUS" },
    { name: "UI/UX Internship - TechnoHacks" },
  ],
  softSkills: [
    "Teamwork",
    "Time Management",
    "Leadership",
    "Effective Communication",
    "Problem Solving",
    "Critical Thinking",
    "Adaptability",
    "Quick Learning",
  ],
  techSkills: {
    languages: ["C", "Python", "Java", "HTML", "PHP", "SQL", ".NET"],
    frameworks: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "FastAPI",
      "Tailwind CSS",
    ],
    dbtools: ["MongoDB", "MySQL", "Mongoose", "Docker", "Git"],
    ai: ["OpenAI", "NLP", "Computer Vision"],
  },
};

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function useTypeCycle(words, speed = 80, pause = 1500) {
  const [display, setDisplay] = useState("");
  const [index, setIndex] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout;
    const current = words[index % words.length];

    if (typing) {
      timeout = setTimeout(() => {
        setDisplay((prev) =>
          prev.length < current.length ? current.slice(0, prev.length + 1) : prev
        );
        if (display.length >= current.length) {
          setTyping(false);
        }
      }, speed);
    } else {
      timeout = setTimeout(() => {
        setDisplay((prev) => (prev.length > 0 ? prev.slice(0, -1) : prev));
        if (display.length === 0) {
          setTyping(true);
          setIndex((i) => i + 1);
        }
      }, 40);
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display, typing, index, words, speed]);

  // Pause after typing before deleting
  useEffect(() => {
    if (!typing && display.length === words[index % words.length].length) {
      const t = setTimeout(() => setTyping(false), pause);
      return () => clearTimeout(t);
    }
  }, [display, index, words, typing, pause]);

  return display;
}

export default function App() {
  const typed = useTypeCycle(ROLE_LIST);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleContactChange = (e) =>
    setContact((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
      try {
      // POST to Netlify Function (production) or local server (during local dev)
      const API_ENDPOINT = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/api/send` : '/.netlify/functions/send';
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact })
      });
      if (!res.ok) throw new Error('Network error');
      const json = await res.json();
      setSubmitting(false);
      alert('Message sent — thank you!');
      setContact({ name: '', email: '', subject: '', message: '' });
      } catch (err) {
      setSubmitting(false);
      alert('Could not send message from browser.\n\nYou can still contact via email: dhanushsp89@gmail.com');
      console.error(err);
      }
    };

  const filteredProjects =
    activeFilter === "ALL"
      ? USER.projects
      : USER.projects.filter((p) =>
          p.categories.some((c) => c.toUpperCase().includes(activeFilter))
        );

  // For navigation highlighting/responsive nav
  const [navOpen, setNavOpen] = useState(false);
  const navRef = useRef();

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setNavOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-[#05090e] text-slate-300 antialiased">
      {/* global floating bubbles (decorative) */}
      <div className="global-bubbles pointer-events-none" aria-hidden="true">
        <span className="bubble" style={{'--left':'6%','--top':'12%','--size':'18px','--delay':'0s','--dur':'9s'}} />
        <span className="bubble" style={{'--left':'22%','--top':'78%','--size':'12px','--delay':'1.2s','--dur':'7.5s'}} />
        <span className="bubble" style={{'--left':'48%','--top':'6%','--size':'14px','--delay':'2.2s','--dur':'8.6s'}} />
        <span className="bubble" style={{'--left':'70%','--top':'28%','--size':'10px','--delay':'0.6s','--dur':'6.8s'}} />
        <span className="bubble" style={{'--left':'86%','--top':'72%','--size':'16px','--delay':'1.8s','--dur':'10s'}} />
        <span className="bubble" style={{'--left':'34%','--top':'42%','--size':'9px','--delay':'0.4s','--dur':'6.2s'}} />
        <span className="bubble" style={{'--left':'58%','--top':'56%','--size':'11px','--delay':'2.6s','--dur':'7.9s'}} />
        <span className="bubble" style={{'--left':'12%','--top':'50%','--size':'13px','--delay':'1.0s','--dur':'8.2s'}} />
      </div>
      {/* sticky header */}
      <header className="sticky top-0 z-40 backdrop-blur-sm bg-[#05090e]/60 border-b border-[#112233]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-[#09101a]/70 border border-[#112233] border-t-[#00f2ff]/60 rounded-sm shadow-[0_0_15px_rgba(0,242,255,0.08)]">
              <div className="text-[#00f2ff] font-extrabold tracking-tighter">
                {/* simple brand glyph */}
                <span className="text-lg">D</span>
              </div>
            </div>
            <div className="ml-1">
                          <div className="text-white font-bold tracking-tighter text-sm md:text-base techno">
                {USER.brand}
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-mono text-sm text-slate-300">
                      <a href="#about" className="hover:text-[#00f2ff] techno">ABOUT</a>
                      <a href="#projects" className="hover:text-[#00f2ff] techno">PROJECTS</a>
                      <a href="#skills" className="hover:text-[#00f2ff] techno">SKILLS</a>
                      <a href="#experience" className="hover:text-[#00f2ff] techno">EXPERIENCE</a>
                      <a href="#certs" className="hover:text-[#00f2ff] techno">CERTS</a>
                      <a href="#contact" className="hover:text-[#00f2ff] techno">CONTACT</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#00f2ff] text-[#00f2ff] hover:bg-[#00f2ff]/10 font-medium text-sm"
              aria-label="Hire me"
            >
              HIRE ME
            </button>
            <button
              className="md:hidden p-2 text-slate-300 border border-[#112233] bg-[#09101a]/70 rounded-md hover:shadow-[0_0_18px_rgba(0,242,255,0.06)] transition"
              onClick={() => setNavOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col items-center justify-center gap-1.5 w-5 h-5">
                <span className="block w-4 h-[2px] bg-[#00f2ff] rounded opacity-90"></span>
                <span className="block w-4 h-[2px] bg-[#00f2ff] rounded opacity-90"></span>
                <span className="block w-4 h-[2px] bg-[#00f2ff] rounded opacity-90"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile nav overlay */}
        {navOpen && (
          <div
            ref={navRef}
            className="md:hidden bg-[#05090e]/80 backdrop-blur-md border-t border-[#112233]"
          >
            <div className="px-4 py-5 space-y-3 font-mono text-sm">
                          <a href="#about" className="block techno" onClick={() => setNavOpen(false)}>— 01 . ABOUT ME</a>
                          <a href="#projects" className="block techno" onClick={() => setNavOpen(false)}>— 02 . PROJECTS</a>
                          <a href="#skills" className="block techno" onClick={() => setNavOpen(false)}>— 03 . CAPABILITIES</a>
                          <a href="#experience" className="block techno" onClick={() => setNavOpen(false)}>— 04 . EXPERIENCE</a>
                          <a href="#certs" className="block techno" onClick={() => setNavOpen(false)}>— 05 . CERTIFICATIONS</a>
                          <a href="#contact" className="block techno" onClick={() => setNavOpen(false)}>— 06 . CONTACT</a>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        {/* HERO */}
        <section className="pt-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={reveal}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#00f2ff]/10 text-[#00f2ff] border border-[#112233]">
                  OPEN TO OPPORTUNITIES
                </span>
                <span className="text-xs text-slate-500 font-mono">Available for full-time & freelance</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight"
              >
              <span className="block text-[#00f2ff] techno">{USER.name}</span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-[#00f2ff] font-extrabold text-2xl md:text-4xl">
                  <span className="text-[#00f2ff] mr-3">►</span>
                  <span className="font-mono text-sm md:text-lg techno">{typed}</span>
                </span>
              </motion.h1>

              <motion.p
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="text-slate-400 max-w-2xl"
              >
                {USER.pitch}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3 items-center"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
              >
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-[#00f2ff]/10 to-transparent text-[#00f2ff] border border-[#112233] hover:scale-[1.01] transition transform techno cyber-cta"
                >
                  View Projects <ExternalLink size={16} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-[#00f2ff] text-[#00f2ff] hover:bg-[#00f2ff]/10 transition techno cyber-cta"
                >
                  Let's Talk <Send size={14} />
                </a>
                <a
                                  href="/Dhanush_CV.pdf"
                                  download
                                  className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[#09101a]/80 border border-[#112233] cyber-cta hover:bg-[#00f2ff]/8 transition"
                                >
                                  <span className="text-[#00f2ff] font-semibold techno">Resume</span> <Download size={14} />
                                </a>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 mt-3"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <a href={USER.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-[#09101a]/70 border border-[#112233] cyber-cta text-[#00f2ff] hover:shadow-[0_0_15px_rgba(0,242,255,0.12)] transition icon-wrapper">
                                                  <Github />
                </a>
                                <a href={USER.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-[#09101a]/70 border border-[#112233] cyber-cta text-[#00f2ff] hover:shadow-[0_0_15px_rgba(0,242,255,0.12)] transition icon-wrapper">
                                  <Linkedin />
                </a>
                                <a href={`mailto:${USER.email}`} aria-label="Email" className="p-2 rounded-md bg-[#09101a]/70 border border-[#112233] cyber-cta text-[#00f2ff] hover:shadow-[0_0_15px_rgba(0,242,255,0.12)] transition icon-wrapper">
                                  <Mail />
                </a>
              </motion.div>
            </div>

            {/* Right column card */}
            <div className="md:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative p-6 rounded-xl bg-[#09101a]/80 border border-[#112233] border-t-[#00f2ff]/60 shadow-[0_8px_30px_rgba(0,242,255,0.04)]"
              >
                {/* glowing rings and avatar */}
                <div className="flex justify-center -mt-12">
                  <div className="relative">
                    <div className="rounded-full w-36 h-36 bg-gradient-to-r from-[#04202b]/40 to-[#002a36]/30 border border-[#00f2ff]/20 flex items-center justify-center hud-container">
                      {/* soft inner glow */}
                      <div className="absolute inset-0 rounded-full blur-xl opacity-50 shadow-[0_0_30px_rgba(0,242,255,0.25)]"></div>

                      {/* rotating neon orbital ring */}
                      <div className="rot-ring absolute inset-0 rounded-full pointer-events-none" aria-hidden="true"></div>

                      {/* circular scanner sweep */}
                      <div className="scanner absolute inset-0 rounded-full pointer-events-none" aria-hidden="true"></div>

                      {/* central avatar */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative rounded-full w-28 h-28 bg-[#08111a] border border-[#112233] flex items-center justify-center profile-outer">
                          <img src="/profile.jpg" alt="DHANUSH S P" className="w-24 h-24 rounded-full object-cover" />
                          <div className="outer-glow"></div>

                          {/* orbiting electron dots (two) */}
                        </div>
                      </div>
                    </div>

                    <div className="absolute -inset-1 rounded-full animate-pulse" style={{ boxShadow: "0 0 18px 6px rgba(0,242,255,0.06)" }} />
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {USER.stats.map((s, i) => (
                    <div
                      key={s.label}
                      className="p-3 rounded-md bg-[#0b1320]/80 border border-[#112233] text-center hover:translate-y-[-4px] transition-transform duration-300"
                    >
                      <div className="text-sm font-mono text-slate-400 techno">{s.label}</div>
                        <div className="text-lg md:text-xl font-extrabold techno text-white mt-1">{s.value}</div>
                    </div>
                  ))}
                </div>

              </motion.div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mt-12">
          <div className="flex items-start gap-6">
            <div className="w-24 shrink-0 font-mono text-sm text-slate-400">— 01 . ABOUT ME</div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={reveal}
              transition={{ duration: 0.6 }}
              className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="md:col-span-2 rounded-xl p-6 bg-[#09101a]/80 border border-[#112233] border-t-[#00f2ff]/60 backdrop-blur-md">
                <h3 className="font-semibold text-white text-xl">About</h3>
                <p className="mt-3 text-slate-400">{USER.pitch}</p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-md bg-[#0b1320]/70 border border-[#112233]">
                    <div className="text-xs font-mono text-slate-400">Primary Stack</div>
                    <div className="text-sm font-semibold text-white mt-1">MERN + AI</div>
                  </div>
                  <div className="p-3 rounded-md bg-[#0b1320]/70 border border-[#112233]">
                    <div className="text-xs font-mono text-slate-400">Availability</div>
                    <div className="text-sm font-semibold text-white mt-1">Open to Opportunities</div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl p-6 bg-[#09101a]/80 border border-[#112233] flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <MapPin className="text-[#00f2ff]" />
                  <div>
                    <div className="text-xs font-mono text-slate-400">Location</div>
                    <div className="text-sm font-semibold text-white">{USER.location}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Briefcase className="text-[#00f2ff]" />
                  <div>
                    <div className="text-xs font-mono text-slate-400">Study</div>
                    <div className="text-sm font-semibold text-white">BCA (2022-2025)</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FileText className="text-[#00f2ff]" />
                  <div>
                    <div className="text-xs font-mono text-slate-400">Core</div>
                    <div className="text-sm font-semibold text-white">Full Stack & AI</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mt-12">
          <div className="flex items-start gap-6">
            <div className="w-24 shrink-0 font-mono text-sm text-slate-400">— 02 . PROJECTS</div>
            <div className="flex-1">
              <motion.div
                className="flex items-center justify-between"
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                transition={{ duration: 0.6 }}
              >
                <div className="flex gap-2 flex-wrap">
                  {["ALL", "AI / NLP", "FULLSTACK", "PYTHON", "MERN"].map(
                    (f) => (
                      <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={`px-3 py-1 rounded-full text-xs font-mono border ${
                          activeFilter === f
                            ? "bg-[#00f2ff]/10 text-[#00f2ff] border-[#00f2ff]"
                            : "bg-[#09101a]/60 border-[#112233] text-slate-300"
                        }`}
                      >
                        {f}
                      </button>
                    )
                  )}
                </div>
              </motion.div>

              <motion.div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProjects.map((p) => (
                  <motion.article
                    key={p.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="rounded-xl p-5 bg-[#09101a]/80 border border-[#112233] hover:-translate-y-1.5 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-[#00f2ff] font-semibold techno">{p.title}</h4>
                        <div className="text-xs text-slate-400 mt-1">{p.tagline}</div>
                      </div>
                      <div className="flex gap-2">
                        <a href={p.github} aria-label="GitHub" className="p-2 rounded-md bg-[#0b1320]/60 border border-[#112233]">
                                                  <Github className="text-[#00f2ff]" />
                        </a>
                        <a href={p.live} aria-label="Live demo" className="p-2 rounded-md bg-[#0b1320]/60 border border-[#112233]">
                          <ExternalLink className="text-[#00f2ff]" />
                        </a>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.categories.map((c) => (
                        <span key={c} className="text-xs font-mono px-2 py-1 bg-[#0b1320]/60 border border-[#112233] rounded">
                          {c}
                        </span>
                      ))}
                    </div>

                    <ul className="mt-3 text-slate-400 list-disc list-inside space-y-1 text-sm">
                      {p.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {p.tech.slice(0, 6).map((t) => (
                        <span key={t} className="text-xs px-2 py-1 font-mono rounded bg-[#09121a]/60 border border-[#112233]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section id="skills" className="mt-12">
          <div className="flex items-start gap-6">
            <div className="w-24 shrink-0 font-mono text-sm text-slate-400">— 03 . CAPABILITIES</div>
            <div className="flex-1">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                transition={{ duration: 0.6 }}
                className="rounded-xl p-6 bg-[#09101a]/80 border border-[#112233]"
              >
                <h3 className="text-white font-semibold">Technical Stack</h3>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {USER.techSkills.languages.map((l) => (
                    <div key={l} className="p-3 rounded-md bg-[#0b1320]/60 border border-[#112233] text-center text-sm font-mono">
                      {l}
                    </div>
                  ))}
                  {USER.techSkills.frameworks.map((l) => (
                    <div key={l} className="p-3 rounded-md bg-[#0b1320]/60 border border-[#112233] text-center text-sm font-mono">
                      {l}
                    </div>
                  ))}
                  {USER.techSkills.dbtools.map((l) => (
                    <div key={l} className="p-3 rounded-md bg-[#0b1320]/60 border border-[#112233] text-center text-sm font-mono">
                      {l}
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-md p-4 bg-[#08111a]/60 border border-[#112233]">
                  <h4 className="font-medium text-[#00f2ff] techno">The Methodology</h4>
                  <p className="text-slate-400 mt-2 text-sm">
                    Backend-first design, API-driven components, clean code principles and automated tests. Build maintainable architecture with iterative delivery, continuous integration, and AI-assisted tooling where applicable.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE / Timeline */}
        <section id="experience" className="mt-12">
          <div className="flex items-start gap-6">
            <div className="w-24 shrink-0 font-mono text-sm text-slate-400">— 04 . EXPERIENCE</div>
            <div className="flex-1">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                transition={{ duration: 0.6 }}
                className="relative pl-8"
              >
                <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00f2ff] to-transparent opacity-20" />
                <div className="space-y-6">
                  {USER.education.map((edu, idx) => (
                    <div key={edu.title} className="relative">
                      <div className="absolute -left-6 top-1">
                        <div className="w-4 h-4 rounded-full bg-[#00f2ff] shadow-[0_0_10px_#00f2ff] animate-pulse" />
                      </div>
                      <div className="p-4 rounded-md bg-[#09101a]/80 border border-[#112233]">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-semibold text-white">{edu.title}</div>
                            <div className="text-xs font-mono text-slate-400">{edu.institution}</div>
                          </div>
                          <div className="text-xs font-mono text-slate-400">{edu.duration}</div>
                        </div>
                        <div className="mt-2 text-sm text-slate-400">{edu.grade}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section id="certs" className="mt-12">
          <div className="flex items-start gap-6">
            <div className="w-24 shrink-0 font-mono text-sm text-slate-400">— 05 . CERTIFICATIONS</div>
            <div className="flex-1">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                {USER.certifications.map((c) => (
                  <div key={c.name} className="p-4 rounded-md bg-[#09101a]/80 border border-[#112233] flex items-center gap-3">
                    <div className="p-2 rounded bg-[#002a32]/40">
                      <Award className="text-[#00f2ff]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{c.name}</div>
                      <div className="text-xs font-mono text-slate-400">Credential</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-12">
          <div className="flex items-start gap-6">
            <div className="w-24 shrink-0 font-mono text-sm text-slate-400">— 06 . CONTACT</div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                transition={{ duration: 0.6 }}
                className="rounded-xl p-6 bg-[#09101a]/80 border border-[#112233]"
              >
                <h3 className="text-white font-semibold">Let's build something remarkable</h3>
                <p className="mt-2 text-slate-400">Open to full-time roles, freelance, and AI/backend collaborations. Drop me a message.</p>

                <div className="mt-5 space-y-3">
                  <a href={`mailto:${USER.email}`} className="flex items-center gap-3 p-3 rounded-md bg-[#0b1320]/60 border border-[#112233] cyber-cta text-[#00f2ff]">
                                      <Mail /> <div className="font-mono text-sm">{USER.email}</div>
                  </a>
                                    <a href={`tel:${USER.phone}`} className="flex items-center gap-3 p-3 rounded-md bg-[#0b1320]/60 border border-[#112233] cyber-cta text-[#00f2ff]">
                                      <Phone /> <div className="font-mono text-sm">{USER.phone}</div>
                  </a>
                                    <a href={USER.linkedin} className="flex items-center gap-3 p-3 rounded-md bg-[#0b1320]/60 border border-[#112233] cyber-cta text-[#00f2ff]">
                                      <Linkedin /> <div className="font-mono text-sm">LinkedIn</div>
                  </a>
                                    <a href={USER.github} className="flex items-center gap-3 p-3 rounded-md bg-[#0b1320]/60 border border-[#112233] cyber-cta text-[#00f2ff]">
                                                        <Github /> <div className="font-mono text-sm">GitHub</div>
                  </a>
                </div>
              </motion.div>

              <motion.form
                onSubmit={handleContactSubmit}
                initial="hidden"
                whileInView="visible"
                variants={reveal}
                transition={{ duration: 0.6 }}
                className="rounded-xl p-6 bg-[#09101a]/80 border border-[#112233] space-y-3"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    required
                    name="name"
                    value={contact.name}
                    onChange={handleContactChange}
                    placeholder="Your name"
                    className="w-full rounded-md px-3 py-2 bg-[#07131a] border border-[#112233] text-white text-sm"
                  />
                  <input
                    required
                    name="email"
                    type="email"
                    value={contact.email}
                    onChange={handleContactChange}
                    placeholder="your@email.com"
                    className="w-full rounded-md px-3 py-2 bg-[#07131a] border border-[#112233] text-white text-sm"
                  />
                </div>

                <input
                  name="subject"
                  value={contact.subject}
                  onChange={handleContactChange}
                  placeholder="What's this about?"
                  className="w-full rounded-md px-3 py-2 bg-[#07131a] border border-[#112233] text-white text-sm"
                />
                <textarea
                  required
                  name="message"
                  value={contact.message}
                  onChange={handleContactChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  className="w-full rounded-md px-3 py-2 bg-[#07131a] border border-[#112233] text-white text-sm"
                />

                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-400 font-mono">Or reach out directly at {USER.email}</div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#00f2ff] text-black font-semibold hover:shadow-[0_0_20px_rgba(0,242,255,0.2)] transition"
                  >
                    {submitting ? "SENDING..." : "SEND MESSAGE"} <Send size={14} />
                  </button>
                </div>
              </motion.form>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mt-12 border-t border-[#112233] pt-6 pb-12">
          <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#09101a]/70 rounded-sm flex items-center justify-center border border-[#112233]">
                <div className="text-[#00f2ff] font-bold">D</div>
              </div>
              <div className="text-sm text-slate-400">© {new Date().getFullYear()} {USER.brand}. All rights reserved.</div>
            </div>

            <div className="flex items-center gap-3">
              <a href={USER.github} className="p-2 rounded bg-[#09101a]/60 border border-[#112233]">
                              <Github className="text-[#00f2ff]" />
              </a>
              <a href={USER.linkedin} className="p-2 rounded bg-[#09101a]/60 border border-[#112233]">
                <Linkedin className="text-[#00f2ff]" />
              </a>
              <a href={`mailto:${USER.email}`} className="p-2 rounded bg-[#09101a]/60 border border-[#112233]">
                <Mail className="text-[#00f2ff]" />
              </a>
            </div>
          </div>
        </footer>

        {/* floating chat / quick contact */}
        <a
          href="#contact"
          className="fixed right-6 bottom-6 z-50 bg-[#00f2ff] p-3 rounded-full shadow-[0_6px_20px_rgba(0,242,255,0.2)]"
          aria-label="Chat"
        >
          <Send className="text-black" />
        </a>
      </main>
    </div>
  );
}
