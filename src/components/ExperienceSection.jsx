import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  EXPERIENCE,
  EXPERIENCE_SECTION,
  getCertificateById,
} from "../data/portfolio";
import ExperienceCard from "./ExperienceCard";
import CertificateModal from "./CertificateModal";
import {
  staggerContainer,
  fadeIn,
  mobileFadeIn,
  useIsMobile,
} from "../hooks/animations";

export default function ExperienceSection() {
  const [activeCertificate, setActiveCertificate] = useState(null);
  const isMobile = useIsMobile();

  // Entries flagged `placeholder` are drafts and never render.
  const roles = EXPERIENCE.filter((e) => !e.placeholder);

  if (roles.length === 0) return null;

  return (
    <motion.section
      id="experience"
      className="py-24 px-6"
      initial={isMobile ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ amount: 0.1, once: true }}
      variants={isMobile ? {} : staggerContainer}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={isMobile ? mobileFadeIn : fadeIn}
          className="mb-12"
        >
          <div className="section-label">{EXPERIENCE_SECTION?.sectionLabel}</div>
          <h2 className="font-display text-hero-sm text-theme leading-none mt-2">
            {EXPERIENCE_SECTION?.heading}
          </h2>
          <p className="text-sm text-theme-muted mt-3 max-w-xl">
            {EXPERIENCE_SECTION?.description}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-3xl">
          {roles.map((experience, i) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              certificate={getCertificateById(experience.certificateId)}
              onViewCertificate={setActiveCertificate}
              index={i}
              isLast={i === roles.length - 1}
            />
          ))}
        </div>
      </div>

      {/* Shared certificate viewer */}
      <AnimatePresence>
        {activeCertificate && (
          <CertificateModal
            certificate={activeCertificate}
            onClose={() => setActiveCertificate(null)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}