// lib/formatters.ts — Currency, date, and data formatters for Propabridge

/**
 * Format a Naira price value to abbreviated string
 * ₦160,000,000 → "₦160.0M", ₦16,800,000 → "₦16.8M", ₦500,000 → "₦500k"
 */
export function formatNaira(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `₦${(amount / 1_000_000_000).toFixed(1)}B`
  }
  if (amount >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(1)}M`
  }
  if (amount >= 1_000) {
    return `₦${(amount / 1_000).toFixed(0)}k`
  }
  return `₦${amount.toLocaleString('en-NG')}`
}

/**
 * Format full Naira price with commas — for detail pages
 */
export function formatNairaFull(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`
}

/**
 * Format date in Nigerian style: "15 April 2026"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Format property area with unit
 */
export function formatArea(area: number, unit: string = 'sqm'): string {
  return `${area.toLocaleString()} ${unit}`
}

/**
 * Generate a Property ID display string
 */
export function formatPropertyId(id: string): string {
  return id.toUpperCase()
}
