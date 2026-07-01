// Initial theme is set pre-paint by an inline script in <head>; this file handles the toggle.
const root = document.documentElement;

const year = document.querySelector('#year');
if (year) {
  year.textContent = new Date().getFullYear();
}

function scrollToPageTop() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = reducedMotion ? 'auto' : 'smooth';

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

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
    syncTheme(nextTheme);
  });
}

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('#nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
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

// Scroll-spy: highlight the nav link for the homepage section currently in view.
// (Other pages use a server-rendered .is-current class based on the URL.)
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
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

  spyPairs.forEach((pair) => spyObserver.observe(pair.section));
}

// Copy-to-clipboard email (progressive enhancement: the mailto link still works without JS)
const copyEmailButtons = document.querySelectorAll('.copy-email');

for (const button of copyEmailButtons) {
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

// Project filtering (progressive enhancement: without JS, all cards show)
const filterChips = document.querySelectorAll('.filter-chip');
const filterableCards = document.querySelectorAll('.project-card[data-domain]');

if (filterChips.length && filterableCards.length) {
  for (const chip of filterChips) {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      for (const c of filterChips) {
        const active = c === chip;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-pressed', String(active));
      }
      for (const card of filterableCards) {
        card.hidden = filter !== 'all' && card.dataset.domain !== filter;
      }
    });
  }
}
