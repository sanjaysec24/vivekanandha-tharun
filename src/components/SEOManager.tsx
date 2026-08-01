import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useRouter } from '../lib/router';

export interface PageSEOConfig {
  title?: string;
  metaTitle?: string;
  pageTitle?: string;
  description?: string;
  metaDescription?: string;
  pageDescription?: string;
  keywords?: string | string[];
  robots?: string;
  canonicalUrl?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  og_image?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitter_image?: string;
}

export interface CMSSEOData {
  title?: string;
  siteTitle?: string;
  defaultTitle?: string;
  metaTitle?: string;
  titleTemplate?: string;

  description?: string;
  siteDescription?: string;
  defaultDescription?: string;
  metaDescription?: string;

  keywords?: string | string[];
  author?: string;
  robots?: string;
  themeColor?: string;
  theme_color?: string;
  siteUrl?: string;
  baseUrl?: string;
  canonicalUrl?: string;

  favicon?: string;
  faviconUrl?: string;
  appleTouchIcon?: string;
  apple_touch_icon?: string;
  androidIcon?: string;
  android_icon?: string;
  icon192?: string;
  icon512?: string;

  ogTitle?: string;
  og_title?: string;
  ogDescription?: string;
  og_description?: string;
  ogImage?: string;
  og_image?: string;
  ogType?: string;
  og_type?: string;

  twitterTitle?: string;
  twitter_title?: string;
  twitterDescription?: string;
  twitter_description?: string;
  twitterImage?: string;
  twitter_image?: string;
  twitterCard?: string;
  twitter_card?: string;

  organizationName?: string;
  schoolName?: string;
  logo?: string;
  telephone?: string;
  phone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  } | string;
  geo?: {
    latitude?: number | string;
    longitude?: number | string;
  };
  sameAs?: string[];

  pages?: Record<string, PageSEOConfig>;
}

const HARDCODED_DEFAULTS = {
  siteTitle: 'Lindenwood Academy | Premium Montessori & Elementary School',
  siteDescription: 'Lindenwood Academy provides a modern Montessori and holistic primary education nurturing curious minds, strong values, and future leaders.',
  keywords: 'Lindenwood Academy, Montessori School, Primary Education, Kindergarten, Elementary School, Admissions, SPECTRA, School',
  author: 'Lindenwood Academy',
  robots: 'index, follow',
  themeColor: '#3B231A',
  ogImage: '/school_boy.png',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  orgName: 'Lindenwood Academy',
  phone: '+91 98400 12345',
  email: 'admissions@lindenwoodacademy.edu',
  address: {
    streetAddress: '123 Education Lane, Academic Enclave',
    addressLocality: 'Chennai',
    addressRegion: 'Tamil Nadu',
    postalCode: '600001',
    addressCountry: 'IN',
  },
  geo: {
    latitude: '13.0827',
    longitude: '80.2707',
  },
  sameAs: [
    'https://facebook.com/lindenwoodacademy',
    'https://instagram.com/lindenwoodacademy',
    'https://youtube.com/@lindenwoodacademy',
  ],
};

