/**
 * ============================================================
 *  SHIP'S MANIFEST — all portfolio content lives here.
 * ============================================================
 *  This is the ONLY file you should need to touch to add,
 *  remove, or edit information. Every section on the site is
 *  built from this object by js/render.js — add an array item
 *  to grow a section, delete one to shrink it, nothing else
 *  will break.
 *
 *  Rules of thumb:
 *   - Every list below can have items added or removed freely.
 *   - Leave a field as "" (empty string) or [] if you don't
 *     have that piece of info yet — the renderer skips blanks.
 *   - "tags" / "stack" arrays can be any length (0 or more).
 * ============================================================
 */

const PORTFOLIO_DATA = {

  captain: {
    name: "Dhairya Shah",
    title: "B.Tech Computer Science & Engineering",
    tagline: "Charting a course through code, circuits & cryptography.",
    location: "Ahmedabad, Gujarat",
    phone: "+91 9104629349",
    email: "dhairyagshah233@gmail.com",
    linkedin: { label: "dhairyagshah233", url: "https://www.linkedin.com/in/dhairyagshah233" },
    github: { label: "Dhairya233", url: "https://github.com/Dhairya233" },
  },

  // "Ship's Origin" — education
  education: [
    {
      institution: "Ahmedabad University, SEAS",
      degree: "Bachelor of Technology in Computer Science and Engineering",
      timeframe: "Expected May 2028",
      detail: "CGPA: 3.25 / 4.0",
    },
  ],

  // "The Arsenal" — skills, grouped so new categories can be added freely
  skillGroups: [
    {
      group: "Languages",
      icon: "scroll",
      items: ["C++", "Python", "SQL", "LaTeX"],
    },
    {
      group: "Frameworks & Tools",
      icon: "anchor",
      items: ["Next.js", "Supabase", "Vercel", "Git", "VS Code", "Logisim", "Verilog", "OpenCV", "MediaPipe", "CustomTkinter"],
    },
    {
      group: "Spoken Tongues",
      icon: "flag",
      items: ["English — Professional", "Hindi — Native", "Gujarati — Native"],
    },
  ],

  // "Voyages Logged" — work experience, oldest or newest first is your call;
  // rendered in the order listed here.
  voyages: [
    {
      role: "Research Intern",
      org: "Institute of Manufacturing and Economy, Ahmedabad University",
      timeframe: "May 2026 – July 2026",
      duties: [
        "Conducted comprehensive research on the Indian manufacturing sector to identify industry trends, growth metrics, and economic indicators.",
        "Analyzed quantitative and qualitative research data to generate actionable insights supporting the institute's core objectives.",
      ],
    },
    {
      role: "Event Coordinator & Graphic Designer",
      org: "Society of Automotive Engineers (SAE)",
      timeframe: "2024 – 2025",
      duties: [
        "Orchestrated end-to-end logistics for major technical events, ensuring 100% execution success and budget adherence.",
        "Boosted digital engagement by 20% through data-driven branding and the creation of technical marketing assets.",
      ],
    },
    {
      role: "Event Coordinator",
      org: "Ingenium",
      timeframe: "2026",
      duties: [
        "Managed finances and handled event timings.",
      ],
    },
  ],

  // "Plundered Treasures" — projects. Each links out to GitHub where possible.
  treasures: [
    {
      name: "GestureOS",
      subtitle: "Advanced Hand Tracking Utility",
      stack: ["Python", "OpenCV", "MediaPipe", "CustomTkinter"],
      description: "A multithreaded computer-vision app translating hand gestures into system-level controls, keystrokes and game inputs — with a custom resource manager, cross-tab exclusivity, real-time spatial audio control, and a gesture-triggered shutdown protocol.",
      link: "https://github.com/Dhairya233",
    },
    {
      name: "Life-RPG",
      subtitle: "Full-Stack Personal Growth App",
      stack: ["Next.js", "Supabase", "Vercel"],
      description: "Gamifies personal development — tracking physical and mental health goals with real-time sync via Supabase and a mobile-first dashboard for visualising growth.",
      link: "https://github.com/Dhairya233/life-rpg-protocol",
    },
    {
      name: "32-bit RISC Processor",
      subtitle: "Custom CPU, Built From Gates Up",
      stack: ["Verilog", "Computer Architecture"],
      description: "A functional 32-bit RISC processor with a custom Instruction Set Architecture handling arithmetic, logic and memory ops, and a modular ALU tuned to cut gate-level redundancy.",
      link: "https://github.com/Dhairya233",
    },
    {
      name: "Hardware Ping Pong",
      subtitle: "A Game Made of Pure Logic",
      stack: ["Verilog", "Digital Logic", "FSM"],
      description: "Real-time Ping Pong running entirely in hardware — paddle physics, collision detection and scoring driven by finite state machines with zero-latency timing.",
      link: "https://github.com/Dhairya233/Verilog-Ping-Pong",
    },
    {
      name: "Glacial Water Level Model",
      subtitle: "Predicting the Tides of Climate Change",
      stack: ["Python", "Monte Carlo", "Quasi Monte Carlo"],
      description: "A stochastic model forecasting climate-driven water rise across 5,000+ Monte Carlo iterations, using Quasi Monte Carlo matrix sampling to sharpen convergence.",
      link: "https://github.com/Dhairya233",
    },
    {
      name: "Project \"The KEY\"",
      subtitle: "A Security & Steganography Suite",
      stack: ["Python", "Cryptography", "SHA-256"],
      description: "A forensics toolkit using SHA-256 hashing for file integrity and LSB steganography to hide 250kb of encrypted data inside images without a visible trace.",
      link: "https://github.com/Dhairya233/StegoVerify",
    },
  ],

  // "Medals & Marks" — achievements / certifications
  medals: [
    {
      title: "AWS Academy Graduate — Data Engineering",
      note: "Certification",
    },
  ],
};
