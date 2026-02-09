// In: app/providers.jsx
"use client";

import { useEffect } from 'react';
import SwitchTab from '@/components/pages/common/dark-light';

export default function Providers({ children }) {
  useEffect(() => {
    // تحميل بوتستراب فقط في المتصفح
    require('bootstrap/dist/js/bootstrap.min.js');
  }, []);

  return (
    <>
      <SwitchTab />
      {children}
    </>
  );
}