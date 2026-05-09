'use client'

import { useEffect, useId, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { PROPABRIDGE_OPEN_WIDGET_EVENT } from '@/lib/propa-widget-event'
import { PROPA_WIDGET_URL } from '@/lib/env-public'

/**
 * Embeds the Propa ADK widget in a floating panel. Launcher sits bottom-right by default.
 * Other components can open it via `dispatchOpenPropaWidget()` from `@/lib/propa-widget-event`.
 */
export default function PropaWidget() {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener(PROPABRIDGE_OPEN_WIDGET_EVENT, onOpen)
    return () => window.removeEventListener(PROPABRIDGE_OPEN_WIDGET_EVENT, onOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!PROPA_WIDGET_URL) return null

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col items-end gap-3 pointer-events-none">
      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Chat with Propa"
          className="pointer-events-auto w-[min(100vw-2rem,420px)] h-[min(85vh,560px)] rounded-[20px] border border-divider bg-white shadow-2xl overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-divider bg-brand-navy text-white shrink-0">
            <span className="text-[13px] font-bold tracking-tight uppercase">Propa</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close chat widget"
            >
              <X size={18} strokeWidth={2.5} aria-hidden />
            </button>
          </div>
          <iframe
            title="Propa — AI property assistant"
            src={PROPA_WIDGET_URL}
            className="w-full flex-1 border-0 min-h-0 bg-white"
            allow="clipboard-read; clipboard-write"
          />
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-navy text-white shadow-xl hover:bg-navy-light transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action"
        aria-label={open ? 'Close chat with Propa' : 'Open chat with Propa'}
      >
        {open ? <X size={24} aria-hidden /> : <MessageCircle size={26} strokeWidth={2} aria-hidden />}
      </button>
    </div>
  )
}
