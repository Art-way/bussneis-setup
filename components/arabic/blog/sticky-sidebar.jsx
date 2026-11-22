'use client';

import { useEffect, useRef } from 'react';
import styles from './blog.module.css';

export default function StickyArticleSidebar({ children }) {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (!sidebar) return;
    // Let tall sidebars scroll with the page before their bottom becomes sticky.
    const measure = () => sidebar.style.setProperty('--sidebar-height', `${sidebar.offsetHeight}px`);
    const observer = new ResizeObserver(measure);
    measure();
    observer.observe(sidebar);
    return () => observer.disconnect();
  }, []);

  return <aside ref={sidebarRef} className={styles.articleSidebar} aria-label="تصنيفات المدونة وخدمات الموقع">{children}</aside>;
}
