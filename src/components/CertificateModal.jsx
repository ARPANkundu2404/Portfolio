import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

/**
 * CertificateModal
 *
 * Displays the internship certificate directly from its
 * Cloudinary image URL.
 *
 * Behaviour:
 * - ESC closes
 * - Backdrop click closes
 * - Close button closes
 * - Body scroll is locked while open
 * - Certificate is fetched directly from Cloudinary
 */
export default function CertificateModal({ certificate, onClose }) {
  const { isDark, isHardware } = useTheme();
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (!certificate) return;

    const previouslyFocused = document.activeElement;
    const { overflow } = document.body.style;

    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflow;

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const headingId = `certificate-modal-${certificate.id}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: isHardware ? 0.15 : 0.25,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-sm"
      style={{
        backgroundColor: isDark
          ? "rgba(0, 0, 0, 0.82)"
          : "rgba(0, 0, 0, 0.62)",
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 16,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.96,
          y: 16,
        }}
        transition={{
          duration: isHardware ? 0.18 : 0.35,
          ease: isHardware
            ? [0, 0, 1, 1]
            : [0.16, 1, 0.3, 1],
        }}
        className="card-base relative w-full max-w-4xl my-auto"
        style={{
          boxShadow: "0 0 48px var(--color-accent-glow)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-5 sm:px-6 py-4 border-b border-theme">
          <div className="min-w-0">
            <div className="section-label !mb-1 truncate">
              {certificate.company}
            </div>

            <h3
              id={headingId}
              className="text-base sm:text-lg font-semibold text-theme leading-snug break-words"
            >
              {certificate.title}
            </h3>

            <p className="text-xs text-theme-muted font-mono mt-1 break-words">
              {certificate.role} · {certificate.duration}
            </p>
          </div>

          {/* Close */}
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close certificate viewer"
            className="shrink-0 w-9 h-9 flex items-center justify-center rounded border border-theme text-theme-muted transition-colors duration-200 hover:text-accent hover:border-accent"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Certificate */}
        <div className="px-5 sm:px-6 py-5">
          <div
            className="rounded-lg border border-theme overflow-hidden flex items-center justify-center"
            style={{
              backgroundColor: "var(--color-bg-alt)",
            }}
          >
            <img
              src={certificate.image}
              alt={`${certificate.company} - ${certificate.title}`}
              className="w-full h-auto max-h-[75vh] object-contain"
              loading="eager"
            />
          </div>

          <p className="text-xs text-theme-faint font-mono mt-4">
            Certificate issued: {certificate.issuedDate}
          </p>
        </div>

        {/* Close */}
        <div className="flex justify-end px-5 sm:px-6 pb-5">
          <button
            type="button"
            onClick={onClose}
            className="btn-outline justify-center"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}