import NextLink from '@/components/arabic/link';
import Icon from './icon';
import { arabicLegalPaths, costRequestPath } from './routes.mjs';
import { arabicServiceNavigation } from './navigation';

export default function Footer({ LinkComponent = NextLink }) {
  const Link = LinkComponent;
  return <footer className="ar-footer"><div className="ar-container">
    <div className="ar-footer-top"><div><span className="ar-eyebrow">الخطوة القادمة تبدأ بمحادثة</span><h2>فكرتك تستحق<br />بداية مدروسة<span>.</span></h2></div><Link prefetch={false} href="/ar/تواصل-معنا/" className="ar-button">خلّينا نرسم الطريق <Icon /></Link></div>
    <div className="ar-footer-grid"><div><b className="ar-footer-wordmark" lang="en"><img src="/assets/brand/bsetup-uae-light.svg" width="200" height="55" alt="BSetup UAE" loading="lazy" /></b><p>نساعدك على فهم خيارات تأسيس شركتك في الإمارات، واتخاذ الخطوة المناسبة لنشاطك.</p><a className="ar-footer-email" href="mailto:info@businesssetupuae.ae">info@businesssetupuae.ae</a></div><div><h3>خدماتنا</h3>{arabicServiceNavigation.map(service => <Link prefetch={false} key={service.path} href={service.path}>{service.title}</Link>)}<Link prefetch={false} href="/ar/الخدمات/">كل الخدمات</Link></div><div><h3>مساحة المعرفة</h3><Link prefetch={false} href={costRequestPath}>طلب مراجعة التكلفة</Link><Link prefetch={false} href="/ar/المدونة/">المدونة</Link><Link prefetch={false} href="/ar/المؤلفون/">فريق التحرير</Link><Link prefetch={false} href="/ar/سياسة-التحرير/">سياسة التحرير والمصادر</Link></div><div><h3>نتواصل بالعربي</h3><a href="tel:+971507706746" dir="ltr">+971 50 770 6746</a><a href="https://wa.me/971507706746" target="_blank" rel="noopener noreferrer">محادثة على واتساب <Icon name="northeast" size={16} /></a><Link prefetch={false} href="/ar/تواصل-معنا/">وسائل التواصل</Link></div></div>
    <div className="ar-footer-bottom"><span>© {new Date().getFullYear()} BSetup UAE. جميع الحقوق محفوظة.</span><div><Link prefetch={false} href={arabicLegalPaths['privacy-policy']}>سياسة الخصوصية</Link><Link prefetch={false} href={arabicLegalPaths['terms-and-conditions']}>الشروط والأحكام</Link><Link prefetch={false} href="/" lang="en" hrefLang="en">English version ↗</Link></div></div>
  </div></footer>;
}
