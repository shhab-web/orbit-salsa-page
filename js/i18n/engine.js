/* ==========================================================================
   ORBIT PRO — i18n Engine (EN/AR)
   ========================================================================== */

class I18nEngine {
  constructor() {
    this.supported = ['en', 'ar'];
    this.rtlLangs = ['ar'];
    this.names = { en: 'English', ar: 'العربية' };
    this.flags = { en: '🇬🇧', ar: '🇸🇦' };
    this.currentLang = localStorage.getItem('orbit-pro-lang') || this.detectBrowserLang();
    this.translations = {};
  }

  detectBrowserLang() {
    const lang = navigator.language.split('-')[0];
    return this.supported.includes(lang) ? lang : 'en';
  }

  async init() {
    this.buildSwitcher();
    await this.loadLanguage(this.currentLang);
  }

  async loadLanguage(lang) {
    if (!this.translations[lang]) {
      try {
        const response = await fetch(`js/i18n/${lang}.json`);
        this.translations[lang] = await response.json();
      } catch (err) {
        console.warn(`ORBIT PRO i18n: could not load "${lang}", falling back to English.`, err);
        lang = 'en';
        if (!this.translations.en) {
          const response = await fetch('js/i18n/en.json');
          this.translations.en = await response.json();
        }
      }
    }
    this.currentLang = lang;
    this.applyTranslations();
    this.setDirection();
    localStorage.setItem('orbit-pro-lang', lang);
    this.updateSwitcherUI();
  }

  applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const translation = this.getNestedValue(this.translations[this.currentLang], key);
      if (!translation) return;
      if (el.hasAttribute('data-i18n-attr')) {
        el.setAttribute(el.getAttribute('data-i18n-attr'), translation);
      } else {
        el.textContent = translation;
      }
    });
  }

  setDirection() {
    const isRTL = this.rtlLangs.includes(this.currentLang);
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = this.currentLang;
  }

  getNestedValue(obj, path) {
    if (!obj) return null;
    return path.split('.').reduce((o, p) => (o ? o[p] : null), obj);
  }

  buildSwitcher() {
    const mount = document.getElementById('lang-switcher');
    if (!mount) return;
    mount.innerHTML = `
      <button class="lang-trigger" aria-haspopup="listbox" aria-expanded="false">
        <span class="lang-flag">${this.flags[this.currentLang]}</span>
        <span class="lang-code">${this.currentLang.toUpperCase()}</span>
      </button>
      <ul class="lang-menu" role="listbox">
        ${this.supported.map((code) => `
          <li role="option" data-lang="${code}" class="lang-option${code === this.currentLang ? ' is-active' : ''}">
            <span class="lang-flag">${this.flags[code]}</span> ${this.names[code]}
          </li>`).join('')}
      </ul>`;

    const trigger = mount.querySelector('.lang-trigger');
    const menu = mount.querySelector('.lang-menu');
    trigger.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', String(open));
    });
    menu.querySelectorAll('.lang-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        this.loadLanguage(opt.getAttribute('data-lang'));
        menu.classList.remove('is-open');
      });
    });
    document.addEventListener('click', (e) => {
      if (!mount.contains(e.target)) menu.classList.remove('is-open');
    });
  }

  updateSwitcherUI() {
    const mount = document.getElementById('lang-switcher');
    if (!mount) return;
    const flagEl = mount.querySelector('.lang-trigger .lang-flag');
    const codeEl = mount.querySelector('.lang-trigger .lang-code');
    if (flagEl) flagEl.textContent = this.flags[this.currentLang];
    if (codeEl) codeEl.textContent = this.currentLang.toUpperCase();
    mount.querySelectorAll('.lang-option').forEach((opt) => {
      opt.classList.toggle('is-active', opt.getAttribute('data-lang') === this.currentLang);
    });
  }
}

export const i18n = new I18nEngine();
