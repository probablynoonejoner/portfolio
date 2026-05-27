import NavScrollLink from '../NavScrollLink';
import LazyCTAWords from '../LazyCTAWords';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { scrollFadeUp, scrollStaggerParent, scrollStaggerChild } from '../../utils/animation';
import WebMDCalendar from '../WebMDCalendar';
import '../../pages/Showcase.css';
import './EventCalendar.css';

// ── Prototype Rive embed ───────────────────────────────────────────

function PrototypeEmbedRive() {
  const { RiveComponent, rive } = useRive({
    src: `${process.env.PUBLIC_URL}/rive/event_cal_prototype.riv`,
    artboard: 'Prototype',
    stateMachines: 'State Machine 1',
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

function SectionLabel({ children }) {
  return <span className="cs-ec__label">{children}</span>;
}

const MOTION_ROWS = [
  ['Week strip slide',      '500ms', 'cubic-bezier(0.2, 0, 0, 1)'],
  ['Month grid open/close', '500ms', 'cubic-bezier(0.2, 0, 0, 1)'],
  ['Month grid slide',      '500ms', 'cubic-bezier(0.2, 0, 0, 1)'],
  ['Month label crossfade', '500ms', 'cubic-bezier(0.2, 0, 0, 1)'],
  ['Active week pill',      '300ms', 'cubic-bezier(0, 0.44, 0, 1)'],
  ['Day circle fill',       '100ms', 'cubic-bezier(0.2, 0, 0, 1)'],
  ['Day label resize',      '200ms', 'cubic-bezier(0.2, 0, 0, 1)'],
  ['Arrow tap feedback',    '120ms', 'cubic-bezier(0.2, 0, 0, 1)'],
];

export default function EventCalendar({ project, prev, next }) {
  return (
    <motion.main key={project.slug} className="content showcase cs-ec">

      {/* ── Header ─────────────────────────────────────────── */}
      <motion.section className="cs-ec__header" {...scrollFadeUp}>
        <h1 className="cs-ec__headline">{project.name}</h1>
        <p className="cs-ec__summary">
          A mobile event calendar feature designed and built for WebMD Health Services, from initial wireframes through interactive prototype and React implementation.
        </p>
      </motion.section>

      {/* ── Metadata strip ─────────────────────────────────── */}
      <motion.div className="cs-ec__meta" {...scrollStaggerParent}>
        <motion.div className="cs-ec__meta-item" {...scrollStaggerChild}>
          <span className="cs-ec__meta-label">Role</span>
          <span className="cs-ec__meta-value">Product Designer</span>
        </motion.div>
        <motion.div className="cs-ec__meta-item" {...scrollStaggerChild}>
          <span className="cs-ec__meta-label">Contribution</span>
          <span className="cs-ec__meta-value">UX Design, Interaction Design, Motion Design, Prototyping, React Build</span>
        </motion.div>
        <motion.div className="cs-ec__meta-item" {...scrollStaggerChild}>
          <span className="cs-ec__meta-label">Tools</span>
          <span className="cs-ec__meta-value">Figma, Rive, Claude, Claude Code, React, Framer Motion</span>
        </motion.div>
        <motion.div className="cs-ec__meta-item" {...scrollStaggerChild}>
          <span className="cs-ec__meta-label">Context</span>
          <span className="cs-ec__meta-value">Internship / WebMD Health Services</span>
        </motion.div>
      </motion.div>

      {/* ── Overview + prototype (two-column) ──────────────── */}
      <motion.section className="cs-ec__overview-row" {...scrollFadeUp}>
        <div className="cs-ec__overview-text">
          <SectionLabel>Overview</SectionLabel>
          <p className="cs-ec__body">
            The Event Calendar was my first full UX assignment at WebMD Health Services. I was given user stories for a mobile scheduling feature that would help employees track health program events, due dates, and coach sessions. I owned the project from initial wireframes through high fidelity design, Rive prototyping, and a React build.
          </p>
        </div>
        <div className="cs-ec__overview-phone">
          <div className="cs-ec__iphone-frame">
            <div style={{ position: 'absolute', top: 15, left: 15.5, width: 314, height: 680, overflow: 'hidden', borderRadius: 33, display: 'flex', justifyContent: 'center' }}>
              <WebMDCalendar />
            </div>
            <img
              src={`${process.env.PUBLIC_URL}/images/iphone.png`}
              alt=""
              style={{ position: 'absolute', top: 0, left: 0, width: 345, height: 710, pointerEvents: 'none' }}
            />
          </div>
          <p className="cs-ec__phone-caption">Tap days · Scroll events · Swipe to advance weeks</p>
        </div>
      </motion.section>

      {/* ── The Brief ──────────────────────────────────────── */}
      <motion.section className="cs-ec__section" {...scrollFadeUp}>
        <SectionLabel>The Brief</SectionLabel>
        <p className="cs-ec__body">
          Business client employees needed a way to see their upcoming health and wellness events without the overhead of a full calendar app. The feature would live inside the existing WebMD mobile app. The core user need was simple. What do I have coming up and what can I sign up for?
        </p>
      </motion.section>

      {/* ── Process gallery ────────────────────────────────── */}
      <motion.section className="cs-ec__gallery" {...scrollFadeUp}>
        <SectionLabel>Iterating Designs</SectionLabel>
        <picture>
          <source media="(max-width: 768px)" srcSet={`${process.env.PUBLIC_URL}/images/event_cal_wireframes_mobile.jpg`} />
          <img src={`${process.env.PUBLIC_URL}/images/event_cal_desktop.jpg`} alt="Event Calendar process" className="cs-ec__gallery-full" />
        </picture>
      </motion.section>

      {/* ── The First Prototype ────────────────────────────── */}
      <motion.section className="cs-ec__section" {...scrollFadeUp}>
        <SectionLabel>The First Prototype</SectionLabel>
        <p className="cs-ec__body">
          My first approach used three views (Week, Month, and List) controlled by a segmented tab bar. I built it out as a fully interactive Rive prototype with real motion and working transitions. It was approved internally and the motion felt right. But being able to build a polished interactive prototype quickly meant we could actually test it before committing. When we did, it became clear the tab bar was adding cognitive overhead without adding value. These were employees checking what was happening this week. The structure was more than they needed.
        </p>
      </motion.section>

      {/* ── Prototype embed ────────────────────────────────── */}
      <motion.div className="cs-ec__prototype-center" {...scrollFadeUp}>
        <div className="cs-ec__iphone-frame">
          <div style={{ position: 'absolute', top: 15, left: 15.5, width: 314, height: 680, overflow: 'hidden', borderRadius: 33 }}>
            <PrototypeEmbed />
          </div>
          <img
            src="/images/iphone.png"
            alt=""
            style={{ position: 'absolute', top: 0, left: 0, width: 345, height: 710, pointerEvents: 'none' }}
          />
        </div>
      </motion.div>

      {/* ── The Redesign ───────────────────────────────────── */}
      <motion.section className="cs-ec__section" {...scrollFadeUp}>
        <SectionLabel>The Redesign</SectionLabel>
        <p className="cs-ec__body">
          The core insight was that the calendar's job is wayfinding and the list's job is browsing. They're not three equal views. They're two complementary surfaces that should work together as one. I used Claude to pressure test the structure and iterate on the visual design in real time, building live prototypes in the browser rather than going back and forth between Figma and static mocks.
        </p>
        <p className="cs-ec__body">
          The new structure dropped the tab bar entirely in favor of a single unified view. A compact calendar strip at the top with a scrollable event list below. The week is the unit. Tapping the month label expands to a full month grid for jumping ahead. Scroll drives everything. As you scroll the list the calendar strip follows. The two surfaces feel like one thing.
        </p>
      </motion.section>

      {/* ── The Motion System ──────────────────────────────── */}
      <motion.section className="cs-ec__section cs-ec__section--wide" {...scrollFadeUp}>
        <SectionLabel>The Motion System</SectionLabel>
        <p className="cs-ec__body">
          The animation was built with Framer Motion and designed to feel calm and purposeful. Appropriate for a health platform used by a broad demographic including older users. Every animation communicates something. Nothing is decorative. All motion respects reduceMotion.
        </p>
        <div className="cs-ec__motion-table-wrap">
          <table className="cs-ec__motion-table">
            <thead>
              <tr>
                <th>Interaction</th>
                <th>Duration</th>
                <th>Easing</th>
              </tr>
            </thead>
            <tbody>
              {MOTION_ROWS.map(([interaction, duration, easing]) => (
                <tr key={interaction}>
                  <td>{interaction}</td>
                  <td>{duration}</td>
                  <td><code>{easing}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="cs-ec__motion-note">
          The active week pill duration was tuned to align with the day circle fill so the two animate in sync as you move through dates.
        </p>
      </motion.section>

      {/* ── The Scroll System ──────────────────────────────── */}
      <motion.section className="cs-ec__section" {...scrollFadeUp}>
        <SectionLabel>The Scroll System</SectionLabel>
        <p className="cs-ec__body">
          The most technically interesting piece was making scroll feel intentional rather than chaotic. Scroll is a continuous gesture but week switching and date selection are discrete state changes. Triggering animations on every scroll event created visual noise.
        </p>
        <p className="cs-ec__body">
          The solution was to decouple scroll from animation. During scroll only the day label resizes subtly. On settle the selected circle fills, the week strip updates, and the month label updates all as one composed moment. A velocity gate means the week strip slide only fires if the settled position is four or more days from the last settled position. Small adjustments don't trigger a full directional transition.
        </p>
      </motion.section>

      {/* ── The Build ──────────────────────────────────────── */}
      <motion.section className="cs-ec__section" {...scrollFadeUp}>
        <SectionLabel>The Build</SectionLabel>
        <p className="cs-ec__body">
          With the design locked I moved into Claude Code to build the working prototype in React. One of the biggest things I took away from this project was a shift in how I think about Rive and Claude Code together. Rive is the right tool for designing how something feels. Claude is the right tool for designing efficiently, iterating quickly, and building it out. Using them together and knowing where each one fits makes both faster.
        </p>
      </motion.section>

      {/* ── Outcome ────────────────────────────────────────── */}
      <motion.section className="cs-ec__section" {...scrollFadeUp}>
        <SectionLabel>Outcome</SectionLabel>
        <p className="cs-ec__body">
          The interaction model and motion system are production ready. The remaining work is engineering integration. The project wasn't finished before my internship ended but what mattered most was what the process taught me. When the cost of testing design decisions drops low enough you test more, iterate faster, and arrive at better answers.
        </p>
      </motion.section>

      {/* ── Prev / Next ─────────────────────────────────────── */}
      <motion.nav className="showcase__project-nav" {...scrollFadeUp}>
        <div className="showcase__project-nav-prev">
          {prev && <NavScrollLink to={`/work/${prev.slug}`} name={prev.name} direction="left" />}
        </div>
        <div className="showcase__project-nav-next">
          {next && <NavScrollLink to={`/work/${next.slug}`} name={next.name} direction="right" />}
        </div>
      </motion.nav>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section className="showcase__cta">
        <LazyCTAWords href="mailto:jonahfreedmandesigns@gmail.com" className="showcase__cta-link" text="Let's Work Together" />
      </section>

    </motion.main>
  );
}