const PAGE_DEFAULTS: Record<string, { title: string; description: string; label: string }> = {
  home: {
    title: 'Lindenwood Academy | Premium Montessori & Primary Education',
    description: 'Welcome to Lindenwood Academy. Discover our joyful Montessori learning environment, holistic academic curriculum, and state-of-the-art campus.',
    label: 'Home',
  },
  about: {
    title: 'About Us & Educational Philosophy | Lindenwood Academy',
    description: "Learn about Lindenwood Academy's rich heritage, educational philosophy, visionary leadership, and commitment to nurturing lifelong learners.",
    label: 'About Us',
  },
  academics: {
    title: 'Academics & Curriculum (Pre-KG to Grade 5) | Lindenwood Academy',
    description: 'Explore our child-centric Montessori and primary academic curriculum designed for cognitive expansion, critical thinking, and character building.',
    label: 'Academics',
  },
  admissions: {
    title: 'Admissions 2027-2028 | Apply Online | Lindenwood Academy',
    description: "Begin your child's educational journey at Lindenwood Academy. View admission requirements, fee structure, and submit an application online.",
    label: 'Admissions',
  },
  activities: {
    title: 'Extracurricular Activities & Annual Day SPECTRA | Lindenwood Academy',
    description: 'Discover vibrant extracurricular activities, sports, cultural arts, STEM clubs, and our grand annual day event SPECTRA at Lindenwood Academy.',
    label: 'Activities',
  },
  gallery: {
    title: 'Photo Gallery & Campus Memories | Lindenwood Academy',
    description: 'Browse photos and event highlights from Lindenwood Academy campus life, celebrations, sports days, and student achievements.',
    label: 'Gallery',
  },
  contact: {
    title: 'Contact Us & Campus Location | Lindenwood Academy',
    description: 'Get in touch with Lindenwood Academy. Find campus address, contact numbers, email, visiting hours, and Google Maps directions.',
    label: 'Contact Us',
  },
};

// DOM Helper functions
function updateMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  if (!content) return;
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateLinkTag(rel: string, href: string, attributes?: Record<string, string>) {
  if (!href) return;
  let selector = `link[rel="${rel}"]`;
  if (attributes?.sizes) {
    selector += `[sizes="${attributes.sizes}"]`;
  }
  let element = document.querySelector(selector) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
  if (attributes) {
    Object.entries(attributes).forEach(([k, v]) => {
      element!.setAttribute(k, v);
    });
  }
}

