import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { ACHIEVEMENTS } from "../data/portfolio";
import {
  staggerContainer,
  fadeIn,
  slideUp,
  mobileFadeIn,
  mobileSlideUp,
  useIsMobile,
} from "../hooks/animations";

/* ─── Format timestamp for terminal display ─────────────────────────────── */
function formatTime(isoString) {
  const d = new Date(isoString);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/* ─── Single log line component ─────────────────────────────────────────── */
function LogLine({ entry, isHardware, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: isHardware ? 0.1 : 0.3,
        delay: isHardware ? 0.02 : 0.05,
        ease: isHardware ? [0, 0, 1, 1] : [0.16, 1, 0.3, 1],
      }}
      className="flex items-start gap-3 py-1 group hover:bg-theme-surface rounded px-2 -mx-2 transition-colors duration-150"
    >
      {/* Timestamp */}
      <span className="shrink-0 text-theme-faint text-[10px] font-mono mt-0.5 select-none">
        {formatTime(entry.timestamp)}
      </span>

      {/* Level badge */}
      <span
        className="shrink-0 text-[10px] font-mono font-bold w-12 mt-0.5"
        style={{
          color: entry.color,
          textShadow: isHardware ? `0 0 6px ${entry.color}88` : "none",
        }}
      >
        {entry.label}
      </span>

      {/* Message */}
      <span className="text-[11px] font-mono text-theme-muted group-hover:text-theme transition-colors duration-150 leading-relaxed">
        {entry.msg}
      </span>

      {/* Right tag */}
      <span
        className="ml-auto shrink-0 text-[9px] font-mono px-1.5 py-0.5 rounded hidden sm:block"
        style={{
          color: entry.color,
          background: `${entry.color}15`,
          border: `1px solid ${entry.color}33`,
        }}
      >
        {entry.detail}
      </span>
    </motion.div>
  );
}

/* ─── Typing cursor ──────────────────────────────────────────────────────── */
function Cursor({ active }) {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="inline-block w-2 h-3 ml-0.5 align-middle"
      style={{ background: "var(--color-term-text)" }}
    />
  );
}

