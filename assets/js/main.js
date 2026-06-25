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
