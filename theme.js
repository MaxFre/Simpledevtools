/* ── DevTools theme toggle ── */
(function () {
  const STORAGE_KEY = 'devtools-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    // update button icon if already in DOM
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.title = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
  }

  // Apply saved theme immediately (before paint) to avoid flash
  const saved = localStorage.getItem(STORAGE_KEY) || 'dark';
  applyTheme(saved);

  // Expose toggle for button onclick
  window.__toggleTheme = function () {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
    // re-render icon after toggle
    const btn = document.getElementById('theme-toggle');
    if (btn) {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      btn.querySelector('.theme-icon').textContent = isDark ? '☀' : '☾';
    }
  };

  // After DOM ready, set correct icon
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.querySelector('.theme-icon').textContent = isDark ? '☀' : '☾';
    btn.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
  });
})();
