import NavScrollLink from '../NavScrollLink';
import LazyCTAWords from '../LazyCTAWords';
import { motion } from 'framer-motion';
import { scrollFadeUp, scrollStaggerParent, scrollStaggerChild } from '../../utils/animation';
import '../../pages/Showcase.css';
import './VUTalent.css';

function SectionLabel({ children }) {
  return <span className="cs-vu__label">{children}</span>;
}

export default function VUTalent({ project, prev, next }) {
  return (
    <motion.main key={project.slug} className="content showcase cs-vu">

      {/* ── 1. Project header ─────────────────────────────── */}
      <motion.section className="cs-vu__header" {...scrollFadeUp}>
        <h1 className="cs-vu__headline">{project.name}</h1>
        <p className="cs-vu__summary">
          Web animations produced for VU Talent's marketing site through Portland design studio Hank Makes.
        </p>
      </motion.section>

      {/* ── Metadata strip ────────────────────────────────── */}
      <motion.div className="cs-vu__meta" {...scrollStaggerParent}>
        <motion.div className="cs-vu__meta-item" {...scrollStaggerChild}>
          <span className="cs-vu__meta-label">Role</span>
          <span className="cs-vu__meta-value">Motion Designer</span>
        </motion.div>
        <motion.div className="cs-vu__meta-item" {...scrollStaggerChild}>
          <span className="cs-vu__meta-label">Contribution</span>
          <span className="cs-vu__meta-value">Animation Direction, 2D Animation</span>
        </motion.div>
        <motion.div className="cs-vu__meta-item" {...scrollStaggerChild}>
          <span className="cs-vu__meta-label">Tools</span>
          <span className="cs-vu__meta-value">After Effects, Illustrator</span>
        </motion.div>
        <motion.div className="cs-vu__meta-item" {...scrollStaggerChild}>
          <span className="cs-vu__meta-label">Context</span>
          <span className="cs-vu__meta-value">Freelance / Hank Makes</span>
        </motion.div>
      </motion.div>

      {/* ── Hero animation ────────────────────────────────── */}
      <motion.div className="cs-vu__embed-section" {...scrollFadeUp}>
        <div className="cs-vu__video-bleed">
          <video
            src="/video/VU_HEADER_ANIMATION_V_2_slowed_25_percent_copy.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ width: '100%', display: 'block' }}
          />
        </div>
      </motion.div>

      {/* ── 2. Overview ───────────────────────────────────── */}
      <motion.section className="cs-vu__section" {...scrollFadeUp}>
        <SectionLabel>Overview</SectionLabel>
        <p className="cs-vu__body">
          VU Talent is a recruitment agency. I was brought in through Hank Makes, a local Portland design studio, to animate their marketing website. The work includes one large hero animation at the top of the site and four supporting animations that illustrate what the company does as you scroll through.
        </p>
      </motion.section>

      {/* ── 3. The Brief ──────────────────────────────────── */}
      <motion.section className="cs-vu__section" {...scrollFadeUp}>
        <SectionLabel>The Brief</SectionLabel>
        <p className="cs-vu__body">
          I was given storyboards and Illustrator vector assets and was responsible for designing and implementing all the animation. Hank Makes provided specific direction but gave me some creative latitude within that. The aesthetic is modern and digital, fitting for a recruiting company positioning itself as forward-thinking.
        </p>
      </motion.section>

      {/* ── Supporting animations 2x2 grid ───────────────── */}
      <motion.div className="cs-vu__embed-section" {...scrollFadeUp}>
        <SectionLabel>Supporting Animations</SectionLabel>
        <div className="cs-vu__grid">
          <video src="/video/VU_UI_1.mp4" autoPlay muted loop playsInline loading="lazy" style={{ width: '100%', display: 'block' }} />
          <video src="/video/VU_UI_2.mp4" autoPlay muted loop playsInline loading="lazy" style={{ width: '100%', display: 'block' }} />
          <video src="/video/VU_UI_3.mp4" autoPlay muted loop playsInline loading="lazy" style={{ width: '100%', display: 'block' }} />
          <video src="/video/VU_UI_4.mp4" autoPlay muted loop playsInline loading="lazy" style={{ width: '100%', display: 'block' }} />
        </div>
      </motion.div>

      {/* ── 4. The Work ───────────────────────────────────── */}
      <motion.section className="cs-vu__section" {...scrollFadeUp}>
        <SectionLabel>The Work</SectionLabel>
        <p className="cs-vu__body">
          The hero animation is the centerpiece, setting the tone for the whole site as soon as you land on it. The four supporting animations accompany the sections describing VU Talent's services, each one reinforcing the message of that section with motion rather than just sitting alongside static text. All animation was done in After Effects working directly from the provided vector assets.
        </p>
      </motion.section>

      {/* ── 5. Outcome ────────────────────────────────────── */}
      <motion.section className="cs-vu__section" {...scrollFadeUp}>
        <SectionLabel>Outcome</SectionLabel>
        <p className="cs-vu__body">
          The animations shipped and are live on the VU Talent website.
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