/* ─── Terminal chrome dots ───────────────────────────────────────────────── */
function TerminalDots() {
  return (
    <div className="flex items-center gap-1.5">
      {["#EF4444", "#F59E0B", "#22C55E"].map((c) => (
        <div
          key={c}
          style={{
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: c,
            boxShadow: `0 0 4px ${c}66`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main AchievementTerminal Component ────────────────────────────────── */
export default function AchievementTerminal() {
  const { isHardware } = useTheme();

  const [lines, setLines] = useState([]);
  const [printing, setPrinting] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [cmdInput, setCmdInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [bootSeq, setBootSeq] = useState(false);

  const timerRef = useRef(null);
  const bodyRef = useRef(null);
  const hasRun = useRef(false);

  // Auto-scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines, cmdHistory]);

  // Print achievements line by line
  const printAchievements = useCallback(() => {
    if (printing || hasRun.current) return;
    hasRun.current = true;
    setPrinting(true);
    setLines([]);

    // Boot sequence for hardware mode
    if (isHardware) {
      setBootSeq(true);
      setTimeout(() => setBootSeq(false), 800);
    }

    let i = 0;
    const interval = isHardware ? 220 : 350;

    const printNext = () => {
      if (i < ACHIEVEMENTS.length) {
        setLines((prev) => [...prev, ACHIEVEMENTS[i]]);
        i++;
        timerRef.current = setTimeout(printNext, interval);
      } else {
        setPrinting(false);
        setCompleted(true);
      }
    };
    timerRef.current = setTimeout(printNext, isHardware ? 300 : 500);
  }, [printing, isHardware]);

  const handleReset = () => {
    clearTimeout(timerRef.current);
    hasRun.current = false;
    setLines([]);
    setPrinting(false);
    setCompleted(false);
    setCmdHistory([]);
  };

  const handleCmd = (e) => {
    if (e.key !== "Enter" || !cmdInput.trim()) return;
    const cmd = cmdInput.trim().toLowerCase();
    setCmdInput("");

    let response = "";
    if (cmd === "clear") {
      handleReset();
      return;
    } else if (cmd === "run" || cmd === "ls" || cmd === "start") {
      printAchievements();
      response = "> Starting achievement log...";
    } else if (cmd === "help") {
      response = "> Commands: run | clear | help | whoami | football";
    } else if (cmd === "whoami") {
      response =
        "> arpan@dual-core — Full Stack & ECE Engineer, West Bengal, India";
    } else if (cmd === "football") {
      response =
        '> ⚽ Massive football fan. FC Barcelona. Midfield #10. 200+ matches. "The best assist is a goal."';
    } else {
      response = `> Command not found: "${cmd}". Type "help" for options.`;
    }

    setCmdHistory((prev) => [...prev, { cmd, response }]);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const isMobile = useIsMobile();
  return (
    <motion.section
      id="achievements"
      className="py-24 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3, once: false }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={isMobile ? mobileFadeIn : fadeIn}
          className="mb-10"
        >
          <div className="section-label">04 / ACHIEVEMENT LOG</div>
          <h2 className="font-display text-hero-sm text-theme leading-none mt-2">
            TERMINAL
          </h2>
          <p className="text-sm text-theme-muted mt-3">
            Hover to start printing. Type{" "}
            <code
              className="px-1.5 py-0.5 rounded text-[11px]"
              style={{
                background: "var(--color-surface)",
                color: "var(--color-accent)",
              }}
            >
              help
            </code>{" "}
            for interactive commands.
          </p>
        </motion.div>

        <motion.div
          variants={isMobile ? mobileFadeIn : fadeIn}
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
          transition={{ duration: 0.7, delay: 0.1 }}
          onMouseEnter={printAchievements}
          className="terminal-chrome max-w-3xl"
          style={{
            boxShadow: isHardware
              ? "0 0 48px var(--color-accent-glow), 0 0 0 1px var(--color-border)"
              : "0 16px 48px rgba(0,0,0,0.15)",
          }}
        >
          {/* ── Titlebar ─────────────────────────────────────────────── */}
          <div className="terminal-titlebar">
            <TerminalDots />
            <span
              className="flex-1 text-center text-[10px] font-mono tracking-widest"
              style={{ color: "var(--color-text-faint)" }}
            >
              {isHardware
                ? "SERIAL MONITOR — achievements.log"
                : "TERMINAL — achievements.log"}
            </span>
            <button
              onClick={handleReset}
              className="text-[9px] font-mono px-2 py-0.5 rounded border transition-colors duration-200"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text-faint)",
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = "var(--color-accent)")
              }
              onMouseLeave={(e) =>
                (e.target.style.color = "var(--color-text-faint)")
              }
            >
              RESET
            </button>
          </div>

          {/* ── Terminal body ─────────────────────────────────────────── */}
          <div
            ref={bodyRef}
            className="p-4 min-h-[320px] max-h-[420px] overflow-y-auto"
            style={{ scrollbarWidth: "thin" }}
          >
            {/* Hardware boot sequence */}
            <AnimatePresence>
              {bootSeq && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mb-3"
                >
                  {[
                    "SYSTEM BOOT...",
                    "LOADING ACHIEVEMENT LOG...",
                    "SIGNAL ACQUIRED ✓",
                  ].map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.15 }}
                      className="text-[10px] font-mono mb-1"
                      style={{ color: "var(--color-term-text)" }}
                    >
                      &gt; {line}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Prompt */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-[11px] font-mono"
                style={{ color: "var(--color-term-text)" }}
              >
                arpan@portfolio
              </span>
              <span className="text-[11px] font-mono text-theme-faint">
                :~$
              </span>
              <span className="text-[11px] font-mono text-theme-muted">
                cat achievements.log
              </span>
              {!printing && lines.length === 0 && (
                <span className="text-[10px] font-mono text-theme-faint ml-1">
                  // hover to run
                </span>
              )}
            </div>

            {/* Log lines */}
            <div className="space-y-0.5">
              {lines.filter(Boolean).map((entry, i) => (
                <LogLine
                  key={entry?.timestamp || i}
                  entry={entry}
                  isHardware={isHardware}
                  index={i}
                />
              ))}
            </div>

            {/* Printing cursor */}
            {printing && (
              <div className="mt-2 flex items-center gap-2">
                <span
                  className="text-[10px] font-mono"
                  style={{ color: "var(--color-term-text)" }}
                >
                  {isHardware ? "RECEIVING..." : "loading"}
                </span>
                <Cursor active />
              </div>
            )}

            {/* Completion message */}
            {completed && !printing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 pt-3 border-t"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="text-[10px] font-mono text-theme-faint">
                  ── {ACHIEVEMENTS.length} records loaded ──
                </div>
              </motion.div>
            )}

            {/* Command history */}
            {cmdHistory.map((item, i) => (
              <div key={i} className="mt-2">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[11px] font-mono"
                    style={{ color: "var(--color-term-text)" }}
                  >
                    arpan@portfolio
                  </span>
                  <span className="text-[11px] font-mono text-theme-faint">
                    :~$
                  </span>
                  <span className="text-[11px] font-mono text-theme-muted">
                    {item.cmd}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-theme-muted mt-0.5 ml-1 leading-relaxed">
                  {item.response}
                </div>
              </div>
            ))}

            {/* Input prompt */}
            {completed && (
              <div className="flex items-center gap-2 mt-3">
                <span
                  className="text-[11px] font-mono"
                  style={{ color: "var(--color-term-text)" }}
                >
                  arpan@portfolio
                </span>
                <span className="text-[11px] font-mono text-theme-faint">
                  :~$
                </span>
                <input
                  type="text"
                  value={cmdInput}
                  onChange={(e) => setCmdInput(e.target.value)}
                  onKeyDown={handleCmd}
                  placeholder="type a command..."
                  className="flex-1 bg-transparent text-[11px] font-mono text-theme outline-none placeholder:text-theme-faint"
                  autoFocus
                />
                <Cursor active />
              </div>
            )}
          </div>

          {/* ── Status bar ───────────────────────────────────────────── */}
          <div
            className="px-4 py-1.5 flex items-center justify-between border-t"
            style={{
              borderColor: "var(--color-border)",
              background:
                "color-mix(in srgb, var(--color-terminal) 70%, var(--color-text-faint) 30%)",
            }}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ opacity: printing ? [0.5, 1, 0.5] : 1 }}
                transition={{ duration: 0.8, repeat: printing ? Infinity : 0 }}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  background: printing
                    ? "#F59E0B"
                    : completed
                      ? "#22C55E"
                      : "#64748B",
                }}
              />
              <span className="text-[9px] font-mono text-theme-faint tracking-wider">
                {printing
                  ? "PRINTING..."
                  : completed
                    ? `${ACHIEVEMENTS.length} RECORDS`
                    : "STANDBY"}
              </span>
            </div>
            <span className="text-[9px] font-mono text-theme-faint">
              {isHardware ? "BAUD: 9600" : "UTF-8 · LF"}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
