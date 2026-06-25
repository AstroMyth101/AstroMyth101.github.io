const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  root.dataset.theme = savedTheme;
}

for (const mark of document.querySelectorAll('.brand-mark')) {
  mark.textContent = '';
  mark.style.backgroundImage = "url('assets/images/profile-photo.svg')";
  mark.style.backgroundSize = 'cover';
  mark.style.backgroundPosition = 'center';
  mark.style.overflow = 'hidden';
}

if (window.location.pathname.includes('/projects/')) {
  for (const mark of document.querySelectorAll('.brand-mark')) {
    mark.style.backgroundImage = "url('../assets/images/profile-photo.svg')";
  }
}

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
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
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
