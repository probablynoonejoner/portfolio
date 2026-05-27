import NavScrollLink from '../NavScrollLink';
import LazyCTAWords from '../LazyCTAWords';
import { motion } from 'framer-motion';
import useIsMobile from '../../utils/useIsMobile';
import { scrollFadeUp, scrollStaggerParent, scrollStaggerChild } from '../../utils/animation';
import '../../pages/Showcase.css';
import './WritingRevolution.css';

function SectionLabel({ children }) {
  return <span className="cs-wr__label">{children}</span>;
}

export default function WritingRevolution({ project, prev, next }) {
  const isMobile = useIsMobile();
  const seekToFirstFrame = (e) => { if (isMobile) e.target.currentTime = 0.001; };
  return (
    <motion.main key={project.slug} className="content showcase cs-wr">

      {/* ── 1. Project header ─────────────────────────────── */}
      <motion.section className="cs-wr__header" {...scrollFadeUp}>
        <h1 className="cs-wr__headline">{project.name}</h1>
        <p className="cs-wr__summary">
          Two explainer videos actively used by The Writing Revolution's marketing team for education and promotion across social media.
        </p>
      </motion.section>

      {/* ── Metadata strip ────────────────────────────────── */}
      <motion.div className="cs-wr__meta" {...scrollStaggerParent}>
        <motion.div className="cs-wr__meta-item" {...scrollStaggerChild}>
          <span className="cs-wr__meta-label">Role</span>
          <span className="cs-wr__meta-value">Motion Designer</span>
        </motion.div>
        <motion.div className="cs-wr__meta-item" {...scrollStaggerChild}>
          <span className="cs-wr__meta-label">Contribution</span>
          <span className="cs-wr__meta-value">Animation Direction, 2D Animation, Voiceover Mixing, Music Production</span>
        </motion.div>
        <motion.div className="cs-wr__meta-item" {...scrollStaggerChild}>
          <span className="cs-wr__meta-label">Tools</span>
          <span className="cs-wr__meta-value">After Effects, Illustrator</span>
        </motion.div>
        <motion.div className="cs-wr__meta-item" {...scrollStaggerChild}>
          <span className="cs-wr__meta-label">Context</span>
          <span className="cs-wr__meta-value">Freelance / The Writing Revolution</span>
        </motion.div>
      </motion.div>

      {/* ── Overview Video ────────────────────────────────── */}
      <motion.div className="cs-wr__video-section" {...scrollFadeUp}>
        <div className="cs-wr__video-bleed cs-wr__video-bleed--hero">
          <video
            src="/video/TWR_OVERVIEW_V2_compressed.mp4"
            controls
            autoPlay={!isMobile}
            muted
            loop
            preload="metadata"
            onLoadedMetadata={seekToFirstFrame}
            style={{ width: '100%', display: 'block' }}
          />
        </div>
      </motion.div>

      {/* ── Method Video ──────────────────────────────────── */}
      <motion.div className="cs-wr__video-section" {...scrollFadeUp}>
        <div className="cs-wr__video-bleed">
          <video
            src="/video/THM_V_3_compressed.mp4"
            controls
            preload="metadata"
            onLoadedMetadata={seekToFirstFrame}
            style={{ width: '100%', display: 'block' }}
          />
        </div>
      </motion.div>

      {/* ── 2. Overview ───────────────────────────────────── */}
      <motion.section className="cs-wr__section" {...scrollFadeUp}>
        <SectionLabel>Overview</SectionLabel>
        <p className="cs-wr__body">
          The Writing Revolution is a nonprofit dedicated to helping K through 12 students learn to write through the Hochman Method. I was hired to animate two explainer videos for their marketing and social media. One covering the company's mission and overview, and one breaking down their teaching method in depth.
        </p>
      </motion.section>

      {/* ── 3. The Brief ──────────────────────────────────── */}
      <motion.section className="cs-wr__section" {...scrollFadeUp}>
        <SectionLabel>The Brief</SectionLabel>
        <p className="cs-wr__body">
          I was brought in after the creative direction was established. The creative director provided full style frames and storyboards and my job was to take all of that and bring it to life. That meant organizing and preparing hundreds of vector assets, planning out the animation for every scene, directing the full motion, mixing the voiceover, and producing the backing tracks.
        </p>
      </motion.section>

      {/* ── 4. The Work ───────────────────────────────────── */}
      <motion.section className="cs-wr__section" {...scrollFadeUp}>
        <SectionLabel>The Work</SectionLabel>
        <p className="cs-wr__body">
          The style was flat 2D with a corporate Memphis feel. Bright, geometric, and energetic. The biggest challenge was managing the sheer volume of moving parts across two full videos. Keeping assets organized and maintaining consistency across so many scenes while hitting timing that felt natural with the voiceover took real discipline. We went through four rounds of revisions, most of which involved swapping out scenes where the visuals weren't communicating the message clearly enough and tightening up timing throughout. The core animation held up well across revisions and mostly just needed refinement.
        </p>
      </motion.section>

      {/* ── 5. Outcome ────────────────────────────────────── */}
      <motion.section className="cs-wr__section" {...scrollFadeUp}>
        <SectionLabel>Outcome</SectionLabel>
        <p className="cs-wr__body">
          Both videos shipped and are actively used by The Writing Revolution's marketing team for education and promotion across social media.
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
