// In: components/common/ElfsightForm.jsx
"use client"; // هذا ضروري لأننا نستخدم سكربت خارجي

import Script from 'next/script'; // استيراد مكون السكربت من Next.js

const ElfsightForm = () => {
    return (
        <>
            {/* 1. تحميل السكربت الخاص بـ Elfsight مرة واحدة */}
            <Script 
                src="https://elfsightcdn.com/platform.js" 
                strategy="afterInteractive" // لتحميل السكربت بعد تحميل الصفحة الأساسية
                defer 
            />
            
            {/* 2. عرض حاوية الفورم */}
            {/* لاحظ أننا استبدلنا class بـ className */}
            <div 
                className="elfsight-app-400f8872-5eef-4484-9e5a-e8ffcbd88dca" 
                data-elfsight-app-lazy
            ></div>
        </>
    );
};

export default ElfsightForm;