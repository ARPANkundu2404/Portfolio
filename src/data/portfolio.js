// ─── Portfolio Data ─────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH
// All content (personal info, projects, skills, achievements, education, navigation)
// is defined here. Components import and render this data dynamically.
//
// ✓ No hardcoded text in components
// ✓ All changes require editing ONLY this file
// ✓ Use optional chaining (?.) for optional fields

// ─── PERSONAL ────────────────────────────────────────────────────────────────
export const PERSONAL = {
  name: "Arpan Kundu",
  title: "Full Stack & ECE Engineer",
  subtitle: "Java · Spring Boot · React · IoT · Embedded Systems",
  location: "West Bengal, India",
  email: "kunduarpan2404@gmail.com",
  github: "https://github.com/ARPANkundu2404",
  bio: [
    "Full-stack developer skilled in Java, Spring Boot, React.js, and MySQL — building and deploying scalable applications with Docker.",
    "ECE student with hands-on IoT experience: sensor integration, ESP32, real-time data monitoring, and hardware–software bridging.",
  ],
};

// ─── NAVIGATION LINKS ─────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

// ─── NAVBAR BRANDING ─────────────────────────────────────────────────────────
export const NAVBAR_BRANDING = {
  logoAcronym: "AK", // Personal initials
  taglineSW: "DEV·PORTFOLIO",
  taglineHW: "ECE·ENGINEER",
};

// ─── HERO SECTION ────────────────────────────────────────────────────────────
export const HERO = {
  sectionLabel: "01 / HELLO",
  headline: "I BUILD",
  headlineOutline: "SYSTEMS.",
  subtitle: "Full-stack software engineer & IoT enthusiast.",
  cta: {
    primary: { label: "View Work →", href: "#projects" },
    secondary: { label: "Get in Touch →", href: "#contact" },
  },
};

// ─── ABOUT SECTION ───────────────────────────────────────────────────────────
export const ABOUT = {
  sectionLabel: "02 / ABOUT",
  heading: "BIO",
  // Bio paragraphs from PERSONAL.bio are used here
};

// ─── PROJECTS SECTION ────────────────────────────────────────────────────────
export const PROJECTS_SECTION = {
  sectionLabel: "03 / PROJECTS",
  heading: "WHAT I BUILT",
  description:
    "Hover any card to X-Ray the architecture. The skeleton reveals the technical blueprint beneath.",
  filters: [
    { id: "all", label: "All" },
    { id: "sw", label: "Software" },
    { id: "hw", label: "Hardware" },
  ],
};

