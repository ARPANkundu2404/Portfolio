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
  { label: "Experience", href: "#experience" },
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
  modeLabels: {
    sw: "// FULL STACK DEVELOPER",
    hw: "// ECE ENGINEER",
  },
  cta: {
    primary: { label: "View Work →", href: "#projects" },
    secondary: { label: "Get in Touch →", href: "#contact" },
  },
};

// ─── HERO STATS (Counter values) ──────────────────────────────────────────
export const HERO_STATS = [
  { value: "2", label: "YEARS BUILDING" },
  { value: "4", label: "PROJECTS SHIPPED" },
  { value: "7", label: "WINS + FINALS" },
  { value: "2", label: "HACKATHON RINGS" },
  { value: "95", label: "% SCORE AVG" },
  { value: "200+", label: "MATCHES PLAYED" },
];

// ─── TICKER ITEMS (Scrolling tech stack by mode) ────────────────────────────
export const TICKER_ITEMS = {
  sw: [
    "React.js",
    "Next.js",
    "Spring Boot",
    "MYSQL",
    "PostgreSQL",
    "Docker",
    "JWT Auth",
    "REST APIs",
    "Tailwind CSS",
  ],
  hw: [
    "ESP32",
    "ESP8266",
    "Nuvoton 8051",
    "Arduino",
    "IoT Systems",
    "Embedded C",
    "PCB Design",
    "SMD",
    "DHT11",
    "DRV8825",
    "Motor Control",
    "Hardware Testing",
  ],
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
      {
        label: "Live",
        url: "https://durga-puja-pandel-hopping-app.onrender.com/",
      },
    ],
    skin: {
      bg: "#0A1A0A",
      bgAlt: "#EEF4FF",
      accent: "#22C55E",

      visual: {
        grid: {
          rows: 6,
          columns: 10,
          startX: 20,
          startY: 25,
          gapX: 35,
          gapY: 28,
          radius: 1,
          color: "accent",
          opacity: 0.08,
        },

        elements: [
          {
            type: "rect",
            x: 0,
            y: 0,
            width: 400,
            height: 27,
            fill: "panel",
          },

          {
            type: "text",
            x: 15,
            y: 17,
            value: "ALOR SHOHOR",
            size: 7,
            color: "accent",
            letterSpacing: 1.5,
          },

          {
            type: "rect",
            x: 0,
            y: 27,
            width: 105,
            height: 173,
            fill: "panelSoft",
            stroke: "border",
            strokeWidth: 0.7,
          },

          {
            type: "text",
            x: 12,
            y: 45,
            value: "PANDALS",
            size: 7,
            color: "accent",
            letterSpacing: 1,
          },

          {
            type: "pill",
            x: 10,
            y: 52,
            width: 80,
            height: 15,
            value: "Shyambazar",
            color: "muted",
          },

          {
            type: "pill",
            x: 10,
            y: 72,
            width: 80,
            height: 15,
            value: "Kumartuli",
            color: "accent",
            border: "accent",
          },

          {
            type: "pill",
            x: 10,
            y: 92,
            width: 80,
            height: 15,
            value: "Bagbazar",
            color: "muted",
          },

          {
            type: "pill",
            x: 10,
            y: 112,
            width: 80,
            height: 15,
            value: "Coll. Street",
            color: "muted",
          },

          {
            type: "circle",
            x: 180,
            y: 70,
            radius: 6,
            fill: "green",
          },

          {
            type: "circle",
            x: 260,
            y: 55,
            radius: 6,
            fill: "yellow",
          },

          {
            type: "circle",
            x: 320,
            y: 120,
            radius: 6,
            fill: "red",
          },

          {
            type: "circle",
            x: 225,
            y: 145,
            radius: 6,
            fill: "green",
          },

          {
            type: "pill",
            x: 300,
            y: 35,
            width: 70,
            height: 15,
            value: "LIVE MAP",
            color: "accent",
            border: "accent",
          },
        ],
      },
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
    subtitle: "IoT-Enabled Parking Solution",
    desc: "Developing an IoT-enabled parking management system using ESP32-based sensor nodes for real-time vehicle occupancy detection, slot availability monitoring and cloud-connected parking visualization.",
    tags: [
      "ESP32",
      "IR Sensors",
      "IoT",
      "Sensor Interfacing",
      "Embedded Systems",
      "Real-Time Monitoring",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/ARPANkundu2404/Final-Year-Project",
      },
    ],
    skin: {
      bg: "#060A06",
      bgAlt: "#F0FFF0",
      accent: "#22C55E",

      visual: {
        elements: [
          {
            type: "text",
            x: 15,
            y: 18,
            value: "PARKING GRID — LIVE",
            size: 7.5,
            color: "accent",
            letterSpacing: 1.5,
          },

          {
            type: "grid",
            x: 15,
            y: 28,
            columns: 5,
            rows: 2,
            cellWidth: 70,
            cellHeight: 28,
            gap: 5,
            occupied: [1, 3, 5, 7],
            occupiedFill: "red",
            occupiedBorder: "red",
            occupiedText: "red",
            occupiedLabel: "■",
            freeFill: "panelSoft",
            freeBorder: "green",
            freeText: "green",
            freeLabel: "P",
          },

          {
            type: "pill",
            x: 15,
            y: 95,
            width: 105,
            height: 25,
            value: "FREE  6",
            color: "green",
            border: "green",
          },

          {
            type: "pill",
            x: 145,
            y: 95,
            width: 105,
            height: 25,
            value: "OCC.  4",
            color: "red",
            border: "red",
          },

          {
            type: "pill",
            x: 275,
            y: 95,
            width: 105,
            height: 25,
            value: "ESP32  ●",
            color: "accent",
            border: "accent",
          },

          {
            type: "text",
            x: 200,
            y: 155,
            value: "REAL-TIME SLOT OCCUPANCY",
            size: 7,
            anchor: "middle",
            color: "muted",
            letterSpacing: 1.5,
          },
        ],
      },
    },
    skeleton: {
      nodes: [
        {
          id: "esp32",
          label: "ESP32",
          x: 20,
          y: 90,
          color: "#E74C3C",
          w: 72,
        },
        {
          id: "ir",
          label: "IR Sensors",
          x: 20,
          y: 140,
          color: "#9B59B6",
          w: 82,
        },
        {
          id: "sensor",
          label: "Occupancy",
          x: 155,
          y: 115,
          color: "#F39C12",
          w: 82,
        },
        {
          id: "cloud",
          label: "Cloud Data",
          x: 290,
          y: 95,
          color: "#FFCA28",
          w: 82,
        },
        {
          id: "web",
          label: "Web App",
          x: 290,
          y: 145,
          color: "#61DAFB",
          w: 82,
        },
      ],
      edges: [
        { from: "esp32", to: "sensor" },
        { from: "ir", to: "sensor" },
        { from: "sensor", to: "cloud" },
        { from: "cloud", to: "web" },
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
    links: [
      { label: "GitHub", url: "https://github.com/ARPANkundu2404/Taskflow" },
    ],
    skin: {
      bg: "#06060A",
      bgAlt: "#F5F5FF",
      accent: "#3B82F6",

      visual: {
        elements: [
          {
            type: "text",
            x: 15,
            y: 17,
            value: "TASKFLOW — KANBAN",
            size: 7.5,
            color: "accent",
            letterSpacing: 1.5,
          },

          {
            type: "text",
            x: 20,
            y: 35,
            value: "TO DO",
            size: 7,
            color: "accent",
          },

          {
            type: "text",
            x: 145,
            y: 35,
            value: "IN PROGRESS",
            size: 7,
            color: "accent",
          },

          {
            type: "text",
            x: 290,
            y: 35,
            value: "DONE",
            size: 7,
            color: "accent",
          },

          {
            type: "rect",
            x: 15,
            y: 42,
            width: 105,
            height: 42,
            radius: 3,
            fill: "panelSoft",
            stroke: "border",
            strokeWidth: 0.7,
          },

          {
            type: "rect",
            x: 15,
            y: 90,
            width: 105,
            height: 42,
            radius: 3,
            fill: "panelSoft",
            stroke: "border",
            strokeWidth: 0.7,
          },

          {
            type: "rect",
            x: 140,
            y: 42,
            width: 105,
            height: 42,
            radius: 3,
            fill: "panelSoft",
            stroke: "border",
            strokeWidth: 0.7,
          },

          {
            type: "rect",
            x: 140,
            y: 90,
            width: 105,
            height: 42,
            radius: 3,
            fill: "panelSoft",
            stroke: "border",
            strokeWidth: 0.7,
          },

          {
            type: "rect",
            x: 285,
            y: 42,
            width: 100,
            height: 42,
            radius: 3,
            fill: "panelSoft",
            stroke: "border",
            strokeWidth: 0.7,
          },

          {
            type: "rect",
            x: 285,
            y: 90,
            width: 100,
            height: 42,
            radius: 3,
            fill: "panelSoft",
            stroke: "border",
            strokeWidth: 0.7,
          },

          {
            type: "rect",
            x: 22,
            y: 52,
            width: 65,
            height: 4,
            radius: 2,
            fill: "accent",
            opacity: 0.55,
          },

          {
            type: "rect",
            x: 22,
            y: 100,
            width: 78,
            height: 4,
            radius: 2,
            fill: "accent",
            opacity: 0.55,
          },

          {
            type: "rect",
            x: 147,
            y: 52,
            width: 72,
            height: 4,
            radius: 2,
            fill: "accent",
            opacity: 0.55,
          },

          {
            type: "rect",
            x: 147,
            y: 100,
            width: 85,
            height: 4,
            radius: 2,
            fill: "accent",
            opacity: 0.55,
          },

          {
            type: "rect",
            x: 292,
            y: 52,
            width: 88,
            height: 4,
            radius: 2,
            fill: "accent",
            opacity: 0.55,
          },

          {
            type: "rect",
            x: 292,
            y: 100,
            width: 75,
            height: 4,
            radius: 2,
            fill: "accent",
            opacity: 0.55,
          },
        ],
      },
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
    title: "IoTricity",
    subtitle: "Real-Time Weather Monitoring System",
    desc: "IoT-based weather monitoring system using ESP32 and DHT11 for real-time temperature and humidity acquisition. Sensor data is transmitted to Firebase for live monitoring and visualized through a React dashboard. Winner of the IoTricity IoT Hackathon.",
    tags: [
      "ESP32",
      "DHT11",
      "Firebase",
      "React.js",
      "IoT",
      "Sensor Interfacing",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/ARPANkundu2404/my_weather_app",
      },
    ],
    skin: {
      bg: "#030A0A",
      bgAlt: "#E8F8FF",
      accent: "#38BDF8",

      visual: {
        elements: [
          {
            type: "text",
            x: 15,
            y: 17,
            value: "WEATHER MONITOR",
            size: 7.5,
            color: "accent",
            letterSpacing: 1.5,
          },

          {
            type: "rect",
            x: 15,
            y: 27,
            width: 175,
            height: 48,
            radius: 4,
            fill: "panelSoft",
            stroke: "blue",
            strokeWidth: 0.7,
          },

          {
            type: "rect",
            x: 205,
            y: 27,
            width: 175,
            height: 48,
            radius: 4,
            fill: "panelSoft",
            stroke: "blue",
            strokeWidth: 0.7,
          },

          {
            type: "text",
            x: 27,
            y: 41,
            value: "🌡 TEMP",
            size: 6.5,
            color: "muted",
          },

          {
            type: "text",
            x: 27,
            y: 62,
            value: "28.4°C",
            size: 15,
            color: "accent",
            weight: "bold",
          },

          {
            type: "text",
            x: 217,
            y: 41,
            value: "💧 HUMIDITY",
            size: 6.5,
            color: "muted",
          },

          {
            type: "text",
            x: 217,
            y: 62,
            value: "67%",
            size: 15,
            color: "accent",
            weight: "bold",
          },

          {
            type: "bar",
            x: 20,
            y: 82,
            width: 28,
            height: 55,
            value: 22,
            color: "blue",
          },

          {
            type: "bar",
            x: 52,
            y: 82,
            width: 28,
            height: 55,
            value: 30,
            color: "blue",
            opacity: 0.55,
          },

          {
            type: "bar",
            x: 84,
            y: 82,
            width: 28,
            height: 55,
            value: 26,
            color: "blue",
            opacity: 0.55,
          },

          {
            type: "bar",
            x: 116,
            y: 82,
            width: 28,
            height: 55,
            value: 38,
            color: "blue",
            opacity: 0.55,
          },

          {
            type: "bar",
            x: 148,
            y: 82,
            width: 28,
            height: 55,
            value: 33,
            color: "blue",
            opacity: 0.55,
          },

          {
            type: "bar",
            x: 180,
            y: 82,
            width: 28,
            height: 55,
            value: 29,
            color: "blue",
            opacity: 0.55,
          },

          {
            type: "bar",
            x: 212,
            y: 82,
            width: 28,
            height: 55,
            value: 41,
            color: "blue",
            opacity: 0.55,
          },

          {
            type: "bar",
            x: 244,
            y: 82,
            width: 28,
            height: 55,
            value: 28,
            color: "blue",
            opacity: 0.55,
          },

          {
            type: "bar",
            x: 276,
            y: 82,
            width: 28,
            height: 55,
            value: 36,
            color: "blue",
            opacity: 0.55,
          },

          {
            type: "bar",
            x: 308,
            y: 82,
            width: 28,
            height: 55,
            value: 39,
            color: "blue",
          },

          {
            type: "text",
            x: 200,
            y: 155,
            value: "LAST 10 READINGS · ESP32",
            size: 7,
            anchor: "middle",
            color: "muted",
            letterSpacing: 1.2,
          },
        ],
      },
    },
    skeleton: {
      nodes: [
        {
          id: "esp32",
          label: "ESP32",
          x: 20,
          y: 100,
          color: "#E74C3C",
          w: 72,
        },
        {
          id: "dht",
          label: "DHT11",
          x: 20,
          y: 145,
          color: "#F39C12",
          w: 72,
        },
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
      label: "IOTRICITY / WEATHER MONITOR",
    },
  },
  {
    id: "rc-car",
    mode: "hw",
    type: "Embedded Systems · TechFest",
    title: "RC Car",
    subtitle: "ESP32 BLDC Motor Control",
    desc: "Designed and built an RC car using an ESP32 microcontroller, BLDC motor and electronic speed controller for a college TechFest racing event.",
    tags: ["ESP32", "BLDC Motor", "ESC", "Motor Control", "Embedded Systems"],
    links: [],
    skin: {
      bg: "#080A05",
      bgAlt: "#F3F8E8",
      accent: "#84CC16",

      visual: {
        elements: [
          {
            type: "text",
            x: 15,
            y: 17,
            value: "RC CAR — MOTOR CONTROL",
            size: 7.5,
            color: "accent",
            letterSpacing: 1.5,
          },

          /* Chassis */
          {
            type: "rect",
            x: 25,
            y: 48,
            width: 205,
            height: 78,
            radius: 6,
            fill: "panelSoft",
            stroke: "border",
            strokeWidth: 0.8,
          },

          /* Wheels */
          {
            type: "rect",
            x: 42,
            y: 57,
            width: 22,
            height: 55,
            radius: 7,
            fill: "panel",
            stroke: "accent",
            strokeWidth: 2,
          },

          {
            type: "rect",
            x: 190,
            y: 57,
            width: 22,
            height: 55,
            radius: 7,
            fill: "panel",
            stroke: "accent",
            strokeWidth: 2,
          },

          /* Controller body */
          {
            type: "rect",
            x: 90,
            y: 69,
            width: 95,
            height: 38,
            radius: 5,
            fill: "panel",
            stroke: "accent",
            strokeWidth: 1,
          },

          {
            type: "text",
            x: 137,
            y: 84,
            value: "ESP32",
            size: 7,
            anchor: "middle",
            color: "accent",
          },

          {
            type: "pill",
            x: 102,
            y: 91,
            width: 32,
            height: 12,
            value: "MCU",
            color: "accent",
            border: "accent",
          },

          {
            type: "pill",
            x: 141,
            y: 91,
            width: 32,
            height: 12,
            value: "ESC",
            color: "blue",
            border: "blue",
          },

          /* Telemetry */
          {
            type: "pill",
            x: 245,
            y: 40,
            width: 140,
            height: 20,
            value: "MOTOR  BLDC",
            color: "accent",
            border: "accent",
          },

          {
            type: "pill",
            x: 245,
            y: 65,
            width: 140,
            height: 20,
            value: "ESC  ACTIVE",
            color: "blue",
            border: "blue",
          },

          {
            type: "pill",
            x: 245,
            y: 90,
            width: 140,
            height: 20,
            value: "THROTTLE  72%",
            color: "yellow",
            border: "yellow",
          },

          {
            type: "pill",
            x: 245,
            y: 115,
            width: 140,
            height: 20,
            value: "DIRECTION  FWD",
            color: "green",
            border: "green",
          },

          {
            type: "text",
            x: 200,
            y: 158,
            value: "ESP32 · BLDC · ESC · MOTOR CONTROL",
            size: 7,
            anchor: "middle",
            color: "muted",
            letterSpacing: 1.2,
          },
        ],
      },
    },
    skeleton: {
      nodes: [
        {
          id: "esp32",
          label: "ESP32",
          x: 20,
          y: 115,
          color: "#E74C3C",
          w: 72,
        },
        {
          id: "esc",
          label: "ESC",
          x: 155,
          y: 95,
          color: "#F59E0B",
          w: 72,
        },
        {
          id: "motor",
          label: "BLDC Motor",
          x: 290,
          y: 95,
          color: "#22C55E",
          w: 90,
        },
        {
          id: "control",
          label: "Speed Control",
          x: 155,
          y: 145,
          color: "#3B82F6",
          w: 90,
        },
      ],
      edges: [
        { from: "esp32", to: "esc" },
        { from: "esc", to: "motor" },
        { from: "esp32", to: "control" },
        { from: "control", to: "esc" },
      ],
      label: "RC CAR / MOTOR CONTROL",
    },
  },
  {
    id: "smart-india-hackathon-itms",
    mode: "hw",
    type: "Hardware · SIH 2025",
    title: "Indigenous Contactless ITMS",
    subtitle: "Indian Railways Track Monitoring",
    desc: "Proposed a hardware-focused Indigenous Contactless Integrated Track Monitoring System (ITMS) for Indian Railways, targeting safer and faster track monitoring through modular onboard sensing architecture.",
    tags: [
      "LiDAR",
      "IMU",
      "GNSS",
      "Encoder",
      "Accelerometer",
      "Railway Monitoring",
    ],
    links: [],
    skin: {
      bg: "#090705",
      bgAlt: "#FFF7ED",
      accent: "#F97316",

      visual: {
        elements: [
          {
            type: "text",
            x: 15,
            y: 17,
            value: "CONTACTLESS ITMS — RAIL MONITOR",
            size: 7.5,
            color: "accent",
            letterSpacing: 1.3,
          },

          /* Railway sleepers */
          ...Array.from({ length: 10 }, (_, index) => ({
            type: "rect",
            x: 30 + index * 35,
            y: 45,
            width: 4,
            height: 82,
            fill: "muted",
            opacity: 0.45,
          })),

          /* Rails */
          {
            type: "line",
            x1: 20,
            y1: 62,
            x2: 380,
            y2: 62,
            color: "accent",
            width: 2,
          },

          {
            type: "line",
            x1: 20,
            y1: 105,
            x2: 380,
            y2: 105,
            color: "accent",
            width: 2,
          },

          /* Monitoring unit */
          {
            type: "rect",
            x: 145,
            y: 70,
            width: 110,
            height: 30,
            radius: 4,
            fill: "panel",
            stroke: "accent",
            strokeWidth: 1,
          },

          {
            type: "text",
            x: 200,
            y: 82,
            value: "CONTACTLESS UNIT",
            size: 6.5,
            anchor: "middle",
            color: "accent",
          },

          {
            type: "pill",
            x: 151,
            y: 85,
            width: 30,
            height: 10,
            value: "LiDAR",
            size: 5,
            color: "orange",
            border: "orange",
          },

          {
            type: "pill",
            x: 185,
            y: 85,
            width: 25,
            height: 10,
            value: "IMU",
            size: 5,
            color: "purple",
            border: "purple",
          },

          {
            type: "pill",
            x: 214,
            y: 85,
            width: 32,
            height: 10,
            value: "GNSS",
            size: 5,
            color: "blue",
            border: "blue",
          },

          /* Sensor status */
          {
            type: "pill",
            x: 15,
            y: 145,
            width: 85,
            height: 18,
            value: "LiDAR  SCAN",
            size: 5.5,
            color: "orange",
            border: "orange",
          },

          {
            type: "pill",
            x: 108,
            y: 145,
            width: 75,
            height: 18,
            value: "IMU  OK",
            size: 5.5,
            color: "blue",
            border: "blue",
          },

          {
            type: "pill",
            x: 191,
            y: 145,
            width: 85,
            height: 18,
            value: "GNSS  LOCK",
            size: 5.5,
            color: "green",
            border: "green",
          },

          {
            type: "pill",
            x: 284,
            y: 145,
            width: 100,
            height: 18,
            value: "ENCODER  SYNC",
            size: 5.5,
            color: "yellow",
            border: "yellow",
          },

          {
            type: "text",
            x: 200,
            y: 185,
            value: "REAL-TIME TRACK CONDITION MONITORING · PS 25020",
            size: 6,
            anchor: "middle",
            color: "muted",
            letterSpacing: 0.8,
          },
        ],
      },
    },
    skeleton: {
      nodes: [
        {
          id: "lidar",
          label: "LiDAR",
          x: 20,
          y: 95,
          color: "#F97316",
          w: 72,
        },
        {
          id: "imu",
          label: "IMU",
          x: 20,
          y: 145,
          color: "#8B5CF6",
          w: 72,
        },
        {
          id: "gnss",
          label: "GNSS",
          x: 155,
          y: 95,
          color: "#3B82F6",
          w: 72,
        },
        {
          id: "encoder",
          label: "Encoder",
          x: 155,
          y: 145,
          color: "#22C55E",
          w: 78,
        },
        {
          id: "itms",
          label: "ITMS",
          x: 295,
          y: 120,
          color: "#EAB308",
          w: 72,
        },
      ],
      edges: [
        { from: "lidar", to: "itms" },
        { from: "imu", to: "itms" },
        { from: "gnss", to: "itms" },
        { from: "encoder", to: "itms" },
      ],
      label: "SIH 2025 / INDIGENOUS ITMS",
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
      { name: "Framer Motion", level: 75 },
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
      { name: "MySQL", level: 85 },
      { name: "PostgreSQL", level: 78 },
      { name: "Docker", level: 78 },
    ],
  },
  {
    id: "hardware",
    label: "Hardware Gate",
    icon: "◈",
    color: "#22C55E",
    mode: "hw",
    skills: [
      { name: "Embedded C", level: 80 },
      { name: "ESP32", level: 82 },
      { name: "Nuvoton 8051", level: 78 },
      { name: "IoT Systems", level: 82 },
      { name: "PCB Design", level: 78 },
      { name: "SMD & Soldering", level: 80 },
      { name: "Sensor Interfacing", level: 82 },
      { name: "Hardware Testing", level: 80 },
    ],
  },
];

// ─── INTERNSHIP CERTIFICATE ──────────────────────────────────────────────────
export const CERTIFICATES = [
  {
    id: "synchro-electronics-certificate",
    company: "Synchro Electronics",
    title: "Engineering Internship Certificate",
    role: "Engineering Intern",
    duration: "17 Aug 2026 – 03 Sep 2026",
    issuedDate: "03 Sep 2026",

    image:
      "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1789813174/Synchro_Electronics_certificate_jwi9ku.jpg",
  },
];

export const getCertificateById = (id) =>
  CERTIFICATES.find((certificate) => certificate.id === id) ?? null;

// ─── WORK EXPERIENCE SECTION ─────────────────────────────────────────────────
export const EXPERIENCE_SECTION = {
  sectionLabel: "05 / EXPERIENCE",
  heading: "WORK EXPERIENCE",
  description:
    "Industry exposure across Software Development, IoT & Embedded Systems.",
};

/**
 * EXPERIENCE
 *
 * Add a new object to this array to add a new role — no component changes needed.
 *
 * Shape:
 *   id             string   unique slug (used as React key)
 *   mode           'sw'|'hw' which engine mode this role belongs to (drives the filter chips)
 *   role           string   job title
 *   company        string   organisation name
 *   type           string   e.g. "Engineering Internship"
 *   duration       string   e.g. "17 Aug 2026 – 03 Sep 2026"
 *   location       string   optional
 *   description    string   one concise professional summary line
 *   responsibilities string[]  concise bullets (keep them short)
 *   technologies   string[]  rendered as chips
 *   certificateId  string|null  must match an `id` in CERTIFICATES below
 *   placeholder    boolean  when true the entry is SKIPPED at render time
 */
export const EXPERIENCE = [
  // ── TODO: SOFTWARE DEVELOPMENT INTERNSHIP ────────────────────────────────
  // This entry is intentionally NOT rendered (placeholder: true).
  // Fill in the real values below and change `placeholder` to false to publish it.
  {
    id: "software-internship",
    placeholder: true,
    mode: "sw",
    role: "TODO — role title",
    company: "TODO — company name",
    type: "Software Development Internship",
    duration: "TODO — start date – end date",
    location: "TODO — city, state",
    description: "TODO — one-line professional summary of the internship.",
    responsibilities: [
      "TODO — key responsibility 1",
      "TODO — key responsibility 2",
    ],
    technologies: [],
    certificateId: null,
  },

  // ── VERIFIED: SYNCHRO ELECTRONICS ────────────────────────────────────────
  {
    id: "synchro-electronics",
    placeholder: false,
    mode: "hw",
    role: "Engineering Intern",
    company: "Synchro Electronics",
    type: "Engineering Internship",
    duration: "17 Aug 2026 – 03 Sep 2026",
    location: "Kolkata, West Bengal",
    description:
      "Hands-on embedded systems and hardware engineering internship covering microcontroller-based motor control, PCB work and hardware testing.",
    responsibilities: [
      "Worked on the design and development of a Stepper Motor Controller using a Nuvoton 8051-family microcontroller and DRV8825 driver.",
      "Worked with STEP/DIR/ENABLE control and hardware assembly.",
      "Gained hands-on exposure to PCB design related to transformer/voltage-section components of an Automated Test Equipment (ATE) system.",
      "Learned SMD component handling, soldering, desoldering and PCB assembly.",
      "Gained exposure to hardware testing including relay and Digital Output cards, BLDC fan PCB testing, AC voltage-meter calibration and ELD systems.",
    ],
    technologies: [
      "Nuvoton 8051",
      "DRV8825",
      "Microcontrollers",
      "PCB Design",
      "SMD",
      "Soldering",
      "Hardware Testing",
      "ATE Systems",
      "Embedded Systems",
    ],
    certificateId: "synchro-electronics-certificate",
  },
];

// ─── ACHIEVEMENTS SECTION ────────────────────────────────────────────────────
export const ACHIEVEMENTS_SECTION = {
  sectionLabel: "06 / ACHIEVEMENTS",
  heading: "GROWTH TIMELINE",
};

export const ACHIEVEMENTS = [
  {
    id: 1,
    title: "Weather Monitor IoT System",
    role: "Winner",
    event: "Itrocity IoT Hackathon",
    year: 2025,
    timestamp: "2025-09-03T14:22:00",
    techStack: ["ESP32", "DHT11", "Firebase", "React.js", "IoT"],
    description:
      "Real-time weather monitoring system using ESP32 microcontroller with DHT11 sensor. Transmits sensor data to Firebase and visualizes on a responsive React dashboard. Won for innovation in IoT-frontend integration.",
    badges: ["WINNER"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/ARPANkundu2404/my_weather_app",
      },
      // { label: "Demo", url: "#" },
    ],
    media: {
      certificate:
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776063012/Iotricity_duyyfg.jpg",
      images: [
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776067117/IMG-20250903-WA0059_bp4z6e.jpg",
      ],
    },
  },
  {
    id: 2,
    title: "Frontend Development Excellence",
    role: "Winner",
    event: "ClashDevs",
    year: 2024,
    timestamp: "2024-04-09T09:01:00",
    techStack: ["HTML", "CSS", "JavaScript"],
    description:
      "Competitive coding and frontend development challenge. Built a pixel-perfect, animated UI component system under time constraints. Awarded for code quality, UX design, and performance optimization.",
    badges: ["WINNER"],
    // links: [
    //   { label: "GitHub", url: "#" },
    //   { label: "Live", url: "#" },
    // ],
    media: {
      certificate:
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776063023/ClashDevs_lqq68n.jpg",
      images: [
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776067117/IMG-20240421-WA0120_qrqucx.jpg",
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776067119/20240409_181328_rczg5e.jpg",
      ],
    },
  },
  {
    id: 3,
    title: "Women Empowerment Marketplace",
    role: "Runner-Up",
    event: "Hack4Her Hackathon",
    year: 2025,
    timestamp: "2025-04-26T11:45:00",
    techStack: ["React.js", "Flask", "PostgreSQL", "JWT", "Tailwind CSS"],
    description:
      "Full-stack e-commerce platform designed to empower women entrepreneurs. Built a marketplace with seller authentication, product catalog, and integrated payment gateway. Reached finalist stage for social impact and technical implementation.",
    badges: ["RUNNER-UP"],
    links: [
      { label: "GitHub", url: "https://github.com/ARPANkundu2404/RuralDev" },
    ],
    media: {
      certificate:
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776062917/hack4Her_u8imqt.jpg",
      images: [
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776068889/IMG-20250426-WA0019_iccrwc.jpg",
      ],
    },
  },
  {
    id: 4,
    title: "Advanced React Component Library",
    role: "Top 3 Finalist",
    event: "Amiphoria",
    year: 2024,
    timestamp: "2024-03-07T16:10:00",
    techStack: ["React.js", "Storybook", "TypeScript", "Component Design"],
    description:
      "Developed a reusable, well-documented React component library. Showcased advanced patterns including hooks, context, and compound components. Ranked in top 3 for code organization and documentation quality.",
    badges: ["TOP 3"],
    // links: [
    //   { label: "Storybook", url: "#" },
    //   { label: "GitHub", url: "#" },
    // ],
    media: {
      certificate:
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776063014/Amiphoria_mf8qsx.jpg",
      images: [
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776067991/IMG-20250308-WA0025_zntdvq.jpg",
      ],
    },
  },
  {
    id: 5,
    title: "Real-Time Frontend Development Challenge",
    role: "Final Round",
    event: "DevWrap Hackathon",
    year: 2024,
    timestamp: "2024-03-09T09:30:00",
    techStack: ["HTML", "CSS", "JavaScript", "Firebase"],
    description:
      "Built a real-time collaborative workspace with live cursors, document editing, and instant messaging. Demonstrated expertise in WebSocket communication and state synchronization across clients.",
    badges: ["FINALIST"],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/ARPANkundu2404/Electrocoders_EC102B",
      },
    ],
    media: {
      certificate:
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776068752/Arpan_Kundu_DevWrap_SCECE_Certificate_kpwimn.jpg",
      images: [
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776067116/IMG-20240309-WA0044_rvrcgt.jpg",
      ],
    },
  },
  {
    id: 6,
    title: "SafeBite",
    role: "Participant",
    event: "HexaFalls Hackathon",
    year: 2024,
    timestamp: "2024-07-01T10:00:00",
    techStack: [
      "React.js",
      "Flask",
      "Firebase",
      "Machine Learning",
      "REST API",
    ],
    description:
      "Developed SafeBite, a health-focused application designed to help users make safer food choices by analyzing ingredients and detecting potential health risks. Built a full-stack solution with a responsive React frontend and backend APIs for processing food data. Integrated intelligent analysis to identify harmful components and provide real-time recommendations, promoting better dietary awareness and preventive healthcare.",
    badges: ["PARTICIPANT"],
    links: [
      { label: "Devfolio", url: "https://devfolio.co/projects/safebite-6361" },
      { label: "GitHub", url: "https://github.com/ARPANkundu2404/hexa-falls" },
    ],
    media: {
      certificate:
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776062975/Hexafalls_bfjkff.jpg",
      images: [
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776067992/IMG-20250701-WA0030_td2z81.jpg",
      ],
    },
  },
  {
    id: 7,
    title: "MicroBreak Notifier",
    role: "Participant",
    event: "StatusCode 2 Hackathon",
    year: 2025,
    timestamp: "2025-08-24T12:00:00",
    techStack: [
      "React.js",
      "JavaScript",
      "Web Notifications API",
      "Python",
      "Flask",
    ],
    description:
      "Developed MicroBreak Notifier, a productivity-focused web application designed to promote healthier work habits by reminding users to take short breaks during long screen sessions. Implemented smart interval-based notifications using the Web Notifications API, combined with a minimal and intuitive React-based UI. Focused on improving user well-being, reducing screen fatigue, and enhancing productivity through lightweight, real-time reminders.",
    badges: ["PARTICIPANT"],
    links: [
      {
        label: "Devfolio",
        url: "https://devfolio.co/projects/microbreak-notifier-8326",
      },
      // { label: "GitHub", url: "#" },
    ],
    media: {
      certificate:
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776063014/StatusCode_zpx9iv.jpg",
      images: [
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776067116/IMG-20250824-WA0081_xcbb35.jpg",
      ],
    },
  },
  {
    id: 8,
    title: "LeafLink",
    role: "Participant",
    event: "DevNexus Hackathon",
    year: 2024,
    timestamp: "2024-09-23T11:45:00",
    techStack: ["HTML", "CSS", "JavaScript", "XML", "Sass"],
    description:
      "Developed LeafLink, a green web hosting marketplace that enables users to discover and compare eco-friendly hosting providers based on sustainability metrics such as renewable energy usage and carbon footprint. Focused on promoting environmentally responsible technology choices by integrating sustainability insights with a user-friendly platform.",
    badges: ["PARTICIPANT"],
    links: [
      {
        label: "Devfolio",
        url: "https://devfolio.co/projects/leaflink-a-green-web-hosting-marketplace-4e49",
      },
      { label: "GitHub", url: "https://github.com/ARPANkundu2404/leafLink" },
    ],
    media: {
      certificate:
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776062917/DevNexus_jg4lam.jpg",
      images: [
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776067116/IMG-20240922-WA0008_wiowpm.jpg",
      ],
    },
  },
  {
    id: 9,
    title: "Technical Leadership",
    role: "Tech Co-Lead",
    event: "SCECE",
    year: 2024,
    timestamp: "2024-12-16T08:00:00",
    techStack: ["Team Management", "Technical Planning", "Mentorship"],
    description:
      "Served as Technical Co-Lead for SCECE. Mentored a team of developers, organized workshops, and led technical decision-making. Focused on fostering a collaborative engineering culture.",
    badges: ["LEADERSHIP"],
    // links: [{ label: "Organization", url: "#" }],
    media: {
      certificate:
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776069148/SCECE_ff2uen.jpg",
      images: [
        "https://res.cloudinary.com/dyr6oh3vg/image/upload/v1776068666/1000540373_b2cctj.jpg",
      ],
    },
  },
];

