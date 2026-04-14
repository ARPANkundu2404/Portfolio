import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useTheme } from "../context/ThemeContext";
import { FOOTER, CONTACT_FORM, PERSONAL } from "../data/portfolio";
import {
  fadeIn,
  mobileFadeIn,
  staggerContainer,
  useIsMobile,
} from "../hooks/animations";

export default function Footer() {
  const { isHardware } = useTheme();
  const isMobile = useIsMobile();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(CONTACT_FORM?.emailjs?.publicKey || "YOUR_PUBLIC_KEY");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      // Send main contact email
      await emailjs.sendForm(
        CONTACT_FORM?.emailjs?.serviceId || "SERVICE_ID",
        CONTACT_FORM?.emailjs?.contactTemplateId || "CONTACT_TEMPLATE_ID",
        formRef.current,
        CONTACT_FORM?.emailjs?.publicKey || "YOUR_PUBLIC_KEY",
      );

      // Send auto-reply email
      await emailjs.sendForm(
        CONTACT_FORM?.emailjs?.serviceId || "SERVICE_ID",
        CONTACT_FORM?.emailjs?.autoReplyTemplateId || "AUTO_REPLY_TEMPLATE_ID",
        formRef.current,
        CONTACT_FORM?.emailjs?.publicKey || "YOUR_PUBLIC_KEY",
      );

      setSuccess(true);
      formRef.current.reset();

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Email send error:", err);
      setError(true);
      setTimeout(() => setError(false), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.footer
      id="contact"
      className="border-t pt-24 pb-12 px-6"
      style={{ borderColor: "var(--color-border)" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.1, once: true }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto">
        {/* Big closing statement */}
        <motion.div
          variants={isMobile ? mobileFadeIn : fadeIn}
          className="text-center mb-16"
        >
          <div className="section-label mb-4">{FOOTER?.sectionLabel}</div>
          <h2 className="font-display text-hero-lg text-theme leading-none">
            {FOOTER?.headline}
          </h2>
          <h2
            className="font-display text-hero-lg leading-none"
            style={{
              WebkitTextStroke: "2px var(--color-text)",
              color: "transparent",
            }}
          >
            {FOOTER?.headlineOutline}
          </h2>
          <p className="text-sm text-theme-muted mt-6 max-w-sm mx-auto">
            {FOOTER?.description}
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={isMobile ? mobileFadeIn : fadeIn}
          className="max-w-2xl mx-auto mb-16"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            {CONTACT_FORM?.fields?.map((field, idx) => (
              <div key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-sm font-mono text-theme-muted mb-2"
                >
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    id={field.id}
                    name={field.name}
                    required={field.required}
                    disabled={loading}
                    rows={field.rows || 5}
                    className="w-full px-4 py-2 bg-theme-bg border rounded text-theme placeholder-theme-muted focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 resize-none"
                    style={{
                      borderColor: "var(--color-border)",
                      backgroundColor: "var(--color-bg-secondary)",
                      color: "var(--color-text)",
                    }}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.name}
                    required={field.required}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-theme-bg border rounded text-theme placeholder-theme-muted focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50"
                    style={{
                      borderColor: "var(--color-border)",
                      backgroundColor: "var(--color-bg-secondary)",
                      color: "var(--color-text)",
                    }}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}

            {/* Status Messages */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded text-sm font-mono text-center"
                style={{
                  backgroundColor: "rgba(34, 197, 94, 0.1)",
                  color: "#22c55e",
                  borderColor: "#22c55e",
                }}
              >
                {CONTACT_FORM?.messages?.success}
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded text-sm font-mono text-center"
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  color: "#ef4444",
                  borderColor: "#ef4444",
                }}
              >
                {CONTACT_FORM?.messages?.error}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 font-mono text-sm font-semibold rounded transition-all disabled:opacity-50 cursor-pointer hover:opacity-80"
              style={{
                backgroundColor: "var(--color-text)",
                color: "var(--color-bg)",
              }}
            >
              {loading
                ? CONTACT_FORM?.messages?.sending
                : CONTACT_FORM?.messages?.submit}
            </button>
          </form>

          {/* Alternative Contact Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href={FOOTER?.cta?.primary?.href} className="btn-primary">
              {FOOTER?.cta?.primary?.label}
            </a>
            <a
              href={FOOTER?.cta?.secondary?.href}
              target={FOOTER?.cta?.secondary?.external ? "_blank" : undefined}
              rel={FOOTER?.cta?.secondary?.external ? "noreferrer" : undefined}
              className="btn-outline"
            >
              <span className="font-mono text-xs">
                {FOOTER?.cta?.secondary?.label}
              </span>
            </a>
          </div>
        </motion.div>

        {/* Bottom strip */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div className="text-[10px] font-mono text-theme-faint tracking-widest">
            {FOOTER?.copyright?.author} · {FOOTER?.copyright?.location}
          </div>
          <div className="text-[10px] font-mono text-theme-faint tracking-widest">
            {isHardware
              ? FOOTER?.copyright?.taglineHW
              : FOOTER?.copyright?.taglineSW}{" "}
            · {FOOTER?.copyright?.year}
          </div>
          <div className="text-[10px] font-mono text-theme-faint">
            {FOOTER?.copyright?.closing}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
