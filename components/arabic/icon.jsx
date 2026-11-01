export default function Icon({ name = 'arrow', size = 24, ...props }) {
  const paths = {
    arrow: <><path d="M19 12H5m6 6-6-6 6-6" /></>,
    northeast: <><path d="M17 17V7H7m10 0L7 17" /></>,
    building: <><path d="M4 21V7l8-4v18M12 9h8v12M2 21h20M8 8v2m0 3v2m0 3v1m8-7v2m0 3v2" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
    briefcase: <><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V4h8v3M3 12l9 4 9-4m-9 2v4" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    spark: <><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z" /></>,
    book: <><path d="M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1m0-15c3-2 7-2 10-1v15c-3-1-7-1-10 1V5Z" /></>,
    shield: <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Z" /><path d="m8 12 3 3 5-6" /></>,
    mail: <><rect x="2" y="4" width="20" height="16" rx="3" /><path d="m2 6 10 7L22 6" /></>,
    phone: <path d="m5 3 4 1 1 5-3 2c2 3 3 4 6 6l2-3 5 1 1 4c0 2-3 3-5 2C9 19 5 15 3 8 2 6 3 3 5 3Z" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>;
}
