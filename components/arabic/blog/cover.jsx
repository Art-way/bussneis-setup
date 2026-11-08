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
      <g opacity={category === 'company-formation' ? 1 : .14}>
      <path d="M78 326V184L140 161V326M140 215L191 231V326M191 326V142L236 118V326M236 164L266 179V326" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeOpacity=".45" strokeWidth="2" />
      <path d="M298 326V111H352V326M311 111V83H339V111M324 83V43" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeOpacity=".65" strokeWidth="2" />
      <path d="M381 326V222L427 189V326M427 228L475 245V326M501 326V179L554 197V326" fill="currentColor" fillOpacity=".07" stroke="currentColor" strokeOpacity=".4" strokeWidth="2" />
      <path d="M311 141H339M311 160H339M311 179H339M311 198H339M311 217H339M311 236H339M311 255H339M311 274H339M311 293H339" stroke="currentColor" strokeOpacity=".35" />
      </g>
      <path d="M47 89H119M83 53V125M520 91H562M541 70V112" stroke="currentColor" strokeOpacity=".35" />
      {category === 'costs-planning' && <g stroke="currentColor" strokeWidth="2"><g transform="translate(156 87) rotate(-6 100 120)"><rect width="205" height="240" rx="10" fill="#fff8ee" /><path d="M30 41H111M30 72H172M30 97H172M30 123H107M30 179H173" strokeOpacity=".45" /><path d="M31 208H80M138 208H172" strokeWidth="4" strokeLinecap="round" /><circle cx="158" cy="37" r="10" strokeOpacity=".55" /></g><path d="M407 326V266H443V326M459 326V230H495V326M511 326V187H547V326" fill="currentColor" fillOpacity=".14" /><path d="M405 237L460 199L510 166L546 135M528 135H546V153" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></g>}
      {category === 'after-setup' && <g stroke="currentColor" strokeWidth="2"><rect x="143" y="93" width="262" height="234" rx="12" fill="#fafafa" /><path d="M143 148H405M195 77V109M353 77V109" strokeWidth="4" strokeLinecap="round" /><g strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M178 185L186 193L201 174M226 185H365M178 230L186 238L201 219M226 230H365M178 275L186 283L201 264M226 275H328" /></g><path d="M474 207L529 228V268Q529 306 474 330Q419 306 419 268V228Z" fill="#f4f4f4" /><path d="M448 266L466 284L501 245" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></g>}
      {category === 'free-zones' && <g stroke="currentColor" strokeWidth="2"><path d="M98 155L201 118L277 148L277 309L201 279L98 316ZM201 118V279" fill="#fff8ee" fillOpacity=".75" /><path d="M123 182L174 163M123 208L174 189M224 184L252 194M224 212L252 222M124 266L173 249" strokeOpacity=".35" /><path d="M224 256C270 229 300 231 334 211" strokeDasharray="5 7" strokeLinecap="round" /><circle cx="411" cy="223" r="91" fill="#fff8ee" /><circle cx="411" cy="223" r="72" strokeOpacity=".25" /><path d="M411 155L429 205L479 223L429 241L411 291L393 241L343 223L393 205Z" fill="currentColor" fillOpacity=".8" /><circle cx="411" cy="223" r="11" fill="#fff8ee" /></g>}
      <path d="M53 365H587" stroke="currentColor" strokeWidth="2" />
    </svg>
    <span className="ar-editorial-cover-caption" dir="ltr">BUSINESS / UAE</span>
    <span className="ar-editorial-cover-corner">↗</span>
  </div>;
}
