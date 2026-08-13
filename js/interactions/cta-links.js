/* ==========================================================================
   ORBIT PRO — CTA Link Binding
   Every "Buy Now" button carries data-cta="buy", every "Live Demo" button
   carries data-cta="demo". This is the only code that ever needs to know
   about config.js, so adding a new CTA button anywhere on the site is as
   simple as adding the data-cta attribute — no extra JS required.
   ========================================================================== */

import { CONFIG } from '../config.js';

export function initCtaLinks() {
  document.querySelectorAll('[data-cta="buy"]').forEach((el) => {
    el.href = CONFIG.AFFILIATE_URL;
    el.target = '_blank';
    el.rel = 'noopener noreferrer sponsored';
  });

  document.querySelectorAll('[data-cta="demo"]').forEach((el) => {
    el.href = CONFIG.LIVE_DEMO_URL;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });

  document.querySelectorAll('[data-price]').forEach((el) => { el.textContent = CONFIG.PRICE; });
}
