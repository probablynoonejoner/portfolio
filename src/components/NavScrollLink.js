import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const EASE = [0, 0, 0.2, 1];
const SLIDE_DURATION = 0.5;
const HOLD = 0.7;

export default function NavScrollLink({ to, name, direction }) {
  const [hovered, setHovered] = useState(false);
  const isRight = direction === 'right';

  // Primary exits in the nav direction; secondary enters from the opposite side.
  const exitX  = isRight ? '105%' : '-105%';
  const enterX = isRight ? '-105%' : '105%';

  const primaryAnim = hovered
    ? { x: ['0%', exitX], transition: { duration: SLIDE_DURATION, ease: EASE, repeat: Infinity, repeatType: 'loop', repeatDelay: HOLD } }
    : { x: '0%', transition: { duration: 0 } };

  const secondaryAnim = hovered
    ? { x: [enterX, '0%'], transition: { duration: SLIDE_DURATION, ease: EASE, repeat: Infinity, repeatType: 'loop', repeatDelay: HOLD } }
    : { x: enterX, transition: { duration: 0 } };

  const isMobile = () => window.matchMedia('(max-width: 768px), (max-width: 1024px) and (orientation: portrait)').matches;

  return (
    <Link
      to={to}
      className="showcase__project-nav-link"
      onMouseEnter={() => { if (!isMobile()) setHovered(true); }}
      onMouseLeave={() => setHovered(false)}
    >
      {!isRight && <span className="showcase__project-nav-arrow">←</span>}

      {/* Outer span: natural width from primary (in-flow). Secondary is absolute. */}
      <span style={{ display: 'inline-flex', alignItems: 'center', overflow: 'hidden', position: 'relative', paddingBottom: '3px' }}>
        <motion.span
          className="showcase__project-nav-name"
          animate={primaryAnim}
          style={{ display: 'block', whiteSpace: 'nowrap' }}
        >
          {name}
        </motion.span>
        <motion.span
          className="showcase__project-nav-name"
          animate={secondaryAnim}
          style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap' }}
        >
          {name}
        </motion.span>
      </span>

      {isRight && <span className="showcase__project-nav-arrow">→</span>}
    </Link>
  );
}
