const categoryClasses = {
  'free-zones': 'ar-editorial-cover-free-zones',
  'costs-planning': 'ar-editorial-cover-costs-planning',
  'after-setup': 'ar-editorial-cover-after-setup',
};

export default function EditorialCover({ category = 'company-formation', className = '' }) {
  return <div className={`ar-editorial-cover ${categoryClasses[category] || ''} ${className}`} data-cover="" aria-hidden="true">
    <svg viewBox="0 0 640 400" fill="none" focusable="false">
      <circle cx="440" cy="140" r="114" className="ar-editorial-cover-sun" />
      <circle cx="440" cy="140" r="145" stroke="currentColor" opacity=".14" />
      <path d="M0 326H640M0 350H640M160 400V278M480 400V278" stroke="currentColor" opacity=".12" />
      <path d="M78 326V184L140 161V326M140 215L191 231V326M191 326V142L236 118V326M236 164L266 179V326" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeOpacity=".45" strokeWidth="2" />
      <path d="M298 326V111H352V326M311 111V83H339V111M324 83V43" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeOpacity=".65" strokeWidth="2" />
      <path d="M381 326V222L427 189V326M427 228L475 245V326M501 326V179L554 197V326" fill="currentColor" fillOpacity=".07" stroke="currentColor" strokeOpacity=".4" strokeWidth="2" />
      <path d="M311 141H339M311 160H339M311 179H339M311 198H339M311 217H339M311 236H339M311 255H339M311 274H339M311 293H339" stroke="currentColor" strokeOpacity=".35" />
      <path d="M47 89H119M83 53V125M520 91H562M541 70V112" stroke="currentColor" strokeOpacity=".35" />
      {category === 'costs-planning' && <g transform="translate(165 139) rotate(-9)"><rect width="155" height="166" rx="8" fill="#faf6e9" stroke="currentColor" strokeWidth="2" /><path d="M27 39H125M27 65H125M27 91H73M27 128H51M64 128H88M101 128H125" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></g>}
      {category === 'after-setup' && <g transform="translate(165 139)"><rect width="155" height="166" rx="8" fill="#f3f4e9" stroke="currentColor" strokeWidth="2" /><path d="M29 43L38 52L54 32M72 43H125M29 84L38 93L54 73M72 84H125M29 125L38 134L54 114M72 125H125" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></g>}
      {category === 'free-zones' && <g><circle cx="224" cy="218" r="65" fill="#f6f3e8" stroke="currentColor" strokeWidth="2" /><path d="M224 167L237 206L276 218L237 230L224 269L211 230L172 218L211 206Z" fill="currentColor" fillOpacity=".75" /><circle cx="224" cy="218" r="8" fill="#f6f3e8" /></g>}
      <path d="M53 365H587" stroke="currentColor" strokeWidth="2" />
    </svg>
    <span className="ar-editorial-cover-caption" dir="ltr">BUSINESS / UAE</span>
    <span className="ar-editorial-cover-corner">↗</span>
  </div>;
}
