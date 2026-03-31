import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function AchievementModal({ achievement, onClose }) {
  const { isHardware, isDark } = useTheme();

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4"
    >
      {/* Hardware scanline effect */}
      {isHardware && isDark && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(34, 255, 107, 0.02) 2px,
              rgba(34, 255, 107, 0.02) 4px
            )`,
          }}
        />
      )}

      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        style={{
          borderColor: isHardware
            ? "rgba(34, 197, 94, 0.6)"
            : "rgba(20, 184, 166, 0.6)",
          boxShadow: isHardware
            ? "0 20px 64px rgba(34, 197, 94, 0.3)"
            : "0 20px 64px rgba(20, 184, 166, 0.3)",
        }}
        className="relative w-full max-w-2xl max-h-[90vh] rounded-lg overflow-hidden border-2 bg-black/60"
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-lg transition-all"
          style={{
            backgroundColor: isHardware
              ? "rgba(34, 197, 94, 0.1)"
              : "rgba(20, 184, 166, 0.1)",
            color: isHardware ? "#22C55E" : "#14B8A6",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </motion.button>

        {/* Content */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="p-8 overflow-y-auto max-h-[90vh]"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div
                  className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-3 border"
                  style={{
                    backgroundColor:
                      achievement.role === "Winner"
                        ? isHardware
                          ? "rgba(34, 197, 94, 0.3)"
                          : "rgba(20, 184, 166, 0.3)"
                        : isHardware
                          ? "rgba(34, 197, 94, 0.2)"
                          : "rgba(20, 184, 166, 0.2)",
                    borderColor:
                      achievement.role === "Winner"
                        ? isHardware
                          ? "#22C55E"
                          : "#14B8A6"
                        : isHardware
                          ? "rgba(34, 197, 94, 0.4)"
                          : "rgba(20, 184, 166, 0.4)",
                    color:
                      achievement.role === "Winner"
                        ? isHardware
                          ? "#4ADE80"
                          : "#06B6D4"
                        : isHardware
                          ? "#4ADE80"
                          : "#06B6D4",
                  }}
                >
                  {achievement.role === "Winner" && "★"} {achievement.role}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-theme mb-2">
                  {achievement.title}
                </h2>
                <p className="text-lg text-theme-muted">{achievement.event}</p>
              </div>
              <div className="text-right">
                <div
                  className="text-3xl font-bold"
                  style={{ color: isHardware ? "#22C55E" : "#14B8A6" }}
                >
                  {achievement.year}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2 mb-6"
          >
            {achievement.badges.map((badge) => {
              let bgColor, borderColor, textColor;
              if (badge === "WINNER") {
                bgColor = isHardware
                  ? "rgba(34, 197, 94, 0.25)"
                  : "rgba(20, 184, 166, 0.25)";
                borderColor = isHardware ? "#22C55E" : "#14B8A6";
                textColor = isHardware ? "#4ADE80" : "#06B6D4";
              } else if (badge === "FINALIST" || badge === "TOP 3") {
                bgColor = isHardware
                  ? "rgba(59, 130, 246, 0.2)"
                  : "rgba(34, 211, 238, 0.2)";
                borderColor = isHardware
                  ? "rgba(59, 130, 246, 0.6)"
                  : "rgba(34, 211, 238, 0.6)";
                textColor = isHardware ? "#60A5FA" : "#22D3EE";
              } else {
                bgColor = isHardware
                  ? "rgba(34, 197, 94, 0.15)"
                  : "rgba(20, 184, 166, 0.15)";
                borderColor = isHardware
                  ? "rgba(34, 197, 94, 0.3)"
                  : "rgba(20, 184, 166, 0.3)";
                textColor = isHardware ? "#4ADE80" : "#06B6D4";
              }
              return (
                <span
                  key={badge}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg border"
                  style={{
                    backgroundColor: bgColor,
                    borderColor: borderColor,
                    color: textColor,
                  }}
                >
                  {badge}
                </span>
              );
            })}
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-theme-muted mb-3">
              Overview
            </h3>
            <p className="text-base leading-relaxed text-theme-faint">
              {achievement.description}
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={itemVariants} className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-theme-muted mb-4">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {achievement.techStack.map((tech, idx) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-3 py-2 rounded-lg border text-sm font-semibold"
                  style={{
                    backgroundColor: isHardware
                      ? "rgba(34, 197, 94, 0.15)"
                      : "rgba(20, 184, 166, 0.15)",
                    borderColor: isHardware
                      ? "rgba(34, 197, 94, 0.4)"
                      : "rgba(20, 184, 166, 0.4)",
                    color: isHardware ? "#4ADE80" : "#06B6D4",
                  }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {achievement.links && achievement.links.length > 0 && (
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-theme-muted mb-4">
                Resources
              </h3>
              <div className="flex flex-wrap gap-3">
                {achievement.links.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg font-semibold text-sm transition-all border-2"
                    style={{
                      borderColor: isHardware
                        ? "rgba(34, 197, 94, 0.6)"
                        : "rgba(20, 184, 166, 0.6)",
                      color: isHardware ? "#4ADE80" : "#06B6D4",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isHardware
                        ? "rgba(34, 197, 94, 0.2)"
                        : "rgba(20, 184, 166, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    ▶ {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="p-4 rounded-lg border mt-8"
            style={{
              borderColor: isHardware
                ? "rgba(34, 197, 94, 0.2)"
                : "rgba(20, 184, 166, 0.2)",
              backgroundColor: isHardware
                ? "rgba(34, 197, 94, 0.05)"
                : "rgba(20, 184, 166, 0.05)",
            }}
          >
            <p className="text-xs text-theme-faint">
              <span className="font-bold text-theme">Achievement Type:</span>{" "}
              This achievement showcases expertise in{" "}
              <span className="text-accent">{achievement.techStack[0]}</span>{" "}
              and collaborative problem-solving in competitive environments.
            </p>
          </motion.div>

          {/* Close hint */}
          <motion.p
            variants={itemVariants}
            className="text-xs text-theme-faint text-center mt-6"
          >
            Press ESC or click outside to close
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
