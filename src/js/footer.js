const currentYearEl = document.querySelector('[data-current-year]');

if (currentYearEl) {
  currentYearEl.textContent = new Date().getFullYear();
}