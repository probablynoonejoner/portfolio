import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRive } from '@rive-app/react-canvas';
import NavBar from '../components/NavBar';
import LazyCTAWords from '../components/LazyCTAWords';
import useIsMobile from '../utils/useIsMobile';
import { scrollFadeUp, EASE } from '../utils/animation';
import './Home.css';

const SM = 'State Machine 1';
const RIV_SRC_DESKTOP = `${process.env.PUBLIC_URL}/rive/homepageelement.riv`;
const RIV_SRC_MOBILE  = `${process.env.PUBLIC_URL}/rive/homepageelementmobile.riv`;

function HandRiveInner() {
  const { RiveComponent, rive, canvas } = useRive({
    src: `${process.env.PUBLIC_URL}/rive/home_page_hand.riv`,
    stateMachines: SM,
    autoplay: true,
    autoBind: true,
    shouldDisableRiveListeners: false,
  });
  
  useEffect(() => {
    if (!rive || !canvas) return;
    rive.resizeDrawingSurfaceToCanvas();
    const ro = new ResizeObserver(() => rive.resizeDrawingSurfaceToCanvas());
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [rive, canvas]);
  return <RiveComponent style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />;
}

function HandRive() {
  const [shouldMount, setShouldMount] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShouldMount(true), 800);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {shouldMount && <HandRiveInner />}
    </div>
  );
}

function HomepageHeroRiveInner({ src, autoHeight }) {
  const navigate = useNavigate();
  const isScrollingRef = useRef(false);
  const scrollTimerRef = useRef(null);
  const wrapRef = useRef(null);
  const [derivedHeight, setDerivedHeight] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      isScrollingRef.current = true;
      clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => { isScrollingRef.current = false; }, 150);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(scrollTimerRef.current); };
  }, []);

  const { RiveComponent, rive, canvas } = useRive({
    src,
    artboard: 'HomePageHero',
    stateMachines: SM,
    autoplay: true,
    autoBind: true,
    shouldDisableRiveListeners: false,
    isTouchScrollEnabled: true,
    onStateChange: (event) => {
      if (isScrollingRef.current) return;
      const states = event.data;
      if (!Array.isArray(states)) return;
      if (states.includes('sparkNav')) navigate('/work/spark-ai');
      if (states.includes('event')) navigate('/work/event-calendar');
      if (states.includes('content')) navigate('/work/content-journeys');
    },
  });

  useEffect(() => {
    if (!rive || !canvas) return;
    rive.resizeDrawingSurfaceToCanvas();
    const roCanvas = new ResizeObserver(() => rive.resizeDrawingSurfaceToCanvas());
    roCanvas.observe(canvas);

    if (!autoHeight || !wrapRef.current) return () => roCanvas.disconnect();
    try {
      const b = rive.bounds;
      const ratio = (b.maxY - b.minY) / (b.maxX - b.minX);
      const update = () => {
        if (wrapRef.current) setDerivedHeight(wrapRef.current.offsetWidth * ratio);
      };
      update();
      const roWrap = new ResizeObserver(update);
      roWrap.observe(wrapRef.current);
      return () => { roCanvas.disconnect(); roWrap.disconnect(); };
    } catch (_) {
      return () => roCanvas.disconnect();
    }
  }, [rive, canvas, autoHeight]);

  return (
    <div ref={wrapRef} style={{ width: '100%', height: autoHeight ? derivedHeight || '100%' : '100%' }}>
      <RiveComponent style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />
    </div>
  );
}

// Matches any iPad in portrait or landscape (769–1366px), distinct from isMobile
// which only covers portrait. Used to keep the mobile .riv file on iPad landscape.
const IPAD_MQ = '(min-width: 769px) and (max-width: 1366px)';

