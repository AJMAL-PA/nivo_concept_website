import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global page-transition overlay.
 * Sits at the top of the app (in App.jsx) and listens to route changes.
 * Fades in briefly on navigation, then fades out once the new page is ready.
 * This eliminates the jarring white-screen flash between pages.
 */
const Preloader = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const hideTimer = useRef(null);
  const fadeTimer = useRef(null);
  const isFirst = useRef(true);

  useEffect(() => {
    // Skip the very first mount (page load is handled by initial render)
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    // Clear any pending timers from a previous navigation
    clearTimeout(hideTimer.current);
    clearTimeout(fadeTimer.current);

    // Show the overlay immediately on route change
    setFading(false);
    setVisible(true);

    // After a short delay, start fading out
    hideTimer.current = setTimeout(() => {
      setFading(true);
      // After the fade transition completes, fully hide
      fadeTimer.current = setTimeout(() => {
        setVisible(false);
        setFading(false);
      }, 400);
    }, 350);

    return () => {
      clearTimeout(hideTimer.current);
      clearTimeout(fadeTimer.current);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 20000,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'var(--bg-dark-1, #111)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      {/* Spinner */}
      <div className="lds-roller">
        <div /><div /><div /><div />
        <div /><div /><div /><div />
      </div>
    </div>
  );
};

export default Preloader;
