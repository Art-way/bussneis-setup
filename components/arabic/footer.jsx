import NextLink from '@/components/arabic/link';
import Icon from './icon';

export default function Footer({ LinkComponent = NextLink }) {
  const Link = LinkComponent;
  return <footer className="ar-footer"><div className="ar-container">
    <div className="ar-footer-top"><div><span className="ar-eyebrow">الخطوة القادمة تبدأ بمحادثة</span><h2>فكرتك تستحق<br />بداية مدروسة<span>.</span></h2></div><Link prefetch={false} href="/ar/contact/" className="ar-button">خلّينا نرسم الطريق <Icon /></Link></div>
    <div className="ar-footer-grid"><div><b className="ar-footer-wordmark" lang="en">BUSINESS SETUP UAE</b><p>نساعدك على فهم خيارات تأسيس شركتك في الإمارات، واتخاذ الخطوة المناسبة لنشاطك.</p><a className="ar-footer-email" href="mailto:info@businesssetupuae.ae">info@businesssetupuae.ae</a></div><div><h3>اكتشف خدماتنا</h3><Link prefetch={false} href="/ar/services/mainland/">تأسيس في البر الرئيسي</Link><Link prefetch={false} href="/ar/services/free-zone/">تأسيس في المناطق الحرة</Link><Link prefetch={false} href="/ar/services/business-support/">ما بعد التأسيس</Link></div><div><h3>مساحة المعرفة</h3><Link prefetch={false} href="/ar/blog/">دليل الأعمال</Link><Link prefetch={false} href="/ar/authors/">فريق التحرير</Link><Link prefetch={false} href="/ar/editorial-policy/">سياسة التحرير والمصادر</Link></div><div><h3>نتواصل بالعربي</h3><a href="tel:+971507706746" dir="ltr">+971 50 770 6746</a><a href="https://wa.me/971507706746" target="_blank" rel="noopener noreferrer">محادثة على واتساب <Icon name="northeast" size={16} /></a><Link prefetch={false} href="/ar/contact/">وسائل التواصل</Link></div></div>
    <div className="ar-footer-bottom"><span>© {new Date().getFullYear()} Business Setup UAE. جميع الحقوق محفوظة.</span><div><Link prefetch={false} href="/privacy-policy/" hrefLang="en">الخصوصية <small>(EN)</small></Link><Link prefetch={false} href="/terms-and-conditions/" hrefLang="en">الشروط <small>(EN)</small></Link><Link prefetch={false} href="/" lang="en" hrefLang="en">English version ↗</Link></div></div>
  </div></footer>;
}
