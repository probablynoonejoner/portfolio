import { useState } from 'react';
import { motion } from 'framer-motion';

// Manrope descenders need ~1.3 line-height to avoid clipping
const LINE_H  = 1.3;
const SCROLL  = 0.594;  // seconds — scroll phase (word exits/enters simultaneously)
const HOLD    = 0.756;  // seconds — pause at visible position between cycles
const STAGGER = 0.375;  // seconds — offset between each word starting

const EASE_OUT = [0, 0, 0.2, 1];

export default function CTAWords({ text, href, className }) {
  const words = text.split(' ');
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'inline-flex', gap: '0.28em', alignItems: 'baseline' }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', height: `${LINE_H}em` }}
        >
          {/* Two identical copies stacked — repeatType:'loop' resets from -50%→0%
              instantly between cycles, no intermediate frame */}
          <motion.span
            animate={
              hovered
                ? {
                    y: ['0%', '-50%'],
                    transition: {
                      duration: SCROLL,
                      ease: EASE_OUT,
                      repeat: Infinity,
                      repeatType: 'loop',
                      repeatDelay: HOLD,
                      delay: i * STAGGER,
                    },
                  }
                : { y: '0%', transition: { duration: 0 } }
            }
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <span style={{ display: 'block', height: `${LINE_H}em`, lineHeight: LINE_H }}>{word}</span>
            <span style={{ display: 'block', height: `${LINE_H}em`, lineHeight: LINE_H }}>{word}</span>
          </motion.span>
        </span>
      ))}
    </a>
  );
}
