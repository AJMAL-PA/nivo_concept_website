import { useEffect } from 'react';

/**
 * useScrollHeader — Replicates original designesia.js header scroll behavior:
 * - Adds 'smaller' class when scrolled past 0
 * - Adds 'clone' class
 * - Shows/hides clone header based on scroll direction (autoshow)
 * - Shows/hides btn-main based on viewport width
 */
const useScrollHeader = () => {
  useEffect(() => {
    const $ = window.$;
    if (!$) return;

    const $header = $('header');
    const AUTOSHOW = true; // matches headerAutoshow="on"
    const BTN_HIDE_WIDTH = 600;

    // Add clone (sticky) header
    $header.addClass('clone');

    let lastScroll = 0;

    const handleScroll = () => {
      const dist = window.pageYOffset || document.documentElement.scrollTop;

      // Smaller class on scroll
      if (dist > 0) {
        $header.addClass('smaller');
      } else {
        $header.removeClass('smaller');
      }

      // Autoshow: hide header when scrolling down, show when scrolling up
      if (AUTOSHOW) {
        const isMobile = window.matchMedia('(max-width: 992px)').matches;
        if (!isMobile) {
          if (dist > lastScroll && dist > 50) {
            // Scrolling down
            $('header.clone').removeClass('scrollOn').addClass('scrollOff');
          } else {
            // Scrolling up
            $('header.clone').removeClass('scrollOff').addClass('scrollOn').css('height', 'auto');
          }
        }
      }
      lastScroll = dist;
    };

    const handleResize = () => {
      // Mobile header class
      const isMobile = window.matchMedia('(max-width: 992px)').matches;
      if (isMobile) {
        $header.addClass('header-mobile');
      } else {
        $header.removeClass('header-mobile');
      }
      // Hide/show btn-main based on width
      if (window.innerWidth >= BTN_HIDE_WIDTH) {
        $('header .btn-main').show();
      } else {
        $('header .btn-main').hide();
      }
    };

    // Initial calls
    handleScroll();
    handleResize();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};

export default useScrollHeader;