function useIsIPad() {
  const [val, setVal] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(IPAD_MQ).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(IPAD_MQ);
    const handler = (e) => setVal(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return val;
}

function ReelVideo() {
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const videoEl = videoRef.current;
    if (!sectionEl || !videoEl) return;

    const onCanPlay = () => {
      videoEl.play();
      setLoaded(true);
    };
    const onTimeUpdate = () => {
      if (videoEl.duration) setProgress(videoEl.currentTime / videoEl.duration);
    };

    videoEl.addEventListener('canplay', onCanPlay);
    videoEl.addEventListener('timeupdate', onTimeUpdate);

    let observer;

    const setupObserver = () => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            videoEl.src = `${process.env.PUBLIC_URL}/video/Reel%202026.mp4`;
            videoEl.load();
          }
        },
        { rootMargin: '0px' }
      );
      observer.observe(sectionEl);
    };

    const defer = () => setTimeout(setupObserver, 4000);

    if (document.readyState === 'complete') {
      const t = defer();
      return () => {
        clearTimeout(t);
        observer?.disconnect();
        videoEl.removeEventListener('canplay', onCanPlay);
        videoEl.removeEventListener('timeupdate', onTimeUpdate);
      };
    } else {
      window.addEventListener('load', defer, { once: true });
      return () => {
        window.removeEventListener('load', defer);
        observer?.disconnect();
        videoEl.removeEventListener('canplay', onCanPlay);
        videoEl.removeEventListener('timeupdate', onTimeUpdate);
      };
    }
  }, []);

  const togglePlayback = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPaused(false); }
    else { v.pause(); setPaused(true); }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const handleScrub = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const val = Number(e.target.value);
    v.currentTime = val * v.duration;
    setProgress(val);
  };

  return (
    <section ref={sectionRef} className="home__reel">
      <motion.div
        className="home__reel-wrap"
        onClick={togglePlayback}
        initial={{ opacity: 0, y: 48 }}
        animate={loaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 48 }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        <video
          ref={videoRef}
          className="home__reel-video"
          muted
          playsInline
          loop
        />
        {paused && (
          <div className="home__reel-pause-overlay">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill="rgba(0,0,0,0.4)" />
              <polygon points="19,15 19,33 36,24" fill="white" />
            </svg>
          </div>
        )}
        {loaded && (
          <div className="home__reel-controls" onClick={e => e.stopPropagation()}>
            <input
              type="range"
              className="home__reel-scrub"
              min={0}
              max={1}
              step={0.001}
              value={progress}
              onChange={handleScrub}
            />
            <button className="home__reel-mute-btn" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
              {muted ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 7H7L12 3V17L7 13H3V7Z" fill="white" />
                  <line x1="15" y1="7" x2="19" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="19" y1="7" x2="15" y2="13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 7H7L12 3V17L7 13H3V7Z" fill="white" />
                  <path d="M15 7C16.5 8.2 16.5 11.8 15 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M17.5 5C20 7.3 20 12.7 17.5 15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}

function HomepageHeroRive() {
  const isMobile = useIsMobile();
  const isIPad = useIsIPad();
  // Portrait iPad only: autoHeight derives canvas height from artboard bounds.
  const isIPadPortrait = isMobile && !window.matchMedia('(max-width: 768px)').matches;
  // Use mobile src for all phones + all iPads (portrait & landscape).
  const src = (isMobile || isIPad) ? RIV_SRC_MOBILE : RIV_SRC_DESKTOP;
  // iPad: mount immediately so the zero-height div doesn't block the IntersectionObserver.
  const [shouldMount, setShouldMount] = useState(() => isIPad);
  const ref = useRef(null);
  useEffect(() => {
    if (isIPad) { setShouldMount(true); return; }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShouldMount(true); observer.disconnect(); } },
      { rootMargin: '0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isIPad]);
  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      {shouldMount && <HomepageHeroRiveInner src={src} autoHeight={isIPadPortrait} />}
    </div>
  );
}

export default function Home() {
  const isMobile = useIsMobile();

  // Desktop: whole section fades up together
  // Mobile: Rive animates in first, text follows after
  const sectionAnim = isMobile
    ? {}
    : { initial: { opacity: 0, y: 36 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, ease: EASE, delay: 0.2 } };

  const riveAnim = isMobile
    ? { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, ease: EASE, delay: 0.15 } }
    : {};

  const textAnim = isMobile
    ? { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, ease: EASE, delay: 0.55 } }
    : {};

  return (
    <div className="page">
      <NavBar />

      <motion.main className="content home">

        {/* ── Hero ─────────────────────────────────────────── */}
        <motion.section className="home__hero" {...sectionAnim}>
          <motion.div className="home__hero-text" {...textAnim}>
            <h1 className="home__headline">
              Jonah Freedman is a Motion and Product designer who bridges how things look and how they feel.
            </h1>
            <p className="home__subhead">
              I design motion systems and interactions that help products feel clear, responsive, and human.
            </p>
          </motion.div>
          <motion.div className="home__hero-rive" {...riveAnim}>
            <HandRive />
          </motion.div>
        </motion.section>

        {/* ── Featured Projects ─────────────────────────────── */}
        <motion.section className="home__featured" {...scrollFadeUp}>
          <div className="home__featured-rive-wrap">
            <HomepageHeroRive />
          </div>
        </motion.section>

        {/* ── Reel ──────────────────────────────────────────── */}
        <ReelVideo />

        {/* ── Motion Blurb ──────────────────────────────────── */}
        <motion.section className="home__blurb" {...scrollFadeUp}>
          <p>
            I believe motion should clarify, not decorate. It should help users understand state, hierarchy, and change.
          </p>
        </motion.section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className="home__cta">
          <LazyCTAWords href="mailto:jonahfreedmandesigns@gmail.com" className="home__cta-link" text="Let's Work Together" />
        </section>

      </motion.main>

      <NavBar footer />
    </div>
  );
}
