import NavScrollLink from '../NavScrollLink';
import LazyCTAWords from '../LazyCTAWords';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import useIsMobile from '../../utils/useIsMobile';
import { scrollFadeUp, scrollStaggerParent, scrollStaggerChild } from '../../utils/animation';
import '../../pages/Showcase.css';
import './Challenges.css';

// ── Rive embed components ──────────────────────────────────────────

function CharacterPickerEmbedRive({ src, isPhone }) {
  const { RiveComponent, rive } = useRive({
    src,
    artboard: 'Main',
    stateMachines: 'State Machine 1',
    autoplay: true,
    autoBind: true,
    shouldDisableRiveListeners: false,
    isTouchScrollEnabled: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.TopLeft }),
  });
  useEffect(() => { if (rive) rive.resizeDrawingSurfaceToCanvas(); }, [rive]);
  const style = isPhone
    ? { width: '100%', height: '100vh', pointerEvents: 'auto' }
    : { width: '100%', height: '441px', pointerEvents: 'auto' };
  return <RiveComponent style={style} />;
}

function CharacterPickerEmbed() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const isMobile = useIsMobile();
  // Phones max ~430px portrait; smallest iPad is 744px — use desktop riv for all iPads
  const isPhone = isMobile && typeof window !== 'undefined' && window.innerWidth < 600;
  const src = isPhone
    ? '/rive/just_character_picker_mobile.riv'
    : '/rive/challenges_just_character_picker.riv';
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
  const containerStyle = isMobile
    ? { width: '100%' }
    : { width: '1038px', height: '441px' };
  return (
    <div ref={ref} className="cs-ch__character-picker" style={containerStyle}>
      {shouldLoad && <CharacterPickerEmbedRive src={src} isPhone={isPhone} />}
    </div>
  );
}

function ActivityLibraryEmbedRive({ onBounds }) {
  const { RiveComponent, rive } = useRive({
    src: '/rive/challenges_all_lined_up_.riv',
    artboard: 'Main',
    stateMachines: 'State Machine 1',
    autoplay: true,
    autoBind: true,
    shouldDisableRiveListeners: false,
    isTouchScrollEnabled: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Top }),
  });
  useEffect(() => {
    if (!rive) return;
    rive.resizeDrawingSurfaceToCanvas();
    if (onBounds) {
      try {
        const b = rive.bounds;
        if (b && b.maxX !== b.minX) onBounds((b.maxY - b.minY) / (b.maxX - b.minX));
      } catch (_) {}
    }
  }, [rive, onBounds]);
  return <RiveComponent style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />;
}

function ActivityLibraryEmbed() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef(null);
  const isMobile = useIsMobile();
  const isIPad = isMobile && typeof window !== 'undefined' && window.innerWidth >= 600;
  const isPhone = isMobile && !isIPad;
  const [height, setHeight] = useState(isPhone ? 511 : 1599);

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

  const handleBounds = (ratio) => {
    if (ref.current) setHeight(Math.round(ref.current.offsetWidth * ratio));
  };

  return (
    <div ref={ref} className="cs-ch__activity-library" style={{ width: '100%', height }}>
      {shouldLoad && <ActivityLibraryEmbedRive onBounds={isIPad ? handleBounds : null} />}
    </div>
  );
}

function TournamentEmbedRive() {
  const { RiveComponent, rive } = useRive({
    src: '/rive/challenges_just_tournament.riv',
    artboard: 'Tournament',
    stateMachines: 'State Machine 1',
    autoplay: true,
    autoBind: true,
    shouldDisableRiveListeners: false,
    isTouchScrollEnabled: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.TopLeft }),
  });
  useEffect(() => { if (rive) rive.resizeDrawingSurfaceToCanvas(); }, [rive]);
  return <RiveComponent style={{ width: '100%', height: '500px', pointerEvents: 'auto' }} />;
}

function TournamentEmbed() {
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
    <div ref={ref} className="cs-ch__tournament" style={{ width: '100%', height: '500px' }}>
      {shouldLoad && <TournamentEmbedRive />}
    </div>
  );
}

function SectionLabel({ children }) {
  return <span className="cs-ch__label">{children}</span>;
}

