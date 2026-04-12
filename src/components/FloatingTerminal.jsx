import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import {
  PERSONAL,
  SKILL_GATES,
  FOOTBALL,
  TERMINAL_CONFIG,
} from "../data/portfolio";

/* ─── Cursor Component ─────────────────────────────────────────────────── */
function Cursor({ active }) {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="inline-block w-1.5 h-3 ml-1 align-middle"
      style={{ background: "var(--color-term-text)" }}
    />
  );
}

/* ─── Terminal Command Output ──────────────────────────────────────────── */
function CommandLine({ prompt, command, response, isHardware, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: isHardware ? 0.1 : 0.2,
        delay: isHardware ? 0.01 : 0.02,
      }}
      className="mb-2"
    >
      {/* Command input */}
      {command && (
        <div className="font-mono text-xs mb-1">
          <span style={{ color: "var(--color-accent)" }}>{prompt}</span>
          <span style={{ color: "var(--color-text)" }}>{command}</span>
        </div>
      )}
      {/* Response */}
      {response && (
        <div
          className="font-mono text-xs whitespace-pre-wrap leading-relaxed"
          style={{
            color: command ? "var(--color-text-muted)" : "var(--color-accent)",
          }}
        >
          {response}
        </div>
      )}
    </motion.div>
  );
}

