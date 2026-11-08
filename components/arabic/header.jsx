'use client';

import Link from '@/components/arabic/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Icon from './icon';

import Brand from './brand';
import ServicesNavigation from './services-navigation';
import { arabicNavigationLinks as links } from './navigation';

export { default as Brand } from './brand';

export default function Header() {
  const path = decodeURI(usePathname());
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const menu = document.querySelector('.ar-services-menu');
    const closeOutside = event => { if (menu && !menu.contains(event.target)) menu.open = false; };
    const closeEscape = event => {
      if (event.key !== 'Escape') return;
      if (menu?.open) { menu.open = false; menu.querySelector('summary').focus(); }
      else if (open) { setOpen(false); document.querySelector('.ar-menu-button')?.focus(); }
    };
    document.addEventListener('click', closeOutside);
    document.addEventListener('keydown', closeEscape);
    return () => { document.removeEventListener('click', closeOutside); document.removeEventListener('keydown', closeEscape); };
  }, [open]);
  useEffect(() => {
    if (path !== '/ar' && path !== '/ar/') return;
    const hero = document.querySelector('.ar-hero');
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Keep the SSR artwork visible and still through its first presentation.
    // Hydration already follows the initial content; two frames defer the
    // optional decorative motion beyond that rendering opportunity.
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => hero.classList.add('ar-motion-ready'));
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      hero.classList.remove('ar-motion-ready');
    };
  }, [path]);
  return <>
    <a className="ar-skip" href="#main-content">انتقل إلى المحتوى</a>
    <div className="ar-topline"><div className="ar-container"><span>BSetup UAE · خبرة في التأسيس منذ 2021 <span aria-hidden="true">↗</span></span><a href="tel:+971507706746" dir="ltr">+971 50 770 6746</a></div></div>
    <header className="ar-header"><div className="ar-container ar-header-inner">
      <Link prefetch={false} href="/ar/" onClick={() => setOpen(false)}><Brand /></Link>
      <nav className={`ar-nav ${open ? 'is-open' : ''}`} id="arabic-navigation" aria-label="التنقل الرئيسي">{links.map(([href, label]) => href === '/ar/الخدمات/' ? <ServicesNavigation key={href} onNavigate={() => setOpen(false)} /> : <Link prefetch={false} key={href} href={href} onClick={() => setOpen(false)} aria-current={(href === '/ar/' ? path === '/ar' || path === '/ar/' : path.startsWith(href.slice(0, -1))) ? 'page' : undefined}>{label}</Link>)}<Link prefetch={false} className="ar-mobile-contact" href="/ar/تواصل-معنا/" onClick={() => setOpen(false)}>تحدث معنا</Link></nav>
      <div className="ar-header-actions"><Link prefetch={false} className="ar-language" href="/" lang="en" hrefLang="en">EN <Icon name="globe" size={16} /></Link><Link prefetch={false} href="/ar/تواصل-معنا/" className="ar-button ar-header-cta">نخطط لبدايتك <Icon size={17} /></Link><button className="ar-menu-button" aria-controls="arabic-navigation" aria-expanded={open} aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'} onClick={() => setOpen(!open)}><span /><span /></button></div>
    </div></header>
  </>;
}
