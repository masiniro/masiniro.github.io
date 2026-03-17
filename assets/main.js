(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // Header scroll
  const header = $('#site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // Mobile burger — toggle .mobile-nav.open
  const burger    = $('#header-burger');
  const mobileNav = $('#mobile-nav');

  if (burger && mobileNav) {
    const open  = () => {
      burger.classList.add('open');
      mobileNav.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', 'Închide meniu');
      document.body.style.overflow = 'hidden';
    };
    const close = () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Deschide meniu');
      document.body.style.overflow = '';
    };

    burger.addEventListener('click', () => {
      burger.classList.contains('open') ? close() : open();
    });

    // Close when nav link clicked
    $$('a', mobileNav).forEach(a => a.addEventListener('click', close));

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') close();
    });
  }

  // Search
  const searchBtn     = $('#search-btn');
  const searchOverlay = $('#search-overlay');
  const searchInput   = $('#search-input');

  const openSearch  = () => { searchOverlay?.classList.add('open'); setTimeout(() => searchInput?.focus(), 60); };
  const closeSearch = () => searchOverlay?.classList.remove('open');

  searchBtn?.addEventListener('click', openSearch);
  searchOverlay?.addEventListener('click', e => { if (e.target === searchOverlay) closeSearch(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });

  // Reading progress
  const progressBar = $('.progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const doc = document.documentElement;
      const pct = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
      progressBar.style.width = Math.min(pct, 100).toFixed(1) + '%';
    }, { passive: true });
  }

  // Reveal on scroll
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); }
      });
    }, { threshold: 0.07 });
    $$('.post-card, .hero-card, .stats-bar, .section-title, .newsletter-block').forEach(el => {
      el.classList.add('will-reveal');
      io.observe(el);
    });
  }

  // TOC active
  const tocLinks = $$('.toc-list a');
  if (tocLinks.length) {
    const io2 = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting)
          tocLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-10% 0px -80% 0px' });
    $$('.post-content h2, .post-content h3').forEach(h => { if (h.id) io2.observe(h); });
  }

  // Share
  const shareBtn = $('#share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      try {
        if (navigator.share) await navigator.share({ title: document.title, url: location.href });
        else {
          await navigator.clipboard.writeText(location.href);
          const orig = shareBtn.innerHTML;
          shareBtn.textContent = '✓ Copiat!';
          setTimeout(() => { shareBtn.innerHTML = orig; }, 2000);
        }
      } catch (_) {}
    });
  }

  // Newsletter
  const nForm = $('.newsletter-form');
  if (nForm) {
    nForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = $('input', nForm);
      const btn   = $('button', nForm);
      if (input?.value) {
        const orig = btn.textContent;
        btn.textContent = '✓ Mulțumim!';
        btn.style.background = '#22c55e';
        input.value = '';
        setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 3000);
      }
    });
  }

  // Smooth scroll for anchor links
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    e.preventDefault();
    const offset = (header?.offsetHeight || 64) + 16;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
  });

})();
