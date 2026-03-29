import { useState, useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { PERSONAL, FOOTBALL } from "../data/portfolio";

/* ─── Football micro-animation ──────────────────────────────────────────────
   A small soccer ball that bounces in the corner and reveals a tooltip       */
function FootballEasterEgg() {
  const [kicked, setKicked] = useState(false);
  const [showQuote, setShowQuote] = useState(false);

  const handleKick = () => {
    setKicked(true);
    setShowQuote(true);
    setTimeout(() => setKicked(false), 700);
    setTimeout(() => setShowQuote(false), 3000);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={handleKick}
        title="Click to kick!"
        animate={
          kicked
            ? { rotate: [0, -20, 360], scale: [1, 1.3, 0.9, 1] }
            : { y: [0, -6, 0] }
        }
        transition={
          kicked
            ? { duration: 0.6, ease: "easeInOut" }
            : { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }
        className="text-2xl select-none"
        aria-label="Football easter egg — click to kick!"
      >
        ⚽
      </motion.button>

      <AnimatePresence>
        {showQuote && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 rounded-lg text-center pointer-events-none"
            style={{
              background: "var(--color-bg-card)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 8px 24px var(--color-accent-glow)",
            }}
          >
            <p className="text-[10px] font-mono text-theme-muted leading-relaxed">
              {FOOTBALL.quote}
            </p>
            <div
              className="absolute bottom-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 -mt-[-4px]"
              style={{
                background: "var(--color-bg-card)",
                borderBottom: "1px solid var(--color-border)",
                borderRight: "1px solid var(--color-border)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Animated counter for a stat ────────────────────────────────────────── */
function StatCounter({ value, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const observed = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !observed.current) {
        observed.current = true;
        const num = parseInt(value);
        if (isNaN(num)) return;
        let start = 0;
        const step = Math.ceil(num / 40);
        const timer = setInterval(() => {
          start = Math.min(start + step, num);
          setCount(start);
          if (start >= num) clearInterval(timer);
        }, 30);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="text-2xl md:text-3xl font-display tracking-wider"
        style={{ color: "var(--color-accent)" }}
      >
        {count}
        {value.includes("+") ? "+" : ""}
      </div>
      <div className="text-[10px] font-mono tracking-[0.15em] text-theme-faint mt-1 uppercase">
        {label}
      </div>
    </div>
  );
}

/* ─── Scrolling ticker tape ──────────────────────────────────────────────── */
function Ticker({ items }) {
  return (
    <div className="relative overflow-hidden h-6 flex items-center">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap"
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-[10px] font-mono tracking-[0.18em] text-theme-faint uppercase"
          >
            {item}
            <span className="ml-12 text-accent opacity-40">◈</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Main Hero Component ────────────────────────────────────────────────── */
export default function Hero() {
  const { isHardware, engineMode } = useTheme();

  // 3D parallax on mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 300 });

  const rotateX = useTransform(smoothY, [-300, 300], [4, -4]);
  const rotateY = useTransform(smoothX, [-600, 600], [-6, 6]);
  const parallaxA = useTransform(smoothX, [-600, 600], [-18, 18]);
  const parallaxB = useTransform(smoothY, [-300, 300], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.width / 2);
    mouseY.set(e.clientY - rect.height / 2);
  };
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Hardware mode: HW-specific text reveals with staccato timing
  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * (isHardware ? 0.12 : 0.08),
        duration: isHardware ? 0.3 : 0.75,
        ease: isHardware
          ? [0, 0, 1, 1] // linear/staccato
          : [0.16, 1, 0.3, 1], // smooth spring
      },
    }),
  };

  const tickerItems = isHardware
    ? [
        "ESP32",
        "IoT Systems",
        "DHT11",
        "Firebase",
        "Next.js",
        "Python",
        "C",
        "MatLab",
        "Embedded Systems",
      ]
    : [
        "React.js",
        "Spring Boot",
        "Next.js",
        "PostgreSQL",
        "Docker",
        "JWT Auth",
        "MySQL",
        "Tailwind CSS",
      ];

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
    >
      {/* ── Hardware background grid ────────────────────────────────────── */}
      {isHardware && (
        <div className="absolute inset-0 pcb-bg opacity-100 pointer-events-none" />
      )}

      {/* ── Radial accent glow ──────────────────────────────────────────── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: "60vw",
          height: "60vw",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--color-accent-glow) 0%, transparent 70%)",
          left: "50%",
          top: "40%",
          x: "-50%",
          y: "-50%",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.9, 0.6] }}
        transition={{
          duration: isHardware ? 2 : 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="will-change-transform"
        >
          {/* Top label row */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            className="flex items-center gap-4 mb-10"
          >
            <span className="section-label">
              {isHardware ? "// ECE ENGINEER" : "// FULL STACK DEVELOPER"}
            </span>
            <div
              className="flex-1 h-px max-w-16"
              style={{ background: "var(--color-border)" }}
            />
            <FootballEasterEgg />
          </motion.div>

          {/* ── Hero typography ────────────────────────────────────────── */}
          <div className="overflow-hidden">
            <motion.h1
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={1}
              className="font-display text-hero-xl leading-none"
              style={{
                color: "var(--color-text)",
                x: parallaxA,
              }}
              data-text="ARPAN"
            >
              ARPAN
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              variants={textVariants}
              initial="hidden"
              animate="visible"
              custom={2}
              className="font-display text-hero-xl leading-none"
              style={{
                WebkitTextStroke: "2px var(--color-text)",
                color: "transparent",
                x: useTransform(parallaxA, (v) => v * -0.7),
              }}
            >
              KUNDU
            </motion.h1>
          </div>

          {/* Subtitle strip */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex flex-wrap items-center gap-3 mt-6"
            style={{ y: parallaxB }}
          >
            <div
              className="h-px flex-1 max-w-12"
              style={{ background: "var(--color-accent)" }}
            />
            <span
              className="font-mono text-xs tracking-[0.2em] uppercase"
              style={{ color: "var(--color-text-muted)" }}
            >
              {isHardware
                ? "Hardware · IoT · Embedded Systems · ECE"
                : "Java · Spring Boot · React · Docker · Full Stack"}
            </span>
            <div
              className="h-px flex-1 max-w-12"
              style={{ background: "var(--color-accent)" }}
            />
          </motion.div>

          {/* Description paragraph */}
          <motion.p
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-6 max-w-xl text-sm md:text-base leading-relaxed text-theme-muted"
          >
            {isHardware
              ? "ECE student at Academy of Technology. Building IoT systems that bridge the gap between physical sensors and real-time web interfaces."
              : "Full-stack developer specializing in Java + Spring Boot backends, React frontends, and containerized deployments. Currently building IoT-integrated applications."}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            custom={5}
            className="flex flex-wrap gap-3 mt-8"
          >
            <a href="#projects" className="btn-primary">
              <span>View Projects</span>
              <span className="text-xs opacity-70">→</span>
            </a>
            <a href={`mailto:${PERSONAL.email}`} className="btn-outline">
              <span>Get in Touch</span>
            </a>
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              <span className="font-mono text-xs">GitHub ↗</span>
            </a>
          </motion.div>
        </motion.div>

        {/* ── Stats row ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-3 md:grid-cols-6 gap-6 mt-16 pt-8 border-t border-theme"
        >
          <StatCounter value="2" label="Years Dev" />
          <StatCounter value="4" label="Projects" />
          <StatCounter value="7" label="Hackathons" />
          <StatCounter value="2" label="Wins" />
          <StatCounter value="95" label="Academics %" />
          <StatCounter value="200" label="Football hrs" />
        </motion.div>
      </div>

      {/* ── Scrolling ticker tape ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-12 border-y border-theme py-2 overflow-hidden"
        style={{ background: "var(--color-surface)" }}
      >
        <Ticker items={tickerItems} />
      </motion.div>

      {/* ── Scroll cue ───────────────────────────────────────────────────── */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span className="font-mono text-[9px] tracking-[0.25em] text-theme-faint">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-accent), transparent)",
          }}
        />
      </motion.div> */}
    </section>
  );
}
