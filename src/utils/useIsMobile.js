import { useState, useEffect } from 'react';

// Matches phones (≤768px) AND iPads in portrait orientation (≤1024px portrait).
const MOBILE_MQ = '(max-width: 768px), (max-width: 1024px) and (orientation: portrait)';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(MOBILE_MQ).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}
