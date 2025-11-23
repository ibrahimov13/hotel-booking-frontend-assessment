import type { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
}

export const Button = ({
  children,
  variant = 'primary',
  leftIcon,
  rightIcon,
  fullWidth,
  className,
  ...props
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-brand text-white shadow-sm hover:bg-brand/90 focus-visible:outline-brand',
    secondary:
      'border border-slate-200 bg-white text-slate-700 hover:text-slate-900 focus-visible:outline-brand',
    ghost: 'text-slate-600 hover:text-brand focus-visible:outline-brand',
  }

  return (
    <button
      className={clsx(
        baseClasses,
        variants[variant],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}