export const PROJECTS = [
  {
    id: "alor-shohor",
    mode: "sw",
    type: "Full Stack · Cultural Tech",
    title: "Alor Shohor",
    subtitle: "Puja Navigator",
    desc: "Festival navigation platform helping users explore Durga Puja pandals and nearby metro routes. JWT auth, real-time map, PostgreSQL, deployed on Render.",
    tags: [
      "React.js",
      "Spring Boot",
      "PostgreSQL",
      "Docker",
      "JWT",
      "Tailwind CSS",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/ARPANkundu2404" },
      { label: "Live", url: "#" },
    ],
    skin: {
      bg: "#0A1A0A",
      bgAlt: "#EEF4FF",
      accent: "#22C55E",
    },
    skeleton: {
      nodes: [
        {
          id: "react",
          label: "React.js",
          x: 20,
          y: 90,
          color: "#61DAFB",
          w: 80,
        },
        {
          id: "tailwind",
          label: "Tailwind",
          x: 20,
          y: 135,
          color: "#38BDF8",
          w: 80,
        },
        {
          id: "spring",
          label: "Spring Boot",
          x: 145,
          y: 90,
          color: "#6DB33F",
          w: 90,
        },
        {
          id: "jwt",
          label: "JWT+RBAC",
          x: 145,
          y: 135,
          color: "#F59E0B",
          w: 90,
        },
        {
          id: "postgres",
          label: "PostgreSQL",
          x: 280,
          y: 90,
          color: "#336791",
          w: 85,
        },
        {
          id: "docker",
          label: "Docker",
          x: 280,
          y: 135,
          color: "#2496ED",
          w: 85,
        },
      ],
      edges: [
        { from: "react", to: "spring" },
        { from: "tailwind", to: "jwt" },
        { from: "spring", to: "postgres" },
        { from: "jwt", to: "docker" },
      ],
      label: "ALOR SHOHOR / SYSTEM ARCH",
    },
  },
  {
    id: "smart-parking",
    mode: "hw",
    type: "IoT · Final Year Project",
    title: "Smart Parking",
    subtitle: "IoT Slot Booking",
    desc: "IoT-enabled parking management using ESP32 sensor nodes to detect vehicle occupancy, syncing live data to Firebase for real-time slot booking via Next.js.",
    tags: ["ESP32", "IoT", "Next.js", "Python", "Firebase", "DHT11"],
    links: [{ label: "GitHub", url: "#" }],
    skin: {
      bg: "#060A06",
      bgAlt: "#F0FFF0",
      accent: "#22C55E",
    },
    skeleton: {
      nodes: [
        { id: "esp32", label: "ESP32", x: 20, y: 90, color: "#E74C3C", w: 72 },
        { id: "dht", label: "DHT11", x: 20, y: 130, color: "#F39C12", w: 72 },
        {
          id: "ir",
          label: "IR Sensor",
          x: 20,
          y: 170,
          color: "#9B59B6",
          w: 72,
        },
        {
          id: "firebase",
          label: "Firebase",
          x: 155,
          y: 120,
          color: "#FFCA28",
          w: 80,
        },
        {
          id: "python",
          label: "Python API",
          x: 290,
          y: 95,
          color: "#3776AB",
          w: 80,
        },
        {
          id: "nextjs",
          label: "Next.js UI",
          x: 290,
          y: 143,
          color: "#EEEEEE",
          w: 80,
        },
      ],
      edges: [
        { from: "esp32", to: "firebase" },
        { from: "dht", to: "firebase" },
        { from: "ir", to: "firebase" },
        { from: "firebase", to: "python" },
        { from: "firebase", to: "nextjs" },
      ],
      label: "SMART PARKING / IOT ARCH",
    },
  },
  {
    id: "taskflow",
    mode: "sw",
    type: "Full Stack · Productivity",
    title: "Taskflow",
    subtitle: "Workflow Manager",
    desc: "Task and workflow management system with Spring Boot REST APIs, JWT role-based access control, and structured MySQL database architecture.",
    tags: ["Spring Boot", "React.js", "MySQL", "JWT", "REST API"],
    links: [{ label: "GitHub", url: "#" }],
    skin: {
      bg: "#06060A",
      bgAlt: "#F5F5FF",
      accent: "#3B82F6",
    },
    skeleton: {
      nodes: [
        {
          id: "react",
          label: "React UI",
          x: 20,
          y: 110,
          color: "#61DAFB",
          w: 82,
        },
        {
          id: "spring",
          label: "Spring Boot",
          x: 155,
          y: 110,
          color: "#6DB33F",
          w: 88,
        },
        {
          id: "mysql",
          label: "MySQL",
          x: 300,
          y: 110,
          color: "#4479A1",
          w: 72,
        },
        {
          id: "jwt",
          label: "JWT Auth",
          x: 155,
          y: 158,
          color: "#F59E0B",
          w: 88,
        },
      ],
      edges: [
        { from: "react", to: "spring" },
        { from: "spring", to: "mysql" },
        { from: "spring", to: "jwt" },
      ],
      label: "TASKFLOW / SYSTEM ARCH",
    },
  },
  {
    id: "weather-iot",
    mode: "hw",
    type: "IoT · Hackathon Winner",
    title: "Weather Monitor",
    subtitle: "Real-Time IoT System",
    desc: "IoT-based weather monitoring using ESP32 + DHT11. Transmits sensor data to Firebase, visualized on a React dashboard. Winner — Itrocity IoT Hackathon.",
    tags: ["ESP32", "DHT11", "Firebase", "React.js", "IoT"],
    links: [{ label: "GitHub", url: "#" }],
    skin: {
      bg: "#030A0A",
      bgAlt: "#E8F8FF",
      accent: "#38BDF8",
    },
    skeleton: {
      nodes: [
        { id: "esp32", label: "ESP32", x: 20, y: 100, color: "#E74C3C", w: 72 },
        { id: "dht", label: "DHT11", x: 20, y: 145, color: "#F39C12", w: 72 },
        {
          id: "firebase",
          label: "Firebase",
          x: 155,
          y: 122,
          color: "#FFCA28",
          w: 80,
        },
        {
          id: "react",
          label: "React Dash",
          x: 295,
          y: 122,
          color: "#61DAFB",
          w: 82,
        },
      ],
      edges: [
        { from: "esp32", to: "firebase" },
        { from: "dht", to: "firebase" },
        { from: "firebase", to: "react" },
      ],
      label: "WEATHER MONITOR / IOT ARCH",
    },
  },
];

// ─── SKILLS SECTION ──────────────────────────────────────────────────────────
export const SKILLS_SECTION = {
  sectionLabel: "04 / SKILLS",
  heading: "TECH STACK",
};

