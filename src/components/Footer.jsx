import { useState } from "react";
import { motion } from "framer-motion";
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
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_title: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      const apiUrl = `${CONTACT_FORM?.api?.baseUrl}${CONTACT_FORM?.api?.endpoint}`;
      const payload = {
        name: formData.user_name,
        email: formData.user_email,
        subject: formData.user_title,
        message: formData.message,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      setSuccess(true);
      setFormData({
        user_name: "",
        user_email: "",
        user_title: "",
        message: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error("Contact form submission error:", err.message);
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
          <form onSubmit={handleSubmit} className="space-y-4">
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
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
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
                    value={formData[field.name] || ""}
                    onChange={handleInputChange}
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
