import { useId } from 'react';
import './DesktopFrame.css';

// ── Layout constants ───────────────────────────────────────────────
const BEZEL_TOP    = 20;
const BEZEL_SIDE   = 20;
const BEZEL_BOTTOM = 20;
const SCREEN_W     = 998;                                           // 16:10 × 624
const SCREEN_H     = 624;
const FRAME_W      = SCREEN_W + BEZEL_SIDE * 2;                    // 1038
const FRAME_H      = SCREEN_H + BEZEL_TOP + BEZEL_BOTTOM;          // 664
const FRAME_RADIUS = 20;
const SCREEN_RADIUS = 14;
const STROKE_W     = 1.5;
const HALF_S       = STROKE_W / 2;

// Camera dot — centered in top bezel
const CAM_R  = 3.5;
const CAM_CX = FRAME_W / 2;
const CAM_CY = BEZEL_TOP / 2;

// Stand neck
const NECK_W = 140;
const NECK_H = 64;
const NECK_X = (FRAME_W - NECK_W) / 2;
const NECK_Y = FRAME_H;

// Stand base
const BASE_W = 740;
const BASE_H = 28;
const BASE_R = 12;
const BASE_X = (FRAME_W - BASE_W) / 2;
const BASE_Y = NECK_Y + NECK_H;

const TOTAL_H = BASE_Y + BASE_H; // 756

// ── Variant color maps ─────────────────────────────────────────────
const VARIANTS = {
  light: {
    frameFill:   '#ffffff',
    frameStroke: '#333333',
    camFill:     '#cccccc',
  },
  dark: {
    frameFill:   '#111111',
    frameStroke: '#444444',
    camFill:     '#333333',
  },
};

export default function DesktopFrame({ children, variant = 'light', className = '' }) {
  const uid    = useId().replace(/:/g, '');
  const maskId = `dfm-${uid}`;
  const theme  = VARIANTS[variant] ?? VARIANTS.light;

  return (
    <div className={`desktop-frame ${className}`}>

      {/* ── Screen area — clips children at the 16x10 frame boundary ── */}
      <div className="desktop-frame__screen">
        {children}
      </div>

      {/* ── SVG frame overlay — drawn above content, non-interactive ── */}
      <svg
        className="desktop-frame__svg"
        viewBox={`0 0 ${FRAME_W} ${TOTAL_H}`}
        width={FRAME_W}
        height={TOTAL_H}
        xmlns="http://www.w3.org/2000/svg"
        overflow="visible"
        aria-hidden="true"
        style={{ pointerEvents: 'none' }}
      >
        <defs>
          <mask id={maskId}>
            <rect x={0} y={0} width={FRAME_W} height={FRAME_H} rx={FRAME_RADIUS} fill="white" />
            <rect x={BEZEL_SIDE} y={BEZEL_TOP} width={SCREEN_W} height={SCREEN_H} rx={SCREEN_RADIUS} fill="black" />
          </mask>
        </defs>

        {/* Stand neck — rendered first so monitor draws on top */}
        <rect
          x={NECK_X} y={NECK_Y}
          width={NECK_W} height={NECK_H}
          fill={theme.frameFill}
          stroke={theme.frameStroke}
          strokeWidth={STROKE_W}
        />

        {/* Stand base */}
        <rect
          x={BASE_X} y={BASE_Y}
          width={BASE_W} height={BASE_H}
          rx={BASE_R} ry={BASE_R}
          fill={theme.frameFill}
          stroke={theme.frameStroke}
          strokeWidth={STROKE_W}
        />

        {/* Bezel fill — masked to exclude screen area */}
        <rect
          x={0} y={0}
          width={FRAME_W} height={FRAME_H}
          rx={FRAME_RADIUS}
          fill={theme.frameFill}
          mask={`url(#${maskId})`}
        />

        {/* Frame stroke — full outline */}
        <rect
          x={HALF_S} y={HALF_S}
          width={FRAME_W - STROKE_W} height={FRAME_H - STROKE_W}
          rx={FRAME_RADIUS}
          fill="none"
          stroke={theme.frameStroke}
          strokeWidth={STROKE_W}
        />

        {/* Camera dot */}
        <circle
          cx={CAM_CX} cy={CAM_CY}
          r={CAM_R}
          fill={theme.camFill}
        />
      </svg>

    </div>
  );
}
