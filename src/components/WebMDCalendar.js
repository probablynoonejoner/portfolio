import { useState, useRef, useCallback, useEffect, useLayoutEffect, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactComponent as NavBar } from '../assets/nav_bar.svg';
import './WebMDCalendar.css';

// ── Constants ──────────────────────────────────────────────────────────────

const MONTH_NAMES = ['January','February','March','April','May','June',
                     'July','August','September','October','November','December'];
const DAY_LABELS  = ['S','M','T','W','T','F','S'];

// ── Event data (Feb 1 – Apr 30, 2026) ─────────────────────────────────────
// Past events (before March 23): pip/info faded, CTA non-interactive.
// missed:true on the Mar 17 coach call marks it with a MISSED badge.

const EVENTS_DATA = {
  // ── Feb week 1 ──────────────────────────────────────────────────────────
  '2026-2-3':  [{ id: 1,  title: 'Weekly Coach Call',          time: '12:00–12:30 pm', pip: 'blue',         cta: 'View'      }],
  '2026-2-6':  [{ id: 2,  title: 'Friday Run Club',            time: '7:00–8:00 am',   pip: 'coral',        cta: 'View'      }],
  // ── Feb week 2 ──────────────────────────────────────────────────────────
  '2026-2-10': [{ id: 3,  title: 'Weekly Coach Call',          time: '12:00–12:30 pm', pip: 'blue',         cta: 'View'      }],
  '2026-2-12': [{ id: 4,  title: 'Ergonomics Webinar',         time: '1:00–2:00 pm',   pip: 'coral-outline',cta: 'View'      }],
  // ── Feb week 3 ──────────────────────────────────────────────────────────
  '2026-2-17': [{ id: 5,  title: 'Weekly Coach Call',          time: '12:00–12:30 pm', pip: 'blue',         cta: 'View'      }],
  '2026-2-20': [{ id: 6,  title: 'Friday Run Club',            time: '7:00–8:00 am',   pip: 'coral',        cta: 'View'      }],
  // ── Feb week 4 ──────────────────────────────────────────────────────────
  '2026-2-24': [{ id: 7,  title: 'Weekly Coach Call',          time: '12:00–12:30 pm', pip: 'blue',         cta: 'View'      }],
  '2026-2-25': [{ id: 8,  title: 'Nutrition Lunch & Learn',   time: '12:00–1:00 pm',  pip: 'coral',        cta: 'View'      }],
  // ── Mar week 1 ──────────────────────────────────────────────────────────
  '2026-3-3':  [{ id: 9,  title: 'Weekly Coach Call',          time: '12:00–12:30 pm', pip: 'blue',         cta: 'View'      }],
  '2026-3-6':  [{ id: 10, title: 'Friday Run Club',            time: '7:00–8:00 am',   pip: 'coral',        cta: 'View'      }],
  // ── Mar week 2 ──────────────────────────────────────────────────────────
  '2026-3-10': [{ id: 11, title: 'Weekly Coach Call',          time: '12:00–12:30 pm', pip: 'blue',         cta: 'View'      }],
  '2026-3-12': [{ id: 12, title: 'Mental Health Check-in',    time: '3:00–3:30 pm',   pip: 'coral-outline',cta: 'View'      }],
  // ── Mar week 3 — missed coach call ──────────────────────────────────────
  '2026-3-17': [{ id: 13, title: 'Weekly Coach Call',          time: '12:00–12:30 pm', pip: 'blue',         cta: 'Reschedule', missed: true }],
  '2026-3-20': [{ id: 14, title: 'Friday Run Club',            time: '7:00–8:00 am',   pip: 'coral',        cta: 'View'      }],
  // ── Mar week 4 — current week ────────────────────────────────────────────
  '2026-3-24': [{ id: 15, title: 'Weekly Coach Call',          time: '12:00–12:30 pm', pip: 'blue',         cta: 'Join'      }],
  '2026-3-26': [{ id: 16, title: 'Onsite Flu Clinic',          time: '9:00 am–3:00 pm',pip: 'coral',        cta: 'Sign up',  new: true }],
  '2026-3-27': [{ id: 17, title: 'Friday Run Club',            time: '7:00–8:00 am',   pip: 'coral',        cta: 'RSVP'     }],
  // ── Mar week 5 ──────────────────────────────────────────────────────────
  '2026-3-31': [{ id: 18, title: 'Weekly Coach Call',          time: '12:00–12:30 pm', pip: 'blue',         cta: 'Join'      }],
  // ── Apr week 1 ──────────────────────────────────────────────────────────
  '2026-4-3':  [{ id: 19, title: 'Friday Run Club',            time: '7:00–8:00 am',   pip: 'coral',        cta: 'RSVP'     }],
  // ── Apr week 2 ──────────────────────────────────────────────────────────
  '2026-4-7':  [{ id: 20, title: 'Weekly Coach Call',          time: '12:00–12:30 pm', pip: 'blue',         cta: 'Join'      }],
  '2026-4-9':  [{ id: 21, title: 'Heart Health Screening',     time: '10:00–11:00 am', pip: 'coral-outline',cta: 'Sign up'   }],
  '2026-4-10': [{ id: 22, title: 'Friday Run Club',            time: '7:00–8:00 am',   pip: 'coral',        cta: 'RSVP'     }],
  // ── Apr week 3 ──────────────────────────────────────────────────────────
  '2026-4-14': [{ id: 23, title: 'Weekly Coach Call',          time: '12:00–12:30 pm', pip: 'blue',         cta: 'Join'      }],
  '2026-4-16': [{ id: 24, title: 'Stress Management Webinar', time: '2:00–3:00 pm',   pip: 'coral-outline',cta: 'RSVP'     }],
  '2026-4-17': [{ id: 25, title: 'Friday Run Club',            time: '7:00–8:00 am',   pip: 'coral',        cta: 'RSVP'     }],
  // ── Apr week 4 ──────────────────────────────────────────────────────────
  '2026-4-21': [{ id: 26, title: 'Weekly Coach Call',          time: '12:00–12:30 pm', pip: 'blue',         cta: 'Join'      }],
  '2026-4-22': [{ id: 27, title: 'Step Challenge Kickoff',    time: 'All day',         pip: 'coral',        cta: 'Sign up',  new: true }],
  '2026-4-24': [{ id: 28, title: 'Friday Run Club',            time: '7:00–8:00 am',   pip: 'coral',        cta: 'RSVP'     }],
  // ── Apr week 5 ──────────────────────────────────────────────────────────
  '2026-4-28': [{ id: 29, title: 'Weekly Coach Call',          time: '12:00–12:30 pm', pip: 'blue',         cta: 'Join'      }],
  '2026-4-30': [{ id: 30, title: 'Q2 Wellness Review',         time: '11:00–11:30 am', pip: 'coral-outline',cta: 'Sign up'   }],
};

