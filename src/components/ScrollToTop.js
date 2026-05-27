import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLenis } from '../context/LenisContext';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const lenisRef = useLenis();

  useEffect(() => {
    const lenis = lenisRef?.current;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      // Recalculate scroll limit after React renders the new route's content
      const rafId = requestAnimationFrame(() => lenis.resize());
      return () => cancelAnimationFrame(rafId);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenisRef]);

  return null;
}
