import NavScrollLink from '../NavScrollLink';
import LazyCTAWords from '../LazyCTAWords';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import useIsMobile from '../../utils/useIsMobile';
import { scrollFadeUp, scrollStaggerParent, scrollStaggerChild } from '../../utils/animation';
import '../../pages/Showcase.css';
import './SparkAI.css';

// ── Rive embed components ──────────────────────────────────────────

function PrototypeEmbedRive() {
  const { RiveComponent: HeroRive } = useRive({
    src: `${process.env.PUBLIC_URL}/rive/spark_prototype.riv`,
    artboard: 'HERO',
    stateMachines: ['Hero State Machine', 'Hero Desktop (Hover)', 'State Machine 1'],
    autoplay: true,
    autoBind: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });
  return <HeroRive style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />;
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

const embedBg = { background: '#DEE1FF', borderRadius: '30px' };

function makeAlertEmbed(artboard) {
  function EmbedRive() {
    const { RiveComponent, rive } = useRive({
      src: `${process.env.PUBLIC_URL}/rive/spark_case_studie_elements.riv`,
      artboard,
      stateMachines: 'State Machine 1',
      autoplay: true,
      autoBind: true,
      shouldDisableRiveListeners: false,
      layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    });
    useEffect(() => { if (rive) rive.resizeDrawingSurfaceToCanvas(); }, [rive]);
    return <RiveComponent style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />;
  }
  function Embed() {
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
      <div ref={ref} style={{ ...embedBg, height: '300px' }}>
        {shouldLoad && <EmbedRive />}
      </div>
    );
  }
  return Embed;
}

function makeActiveEmbed(artboard, stateMachines) {
  function EmbedRive() {
    const { RiveComponent, rive } = useRive({
      src: `${process.env.PUBLIC_URL}/rive/spark_case_studie_elements.riv`,
      artboard,
      stateMachines,
      autoplay: true,
      autoBind: true,
      shouldDisableRiveListeners: false,
      isTouchScrollEnabled: true,
      layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    });
    useEffect(() => { if (rive) rive.resizeDrawingSurfaceToCanvas(); }, [rive]);
    return <RiveComponent style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />;
  }
  function Embed() {
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
      <div ref={ref} style={{ ...embedBg, height: '300px' }}>
        {shouldLoad && <EmbedRive />}
      </div>
    );
  }
  return Embed;
}

const Alert1Embed = makeAlertEmbed('Spark Alert 1');
const Alert2Embed = makeAlertEmbed('Spark Alert 2');
const Alert3Embed = makeAlertEmbed('Spark Alert 3');
const Active1Embed = makeActiveEmbed('Spark Active 3', ['State Machine 1', 'Hero Desktop Hover']);
const Active2Embed = makeActiveEmbed('Spark Active 2', ['State Machine 1', 'Iteration 2 Active']);
const Active3Embed = makeActiveEmbed('Spark Active 1', ['State Machine 1', 'Iteration 3']);

function ProcessingEmbedRive({ artboard, isMobile, onDimensions }) {
  const { RiveComponent, rive } = useRive({
    src: '/rive/spark_case_studie_elements.riv',
    artboard,
    stateMachines: 'Hero State Machine',
    autoplay: true,
    layout: new Layout({ fit: isMobile ? Fit.Fill : Fit.Contain, alignment: Alignment.Center }),
  });
  useEffect(() => {
    if (!rive) return;
    rive.resizeDrawingSurfaceToCanvas();
    if (isMobile && onDimensions) {
      const b = rive.bounds;
      onDimensions(b.maxX - b.minX, b.maxY - b.minY);
    }
  }, [rive, isMobile, onDimensions]);
  return <RiveComponent style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />;
}

