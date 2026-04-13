import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";

/**
 * ImageLightbox
 *
 * Simple lightbox component for viewing images in fullscreen.
 * Supports:
 * - Click on image to open lightbox
 * - ESC key to close
 * - Keyboard navigation (arrows)
 * - Click outside to close
 */
export default function ImageLightbox({
  isOpen,
  images,
  initialIndex = 0,
  onClose,
}) {
  const { isDark, isHardware } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, images.length, onClose]);

  if (!isOpen || !images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
        style={{
          backgroundColor: isDark ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.6)",
        }}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg z-[51]"
          style={{
            backgroundColor: isDark
              ? "rgba(0, 0, 0, 0.5)"
              : "rgba(255, 255, 255, 0.2)",
            color: isDark ? "#fff" : "#fff",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-6 h-6"
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

        {/* Image Container */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative max-w-4xl max-h-[90vh] w-full mx-4"
        >
          <img
            src={currentImage}
            alt={`Preview ${currentIndex + 1}`}
            className="w-full h-full object-contain rounded-lg"
          />
        </motion.div>

        {/* Left Arrow */}
        {images.length > 1 && (
          <motion.button
            onClick={() =>
              setCurrentIndex(
                (prev) => (prev - 1 + images.length) % images.length,
              )
            }
            className="absolute left-4 p-2 rounded-lg"
            style={{
              backgroundColor: isDark
                ? "rgba(0, 0, 0, 0.5)"
                : "rgba(255, 255, 255, 0.2)",
              color: isDark ? "#fff" : "#fff",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>
        )}

        {/* Right Arrow */}
        {images.length > 1 && (
          <motion.button
            onClick={() =>
              setCurrentIndex((prev) => (prev + 1) % images.length)
            }
            className="absolute right-4 p-2 rounded-lg"
            style={{
              backgroundColor: isDark
                ? "rgba(0, 0, 0, 0.5)"
                : "rgba(255, 255, 255, 0.2)",
              color: isDark ? "#fff" : "#fff",
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <motion.div
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg"
            style={{
              backgroundColor: isDark
                ? "rgba(0, 0, 0, 0.5)"
                : "rgba(255, 255, 255, 0.2)",
              color: isDark ? "#fff" : "#fff",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="text-sm font-semibold">
              {currentIndex + 1} / {images.length}
            </span>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
