import { useEffect } from 'react';
import { seo, siteSettings } from '../data/siteSettings';

function setMeta(property, content) {
  const attribute = property.startsWith('og:') ? 'property' : 'name';
  let element = document.head.querySelector(`meta[${attribute}="${property}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, property);
    document.head.append(element);
  }

  element.content = content;
}

export default function Seo({ page, path }) {
  useEffect(() => {
    const [title, description] = seo[page];
    const url = siteSettings.url + path;

    document.title = title;
    setMeta('description', description);
    setMeta('og:title', title);
    setMeta('og:description', description);
    setMeta('og:type', 'website');
    setMeta('og:site_name', siteSettings.name);
    setMeta('og:url', url);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.append(canonical);
    }
    canonical.href = url;
  }, [page, path]);

  return null;
}
