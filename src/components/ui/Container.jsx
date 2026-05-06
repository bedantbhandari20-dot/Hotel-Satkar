import { cn } from '../../lib/cn.js'

export default function Container({ children, className, narrow = false }) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-gutter',
        narrow ? 'max-w-prose' : 'max-w-content',
        className
      )}
    >
      {children}
    </div>
  )
}
