/**
 * PROPABRIDGE — Public media URLs for the consumer site.
 * API returns GCS URLs until cdn.propabridge.com DNS is wired; allow both hosts.
 */

export const CDN_DOMAIN = 'cdn.propabridge.com'
export const GCS_BUCKET = 'propabridge-listings-us'
export const GCS_PREFIX = `https://storage.googleapis.com/${GCS_BUCKET}/`
export const CDN_PREFIX = `https://${CDN_DOMAIN}/`
export const DEFAULT_PLACEHOLDER = '/images/placeholder.jpg'

function isAllowedMediaUrl(url: string): boolean {
  return url.startsWith(CDN_PREFIX) || url.startsWith(GCS_PREFIX)
}

/**
 * Ensures a URL is safe to render in next/image.
 * Never throws.
 */
export function safeImage(url: string | null | undefined): string {
  if (!url) return DEFAULT_PLACEHOLDER

  if (url.startsWith('/') || url.startsWith('http://localhost') || url.startsWith('https://localhost')) {
    return url
  }

  if (isAllowedMediaUrl(url)) {
    return url
  }

  return DEFAULT_PLACEHOLDER
}

export function safeImages(images: (string | null | undefined)[] | null | undefined): string[] {
  if (!images || !Array.isArray(images)) return [DEFAULT_PLACEHOLDER]
  const cleaned = images.map(safeImage).filter((img) => img !== DEFAULT_PLACEHOLDER)
  return cleaned.length > 0 ? cleaned : [DEFAULT_PLACEHOLDER]
}
