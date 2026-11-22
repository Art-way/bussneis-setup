'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { arabicContactWidgetId } from './form-config';
import styles from './lazy-contact-widget.module.css';

export default function LazyArabicContactWidget({ id }) {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: '200px 0px' });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return <div ref={containerRef} id={id} className={styles.widget} lang="ar" dir="rtl" aria-label="نموذج التواصل بالعربية مع BSetup UAE" data-load="viewport">
    {!visible && <p role="status">جارٍ تحميل نموذج التواصل…</p>}
    {visible && !failed && <>
      <Script id="arabic-elfsight-platform" src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" onError={() => setFailed(true)} />
      <div className={`elfsight-app-${arabicContactWidgetId}`} data-elfsight-app-lazy />
    </>}
    {failed && <p role="alert">تعذّر تحميل النموذج. يمكنك استخدام رابط طلب الاستشارة أو التواصل عبر واتساب أو البريد الإلكتروني.</p>}
    <noscript><p>فعّل JavaScript لتعبئة النموذج، أو تواصل معنا عبر واتساب أو البريد الإلكتروني.</p></noscript>
  </div>;
}
