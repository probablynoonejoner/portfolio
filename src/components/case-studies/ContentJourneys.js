import NavScrollLink from '../NavScrollLink';
import LazyCTAWords from '../LazyCTAWords';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { scrollFadeUp, scrollStaggerParent, scrollStaggerChild } from '../../utils/animation';
import '../../pages/Showcase.css';
import './ContentJourneys.css';

// ── Rive embed components ──────────────────────────────────────────

function PrototypeEmbedRive() {
  const { RiveComponent, rive } = useRive({
    src: '/rive/pathways__animation_prototype.riv',
    artboard: 'INT PATHWAYS',
    stateMachines: 'main',
    autoplay: true,
    autoBind: true,
    layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
  });
  useEffect(() => { if (rive) rive.resizeDrawingSurfaceToCanvas(); }, [rive]);
  return <RiveComponent style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />;
}

function PrototypeEmbed() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShouldLoad(true); },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      {shouldLoad && <PrototypeEmbedRive />}
    </div>
  );
}

function ProgressBarEmbedRive() {
  const { RiveComponent, rive } = useRive({
    src: '/rive/pathways_case_study_elements.riv',
    artboard: 'quizz progress indicator',
    stateMachines: 'Progress Bar',
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });
  useEffect(() => { if (rive) rive.resizeDrawingSurfaceToCanvas(); }, [rive]);
  return <RiveComponent style={{ width: '100%', height: '400px', pointerEvents: 'auto' }} />;
}

function ProgressBarEmbed() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShouldLoad(true); },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ width: '100%', height: '400px' }}>
      {shouldLoad && <ProgressBarEmbedRive />}
    </div>
  );
}

function QuizPhoneEmbedRive() {
  const { RiveComponent, rive } = useRive({
    src: '/rive/pathways__animation_prototype.riv',
    artboard: 'Quiz',
    stateMachines: 'State Machine 1',
    autoplay: true,
    autoBind: true,
    layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
  });
  useEffect(() => { if (rive) rive.resizeDrawingSurfaceToCanvas(); }, [rive]);
  return <RiveComponent style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />;
}

function QuizPhoneEmbed() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShouldLoad(true); },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      {shouldLoad && <QuizPhoneEmbedRive />}
    </div>
  );
}

const ANSWER_KEY = [
  ['Carbohydrates', "The body's main source of quick energy"],
  ['Protein',       'Repairs and builds muscles, skin, and tissue'],
  ['Fats',          'Provides long-lasting energy, supports brain and heart health'],
  ['Fiber',         'Important for digestion'],
  ['Vitamin C',     'Supports the immune system'],
  ['Vitamin K',     'Helps with blood clotting and bone health'],
  ['Iron',          'Carries oxygen in your blood'],
  ['Magnesium',     'Helps regulate muscles, nerves, and sleep'],
];

// ── Section label ─────────────────────────────────────────────────
function SectionLabel({ children, className }) {
  return <span className={`cs-cj__label${className ? ` ${className}` : ''}`}>{children}</span>;
}

