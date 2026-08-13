/* ==========================================================================
   ORBIT PRO — Main Entry Point
   ========================================================================== */

import { initNavbar } from './interactions/navbar.js';
import { initScrollReveal } from './interactions/scroll-reveal.js';
import { initCounters } from './interactions/counters.js';
import { initAccordion } from './interactions/accordion.js';
import { initCtaLinks } from './interactions/cta-links.js';
import { i18n } from './i18n/engine.js';

document.addEventListener('DOMContentLoaded', async () => {
  initNavbar();
  initScrollReveal();
  initCounters();
  initAccordion();
  initCtaLinks();
  await i18n.init();
});
