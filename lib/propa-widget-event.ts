/** Dispatched globally so Navbar (and future CTAs) can open the embedded Propa widget. */
export const PROPABRIDGE_OPEN_WIDGET_EVENT = 'propabridge:open-propa-widget'

export function dispatchOpenPropaWidget(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(PROPABRIDGE_OPEN_WIDGET_EVENT))
}