export const SKILL_GATES = [
  {
    id: "web",
    label: "Web Gate",
    icon: "⟨/⟩",
    color: "#3B82F6",
    mode: "sw",
    skills: [
      { name: "React.js", level: 90 },
      { name: "Next.js", level: 75 },
      { name: "Tailwind CSS", level: 88 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 88 },
      { name: "JavaScript", level: 85 },
    ],
  },
  {
    id: "backend",
    label: "Backend Gate",
    icon: "⚙",
    color: "#F59E0B",
    mode: "both",
    skills: [
      { name: "Java", level: 90 },
      { name: "Spring Boot", level: 85 },
      { name: "Flask", level: 70 },
      { name: "REST APIs", level: 90 },
      { name: "JWT Auth", level: 82 },
      { name: "Docker", level: 78 },
      { name: "MySQL", level: 85 },
      { name: "PostgreSQL", level: 78 },
    ],
  },
  {
    id: "hardware",
    label: "Hardware Gate",
    icon: "◈",
    color: "#22C55E",
    mode: "hw",
    skills: [
      { name: "C", level: 80 },
      { name: "Python", level: 75 },
      { name: "ESP32", level: 82 },
      { name: "IoT Systems", level: 78 },
      { name: "DHT11", level: 85 },
      { name: "Firebase", level: 72 },
      { name: "MatLab", level: 65 },
      { name: "Git", level: 88 },
    ],
  },
];

// ─── ACHIEVEMENTS SECTION ────────────────────────────────────────────────────
export const ACHIEVEMENTS_SECTION = {
  sectionLabel: "05 / ACHIEVEMENTS",
  heading: "GROWTH TIMELINE",
};

export const ACHIEVEMENTS = [
  {
    id: 1,
    title: "Weather Monitor IoT System",
    role: "Winner",
    event: "Itrocity IoT Hackathon",
    year: 2024,
    timestamp: "2024-02-08T14:22:00",
    techStack: ["ESP32", "DHT11", "Firebase", "React.js", "IoT"],
    description:
      "Real-time weather monitoring system using ESP32 microcontroller with DHT11 sensor. Transmits sensor data to Firebase and visualizes on a responsive React dashboard. Won for innovation in IoT-frontend integration.",
    badges: ["WINNER"],
    links: [
      { label: "GitHub", url: "#" },
      { label: "Demo", url: "#" },
    ],
  },
  {
    id: 2,
    title: "Frontend Development Excellence",
    role: "Winner",
    event: "ClashDevs",
    year: 2024,
    timestamp: "2024-03-14T09:01:00",
    techStack: ["React.js", "Tailwind CSS", "Framer Motion", "JavaScript"],
    description:
      "Competitive coding and frontend development challenge. Built a pixel-perfect, animated UI component system under time constraints. Awarded for code quality, UX design, and performance optimization.",
    badges: ["WINNER"],
    links: [
      { label: "GitHub", url: "#" },
      { label: "Live", url: "#" },
    ],
  },
  {
    id: 3,
    title: "Women Empowerment Marketplace",
    role: "Finalist",
    event: "Hack4Her Hackathon",
    year: 2024,
    timestamp: "2024-01-19T11:45:00",
    techStack: ["React.js", "Spring Boot", "PostgreSQL", "JWT", "Tailwind CSS"],
    description:
      "Full-stack e-commerce platform designed to empower women entrepreneurs. Built a marketplace with seller authentication, product catalog, and integrated payment gateway. Reached finalist stage for social impact and technical implementation.",
    badges: ["FINALIST"],
    links: [
      { label: "GitHub", url: "#" },
      { label: "Pitch", url: "#" },
    ],
  },
  {
    id: 4,
    title: "Advanced React Component Library",
    role: "Top 3 Finalist",
    event: "Amiphoria",
    year: 2023,
    timestamp: "2023-12-05T16:10:00",
    techStack: ["React.js", "Storybook", "TypeScript", "Component Design"],
    description:
      "Developed a reusable, well-documented React component library. Showcased advanced patterns including hooks, context, and compound components. Ranked in top 3 for code organization and documentation quality.",
    badges: ["TOP 3"],
    links: [
      { label: "Storybook", url: "#" },
      { label: "GitHub", url: "#" },
    ],
  },
  {
    id: 5,
    title: "Real-Time Collaborative Platform",
    role: "Final Round",
    event: "DevWrap Hackathon",
    year: 2023,
    timestamp: "2023-11-22T09:30:00",
    techStack: ["WebSockets", "Node.js", "React.js", "MongoDB"],
    description:
      "Built a real-time collaborative workspace with live cursors, document editing, and instant messaging. Demonstrated expertise in WebSocket communication and state synchronization across clients.",
    badges: ["FINALIST"],
    links: [{ label: "GitHub", url: "#" }],
  },
  {
    id: 6,
    title: "IoT Sensor Integration",
    role: "Participant",
    event: "DevNexus Hackathon",
    year: 2023,
    timestamp: "2023-10-14T13:00:00",
    techStack: ["ESP32", "MQTT", "Python", "Data Visualization"],
    description:
      "Participated in IoT-focused hackathon. Worked on multi-sensor data collection and real-time visualization. Explored MQTT protocol for IoT communication and edge computing concepts.",
    badges: ["PARTICIPANT"],
    links: [{ label: "GitHub", url: "#" }],
  },
  {
    id: 7,
    title: "Technical Leadership",
    role: "Tech Co-Lead",
    event: "SCECE",
    year: 2023,
    timestamp: "2023-09-01T08:00:00",
    techStack: ["Team Management", "Technical Planning", "Mentorship"],
    description:
      "Served as Technical Co-Lead for SCECE. Mentored a team of developers, organized workshops, and led technical decision-making. Focused on fostering a collaborative engineering culture.",
    badges: ["LEADERSHIP"],
    links: [{ label: "Organization", url: "#" }],
  },
];

