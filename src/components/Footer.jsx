import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { PERSONAL } from '../data/portfolio';
import { fadeIn, mobileFadeIn, staggerContainer, useIsMobile } from '../hooks/animations';

export default function Footer() {
  const { isHardware } = useTheme();

  const isMobile = useIsMobile();
  return (
    <motion.footer
      id="contact"
      className="border-t pt-24 pb-12 px-6"
      style={{ borderColor: 'var(--color-border)' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3, once: false }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto">

        {/* Big closing statement */}
        <motion.div
          variants={isMobile ? mobileFadeIn : fadeIn}
          className="text-center mb-16"
        >
          <div className="section-label mb-4">06 / CONTACT</div>
          <h2 className="font-display text-hero-lg text-theme leading-none">
            LET'S BUILD
          </h2>
          <h2
            className="font-display text-hero-lg leading-none"
            style={{
              WebkitTextStroke: '2px var(--color-text)',
              color: 'transparent',
            }}
          >
            SOMETHING.
          </h2>
          <p className="text-sm text-theme-muted mt-6 max-w-sm mx-auto">
            Open to full-stack roles, IoT projects, hackathons, and interesting collaborations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href={`mailto:${PERSONAL.email}`} className="btn-primary">
              Say Hello →
            </a>
            <a href={PERSONAL.github} target="_blank" rel="noreferrer" className="btn-outline">
              <span className="font-mono text-xs">GitHub ↗</span>
            </a>
          </div>
        </motion.div>

        {/* Bottom strip */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div className="text-[10px] font-mono text-theme-faint tracking-widest">
            ARPAN KUNDU · WEST BENGAL, INDIA
          </div>
          <div className="text-[10px] font-mono text-theme-faint tracking-widest">
            {isHardware ? 'ECE · IoT · EMBEDDED' : 'JAVA · REACT · DOCKER'} · 2024
          </div>
          <div className="text-[10px] font-mono text-theme-faint">
            i hope to hear from you.
          </div>
        </div>

      </div>
    </motion.footer>
  );
}