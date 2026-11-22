'use client';

import { useState } from 'react';
import LazyArabicContactWidget from './lazy-contact-widget';
import styles from './service-pages.module.css';

export default function ArabicContactForm({ initiallyOpen = false, costRequest = false }) {
  const [open, setOpen] = useState(initiallyOpen);
  return <div className={styles.requestForm}>
    <p>{costRequest ? 'اختر الخدمة وموقع التأسيس، واكتب نشاطك واحتياجاتك في خانة التفاصيل. بعد ذلك أضف بريدك ورقمك وأرسل الطلب للفريق.' : 'أرسل تفاصيل نشاطك ووسيلة التواصل المناسبة عبر نموذج الاستقبال المعتمد بالموقع.'}</p>
    {!open ? <button className="ar-button" type="button" aria-expanded={false} aria-controls="arabic-request-widget" onClick={() => setOpen(true)}>افتح نموذج طلب الاستشارة <span aria-hidden="true">←</span></button> : <>
      <p className={styles.formHelp}>املأ تفاصيل المشروع ثم بيانات التواصل في الخطوة التالية. لا ترفع بيانات بنكية أو وثائق هوية مع الاستفسار الأولي.</p>
    </>}
    {open && <LazyArabicContactWidget id="arabic-request-widget" />}
    <p className={styles.formPrivacy}>استخدم زر الإرسال داخل النموذج، وانتظر تأكيده. فتح النموذج وحده لا يعني إرسال طلب.</p>
    <div className={styles.formAlternatives}><a href="https://wa.me/971507706746" target="_blank" rel="noopener noreferrer">تواصل عبر واتساب ↗</a><a href="mailto:info@businesssetupuae.ae">تواصل بالبريد الإلكتروني</a></div>
    <noscript><p>لتعبئة نموذج Elfsight فعّل JavaScript، أو استخدم واتساب أو البريد الإلكتروني مباشرة.</p></noscript>
  </div>;
}
