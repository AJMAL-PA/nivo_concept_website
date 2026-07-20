import React, { useState, useEffect } from 'react';

const FloatingSocial = () => {
  const [isOverFooter, setIsOverFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer) return;
      const footerRect = footer.getBoundingClientRect();
      if (footerRect.top <= window.innerHeight - 30) {
        setIsOverFooter(true);
      } else {
        setIsOverFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>{`
        .floating-social-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 9999;
          display: flex;
          flex-direction: column-reverse;
          align-items: center;
          gap: 15px;
        }

        .floating-main-btn {
          width: 55px;
          height: 55px;
          background: #A09691; /* Original taupe color matching theme */
          color: #1a1615;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
        }

        .floating-main-btn.over-footer {
          background: #ffffff !important; /* Switch to WHITE ONLY when over footer */
          color: #1a1615 !important;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;
        }

        .floating-main-btn:hover {
          transform: scale(1.08);
          background: #8b817c;
        }

        .floating-main-btn.over-footer:hover {
          background: #ffffff !important;
          color: #000000 !important;
        }

        .floating-menu {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          pointer-events: none;
        }

        .floating-social-container:hover .floating-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
        }

        .floating-item {
          width: 42px;
          height: 42px;
          background: #1a1615;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          text-decoration: none;
          box-shadow: 0 3px 10px rgba(0,0,0,0.15);
          transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
        }

        .floating-item.over-footer {
          background: #ffffff !important;
          color: #1a1615 !important;
        }

        .floating-item i {
          margin: 0 !important;
          padding: 0 !important;
        }

        .floating-item:hover {
          transform: scale(1.1);
          color: white !important;
        }

        .floating-item.whatsapp:hover { background: #25D366 !important; }
        .floating-item.instagram:hover { background: #E1306C !important; }
        .floating-item.facebook:hover { background: #1877F2 !important; }
        .floating-item.email:hover { background: #D44638 !important; }

      `}</style>
      
      <div className="floating-social-container">
        <div className={`floating-main-btn ${isOverFooter ? 'over-footer' : ''}`}>
          <i className="fa-regular fa-comments"></i>
        </div>
        <div className="floating-menu">
          <a href="https://wa.me/919400788258" target="_blank" rel="noopener noreferrer" className={`floating-item whatsapp ${isOverFooter ? 'over-footer' : ''}`} title="WhatsApp">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`floating-item instagram ${isOverFooter ? 'over-footer' : ''}`} title="Instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={`floating-item facebook ${isOverFooter ? 'over-footer' : ''}`} title="Facebook">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="mailto:nivoconcepts@gmail.com" className={`floating-item email ${isOverFooter ? 'over-footer' : ''}`} title="Email">
            <i className="fa-regular fa-envelope"></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default FloatingSocial;
