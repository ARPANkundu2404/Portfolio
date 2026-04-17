import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import ImageLightbox from "./ImageLightbox";

export default function AchievementModal({ achievement, onClose }) {
  const { isHardware, isDark } = useTheme();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [certificateOpen, setCertificateOpen] = useState(false);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

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
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 backdrop-blur-sm z-40 flex items-start justify-center pt-16 px-4"
      style={{
        backgroundColor: isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.3)",
        pointerEvents: "auto",
        cursor: "pointer",
      }}
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
          backgroundColor: isDark ? "rgba(10, 10, 10, 0.95)" : "#FFFFFF",
          borderColor: isHardware
            ? "rgba(34, 197, 94, 0.6)"
            : isDark
              ? "rgba(20, 184, 166, 0.6)"
              : "rgba(0, 0, 0, 0.1)",
          boxShadow: isHardware
            ? "0 20px 64px rgba(34, 197, 94, 0.3)"
            : isDark
              ? "0 20px 64px rgba(20, 184, 166, 0.3)"
              : "0 20px 64px rgba(0, 0, 0, 0.1)",
        }}
        className="relative w-[95%] sm:max-w-2xl max-h-[90vh] rounded-lg overflow-hidden border-2 flex flex-col"
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-3 right-3 md:top-4 md:right-4 z-[100] p-2 rounded-lg transition-all"
          style={{
            backgroundColor: isHardware
              ? "rgba(34, 197, 94, 0.1)"
              : isDark
                ? "rgba(20, 184, 166, 0.1)"
                : "rgba(0, 0, 0, 0.05)",
            color: isHardware ? "#22C55E" : isDark ? "#14B8A6" : "#111827",
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
          className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1"
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
                        ? isDark
                          ? isHardware
                            ? "rgba(34, 197, 94, 0.3)"
                            : "rgba(20, 184, 166, 0.3)"
                          : "rgba(22, 163, 74, 0.1)"
                        : isDark
                          ? isHardware
                            ? "rgba(34, 197, 94, 0.2)"
                            : "rgba(20, 184, 166, 0.2)"
                          : "rgba(0, 0, 0, 0.05)",
                    borderColor:
                      achievement.role === "Winner"
                        ? isDark
                          ? isHardware
                            ? "#22C55E"
                            : "#14B8A6"
                          : "#16A34A"
                        : isDark
                          ? isHardware
                            ? "rgba(34, 197, 94, 0.4)"
                            : "rgba(20, 184, 166, 0.4)"
                          : "rgba(0, 0, 0, 0.08)",
                    color:
                      achievement.role === "Winner"
                        ? isDark
                          ? isHardware
                            ? "#4ADE80"
                            : "#06B6D4"
                          : "#16A34A"
                        : isDark
                          ? isHardware
                            ? "#4ADE80"
                            : "#06B6D4"
                          : "#111827",
                  }}
                >
                  {achievement.role === "Winner" && "★"} {achievement.role}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-theme mb-2">
                  {achievement.title}
                </h2>
                <p className="text-lg text-theme-muted">{achievement.event}</p>
              </div>
              <div className="text-right pr-10">
                <div
                  className="text-3xl font-bold"
                  style={{
                    color: isHardware
                      ? "#22C55E"
                      : isDark
                        ? "#14B8A6"
                        : "#111827",
                  }}
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
                bgColor = isDark
                  ? isHardware
                    ? "rgba(34, 197, 94, 0.25)"
                    : "rgba(20, 184, 166, 0.25)"
                  : "rgba(22, 163, 74, 0.1)";
                borderColor = isDark
                  ? isHardware
                    ? "#22C55E"
                    : "#14B8A6"
                  : "#16A34A";
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
                borderColor = isDark
                  ? isHardware
                    ? "rgba(59, 130, 246, 0.6)"
                    : "rgba(34, 211, 238, 0.6)"
                  : "rgba(37, 99, 235, 0.3)";
                textColor = isDark
                  ? isHardware
                    ? "#60A5FA"
                    : "#22D3EE"
                  : "#2563EB";
              } else {
                bgColor = isDark
                  ? isHardware
                    ? "rgba(34, 197, 94, 0.15)"
                    : "rgba(20, 184, 166, 0.15)"
                  : "rgba(0, 0, 0, 0.05)";
                borderColor = isDark
                  ? isHardware
                    ? "rgba(34, 197, 94, 0.3)"
                    : "rgba(20, 184, 166, 0.3)"
                  : "rgba(0, 0, 0, 0.08)";
                textColor = isDark
                  ? isHardware
                    ? "#4ADE80"
                    : "#06B6D4"
                  : "#111827";
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
                    backgroundColor: isDark
                      ? isHardware
                        ? "rgba(34, 197, 94, 0.15)"
                        : "rgba(20, 184, 166, 0.15)"
                      : "rgba(0, 0, 0, 0.05)",
                    borderColor: isDark
                      ? isHardware
                        ? "rgba(34, 197, 94, 0.4)"
                        : "rgba(20, 184, 166, 0.4)"
                      : "rgba(0, 0, 0, 0.08)",
                    color: isDark
                      ? isHardware
                        ? "#4ADE80"
                        : "#06B6D4"
                      : "#111827",
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
                        : isDark
                          ? "rgba(20, 184, 166, 0.6)"
                          : "rgba(0, 0, 0, 0.1)",
                      color: isHardware
                        ? "#4ADE80"
                        : isDark
                          ? "#06B6D4"
                          : "#111827",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isHardware
                        ? "rgba(34, 197, 94, 0.2)"
                        : isDark
                          ? "rgba(20, 184, 166, 0.2)"
                          : "rgba(0, 0, 0, 0.05)";
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

          {/* Image Gallery Section */}
          {achievement.media?.images && achievement.media.images.length > 0 && (
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-theme-muted mb-4">
                Gallery ({achievement.media.images.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {achievement.media.images.map((image, idx) => (
                  <motion.div
                    key={idx}
                    onClick={() => {
                      setLightboxIndex(idx);
                      setLightboxOpen(true);
                    }}
                    className="relative h-32 rounded-lg overflow-hidden border cursor-pointer group"
                    style={{
                      borderColor: isDark
                        ? isHardware
                          ? "rgba(34, 197, 94, 0.3)"
                          : "rgba(20, 184, 166, 0.3)"
                        : "rgba(0, 0, 0, 0.1)",
                      backgroundColor: isDark
                        ? "rgba(0, 0, 0, 0.2)"
                        : "rgba(0, 0, 0, 0.05)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <img
                      src={image}
                      alt={`Achievement ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:brightness-150 transition-all"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all">
                      <svg
                        className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                        />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Certificate Section */}
          {achievement.media?.certificate && (
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest text-theme-muted mb-4">
                Certificate
              </h3>
              <motion.button
                onClick={() => setCertificateOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all border-2"
                style={{
                  borderColor: isHardware
                    ? "#22C55E"
                    : isDark
                      ? "#14B8A6"
                      : "#16A34A",
                  color: isHardware
                    ? "#4ADE80"
                    : isDark
                      ? "#06B6D4"
                      : "#16A34A",
                  backgroundColor: isHardware
                    ? "rgba(34, 197, 94, 0.1)"
                    : isDark
                      ? "rgba(20, 184, 166, 0.1)"
                      : "rgba(22, 163, 74, 0.1)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isHardware
                    ? "rgba(34, 197, 94, 0.2)"
                    : isDark
                      ? "rgba(20, 184, 166, 0.2)"
                      : "rgba(22, 163, 74, 0.15)";
                  e.currentTarget.style.boxShadow = isHardware
                    ? "0 0 20px rgba(34, 197, 94, 0.3)"
                    : isDark
                      ? "0 0 20px rgba(20, 184, 166, 0.3)"
                      : "0 0 20px rgba(22, 163, 74, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isHardware
                    ? "rgba(34, 197, 94, 0.1)"
                    : isDark
                      ? "rgba(20, 184, 166, 0.1)"
                      : "rgba(22, 163, 74, 0.1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
                View Certificate
              </motion.button>
            </motion.div>
          )}

          {/* Additional Info */}
          <motion.div
            variants={itemVariants}
            className="p-4 rounded-lg border mt-8"
            style={{
              borderColor: isHardware
                ? "rgba(34, 197, 94, 0.2)"
                : isDark
                  ? "rgba(20, 184, 166, 0.2)"
                  : "rgba(0, 0, 0, 0.08)",
              backgroundColor: isHardware
                ? "rgba(34, 197, 94, 0.05)"
                : isDark
                  ? "rgba(20, 184, 166, 0.05)"
                  : "rgba(0, 0, 0, 0.02)",
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

      {/* Lightbox for image preview */}
      {achievement.media?.images && achievement.media.images.length > 0 && (
        <ImageLightbox
          isOpen={lightboxOpen}
          images={achievement.media.images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      {/* Lightbox for certificate preview */}
      {achievement.media?.certificate && (
        <ImageLightbox
          isOpen={certificateOpen}
          images={[achievement.media.certificate]}
          initialIndex={0}
          onClose={() => setCertificateOpen(false)}
        />
      )}
    </motion.div>
  );
}
