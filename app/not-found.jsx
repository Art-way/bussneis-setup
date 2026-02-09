//import ErrorPage from '@/components/pages/error';
//import React from 'react';

//const NotFound = () => {
//    return (
    //    <>
  //          <ErrorPage />         
      //  </>
   // );
//};

//export default NotFound;

// app/not-found.jsx
import { redirect } from 'next/navigation';

export default function NotFound() {
  // هذا الأمر سيقوم بتوجيه المستخدم فوراً للصفحة الرئيسية
  redirect('/');
}