export default function ContentJourneys({ project, prev, next }) {
  const [hintDismissed, setHintDismissed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      window.removeEventListener('scroll', onScroll);
      setTimeout(() => setShowHint(true), 1000);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.main key={project.slug} className="content showcase cs-cj">

      {/* ── 1. Project header ─────────────────────────────── */}
      <motion.section className="cs-cj__header" {...scrollFadeUp}>
        <h1 className="cs-cj__headline">{project.name}</h1>
        <p className="cs-cj__summary">
          A gamified learning experience built for WebMD Health Services. Interactive path map, matching game, and reward states designed and prototyped for production.
        </p>
      </motion.section>

      {/* ── Metadata strip ────────────────────────────────── */}
      <motion.div className="cs-cj__meta" {...scrollStaggerParent}>
        <motion.div className="cs-cj__meta-item" {...scrollStaggerChild}>
          <span className="cs-cj__meta-label">Role</span>
          <span className="cs-cj__meta-value">UX Animator</span>
        </motion.div>
        <motion.div className="cs-cj__meta-item" {...scrollStaggerChild}>
          <span className="cs-cj__meta-label">Contribution</span>
          <span className="cs-cj__meta-value">Interaction Design, Motion Design, Prototyping, UI Design</span>
        </motion.div>
        <motion.div className="cs-cj__meta-item" {...scrollStaggerChild}>
          <span className="cs-cj__meta-label">Tools</span>
          <span className="cs-cj__meta-value">Rive, Figma</span>
        </motion.div>
        <motion.div className="cs-cj__meta-item" {...scrollStaggerChild}>
          <span className="cs-cj__meta-label">Context</span>
          <span className="cs-cj__meta-value">Internship / WebMD Health Services</span>
        </motion.div>
      </motion.div>

      {/* ── 2. Overview + prototype ───────────────────────── */}
      <motion.section className="cs-cj__overview-row" {...scrollFadeUp}>
        <div className="cs-cj__overview-text">
          <SectionLabel>Overview</SectionLabel>
          <p className="cs-cj__body">
            Content Journeys is a gamified learning experience built for WebMD Health Services. I was provided initial screens and was responsible for designing how the system behaves, how users move through it, and how motion reinforces every step. I solved this by creating a fully interactive prototype that you can test here.
          </p>
          <div className="cs-cj__answer-key">
            <SectionLabel>Answer Key</SectionLabel>
            <p className="cs-cj__answer-key-intro">The matching game is fully completable. Pair each nutrient with its definition:</p>
            <div className="cs-cj__answer-key-grid">
              {ANSWER_KEY.map(([nutrient, definition]) => (
                <div key={nutrient} className="cs-cj__answer-key-row">
                  <span className="cs-cj__answer-key-nutrient">{nutrient}</span>
                  <span className="cs-cj__answer-key-def">{definition}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="cs-cj__overview-phone" onClick={() => setHintDismissed(true)}>
          <AnimatePresence>
            {showHint && !hintDismissed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 36, transition: { duration: 0.5, ease: [0.25, 0.1, 0.15, 1] } }}
                exit={{ opacity: 0, height: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.1, 1] } }}
                style={{ overflow: 'hidden', marginBottom: 16 }}
              >
                <span className="cs-spark__phone-hint">Click quiz to begin</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="cs-cj__iphone-frame">
            <div style={{ position: 'absolute', top: 15, left: 18.8, width: 314, height: 680, overflow: 'hidden', borderRadius: 33 }}>
              <PrototypeEmbed />
            </div>
            <img
              src="/images/iphone.png"
              alt=""
              style={{ position: 'absolute', top: 0, left: 0, width: 352, height: 710, pointerEvents: 'none' }}
            />
          </div>
        </div>
      </motion.section>

      {/* ── 3. The Problem ────────────────────────────────── */}
      <motion.section className="cs-cj__section" {...scrollFadeUp}>
        <SectionLabel>The Problem</SectionLabel>
        <p className="cs-cj__body">
          WebMD Health Services exists to create better health outcomes for the employees of their corporate clients. One of the ways they do that is through education, but health content is easy to ignore. Content Journeys was an attempt to change that, using gamification to make users actually want to engage. The goal was to build something that feels like progress, not homework.
        </p>
      </motion.section>

      {/* ── 4. What I Built ───────────────────────────────── */}
      <motion.section className="cs-cj__section" {...scrollFadeUp}>
        <SectionLabel>What I Built</SectionLabel>
        <p className="cs-cj__body">
          The prototype has three connected pieces. A game-like path map where users see their progress through levels, with idle animations, hover states, and click interactions that reveal level entry points. A matching game where users pair related health concepts, with correct match confirmation, incorrect attempt resets, and a reward state on completion. As part of the matching game I designed and built a progress bar that updates in real time as users make correct matches, giving a persistent sense of momentum through the activity. And an exit screen that makes finishing feel meaningful and guides users back to the path.
        </p>
      </motion.section>

      {/* ── 5. The Logic ──────────────────────────────────── */}
      <motion.section className="cs-cj__section" {...scrollFadeUp}>
        <SectionLabel>The Logic</SectionLabel>
        <p className="cs-cj__body">
          The hardest part wasn't the animation. It was making the system behave predictably across every possible user path. I built a state model with idle, hover, active, and completed states across the whole experience. The matching game required logic to validate selections, prevent duplicate picks, lock completed pairs, and reset incorrect attempts cleanly.
        </p>
      </motion.section>

      {/* ── 6. Matching game logic flowchart ──────────────── */}
      <motion.div className="cs-cj__embed-section" {...scrollFadeUp}>
        <SectionLabel>Matching Game Logic</SectionLabel>
        <img
          src="/images/Matching Game Logic Flow.png"
          alt="Matching Game Logic Flow"
          style={{ width: '100%', maxWidth: '1104px', display: 'block' }}
        />
      </motion.div>

      {/* ── 7. The Build + matching game iPhone ───────────── */}
      <motion.div className="cs-cj__content-row" {...scrollFadeUp}>
        <section className="cs-cj__section cs-cj__section--inline">
          <SectionLabel>The Build</SectionLabel>
          <p className="cs-cj__body">
            I built an interactive prototype that simulates the full experience. The matching game is fully completable and users pair nutrients with their definitions across 8 rounds. Beyond the provided designs I made UI contributions where the experience needed extension, staying within the established visual system while filling in gaps the static screens didn't account for.
          </p>
        </section>
        <div className="cs-cj__content-phone">
          <div className="cs-cj__iphone-frame">
            <div style={{ position: 'absolute', top: 15, left: 18.8, width: 314, height: 680, overflow: 'hidden', borderRadius: 33 }}>
              <QuizPhoneEmbed />
            </div>
            <img
              src="/images/iphone.png"
              alt=""
              style={{ position: 'absolute', top: 0, left: 0, width: 352, height: 710, pointerEvents: 'none' }}
            />
          </div>
        </div>
      </motion.div>

      {/* ── 8. Outcome + progress bar ─────────────────────── */}
      <motion.div className="cs-cj__content-row" {...scrollFadeUp}>
        <section className="cs-cj__section cs-cj__section--inline">
          <SectionLabel>Outcome</SectionLabel>
          <p className="cs-cj__body">
            The prototype was delivered and went through team review. I left at the end of my internship with the work in a solid place. If I were to keep going I'd want to push on the gamification layer. There's a lot of room to explore adaptive difficulty and longer term engagement mechanics like streaks or evolving pathways.
          </p>
        </section>
        <div className="cs-cj__content-embed">
          <SectionLabel className="cs-cj__embed-label-mobile">Progress Indicator</SectionLabel>
          <ProgressBarEmbed />
        </div>
      </motion.div>

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
