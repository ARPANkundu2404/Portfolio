import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingScroll() {
  const [scrollY, setScrollY] = useState(0);
  const [isBottom, setIsBottom] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const doc = document.documentElement;

      setScrollY(y);
      setIsScrolling(true);

      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false); // 👈 user stopped scrolling
      }, 250);

      if (y + window.innerHeight >= doc.scrollHeight - 100) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showScroll = scrollY < 200 && !isScrolling;
  const showTop = isBottom;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <AnimatePresence mode="wait">
        {/* SCROLL */}
        {showScroll && (
          <motion.div
            key="scroll"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-col items-center gap-1"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-px h-8"
              style={{
                background:
                  "linear-gradient(to top, var(--color-accent), transparent)",
              }}
            />

            <span className="font-mono text-[10px] tracking-widest text-theme-faint">
              SCROLL
            </span>
          </motion.div>
        )}

        {/* TOP */}
        {showTop && (
          <motion.div
            key="top"
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <span className="font-mono text-[10px] tracking-widest text-theme-faint">
              TOP
            </span>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-px h-8"
              style={{
                background:
                  "linear-gradient(to bottom, var(--color-accent), transparent)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
