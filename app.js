/* BharatSensing — shared front-end behavior */
(function () {
  'use strict';

  // Mark <html> as JS-enabled so reveal hides only when JS can un-hide
  document.documentElement.classList.add('js');

  // Nav: add .scrolled class once the user scrolls past 12px
  const nav = document.querySelector('.nav');
  const updateNav = () => {
    if (!nav) return;
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  };
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  // Mobile menu
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => menu.classList.toggle('open'));
  }

  // Scroll reveal
  const els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -80px 0px' });
    els.forEach((el) => io.observe(el));
    // Safety net: reveal anything still hidden once the page is fully loaded
    window.addEventListener('load', () => {
      setTimeout(() => els.forEach((el) => el.classList.add('in')), 1200);
    });
  } else {
    els.forEach((el) => el.classList.add('in'));
  }

  // Stat counter (data-count, data-suffix, data-prefix)
  const counters = document.querySelectorAll('[data-count]');
  const animate = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const decimals = (target % 1 !== 0) ? 1 : 0;
    const duration = 1600;
    const start = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      const current = target * ease;
      el.textContent = prefix + current.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { animate(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach((c) => io.observe(c));
  }

  // Smooth anchor scroll with nav offset
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const t = document.querySelector(id);
        if (t) {
          e.preventDefault();
          const top = t.getBoundingClientRect().top + window.scrollY - 78;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

  // Current year in footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
