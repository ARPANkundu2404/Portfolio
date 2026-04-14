import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { SKILL_GATES, SKILLS_SECTION } from "../data/portfolio";
import {
  staggerContainer,
  fadeIn,
  slideInLeft,
  slideInRight,
  mobileFadeIn,
  mobileSlideInLeft,
  mobileSlideInRight,
  useIsMobile,
} from "../hooks/animations";

/* ─── Individual skill bar ──────────────────────────────────────────────── */
function SkillBar({ name, level, color, isHardware, index }) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.1, once: true }}
      variants={isMobile ? mobileSlideInLeft : slideInLeft}
      transition={{
        delay: index * (isHardware ? 0.06 : 0.04),
        duration: isHardware ? 0.2 : 0.45,
        ease: isHardware ? [0, 0, 1, 1] : [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-mono text-theme-muted group-hover:text-accent transition-colors duration-200">
          {name}
        </span>
        <span
          className="text-[10px] font-mono transition-opacity duration-200"
          style={{ color, opacity: hovered ? 1 : 0.5 }}
        >
          {level}%
        </span>
      </div>
      <div
        className="h-0.5 rounded-full overflow-hidden"
        style={{ background: `${color}22` }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{
            delay: 0.3 + index * 0.04,
            duration: isHardware ? 0.3 : 0.8,
            ease: isHardware ? "linear" : [0.16, 1, 0.3, 1],
          }}
          className="h-full rounded-full"
          style={{
            background: hovered
              ? `linear-gradient(90deg, ${color}, ${color}88)`
              : color,
            boxShadow: hovered ? `0 0 8px ${color}66` : "none",
            transition: "box-shadow 0.2s",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Gate header with icon and label ───────────────────────────────────── */
function GateHeader({ gate, isActive, isHardware, onClick }) {
  const isAvailable =
    gate.mode === "both" ||
    (isHardware ? gate.mode === "hw" : gate.mode === "sw");

  return (
    <motion.button
      onClick={() => isAvailable && onClick(gate.id)}
      whileTap={isAvailable ? { scale: 0.95 } : {}}
      className={`
        relative flex items-center gap-3 px-4 py-3 rounded-lg border w-full text-left
        transition-all duration-300
        ${isActive ? "" : "opacity-50 hover:opacity-75"}
        ${!isAvailable ? "cursor-not-allowed opacity-30" : ""}
      `}
      style={{
        background: isActive ? `${gate.color}12` : "var(--color-surface)",
        borderColor: isActive ? gate.color : "var(--color-border)",
        boxShadow: isActive && isHardware ? `0 0 16px ${gate.color}33` : "none",
      }}
    >
      {/* Indicator dot */}
      <motion.div
        animate={{ opacity: isActive ? [0.6, 1, 0.6] : 0.3 }}
        transition={{
          duration: 1.2,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut",
        }}
        className="w-2 h-2 rounded-full shrink-0"
        style={{ background: isActive ? gate.color : "var(--color-border)" }}
      />

      {/* Icon */}
      <span
        className="text-lg font-mono leading-none"
        style={{ color: isActive ? gate.color : "var(--color-text-faint)" }}
      >
        {gate.icon}
      </span>

      <div className="flex-1 min-w-0">
        <div
          className="text-xs font-mono tracking-widest"
          style={{ color: isActive ? gate.color : "var(--color-text-muted)" }}
        >
          {gate.label.toUpperCase()}
        </div>
        <div className="text-[10px] font-mono text-theme-faint mt-0.5">
          {gate.skills.length} skills
        </div>
      </div>

      {/* Active arrow */}
      {isActive && (
        <motion.span
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs font-mono"
          style={{ color: gate.color }}
        >
          →
        </motion.span>
      )}

      {/* Disabled label */}
      {!isAvailable && (
        <span className="text-[9px] font-mono text-theme-faint">
          [{isHardware ? "SW" : "HW"} ONLY]
        </span>
      )}
    </motion.button>
  );
}

/* ─── PCB Bus line visualization ─────────────────────────────────────────── */
function BusVisualization({ activeGateId, isHardware }) {
  const gate = SKILL_GATES.find((g) => g.id === activeGateId);
  if (!gate) return null;

  return (
    <div className="relative h-8 overflow-hidden my-4">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <marker
            id="bus-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto"
          >
            <path
              d="M1 1 L8 5 L1 9"
              fill="none"
              stroke={gate.color}
              strokeWidth="2"
            />
          </marker>
        </defs>

        {/* Main bus line */}
        <motion.line
          x1="0"
          y1="16"
          x2="100%"
          y2="16"
          stroke={gate.color}
          strokeWidth="1.5"
          strokeOpacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Data pulses */}
        {isHardware && (
          <>
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((pos, i) => (
              <motion.circle
                key={i}
                r="3"
                fill={gate.color}
                animate={{ cx: ["0%", "100%"] }}
                transition={{
                  duration: 2,
                  delay: i * 0.35,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ cy: 16 }}
              />
            ))}
          </>
        )}
      </svg>

      <div
        className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono tracking-wider"
        style={{ color: gate.color, opacity: 0.6 }}
      >
        DATA BUS · {gate.label.toUpperCase()}
      </div>
    </div>
  );
}

/* ─── Main SkillsBus Component ───────────────────────────────────────────── */
export default function SkillsBus() {
  const { isHardware, engineMode } = useTheme();

  // Default active gate based on mode
  const defaultGate = isHardware ? "hardware" : "web";
  const [activeGate, setActiveGate] = useState(defaultGate);

  const gate = SKILL_GATES.find((g) => g.id === activeGate);
  const isMobile = useIsMobile();

  return (
    <motion.section
      id="skills"
      className="py-24 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.1, once: true }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={isMobile ? mobileFadeIn : fadeIn}
          className="mb-12"
        >
          <div className="section-label">{SKILLS_SECTION?.sectionLabel}</div>
          <h2 className="font-display text-hero-sm text-theme leading-none mt-2">
            {SKILLS_SECTION?.heading}
          </h2>
          <p className="text-sm text-theme-muted mt-3 max-w-md">
            {isHardware
              ? "Hardware + Software capabilities organized by signal path. Select a gate to inspect throughput."
              : "Full-stack competencies grouped by layer. Select a gate to inspect depth."}
          </p>
        </motion.div>

        {/* Main grid: gate selector + skill bars */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-6">
          {/* ── Gate selector column ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            {SKILL_GATES.map((g) => (
              <GateHeader
                key={g.id}
                gate={g}
                isActive={activeGate === g.id}
                isHardware={isHardware}
                onClick={setActiveGate}
              />
            ))}

            {/* Mode indicator */}
            <div
              className="mt-2 p-3 rounded-lg border text-center"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="text-[9px] font-mono text-theme-faint tracking-widest mb-1">
                ACTIVE MODE
              </div>
              <div
                className="text-xs font-mono tracking-wider"
                style={{ color: "var(--color-accent)" }}
              >
                {isHardware ? "⟨ HARDWARE ⟩" : "⟨ SOFTWARE ⟩"}
              </div>
            </div>
          </motion.div>

          {/* ── Skill bars panel ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-xl border p-6"
            style={{
              background: "var(--color-bg-card)",
              borderColor: "var(--color-border)",
              boxShadow: isHardware
                ? `0 0 24px ${gate?.color}15`
                : "var(--shadow-card-sw)",
            }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <span
                  className="text-2xl font-mono"
                  style={{ color: gate?.color }}
                >
                  {gate?.icon}
                </span>
                <div>
                  <div
                    className="text-sm font-mono tracking-widest font-semibold"
                    style={{ color: gate?.color }}
                  >
                    {gate?.label.toUpperCase()}
                  </div>
                  <div className="text-[10px] font-mono text-theme-faint">
                    {gate?.skills.length} registered signals
                  </div>
                </div>
              </div>
              {/* Animated pulse for active gate */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: gate?.color }}
              />
            </div>

            {/* Bus line */}
            <BusVisualization
              activeGateId={activeGate}
              isHardware={isHardware}
            />

            {/* Skills grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeGate}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4"
              >
                {gate?.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={gate.color}
                    isHardware={isHardware}
                    index={i}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Other tech mentions (condensed cloud) ────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 p-4 rounded-xl border"
          style={{
            background: "var(--color-surface)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="text-[10px] font-mono text-theme-faint tracking-widest mb-3">
            ALSO IN STACK
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Git",
              "Eclipse",
              "Pandas (learning)",
              "NumPy (learning)",
              "MVC Architecture",
              "Responsive Design",
              "Eclipse IDE",
            ].map((t) => (
              <span key={t} className="tag text-[10px]">
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
