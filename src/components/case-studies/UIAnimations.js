import NavScrollLink from '../NavScrollLink';
import LazyCTAWords from '../LazyCTAWords';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { scrollFadeUp, scrollStaggerParent, scrollStaggerChild } from '../../utils/animation';
import '../../pages/Showcase.css';
import './UIAnimations.css';

// ── Rive embed factory ─────────────────────────────────────────────

function makeRiveEmbed(artboard, stateMachines) {
  function EmbedRive() {
    const config = {
      src: `${process.env.PUBLIC_URL}/rive/ui_animations.riv`,
      artboard,
      autoplay: true,
      autoBind: true,
      shouldDisableRiveListeners: false,
      layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
    };
    if (stateMachines) config.stateMachines = stateMachines;
    const { RiveComponent, rive } = useRive(config);
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
      <div ref={ref} className="cs-ui__embed-card">
        {shouldLoad && <EmbedRive />}
      </div>
    );
  }
  return Embed;
}

const CoachCallEmbed    = makeRiveEmbed('coach call',              'State Machine 1');
const WinStateEmbed     = makeRiveEmbed('win_state_clap',          'State Machine 1');
const OnboardingEmbed   = makeRiveEmbed('onboarding_loading_page', 'Main');
const BiometricEmbed    = makeRiveEmbed('biometrics_win_state',    'State Machine 2');
const CoachConnectEmbed = makeRiveEmbed('modal-sent copy',         'State Machine 1');
const SkeletonEmbed     = makeRiveEmbed('skeleton loader scene',   '1.2 Speed');

// CYOA uses the default 'Main' artboard — pulled out of the factory so autoBind
// can be disabled (autoBind blocks playback when ViewModel data isn't supplied)
function CYOAEmbedRive() {
  const { RiveComponent, rive } = useRive({
    src: '/rive/ui_animations.riv',
    artboard: 'Main',
    stateMachines: 'State Machine 1',
    autoplay: true,
    autoBind: true,
    shouldDisableRiveListeners: false,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });
  useEffect(() => { if (rive) rive.resizeDrawingSurfaceToCanvas(); }, [rive]);
  return <RiveComponent style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />;
}

function CYOAEmbed() {
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
    <div ref={ref} className="cs-ui__embed-card">
      {shouldLoad && <CYOAEmbedRive />}
    </div>
  );
}

const ANIMATION_ROWS = [
  {
    label: 'Coach Call',
    copy: 'An animation that plays when scheduling or starting a session with your wellness coach. Designed to signal that something meaningful is about to happen and add a moment of warmth before the conversation begins.',
    Embed: CoachCallEmbed,
  },
  {
    label: 'Win State "Good Job!"',
    copy: 'A celebratory animation that plays when users achieve a goal or complete a task. Designed to reward progress and make accomplishment feel satisfying rather than just functional.',
    Embed: WinStateEmbed,
  },
  {
    label: 'Onboarding Loader',
    copy: 'Plays once onboarding is complete while the app organizes your information and builds your profile. Designed to make the wait feel intentional and signal that something personalized is being prepared for you.',
    Embed: OnboardingEmbed,
  },
  {
    label: 'Biometric Screening Win State',
    copy: 'A win state animation that plays after completing your biometric screenings. Designed to celebrate a meaningful health milestone and encourage continued engagement with the platform.',
    Embed: BiometricEmbed,
  },
  {
    label: 'Choose Your Own Adventure Win State',
    copy: "An animated treasure chest that plays when users make progress in WebMD's Choose Your Own Adventure health game. Designed to reward participation and reinforce the playful, gamified spirit of the experience.",
    Embed: CYOAEmbed,
  },
  {
    label: 'Coach Connect Modal',
    copy: 'Plays when a message is successfully sent through the Coach Connect app. A small moment of confirmation and delight that makes communication feel responsive and human.',
    Embed: CoachConnectEmbed,
  },
  {
    label: 'Skeleton Loader',
    copy: 'Plays while pages load to prevent users from staring at a blank screen. Designed to signal that content is on its way and keep the experience feeling active rather than stalled.',
    Embed: SkeletonEmbed,
  },
];

function SectionLabel({ children }) {
  return <span className="cs-ui__label">{children}</span>;
}

export default function UIAnimations({ project, prev, next }) {
  return (
    <motion.main key={project.slug} className="content showcase cs-ui">

      {/* ── 1. Project header ─────────────────────────────── */}
      <motion.section className="cs-ui__header" {...scrollFadeUp}>
        <h1 className="cs-ui__headline">{project.name}</h1>
        <p className="cs-ui__summary">
          A collection of seven UI animations created for WebMD Health Services across multiple products and features.
        </p>
      </motion.section>

      {/* ── Metadata strip ────────────────────────────────── */}
      <motion.div className="cs-ui__meta" {...scrollStaggerParent}>
        <motion.div className="cs-ui__meta-item" {...scrollStaggerChild}>
          <span className="cs-ui__meta-label">Role</span>
          <span className="cs-ui__meta-value">UX Animator</span>
        </motion.div>
        <motion.div className="cs-ui__meta-item" {...scrollStaggerChild}>
          <span className="cs-ui__meta-label">Contribution</span>
          <span className="cs-ui__meta-value">Motion Design, UI Animation, Interactive Prototyping</span>
        </motion.div>
        <motion.div className="cs-ui__meta-item" {...scrollStaggerChild}>
          <span className="cs-ui__meta-label">Tools</span>
          <span className="cs-ui__meta-value">Rive, Figma</span>
        </motion.div>
        <motion.div className="cs-ui__meta-item" {...scrollStaggerChild}>
          <span className="cs-ui__meta-label">Context</span>
          <span className="cs-ui__meta-value">Internship / WebMD Health Services</span>
        </motion.div>
      </motion.div>

      {/* ── 2. Overview ───────────────────────────────────── */}
      <motion.section className="cs-ui__section" {...scrollFadeUp}>
        <SectionLabel>Overview</SectionLabel>
        <p className="cs-ui__body">
          A collection of seven UI animations created for WebMD Health Services across multiple products and features. Throughout my internship, teammates brought me static designs that needed motion. From onboarding flows to skeleton loaders to win states. This collection represents the range of animation work I contributed outside of my primary projects.
        </p>
      </motion.section>

      {/* ── 3. Animation rows ─────────────────────────────── */}
      <div className="cs-ui__rows">
        {ANIMATION_ROWS.map(({ label, copy, Embed }) => (
          <motion.div key={label} className="cs-ui__row" {...scrollFadeUp}>
            <div className="cs-ui__row-text">
              <SectionLabel>{label}</SectionLabel>
              <p className="cs-ui__body">{copy}</p>
            </div>
            <div className="cs-ui__row-embed">
              <Embed />
            </div>
          </motion.div>
        ))}
      </div>

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
