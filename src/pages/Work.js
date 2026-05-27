import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import NavBar from '../components/NavBar';
import ProjectCard from '../components/ProjectCard';
import LazyCTAWords from '../components/LazyCTAWords';
import SplitText from '../components/SplitText';
import { scrollFadeUp } from '../utils/animation';
import projects from '../data/projects';
import './Work.css';

// ── Pause Rive when scrolled out of viewport, play when back in ──
function useRiveVisibility(rive, containerRef) {
  useEffect(() => {
    if (!rive) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? rive.play() : rive.pause(); },
      { rootMargin: '0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rive, containerRef]);
}

const gpuLayerStyle = { width: '100%', height: '100%', willChange: 'transform', transform: 'translateZ(0)' };

function LazyRiveWrapper({ children }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0 }}>
      {inView && children}
    </div>
  );
}

// ── Rive card components ─────────────────────────────────────────

function SparkAIRive() {
  const containerRef = useRef(null);
  const { RiveComponent, rive } = useRive({
    src: `${process.env.PUBLIC_URL}/rive/spark_for_project_card.riv`,
    artboard: 'Active/Idle',
    stateMachines: 'Hero Desktop (Hover)',
    autoplay: true,
    autoBind: true,
    layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
  });
  useEffect(() => { if (rive) rive.resizeDrawingSurfaceToCanvas(); }, [rive]);
  useRiveVisibility(rive, containerRef);
  return (
    <div ref={containerRef} style={gpuLayerStyle}>
      <RiveComponent style={{ width: '100%', height: '100%', pointerEvents: 'none' }} />
    </div>
  );
}

function ContentJourneysRive() {
  const containerRef = useRef(null);
  const { RiveComponent, rive } = useRive({
    src: `${process.env.PUBLIC_URL}/rive/content_journeys_project_card.riv`,
    artboard: 'INT PATHWAYS',
    stateMachines: 'main',
    autoplay: true,
    autoBind: true,
    layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
  });
  useEffect(() => { if (rive) rive.resizeDrawingSurfaceToCanvas(); }, [rive]);
  useRiveVisibility(rive, containerRef);
  return (
    <div ref={containerRef} style={gpuLayerStyle}>
      <RiveComponent style={{ width: '100%', height: '100%', pointerEvents: 'none' }} />
    </div>
  );
}

function EmojiReactionsRive() {
  const containerRef = useRef(null);
  const { RiveComponent, rive } = useRive({
    src: `${process.env.PUBLIC_URL}/rive/emoji_reactions_project_card.riv`,
    artboard: 'emoji embed',
    stateMachines: 'State Machine 1',
    autoplay: true,
    autoBind: true,
  });
  useEffect(() => { if (rive) rive.resizeDrawingSurfaceToCanvas(); }, [rive]);
  useRiveVisibility(rive, containerRef);
  return (
    <div ref={containerRef} style={gpuLayerStyle}>
      <RiveComponent style={{ width: '100%', height: '100%', pointerEvents: 'none' }} />
    </div>
  );
}

function ChallengesTournamentRive() {
  const containerRef = useRef(null);
  const { RiveComponent, rive } = useRive({
    src: `${process.env.PUBLIC_URL}/rive/challenges_just_tournament.riv`,
    artboard: 'Tournament',
    stateMachines: 'State Machine 1',
    autoplay: true,
    autoBind: true,
    shouldDisableRiveListeners: false,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.TopLeft }),
  });
  useEffect(() => { if (rive) rive.resizeDrawingSurfaceToCanvas(); }, [rive]);
  useRiveVisibility(rive, containerRef);
  return (
    <div ref={containerRef} style={gpuLayerStyle}>
      <RiveComponent style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />
    </div>
  );
}

function UIAnimationsRive() {
  const containerRef = useRef(null);
  const { RiveComponent, rive } = useRive({
    src: `${process.env.PUBLIC_URL}/rive/ui_animations_project_card.riv`,
    artboard: 'coach call',
    stateMachines: 'State Machine 1',
    autoplay: true,
    autoBind: true,
  });
  useEffect(() => { if (rive) rive.resizeDrawingSurfaceToCanvas(); }, [rive]);
  useRiveVisibility(rive, containerRef);
  return (
    <div ref={containerRef} style={gpuLayerStyle}>
      <RiveComponent style={{ width: '100%', height: '100%', pointerEvents: 'none' }} />
    </div>
  );
}

function EventCalendarCard() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <img src={`${process.env.PUBLIC_URL}/images/EventCal.jpg`} alt="" className="work__card-img work__card-img--pre-zoom" />
    </div>
  );
}

function WritingRevolutionCard() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <img src={`${process.env.PUBLIC_URL}/images/twr-project-card.jpg`} alt="" className="work__card-img work__card-img--pre-zoom" />
    </div>
  );
}

function VUTalentCard() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <img src={`${process.env.PUBLIC_URL}/images/vu-talent-project-card.jpg`} alt="" className="work__card-img" />
    </div>
  );
}

function VitalElementsCard() {
  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <img src={`${process.env.PUBLIC_URL}/images/tve-project-card.jpg`} alt="" className="work__card-img" />
    </div>
  );
}

function getMedia(slug) {
  switch (slug) {
    case 'spark-ai':           return <LazyRiveWrapper><SparkAIRive /></LazyRiveWrapper>;
    case 'event-calendar':     return <EventCalendarCard />;
    case 'content-journeys':   return <LazyRiveWrapper><ContentJourneysRive /></LazyRiveWrapper>;
    case 'emoji-reactions':    return <LazyRiveWrapper><EmojiReactionsRive /></LazyRiveWrapper>;
    case 'challenges':         return <LazyRiveWrapper><ChallengesTournamentRive /></LazyRiveWrapper>;
    case 'ui-animations':      return <LazyRiveWrapper><UIAnimationsRive /></LazyRiveWrapper>;
    case 'writing-revolution':  return <WritingRevolutionCard />;
    case 'vu-talent':          return <VUTalentCard />;
    case 'vital-elements':     return <VitalElementsCard />;
    default:                   return undefined;
  }
}

export default function Work() {
  return (
    <div className="page">
      <NavBar />

      <motion.main className="content work">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="work__hero">
          <motion.div initial="hidden" animate="visible">
            <SplitText text="Selected works." tag="h1" className="work__headline" />
          </motion.div>
          <motion.p className="work__subhead" {...scrollFadeUp}>
            A selection of works in Motion and UX design.
          </motion.p>
        </section>

        {/* ── Project Grid ──────────────────────────────────── */}
        <section className="work__grid">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="work__card-wrapper"
              {...scrollFadeUp}
            >
              <ProjectCard
                name={project.name}
                description={project.description}
                tags={project.tags}
                link={`/work/${project.slug}`}
                className="work__card"
                media={getMedia(project.slug)}
                wrapperStyle={project.slug === 'emoji-reactions' ? { border: '1px solid #E8E8E8', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' } : undefined}
              />
            </motion.div>
          ))}
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className="work__cta">
          <LazyCTAWords href="mailto:jonahfreedmandesigns@gmail.com" className="work__cta-link" text="Let's Work Together" />
        </section>

      </motion.main>

      <NavBar footer />
    </div>
  );
}
