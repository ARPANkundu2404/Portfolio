import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useIsMobile, fadeIn, mobileFadeIn } from "../hooks/animations";

/**
 * ExperienceCard
 *
 * Timeline-style card for a single role. Purely presentational —
 * all content comes from EXPERIENCE in src/data/portfolio.js.
 *
 * Hierarchy (top → bottom):
 *   type/duration → role → company → summary → responsibilities → tech → certificate
 */
export default function ExperienceCard({
  experience,
  certificate,
  onViewCertificate,
  index = 0,
  isLast = false,
}) {
  const { isHardware } = useTheme();
  const isMobile = useIsMobile();

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.1, once: true }}
      variants={isMobile ? mobileFadeIn : fadeIn}
      transition={{
        delay: index * (isHardware ? 0.06 : 0.1),
        duration: isHardware ? 0.25 : 0.5,
        ease: isHardware ? [0, 0, 1, 1] : [0.16, 1, 0.3, 1],
      }}
      className="relative pl-8 sm:pl-10 pb-10 last:pb-0"
    >
      {/* Timeline rail */}
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-6 bottom-0 w-px"
          style={{ background: "var(--color-border)" }}
        />
      )}

      {/* Timeline node */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-4 w-[15px] h-[15px] rounded-full border-2 flex items-center justify-center"
        style={{
          borderColor: "var(--color-accent)",
          background: "var(--color-bg)",
          boxShadow: "0 0 10px var(--color-accent-glow)",
        }}
      >
        <span
          className="w-[5px] h-[5px] rounded-full"
          style={{ background: "var(--color-accent)" }}
        />
      </span>

      {/* Card */}
      <div className="card-base p-5 sm:p-6">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
          <span className="tag">{experience.type}</span>
          <span className="font-mono text-[11px] tracking-wider text-theme-faint">
            {experience.duration}
          </span>
          {experience.location && (
            <span className="font-mono text-[11px] tracking-wider text-theme-faint">
              · {experience.location}
            </span>
          )}
        </div>

        {/* Role + company */}
        <h3 className="text-lg sm:text-xl font-semibold text-theme leading-snug break-words">
          {experience.role}
        </h3>
        <p className="text-sm text-accent font-mono mt-1 break-words">
          {experience.company}
        </p>

        {/* Summary */}
        {experience.description && (
          <p className="text-sm text-theme-muted mt-3 leading-relaxed">
            {experience.description}
          </p>
        )}

        {/* Responsibilities */}
        {experience.responsibilities?.length > 0 && (
          <ul className="mt-4 space-y-2">
            {experience.responsibilities.map((item, i) => (
              <li
                key={i}
                className="flex gap-2.5 text-sm text-theme-muted leading-relaxed"
              >
                <span className="text-accent mt-0.5 shrink-0" aria-hidden="true">
                  ▸
                </span>
                <span className="min-w-0">{item}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Technologies */}
        {experience.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-5">
            {experience.technologies.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Certificate */}
        {certificate && (
          <div className="mt-5 pt-5 border-t border-theme">
            <button
              type="button"
              onClick={() => onViewCertificate(certificate)}
              className="btn-outline text-xs"
              aria-label={`View ${certificate.company} internship certificate`}
            >
              View Certificate →
            </button>
          </div>
        )}
      </div>
    </motion.article>
  );
}