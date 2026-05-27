import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRive } from '@rive-app/react-canvas';
import useIsMobile from '../utils/useIsMobile';
import './NavBar.css';

function NavLogo() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const src = isMobile ? `${process.env.PUBLIC_URL}/rive/mobile_site_logo.riv` : `${process.env.PUBLIC_URL}/rive/site_logo.riv`;
  const { RiveComponent, rive } = useRive({
    src,
    stateMachines: 'State Machine 1',
    autoplay: true,
    autoBind: true,
    shouldDisableRiveListeners: false,
  });
  useEffect(() => { if (rive) rive.resizeDrawingSurfaceToCanvas(); }, [rive]);

  return (
    <div
      className="navbar__logo"
      onClick={() => navigate('/')}
      style={{ cursor: 'pointer' }}
    >
      <RiveComponent style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />
    </div>
  );
}

export default function NavBar({ footer = false }) {
  const { pathname } = useLocation();
  const prevPathRef = useRef(pathname);
  const pathChanged = prevPathRef.current !== pathname;
  prevPathRef.current = pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const didLoadRef = useRef(false);
  const skipNextRef = useRef(false);
  const menuOpenRef = useRef(false);
  useEffect(() => { menuOpenRef.current = menuOpen; }, [menuOpen]);

  const { RiveComponent: HamburgerRive, rive: hamburgerRive } = useRive({
    src: `${process.env.PUBLIC_URL}/rive/site_hamburger.riv`,
    stateMachines: 'State Machine 1',
    autoplay: true,
    autoBind: true,
    shouldDisableRiveListeners: false,
    onStateChange: () => {
      if (!didLoadRef.current) { didLoadRef.current = true; return; }
      if (skipNextRef.current) { skipNextRef.current = false; return; }
      setMenuOpen(o => !o);
    },
  });
  useEffect(() => { if (hamburgerRive) hamburgerRive.resizeDrawingSurfaceToCanvas(); }, [hamburgerRive]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    const handleHide = () => {
      if (document.visibilityState !== 'hidden') return;
      if (!menuOpenRef.current) return;
      setMenuOpen(false);
      if (hamburgerRive) {
        const inputs = hamburgerRive.stateMachineInputs('State Machine 1');
        const trigger = inputs?.find(i => i.name === 'click');
        if (trigger) { skipNextRef.current = true; trigger.fire(); }
      }
    };
    document.addEventListener('visibilitychange', handleHide);
    return () => document.removeEventListener('visibilitychange', handleHide);
  }, [hamburgerRive]);

  const linkClass = (isActive) =>
    `navbar__link${isActive ? ' navbar__link--active' : ''}${isActive && pathChanged ? ' navbar__link--entering' : ''}`;

  return (
    <>
      <nav className={`navbar${footer ? ' navbar--footer' : ''}`}>
        <NavLogo />
        <div className="navbar__links">
          <NavLink to="/" end data-text="Home" className={({ isActive }) => linkClass(isActive)}>
            Home
          </NavLink>
          <NavLink to="/work" data-text="Work" className={({ isActive }) => linkClass(isActive)}>
            Work
          </NavLink>
          <NavLink to="/about" data-text="About" className={({ isActive }) => linkClass(isActive)}>
            About
          </NavLink>
        </div>
        <button
          className="navbar__hamburger"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          <div style={{ width: 40, height: 40 }}>
            <HamburgerRive style={{ width: '100%', height: '100%', pointerEvents: 'auto' }} />
          </div>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="navbar__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav className="navbar__overlay-links">
              <NavLink to="/" end onClick={() => setMenuOpen(false)}
                className={({ isActive }) => `navbar__overlay-link${isActive ? ' navbar__overlay-link--active' : ''}`}>
                Home
              </NavLink>
              <NavLink to="/work" onClick={() => setMenuOpen(false)}
                className={({ isActive }) => `navbar__overlay-link${isActive ? ' navbar__overlay-link--active' : ''}`}>
                Work
              </NavLink>
              <NavLink to="/about" onClick={() => setMenuOpen(false)}
                className={({ isActive }) => `navbar__overlay-link${isActive ? ' navbar__overlay-link--active' : ''}`}>
                About
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
