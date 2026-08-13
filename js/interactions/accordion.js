/* ========================================================================== ORBIT PRO — Accordion ========================================================================== */
export function initAccordion() {
  document.querySelectorAll('.accordion-item').forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');
    if (!trigger || !panel) return;
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.accordion-item.is-open').forEach((open) => {
        if (open !== item) {
          open.classList.remove('is-open');
          open.querySelector('.accordion-panel').style.maxHeight = null;
        }
      });
      item.classList.toggle('is-open', !isOpen);
      panel.style.maxHeight = !isOpen ? `${panel.scrollHeight}px` : null;
    });
  });
}
