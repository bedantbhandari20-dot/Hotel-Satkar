// Tiny className combiner — no dependencies.
export function cn(...args) {
  return args.filter(Boolean).join(' ')
}
