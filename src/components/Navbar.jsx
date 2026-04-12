import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { NAV_LINKS, NAVBAR_BRANDING, PERSONAL } from "../data/portfolio";
import ModeToggle from "./ModeToggle";
import { fadeIn, useIsMobile, mobileFadeIn } from "../hooks/animations";

export default function Navbar() {
  const { isHardware, isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScrollSpy = () => {
      let current = "";

      NAV_LINKS?.forEach(({ href }) => {
        const section = document.querySelector(href);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const offset = window.innerHeight / 3;

        if (rect.top <= offset && rect.bottom >= offset) {
          current = href;
        }
      });

      if (current) setActiveLink(current);
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  return (
    <>
      <motion.header
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
        variants={isMobile ? mobileFadeIn : fadeIn}
        className={`
          fixed top-0 left-0 right-0 z-[100]
          transition-all duration-300
          ${scrolled ? "py-3 border-b border-theme backdrop-blur-md bg-theme/80" : "py-5 bg-transparent"}
        `}
        style={{
          background: scrolled
            ? `color-mix(in srgb, var(--color-bg) 88%, rgba(12,18,16,0.72))`
            : "transparent",
          opacity: 1,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="group flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded flex items-center justify-center text-xs font-mono font-bold transition-all duration-300"
              style={{
                background: "var(--color-accent)",
                color: "var(--color-bg)",
                boxShadow: "0 0 8px var(--color-accent-glow)",
              }}
            >
              {NAVBAR_BRANDING?.logoAcronym || "AK"}
            </div>
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] whitespace-nowrap text-theme-muted group-hover:text-accent transition-colors">
              {isHardware
                ? NAVBAR_BRANDING?.taglineHW
                : NAVBAR_BRANDING?.taglineSW}
            </span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS?.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setActiveLink(href)}
                className={`
                  nav-link relative group transition-all duration-300
                  ${activeLink === href ? "text-accent" : "text-theme-muted"}
                `}
              >
                {label}
                <span
                  className={`
                    absolute -bottom-0.5 left-0 h-px transition-all duration-300
                    ${activeLink === href ? "w-full" : "w-0 group-hover:w-full"}
          `}
                  style={{ background: "var(--color-accent)" }}
                />
              </a>
            ))}
          </nav>

          {/* ── Right controls ───────────────────────────────────────── */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ModeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 text-theme-muted"
              aria-label="Toggle mobile menu"
            >
              <motion.span
                animate={
                  mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }
                }
                className="block w-5 h-px bg-current transition-all"
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                className="block w-5 h-px bg-current"
              />
              <motion.span
                animate={
                  mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                }
                className="block w-5 h-px bg-current transition-all"
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile menu ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="relative inset-x-0 top-full z-40 border-b border-theme backdrop-blur-md md:hidden"
            style={{
              background:
                "color-mix(in srgb, var(--color-bg) 95%, transparent)",
            }}
          >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-6 items-center justify-between overflow-hidden flex flex-col gap-4">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => {
                    setMobileOpen(false);
                    setActiveLink(href);
                  }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="nav-link text-base py-1 border-b border-theme pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-accent mr-2 font-mono text-xs">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  {label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