/* ─── Main Floating Terminal Component ─────────────────────────────────── */
export default function FloatingTerminal() {
  const { isHardware, isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isInContact, setIsInContact] = useState(false);
  const [cmdInput, setCmdInput] = useState("");
  const [history, setHistory] = useState([]);
  const [commandLog, setCommandLog] = useState([
    {
      command: null,
      response:
        TERMINAL_CONFIG?.welcomeMessage ||
        `Welcome to Terminal FAQ! Type "help" for available commands.`,
      prompt: "> ",
    },
  ]);

  const bodyRef = useRef(null);
  const inputRef = useRef(null);

  // Detect if user is in contact section
  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.querySelector("#contact");
      if (!contactSection) {
        setIsInContact(false);
        return;
      }

      const rect = contactSection.getBoundingClientRect();
      // Check if any part of contact section is visible in viewport
      setIsInContact(rect.top < window.innerHeight && rect.bottom > 0);
    };

    window.addEventListener("scroll", handleScroll);
    // Call once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("terminalOpen");
    if (savedState === "true") {
      setIsOpen(true);
    }
  }, []);

  // Persist isOpen state to localStorage
  useEffect(() => {
    localStorage.setItem("terminalOpen", isOpen.toString());
  }, [isOpen]);

  // Auto-focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [commandLog]);

  // Command handler
  const handleCmd = useCallback(
    (e) => {
      // ESC key to close terminal
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (e.key !== "Enter" || !cmdInput.trim()) return;

      const cmd = cmdInput.trim().toLowerCase();
      let response = "";

      // Parse command
      if (cmd === "help") {
        response =
          TERMINAL_CONFIG?.commands?.help?.response ||
          `Available Commands:
  whoami    - Display profile information
  skills    - Show technical skills by category
  football  - Football passion & stats
  contact   - Get contact information
  clear     - Clear terminal
  help      - Display this help message`;
      } else if (cmd === "whoami") {
        response = `${PERSONAL.name}
${PERSONAL.title}
📍 ${PERSONAL.location}
🎓 Student at Academy of Technology`;
      } else if (cmd === "skills") {
        const skillSummary = SKILL_GATES.map((gate) => {
          const top2 = gate.skills.slice(0, 2);
          return `${gate.label}:\n  ${top2.map((s) => `• ${s.name}`).join("\n  ")}`;
        }).join("\n\n");
        response = skillSummary;
      } else if (cmd === "football") {
        response = `${FOOTBALL.passion}
"${FOOTBALL.quote.slice(1, -1)}"
Position: ${FOOTBALL.positions}
Matches: ${FOOTBALL.stats["Matches Played"]}
Skill Level: ${FOOTBALL.stats["Skill Level"]}`;
      } else if (cmd === "contact") {
        response = `Email: ${PERSONAL.email}
GitHub: ${PERSONAL.github}
Location: ${PERSONAL.location}`;
      } else if (cmd === "clear") {
        setCommandLog([
          {
            command: null,
            response:
              TERMINAL_CONFIG?.welcomeMessage ||
              `Welcome to Terminal FAQ! Type "help" for available commands.`,
            prompt: "> ",
          },
        ]);
        setCmdInput("");
        return;
      } else {
        response = `Command not found: "${cmd}". Type "help" for available commands.`;
      }

      // Add to log
      setCommandLog((prev) => [
        ...prev,
        { command: cmd, response, prompt: "> " },
      ]);
      setCmdInput("");
      setHistory((prev) => [...prev, cmd]);
    },
    [cmdInput],
  );

  // Floating button style - positioned bottom-right
  const floatingButtonStyle = {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    zIndex: 40,
  };

  return (
    <>
      {/* Floating Trigger Button - Only visible in contact section */}
      <AnimatePresence>
        {isInContact && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(!isOpen)}
            style={floatingButtonStyle}
            className="group relative"
          >
            {/* Glassmorphism circle */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                background: `var(--color-surface-overlay)`,
                border: `2px solid var(--color-border)`,
                backdropFilter: "blur(10px)",
                boxShadow: isDark
                  ? `0 0 20px rgba(34, 197, 94, 0.2)`
                  : "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <span
                className="text-xl font-mono font-bold"
                style={{ color: "var(--color-text)" }}
              >
                {">_"}
              </span>
            </motion.div>

            {/* Tooltip */}
            <div
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 px-3 py-1.5 rounded text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                background: "var(--color-surface)",
                color: "var(--color-text)",
                border: `1px solid var(--color-border)`,
              }}
            >
              Terminal FAQ
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Terminal Window - positioned bottom-right */}
      <AnimatePresence>
        {isOpen && isInContact && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={floatingButtonStyle}
            className="fixed bottom-24 right-4 w-full max-w-md md:max-w-sm z-50"
          >
            <div
              className="rounded-lg border overflow-hidden shadow-2xl"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
                boxShadow: isDark
                  ? `0 0 32px rgba(34, 197, 94, 0.2), 0 0 0 1px var(--color-border)`
                  : "0 20px 48px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-surface-secondary)",
                }}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: "var(--color-accent)" }}
                  />
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: "var(--color-text)" }}
                  >
                    {isHardware ? "FAQ.sh" : "faq.terminal"}
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-lg w-6 h-6 flex items-center justify-center rounded hover:opacity-70 transition-opacity"
                  style={{ color: "var(--color-text)" }}
                >
                  ✕
                </button>
              </div>

              {/* Terminal Body */}
              <div
                ref={bodyRef}
                className="p-4 min-h-64 max-h-80 overflow-y-auto font-mono text-xs"
                style={{
                  color: "var(--color-text)",
                  background: "var(--color-surface)",
                  scrollbarWidth: "thin",
                }}
              >
                {/* Scanline overlay for hardware mode */}
                {isHardware && isDark && (
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "repeating-linear-gradient(0deg, rgba(34, 255, 107, 0.01), rgba(34, 255, 107, 0.01) 1px, transparent 1px, transparent 2px)",
                      zIndex: 1,
                    }}
                  />
                )}

                {/* Command history */}
                <div className="relative z-0">
                  {commandLog.map((line, idx) => (
                    <CommandLine
                      key={idx}
                      command={line.command}
                      response={line.response}
                      prompt={line.prompt}
                      isHardware={isHardware}
                      index={idx}
                    />
                  ))}
                </div>
              </div>

              {/* Input Line */}
              <div
                className="px-4 py-3 border-t flex items-center gap-2 font-mono text-xs"
                style={{
                  borderColor: "var(--color-border)",
                  background: "var(--color-surface-secondary)",
                }}
              >
                <span style={{ color: "var(--color-accent)" }}>{">"}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={cmdInput}
                  onChange={(e) => setCmdInput(e.target.value)}
                  onKeyDown={handleCmd}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent outline-none"
                  style={{
                    color: "var(--color-text)",
                  }}
                />
                {cmdInput === "" && <Cursor active={true} />}
              </div>

              {/* Hint */}
              <div
                className="px-4 py-2 text-[10px] text-center"
                style={{
                  color: "var(--color-text-muted)",
                  background: "var(--color-surface-secondary)",
                }}
              >
                Try: help, whoami, skills, football, contact
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