// ─── PERSONAL INTERESTS SECTION (About→Outside the IDE) ──────────────────────
export const PERSONAL_INTERESTS_SECTION = {
  heading: "OUTSIDE THE IDE",
};

// ─── COURSEWORK ──────────────────────────────────────────────────────────────
export const COURSEWORK = [
  "Digital Electronics",
  "Microprocessors",
  "Signal Processing",
  "Network Security",
  "Database Systems",
  "Operating Systems",
  "Web Development",
  "Data Structures",
  "Algorithm Design",
  "Embedded Systems",
];

// ─── TERMINAL CONFIGURATION ──────────────────────────────────────────────────
export const TERMINAL_CONFIG = {
  welcomeMessage:
    'Welcome to Terminal FAQ! Type "help" for available commands.',
  commands: {
    help: {
      response: `Available Commands:
  whoami    - Display profile information
  skills    - Show technical skills by category
  football  - Football passion & stats
  contact   - Get contact information
  clear     - Clear terminal
  help      - Display this help message`,
    },
  },
};

// ─── ACHIEVEMENT FEATURED ROLES (for highlighting featured achievements) ─────
export const ACHIEVEMENT_FEATURED_ROLES = [
  "Winner",
  "Runner-Up",
  "Top 3 Finalist",
];

// ─── EDUCATION SECTION ───────────────────────────────────────────────────────
export const EDUCATION_SECTION = {
  sectionLabel: "02 / EDUCATION",
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
  sectionLabel: "08 / CONTACT",
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
      id: "user_title",
      name: "user_title",
      type: "text",
      label: "Subject",
      placeholder: "What is this about?",
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
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
    endpoint: "/send-email",
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
