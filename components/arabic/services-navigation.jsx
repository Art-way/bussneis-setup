import NextLink from './link';
import { arabicServiceNavigation } from './navigation';

export default function ServicesNavigation({ LinkComponent = NextLink, onNavigate }) {
  const Link = LinkComponent;
  const navigate = event => {
    event.currentTarget.closest('details').open = false;
    onNavigate?.();
  };
  // The native document uses ordinary HTML details and its own tiny event script.
  const handlers = onNavigate ? { onClick: navigate } : {};
  return <details className="ar-services-menu">
    <summary>خدماتنا <span aria-hidden="true">⌄</span></summary>
    <div className="ar-services-panel">
      <div className="ar-services-panel-top"><Link href="/ar/الخدمات/" prefetch={false} {...handlers}>استكشف كل خدماتنا <span aria-hidden="true">←</span></Link></div>
      <div className="ar-services-menu-grid">{arabicServiceNavigation.map(group => <div className={`ar-services-menu-group ${group.links.length > 5 ? 'ar-services-menu-dubai' : ''}`} key={group.path}>
        <Link href={group.path} prefetch={false} className="ar-services-menu-parent" {...handlers}>{group.title}</Link>
        {group.links.length > 0 && <ul>{group.links.map(link => <li key={link.path}><Link href={link.path} prefetch={false} {...handlers}>{link.label}</Link></li>)}</ul>}
      </div>)}</div>
    </div>
  </details>;
}
