/* ========================================================================== ORBIT PRO — Scroll Reveal ========================================================================== */
export function initScrollReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  items.forEach((item) => observer.observe(item));
  setTimeout(() => items.forEach((item) => item.classList.add('is-visible')), 2500);
}