// ── Helpers ────────────────────────────────────────────────────────────────

function getWeekStart(date) {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date, n) {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth()    === b.getMonth()    &&
         a.getDate()     === b.getDate();
}

function dateKey(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function parseKey(key) {
  const [y, m, d] = key.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setHours(0, 0, 0, 0);
  return date;
}

function formatDayLabel(date) {
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

function getMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const lastDay  = new Date(year, month + 1, 0);
  const start    = new Date(firstDay);
  start.setDate(start.getDate() - start.getDay());

  const weeks = [];
  let cur = new Date(start);
  while (cur <= lastDay || weeks.length < 4) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    weeks.push(week);
    if (cur > lastDay && cur.getDay() === 0) break;
  }
  return weeks;
}

// ── Fixed date range ───────────────────────────────────────────────────────

const RANGE_START    = new Date(2026, 1, 1,  0, 0, 0, 0); // Feb  1, 2026
const RANGE_END      = new Date(2026, 3, 30, 0, 0, 0, 0); // Apr 30, 2026
const RANGE_START_MS = RANGE_START.getTime();
const RANGE_END_MS   = RANGE_END.getTime();

// All days in the range, generated once at module load.
const LIST_DAYS = Array.from(
  { length: 89 }, // Feb 1 – Apr 30 inclusive = 89 days
  (_, i) => {
    const d = new Date(RANGE_START);
    d.setDate(d.getDate() + i);
    return d;
  }
);

const ROW_HEIGHT = 48; // 4px top + 6px dot + 28px circle + 6px dot + 4px bottom
const ROW_STEP   = 50; // ROW_HEIGHT + 2px gap between rows

const SETTLE_DELAY           = 150;  // ms after last scroll event before "settle" fires
const MIN_DAYS_FOR_WEEK_SLIDE = 4;   // settled date must be this many days away for the strip to slide
const SCROLL_FOCUS_Y         = 50;   // px from container top — a section stays active until its bottom clears this line
const EMPTY_DAY_FOCUS_EXT    = 32;   // extra px added to empty-day effective bottom so short sections can own the focus line

// cubic-bezier(0.2, 0, 0, 1) solver — matches the swipe/expand transition easing.
// x(t) = 0.6t - 1.2t² + 1.6t³  →  solved for t via Newton's method  →  y(t) = 3t² - 2t³
function scrollEase(x) {
  let t = x;
  for (let i = 0; i < 8; i++) {
    const fx  = 0.6*t - 1.2*t*t + 1.6*t*t*t - x;
    const dfx = 0.6 - 2.4*t + 4.8*t*t;
    t -= fx / (dfx || 1e-6);
  }
  return 3*t*t - 2*t*t*t;
}

// ── Sub-components ─────────────────────────────────────────────────────────

function DotRow({ date }) {
  const hasDot = !!EVENTS_DATA[dateKey(date)];
  return (
    <div className="wmd-dot-row">
      {hasDot && <div className="wmd-dot" />}
    </div>
  );
}

