'use client';

import { useState } from 'react';
import Script from 'next/script';
import Link from '../link';
import { arabicContactWidgetId } from '../form-config';
import styles from './blog.module.css';

export default function ArticleSidebarForm({ requestHref }) {
  const [open, setOpen] = useState(false);
  const [activated, setActivated] = useState(false);
  const [failed, setFailed] = useState(false);

  function toggleForm() {
    setActivated(true);
    setOpen(value => !value);
  }

  return <section id="article-sidebar-form" className={styles.sidebarForm} aria-labelledby="sidebar-form-title" data-form-status="ready">
    <h2 id="sidebar-form-title">لنتحدث عن شركتك</h2>
    <p>شارك فريق BSetup UAE نشاطك واحتياجاتك، لنناقش الخطوة المناسبة لمشروعك.</p>
    <button type="button" className={styles.sidebarFormButton} aria-expanded={open} aria-controls="sidebar-form-embed" onClick={toggleForm}>{open ? 'إخفاء نموذج التواصل' : 'افتح نموذج التواصل'}</button>
    <div id="sidebar-form-embed" className={styles.sidebarFormEmbed} hidden={!open} lang="ar" dir="rtl" aria-label="نموذج التواصل بالعربية مع BSetup UAE">
      {activated && !failed && <>
        <Script id="arabic-elfsight-platform" src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" onError={() => setFailed(true)} />
        <div className={`elfsight-app-${arabicContactWidgetId}`} data-elfsight-app-lazy />
      </>}
      {failed && <p role="alert">تعذّر تحميل النموذج. انتقل إلى طلب الاستشارة أو تواصل معنا عبر واتساب.</p>}
    </div>
    <Link prefetch={false} href={requestHref} className={styles.sidebarFormAlternative}>انتقل إلى طلب الاستشارة</Link>
  </section>;
}
