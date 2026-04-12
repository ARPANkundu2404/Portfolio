import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ACHIEVEMENTS, ACHIEVEMENTS_SECTION } from "../data/portfolio";
import { useTheme } from "../context/ThemeContext";
import AchievementModal from "./AchievementModal";

/* ─── Timeline Component ────────────────────────────────────────────────── */
function TimelineSection({ selectedYear, setSelectedYear }) {
  const { isHardware, isDark } = useTheme();
  const years = [2023, 2024, 2025];
  const lineRef = useRef(null);
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    // Animate line draw on mount
    if (lineRef.current) {
      setLineWidth(lineRef.current.scrollWidth);
    }
  }, []);

  return (
    <div className="mb-16">
      {/* Timeline Label */}
      <div className="flex items-center gap-3 mb-8">
        <h3
          className="text-sm font-bold uppercase tracking-wider"
          style={{
            color: isDark ? (isHardware ? "#22C55E" : "#10B981") : "#111827",
          }}
        >
          ▶ Growth Timeline
        </h3>
        <div
          className="h-px flex-1"
          style={{
            background: isDark
              ? isHardware
                ? "linear-gradient(to right, rgba(34, 197, 94, 0.5), transparent)"
                : "linear-gradient(to right, rgba(16, 185, 129, 0.3), transparent)"
              : "linear-gradient(to right, rgba(0, 0, 0, 0.1), transparent)",
          }}
        />
      </div>

      {/* Animated Line Container */}
      <div className="relative mb-12">
        {/* Decorative animated line */}
        <motion.div
          ref={lineRef}
          className="h-0.5"
          style={{
            originX: 0,
            background: isDark
              ? isHardware
                ? "linear-gradient(to right, #22C55E, #4ADE80, rgba(34, 197, 94, 0.3))"
                : "linear-gradient(to right, #14B8A6, #06B6D4, rgba(20, 184, 166, 0.3))"
              : "linear-gradient(to right, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.05))",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          viewport={{ once: true }}
        />

        {/* Year markers */}
        <div className="flex justify-between mt-6 relative">
          {years.map((year, idx) => (
            <motion.button
              key={year}
              onClick={() =>
                setSelectedYear(selectedYear === year ? null : year)
              }
              className="relative px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm border"
              style={{
                backgroundColor:
                  selectedYear === year
                    ? isDark
                      ? isHardware
                        ? "rgba(34, 197, 94, 0.2)"
                        : "rgba(20, 184, 166, 0.2)"
                      : "rgba(0, 0, 0, 0.05)"
                    : "transparent",
                borderColor:
                  selectedYear === year
                    ? isDark
                      ? isHardware
                        ? "#22C55E"
                        : "#14B8A6"
                      : "rgba(0, 0, 0, 0.2)"
                    : isDark
                      ? isHardware
                        ? "rgba(34, 197, 94, 0.2)"
                        : "rgba(20, 184, 166, 0.2)"
                      : "rgba(0, 0, 0, 0.08)",
                color:
                  selectedYear === year
                    ? isDark
                      ? isHardware
                        ? "#4ADE80"
                        : "#06B6D4"
                      : "#111827"
                    : isDark
                      ? isHardware
                        ? "rgba(34, 197, 94, 0.5)"
                        : "rgba(20, 184, 166, 0.5)"
                      : "rgba(0, 0, 0, 0.5)",
                boxShadow:
                  selectedYear === year
                    ? isDark
                      ? isHardware
                        ? "0 10px 24px rgba(34, 197, 94, 0.3)"
                        : "0 10px 24px rgba(20, 184, 166, 0.3)"
                      : "none"
                    : "none",
              }}
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15, duration: 0.4 }}
              viewport={{ once: true }}
            >
              {year}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Filter info */}
      {selectedYear && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs text-theme-faint"
        >
          Showing achievements from {selectedYear} • Click to reset
        </motion.p>
      )}
    </div>
  );
}