function updateJsonLdScript(id: string, jsonObject: object) {
  let element = document.querySelector(`script[id="${id}"]`) as HTMLScriptElement | null;
  if (!element) {
    element = document.createElement('script');
    element.setAttribute('type', 'application/ld+json');
    element.setAttribute('id', id);
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(jsonObject, null, 2);
}

function normalizeKeywords(val?: string | string[]): string {
  if (!val) return '';
  if (Array.isArray(val)) return val.join(', ');
  return String(val);
}

function getPageKeyFromPath(path: string): string {
  if (!path || path === '/') return 'home';
  const clean = path.split('?')[0].split('#')[0];
  if (clean.startsWith('/gallery')) return 'gallery';
  const segment = clean.replace(/^\//, '').toLowerCase();
  return segment || 'home';
}

export default function SEOManager() {
  const { path } = useRouter();
  const [cmsSeo, setCmsSeo] = useState<CMSSEOData | null>(null);

  // Subscribe to website_cms/seo in Firestore real-time
  useEffect(() => {
    if (!db) return;
    const docRef = doc(db, 'website_cms', 'seo');
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      if (snapshot.exists()) {
        setCmsSeo(snapshot.data() as CMSSEOData);
      } else {
        setCmsSeo(null);
      }
    }, (error) => {
      console.warn("Firestore website_cms/seo subscription warning:", error);
    });

    return () => unsubscribe();
  }, []);

  // Update SEO Meta, Canonical, Socials & JSON-LD Schemas on path or cmsSeo change
  useEffect(() => {
    const pageKey = getPageKeyFromPath(path);
    const pageDefault = PAGE_DEFAULTS[pageKey] || {
      title: `${HARDCODED_DEFAULTS.siteTitle}`,
      description: HARDCODED_DEFAULTS.siteDescription,
      label: pageKey.charAt(0).toUpperCase() + pageKey.slice(1),
    };

    // Look for page-specific config in CMS data (support multiple key formats: pages.about, pages['/about'], etc.)
    const pagesMap = cmsSeo?.pages || {};
    const pageConfig: PageSEOConfig | undefined = 
      pagesMap[pageKey] || 
      pagesMap[`/${pageKey}`] || 
      pagesMap[path] || 
      pagesMap[path.toLowerCase()];

    // Global CMS Fallbacks
    const globalTitle = cmsSeo?.siteTitle || cmsSeo?.defaultTitle || cmsSeo?.title || cmsSeo?.metaTitle || HARDCODED_DEFAULTS.siteTitle;
    const globalDescription = cmsSeo?.siteDescription || cmsSeo?.defaultDescription || cmsSeo?.description || cmsSeo?.metaDescription || HARDCODED_DEFAULTS.siteDescription;
    const globalKeywords = normalizeKeywords(cmsSeo?.keywords) || HARDCODED_DEFAULTS.keywords;
    const globalAuthor = cmsSeo?.author || HARDCODED_DEFAULTS.author;
    const globalRobots = cmsSeo?.robots || HARDCODED_DEFAULTS.robots;
    const globalThemeColor = cmsSeo?.themeColor || cmsSeo?.theme_color || HARDCODED_DEFAULTS.themeColor;
    const globalOgImage = cmsSeo?.ogImage || cmsSeo?.og_image || cmsSeo?.logo || HARDCODED_DEFAULTS.ogImage;
    const globalOgType = cmsSeo?.ogType || cmsSeo?.og_type || HARDCODED_DEFAULTS.ogType;
    const globalTwitterCard = cmsSeo?.twitterCard || cmsSeo?.twitter_card || HARDCODED_DEFAULTS.twitterCard;

    // Site Base URL
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://lindenwoodacademy.edu';
    const rawSiteUrl = cmsSeo?.siteUrl || cmsSeo?.baseUrl || cmsSeo?.canonicalUrl || origin;
    const siteBaseUrl = rawSiteUrl.endsWith('/') ? rawSiteUrl.slice(0, -1) : rawSiteUrl;
    const canonicalUrl = pageConfig?.canonicalUrl || pageConfig?.canonical || `${siteBaseUrl}${path === '/' ? '' : path}`;

    // Resolved Page Values (Page specific -> Global CMS -> Hardcoded Default)
    let effectiveTitle = pageConfig?.title || pageConfig?.metaTitle || pageConfig?.pageTitle;
    if (!effectiveTitle) {
      if (cmsSeo?.titleTemplate) {
        effectiveTitle = cmsSeo.titleTemplate.replace('%s', pageDefault.label);
      } else {
        effectiveTitle = pageDefault.title;
      }
    }

    const effectiveDescription = pageConfig?.description || pageConfig?.metaDescription || pageConfig?.pageDescription || pageDefault.description || globalDescription;
    const effectiveKeywords = normalizeKeywords(pageConfig?.keywords) || globalKeywords;
    const effectiveRobots = pageConfig?.robots || globalRobots;

    const effectiveOgTitle = pageConfig?.ogTitle || effectiveTitle;
    const effectiveOgDescription = pageConfig?.ogDescription || effectiveDescription;
    const effectiveOgImage = pageConfig?.ogImage || pageConfig?.og_image || globalOgImage;

    const effectiveTwitterTitle = pageConfig?.twitterTitle || cmsSeo?.twitterTitle || cmsSeo?.twitter_title || effectiveOgTitle;
    const effectiveTwitterDescription = pageConfig?.twitterDescription || cmsSeo?.twitterDescription || cmsSeo?.twitter_description || effectiveOgDescription;
    const effectiveTwitterImage = pageConfig?.twitterImage || pageConfig?.twitter_image || cmsSeo?.twitterImage || cmsSeo?.twitter_image || effectiveOgImage;

    // Favicons
    const faviconUrl = cmsSeo?.favicon || cmsSeo?.faviconUrl || '/favicon.ico';
    const appleTouchIconUrl = cmsSeo?.appleTouchIcon || cmsSeo?.apple_touch_icon || faviconUrl;
    const androidIcon192 = cmsSeo?.androidIcon || cmsSeo?.android_icon || cmsSeo?.icon192 || faviconUrl;

    // 1. Update Document Title
    document.title = effectiveTitle;

    // 2. Standard Meta Tags
    updateMetaTag('name', 'description', effectiveDescription);
    updateMetaTag('name', 'keywords', effectiveKeywords);
    updateMetaTag('name', 'author', globalAuthor);
    updateMetaTag('name', 'robots', effectiveRobots);
    updateMetaTag('name', 'theme-color', globalThemeColor);

    // 3. Link Tags (Canonical & Favicons)
    updateLinkTag('canonical', canonicalUrl);
    updateLinkTag('icon', faviconUrl);
    updateLinkTag('apple-touch-icon', appleTouchIconUrl);
    if (androidIcon192) {
      updateLinkTag('icon', androidIcon192, { sizes: '192x192' });
    }

    // 4. Open Graph Tags
    updateMetaTag('property', 'og:title', effectiveOgTitle);
    updateMetaTag('property', 'og:description', effectiveOgDescription);
    updateMetaTag('property', 'og:image', effectiveOgImage);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:type', globalOgType);

    // 5. Twitter Meta Tags
    updateMetaTag('name', 'twitter:title', effectiveTwitterTitle);
    updateMetaTag('name', 'twitter:description', effectiveTwitterDescription);
    updateMetaTag('name', 'twitter:image', effectiveTwitterImage);
    updateMetaTag('name', 'twitter:card', globalTwitterCard);

    // 6. JSON-LD Schemas

    // Organization Schema
    const orgName = cmsSeo?.organizationName || cmsSeo?.schoolName || HARDCODED_DEFAULTS.orgName;
    const phone = cmsSeo?.phone || cmsSeo?.telephone || HARDCODED_DEFAULTS.phone;
    const email = cmsSeo?.email || HARDCODED_DEFAULTS.email;
    const address = cmsSeo?.address || HARDCODED_DEFAULTS.address;
    const geo = cmsSeo?.geo || HARDCODED_DEFAULTS.geo;
    const sameAs = cmsSeo?.sameAs || HARDCODED_DEFAULTS.sameAs;

    const educationalOrgSchema = {
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: orgName,
      url: siteBaseUrl,
      logo: cmsSeo?.logo || effectiveOgImage,
      description: globalDescription,
      telephone: phone,
      email: email,
      address: typeof address === 'string' ? address : {
        '@type': 'PostalAddress',
        streetAddress: address.streetAddress,
        addressLocality: address.addressLocality,
        addressRegion: address.addressRegion,
        postalCode: address.postalCode,
        addressCountry: address.addressCountry,
      },
      sameAs: sameAs,
    };
    updateJsonLdScript('jsonld-educational-org', educationalOrgSchema);

    // Local Business / School Schema
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'School',
      name: orgName,
      url: siteBaseUrl,
      image: effectiveOgImage,
      telephone: phone,
      email: email,
      address: typeof address === 'string' ? address : {
        '@type': 'PostalAddress',
        streetAddress: address.streetAddress,
        addressLocality: address.addressLocality,
        addressRegion: address.addressRegion,
        postalCode: address.postalCode,
        addressCountry: address.addressCountry,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: geo.latitude,
        longitude: geo.longitude,
      },
    };
    updateJsonLdScript('jsonld-local-business', localBusinessSchema);

    // Breadcrumb Schema
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${siteBaseUrl}/`,
      },
    ];

    if (pageKey !== 'home') {
      if (path.startsWith('/gallery/')) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 2,
          name: 'Gallery',
          item: `${siteBaseUrl}/gallery`,
        });
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 3,
          name: 'Album Details',
          item: `${siteBaseUrl}${path}`,
        });
      } else {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 2,
          name: pageDefault.label,
          item: `${siteBaseUrl}${path}`,
        });
      }
    }

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    };
    updateJsonLdScript('jsonld-breadcrumb', breadcrumbSchema);

  }, [path, cmsSeo]);

  return null;
}