function DayCircle({ date, selectedDate, today, dimmed = false }) {
  const isToday    = sameDay(date, today);
  const isSelected = sameDay(date, selectedDate);

  // The background circle scales in/out independently of the number text.
  // dimmed: true for other-month days in the month grid.
  const circleBg  = isToday ? '#3557FF' : '#68548E';
  const textColor = isSelected ? '#FFFFFF'
                  : isToday   ? '#3557FF'
                  : dimmed    ? '#ccc'
                  : '#000000';

  return (
    <div className="wmd-day-circle">
      <motion.div
        initial={false}
        animate={{ scale: isSelected ? 1 : 0 }}
        transition={{ duration: 0.1, ease: [0.2, 0, 0, 1] }}
        style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: circleBg }}
      />
      <span style={{ position: 'relative', zIndex: 1, color: textColor, transition: 'color 0.1s ease-out' }}>
        {date.getDate()}
      </span>
    </div>
  );
}

function MonthGrid({ viewDate, selectedDate, today, activeWeekStart, onSelectDay, onSelectWeek }) {
  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const grid  = useMemo(() => getMonthGrid(year, month), [year, month]);

  const activeRowIndex = grid.findIndex(week => sameDay(getWeekStart(week[0]), activeWeekStart));

  return (
    <div className="wmd-month-grid">
      {/* Sliding active-week pill — animates y between rows */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {activeRowIndex >= 0 && (
          <motion.div
            initial={false}
            animate={{ y: activeRowIndex * ROW_STEP }}
            transition={{ duration: 0.3, ease: [0, 0.44, 0, 1] }}
            style={{
              position: 'absolute',
              left: 0, right: 0,
              height: ROW_HEIGHT,
              borderRadius: 30,
              background: 'rgba(81, 91, 146, 0.10)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
        )}
        {grid.map((week, wi) => {
          const ws = getWeekStart(week[0]);
          return (
            <button
              key={wi}
              className="wmd-month-week-row"
              style={{ position: 'relative', zIndex: 1 }}
              onClick={() => onSelectWeek(ws)}
            >
              {week.map((day, di) => {
                const isOtherMonth = day.getMonth() !== month;
                return (
                  <div
                    key={di}
                    className="wmd-month-cell"
                    onClick={(e) => { e.stopPropagation(); onSelectDay(day); }}
                  >
                    <DotRow date={day} />
                    <DayCircle date={day} selectedDate={selectedDate} today={today} dimmed={isOtherMonth} />
                    <div className="wmd-dot-row" />
                  </div>
                );
              })}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CTAButton({ label, disabled }) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const filled = (pressed || hovered) && !disabled;
  return (
    <button
      className="wmd-cta-btn"
      disabled={disabled}
      style={{
        borderRadius: '20px',
        border: '2px solid #3557FF',
        background: filled ? '#3557FF' : 'transparent',
        color: filled ? '#fff' : '#3557FF',
        padding: '4px 10px',
        fontSize: '12px',
        fontWeight: 700,
        fontFamily: 'Lato, sans-serif',
        cursor: disabled ? 'default' : 'pointer',
        whiteSpace: 'nowrap',
        lineHeight: 1.2,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
      onMouseEnter={() => { if (!disabled) setHovered(true); }}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => { if (!disabled) setPressed(true); }}
      onMouseUp={() => setPressed(false)}
      onTouchStart={() => { if (!disabled) setPressed(true); }}
      onTouchEnd={() => setPressed(false)}
    >
      {label}
    </button>
  );
}

function EventRow({ event, isLast, isPast }) {
  return (
    <>
      <div className="wmd-event-row">
        <div className="wmd-event-info">
          <span className="wmd-event-title">{event.title}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span className="wmd-event-time">{event.time}</span>
            {event.missed && (
              <span style={{ fontSize: 9, fontWeight: 700, color: '#E05050', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                Missed
              </span>
            )}
            {event.new && (
              <span style={{ fontSize: 9, fontWeight: 700, color: '#3557FF', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                New
              </span>
            )}
          </div>
        </div>
        <CTAButton label={event.cta} disabled={isPast} />
      </div>
      {!isLast && <div className="wmd-event-divider" />}
    </>
  );
}

const DaySection = memo(function DaySection({ day, today, isActive, dayKey, registerRef }) {
  const events  = EVENTS_DATA[dayKey];
  const isToday = sameDay(day, today);
  const isPast  = day.getTime() < today.getTime();
  const isEmpty = !events || events.length === 0;

  const labelColor = isToday ? '#3557FF'
                   : isEmpty ? '#C0BFCF'
                   : '#555555';

  // Stable ref callback — only fires on mount/unmount, not on every parent render.
  const setRef = useCallback((el) => registerRef(dayKey, el), [registerRef, dayKey]);

  return (
    <div className="wmd-day-section" data-date={dayKey} ref={setRef}>
      {isEmpty ? (
        <div className="wmd-empty-day">
          <motion.span
            className="wmd-day-label"
            animate={{ fontSize: isActive ? '13px' : '11px', fontWeight: isActive ? 700 : 400 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            style={{ color: labelColor }}
          >
            {formatDayLabel(day)}
          </motion.span>
          <div className="wmd-empty-line" />
        </div>
      ) : (
        <>
          <motion.div
            className="wmd-day-label-row"
            animate={{ fontSize: isActive ? '13px' : '11px', fontWeight: isActive ? 700 : 400 }}
            transition={{ duration: 0.2, ease: [0.2, 0, 0, 1] }}
            style={{ color: labelColor }}
          >
            {formatDayLabel(day)}
          </motion.div>
          <div className="wmd-event-card" style={isPast ? { opacity: 0.45 } : undefined}>
            {events.map((ev, i) => (
              <EventRow key={ev.id} event={ev} isLast={i === events.length - 1} isPast={isPast} />
            ))}
          </div>
        </>
      )}
    </div>
  );
});


const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : dir < 0 ? '-100%' : 0 }),
  center: { x: 0 },
  exit:  (dir) => ({ x: dir > 0 ? '-100%' : dir < 0 ? '100%' : 0 }),
};
const monthTextVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : dir < 0 ? '-100%' : 0, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir) => ({ x: dir > 0 ? '-100%' : dir < 0 ? '100%' : 0, opacity: 0 }),
};
const slideTrans = { duration: 0.5, ease: [0.2, 0, 0, 1] };
const monthTextTrans = {
  ...slideTrans,
  opacity: { duration: 0.18, ease: [0.2, 0, 0, 1] },
};

// Collapsed week row — background pill is static, only the day cells slide.
function WeekRowSlide({ weekDays, selectedDate, today, onSelectDay, navDirection }) {
  return (
    <div style={{ padding: '0 10px' }}>
      <div style={{
        background: 'rgba(81, 91, 146, 0.10)',
        borderRadius: '30px',
        padding: '4px 2px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <AnimatePresence initial={false} custom={navDirection} mode="popLayout">
          <motion.div
            key={weekDays[0]?.getTime()}
            custom={navDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTrans}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', width: '100%' }}
          >
            {weekDays.map((day, i) => (
              <button key={i} className="wmd-week-cell" onClick={() => onSelectDay(day)}>
                <DotRow date={day} />
                <DayCircle date={day} selectedDate={selectedDate} today={today} />
                <div className="wmd-dot-row" />
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function WebMDCalendar() {
  const today = useMemo(() => {
    const d = new Date(2026, 2, 23); // March 23 2026
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [viewDate,        setViewDate]        = useState(today);
  const [selectedDate,    setSelectedDate]    = useState(today);
  const [activeWeekStart, setActiveWeekStart] = useState(() => getWeekStart(today));
  const [expanded,        setExpanded]        = useState(false);
  const [activeDateKey,   setActiveDateKey]   = useState(() => dateKey(today));
  const [isAnimatingToggle, setIsAnimatingToggle] = useState(false);
  const [navDirection,     setNavDirection]     = useState(0); // 1=forward, -1=back

  const isScrolling        = useRef(false);
  const skipNextSettle     = useRef(0);
  const rafPending         = useRef(null);
  const activeDateKeyRef   = useRef(dateKey(today));
  const activeWeekStartRef = useRef(getWeekStart(today)); // mirrors activeWeekStart for settle handler
  const lastSettledDateRef = useRef(today);               // last position confirmed by settle/tap/nav
  const velocityRef        = useRef(0);
  const lastScrollTopRef   = useRef(0);
  const lastScrollTimeRef  = useRef(0);
  const scrollSettleTimer  = useRef(null);
  const scrollRef          = useRef(null);
  const scrollRafRef       = useRef(null);
  const scrollFromRef      = useRef(today); // tracks last scroll destination for fade threshold
  const dayLabelRefs       = useRef({});
  const swipeState         = useRef({ startX: 0, startY: 0, active: false });
  const monthSwipeState    = useRef({ startX: 0, startY: 0, active: false });
  const headerRef          = useRef(null);

  // Stable ref registration callback — passed to every DaySection so React.memo
  // can hold: same function reference across all parent re-renders.
  const registerRef = useCallback((key, el) => {
    dayLabelRefs.current[key] = el;
  }, []);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(activeWeekStart, i)),
    [activeWeekStart]
  );

  // Which row of the current month grid contains the active week.
  // Used to anchor the active row during the expand/collapse animation.
  const activeWeekIndex = useMemo(() => {
    const grid = getMonthGrid(viewDate.getFullYear(), viewDate.getMonth());
    const idx = grid.findIndex(week => sameDay(getWeekStart(week[0]), activeWeekStart));
    return Math.max(0, idx);
  }, [viewDate, activeWeekStart]);

  // Exact pixel height of the expanded month grid — avoids animating to 'auto'
  // which causes a 1-frame snap when Framer Motion sets the style at animation end.
  // Formula: n rows × 48px + (n-1) × 2px gap + 4px bottom padding on .wmd-month-grid
  const expandedHeight = useMemo(() => {
    const grid = getMonthGrid(viewDate.getFullYear(), viewDate.getMonth());
    return grid.length * ROW_HEIGHT + (grid.length - 1) * 2 + 4;
  }, [viewDate]);

  // True while the month grid needs to be rendered (during toggle animation and while expanded).
  const showMonthGrid = expanded || isAnimatingToggle;

  // Keep refs current so rAF / setTimeout callbacks never read stale state.
  useLayoutEffect(() => {
    activeDateKeyRef.current = activeDateKey;
    activeWeekStartRef.current = activeWeekStart;
  });

  // ── Scroll list to day ────────────────────────────────────────────────────
  const scrollToDay = useCallback((day, instant = false) => {
    const key       = dateKey(day);
    const el        = dayLabelRefs.current[key];
    const container = scrollRef.current;
    if (!el || !container) return;
    // offsetTop is in local CSS pixel space — unaffected by any CSS transforms on ancestors.
    const targetScroll  = el.offsetTop - 8;

    if (scrollRafRef.current) { cancelAnimationFrame(scrollRafRef.current); scrollRafRef.current = null; }

    // Compute diff against last scroll destination (not lastSettledDateRef, which is already set to `day` by callers)
    const dayDiff = Math.abs(Math.round((day.getTime() - scrollFromRef.current.getTime()) / 86400000));
    scrollFromRef.current = day;

    isScrolling.current = true;
    if (instant) {
      skipNextSettle.current += 1;
      container.scrollTop = targetScroll;
      requestAnimationFrame(() => {
        isScrolling.current = false;
      });
    } else {
      const shouldFade = dayDiff >= 14;
      const startTop   = container.scrollTop;
      const delta      = targetScroll - startTop;
      const duration   = shouldFade ? 600 : 500;

      if (shouldFade) {
        container.style.transition = 'none';
        container.style.opacity = '0';
        void container.offsetHeight; // force reflow — commits opacity:0 before transition starts
        container.style.transition = 'opacity 0.6s cubic-bezier(0, 0.84, 0, 1)';
        container.style.opacity = '1';
      }

      const startTime = performance.now();
      function step(now) {
        const p = Math.min((now - startTime) / duration, 1);
        container.scrollTop = startTop + delta * scrollEase(p);
        if (p < 1) {
          scrollRafRef.current = requestAnimationFrame(step);
        } else {
          scrollRafRef.current = null;
          isScrolling.current = false;
        }
      }
      requestAnimationFrame(step);
    }
  }, []);

  // ── Scroll to today on mount (instant, no animation) ─────────────────────
  // Delayed 150ms so the flex layout inside the fixed-height container has
  // time to fully settle before we read el.offsetTop. Without the delay,
  // mobile browsers can report stale offsetTop values (layout not committed).
  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      if (!cancelled) scrollToDay(today, true);
    }, 150);
    return () => { cancelled = true; clearTimeout(timer); };
  }, []); // eslint-disable-line

  // ── Scroll settle — fires once after scroll fully decelerates ────────────────
  // Applies the velocity-gated week-slide + circle scale as a single composed moment.
  const handleScrollSettle = useCallback(() => {
    if (isScrolling.current) return; // ignore programmatic scrolls
    if (skipNextSettle.current > 0) { skipNextSettle.current -= 1; return; }
    const container = scrollRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const focusY = containerRect.top + SCROLL_FOCUS_Y;
    let latestKey = null;
    for (const day of LIST_DAYS) {
      const key  = dateKey(day);
      const el   = dayLabelRefs.current[key];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top > focusY) break;
      latestKey = key;
      const effectiveBottom = EVENTS_DATA[key] ? rect.bottom : rect.bottom + EMPTY_DAY_FOCUS_EXT;
      if (effectiveBottom > focusY) break;
    }
    if (!latestKey) return;

    const settledDate     = parseKey(latestKey);
    const settledWeekStart = getWeekStart(settledDate);
    const currentWeekStart = activeWeekStartRef.current;
    const weekChanged      = settledWeekStart.getTime() !== currentWeekStart.getTime();

    // Day distance from last intentionally-settled position — gates the strip slide.
    const dayDiff = Math.abs(
      Math.round((settledDate.getTime() - lastSettledDateRef.current.getTime()) / 86400000)
    );

    // Update the settled-position anchor for the next scroll gesture.
    lastSettledDateRef.current  = settledDate;
    activeDateKeyRef.current    = latestKey;
    activeWeekStartRef.current  = settledWeekStart;

    // Always update the day label + selected circle.
    setActiveDateKey(latestKey);
    setSelectedDate(settledDate);

    if (weekChanged) {
      // Only advance the view (month label, month grid, week strip) when the week changes.
      // Same-week month crossings (e.g. Mar 31 → Apr 1) don't re-key the grid or trigger animations.
      setViewDate(settledDate);
      if (dayDiff >= MIN_DAYS_FOR_WEEK_SLIDE) {
        setNavDirection(settledWeekStart.getTime() > currentWeekStart.getTime() ? 1 : -1);
      } else {
        setNavDirection(0);
      }
      setActiveWeekStart(settledWeekStart);
    }
  }, []);

  // ── Scroll sync ───────────────────────────────────────────────────────────
  // During active scroll: only update the day-label highlight (subtle, looks fine in motion).
  // Circle scale and week-strip slide are deferred entirely to handleScrollSettle.
  const handleScroll = useCallback(() => {
    if (rafPending.current) return;
    rafPending.current = requestAnimationFrame(() => {
      rafPending.current = null;
      const container = scrollRef.current;
      if (!container || isScrolling.current) return;

      // Velocity tracking (px/ms).
      const now = performance.now();
      const scrollTop = container.scrollTop;
      const dt = now - lastScrollTimeRef.current;
      if (dt > 0) velocityRef.current = Math.abs(scrollTop - lastScrollTopRef.current) / dt;
      lastScrollTimeRef.current = now;
      lastScrollTopRef.current  = scrollTop;

      // Day-label highlight — always allowed during scroll (subtle size/weight change).
      const containerRect = container.getBoundingClientRect();
      const focusY = containerRect.top + SCROLL_FOCUS_Y;
      let latestKey = null;
      for (const day of LIST_DAYS) {
        const key  = dateKey(day);
        const el   = dayLabelRefs.current[key];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top > focusY) break;
        latestKey = key;
        const effectiveBottom = EVENTS_DATA[key] ? rect.bottom : rect.bottom + EMPTY_DAY_FOCUS_EXT;
        if (effectiveBottom > focusY) break;
      }
      if (latestKey && latestKey !== activeDateKeyRef.current) {
        activeDateKeyRef.current = latestKey;
        setActiveDateKey(latestKey);
      }

      // Schedule settle. Resets on every scroll event so it only fires after full stop.
      clearTimeout(scrollSettleTimer.current);
      scrollSettleTimer.current = setTimeout(handleScrollSettle, SETTLE_DELAY);
    });
  }, [handleScrollSettle]);

  // ── Day / week selection ──────────────────────────────────────────────────
  const handleSelectDay = useCallback((day) => {
    const ws = getWeekStart(day);
    const wsMs = ws.getTime();
    const curMs = activeWeekStart.getTime();
    setNavDirection(wsMs > curMs ? 1 : wsMs < curMs ? -1 : 0);
    setSelectedDate(day);
    setActiveDateKey(dateKey(day));
    setViewDate(day);
    setActiveWeekStart(ws);
    lastSettledDateRef.current = day;
    scrollToDay(day);
  }, [scrollToDay, activeWeekStart]);

  const handleSelectWeek = useCallback((ws) => {
    setNavDirection(ws.getTime() > activeWeekStart.getTime() ? 1 : ws.getTime() < activeWeekStart.getTime() ? -1 : 0);
    setActiveWeekStart(ws);
    setViewDate(ws);
    setSelectedDate(ws);
    setActiveDateKey(dateKey(ws));
    lastSettledDateRef.current = ws;
    scrollToDay(ws);
  }, [scrollToDay, activeWeekStart]);

  // At-bounds flags — drive disabled arrow state and guard navigation.
  const atStart = activeWeekStart.getTime() <= RANGE_START_MS;
  const atEnd   = addDays(activeWeekStart, 7).getTime() > RANGE_END_MS;

  // Month-view bounds (Feb = index 1, Apr = index 3 within our range).
  const atMonthStart  = viewDate.getMonth() === 1;
  const atMonthEnd    = viewDate.getMonth() === 3;

  // Context-aware disabled state: month browsing when expanded, week nav when collapsed.
  const leftDisabled  = expanded ? atMonthStart : atStart;
  const rightDisabled = expanded ? atMonthEnd   : atEnd;

  // ── Navigation ────────────────────────────────────────────────────────────
  const navigateBack = useCallback(() => {
    setNavDirection(-1);
    if (expanded) {
      setViewDate(d => {
        const prev = new Date(d.getFullYear(), d.getMonth() - 1, 1);
        return prev < RANGE_START ? d : prev;
      });
    } else if (!atStart) {
      const prev = addDays(activeWeekStart, -7);
      setActiveWeekStart(prev);
      setViewDate(prev);
      setSelectedDate(prev);
      setActiveDateKey(dateKey(prev));
      lastSettledDateRef.current = prev;
      scrollToDay(prev);
    }
  }, [expanded, atStart, activeWeekStart, scrollToDay]);

  const navigateForward = useCallback(() => {
    setNavDirection(1);
    if (expanded) {
      setViewDate(d => {
        const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
        return next > RANGE_END ? d : next;
      });
    } else if (!atEnd) {
      const next = addDays(activeWeekStart, 7);
      setActiveWeekStart(next);
      setViewDate(next);
      setSelectedDate(next);
      setActiveDateKey(dateKey(next));
      lastSettledDateRef.current = next;
      scrollToDay(next);
    }
  }, [expanded, atEnd, activeWeekStart, scrollToDay]);

  // ── Swipe (week strip) ────────────────────────────────────────────────────
  const swipeHandlers = useMemo(() => ({
    onTouchStart: (e) => {
      swipeState.current = { startX: e.touches[0].clientX, startY: e.touches[0].clientY, active: true };
    },
    onTouchEnd: (e) => {
      if (!swipeState.current.active) return;
      const dx = e.changedTouches[0].clientX - swipeState.current.startX;
      const dy = e.changedTouches[0].clientY - swipeState.current.startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        dx < 0 ? navigateForward() : navigateBack();
      }
      swipeState.current.active = false;
    },
    onMouseDown: (e) => {
      swipeState.current = { startX: e.clientX, startY: e.clientY, active: true };
    },
    onMouseUp: (e) => {
      if (!swipeState.current.active) return;
      const dx = e.clientX - swipeState.current.startX;
      const dy = e.clientY - swipeState.current.startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        dx < 0 ? navigateForward() : navigateBack();
      }
      swipeState.current.active = false;
    },
  }), [navigateForward, navigateBack]);

  // ── Month grid swipe — bounded to Feb–Apr ────────────────────────────────
  const monthSwipeHandlers = useMemo(() => {
    const clampMonth = (d, delta) => {
      const next = new Date(d.getFullYear(), d.getMonth() + delta, 1);
      if (next < RANGE_START || next > RANGE_END) return d;
      return next;
    };
    return {
      onTouchStart: (e) => {
        monthSwipeState.current = { startX: e.touches[0].clientX, startY: e.touches[0].clientY, active: true };
      },
      onTouchEnd: (e) => {
        if (!monthSwipeState.current.active) return;
        const dx = e.changedTouches[0].clientX - monthSwipeState.current.startX;
        const dy = e.changedTouches[0].clientY - monthSwipeState.current.startY;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
          const delta = dx < 0 ? 1 : -1;
          setNavDirection(delta);
          setViewDate(d => clampMonth(d, delta));
        }
        monthSwipeState.current.active = false;
      },
      onMouseDown: (e) => {
        monthSwipeState.current = { startX: e.clientX, startY: e.clientY, active: true };
      },
      onMouseUp: (e) => {
        if (!monthSwipeState.current.active) return;
        const dx = e.clientX - monthSwipeState.current.startX;
        const dy = e.clientY - monthSwipeState.current.startY;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
          const delta = dx < 0 ? 1 : -1;
          setNavDirection(delta);
          setViewDate(d => clampMonth(d, delta));
        }
        monthSwipeState.current.active = false;
      },
    };
  }, []);

  // ── Block Lenis from seeing wheel events on the event list ────────────────
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.stopPropagation();
      e.preventDefault();
      el.scrollBy({ top: e.deltaY * 0.6 });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  // ── Prevent horizontal swipes on the header from scrolling the page ───────
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    let startX = 0;
    let startY = 0;
    const onTouchStart = (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onTouchMove = (e) => {
      const dx = Math.abs(e.touches[0].clientX - startX);
      const dy = Math.abs(e.touches[0].clientY - startY);
      if (dx > dy) e.preventDefault();
    };
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const monthLabel = `${MONTH_NAMES[viewDate.getMonth()]} ${viewDate.getFullYear()}`;

  return (
    <div className="wmd-root">

      {/* Status bar */}
      <div className="wmd-status-bar">
        <span className="wmd-status-time">9:41</span>
        <div className="wmd-status-icons">
          <svg width="16" height="12" viewBox="0 0 16 12"><rect x="0" y="9" width="3" height="3" rx="1" fill="#000"/><rect x="4.5" y="6" width="3" height="6" rx="1" fill="#000"/><rect x="9" y="3" width="3" height="9" rx="1" fill="#000"/><rect x="13" y="0" width="3" height="12" rx="1" fill="#000" opacity="0.2"/></svg>
          <svg width="16" height="12" viewBox="0 0 16 12" style={{margin:'0 4px'}}><rect x="1" y="3" width="14" height="8" rx="2" stroke="#000" strokeWidth="1.2" fill="none"/><rect x="2" y="4.5" width="8" height="5" rx="1" fill="#000"/><rect x="15" y="5" width="1.5" height="4" rx="0.75" fill="#000"/></svg>
        </div>
      </div>

      {/* Sticky header */}
      <div className="wmd-header" ref={headerRef}>

        {/* Title */}
        <div className="wmd-title">My Events</div>

        {/* Month nav */}
        <div className="wmd-month-nav">
          <motion.button
            className="wmd-arrow-btn"
            style={{
              opacity: leftDisabled ? 0.25 : 1,
              cursor: leftDisabled ? 'default' : 'pointer',
              pointerEvents: leftDisabled ? 'none' : 'auto',
              transition: 'opacity 0.2s',
            }}
            onClick={navigateBack}
            whileTap={{ scale: 0.75 }}
            transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
          >
            <svg width="10" height="16" viewBox="0 0 6 10" fill="none">
              <path d="M5 1L1 5L5 9" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          <button className="wmd-month-label-btn" onClick={() => { setIsAnimatingToggle(true); setExpanded(e => !e); }}>
            <div style={{ overflow: 'hidden', position: 'relative', minWidth: '140px', isolation: 'isolate' }}>
              <AnimatePresence initial={false} custom={navDirection} mode="popLayout">
                <motion.span
                  key={monthLabel}
                  className="wmd-month-text"
                  custom={navDirection}
                  variants={monthTextVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={monthTextTrans}
                  style={{ display: 'block' }}
                >
                  {monthLabel}
                </motion.span>
              </AnimatePresence>
            </div>
          </button>

          <motion.button
            className="wmd-arrow-btn"
            style={{
              opacity: rightDisabled ? 0.25 : 1,
              cursor: rightDisabled ? 'default' : 'pointer',
              pointerEvents: rightDisabled ? 'none' : 'auto',
              transition: 'opacity 0.2s',
            }}
            onClick={navigateForward}
            whileTap={{ scale: 0.75 }}
            transition={{ duration: 0.12, ease: [0.2, 0, 0, 1] }}
          >
            <svg width="10" height="16" viewBox="0 0 6 10" fill="none">
              <path d="M1 1L5 5L1 9" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>

        {/* Day-of-week labels */}
        <div className="wmd-day-row">
          {DAY_LABELS.map((l, i) => (
            <span key={i} className="wmd-day-col-label">{l}</span>
          ))}
        </div>

        {/* Week / Month — seamless expand + directional slide */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? expandedHeight : ROW_HEIGHT }}
          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
          style={{ overflow: 'hidden' }}
          onAnimationComplete={() => setIsAnimatingToggle(false)}
          onTouchStart={showMonthGrid ? monthSwipeHandlers.onTouchStart : swipeHandlers.onTouchStart}
          onTouchEnd={showMonthGrid ? monthSwipeHandlers.onTouchEnd : swipeHandlers.onTouchEnd}
          onMouseDown={showMonthGrid ? monthSwipeHandlers.onMouseDown : swipeHandlers.onMouseDown}
          onMouseUp={showMonthGrid ? monthSwipeHandlers.onMouseUp : swipeHandlers.onMouseUp}
        >
          {showMonthGrid ? (
            /* Month grid — y-anchored during toggle, x-slides when navigating months */
            <motion.div
              initial={{ y: -(activeWeekIndex * ROW_STEP) }}
              animate={{ y: expanded ? 0 : -(activeWeekIndex * ROW_STEP) }}
              transition={{ duration: isAnimatingToggle ? 0.5 : 0, ease: [0.2, 0, 0, 1] }}
            >
              <div style={{ overflow: 'hidden', position: 'relative' }}>
                <AnimatePresence initial={false} custom={navDirection} mode="popLayout">
                  <motion.div
                    key={`${viewDate.getFullYear()}-${viewDate.getMonth()}`}
                    custom={navDirection}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={slideTrans}
                    style={{ width: '100%' }}
                  >
                    <MonthGrid
                      viewDate={viewDate}
                      selectedDate={selectedDate}
                      today={today}
                      activeWeekStart={activeWeekStart}
                      onSelectDay={(day) => {
                        const sameMonth = day.getMonth()    === viewDate.getMonth() &&
                                          day.getFullYear() === viewDate.getFullYear();
                        if (!sameMonth) {
                          // Phase 1 — animate the selected circle immediately.
                          setSelectedDate(day);
                          setActiveDateKey(dateKey(day));
                          // Phase 2 — once circle is filled, slide to the new month.
                          setTimeout(() => {
                            const isAhead = day.getFullYear() > viewDate.getFullYear() ||
                              (day.getFullYear() === viewDate.getFullYear() && day.getMonth() > viewDate.getMonth());
                            setNavDirection(isAhead ? 1 : -1);
                            setViewDate(day);
                            setActiveWeekStart(getWeekStart(day));
                            lastSettledDateRef.current = day;
                            scrollToDay(day);
                          }, 200);
                        } else {
                          handleSelectDay(day);
                        }
                      }}
                      onSelectWeek={(ws) => handleSelectWeek(ws)}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            /* Collapsed week row — pill static, day cells slide */
            <WeekRowSlide
              weekDays={weekDays}
              selectedDate={selectedDate}
              today={today}
              onSelectDay={handleSelectDay}
              navDirection={navDirection}
            />
          )}
        </motion.div>

      </div>

      {/* Event list */}
      <div
        className="wmd-event-list"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {LIST_DAYS.map((day) => {
          const k = dateKey(day);
          return (
            <DaySection
              key={k}
              day={day}
              today={today}
              isActive={k === activeDateKey}
              dayKey={k}
              registerRef={registerRef}
            />
          );
        })}
        <div style={{ height: 16 }} />
      </div>

      {/* Bottom nav */}
      <div className="wmd-bottom-nav">
        <NavBar />
      </div>

    </div>
  );
}
