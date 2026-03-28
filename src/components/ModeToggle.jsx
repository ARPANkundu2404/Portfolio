import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

/**
 * ModeToggle
 *
 * Renders two controls:
 *  1. SW / HW physical toggle switch (engine mode)
 *  2. Dark / Light mode button (☀/☾)
 *
 * @param {{ compact?: boolean }} props
 */
export default function ModeToggle({ compact = false }) {
  const { engineMode, toggleEngine, darkMode, toggleDark, isHardware } = useTheme();

  return (
    <div className={`flex items-center ${compact ? 'gap-2' : 'gap-3'}`}>

      {/* ── Dark / Light toggle ───────────────────────────────────────── */}
      <motion.button
        onClick={toggleDark}
        whileTap={{ scale: 0.88 }}
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        className="relative w-8 h-8 flex items-center justify-center rounded-full border border-theme text-theme-muted hover:text-accent hover:border-accent transition-colors duration-200"
        title={darkMode ? 'Light mode' : 'Dark mode'}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={darkMode ? 'moon' : 'sun'}
            initial={{ opacity: 0, rotate: -30, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0,   scale: 1   }}
            exit={{    opacity: 0, rotate:  30, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="text-sm leading-none"
            style={{ fontFamily: 'sans-serif' }}
          >
            {darkMode ? '☾' : '☀'}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* ── SW / HW Engine toggle ─────────────────────────────────────── */}
      <div
        className={`
          relative flex items-center
          border border-theme rounded-full
          bg-theme-surface
          ${compact ? 'p-0.5 gap-0' : 'p-1 gap-1'}
          transition-all duration-300
        `}
        style={{
          boxShadow: isHardware ? '0 0 12px var(--color-accent-glow)' : 'none',
        }}
      >
        {/* Sliding background pill */}
        <motion.div
          layout
          className="absolute h-[calc(100%-4px)] rounded-full"
          style={{
            width:      compact ? 'calc(50% - 2px)' : 'calc(50% - 4px)',
            background: 'var(--color-accent)',
            left:       engineMode === 'sw' ? 2 : 'calc(50% + 2px)',
            top:        2,
            boxShadow:  '0 0 8px var(--color-accent-glow)',
          }}
          transition={{
            type:      'spring',
            stiffness: isHardware ? 500 : 280,
            damping:   isHardware ? 20  : 30,
          }}
        />

        {/* SW button */}
        <button
          onClick={() => toggleEngine()}
          disabled={engineMode === 'sw'}
          className={`
            relative z-10 rounded-full transition-colors duration-200
            font-mono text-[10px] tracking-widest font-semibold
            ${compact ? 'px-2.5 py-1' : 'px-3 py-1.5'}
            ${engineMode === 'sw'
              ? 'text-theme-bg'
              : 'text-theme-muted hover:text-accent'
            }
          `}
          aria-label="Switch to Software mode"
        >
          SW
        </button>

        {/* HW button */}
        <button
          onClick={() => toggleEngine()}
          disabled={engineMode === 'hw'}
          className={`
            relative z-10 rounded-full transition-colors duration-200
            font-mono text-[10px] tracking-widest font-semibold
            ${compact ? 'px-2.5 py-1' : 'px-3 py-1.5'}
            ${engineMode === 'hw'
              ? 'text-theme-bg'
              : 'text-theme-muted hover:text-accent'
            }
          `}
          aria-label="Switch to Hardware mode"
        >
          HW
        </button>
      </div>

      {/* ── Mode label (not in compact mode) ─────────────────────────── */}
      {!compact && (
        <AnimatePresence mode="wait">
          <motion.span
            key={`${engineMode}-${darkMode}`}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0  }}
            exit={{    opacity: 0, x:  8 }}
            transition={{ duration: 0.2 }}
            className="text-[10px] font-mono tracking-[0.15em] text-theme-muted hidden lg:block"
          >
            {darkMode
              ? (isHardware ? 'DARK·HW' : 'DARK·SW')
              : (isHardware ? 'LIGHT·HW' : 'LIGHT·SW')
            }
          </motion.span>
        </AnimatePresence>
      )}

    </div>
  );
}

/* ─── Compact inline version for mobile nav ─────────────────────────────── */
export function ModeToggleCompact() {
  return <ModeToggle compact />;
}