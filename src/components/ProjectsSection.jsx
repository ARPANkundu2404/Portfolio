import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { PROJECTS } from '../data/portfolio';
import XRayCard from './XRayCard';
import { staggerContainer, fadeIn, slideInLeft, slideInRight, mobileFadeIn, mobileSlideInLeft, mobileSlideInRight, useIsMobile } from '../hooks/animations';

const FILTERS = [
  { id: 'all',      label: 'All'      },
  { id: 'sw',       label: 'Software' },
  { id: 'hw',       label: 'Hardware' },
];

export default function ProjectsSection() {
  const { isHardware } = useTheme();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.mode === filter);

  const isMobile = useIsMobile();
  return (
    <motion.section
      id="projects"
      className="py-24 px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3, once: false }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          variants={isMobile ? mobileFadeIn : fadeIn}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="section-label">03 / PROJECTS</div>
            <h2 className="font-display text-hero-sm text-theme leading-none mt-2">
              WHAT I BUILT
            </h2>
            <p className="text-sm text-theme-muted mt-3 max-w-md">
              Hover any card to X-Ray the architecture. The skeleton reveals the technical blueprint beneath.
            </p>
          </div>

          {/* Filter buttons */}
          <div className="flex gap-2">
            {FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`
                  px-4 py-2 rounded text-xs font-mono tracking-wider border transition-all duration-200
                  ${filter === f.id
                    ? 'text-theme-bg border-accent bg-accent'
                    : 'text-theme-muted border-theme hover:border-accent hover:text-accent'
                  }
                `}
                style={{
                  background:  filter === f.id ? 'var(--color-accent)' : 'transparent',
                  borderColor: filter === f.id ? 'var(--color-accent)' : 'var(--color-border)',
                  color:       filter === f.id ? 'var(--color-bg)' : 'var(--color-text-muted)',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Card grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={staggerContainer}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.3, once: false }}
                variants={isMobile ? mobileFadeIn : (i % 2 === 0 ? slideInLeft : slideInRight)}
                transition={{
                  delay: i * (isHardware ? 0.08 : 0.1),
                  duration: isHardware ? 0.25 : 0.5,
                  ease: isHardware ? [0,0,1,1] : [0.16,1,0.3,1],
                }}
              >
                <XRayCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </motion.section>
  );
}