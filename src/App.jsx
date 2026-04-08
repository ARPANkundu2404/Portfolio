import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./context/ThemeContext";

import CustomCursor from "./components/CustomCursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsBus from "./components/SkillsBus";
import AchievementGallery from "./components/AchievementGallery";
import Footer from "./components/Footer";
import FloatingScroll from "./components/FloatingScroll";
import FloatingTerminal from "./components/FloatingTerminal";

/* ─── Page transition wrapper ───────────────────────────────────────────── */
function PageWrapper({ children }) {
  const { themeKey, isHardware } = useTheme();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={themeKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: isHardware ? 0.15 : 0.4,
          ease: isHardware ? "linear" : "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── App ───────────────────────────────────────────────────────────────── */
export default function App() {
  const { isHardware, isDark } = useTheme();

  // Apply pcb-bg class to body in hardware modes
  useEffect(() => {
    if (isHardware) {
      document.body.classList.add("pcb-bg");
    } else {
      document.body.classList.remove("pcb-bg");
    }
  }, [isHardware]);

  return (
    <>
      {/* Global UI chrome */}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <FloatingScroll />
      <FloatingTerminal />

      {/* Main page */}
      <PageWrapper>
        <main
          className={`
            relative min-h-screen
            ${isHardware && isDark ? "scanline-overlay" : ""}
          `}
        >
          <Hero />
          <AboutSection />
          <ProjectsSection />
          <SkillsBus />
          <AchievementGallery />
          <Footer />
        </main>
      </PageWrapper>
    </>
  );
}
