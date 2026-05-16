/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* ================================================================
           All colors reference CSS variables so the .dark class on <html>
           flips every token site-wide with zero per-component changes.
           Space-separated RGB triplets enable Tailwind opacity modifiers
           (e.g. bg-bg-primary/50). Already-transparent values are full
           rgba() strings and don't support the modifier.
           ================================================================ */
        bg: {
          primary:   'rgb(var(--c-bg-primary)   / <alpha-value>)',
          secondary: 'rgb(var(--c-bg-secondary) / <alpha-value>)',
          tertiary:  'rgb(var(--c-bg-tertiary)  / <alpha-value>)',
          inverse:   'rgb(var(--c-bg-inverse)   / <alpha-value>)',
        },
        surface: {
          DEFAULT:  'rgb(var(--c-surface)         / <alpha-value>)',
          elevated: 'rgb(var(--c-surface-elevated) / <alpha-value>)',
          sunken:   'rgb(var(--c-surface-sunken)   / <alpha-value>)',
        },
        text: {
          primary:   'rgb(var(--c-text-primary)   / <alpha-value>)',
          secondary: 'rgb(var(--c-text-secondary) / <alpha-value>)',
          tertiary:  'var(--c-text-tertiary)',
          muted:     'var(--c-text-muted)',
          inverse:   'rgb(var(--c-text-inverse)   / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--c-accent)      / <alpha-value>)',
          soft:    'rgb(var(--c-accent-soft) / <alpha-value>)',
          deep:    'rgb(var(--c-accent-deep) / <alpha-value>)',
          subtle:  'var(--c-accent-subtle)',
          gold:    'rgb(var(--c-accent-gold) / <alpha-value>)',
          moss:    'rgb(var(--c-accent-moss) / <alpha-value>)',
          pine:    'rgb(var(--c-accent-pine) / <alpha-value>)',
        },
        line: {
          DEFAULT: 'var(--c-line)',
          strong:  'var(--c-line-strong)',
          accent:  'var(--c-line-accent)',
        },
        mist: {
          DEFAULT: 'var(--c-mist)',
          thick:   'var(--c-mist-thick)',
          thin:    'var(--c-mist-thin)',
        },
        success: 'rgb(var(--c-success) / <alpha-value>)',
        warn:    'rgb(var(--c-warn)    / <alpha-value>)',
      },
      fontFamily: {
        display: ['Anton', '"Noto Sans Devanagari"', 'system-ui', 'sans-serif'],
        body: ['"Space Grotesk"', '"Noto Sans Devanagari"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        eyebrow: ['0.6875rem', { letterSpacing: '0.24em', lineHeight: '1' }],
        micro: ['0.625rem', { letterSpacing: '0.2em', lineHeight: '1' }],
        body: ['0.9375rem', { lineHeight: '1.65', letterSpacing: '0.005em' }],
        lead: ['1.0625rem', { lineHeight: '1.7', letterSpacing: '0.005em' }],
        'd-1': ['clamp(3rem, 9vw, 7.5rem)', { lineHeight: '1.02', letterSpacing: '0.02em' }],
        'd-2': ['clamp(2.25rem, 6.5vw, 5rem)', { lineHeight: '1.04', letterSpacing: '0.015em' }],
        'd-3': ['clamp(1.75rem, 4.5vw, 3.25rem)', { lineHeight: '1.06', letterSpacing: '0.01em' }],
        'd-4': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.12', letterSpacing: '0.005em' }],
        'd-5': ['clamp(1.125rem, 2vw, 1.5rem)', { lineHeight: '1.2', letterSpacing: '0' }],
      },
      letterSpacing: {
        eyebrow: '0.24em',
        wide: '0.18em',
      },
      borderRadius: {
        DEFAULT: '5px',
        sm: '3px',
        card: '10px',
        xl: '14px',
        pill: '999px',
      },
      boxShadow: {
        card:
          '0 1px 0 0 rgba(255,252,247,0.8) inset, 0 2px 6px rgba(44,36,24,0.09), 0 12px 32px -10px rgba(44,36,24,0.22)',
        'card-hover':
          '0 1px 0 0 rgba(255,252,247,0.9) inset, 0 8px 20px rgba(44,36,24,0.12), 0 32px 72px -16px rgba(44,36,24,0.32)',
        cinema:
          '0 35px 90px -24px rgba(44,36,24,0.30), 0 14px 28px -12px rgba(44,36,24,0.15)',
        gold:
          '0 8px 24px -8px rgba(196,152,44,0.35), 0 0 0 1px rgba(196,152,44,0.15) inset',
        'inner-line':
          'inset 0 0 0 1px rgba(44,36,24,0.05)',
        glow:
          '0 0 0 4px rgba(139,115,85,0.18)',
        'glow-gold':
          '0 0 24px rgba(196,152,44,0.12), 0 0 0 1px rgba(196,152,44,0.08)',
        'fog':
          '0 8px 32px rgba(245,240,232,0.4)',
      },
      spacing: {
        section: 'clamp(4.5rem, 9vw, 9rem)',
        'section-sm': 'clamp(3rem, 6vw, 5rem)',
        gutter: 'clamp(1.25rem, 5vw, 6rem)',
        'gutter-sm': 'clamp(1rem, 4vw, 3rem)',
      },
      maxWidth: {
        content: '1320px',
        narrow: '1080px',
        prose: '680px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'out-quint': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
        elastic: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        organic: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
        wood: 'cubic-bezier(0.16, 1, 0.3, 1)',
        silk: 'cubic-bezier(0.23, 1, 0.32, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'mountain': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      transitionDuration: {
        80: '80ms',
        200: '200ms',
        250: '250ms',
        350: '350ms',
        450: '450ms',
        600: '600ms',
        800: '800ms',
        1100: '1100ms',
        1200: '1200ms',
        1800: '1800ms',
        2400: '2400ms',
      },
      animation: {
        'fade-in': 'fadeIn 800ms cubic-bezier(0.22, 0.61, 0.36, 1) both',
        'slow-zoom': 'slowZoom 18s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.4s linear infinite',
        'scroll-cue': 'scrollCue 2.4s ease-in-out infinite',
        'fog-drift': 'fogDrift 25s ease-in-out infinite alternate',
        'fog-drift-reverse': 'fogDriftReverse 30s ease-in-out infinite alternate',
        'ambient-pulse': 'ambientPulse 8s ease-in-out infinite',
        'float': 'floatUp 6s ease-in-out infinite',
        'grain-shift': 'grainShift 0.5s steps(4) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slowZoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scrollCue: {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.5' },
          '50%': { transform: 'translateY(8px)', opacity: '1' },
        },
        fogDrift: {
          '0%': { transform: 'translateX(-8%) scaleX(1.1)' },
          '100%': { transform: 'translateX(8%) scaleX(1.15)' },
        },
        fogDriftReverse: {
          '0%': { transform: 'translateX(5%) scaleX(1.08)' },
          '100%': { transform: 'translateX(-10%) scaleX(1.12)' },
        },
        ambientPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        floatUp: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        grainShift: {
          '0%': { transform: 'translate(0, 0)' },
          '25%': { transform: 'translate(-2%, 2%)' },
          '50%': { transform: 'translate(2%, -1%)' },
          '75%': { transform: 'translate(-1%, -2%)' },
          '100%': { transform: 'translate(0, 0)' },
        },
      },
      backgroundImage: {
        'noise':
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.17  0 0 0 0 0.14  0 0 0 0 0.09  0 0 0 0.08 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
        'vignette':
          'radial-gradient(ellipse at center, transparent 50%, rgba(44,36,24,0.18) 100%)',
        'warm-gradient':
          'linear-gradient(180deg, #F5F0E8 0%, #EDE7DA 50%, #F5F0E8 100%)',
        'fog-layer':
          'linear-gradient(180deg, rgba(245,240,232,0) 0%, rgba(245,240,232,0.6) 40%, rgba(245,240,232,0.8) 60%, rgba(245,240,232,0) 100%)',
        'gold-pour':
          'radial-gradient(ellipse 70% 50% at 30% 15%, rgba(196,152,44,0.08) 0%, transparent 70%)',
        'mountain-silhouette':
          'linear-gradient(180deg, transparent 0%, rgba(44,36,24,0.03) 100%)',
      },
    },
  },
  plugins: [],
}
