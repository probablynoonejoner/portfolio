// Shared animation config — used on every page for consistency

export const EASE = [0.25, 0.1, 0.15, 1];
export const DURATION = 0.7;

// Single element: opacity 0→1, y 24→0
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE },
  },
};

// Container that staggers its children
export const staggerContainer = (delay = 0.05, stagger = 0.08) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay,
    },
  },
});

// ── Scroll-triggered animations ────────────────────────────────────

const SCROLL_EASE = [0.27, 0, 0.18, 1];

// Spread onto any motion element for scroll-triggered fade-up
export const scrollFadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.75, ease: SCROLL_EASE, delay: 0.15 },
};

// Simplified — animates the whole block as one unit, no stagger
export const scrollStaggerParent = { ...scrollFadeUp };

// No-op — parent handles the animation
export const scrollStaggerChild = {};
