'use client';

import { useState } from 'react';
import Link from '../link';
import styles from './blog.module.css';

export default function ArticleSidebarForm({ embedUrl = null, requestHref }) {
  const [open, setOpen] = useState(false);

  return <section id="article-sidebar-form" className={styles.sidebarForm} aria-labelledby="sidebar-form-title" data-form-status={embedUrl ? 'ready' : 'pending'}>
    <h2 id="sidebar-form-title">لنتحدث عن شركتك</h2>
    <p>شارك فريق BSetup UAE نشاطك واحتياجاتك، لنناقش الخطوة المناسبة لمشروعك.</p>
    {embedUrl ? <>
      <button type="button" className={styles.sidebarFormButton} aria-expanded={open} aria-controls="sidebar-form-embed" onClick={() => setOpen(true)}>افتح نموذج التواصل</button>
      <div id="sidebar-form-embed" hidden={!open}>
        {open && <iframe src={embedUrl} title="نموذج التواصل بالعربية مع BSetup UAE" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />}
      </div>
      <Link prefetch={false} href={requestHref} className={styles.sidebarFormAlternative}>انتقل إلى طلب الاستشارة</Link>
    </> : <Link prefetch={false} href={requestHref} className={styles.sidebarFormButton}>اطلب استشارة <span aria-hidden="true">←</span></Link>}
  </section>;
}
