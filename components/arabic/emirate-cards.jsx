import NextLink from './link';
import { availableEmirates } from './market-segments';

export default function EmirateCards({ LinkComponent = NextLink }) {
  const Link = LinkComponent;
  return <div className="ar-region-grid">{availableEmirates.map((emirate, index) => <article className="ar-region-card" key={emirate.slug}>
    <span className="ar-eyebrow">0{index + 1} · {emirate.name}</span>
    <h3><Link href={emirate.path} prefetch={false}>{emirate.title}</Link></h3>
    <p>{emirate.slug === 'ras-al-khaimah' ? 'خدمة المنطقة الحرة، لمراجعة النشاط والمقر والمستندات وبنود عرض التأسيس.' : `خدمات تأسيس الشركات في ${emirate.name}، ومتطلبات الملف والخطوات والأدلة المرتبطة بها.`}</p>
    <Link href={emirate.path} prefetch={false} className="ar-text-link">استكشف {emirate.name} <span aria-hidden="true">←</span></Link>
  </article>)}</div>;
}
