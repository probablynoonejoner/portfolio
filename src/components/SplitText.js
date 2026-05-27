import { motion } from 'framer-motion';

/**
 * SplitText
 *
 * Clip-reveal character animation. Each character slides up or down into view
 * behind an overflow:hidden mask — no opacity, just positional reveal.
 *
 * All characters slide up from below (y: 100% → 0).
 *
 * Timing uses a progressive stagger — delay increases across the sequence so
 * characters land closer together at the start and spread apart toward the end.
 * Formula: delay = i * 0.04 + (i / total) * 0.06
 *
 * Props:
 *   text      {string}  — the string to split and animate
 *   tag       {string}  — HTML tag for the wrapper element (default: 'h1')
 *   className {string}  — class applied to the wrapper element
 */

const MOTION_TAGS = {
  h1:   motion.h1,
  h2:   motion.h2,
  h3:   motion.h3,
  p:    motion.p,
  span: motion.span,
};

// Container: propagates hidden/visible from parent; timing is handled per-char
const containerVariants = {
  hidden: {},
  visible: {},
};

// Progressive delay: starts tight, opens up toward the last character
function charDelay(i, total) {
  return i * 0.04 + (i / total) * 0.06;
}

export default function SplitText({ text, tag = 'h1', className = '' }) {
  const MotionTag = MOTION_TAGS[tag] ?? motion.span;
  const chars = text.split('');

  return (
    <MotionTag className={className} variants={containerVariants}>
      {chars.map((char, i) => (
        // Outer span: the mask — clips the character outside its resting position
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
          }}
        >
          {/* Inner span: animates into the visible clip area */}
          <motion.span
            custom={i}
            variants={{
              hidden:  { y: '100%' },
              visible: {
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: [0.27, 0, 0.18, 1],
                  delay: charDelay(i, chars.length),
                },
              },
            }}
            style={{ display: 'inline-block', whiteSpace: 'pre' }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
