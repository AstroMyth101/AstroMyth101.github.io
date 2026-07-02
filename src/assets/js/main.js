// Initial theme is set pre-paint by an inline script in <head>; this file handles
// everything interactive. Every module bails out early when its elements are
// missing, and decorative motion is skipped under prefers-reduced-motion.
(() => {
  'use strict';

  const root = document.documentElement;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const supportsViewTimeline = CSS.supports('animation-timeline: view()');
  const supportsScrollTimeline = CSS.supports('animation-timeline: scroll()');
  const hoverCapable = window.matchMedia('(hover: hover)');

  /* ---- Footer year ---------------------------------------------------- */
  const year = document.querySelector('#year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  /* ---- Back to top ----------------------------------------------------- */
  function scrollToPageTop() {
    const behavior = reducedMotion.matches ? 'auto' : 'smooth';
    window.scrollTo({ top: 0, left: 0, behavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (history.replaceState) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    const text = link.textContent.trim().toLowerCase();
    if (href === '#top' || href === '#page-top' || text === 'back to top ↑' || text === 'back to top') {
      event.preventDefault();
      event.stopPropagation();
      scrollToPageTop();
    }
  }, true);

  /* ---- Theme toggle (circle-reveal flip via View Transitions) ---------- */
  const themeToggle = document.querySelector('.theme-toggle');
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const THEME_BG = { dark: '#070d19', light: '#eef2f8' };

  function syncTheme(theme) {
    if (themeColorMeta) themeColorMeta.content = THEME_BG[theme] || THEME_BG.dark;
    if (themeToggle) {
      themeToggle.setAttribute(
        'aria-label',
        theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
      );
    }
  }

  syncTheme(root.dataset.theme === 'light' ? 'light' : 'dark');

  function applyTheme(nextTheme) {
    root.dataset.theme = nextTheme;
    try { localStorage.setItem('theme', nextTheme); } catch (e) {}
    syncTheme(nextTheme);
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: nextTheme } }));
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
      if (document.startViewTransition && !reducedMotion.matches) {
        const rect = themeToggle.getBoundingClientRect();
        root.style.setProperty('--vt-x', `${rect.left + rect.width / 2}px`);
        root.style.setProperty('--vt-y', `${rect.top + rect.height / 2}px`);
        root.classList.add('theme-vt');
        const transition = document.startViewTransition(() => applyTheme(nextTheme));
        transition.finished.finally(() => root.classList.remove('theme-vt'));
      } else {
        applyTheme(nextTheme);
      }
    });
  }

  /* ---- Mobile navigation ------------------------------------------------ */
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('#nav-links');

  function closeNav() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.addEventListener('click', (event) => {
      if (event.target instanceof HTMLAnchorElement) closeNav();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navLinks.classList.contains('is-open')) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  /* ---- Headline word reveal --------------------------------------------
     Splits the page h1 into word spans so each can rise in on its own beat.
     The original text is preserved on the h1 as aria-label; without JS the
     h1 stays plain text. Skipped under reduced motion. */
  if (!reducedMotion.matches) {
    const headline = document.querySelector('.hero h1, .case-hero h1, .post h1');
    if (headline && !headline.querySelector('.w')) {
      const label = headline.textContent.replace(/\s+/g, ' ').trim();
      const wrap = document.createElement('span');
      wrap.setAttribute('aria-hidden', 'true');
      let index = 0;
      for (const node of Array.from(headline.childNodes)) {
        if (node.nodeType === Node.TEXT_NODE) {
          for (const part of node.textContent.split(/(\s+)/)) {
            if (!part) continue;
            if (/^\s+$/.test(part)) {
              wrap.appendChild(document.createTextNode(' '));
            } else {
              const w = document.createElement('span');
              w.className = 'w';
              w.style.setProperty('--wi', index++);
              w.textContent = part;
              wrap.appendChild(w);
            }
          }
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Keep inline elements (e.g. the gradient phrase) as one animated unit
          const w = document.createElement('span');
          w.className = 'w';
          w.style.setProperty('--wi', index++);
          w.appendChild(node.cloneNode(true));
          wrap.appendChild(w);
        }
      }
      headline.setAttribute('aria-label', label);
      headline.textContent = '';
      headline.appendChild(wrap);
    }
  }

  /* ---- Metric readouts: count-up + character scramble -------------------
     Markup keeps the real final values, so no-JS and reduced motion simply
     show them as-is. */
  if (!reducedMotion.matches) {
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    for (const el of document.querySelectorAll('[data-count]')) {
      const target = parseFloat(el.dataset.count);
      if (Number.isNaN(target)) continue;
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      window.setTimeout(() => {
        const started = performance.now();
        const duration = 900;
        const tick = (now) => {
          const progress = Math.min((now - started) / duration, 1);
          el.textContent = (target * easeOut(progress)).toFixed(decimals);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, 1000);
    }

    for (const el of document.querySelectorAll('[data-scramble]')) {
      const finalText = el.textContent;
      const glyphs = '01▮▯/\\|·';
      window.setTimeout(() => {
        let frame = 0;
        const tick = () => {
          frame += 1;
          if (frame >= 10) {
            el.textContent = finalText;
            return;
          }
          el.textContent = Array.from(finalText, (ch, i) =>
            frame > i * 3 + 4 ? ch : glyphs[Math.floor(Math.random() * glyphs.length)]
          ).join('');
          window.setTimeout(tick, 55);
        };
        tick();
      }, 1000);
    }
  }

  /* ---- Reveal-on-scroll: IntersectionObserver fallback ------------------
     Browsers with CSS scroll-driven animations handle [data-reveal] in pure
     CSS; everyone else gets the observer. */
  if (!supportsViewTimeline) {
    const revealItems = document.querySelectorAll('[data-reveal]');
    if (revealItems.length && 'IntersectionObserver' in window && !reducedMotion.matches) {
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      }, { threshold: 0.12 });
      revealItems.forEach((item) => observer.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add('is-visible'));
    }

    const timeline = document.querySelector('.timeline');
    if (timeline && 'IntersectionObserver' in window && !reducedMotion.matches) {
      const railObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-drawn');
            railObserver.unobserve(entry.target);
          }
        }
      }, { threshold: 0.2 });
      railObserver.observe(timeline);
    } else if (timeline) {
      timeline.classList.add('is-drawn');
    }
  }

  /* ---- Header: hide on scroll down, return on scroll up ------------------ */
  {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      if (y > 24) {
        root.dataset.scrolled = 'true';
      } else {
        delete root.dataset.scrolled;
      }
      const menuOpen = navLinks && navLinks.classList.contains('is-open');
      if (reducedMotion.matches || menuOpen || Math.abs(y - lastY) < 6) {
        if (menuOpen || reducedMotion.matches) root.dataset.scrollDir = 'up';
      } else {
        root.dataset.scrollDir = y > lastY ? 'down' : 'up';
      }
      lastY = y;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  /* ---- Scroll progress: JS fallback for non-scroll-timeline browsers ---- */
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar && !supportsScrollTimeline) {
    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  /* ---- Nav: sliding indicator that springs between links ----------------- */
  const navLinksWrap = document.querySelector('.nav-links');
  const desktopNav = window.matchMedia('(min-width: 761px)');
  let updateIndicator = null;

  if (navLinksWrap && !reducedMotion.matches) {
    const indicator = document.createElement('span');
    indicator.className = 'nav-indicator';
    indicator.setAttribute('aria-hidden', 'true');
    navLinksWrap.appendChild(indicator);

    const moveTo = (link) => {
      if (!link || !desktopNav.matches) {
        navLinksWrap.classList.remove('has-indicator');
        return;
      }
      const inset = 10;
      navLinksWrap.classList.add('has-indicator');
      indicator.style.width = `${Math.max(link.offsetWidth - inset * 2, 8)}px`;
      indicator.style.transform = `translateX(${link.offsetLeft + inset}px)`;
    };

    const currentLink = () => navLinksWrap.querySelector('a.is-current');
    updateIndicator = () => moveTo(currentLink());

    navLinksWrap.addEventListener('mouseover', (event) => {
      const link = event.target.closest('a');
      if (link) moveTo(link);
    });
    navLinksWrap.addEventListener('mouseleave', updateIndicator);
    navLinksWrap.addEventListener('focusin', (event) => {
      const link = event.target.closest('a');
      if (link) moveTo(link);
    });
    navLinksWrap.addEventListener('focusout', updateIndicator);
    window.addEventListener('resize', updateIndicator);
    desktopNav.addEventListener('change', updateIndicator);
    updateIndicator();
  }

  /* ---- Scroll-spy: highlight the homepage section currently in view ------ */
  const spyLinks = Array.from(document.querySelectorAll('.nav-links a[data-spy]'));
  const spyPairs = spyLinks
    .map((link) => ({ link, section: document.getElementById(link.dataset.spy) }))
    .filter((pair) => pair.section);

  if (spyPairs.length && 'IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const pair = spyPairs.find((p) => p.section === entry.target);
        if (!pair) continue;
        pair.link.classList.toggle('is-current', entry.isIntersecting);
        if (entry.isIntersecting) {
          pair.link.setAttribute('aria-current', 'true');
        } else {
          pair.link.removeAttribute('aria-current');
        }
      }
      if (updateIndicator) updateIndicator();
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    spyPairs.forEach((pair) => spyObserver.observe(pair.section));
  }

  /* ---- Copy-to-clipboard email (mailto link still works without JS) ------ */
  for (const button of document.querySelectorAll('.copy-email')) {
    button.addEventListener('click', async () => {
      const email = button.dataset.email;
      const original = button.dataset.label || button.textContent;
      if (!email) return;
      try {
        await navigator.clipboard.writeText(email);
        button.textContent = 'Copied ✓';
      } catch (e) {
        button.textContent = email;
      }
      button.classList.add('is-copied');
      window.setTimeout(() => {
        button.textContent = original;
        button.classList.remove('is-copied');
      }, 2000);
    });
  }

  /* ---- Project filtering (cards slide into place via View Transitions) --- */
  const filterChips = document.querySelectorAll('.filter-chip');
  const filterableCards = document.querySelectorAll('.project-card[data-domain]');

  if (filterChips.length && filterableCards.length) {
    for (const chip of filterChips) {
      chip.addEventListener('click', () => {
        const filter = chip.dataset.filter;
        const apply = () => {
          for (const c of filterChips) {
            const active = c === chip;
            c.classList.toggle('is-active', active);
            c.setAttribute('aria-pressed', String(active));
          }
          for (const card of filterableCards) {
            card.hidden = filter !== 'all' && card.dataset.domain !== filter;
          }
        };
        if (document.startViewTransition && !reducedMotion.matches) {
          root.classList.add('vt-instant');
          const transition = document.startViewTransition(apply);
          transition.finished.finally(() => root.classList.remove('vt-instant'));
        } else {
          apply();
        }
      });
    }
  }

  /* ---- Card spotlight: one delegated pointer listener ------------------- */
  if (hoverCapable.matches && !reducedMotion.matches) {
    let spotTicking = false;
    let lastEvent = null;
    const update = () => {
      spotTicking = false;
      if (!lastEvent) return;
      const card = lastEvent.target.closest('.project-card, .skill-card, .post-list-item a');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${lastEvent.clientX - rect.left}px`);
      card.style.setProperty('--my', `${lastEvent.clientY - rect.top}px`);
    };
    document.addEventListener('pointermove', (event) => {
      lastEvent = event;
      if (!spotTicking) {
        spotTicking = true;
        requestAnimationFrame(update);
      }
    }, { passive: true });
  }
})();
