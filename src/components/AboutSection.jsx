import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  PERSONAL,
  EDUCATION,
  EDUCATION_SECTION,
  FOOTBALL,
} from "../data/portfolio";
import {
  staggerContainer,
  slideInLeft,
  slideInRight,
  useIsMobile,
  mobileFadeIn,
  mobileSlideInLeft,
  mobileSlideInRight,
  useParallax,
  fadeIn,
  slideUp,
  mobileSlideUp,
} from "../hooks/animations";

function EducationCard({ item, index }) {
  const { isHardware } = useTheme();
  const isMobile = useIsMobile();

  const slideRight = isMobile ? mobileSlideInRight : slideInRight;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      whileHover={{ scale: 1.02 }}
      viewport={{ amount: 0.3, once: false }}
      variants={slideRight}
      transition={{
        delay: index * 0.08,
        duration: isHardware ? 0.25 : 0.5,
        ease: isHardware ? [0, 0, 1, 1] : [0.16, 1, 0.3, 1],
      }}
      className={`
        flex gap-4 p-4 rounded-xl border transition-all duration-300
        hover:border-accent
        ${item.highlight ? "glow-accent" : ""}
      `}
      style={{
        background: item.highlight
          ? "var(--color-surface)"
          : "var(--color-bg-card)",
        borderColor: item.highlight
          ? "var(--color-accent-dim)"
          : "var(--color-border)",
      }}
    >
      <div
        className="text-xl shrink-0 mt-0.5 font-mono"
        style={{ color: "var(--color-accent)" }}
      >
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-theme leading-snug">
          {item.degree}
        </div>
        <div className="text-xs text-theme-muted mt-1">{item.institution}</div>
        <div className="flex items-center gap-3 mt-2">
          {item.year && (
            <span
              className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded"
              style={{
                background: "var(--color-surface)",
                color: "var(--color-accent)",
                border: "1px solid var(--color-border)",
              }}
            >
              {item.year}
            </span>
          )}
          {item.score && (
            <span
              className="text-[10px] font-mono font-bold"
              style={{ color: "var(--color-accent)" }}
            >
              {item.score}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function FootballSection() {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3, once: false }}
      variants={isMobile ? mobileFadeIn : fadeIn}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="p-5 rounded-xl border relative overflow-hidden"
      style={{
        background: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      {/* Background watermark */}
      <div
        className="absolute right-4 bottom-2 text-7xl opacity-5 select-none pointer-events-none"
        style={{ fontFamily: "sans-serif" }}
      >
        ⚽
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">⚽</span>
        <div>
          <div className="text-xs font-semibold text-theme">
            {FOOTBALL.passion}
          </div>
          <div className="text-[10px] font-mono text-theme-faint">
            {FOOTBALL.positions}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        {Object.entries(FOOTBALL.stats).map(([k, v]) => (
          <div key={k} className="text-center">
            <div
              className="text-base font-display tracking-wide"
              style={{ color: "var(--color-accent)" }}
            >
              {v}
            </div>
            <div className="text-[9px] font-mono text-theme-faint mt-0.5 leading-tight">
              {k}
            </div>
          </div>
        ))}
      </div>

      <p
        className="text-[11px] font-mono text-theme-muted italic leading-relaxed border-l-2 pl-3"
        style={{ borderColor: "var(--color-accent-dim)" }}
      >
        {FOOTBALL.quote}
      </p>
    </motion.div>
  );
}

export default function AboutSection() {
  const { isHardware } = useTheme();
  const isMobile = useIsMobile();
  const y = useParallax([-20, 20]);

  return (
    <motion.section
      id="about"
      className="py-24 px-6"
      style={{ y: isMobile ? 0 : y }} // Reduce parallax on mobile
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
          variants={staggerContainer}
          className="mb-12 overflow-hidden"
        >
          <motion.div
            variants={isMobile ? mobileFadeIn : fadeIn}
            className="section-label"
          >
            {EDUCATION_SECTION?.sectionLabel || "02 / ABOUT"}
          </motion.div>

          <motion.h2
            variants={isMobile ? mobileSlideUp : slideUp}
            className="font-display text-hero-sm text-theme leading-none mt-2"
          >
            {EDUCATION_SECTION?.heading || "DUAL-CORE\nENGINEER"}
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* ── Left: Bio + contact ─────────────────────────────────── */}
          <div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3, once: false }}
              variants={staggerContainer}
            >
              {PERSONAL.bio.map((para, i) => (
                <motion.p
                  key={i}
                  variants={isMobile ? mobileFadeIn : fadeIn}
                  className="text-sm text-theme-muted leading-relaxed mb-4"
                >
                  {para}
                </motion.p>
              ))}
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3, once: false }}
              variants={isMobile ? mobileSlideInLeft : slideInLeft}
              className="mt-6 space-y-2"
            >
              {[
                {
                  label: "Email",
                  value: PERSONAL.email,
                  href: `mailto:${PERSONAL.email}`,
                },
                {
                  label: "GitHub",
                  value: "ARPANkundu2404",
                  href: PERSONAL.github,
                },
                { label: "Location", value: PERSONAL.location, href: null },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-theme-faint w-16 shrink-0 tracking-wider">
                    {item.label}
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel="noreferrer"
                      className="text-xs font-mono text-theme-muted hover:text-accent transition-colors duration-200"
                    >
                      {item.value} ↗
                    </a>
                  ) : (
                    <span className="text-xs font-mono text-theme-muted">
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Football easter egg */}
            <div className="mt-8">
              <div className="section-label text-[9px] mb-3">
                OUTSIDE THE IDE
              </div>
              <FootballSection />
            </div>
          </div>

          {/* ── Right: Education ─────────────────────────────────────── */}
          <div>
            <div className="section-label mb-4">EDUCATION</div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3, once: false }}
              variants={staggerContainer}
            >
              <div className="space-y-4">
                {EDUCATION.map((item, i) => (
                  <EducationCard key={i} item={item} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Coursework chips */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.3, once: false }}
              variants={isMobile ? mobileFadeIn : fadeIn}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 p-4 rounded-xl border"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="section-label text-[9px] mb-3">
                RELEVANT COURSEWORK
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Digital Electronics",
                  "Microprocessors",
                  "Network Theory",
                  "Signals & Systems",
                  "Internet of Things",
                  "VLSI Design",
                ].map((c) => (
                  <span key={c} className="tag text-[10px]">
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
