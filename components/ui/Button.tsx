'use client'

import Link from 'next/link'
import { cn } from '@/lib/cn'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  href?: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const sizeStyles = {
  sm:  'px-4 py-2 text-sm',
  md:  'px-7 py-3.5 text-[14px]',
  lg:  'px-8 py-4 text-base',
}

const variantStyles = {
  primary:
    'bg-blue text-white font-semibold rounded-btn hover:bg-blue-hover active:scale-[0.99] transition-all duration-150',
  secondary:
    'bg-transparent border-[1.5px] border-navy text-navy font-semibold rounded-btn hover:bg-navy/5 transition-all duration-150',
  ghost:
    'bg-beige text-navy font-semibold rounded-btn border-0 hover:bg-beige/80 transition-all duration-150',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'right',
  href,
  children,
  className,
  onClick,
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 cursor-pointer font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue',
    variantStyles[variant],
    sizeStyles[size],
    (loading || disabled) && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  )

  const content = (
    <>
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && icon}
      {children}
      {!loading && icon && iconPosition === 'right' && icon}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {content}
    </button>
  )
}
