import NavScrollLink from '../NavScrollLink';
import LazyCTAWords from '../LazyCTAWords';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { scrollFadeUp, scrollStaggerParent, scrollStaggerChild } from '../../utils/animation';
import '../../pages/Showcase.css';
import './EmojiReactions.css';

const RIVE_SRC = '/rive/coach_connect_message_reactions.riv';

// ── Rive embed components ──────────────────────────────────────────

function HeroEmbedRive() {
  const { RiveComponent, rive } = useRive({
    src: RIVE_SRC,
    artboard: 'Main',
    stateMachines: 'State Machine MAIN',
    autoplay: true,
    autoBind: true,
    shouldDisableRiveListeners: false,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });
  useEffect(() => { if (rive) rive.resizeDrawingSurfaceToCanvas(); }, [rive]);
  return <RiveComponent style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />;
}

function HeroEmbed() {
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
      {shouldLoad && <HeroEmbedRive />}
    </div>
  );
}

function EmojiGridEmbedRive() {
  const { RiveComponent, rive } = useRive({
    src: RIVE_SRC,
    artboard: 'emoji embed',
    stateMachines: 'State Machine 1',
    autoplay: true,
    autoBind: true,
    shouldDisableRiveListeners: false,
  });
  useEffect(() => { if (rive) rive.resizeDrawingSurfaceToCanvas(); }, [rive]);
  return <RiveComponent style={{ width: '100%', height: '364px', pointerEvents: 'auto' }} />;
}

function EmojiGridEmbed() {
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
    <div ref={ref} style={{ width: '100%', height: '364px' }}>
      {shouldLoad && <EmojiGridEmbedRive />}
    </div>
  );
}

// ── Section label ─────────────────────────────────────────────────
function SectionLabel({ children }) {
  return <span className="cs-er__label">{children}</span>;
}

export default function EmojiReactions({ project, prev, next }) {
  const [hintDismissed, setHintDismissed] = useState(false);

  return (
    <motion.main key={project.slug} className="content showcase cs-er">

      {/* ── 1. Project header ─────────────────────────────── */}
      <motion.section className="cs-er__header" {...scrollFadeUp}>
        <h1 className="cs-er__headline">{project.name}</h1>
        <p className="cs-er__summary">
          An animated reaction system for a wellness coaching app, designed to make digital messaging feel personal and human.
        </p>
      </motion.section>

      {/* ── Metadata strip ────────────────────────────────── */}
      <motion.div className="cs-er__meta" {...scrollStaggerParent}>
        <motion.div className="cs-er__meta-item" {...scrollStaggerChild}>
          <span className="cs-er__meta-label">Role</span>
          <span className="cs-er__meta-value">UX Animator</span>
        </motion.div>
        <motion.div className="cs-er__meta-item" {...scrollStaggerChild}>
          <span className="cs-er__meta-label">Contribution</span>
          <span className="cs-er__meta-value">Interaction Design, Motion Design, Interactive Prototyping</span>
        </motion.div>
        <motion.div className="cs-er__meta-item" {...scrollStaggerChild}>
          <span className="cs-er__meta-label">Tools</span>
          <span className="cs-er__meta-value">Rive, Figma</span>
        </motion.div>
        <motion.div className="cs-er__meta-item" {...scrollStaggerChild}>
          <span className="cs-er__meta-label">Context</span>
          <span className="cs-er__meta-value">Internship / WebMD Health Services</span>
        </motion.div>
      </motion.div>

      {/* ── 2. Overview + hero embed ──────────────────────── */}
      <motion.section className="cs-er__overview-col" {...scrollFadeUp}>
        <div className="cs-er__overview-text">
          <SectionLabel>Overview</SectionLabel>
          <p className="cs-er__body">
            Emoji Reactions is an interaction system built for Coach Connect, WebMD Health Services' messaging tool for clients and their wellness coaches. The goal was to make digital coaching feel less transactional and more human. I was given static Figma designs from a teammate and was responsible for designing the interaction patterns and motion that bring the experience to life.
          </p>
        </div>
        <div className="cs-er__hero-embed" onClick={() => setHintDismissed(true)}>
          <div className="cs-er__laptop-wrapper">
          <div className="cs-er__laptop-frame" style={{ position: 'relative', width: 1104, height: 690, margin: '0 auto' }}>
            <div style={{ position: 'absolute', top: 95, left: 144, width: 815, height: 500, overflow: 'hidden', borderRadius: 4 }}>
              <HeroEmbed />
            </div>
            <img
              src="/images/MacBook Pro.png"
              alt=""
              style={{ position: 'absolute', top: 0, left: 0, width: 1104, height: 690, pointerEvents: 'none' }}
            />
          </div>
          </div>
          <AnimatePresence>
            {!hintDismissed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 36, transition: { duration: 0.5, ease: [0.25, 0.1, 0.15, 1] } }}
                exit={{ opacity: 0, height: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.1, 1] } }}
                style={{ overflow: 'hidden', marginTop: 16 }}
              >
                <span className="cs-spark__phone-hint">Hover over a message to interact</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* ── 3. The Problem ────────────────────────────────── */}
      <motion.section className="cs-er__section" {...scrollFadeUp}>
        <SectionLabel>The Problem</SectionLabel>
        <p className="cs-er__body">
          Messaging between coaches and clients felt impersonal. Text alone wasn't enough to build the kind of relationship that makes wellness coaching effective. Emoji reactions were introduced as a way to add warmth and personality to the conversation, but the challenge was making them feel genuine rather than like a feature checkbox.
        </p>
      </motion.section>

      {/* ── 4. What I Built ───────────────────────────────── */}
      <motion.section className="cs-er__section" {...scrollFadeUp}>
        <SectionLabel>What I Built</SectionLabel>
        <p className="cs-er__body">
          A hover-triggered reaction system where coaches and users can respond to messages with animated emoji. Each emoji has its own motion personality, designed to feel expressive and satisfying rather than generic. The system handles hover states that reveal the reaction options, selection states that confirm a choice, and idle states that keep things calm when nothing is happening.
        </p>
      </motion.section>

      {/* ── 5. The Process ────────────────────────────────── */}
      <motion.section className="cs-er__section" {...scrollFadeUp}>
        <SectionLabel>The Process</SectionLabel>
        <p className="cs-er__body">
          During team critique we discovered that simply hovering over a chat bubble with an opacity change wasn't enough to tell users the feature was there. The affordance was too subtle. We decided to add a small icon that animates in to signal the interaction is available. Being able to prototype that fix quickly in Rive and show it in a meeting rather than describing it was what made the solution clear. That's something a static design couldn't have surfaced before implementation. We initially explored building a reusable Rive component for the entire reaction bubble and tooltips but found it wasn't realistic given the implementation constraints. Instead the emoji animations became small self-contained components that live inside the reaction bubble, which turned out to be a cleaner solution for the dev team anyway.
        </p>
      </motion.section>

      {/* ── 6. Emoji States grid ──────────────────────────── */}
      <motion.div className="cs-er__embed-section" {...scrollFadeUp}>
        <SectionLabel>Emoji States</SectionLabel>
        <EmojiGridEmbed />
      </motion.div>

      {/* ── 7. Outcome ────────────────────────────────────── */}
      <motion.section className="cs-er__section" {...scrollFadeUp}>
        <SectionLabel>Outcome</SectionLabel>
        <p className="cs-er__body">
          I delivered the animated prototype before leaving so the team had a clear motion and interaction reference for implementation. We had multiple meetings with developers to align on what they'd need, and the handoff was solid. Like most of my WebMD work it wasn't shipped before I left, but the groundwork was laid.
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
