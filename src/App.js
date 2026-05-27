import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { LenisContext } from './context/LenisContext';
import './App.css';
import Home from './pages/Home';
import Work from './pages/Work';
import Showcase from './pages/Showcase';
import About from './pages/About';
import RiveTest from './pages/RiveTest';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: false,
    });
    lenisRef.current = lenis;

    // Drive Lenis with the browser's own rAF loop.
    // We capture rafId on every frame so the last pending frame
    // can be cancelled cleanly on unmount.
    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Recalculate scroll limit when page height changes (videos / Rive embeds
    // load after Lenis initialises and make the page taller). We defer the
    // call until scrolling has settled — calling resize() mid-animation
    // resets targetScroll to the current position and locks the scroll.
    let isScrolling = false;
    let pendingResize = false;
    let scrollSettleTimer;

    lenis.on('scroll', () => {
      isScrolling = true;
      clearTimeout(scrollSettleTimer);
      scrollSettleTimer = setTimeout(() => {
        isScrolling = false;
        if (pendingResize) {
          pendingResize = false;
          lenis.resize();
        }
      }, 200);
    });

    const ro = new ResizeObserver(() => {
      if (!isScrolling) {
        lenis.resize();
      } else {
        pendingResize = true;
      }
    });
    ro.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(scrollSettleTimer);
      ro.disconnect();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef}>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:projectId" element={<Showcase />} />
        <Route path="/about" element={<About />} />
        <Route path="/rive-test" element={<RiveTest />} />
      </Routes>
    </BrowserRouter>
    </LenisContext.Provider>
  );
}

export default App;
