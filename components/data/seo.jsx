// In: components/data/seo.jsx

"use client";
import Head from 'next/head';
import { useEffect } from "react";

// --- UPDATED: The component now accepts metaDescription and canonicalUrl ---
const SEO = ({ pageTitle, metaDescription, canonicalUrl }) => {
  const siteName = "BSetup UAE";
  const fullTitle = `${pageTitle} | ${siteName}`;
  const siteUrl = 'https://businesssetupuae.ae';

  useEffect(() => {
    document.title = fullTitle;
  }, [fullTitle]);

  return (
    <Head>
      <title>{fullTitle}</title>
      {metaDescription && <meta name="description" content={metaDescription} />}
      
      {/* --- ADDED: Canonical URL for preventing duplicate content issues --- */}
      {canonicalUrl && <link rel="canonical" href={`${siteUrl}${canonicalUrl}`} />}

      {/* --- ADDED: Open Graph tags for better social media sharing --- */}
      <meta property="og:title" content={fullTitle} />
      {metaDescription && <meta property="og:description" content={metaDescription} />}
      <meta property="og:type" content="website" />
      {canonicalUrl && <meta property="og:url" content={`${siteUrl}${canonicalUrl}`} />}
      <meta property="og:image" content={`${siteUrl}/assets/brand/bsetup-uae-og.png`} />
      <meta property="og:site_name" content={siteName} />
    </Head>
  );
};

export default SEO;