function ProcessingEmbed() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [mobileHeight, setMobileHeight] = useState(160);
  const isMobile = useIsMobile();
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

  const handleDimensions = (w, h) => {
    if (!ref.current || !w) return;
    setMobileHeight(ref.current.offsetWidth * (h / w));
  };

  const artboard = isMobile ? 'Thinking State Mobile' : 'Thinking State Main';
  const height = isMobile ? mobileHeight : 160;

  return (
    <div ref={ref} style={{ position: 'relative', height }}>
      {shouldLoad && <ProcessingEmbedRive artboard={artboard} isMobile={isMobile} onDimensions={handleDimensions} />}
      {!isMobile && <div style={{ position: 'absolute', inset: 0, border: '24px solid white', borderRadius: '40px', pointerEvents: 'none', zIndex: 10 }} />}
    </div>
  );
}

function SectionLabel({ children }) {
  return <span className="cs-label">{children}</span>;
}

export default function SparkAI({ project, prev, next }) {
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
    <motion.main key={project.slug} className="content showcase cs-spark">

      {/* ── 1. Project header ─────────────────────────────── */}
      <motion.section className="cs-spark__header" {...scrollFadeUp}>
        <h1 className="cs-spark__headline">{project.name}</h1>
        <p className="cs-spark__summary">
          Spark is an AI assistant built into the WebMD Health Services app, used by employees navigating their health and benefits.
        </p>
      </motion.section>

      {/* ── Metadata strip ────────────────────────────────── */}
      <motion.div className="cs-spark__meta" {...scrollStaggerParent}>
        <motion.div className="cs-spark__meta-item" {...scrollStaggerChild}>
          <span className="cs-spark__meta-label">Role</span>
          <span className="cs-spark__meta-value">UX Animator</span>
        </motion.div>
        <motion.div className="cs-spark__meta-item" {...scrollStaggerChild}>
          <span className="cs-spark__meta-label">Contribution</span>
          <span className="cs-spark__meta-value">Motion Design, Interaction Design, Interactive Prototyping</span>
        </motion.div>
        <motion.div className="cs-spark__meta-item" {...scrollStaggerChild}>
          <span className="cs-spark__meta-label">Tools</span>
          <span className="cs-spark__meta-value">Rive, Figma</span>
        </motion.div>
        <motion.div className="cs-spark__meta-item" {...scrollStaggerChild}>
          <span className="cs-spark__meta-label">Context</span>
          <span className="cs-spark__meta-value">Internship / WebMD Health Services</span>
        </motion.div>
      </motion.div>

      {/* ── 2. Overview + prototype (two column) ──────────── */}
      <motion.section className="cs-spark__overview-row" {...scrollFadeUp}>
        <div className="cs-spark__overview-text">
          <SectionLabel>Overview</SectionLabel>
          <p className="cs-spark__body">
            Spark is an AI assistant built into the WebMD Health Services app, used by employees navigating their health and benefits. I was brought in to take a static UI redesign and build the motion system that would make Spark feel intelligent, approachable, and worth using.
          </p>
        </div>
        <div className="cs-spark__overview-phone" onClick={() => setHintDismissed(true)}>
          <AnimatePresence>
            {showHint && !hintDismissed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 36, transition: { duration: 0.5, ease: [0.25, 0.1, 0.15, 1] } }}
                exit={{ opacity: 0, height: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.1, 1] } }}
                style={{ overflow: 'hidden' }}
              >
                <span className="cs-spark__phone-hint">Tap the Spark button to begin</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="cs-spark__iphone-frame">
            <div style={{ position: 'absolute', top: 15, left: 15, width: 314, height: 680, overflow: 'hidden', borderRadius: 33 }}>
              <PrototypeEmbed />
            </div>
            <img
              src={`${process.env.PUBLIC_URL}/images/iphone.png`}
              alt=""
              style={{ position: 'absolute', top: 0, left: 0, width: 344, height: 710, pointerEvents: 'none' }}
            />
          </div>
        </div>
      </motion.section>

      {/* ── 3. The Problem ────────────────────────────────── */}
      <motion.section className="cs-spark__section" {...scrollFadeUp}>
        <SectionLabel>The Problem</SectionLabel>
        <p className="cs-spark__body">
          Spark lived in the top nav as a button. Present, but easy to ignore. The goal was getting users to notice Spark when it could help them, and once they were in, making the AI feel like something more than a basic chatbot. The challenge was using motion to communicate state, build trust, and make the experience feel human without being distracting.
        </p>
      </motion.section>

      {/* ── 4. Process ────────────────────────────────────── */}
      <motion.section className="cs-spark__section" {...scrollFadeUp}>
        <SectionLabel>Process</SectionLabel>
        <p className="cs-spark__body">
          I started by mapping out the key moments that needed motion to work. Three states emerged: an alert to draw attention, an active state to confirm engagement, and a processing state to show Spark was working. For each I built three iterations and brought them to the UX team for feedback, then narrowed to one direction per state before moving into building.
        </p>
      </motion.section>

      {/* ── 5. Alert States row ───────────────────────────── */}
      <motion.div className="cs-spark__rive-section" {...scrollFadeUp}>
        <SectionLabel>Alert States</SectionLabel>
        <div className="cs-spark__rive-row">
          <div className="cs-spark__state-item">
            <Alert1Embed />
            <span className="cs-spark__state-item-label">Iteration 1</span>
          </div>
          <div className="cs-spark__state-item">
            <Alert2Embed />
            <span className="cs-spark__state-item-label">Iteration 2</span>
          </div>
          <div className="cs-spark__state-item">
            <Alert3Embed />
            <span className="cs-spark__state-item-label">Iteration 3</span>
          </div>
        </div>
      </motion.div>

      {/* ── 6. Active States row ──────────────────────────── */}
      <motion.div className="cs-spark__rive-section" {...scrollFadeUp}>
        <SectionLabel>Active States</SectionLabel>
        <span className="cs-spark__row-hint">Tap to Explore</span>
        <div className="cs-spark__rive-row">
          <div className="cs-spark__state-item">
            <Active1Embed />
            <span className="cs-spark__state-item-label">Iteration 1</span>
          </div>
          <div className="cs-spark__state-item">
            <Active2Embed />
            <span className="cs-spark__state-item-label">Iteration 2</span>
          </div>
          <div className="cs-spark__state-item">
            <Active3Embed />
            <span className="cs-spark__state-item-label">Iteration 3</span>
          </div>
        </div>
      </motion.div>

      {/* ── 7. The Decisions ──────────────────────────────── */}
      <motion.section className="cs-spark__section" {...scrollFadeUp}>
        <SectionLabel>The Decisions</SectionLabel>
        <p className="cs-spark__body">
          Early explorations went in a flashier direction. Shape morphs, more dramatic transitions, trying to visually signal intelligence. We pulled back and landed on gradient sweeps with a subtle initial rotation. Something that feels alive without demanding attention. The alert animation plays exactly three times. Enough to be noticed by someone open to it, not enough to frustrate someone who isn't.
        </p>
      </motion.section>

      {/* ── 8. Processing State ───────────────────────────── */}
      <motion.div className="cs-spark__rive-section" {...scrollFadeUp}>
        <SectionLabel>Processing State</SectionLabel>
        <ProcessingEmbed />
      </motion.div>

      {/* ── 9. The Build ──────────────────────────────────── */}
      <motion.section className="cs-spark__section" {...scrollFadeUp}>
        <SectionLabel>The Build</SectionLabel>
        <p className="cs-spark__body">
          The final prototype was built entirely in Rive. I took the static designs from the team and built a fully interactive experience with a chat interface and suggested questions that show Spark thinking and responding in real time. The underlying state machine logic handles transitions, input triggers, and the alert sequence. Getting that logic to behave predictably across every interaction path was honestly the hardest part of the project.
        </p>
      </motion.section>

      {/* ── 10. Outcome ───────────────────────────────────── */}
      <motion.section className="cs-spark__section" {...scrollFadeUp}>
        <SectionLabel>Outcome</SectionLabel>
        <p className="cs-spark__body">
          The prototype went through team critique and MVP review and was received well. My internship wrapped before the redesign moved into development, but the motion system was complete and ready when I left.
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
