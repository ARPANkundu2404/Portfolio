import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useIsMobile } from "../hooks/useIsMobile";

/**
 * CustomCursor
 *
 * Two-layer cursor (Desktop only):
 *  - Inner dot:  instant, snaps to exact position
 *  - Outer ring: spring-smoothed follower
 *
 * Hardware mode: crosshair / circuit style with corners
 * Software mode: clean minimal circle
 *
 * Mobile: Returns null (uses default cursor)
 */
export default function CustomCursor() {
  const { isHardware, isDark } = useTheme();
  const isMobile = useIsMobile();

  // Don't render custom cursor on mobile devices
  if (isMobile) {
    return null;
  }

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring config varies by mode
  const springConfig = isHardware
    ? { damping: 8, stiffness: 300, mass: 0.4 } // staccato
    : { damping: 28, stiffness: 180, mass: 0.6 }; // smooth

  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  const hovering = useRef(false);
  const ringRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const updatePos = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      // Dot: direct DOM manipulation for absolute zero lag
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };

    const handleEnter = () => {
      hovering.current = true;
      ringRef.current?.classList.add("cursor-hover");
    };
    const handleLeave = () => {
      hovering.current = false;
      ringRef.current?.classList.remove("cursor-hover");
    };

    window.addEventListener("mousemove", updatePos, { passive: true });

    // Scale up ring on clickable elements
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", updatePos);
    };
  }, [mouseX, mouseY]);

  const accentColor = isDark
    ? isHardware
      ? "#22FF6B"
      : "#4ADE80"
    : isHardware
      ? "#2563EB"
      : "#16A34A";

  return (
    <>
      {/* ── Outer spring-follow ring ─────────────────────────────────────── */}
      <motion.div
        ref={ringRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ x: ringX, y: ringY }}
      >
        {isHardware ? (
          // Hardware: corner-bracket crosshair
          <div
            className="relative w-9 h-9 transition-all duration-100"
            style={{ "--c": accentColor }}
          >
            {/* Four corner brackets */}
            {[
              "top-0 left-0 border-t-2 border-l-2 rounded-tl-sm",
              "top-0 right-0 border-t-2 border-r-2 rounded-tr-sm",
              "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-sm",
              "bottom-0 right-0 border-b-2 border-r-2 rounded-br-sm",
            ].map((cls, i) => (
              <span
                key={i}
                className={`absolute w-2.5 h-2.5 ${cls}`}
                style={{ borderColor: accentColor }}
              />
            ))}
          </div>
        ) : (
          // Software: clean circle
          <div
            className="w-8 h-8 rounded-full border transition-all duration-200"
            style={{
              borderColor: accentColor,
              opacity: 0.7,
            }}
          />
        )}
      </motion.div>

      {/* ── Inner instant dot ────────────────────────────────────────────── */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: accentColor,
          boxShadow: `0 0 6px ${accentColor}`,
          transition: "background 0.3s",
        }}
      />

      {/* ── HW mode: subtle scanline ─────────────────────────────────────── */}
      {isHardware && (
        <div
          className="fixed inset-0 pointer-events-none z-[9998]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.02) 3px, rgba(0,0,0,0.02) 4px)",
          }}
        />
      )}
    </>
  );
}