/* ─── Achievement Card with 3D Tilt ────────────────────────────────────── */
function AchievementCard({ achievement, onClick, isHardware, isDark }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateXVal = ((y - rect.height / 2) / rect.height) * 15;
    const rotateYVal = ((x - rect.width / 2) / rect.width) * -15;

    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const isWinner = achievement.role === "Winner";
  const isFavorite =
    achievement.role === "Winner" || achievement.role === "Top 3 Finalist";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="cursor-pointer perspective h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      style={{
        transformStyle: "preserve-3d",
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
    >
      <motion.div
        className="relative h-full p-5 rounded-lg border-2 transition-all duration-300 group"
        style={{
          transformStyle: "preserve-3d",
          backgroundColor: isDark
            ? isWinner || isFavorite
              ? isHardware
                ? "rgba(0, 0, 0, 0.4)"
                : "rgba(0, 0, 0, 0.2)"
              : "rgba(0, 0, 0, 0.2)"
            : "#FFFFFF",
          borderColor: isDark
            ? isWinner || isFavorite
              ? isHardware
                ? "rgba(34, 197, 94, 0.6)"
                : "rgba(20, 184, 166, 0.6)"
              : isHardware
                ? "rgba(34, 197, 94, 0.2)"
                : "rgba(20, 184, 166, 0.2)"
            : isWinner || isFavorite
              ? "#16A34A"
              : "rgba(0, 0, 0, 0.08)",
          boxShadow:
            isWinner || isFavorite
              ? isDark
                ? isHardware
                  ? "0 10px 24px rgba(34, 197, 94, 0.2)"
                  : "0 10px 24px rgba(20, 184, 166, 0.2)"
                : "0 4px 12px rgba(0, 0, 0, 0.1)"
              : "none",
        }}
        onMouseEnter={(e) => {
          if (e.currentTarget) {
            e.currentTarget.style.borderColor = isDark
              ? isHardware
                ? "#4ADE80"
                : "#06B6D4"
              : "#16A34A";
            e.currentTarget.style.backgroundColor = isDark
              ? isHardware
                ? "rgba(34, 197, 94, 0.1)"
                : "rgba(20, 184, 166, 0.1)"
              : "rgba(0, 0, 0, 0.02)";
          }
        }}
        onMouseLeave={(e) => {
          if (e.currentTarget) {
            e.currentTarget.style.borderColor = isDark
              ? isWinner || isFavorite
                ? isHardware
                  ? "rgba(34, 197, 94, 0.6)"
                  : "rgba(20, 184, 166, 0.6)"
                : isHardware
                  ? "rgba(34, 197, 94, 0.2)"
                  : "rgba(20, 184, 166, 0.2)"
              : isWinner || isFavorite
                ? "#16A34A"
                : "rgba(0, 0, 0, 0.08)";
            e.currentTarget.style.backgroundColor = isDark
              ? isWinner || isFavorite
                ? isHardware
                  ? "rgba(0, 0, 0, 0.4)"
                  : "rgba(0, 0, 0, 0.2)"
                : "rgba(0, 0, 0, 0.2)"
              : "#FFFFFF";
          }
        }}
      >
        {/* Winner Badge */}
        {isWinner && (
          <motion.div
            className="absolute -top-3 right-4 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border"
            style={{
              backgroundColor: isDark
                ? isHardware
                  ? "rgba(34, 197, 94, 0.3)"
                  : "rgba(20, 184, 166, 0.3)"
                : "rgba(22, 163, 74, 0.1)",
              borderColor: isDark
                ? isHardware
                  ? "#22C55E"
                  : "#14B8A6"
                : "#16A34A",
              color: isDark ? (isHardware ? "#4ADE80" : "#06B6D4") : "#16A34A",
              boxShadow: isDark
                ? isHardware
                  ? "0 10px 24px rgba(34, 197, 94, 0.4)"
                  : "0 10px 24px rgba(20, 184, 166, 0.4)"
                : "none",
            }}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            ★ {achievement.role.toUpperCase()}
          </motion.div>
        )}

        {/* Year badge */}
        <div
          className="inline-block px-2 py-1 text-xs font-mono mb-3 rounded border"
          style={{
            backgroundColor: isDark
              ? isHardware
                ? "rgba(34, 197, 94, 0.15)"
                : "rgba(20, 184, 166, 0.15)"
              : "rgba(0, 0, 0, 0.05)",
            color: isDark ? (isHardware ? "#4ADE80" : "#06B6D4") : "#111827",
            borderColor: isDark
              ? isHardware
                ? "rgba(34, 197, 94, 0.3)"
                : "rgba(20, 184, 166, 0.3)"
              : "rgba(0, 0, 0, 0.08)",
          }}
        >
          {achievement.year}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-theme mb-2 group-hover:text-accent transition-colors line-clamp-2">
          {achievement.title}
        </h3>

        {/* Event */}
        <p className="text-sm text-theme-muted mb-3">{achievement.event}</p>

        {/* Role Badge */}
        <div className="flex flex-wrap gap-2 mb-4">
          {achievement.badges.map((badge) => {
            let bgColor, textColor;
            if (badge === "WINNER") {
              bgColor = isDark
                ? isHardware
                  ? "rgba(34, 197, 94, 0.2)"
                  : "rgba(20, 184, 166, 0.2)"
                : "rgba(22, 163, 74, 0.1)";
              textColor = isDark
                ? isHardware
                  ? "#4ADE80"
                  : "#06B6D4"
                : "#16A34A";
            } else if (badge === "FINALIST" || badge === "TOP 3") {
              bgColor = isDark
                ? isHardware
                  ? "rgba(59, 130, 246, 0.2)"
                  : "rgba(34, 211, 238, 0.2)"
                : "rgba(37, 99, 235, 0.1)";
              textColor = isDark
                ? isHardware
                  ? "#60A5FA"
                  : "#22D3EE"
                : "#2563EB";
            } else {
              bgColor = isDark
                ? isHardware
                  ? "rgba(34, 197, 94, 0.1)"
                  : "rgba(20, 184, 166, 0.1)"
                : "rgba(0, 0, 0, 0.05)";
              textColor = isDark
                ? isHardware
                  ? "rgba(74, 222, 128, 0.6)"
                  : "rgba(6, 182, 212, 0.6)"
                : "#111827";
            }
            return (
              <span
                key={badge}
                className="text-xs font-bold px-2 py-1 rounded-full"
                style={{
                  backgroundColor: bgColor,
                  color: textColor,
                  boxShadow:
                    badge === "WINNER"
                      ? isDark
                        ? isHardware
                          ? "0 0 12px rgba(34, 197, 94, 0.3)"
                          : "0 0 12px rgba(20, 184, 166, 0.3)"
                        : "none"
                      : "none",
                }}
              >
                {badge}
              </span>
            );
          })}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1 mb-4">
          {achievement.techStack.slice(0, 3).map((tech, idx) => (
            <motion.span
              key={tech}
              className="text-xs px-2 py-0.5 rounded-xs border"
              style={{
                backgroundColor: isHardware
                  ? "rgba(34, 197, 94, 0.1)"
                  : "rgba(20, 184, 166, 0.1)",
                color: isHardware
                  ? "rgba(74, 222, 128, 0.8)"
                  : "rgba(6, 182, 212, 0.8)",
                borderColor: isHardware
                  ? "rgba(34, 197, 94, 0.2)"
                  : "rgba(20, 184, 166, 0.2)",
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              {tech}
            </motion.span>
          ))}
          {achievement.techStack.length > 3 && (
            <span className="text-xs text-theme-faint">
              +{achievement.techStack.length - 3}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-theme-faint line-clamp-3 mb-4">
          {achievement.description}
        </p>

        {/* Click to view */}
        <div
          className="text-xs font-mono uppercase tracking-wider transition-all"
          style={{
            color: isDark
              ? isHardware
                ? "rgba(34, 197, 94, 0.6)"
                : "rgba(20, 184, 166, 0.6)"
              : "#111827",
          }}
        >
          ▶ View Details
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Gallery Component ────────────────────────────────────────────── */
export default function AchievementGallery() {
  const { isHardware, isDark } = useTheme();
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  // Filter achievements by year
  const filteredAchievements = selectedYear
    ? ACHIEVEMENTS.filter((a) => a.year === selectedYear)
    : ACHIEVEMENTS;

  // Sort by year descending
  const sortedAchievements = [...filteredAchievements].sort(
    (a, b) => b.year - a.year,
  );

  return (
    <section id="achievements" className="relative py-20 px-4 md:px-8 lg:px-12">
      {/* Section Header */}
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="section-label mb-4">
          {ACHIEVEMENTS_SECTION?.sectionLabel}
        </div>
        <h2
          className="font-display text-hero-sm text-theme leading-none"
          style={{
            color: "var(--color-text)",
          }}
        >
          {ACHIEVEMENTS_SECTION?.heading}
        </h2>
        <p className="text-theme-muted max-w-2xl mt-3">
          Hackathons won, teams led, and innovations shipped. Each achievement
          represents growth and collaboration.
        </p>
      </motion.div>

      {/* Timeline */}
      <TimelineSection
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        layout
      >
        <AnimatePresence mode="popLayout">
          {sortedAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              onClick={() => setSelectedAchievement(achievement)}
              isHardware={isHardware}
              isDark={isDark}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {sortedAchievements.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-theme-muted">No achievements for {selectedYear}</p>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div
        className="grid grid-cols-3 gap-4 text-center text-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div
          className="px-4 py-3 rounded border"
          style={{
            borderColor: isDark
              ? isHardware
                ? "rgba(34, 197, 94, 0.2)"
                : "rgba(20, 184, 166, 0.2)"
              : "rgba(0, 0, 0, 0.08)",
            backgroundColor: isDark
              ? isHardware
                ? "rgba(34, 197, 94, 0.05)"
                : "rgba(20, 184, 166, 0.05)"
              : "rgba(0, 0, 0, 0.02)",
          }}
        >
          <div className="text-accent font-bold text-lg">
            {ACHIEVEMENTS.filter((a) => a.role === "Winner").length}
          </div>
          <div className="text-theme-faint">Wins</div>
        </div>
        <div
          className="px-4 py-3 rounded border"
          style={{
            borderColor: isDark
              ? isHardware
                ? "rgba(34, 197, 94, 0.2)"
                : "rgba(20, 184, 166, 0.2)"
              : "rgba(0, 0, 0, 0.08)",
            backgroundColor: isDark
              ? isHardware
                ? "rgba(34, 197, 94, 0.05)"
                : "rgba(20, 184, 166, 0.05)"
              : "rgba(0, 0, 0, 0.02)",
          }}
        >
          <div className="text-accent font-bold text-lg">
            {ACHIEVEMENTS.filter((a) => a.role !== "Winner").length}
          </div>
          <div className="text-theme-faint">Milestones</div>
        </div>
        <div
          className="px-4 py-3 rounded border"
          style={{
            borderColor: isDark
              ? isHardware
                ? "rgba(34, 197, 94, 0.2)"
                : "rgba(20, 184, 166, 0.2)"
              : "rgba(0, 0, 0, 0.08)",
            backgroundColor: isDark
              ? isHardware
                ? "rgba(34, 197, 94, 0.05)"
                : "rgba(20, 184, 166, 0.05)"
              : "rgba(0, 0, 0, 0.02)",
          }}
        >
          <div className="text-accent font-bold text-lg">
            {new Date().getFullYear() - 2023 + 1}
          </div>
          <div className="text-theme-faint">Years</div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <AchievementModal
            achievement={selectedAchievement}
            onClose={() => setSelectedAchievement(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
