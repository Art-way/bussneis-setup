const buttonStyle = {
  position: 'fixed',
  left: 'clamp(12px, 3vw, 28px)',
  bottom: 'calc(clamp(12px, 3vw, 26px) + env(safe-area-inset-bottom, 0px))',
  zIndex: 40,
  display: 'grid',
  placeItems: 'center',
  width: 'clamp(48px, 6vw, 56px)',
  height: 'clamp(48px, 6vw, 56px)',
  borderRadius: '50%',
  backgroundColor: '#14743e',
  color: '#fff',
  boxShadow: '0 4px 16px #13131330',
};

export default function WhatsAppButton({ language = 'en' }) {
  return <a
    href="https://wa.me/971507706746"
    target="_blank"
    rel="noopener noreferrer"
    style={buttonStyle}
    aria-label={language === 'ar' ? 'تواصل معنا عبر واتساب' : 'Chat with us on WhatsApp'}
    data-floating-whatsapp
  >
    <svg width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d="M21 11.7a8.9 8.9 0 0 1-13 7.9L3 21l1.4-4.8A8.9 8.9 0 1 1 21 11.7Z" />
      <path d="M8.7 7.4c-.6 0-1 .5-1 1.1 0 3.6 3 6.6 6.6 6.6.6 0 1.1-.5 1.1-1v-.8l-2.1-.8-.8.8a5.2 5.2 0 0 1-3-3l.8-.8-.8-2.1h-.8Z" />
    </svg>
  </a>;
}
