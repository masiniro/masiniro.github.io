(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // ── Header scroll ────────────────────────────────────────
  const header = $('#site-header');
  window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // ── Mobile nav ───────────────────────────────────────────
  const burger  = $('#header-burger');
  const overlay = $('#mobile-nav-overlay');

  if (burger && overlay) {
    const openNav = () => {
      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      burger.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };
    const closeNav = () => {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    burger.addEventListener('click', () => {
      overlay.classList.contains('open') ? closeNav() : openNav();
    });

    // Close when any nav link is clicked
    $$('a', overlay).forEach(a => a.addEventListener('click', closeNav));

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeNav();
    });
  }

  // ── Search ───────────────────────────────────────────────
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

  // ── Reading progress ─────────────────────────────────────
  const bar = $('.progress-bar');
  if (bar) {
    window.addEventListener('scroll', () => {
      const d = document.documentElement;
      bar.style.width = Math.min((window.scrollY / (d.scrollHeight - d.clientHeight)) * 100, 100).toFixed(1) + '%';
    }, { passive: true });
  }

  // ── Scroll reveal ────────────────────────────────────────
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } });
    }, { threshold: 0.06 });
    $$('.post-card, .hero-card, .stats-bar, .section-title, .newsletter-block').forEach(el => {
      el.classList.add('will-reveal');
      io.observe(el);
    });
  }

  // ── TOC ──────────────────────────────────────────────────
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

  // ── Share ────────────────────────────────────────────────
  const shareBtn = $('#share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      try {
        if (navigator.share) { await navigator.share({ title: document.title, url: location.href }); }
        else {
          await navigator.clipboard.writeText(location.href);
          // Safe: saves/restores static SVG icon markup (not user input)
          const o = shareBtn.innerHTML;
          shareBtn.textContent = '✓ Copiat!';
          setTimeout(() => { shareBtn.innerHTML = o; }, 2000);
        }
      } catch (_) {}
    });
  }

  // ── Newsletter ───────────────────────────────────────────
  const nForm = $('.newsletter-form');
  if (nForm) {
    nForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = $('input', nForm);
      const btn   = $('button', nForm);
      if (input?.value) {
        const o = btn.textContent;
        btn.textContent = '✓ Mulțumim!';
        btn.style.background = '#22c55e';
        input.value = '';
        setTimeout(() => { btn.textContent = o; btn.style.background = ''; }, 3000);
      }
    });
  }

  // ── Smooth scroll ────────────────────────────────────────
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const t = document.getElementById(a.getAttribute('href').slice(1));
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });

})();
