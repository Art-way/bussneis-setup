import Brand from './brand';
import Icon from './icon';
import NativeAnchor from './native-anchor';
import { arabicNavigationLinks } from './navigation';

export default function NativeHeader() {
  return <>
    <NativeAnchor className="ar-skip" href="#main-content">انتقل إلى المحتوى</NativeAnchor>
    <div className="ar-topline"><div className="ar-container"><span>من مصر، إلى فرص أوسع في الإمارات <span aria-hidden="true">↗</span></span><NativeAnchor href="tel:+971507706746" dir="ltr">+971 50 770 6746</NativeAnchor></div></div>
    <header className="ar-header"><div className="ar-container ar-header-inner">
      <NativeAnchor href="/ar/"><Brand /></NativeAnchor>
      <nav className="ar-nav " id="arabic-navigation" aria-label="التنقل الرئيسي">{arabicNavigationLinks.map(([href, label]) => <NativeAnchor key={href} href={href} aria-current={href === '/ar/' ? 'page' : undefined}>{label}</NativeAnchor>)}<NativeAnchor className="ar-mobile-contact" href="/ar/contact/">تحدث معنا</NativeAnchor></nav>
      <div className="ar-header-actions"><NativeAnchor className="ar-language" href="/" lang="en" hrefLang="en">EN <Icon name="globe" size={16} /></NativeAnchor><NativeAnchor href="/ar/contact/" className="ar-button ar-header-cta">نخطط لبدايتك <Icon size={17} /></NativeAnchor><button className="ar-menu-button" aria-controls="arabic-navigation" aria-expanded="false" aria-label="فتح القائمة"><span /><span /></button></div>
    </div></header>
  </>;
}
