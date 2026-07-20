import { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useScrollHeader from '../../hooks/useScrollHeader';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { 
    label: 'Services', 
    to: '/services',
    dropdown: [
      { label: 'Interiors', to: '/services/interiors' },
      { label: 'Construction', to: '/services/construction' },
      { label: 'Consultation', to: '/services/consultation-service' },
      { label: 'Architectural Design', to: '/services/architectural-design' },
    ]
  },
  { 
    label: 'Projects', 
    to: '/projects',
    dropdown: [
      { label: 'Commercial', to: '/projects/commercial' },
      { label: 'Residential', to: '/projects/residential' },
    ]
  },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

const Header = () => {
  const location = useLocation();
  useScrollHeader();
  const navRef = useRef(null);

  const [hoverStyle, setHoverStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const moveToEl = (el) => {
    if (!el) return;
    const { offsetLeft, offsetWidth } = el;
    setHoverStyle({
      left: offsetLeft,
      width: offsetWidth,
      opacity: 1,
    });
  };

  const resetToActive = () => {
    if (!navRef.current) return;
    const activeLink = navRef.current.querySelector('.nav-active');
    if (activeLink) {
      const li = activeLink.closest('li');
      moveToEl(li);
    } else {
      setHoverStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  // Sync indicator on route change
  useEffect(() => {
    const timer = setTimeout(resetToActive, 50);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Sync indicator on window resize
  useEffect(() => {
    window.addEventListener('resize', resetToActive);
    return () => window.removeEventListener('resize', resetToActive);
  }, []);

  // Mobile menu toggle
  useEffect(() => {
    const $ = window.$;
    if (!$) return;

    $('#btn-extra').off('click.header').on('click.header', () => {
      $('#extra-wrap').addClass('open');
    });
    $('#btn-close').off('click.header').on('click.header', () => {
      $('#extra-wrap').removeClass('open');
    });

    $('#menu-btn').off('click.header').on('click.header', function () {
      let iter = $(this).data('iteration') || 1;
      if (iter === 1) {
        $('header').addClass('header-mobile-nav-trigger');
      } else {
        $('header').removeClass('header-mobile-nav-trigger');
      }
      $(this).data('iteration', iter >= 2 ? 1 : iter + 1);
    });
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <style>{`
        header.nivo-header,
        header.nivo-header.smaller {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1001;
          padding: 10px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: transparent !important;
          box-shadow: none !important;
          transition: background 0.35s ease, box-shadow 0.35s ease, padding 0.35s ease;
          box-sizing: border-box;
        }

        header.nivo-header.scrolled,
        header.nivo-header.smaller.scrolled {
          background: #ffffff !important;
          box-shadow: 0 2px 24px rgba(0, 0, 0, 0.08) !important;
          padding: 6px 32px;
        }

        /* Logo */
        .nivo-logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
          margin-left: 60px;
          margin-top: 4px;
          transition: margin-top 0.3s ease, all 0.3s ease;
        }
        .nivo-header.scrolled .nivo-logo {
          margin-top: 2px;
        }
        .nivo-logo img {
          height: 80px;
          width: auto;
          object-fit: contain;
          transition: height 0.3s ease;
        }
        .nivo-logo .logo-light {
          display: none;
        }
        .nivo-logo .logo-dark {
          display: block;
        }
        .nivo-header.scrolled .nivo-logo img {
          height: 60px;
        }
        .nivo-header.scrolled .nivo-logo .logo-light {
          display: block;
        }
        .nivo-header.scrolled .nivo-logo .logo-dark {
          display: none;
        }

        /* Pill nav */
        #mainmenu.nivo-nav-pill {
          display: flex !important;
          align-items: center !important;
          background: rgba(255, 255, 255, 0.95) !important; /* White fill */
          border: 1px solid rgba(185, 167, 151, 0.5) !important;
          border-radius: 999px !important;
          padding: 0 !important;
          gap: 2px !important;
          list-style: none !important;
          margin: 0 !important;
          transition: background 0.3s ease, border-color 0.3s ease !important;
          height: 50px !important;
          box-sizing: border-box !important;
          position: relative !important;
        }
        .nivo-header.scrolled #mainmenu.nivo-nav-pill {
          background: #ffffff !important; /* Solid White */
          border-color: rgba(185, 167, 151, 0.5) !important;
        }

        #mainmenu.nivo-nav-pill li {
          margin: 0 !important;
          padding: 0 !important;
          display: flex !important;
          align-items: center !important;
          height: 100% !important;
          float: none !important;
        }

        #mainmenu.nivo-nav-pill li a {
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          height: 48px !important;
          padding: 0 16px !important;
          border-radius: 999px !important;
          font-family: var(--body-font, 'Google Sans', Helvetica, Arial, sans-serif) !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          color: rgb(35, 30, 25) !important; /* Dark text for contrast on Beige */
          text-decoration: none !important;
          transition: background 0.2s ease, color 0.2s ease !important;
          white-space: nowrap !important;
          line-height: normal !important;
          position: relative !important;
          z-index: 1 !important;
        }

        #mainmenu.nivo-nav-pill li:hover > a,
        #mainmenu.nivo-nav-pill li a:hover,
        #mainmenu.nivo-nav-pill li a.nav-active {
          color: rgb(35, 30, 25) !important; /* Contrast dark text */
          font-weight: 700 !important;
        }

        .nivo-nav-hover-indicator {
          position: absolute !important;
          top: 0 !important;
          height: 48px !important;
          box-sizing: border-box !important;
          border-radius: 999px !important;
          background: rgba(185, 167, 151, 0.85) !important; /* Solid beige indicator */
          border: 1px solid rgba(185, 167, 151, 0.95) !important;
          transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1) !important;
          z-index: 0 !important;
          pointer-events: none !important;
        }

        /* CTA button */
        .nivo-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 50px;
          padding: 0 22px;
          box-sizing: border-box;
          border-radius: 999px;
          background: rgba(185, 167, 151, 0.95); /* Beige */
          border: 1px solid rgba(160, 150, 145, 0.85); /* Taupe border */
          font-family: var(--body-font, 'Google Sans', Helvetica, Arial, sans-serif);
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgb(35, 30, 25); /* Contrast dark text */
          text-decoration: none;
          transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
          flex-shrink: 0;
          white-space: nowrap;
        }
        .nivo-cta:hover {
          background: rgb(160, 150, 145); /* Taupe */
          border-color: rgb(185, 167, 151); /* Beige */
          color: #ffffff;
          transform: translateY(-1px);
        }
        .nivo-cta-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(160, 150, 145, 0.35);
          font-size: 11px;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .nivo-cta:hover .nivo-cta-arrow {
          background: rgba(96, 96, 96, 0.35);
          transform: translate(1px, -1px);
        }

        /* Dropdown styles */
        .has-dropdown {
          position: relative !important;
        }

        .dropdown-caret {
          font-size: 8px;
          margin-left: 5px;
          display: inline-block;
          vertical-align: middle;
          transition: transform 0.2s ease;
        }

        .has-dropdown:hover .dropdown-caret {
          transform: rotate(180deg);
        }
        
        .nivo-dropdown-menu {
          position: absolute !important;
          top: 100% !important;
          left: 50% !important;
          transform: translateX(-50%) translateY(10px) !important;
          background: rgba(96, 86, 78, 0.96) !important;
          border: 1px solid rgba(96, 86, 78, 0.75) !important;
          border-radius: 12px !important;
          padding: 8px 0 !important;
          list-style: none !important;
          min-width: 220px !important;
          opacity: 0 !important;
          visibility: hidden !important;
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1) !important;
          backdrop-filter: blur(12px) !important;
          -webkit-backdrop-filter: blur(12px) !important;
          z-index: 10000 !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important;
          margin: 6px 0 0 0 !important;
        }

        /* Hover bridge: keeps dropdown open when transitioning cursor from parent to menu */
        .nivo-dropdown-menu::before {
          content: '' !important;
          position: absolute !important;
          top: -15px !important;
          left: 0 !important;
          width: 100% !important;
          height: 15px !important;
          background: transparent !important;
        }

        .has-dropdown:hover .nivo-dropdown-menu {
          opacity: 1 !important;
          visibility: visible !important;
          transform: translateX(-50%) translateY(0) !important;
        }

        .nivo-dropdown-menu li {
          width: 100% !important;
          height: auto !important;
          display: block !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        #mainmenu li ul.nivo-dropdown-menu li a,
        #mainmenu.nivo-nav-pill li ul.nivo-dropdown-menu li a,
        #mainmenu li li a,
        .nivo-dropdown-menu li a {
          display: block !important;
          padding: 10px 20px !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          letter-spacing: 0.08em !important;
          text-transform: uppercase !important;
          color: #ffffff !important;
          opacity: 1 !important;
          text-decoration: none !important;
          transition: background 0.2s ease, color 0.2s ease !important;
          white-space: nowrap !important;
          border-radius: 6px !important;
          height: auto !important;
          text-align: left !important;
          justify-content: flex-start !important;
          margin: 2px 6px !important;
        }

        #mainmenu li ul.nivo-dropdown-menu li a:hover,
        #mainmenu.nivo-nav-pill li ul.nivo-dropdown-menu li a:hover,
        #mainmenu li li a:hover,
        .nivo-dropdown-menu li a:hover {
          background: rgba(255, 255, 255, 0.18) !important;
          color: #ffffff !important;
          opacity: 1 !important;
        }

        /* Mobile hamburger */
        .nivo-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          background: rgba(175, 155, 130, 0.22);
          border: 1px solid rgba(175, 155, 130, 0.40);
          border-radius: 10px;
          cursor: pointer;
          padding: 0;
        }
        .nivo-hamburger span {
          display: block;
          width: 20px;
          height: 2px;
          background: rgba(60, 42, 28, 0.75);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        /* Mobile nav */
        .nivo-mobile-nav {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(240, 234, 224, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 1100;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 40px;
          box-sizing: border-box;
        }
        .nivo-mobile-nav.open {
          display: flex;
        }
        .nivo-mobile-nav a {
          font-size: 22px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(60, 42, 28, 0.85);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .nivo-mobile-nav a:hover,
        .nivo-mobile-nav a.nav-active {
          color: rgba(60, 42, 28, 1);
        }
        .nivo-mobile-close {
          position: absolute;
          top: 24px;
          right: 32px;
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          color: rgba(60, 42, 28, 0.7);
          line-height: 1;
          padding: 0;
        }

        @media (max-width: 1024px) {
          .nivo-nav-pill {
            display: none;
          }
          .nivo-cta {
            display: none;
          }
          .nivo-hamburger {
            display: flex;
          }
          .nivo-header {
            padding: 12px 20px;
          }
        }
      `}</style>

      <header className={`nivo-header`} id="nivo-header">
        {/* Logo */}
        <Link to="/" className="nivo-logo">
          <img className="logo-dark" src="/images/nivo_concepts_logo.png" alt="Nivo Concepts" />
          <img className="logo-light" src="/images/Group 3.png" alt="Nivo Concepts" />
        </Link>

        {/* Pill Navigation */}
        <ul className="nivo-nav-pill" id="mainmenu" ref={navRef} onMouseLeave={resetToActive}>
          {NAV_LINKS.map((link) => (
            <li 
              key={link.to}
              className={link.dropdown ? 'has-dropdown' : ''}
              onMouseEnter={(e) => moveToEl(e.currentTarget)}
            >
              <Link
                to={link.dropdown ? '#' : link.to}
                onClick={link.dropdown ? (e) => e.preventDefault() : undefined}
                className={isActive(link.to) || (link.dropdown && link.dropdown.some(d => isActive(d.to))) ? 'nav-active' : ''}
              >
                {link.label} {link.dropdown && <span className="dropdown-caret">▼</span>}
              </Link>
              {link.dropdown && (
                <ul className="nivo-dropdown-menu">
                  {link.dropdown.map((subLink) => (
                    <li key={subLink.to}>
                      <Link to={subLink.to} style={{ color: '#ffffff', opacity: 1 }}>
                        {subLink.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <div className="nivo-nav-hover-indicator" style={hoverStyle} />
        </ul>

        {/* CTA Button */}
        <Link to="/contact" className="nivo-cta">
          GET A QUOTE
          <span className="nivo-cta-arrow">↗</span>
        </Link>

        {/* Mobile hamburger */}
        <button
          className="nivo-hamburger"
          id="menu-btn"
          aria-label="Open menu"
          onClick={() => document.getElementById('nivo-mobile-nav').classList.add('open')}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile full-screen nav */}
      <nav className="nivo-mobile-nav" id="nivo-mobile-nav">
        <button
          className="nivo-mobile-close"
          aria-label="Close menu"
          onClick={() => document.getElementById('nivo-mobile-nav').classList.remove('open')}
        >
          ✕
        </button>
        {NAV_LINKS.map((link) => (
          <div key={link.to} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <Link
              to={link.dropdown ? '#' : link.to}
              className={isActive(link.to) || (link.dropdown && link.dropdown.some(d => isActive(d.to))) ? 'nav-active' : ''}
              onClick={link.dropdown ? (e) => e.preventDefault() : () => document.getElementById('nivo-mobile-nav').classList.remove('open')}
              style={{ fontWeight: link.dropdown ? '600' : 'normal' }}
            >
              {link.label}
            </Link>
            {link.dropdown && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginTop: '2px', marginBottom: '6px' }}>
                {link.dropdown.map((subLink) => (
                  <Link
                    key={subLink.to}
                    to={subLink.to}
                    className={isActive(subLink.to) ? 'nav-active' : ''}
                    onClick={() => document.getElementById('nivo-mobile-nav').classList.remove('open')}
                    style={{ fontSize: '15px', textTransform: 'none', opacity: 0.75 }}
                  >
                    {subLink.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <Link
          to="/contact"
          className="nivo-cta"
          style={{ marginTop: 8 }}
          onClick={() => document.getElementById('nivo-mobile-nav').classList.remove('open')}
        >
          GET A QUOTE <span className="nivo-cta-arrow">↗</span>
        </Link>
      </nav>
    </>
  );
};

// Add scroll class via vanilla JS (lightweight, avoids re-renders)
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    const h = document.getElementById('nivo-header');
    if (!h) return;
    if (window.scrollY > 20) {
      h.classList.add('scrolled');
    } else {
      h.classList.remove('scrolled');
    }
  }, { passive: true });
}

export default Header;
