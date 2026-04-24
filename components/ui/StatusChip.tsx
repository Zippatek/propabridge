import { cn } from '@/lib/cn'
import { PropertyStatus } from '@/lib/types'

interface StatusChipProps {
  status: PropertyStatus
  className?: string
}

const statusConfig: Record<PropertyStatus, { bg: string; text: string; border: string }> = {
  'FOR SALE': {
    bg: 'bg-[#dcfce7]',
    text: 'text-[#1a7a4a]',
    border: 'border border-[#1a7a4a]',
  },
  'FOR RENT': {
    bg: 'bg-[#dbeafe]',
    text: 'text-blue',
    border: 'border border-blue',
  },
  'OFF-PLAN': {
    bg: 'bg-[#fef9c3]',
    text: 'text-amber',
    border: 'border border-amber',
  },
  'SOLD': {
    bg: 'bg-[#fee2e2]',
    text: 'text-danger',
    border: 'border border-danger',
  },
  'RESERVED': {
    bg: 'bg-[#f3e8ff]',
    text: 'text-purple-700',
    border: 'border border-purple-400',
  },
}

export default function StatusChip({ status, className }: StatusChipProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        'inline-flex items-center px-[10px] py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.08em]',
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      {status}
    </span>
  )
}
