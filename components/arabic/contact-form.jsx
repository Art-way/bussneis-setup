'use client';

import { useState } from 'react';
import Script from 'next/script';
import styles from './service-pages.module.css';

export default function ArabicContactForm() {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  return <div className={styles.requestForm}>
    <p>أرسل تفاصيل نشاطك ووسيلة التواصل المناسبة عبر نموذج الاستقبال المعتمد بالموقع.</p>
    {!open ? <button className="ar-button" type="button" aria-expanded={false} aria-controls="arabic-request-widget" onClick={() => setOpen(true)}>افتح نموذج طلب الاستشارة <span aria-hidden="true">←</span></button> : <>
      <p className={styles.formHelp}>النموذج الحالي باللغة الإنجليزية، ويمكنك كتابة رسالتك بالعربية. لا ترفع بيانات بنكية أو وثائق هوية مع الاستفسار الأولي.</p>
      <Script id="arabic-elfsight-platform" src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" onError={() => setFailed(true)} />
    </>}
    <div id="arabic-request-widget" hidden={!open} lang="en" dir="ltr" aria-label="Consultation request form">{open && !failed && <div className="elfsight-app-400f8872-5eef-4484-9e5a-e8ffcbd88dca" data-elfsight-app-lazy />}</div>
    {failed && <p role="alert">تعذّر تحميل النموذج. يمكنك إرسال طلبك عبر واتساب أو البريد أدناه.</p>}
    <p className={styles.formPrivacy}>استخدم زر الإرسال داخل النموذج، وانتظر تأكيده. فتح النموذج وحده لا يعني إرسال طلب.</p>
    <div className={styles.formAlternatives}><a href="https://wa.me/971507706746" target="_blank" rel="noopener noreferrer">تواصل عبر واتساب ↗</a><a href="mailto:info@businesssetupuae.ae">تواصل بالبريد الإلكتروني</a></div>
    <noscript><p>لتعبئة نموذج Elfsight فعّل JavaScript، أو استخدم واتساب أو البريد الإلكتروني مباشرة.</p></noscript>
  </div>;
}
