import { useId } from 'react';
import './PhoneFrame.css';

/**
 * PhoneFrame
 *
 * An iPhone 17-style frame that wraps any content (Rive embeds, images, etc.).
 * Children render inside a clipped screen area; the SVG frame draws on top.
 *
 * The frame fill uses an SVG mask to punch out the screen area so content
 * shows through cleanly while the bezel remains filled.
 *
 * Props:
 *   children  {node}              — content for the screen area
 *   variant   {'light' | 'dark'}  — frame colorway (default: 'light')
 *   className {string}            — extra class for external positioning
 *
 * Dimensions (85% of base, equal 10px bezel on all sides):
 *   Outer frame:  334 × 700px
 *   Screen area:  314 × 680px, offset (10, 10) from outer top-left
 */

// ── Layout constants — screen width matched to 393×875 Rive artboard aspect ratio ───
const FRAME_W      = 326;
const FRAME_H      = 700;
const BEZEL        = 10;
const SCREEN_W     = FRAME_W - BEZEL * 2;   // 306
const SCREEN_H     = FRAME_H - BEZEL * 2;   // 680
const FRAME_RADIUS = 47;
const SCREEN_RADIUS = 38;
const STROKE_W     = 1.5;
const HALF_S       = STROKE_W / 2;

// Dynamic Island
const DI_W = 102;
const DI_H = 30;
const DI_X = (FRAME_W - DI_W) / 2;
const DI_Y = BEZEL + 10;

// Side button positions — 4px overhang on each side, symmetrical
const BTN_W       = 6;
const BTN_LEFT_X  = -5.5;
const BTN_RIGHT_X = FRAME_W - 0.5;

// ── Variant color maps ─────────────────────────────────────────────
const VARIANTS = {
  light: {
    frameFill:    '#ffffff',
    frameStroke:  '#333333',
    islandFill:   '#111111',
    islandStroke: 'none',
    btnFill:      '#000000',
    btnStroke:    '#333333',
  },
  dark: {
    frameFill:    '#111111',
    frameStroke:  '#444444',
    islandFill:   '#222222',
    islandStroke: '#444444',
    btnFill:      '#000000',
    btnStroke:    '#444444',
  },
};

export default function PhoneFrame({ children, variant = 'light', className = '' }) {
  const uid   = useId().replace(/:/g, '');
  const maskId = `pfm-${uid}`;
  const theme  = VARIANTS[variant] ?? VARIANTS.light;

  return (
    <div className={`phone-frame ${className}`}>

      {/* ── Screen area — clips children to the display cutout ── */}
      <div className="phone-frame__screen">
        {children}
      </div>

      {/* ── SVG frame overlay — drawn above content, non-interactive ── */}
      <svg
        className="phone-frame__svg"
        viewBox={`0 0 ${FRAME_W} ${FRAME_H}`}
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        aria-hidden="true"
      >
        <defs>
          {/*
            Mask: white = keep fill, black = punch through (screen cutout).
            This lets the bezel fill show while the screen area stays transparent.
          */}
          <mask id={maskId}>
            <rect
              x={0} y={0}
              width={FRAME_W} height={FRAME_H}
              rx={FRAME_RADIUS}
              fill="white"
            />
            <rect
              x={BEZEL} y={BEZEL}
              width={SCREEN_W} height={SCREEN_H}
              rx={SCREEN_RADIUS}
              fill="black"
            />
          </mask>
        </defs>

        {/* Bezel fill — masked to exclude screen area */}
        <rect
          x={0} y={0}
          width={FRAME_W} height={FRAME_H}
          rx={FRAME_RADIUS}
          fill={theme.frameFill}
          mask={`url(#${maskId})`}
        />

        {/* Frame stroke — full outline, no fill */}
        <rect
          x={HALF_S} y={HALF_S}
          width={FRAME_W - STROKE_W} height={FRAME_H - STROKE_W}
          rx={FRAME_RADIUS}
          fill="none"
          stroke={theme.frameStroke}
          strokeWidth={STROKE_W}
        />

        {/* Dynamic Island */}
        <rect
          x={DI_X} y={DI_Y}
          width={DI_W} height={DI_H}
          rx={DI_H / 2}
          ry={DI_H / 2}
          fill={theme.islandFill}
          stroke={theme.islandStroke !== 'none' ? theme.islandStroke : undefined}
          strokeWidth={theme.islandStroke !== 'none' ? STROKE_W : undefined}
        />

        {/* Power button — right edge */}
        <rect x={BTN_RIGHT_X} y={196} width={BTN_W} height={68} rx={3} ry={3}
          fill={theme.btnFill} stroke={theme.btnStroke} strokeWidth={STROKE_W} />

        {/* Silent switch — left edge */}
        <rect x={BTN_LEFT_X} y={126} width={BTN_W} height={26} rx={3} ry={3}
          fill={theme.btnFill} stroke={theme.btnStroke} strokeWidth={STROKE_W} />

        {/* Volume up — left edge */}
        <rect x={BTN_LEFT_X} y={165} width={BTN_W} height={53} rx={3} ry={3}
          fill={theme.btnFill} stroke={theme.btnStroke} strokeWidth={STROKE_W} />

        {/* Volume down — left edge */}
        <rect x={BTN_LEFT_X} y={229} width={BTN_W} height={53} rx={3} ry={3}
          fill={theme.btnFill} stroke={theme.btnStroke} strokeWidth={STROKE_W} />
      </svg>

    </div>
  );
}
