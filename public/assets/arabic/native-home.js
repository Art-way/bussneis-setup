(() => {
  const button = document.querySelector('.ar-menu-button');
  const navigation = document.getElementById('arabic-navigation');
  const services = document.querySelector('.ar-services-menu');
  document.addEventListener('click', event => {
    if (services && !services.contains(event.target)) services.open = false;
  });
  if (button && navigation) {
    const setOpen = (open, restoreFocus = false) => {
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'إغلاق القائمة' : 'فتح القائمة');
      navigation.classList.toggle('is-open', open);
      if (restoreFocus) button.focus();
    };
    button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
    navigation.addEventListener('click', event => {
      if (event.target.closest('a')) { if (services) services.open = false; setOpen(false); }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && services?.open) {
        event.preventDefault();
        services.open = false;
        services.querySelector('summary').focus();
      } else if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
        event.preventDefault();
        setOpen(false, true);
      }
    });
  }

  const hero = document.querySelector('.ar-hero');
  if (!hero) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let observer;
  let firstFrame = 0;
  let secondFrame = 0;
  let scheduled = false;
  const cancelMotion = () => {
    observer?.disconnect();
    window.cancelAnimationFrame(firstFrame);
    window.cancelAnimationFrame(secondFrame);
    hero.classList.remove('ar-motion-ready');
    scheduled = false;
  };
  const startMotion = () => {
    observer?.disconnect();
    if (scheduled || reducedMotion.matches) return;
    scheduled = true;
    firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        if (!reducedMotion.matches) hero.classList.add('ar-motion-ready');
      });
    });
  };
  const waitForPaint = () => {
    if (reducedMotion.matches) return;
    if (performance.getEntriesByName('first-contentful-paint').length) {
      startMotion();
      return;
    }
    if ('PerformanceObserver' in window && PerformanceObserver.supportedEntryTypes?.includes('paint')) {
      observer = new PerformanceObserver(list => {
        if (list.getEntries().some(entry => entry.name === 'first-contentful-paint')) startMotion();
      });
      observer.observe({ type: 'paint', buffered: true });
      return;
    }
    // Unsupported paint observers still keep SSR visible. Start only after the
    // load event and two rendering opportunities, rather than at script parse.
    if (document.readyState === 'complete') startMotion();
    else window.addEventListener('load', startMotion, { once: true });
  };
  reducedMotion.addEventListener('change', event => {
    if (event.matches) cancelMotion();
    else waitForPaint();
  });
  window.addEventListener('pagehide', cancelMotion);
  window.addEventListener('pageshow', event => {
    if (event.persisted) waitForPaint();
  });
  waitForPaint();
})();
