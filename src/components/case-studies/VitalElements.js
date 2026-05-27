import NavScrollLink from '../NavScrollLink';
import LazyCTAWords from '../LazyCTAWords';
import { motion } from 'framer-motion';
import { scrollFadeUp, scrollStaggerParent, scrollStaggerChild } from '../../utils/animation';
import '../../pages/Showcase.css';
import './VitalElements.css';

function SectionLabel({ children }) {
  return <span className="cs-ve__label">{children}</span>;
}

export default function VitalElements({ project, prev, next }) {
  return (
    <motion.main key={project.slug} className="content showcase cs-ve">

      {/* ── 1. Project header ─────────────────────────────── */}
      <motion.section className="cs-ve__header" {...scrollFadeUp}>
        <h1 className="cs-ve__headline">{project.name}</h1>
        <p className="cs-ve__summary">
          Logo animation produced for Vital Elements as part of a brand package through Good and Well Co.
        </p>
      </motion.section>

      {/* ── Metadata strip ────────────────────────────────── */}
      <motion.div className="cs-ve__meta" {...scrollStaggerParent}>
        <motion.div className="cs-ve__meta-item" {...scrollStaggerChild}>
          <span className="cs-ve__meta-label">Role</span>
          <span className="cs-ve__meta-value">Motion Designer</span>
        </motion.div>
        <motion.div className="cs-ve__meta-item" {...scrollStaggerChild}>
          <span className="cs-ve__meta-label">Contribution</span>
          <span className="cs-ve__meta-value">Animation Direction, Motion Design</span>
        </motion.div>
        <motion.div className="cs-ve__meta-item" {...scrollStaggerChild}>
          <span className="cs-ve__meta-label">Tools</span>
          <span className="cs-ve__meta-value">After Effects</span>
        </motion.div>
        <motion.div className="cs-ve__meta-item" {...scrollStaggerChild}>
          <span className="cs-ve__meta-label">Context</span>
          <span className="cs-ve__meta-value">Freelance / Good and Well Co</span>
        </motion.div>
      </motion.div>

      {/* ── Video embed ───────────────────────────────────── */}
      <motion.div className="cs-ve__embed-section" {...scrollFadeUp}>
        <div className="cs-ve__video-bleed">
          <video
            src={`${process.env.PUBLIC_URL}/video/The_vital_elements_logo_animation.mp4`}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', display: 'block' }}
          />
        </div>
      </motion.div>

      {/* ── 2. Overview ───────────────────────────────────── */}
      <motion.section className="cs-ve__section" {...scrollFadeUp}>
        <SectionLabel>Overview</SectionLabel>
        <p className="cs-ve__body">
          Vital Elements is a health and wellness brand. I was hired through Good and Well Co, a Portland design studio, to animate their logo as part of a broader brand package. The goal was a clean, modern feel that matched the brand's wellness positioning.
        </p>
      </motion.section>

      {/* ── 4. The Work ───────────────────────────────────── */}
      <motion.section className="cs-ve__section" {...scrollFadeUp}>
        <SectionLabel>The Work</SectionLabel>
        <p className="cs-ve__body">
          I was given reference examples as a guide and made the motion design decisions from there. I opted for a short and refined animation with the two teardrop shapes that draw in simultaneously with soft blurs and a subtle rotation. The concept landed quickly and after some revision and feedback we landed on the final version.
        </p>
      </motion.section>

      {/* ── 5. Outcome ────────────────────────────────────── */}
      <motion.section className="cs-ve__section" {...scrollFadeUp}>
        <SectionLabel>Outcome</SectionLabel>
        <p className="cs-ve__body">
          The animation was completed and handed off to Good and Well Co as part of the full brand package delivery.
        </p>
      </motion.section>

      {/* ── Prev / Next navigation ────────────────────────── */}
      <motion.nav className="showcase__project-nav" {...scrollFadeUp}>
        <div className="showcase__project-nav-prev">
          {prev && <NavScrollLink to={`/work/${prev.slug}`} name={prev.name} direction="left" />}
        </div>
        <div className="showcase__project-nav-next">
          {next && <NavScrollLink to={`/work/${next.slug}`} name={next.name} direction="right" />}
        </div>
      </motion.nav>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="showcase__cta">
        <LazyCTAWords href="mailto:jonahfreedmandesigns@gmail.com" className="showcase__cta-link" text="Let's Work Together" />
      </section>

    </motion.main>
  );
}
