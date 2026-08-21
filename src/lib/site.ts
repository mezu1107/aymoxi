/** Canonical production origin for AYMOXI. */
export const SITE_URL = "https://www.aymoxi.com";

export const SITE_NAME = "AYMOXI";

/** Brand logo — a single physical file served from /public. */
export const SITE_LOGO = `${SITE_URL}/logo.png`;

/** Default social share image. */
export const SITE_OG_IMAGE = `${SITE_URL}/logo.png`;

/** Build an absolute URL from an app path. */
export function abs(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** BreadcrumbList JSON-LD helper. */
export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}
