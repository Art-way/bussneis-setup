import Link from '@/components/arabic/link';

export default function NotFound() {
  return <section className="ar-section"><div className="ar-container ar-error"><span className="ar-eyebrow">404 · صفحة غير موجودة</span><h1>خلّينا نرجع للطريق الصحيح.</h1><p>قد يكون الرابط تغير، أو أن الصفحة لم تعد موجودة.</p><Link className="ar-button" href="/ar/">العودة للرئيسية ←</Link><Link className="ar-text-link" href="/ar/blog/">تصفح دليل الأعمال</Link></div></section>;
}
