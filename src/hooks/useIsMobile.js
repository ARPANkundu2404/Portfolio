import { useEffect, useState } from "react";

/**
 * useIsMobile
 *
 * Detects if device uses coarse pointer (touch).
 * Returns true on mobile/tablet, false on desktop.
 *
 * Uses:
 * - window.matchMedia("(pointer: coarse)") for accurate detection
 * - Listens for orientation/resize changes
 * - Safe to call multiple times (hook reuse)
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Create media query for coarse pointer (touch devices)
    const mediaQuery = window.matchMedia("(pointer: coarse)");

    // Set initial value
    setIsMobile(mediaQuery.matches);

    // Listen for changes (orientation, resize, etc.)
    const handleChange = (e) => {
      setIsMobile(e.matches);
    };

    // Modern addEventListener approach
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isMobile;
}
