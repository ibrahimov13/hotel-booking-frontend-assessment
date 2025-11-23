interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-3',
  lg: 'w-12 h-12 border-4',
}

export const LoadingSpinner = ({
  size = 'md',
  className,
}: LoadingSpinnerProps) => (
  <div
    className={`animate-spin rounded-full border-t-transparent border-brand ${sizeClasses[size]} ${className ?? ''}`}
    role="status"
    aria-label="Loading"
  >
    <span className="sr-only">Loading...</span>
  </div>
)
