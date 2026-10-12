/* Set theme before paint to avoid a flash: saved choice, else system preference.
   Also emit a matching theme-color meta so the mobile browser chrome matches. */
(function () {
  document.documentElement.classList.add('js');
  var theme = 'dark';
  try {
    var saved = localStorage.getItem('theme');
    theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  } catch (e) {}
  document.documentElement.dataset.theme = theme;
  var meta = document.createElement('meta');
  meta.name = 'theme-color';
  meta.content = theme === 'light' ? '#eef2f8' : '#070d19';
  document.head.appendChild(meta);
})();
