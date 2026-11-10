import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogType?: 'website' | 'article';
}

/**
 * High-performance, zero-dependency SEO manager for React Router SPA.
 * Automatically synchronizes document title, canonical link, meta descriptions,
 * OpenGraph, and Twitter tags on route transitions.
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath,
  ogType = 'website',
}) => {
  const location = useLocation();

  useEffect(() => {
    const siteName = 'AG ADS — Advanced Growth';
    const fullTitle = title ? `${title} | ${siteName}` : 'AG ADS — Advanced Growth | Digital Marketing & Outdoor Advertising';
    document.title = fullTitle;

    const metaDescription =
      description ||
      'AG ADS is a premier marketing and advertising agency in Puducherry and Chennai connecting performance digital advertising with commanding outdoor media.';

    // Update meta description
    let metaDescEl = document.querySelector('meta[name="description"]');
    if (metaDescEl) {
      metaDescEl.setAttribute('content', metaDescription);
    }

    // Update canonical link
    const origin =
      typeof window !== 'undefined' && window.location.origin
        ? window.location.origin
        : 'https://agads.in';
    const canonicalUrl = `${origin}${canonicalPath || location.pathname}`;

    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', canonicalUrl);
    }

    // Update OpenGraph
    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.setAttribute('content', fullTitle);

    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) ogDescEl.setAttribute('content', metaDescription);

    const ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl) ogUrlEl.setAttribute('content', canonicalUrl);

    const ogTypeEl = document.querySelector('meta[property="og:type"]');
    if (ogTypeEl) ogTypeEl.setAttribute('content', ogType);

    // Update Twitter Cards
    const twTitleEl = document.querySelector('meta[name="twitter:title"]');
    if (twTitleEl) twTitleEl.setAttribute('content', fullTitle);

    const twDescEl = document.querySelector('meta[name="twitter:description"]');
    if (twDescEl) twDescEl.setAttribute('content', metaDescription);
  }, [title, description, canonicalPath, ogType, location.pathname]);

  return null;
};

