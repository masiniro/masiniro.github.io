/**
 * AutoRO — Main JS
 * Vanilla ES6+, zero dependencies, < 6KB minified
 */
(function () {
  'use strict';

  // ── Utilities ─────────────────────────────────────────────────────────
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // ── Header scroll effect ───────────────────────────────────────────────
  const header = $('#site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Mobile burger ──────────────────────────────────────────────────────
  const burger = $('#header-burger');
  const nav    = $('#header-nav');

  if (burger && nav) {
    const toggle = (forceClose = false) => {
      const isOpen = forceClose ? false : !burger.classList.contains('open');
      burger.classList.toggle('open', isOpen);
      nav.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      burger.setAttribute('aria-label', isOpen ? 'Închide meniu' : 'Deschide meniu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    burger.addEventListener('click', () => toggle());

    // Close when a nav link is clicked (mobile)
    $$('a', nav).forEach(a => {
      a.addEventListener('click', () => toggle(true));
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && burger.classList.contains('open')) toggle(true);
    });
  }

  // ── Search overlay ────────────────────────────────────────────────────
  const searchBtn     = $('#search-btn');
  const searchOverlay = $('#search-overlay');
  const searchInput   = $('#search-input');

  const openSearch  = () => { searchOverlay?.classList.add('open'); setTimeout(() => searchInput?.focus(), 60); };
  const closeSearch = () => { searchOverlay?.classList.remove('open'); };

  searchBtn?.addEventListener('click', openSearch);

  searchOverlay?.addEventListener('click', e => {
    if (e.target === searchOverlay) closeSearch();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch();
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); openSearch(); }
  });

  // Search — filter posts on the archive page
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      $$('.post-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = (!q || text.includes(q)) ? '' : 'none';
      });
    });
  }

  // ── Reading progress bar ───────────────────────────────────────────────
  const progressBar = $('.progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const doc   = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      progressBar.style.width = total > 0 ? ((window.scrollY / total) * 100).toFixed(1) + '%' : '0%';
    }, { passive: true });
  }

  // ── Intersection Observer — reveal on scroll ───────────────────────────
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); io.unobserve(e.target); } });
    }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

    $$('.post-card, .hero-card, .stats-bar, .section-title, .newsletter-block').forEach(el => {
      el.classList.add('will-reveal');
      io.observe(el);
    });
  }

  // ── TOC — active heading tracker ──────────────────────────────────────
  const tocLinks = $$('.toc-list a');
  if (tocLinks.length) {
    const headings = $$('.post-content h2, .post-content h3');
    const tocObs   = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          tocLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
        }
      });
    }, { rootMargin: '-10% 0px -80% 0px' });
    headings.forEach(h => { if (h.id) tocObs.observe(h); });
  }

  // ── Share button ───────────────────────────────────────────────────────
  const shareBtn = $('#share-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      try {
        if (navigator.share) {
          await navigator.share({ title: document.title, url: location.href });
        } else {
          await navigator.clipboard.writeText(location.href);
          const orig = shareBtn.innerHTML;
          shareBtn.textContent = '✓ Link copiat!';
          setTimeout(() => { shareBtn.innerHTML = orig; }, 2200);
        }
      } catch (_) {}
    });
  }

  // ── Newsletter form ───────────────────────────────────────────────────
  const nForm = $('.newsletter-form');
  if (nForm) {
    nForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = $('input', nForm);
      const btn   = $('button', nForm);
      if (input?.value) {
        const orig = btn.textContent;
        btn.textContent = '✓ Abonare reușită!';
        btn.style.cssText = 'background:#22c55e;transform:translateY(-2px);';
        input.value = '';
        setTimeout(() => { btn.textContent = orig; btn.style.cssText = ''; }, 3000);
      }
    });
  }

  // ── Smooth anchor scrolling (offset for fixed header) ─────────────────
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
