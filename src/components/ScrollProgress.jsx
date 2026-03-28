import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export default function ScrollProgress() {
  const { isHardware } = useTheme();
  const rawProgress = useMotionValue(0);
  const progress = useSpring(rawProgress, {
    damping: isHardware ? 6 : 30,
    stiffness: isHardware ? 400 : 100,
  });

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const p  = el.scrollTop / (el.scrollHeight - el.clientHeight);
      rawProgress.set(Math.min(1, Math.max(0, p)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [rawProgress]);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-0.5 z-[60]"
      style={{ background: 'var(--color-border)' }}
    >
      <motion.div
        className="h-full origin-left"
        style={{
          scaleX:     progress,
          background: 'var(--color-accent)',
          boxShadow:  isHardware ? '0 0 8px var(--color-accent)' : 'none',
        }}
      />
    </div>
  );
}