// ─── EDUCATION SECTION ───────────────────────────────────────────────────────
export const EDUCATION_SECTION = {
  sectionLabel: "05 / EDUCATION",
  heading: "ACADEMIC BACKGROUND",
};

export const EDUCATION = [
  {
    degree: "B.Tech — Electronics & Communication Engineering",
    institution: "Academy of Technology",
    year: "2023 – Present",
    score: null,
    icon: "◈",
    highlight: true,
  },
  {
    degree: "Higher Secondary (WBCHSE)",
    institution: "Kalna Maharaja's High School",
    year: "2021 – 2022",
    score: "95%",
    icon: "◉",
    highlight: false,
  },
  {
    degree: "Secondary (WBBSE)",
    institution: "Kalna Maharaja's High School",
    year: "2019 – 2020",
    score: "95%",
    icon: "◎",
    highlight: false,
  },
];

// ─── FOOTER / CONTACT SECTION ────────────────────────────────────────────────
export const FOOTER = {
  sectionLabel: "06 / CONTACT",
  headline: "LET'S BUILD",
  headlineOutline: "SOMETHING.",
  description:
    "Open to full-stack roles, IoT projects, hackathons, and interesting collaborations.",
  cta: {
    primary: { label: "Say Hello →", href: `mailto:${PERSONAL.email}` },
    secondary: { label: "GitHub ↗", href: PERSONAL.github, external: true },
  },
  copyright: {
    author: "ARPAN KUNDU",
    location: "WEST BENGAL, INDIA",
    taglineSW: "JAVA · REACT · DOCKER",
    taglineHW: "ECE · IoT · EMBEDDED",
    year: 2024,
    closing: "i hope to hear from you.",
  },
};

// ─── CONTACT FORM CONFIGURATION ──────────────────────────────────────────────
export const CONTACT_FORM = {
  fields: [
    {
      id: "user_title",
      name: "user_title",
      type: "text",
      label: "Subject",
      placeholder: "What is this about?",
      required: true,
    },
    {
      id: "user_name",
      name: "user_name",
      type: "text",
      label: "Name",
      placeholder: "Your name",
      required: true,
    },
    {
      id: "user_email",
      name: "user_email",
      type: "email",
      label: "Email",
      placeholder: "your.email@example.com",
      required: true,
    },
    {
      id: "message",
      name: "message",
      type: "textarea",
      label: "Message",
      placeholder: "Your message here...",
      rows: 5,
      required: true,
    },
  ],
  emailjs: {
    publicKey: "YOUR_PUBLIC_KEY",
    serviceId: "service_cvosvwc",
    contactTemplateId: "template_ll3ny6r",
    autoReplyTemplateId: "template_ar0omjk",
  },
  messages: {
    success: "✓ Message sent successfully! I'll get back to you soon.",
    error: "✗ Failed to send message. Please try again or email directly.",
    sending: "Sending...",
    submit: "Send Message",
  },
};

// ─── FOOTBALL EASTER EGG ─────────────────────────────────────────────────────
export const FOOTBALL = {
  passion: "Football Enthusiast ⚽",
  clubs: ["Real Madrid"],
  positions: "Defender · Destroyer",
  quote: '"Control the game from the back."',
  stats: {
    "Matches Played": "200+",
    "Favorite Position": "No.4",
    "Skill Level": "Weekend Warrior",
  },
};
