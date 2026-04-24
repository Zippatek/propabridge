import { ShieldCheck, Check } from '@phosphor-icons/react/dist/ssr'
import { cn } from '@/lib/cn'

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg'
  items?: string[]
  className?: string
}

export default function VerifiedBadge({ size = 'md', items, className }: VerifiedBadgeProps) {
  if (size === 'sm') {
    return (
      <div
        className={cn(
          'verified-badge inline-flex items-center gap-1 px-2 py-1',
          className
        )}
        aria-label="Verified by Propabridge"
      >
        <ShieldCheck size={14} weight="fill" color="#ffc870" aria-hidden="true" />
      </div>
    )
  }

  if (size === 'lg' && items && items.length > 0) {
    return (
      <div
        className={cn(
          'verified-badge inline-flex flex-col gap-2 px-4 py-3',
          className
        )}
      >
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} weight="fill" color="#ffc870" aria-hidden="true" />
          <span className="text-navy font-semibold text-[12px]">Verified by Propabridge</span>
        </div>
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <Check size={12} color="#1a7a4a" weight="bold" aria-hidden="true" />
              <span className="text-[11px] text-grey font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // md (default)
  return (
    <div
      className={cn(
        'verified-badge inline-flex items-center gap-2 px-3 py-1.5',
        className
      )}
    >
      <ShieldCheck size={16} weight="fill" color="#ffc870" aria-hidden="true" />
      <span className="text-navy font-semibold text-[12px] whitespace-nowrap">
        Verified by Propabridge
      </span>
    </div>
  )
}
