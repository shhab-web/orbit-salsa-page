/* ==========================================================================
   ORBIT PRO — Site Configuration
   Edit the two links below and every "Buy Now" / "Live Demo" button on
   every page updates automatically — you never have to hunt through HTML.

   How it works: any element with data-cta="buy" or data-cta="demo"
   gets its href set from here on page load (see js/interactions/cta-links.js).
   ========================================================================== */

export const CONFIG = {
  // TODO: replace with your real affiliate / checkout link (Gumroad, LemonSqueezy, etc.)
  AFFILIATE_URL: 'https://gumroad.com/l/REPLACE-WITH-YOUR-PRODUCT-LINK',

  // ORBIT's own live demo
  LIVE_DEMO_URL: 'https://shhab7.github.io/orbit/',

  // Shown in the price block. ORBIT is priced as a premium template —
  // no fake "was $X" discount, no fabricated scarcity.
  PRICE: '$120',

  // Used in SEO meta tags and structured data — update once you have a real domain
  SITE_URL: 'https://REPLACE-WITH-YOUR-SALES-PAGE-DOMAIN.com',
};
