import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Global page-transition overlay and initial page preloader.
 * Sits at the top of the app (in App.jsx).
 * Shows on first page load/refresh for a premium introductory animation,
 * and fades in briefly on route changes to prevent jarring screen flashes.
 */
const Preloader = () => {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(true); // Start visible for initial load/refresh
  const [fading, setFading] = useState(false);
  const hideTimer = useRef(null);
  const fadeTimer = useRef(null);
  const isFirst = useRef(true);

  useEffect(() => {
    // Clear any pending timers
    clearTimeout(hideTimer.current);
    clearTimeout(fadeTimer.current);

    if (isFirst.current) {
      // First mount (page open / refresh): keep preloader visible for 3 seconds
      isFirst.current = false;
      
      hideTimer.current = setTimeout(() => {
        setFading(true);
        fadeTimer.current = setTimeout(() => {
          setVisible(false);
          setFading(false);
        }, 400);
      }, 3000); // 3 seconds visible duration on first load
    } else {
      // Route change transition: show overlay immediately
      setFading(false);
      setVisible(true);

      // After a short delay, start fading out
      hideTimer.current = setTimeout(() => {
        setFading(true);
        fadeTimer.current = setTimeout(() => {
          setVisible(false);
          setFading(false);
        }, 400);
      }, 350); // 350ms visible duration on page navigation
    }

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
        background: 'var(--bg-dark-1, #1c1816)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: fading ? 'none' : 'all',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          animation: 'fadeInScale 0.6s ease-out forwards',
        }}
      >
        {/* Brand Logo with Pulsing Effect */}
        <div
          style={{
            position: 'relative',
            width: '180px',
            height: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src="/images/Group 3.png"
            alt="Nivo Concepts"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '70px',
              objectFit: 'contain',
              animation: 'logoPulse 2s ease-in-out infinite',
            }}
          />
        </div>

        {/* Premium Spinner */}
        <div
          style={{
            position: 'relative',
            width: '50px',
            height: '50px',
          }}
        >
          {/* Outer Ring */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '2px solid rgba(195, 175, 155, 0.1)',
            }}
          />
          {/* Spinning Ring */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '2px solid transparent',
              borderTopColor: 'var(--primary-color, #C3AF9B)',
              animation: 'spin 1s linear infinite',
            }}
          />
        </div>
      </div>

      {/* Styled Keyframes */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes logoPulse {
          0% {
            transform: scale(0.98);
            opacity: 0.85;
            filter: drop-shadow(0 0 0px rgba(195, 175, 155, 0));
          }
          50% {
            transform: scale(1.02);
            opacity: 1;
            filter: drop-shadow(0 0 15px rgba(195, 175, 155, 0.35));
          }
          100% {
            transform: scale(0.98);
            opacity: 0.85;
            filter: drop-shadow(0 0 0px rgba(195, 175, 155, 0));
          }
        }
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default Preloader;
