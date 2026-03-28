// ─── Portfolio Data ─────────────────────────────────────────────────────────
// Single source of truth for all content rendered in the portfolio.

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

// ─── Projects ────────────────────────────────────────────────────────────────
export const PROJECTS = [
  {
    id: "alor-shohor",
    mode: "sw", // primarily a SW-mode showcase
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
    // Skin mockup colors
    skin: {
      bg: "#0A1A0A",
      bgAlt: "#EEF4FF",
      accent: "#22C55E",
    },
    // Skeleton architecture nodes
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
    mode: "hw", // primarily a HW-mode showcase
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

// ─── Skills ───────────────────────────────────────────────────────────────────
export const SKILL_GATES = [
  {
    id: "web",
    label: "Web Gate",
    icon: "⟨/⟩",
    color: "#3B82F6",
    mode: "sw", // highlighted in SW mode
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
    mode: "hw", // highlighted in HW mode
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

// ─── Achievements ─────────────────────────────────────────────────────────────
export const ACHIEVEMENTS = [
  {
    timestamp: "2024-03-14T09:01:00",
    level: "WIN",
    label: "[WIN]",
    color: "#22C55E",
    msg: "ClashDevs — Frontend Development Competition",
    detail: "Winner",
  },
  {
    timestamp: "2024-02-08T14:22:00",
    level: "WIN",
    label: "[WIN]",
    color: "#22C55E",
    msg: "Itrocity IoT Hackathon — Hardware-Based Innovation Challenge",
    detail: "Winner",
  },
  {
    timestamp: "2024-01-19T11:45:00",
    level: "FIN",
    label: "[FIN]",
    color: "#3B82F6",
    msg: "Hack4Her Hackathon — Women Empowerment Marketplace Platform",
    detail: "Finalist",
  },
  {
    timestamp: "2023-12-05T16:10:00",
    level: "TOP3",
    label: "[TOP3]",
    color: "#F59E0B",
    msg: "Amiphoria — React Frontend Development Competition",
    detail: "Top 3 Finalist",
  },
  {
    timestamp: "2023-11-22T09:30:00",
    level: "FNLR",
    label: "[FNLR]",
    color: "#A855F7",
    msg: "DevWrap Hackathon — Final Round",
    detail: "Final Round",
  },
  {
    timestamp: "2023-10-14T13:00:00",
    level: "PART",
    label: "[PART]",
    color: "#64748B",
    msg: "DevNexus Hackathon — Participant",
    detail: "Participant",
  },
  {
    timestamp: "2023-09-01T08:00:00",
    level: "LEAD",
    label: "[LEAD]",
    color: "#EF4444",
    msg: "SCECE — Tech Co-Lead Role",
    detail: "Leadership",
  },
];

// ─── Football Easter Egg data ─────────────────────────────────────────────────
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
