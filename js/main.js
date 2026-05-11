/* ============================================================
   HARRIS LAB — SHARED JS
   Handles: nav scroll state, mobile menu, active link, scroll reveal
   ============================================================ */

(function () {
  'use strict';

  /* --- Nav scroll state --- */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Mobile menu toggle --- */
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    // Close on link click
    links.querySelectorAll('.nav__link').forEach(l => {
      l.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  /* --- Active nav link --- */
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(l => {
    const href = l.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      l.classList.add('active');
    }
  });

  /* --- Scroll reveal --- */
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    // Fallback: just show everything
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

})();
