import { useEffect } from 'react';

/**
 * usePluginInit — Re-initializes all jQuery-based plugins after each route change.
 * Called in every page component to ensure carousels, WOW, jarallax, etc. work.
 */
const usePluginInit = () => {
  useEffect(() => {
    const $ = window.$;
    if (!$ || typeof $ !== 'function') return;

    // Small delay to let React finish painting the DOM
    const timer = setTimeout(() => {
      try {
        /* --------------------------------------------------
         * Custom Background (data-bgimage, data-bgcolor)
         * --------------------------------------------------*/
        $('body,div,section,span,form,img').css('background-color', function () {
          if ($(this).is('[data-bgcolor]')) $(this).addClass('bgcustom');
          return $(this).data('bgcolor');
        });
        $('body,div,section').each(function () {
          const $el = $(this);
          const bgImage = $el.data('bgimage');
          if (bgImage) {
            $el.addClass('bgcustom');
            $el.css({
              background: bgImage,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            });
          }
        });

        /* --------------------------------------------------
         * Owl Carousel
         * --------------------------------------------------*/
        if ($.fn.owlCarousel) {
          $('.owl-2-cols').owlCarousel({
            center: false, loop: true, margin: 30, nav: false, dots: false,
            responsive: { 1000: { items: 2 }, 600: { items: 2 }, 0: { items: 1 } }
          });
          $('.owl-2-cols-dots').owlCarousel({
            center: false, loop: true, margin: 30, nav: false, dots: true,
            responsive: { 1000: { items: 2 }, 600: { items: 2 }, 0: { items: 1 } }
          });
          $('.owl-3-cols').owlCarousel({
            center: false, loop: true, margin: 30, nav: false, dots: false,
            responsive: { 1000: { items: 3 }, 600: { items: 2 }, 0: { items: 1 } }
          });
          $('.owl-4-cols').owlCarousel({
            center: false, loop: true, margin: 30, nav: false, dots: false,
            responsive: { 1000: { items: 4 }, 600: { items: 2 }, 0: { items: 1 } }
          });
          $('.owl-4-cols-center').owlCarousel({
            center: true, loop: true, margin: 30, nav: false, dots: false,
            autoplay: true, autoplayTimeout: 4000, autoplayHoverPause: true,
            responsive: { 1000: { items: 4 }, 600: { items: 2 }, 0: { items: 1 } }
          }).trigger('play.owl.autoplay', [4000]);
          $('.owl-single').owlCarousel({
            loop: true, items: 1, nav: false, dots: false,
            smartSpeed: 1200, fluidSpeed: 1200
          });
          $('.owl-single-dots').owlCarousel({
            loop: true, items: 1, nav: false, dots: true,
            autoplay: true, autoplayTimeout: 1500, autoplayHoverPause: true,
            smartSpeed: 400, animateOut: 'fadeOut', animateIn: 'fadeIn'
          }).trigger('play.owl.autoplay', [1500]);
          $('.owl-single-zoom').owlCarousel({
            loop: true, items: 1, nav: false, dots: false,
            autoplay: true, autoplayTimeout: 3000, autoplayHoverPause: true,
            smartSpeed: 800, animateIn: 'zoomIn', animateOut: 'zoomOut',
            mouseDrag: false, touchDrag: false, pullDrag: false, freeDrag: false
          });
          $('.owl-2-dots').owlCarousel({
            loop: true, margin: 25, nav: false, dots: true,
            responsive: { 1000: { items: 2 }, 600: { items: 2 }, 0: { items: 1 } }
          });
          $('.owl-3-dots').owlCarousel({
            loop: true, margin: 25, nav: false, dots: true,
            responsive: { 1000: { items: 3 }, 600: { items: 2 }, 0: { items: 1 } }
          });
          $('.owl-4-dots').owlCarousel({
            loop: true, margin: 25, nav: false, dots: true,
            responsive: { 1000: { items: 4 }, 600: { items: 2 }, 0: { items: 1 } }
          });
          $('.owl-6').owlCarousel({
            center: false, items: 6, loop: true, dots: false, margin: 40,
            autoplay: true, autoplayTimeout: 2000, smartSpeed: 1200,
            responsive: { 1000: { items: 6 }, 600: { items: 4 }, 0: { items: 3 } }
          });
          $('#slider-carousel').owlCarousel({
            loop: true, items: 1, dots: false,
            thumbs: true, thumbImage: true,
            thumbContainerClass: 'owl-thumbs', thumbItemClass: 'owl-thumb-item'
          });

          // Custom navigation for owl carousels
          $('.de-custom-nav').each(function () {
            const target = $($(this).data('target'));
            $(this).find('.d-prev').off('click').on('click', function () {
              target.trigger('prev.owl.carousel');
            });
            $(this).find('.d-next').off('click').on('click', function () {
              target.trigger('next.owl.carousel');
            });
          });
        }

        /* --------------------------------------------------
         * Swiper Hero
         * --------------------------------------------------*/
        if (window.Swiper && $('.swiper').length && !$('.swiper')[0].swiper) {
          new window.Swiper('.swiper', {
            autoplay: { delay: 4000, disableOnInteraction: false },
            loop: true, spaceBetween: 0, effect: 'creative', speed: 1500,
            creativeEffect: {
              prev: { scale: 1.1, opacity: 0, translate: [0, 0, 0] },
              next: { scale: 1.3, opacity: 0, translate: [0, 0, 0] }
            },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
            pagination: { el: false, clickable: false }
          });
        }

        /* --------------------------------------------------
         * WOW.js (with char split)
         * --------------------------------------------------*/
        if (window.WOW) {
          // Split .split elements to chars
          document.querySelectorAll('.split').forEach(el => {
            const text = el.innerText;
            el.innerHTML = '';
            [...text].forEach((ch, i) => {
              if (ch === ' ') {
                el.appendChild(document.createTextNode(' '));
              } else {
                const span = document.createElement('span');
                span.innerText = ch;
                span.className = 'char wow fadeInUp';
                span.setAttribute('data-wow-delay', (i * 0.025) + 's');
                el.appendChild(span);
              }
            });
          });
          new window.WOW().init();
        }

        /* --------------------------------------------------
         * Jarallax (parallax backgrounds)
         * --------------------------------------------------*/
        if (window.jarallax) {
          window.jarallax(document.querySelectorAll('.jarallax'), { speed: 0.6 });
        }

        /* --------------------------------------------------
         * Magnific Popup
         * --------------------------------------------------*/
        if ($.fn.magnificPopup) {
          $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            disableOn: 700, type: 'iframe', mainClass: 'mfp-fade',
            removalDelay: 160, preloader: false, fixedContentPos: false
          });
          $('.image-popup').magnificPopup({ type: 'image', mainClass: 'mfp-with-zoom',
            zoom: { enabled: true, duration: 300, easing: 'ease-in-out' }
          });
          $('.zoom-gallery').magnificPopup({
            delegate: 'a', type: 'image', closeOnContentClick: false, closeBtnInside: false,
            mainClass: 'mfp-with-zoom mfp-img-mobile',
            image: { verticalFit: true }, gallery: { enabled: true },
            zoom: { enabled: true, duration: 300 }
          });
          $('.images-group').each(function () {
            $(this).magnificPopup({ delegate: 'a', type: 'image', gallery: { enabled: true } });
          });
        }

        /* --------------------------------------------------
         * Accordion
         * --------------------------------------------------*/
        const $acc = $('.accordion');
        $acc.find('.accordion-section-content').hide();
        $acc.find('.accordion-section-title').off('click').on('click', function () {
          const $content = $($(this).data('tab'));
          const $allContents = $acc.find('.accordion-section-content');
          const $allTitles = $acc.find('.accordion-section-title');
          if ($content.is(':visible')) {
            $content.slideUp(300);
            $(this).removeClass('active');
          } else {
            $allContents.slideUp(300);
            $allTitles.removeClass('active');
            $content.slideDown(300);
            $(this).addClass('active');
          }
        });

        /* --------------------------------------------------
         * Tabs (.de_tab)
         * --------------------------------------------------*/
        const $tabs = $('.de_tab');
        $tabs.find('.de_tab_content > div').hide();
        $tabs.find('.de_tab_content > div:first').show();
        $('.de_nav li').off('click').on('click', function (e) {
          e.preventDefault();
          const $parent = $(this).parent().parent();
          $(this).parent().find('li').removeClass('active');
          $(this).addClass('active');
          $parent.find('.de_tab_content > div').hide();
          const idx = $(this).index();
          $parent.find(`.de_tab_content > div:eq(${idx})`).fadeIn();
        });

        /* --------------------------------------------------
         * Mobile Menu Arrow (for submenu toggle)
         * --------------------------------------------------*/
        $('#mainmenu li a').each(function () {
          if ($(this).next('ul').length > 0 && !$(this).next('span').length) {
            $('<span></span>').insertAfter($(this));
          }
        });
        $('#mainmenu > li > span').off('click').on('click', function (e) {
          e.preventDefault();
          let iter = $(this).data('iteration') || 1;
          const $sub = $(this).parent().find('ul:first');
          if (iter === 1) {
            $(this).addClass('active');
            const h = $sub.css('height', 'auto').height();
            $sub.css('height', 0).animate({ height: h }, 300);
          } else {
            $(this).removeClass('active');
            $sub.animate({ height: 0 }, 300);
          }
          $(this).data('iteration', iter >= 2 ? 1 : iter + 1);
        });

        /* --------------------------------------------------
         * Smooth scroll (Lenis)
         * --------------------------------------------------*/
        if (window.Lenis && !window.__lenis) {
          const lenis = new window.Lenis();
          const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
          requestAnimationFrame(raf);
          window.__lenis = lenis;
        }

        /* --------------------------------------------------
         * Isotope (gallery filtering)
         * --------------------------------------------------*/
        if ($.fn.isotope) {
          const $gallery = $('#gallery');
          if ($gallery.length) {
            $gallery.isotope({ itemSelector: '.item', filter: '*' });
            $('#filters a').off('click').on('click', function (e) {
              e.preventDefault();
              if ($(this).hasClass('selected')) return;
              $(this).parents().find('.selected').removeClass('selected');
              $(this).addClass('selected');
              $gallery.isotope({ filter: $(this).attr('data-filter') });
            });
          }
        }

      } catch (err) {
        console.warn('Plugin init error:', err);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);
};

export default usePluginInit;
