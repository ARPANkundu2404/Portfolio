import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import ModeToggle from './ModeToggle';

const NAV_LINKS = [
  { label: 'About',        href: '#about'        },
  { label: 'Projects',     href: '#projects'      },
  { label: 'Skills',       href: '#skills'        },
  { label: 'Achievements', href: '#achievements'  },
  { label: 'Contact',      href: '#contact'       },
];

export default function Navbar() {
  const { isHardware, isDark } = useTheme();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [activeLink,  setActiveLink]  = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${scrolled
            ? 'py-3 border-b border-theme backdrop-blur-md'
            : 'py-5'
          }
        `}
        style={{
          background: scrolled
            ? `color-mix(in srgb, var(--color-bg) 88%, transparent)`
            : 'transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* ── Logo ────────────────────────────────────────────────── */}
          <a href="#hero" className="group flex items-center gap-2.5">
            <div
              className="w-7 h-7 rounded flex items-center justify-center text-xs font-mono font-bold transition-all duration-300"
              style={{
                background:  'var(--color-accent)',
                color:       'var(--color-bg)',
                boxShadow:   '0 0 8px var(--color-accent-glow)',
              }}
            >
              AK
            </div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-theme-muted group-hover:text-accent transition-colors">
              {isHardware ? 'ECE·ENGINEER' : 'DEV·PORTFOLIO'}
            </span>
          </a>

          {/* ── Desktop nav links ────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={() => setActiveLink(href)}
                className={`
                  nav-link relative group
                  ${activeLink === href ? 'text-accent' : ''}
                `}
              >
                {label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: 'var(--color-accent)' }}
                />
              </a>
            ))}
          </nav>

          {/* ── Right controls ───────────────────────────────────────── */}
          <div className="flex items-center gap-3">
            <ModeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 text-theme-muted"
              aria-label="Toggle mobile menu"
            >
              <motion.span
                animate={mobileOpen
                  ? { rotate: 45, y: 6   }
                  : { rotate: 0,  y: 0   }}
                className="block w-5 h-px bg-current transition-all"
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                className="block w-5 h-px bg-current"
              />
              <motion.span
                animate={mobileOpen
                  ? { rotate: -45, y: -6 }
                  : { rotate: 0,   y: 0  }}
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
            animate={{ opacity: 1, y: 0   }}
            exit={{    opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[60px] z-40 border-b border-theme backdrop-blur-md md:hidden"
            style={{ background: 'color-mix(in srgb, var(--color-bg) 95%, transparent)' }}
          >
            <nav className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => { setMobileOpen(false); setActiveLink(href); }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0   }}
                  transition={{ delay: i * 0.05 }}
                  className="nav-link text-base py-1 border-b border-theme pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-accent mr-2 font-mono text-xs">
                    {String(i + 1).padStart(2, '0')}.
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