export default function Challenges({ project, prev, next }) {
  const [hintDismissed, setHintDismissed] = useState(false);
  const isMobile = useIsMobile();

  return (
    <motion.main key={project.slug} className="content showcase cs-ch">

      {/* ── 1. Project header ─────────────────────────────── */}
      <motion.section className="cs-ch__header" {...scrollFadeUp}>
        <h1 className="cs-ch__headline">{project.name}</h1>
        <p className="cs-ch__summary">
          A customizable avatar animation system built for a team health tournament at WebMD Health Services.
        </p>
      </motion.section>

      {/* ── Metadata strip ────────────────────────────────── */}
      <motion.div className="cs-ch__meta" {...scrollStaggerParent}>
        <motion.div className="cs-ch__meta-item" {...scrollStaggerChild}>
          <span className="cs-ch__meta-label">Role</span>
          <span className="cs-ch__meta-value">UX Animator</span>
        </motion.div>
        <motion.div className="cs-ch__meta-item" {...scrollStaggerChild}>
          <span className="cs-ch__meta-label">Contribution</span>
          <span className="cs-ch__meta-value">Character Animation, Motion Systems, Interactive Prototyping, Developer Collaboration</span>
        </motion.div>
        <motion.div className="cs-ch__meta-item" {...scrollStaggerChild}>
          <span className="cs-ch__meta-label">Tools</span>
          <span className="cs-ch__meta-value">Rive, Figma</span>
        </motion.div>
        <motion.div className="cs-ch__meta-item" {...scrollStaggerChild}>
          <span className="cs-ch__meta-label">Context</span>
          <span className="cs-ch__meta-value">Internship / WebMD Health Services</span>
        </motion.div>
      </motion.div>

      {/* ── 2. Overview + character picker ───────────────── */}
      <motion.section className="cs-ch__overview-col" {...scrollFadeUp}>
        <div className="cs-ch__overview-text">
          <SectionLabel>Overview</SectionLabel>
          <p className="cs-ch__body">
            Challenges is a tournament feature built for WebMD Health Services where employees compete in health and fitness activities as a team. I was brought in to design and build the avatar animation system that brings the experience to life.
          </p>
        </div>
        <div className="cs-ch__overview-embed" style={{ width: isMobile ? '100%' : '1038px' }} onClick={() => setHintDismissed(true)}>
          <AnimatePresence>
            {!hintDismissed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 36, transition: { duration: 0.5, ease: [0.25, 0.1, 0.15, 1] } }}
                exit={{ opacity: 0, height: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.1, 1] } }}
                style={{ overflow: 'hidden', marginBottom: 12 }}
              >
                <span className="cs-spark__phone-hint">Tap to customize your character</span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="cs-ch__hero-wrapper">
            <CharacterPickerEmbed />
          </div>
        </div>
      </motion.section>

      {/* ── 3. The Brief ──────────────────────────────────── */}
      <motion.section className="cs-ch__section" {...scrollFadeUp}>
        <SectionLabel>The Brief</SectionLabel>
        <p className="cs-ch__body">
          I was connected with a UX designer on my team who had been developing the tournament concept. We started with a conversation about what was possible in Rive. I helped him understand the capabilities and constraints of the tool, and from that we scoped out what we could build. The goal was an avatar system that could handle any activity, keep each user's personalized look, and be practical for developers to implement.
        </p>
      </motion.section>

      {/* ── 4. What I Built ───────────────────────────────── */}
      <motion.section className="cs-ch__section" {...scrollFadeUp}>
        <SectionLabel>What I Built</SectionLabel>
        <p className="cs-ch__body">
          I built two character rigs from the designer's illustrations, a side view and a three quarter view. Using state machines and View Model properties I created a customization system that lets developers pass in each user's stored preferences, hair type, hair color, skin color, and team color, and have the character reflect them automatically. One rig, any combination of looks, any activity. From there I animated 36 activities across both rigs, went through two rounds of team review and edits, and worked directly with the development team on the file format. We started with separate files per activity but found a way to consolidate everything into a single reusable file that stayed small thanks to Rive's format. That collaboration meant the handoff was clean and the system was practical to implement.
        </p>
      </motion.section>

      {/* ── 5. Activity Library ───────────────────────────── */}
      <motion.div className="cs-ch__embed-section" {...scrollFadeUp}>
        <SectionLabel>Activity Library</SectionLabel>
        <ActivityLibraryEmbed />
      </motion.div>

      {/* ── 6. The Build ──────────────────────────────────── */}
      <motion.section className="cs-ch__section" {...scrollFadeUp}>
        <SectionLabel>The Build</SectionLabel>
        <p className="cs-ch__body">
          The final system is one file that handles every activity and every personalization combination. Developers load it once and control the character's appearance and current activity through simple property inputs, no separate files to manage and no redundant assets.
        </p>
      </motion.section>

      {/* ── 7. Tournament ─────────────────────────────────── */}
      <motion.div className="cs-ch__embed-section" {...scrollFadeUp}>
        <SectionLabel>Tournament</SectionLabel>
        <TournamentEmbed />
      </motion.div>

      {/* ── 8. Outcome ────────────────────────────────────── */}
      <motion.section className="cs-ch__section" {...scrollFadeUp}>
        <SectionLabel>Outcome</SectionLabel>
        <p className="cs-ch__body">
          The work went through two rounds of team review with quite a few edits along the way. Getting the character animations to feel right across 36 activities took real iteration. By the end the team was happy with where it landed. The devs were still working through a security challenge with Rive's WASM file callbacks when I left. WebMD handles strictly protected health data so that kind of due diligence is taken seriously, and it was the right call to work through it properly before shipping. The animation system itself was complete and ready.
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
