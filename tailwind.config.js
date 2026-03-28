/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // ─── 4-Way Theme Matrix via CSS variables ────────────────────────────
      // Applied via data-theme="sw|hw" on <html>, combined with .dark class
      // Light-SW:  off-white bg, clean mint accents
      // Light-HW:  light gray bg, circuit-blue accents
      // Dark-SW:   rich black bg, deep slate accents
      // Dark-HW:   charcoal bg, neon-green PCB glow
      colors: {
        theme: {
          bg:         'var(--color-bg)',
          'bg-alt':   'var(--color-bg-alt)',
          'bg-card':  'var(--color-bg-card)',
          surface:    'var(--color-surface)',
          border:     'var(--color-border)',
          text:       'var(--color-text)',
          'text-muted':'var(--color-text-muted)',
          'text-faint':'var(--color-text-faint)',
          accent:     'var(--color-accent)',
          'accent-dim':'var(--color-accent-dim)',
          'accent-glow':'var(--color-accent-glow)',
          secondary:  'var(--color-secondary)',
          terminal:   'var(--color-terminal)',
          'term-text':'var(--color-term-text)',
        },
        // Hardcoded palette for explicit use
        mint:   { 400: '#4ADE80', 500: '#22C55E', 600: '#16A34A' },
        slate:  { 700: '#334155', 800: '#1E293B', 900: '#0F172A' },
        neon:   { green: '#22FF6B', dim: '#16A34A' },
        circuit:{ blue: '#3B82F6', dim: '#1D4ED8' },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        sans:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      fontSize: {
        'hero-sm': ['clamp(3.5rem,10vw,7rem)',   { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'hero-lg': ['clamp(5rem, 16vw,14rem)',    { lineHeight: '0.85',letterSpacing: '-0.03em' }],
        'hero-xl': ['clamp(6rem, 18vw,18rem)',    { lineHeight: '0.82',letterSpacing: '-0.04em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128':'32rem',
      },
      borderRadius: {
        'card': '0.75rem',
        'pill': '9999px',
      },
      animation: {
        // Software mode: smooth, easing
        'fade-up':    'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':    'fadeIn 0.5s ease both',
        'float':      'float 6s ease-in-out infinite',
        // Hardware mode: staccato, glitch
        'glitch':     'glitch 0.4s linear infinite',
        'scan':       'scanline 2s linear infinite',
        'pulse-hw':   'pulseHW 1.2s cubic-bezier(0, 0, 1, 1) infinite',
        'pcb-trace':  'pcbTrace 1.5s ease-in-out infinite alternate',
        'blink':      'blink 1s linear infinite',
        'spin-slow':  'spin 8s linear infinite',
        'kick':       'kick 0.6s cubic-bezier(0.34,1.56,0.64,1) both',
      },
      keyframes: {
        fadeUp:  { from:{ opacity:'0', transform:'translateY(32px)' }, to:{ opacity:'1', transform:'translateY(0)' } },
        fadeIn:  { from:{ opacity:'0' }, to:{ opacity:'1' } },
        float:   { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-12px)' } },
        glitch: {
          '0%':  { clipPath:'inset(0 0 98% 0)', transform:'translate(-2px, 0)' },
          '25%': { clipPath:'inset(40% 0 50% 0)',transform:'translate(2px,  0)' },
          '50%': { clipPath:'inset(80% 0 5%  0)',transform:'translate(-1px, 0)' },
          '75%': { clipPath:'inset(20% 0 70% 0)',transform:'translate(1px,  0)' },
          '100%':{ clipPath:'inset(0 0 98% 0)', transform:'translate(0,    0)' },
        },
        scanline: {
          '0%':  { transform:'translateY(-100vh)' },
          '100%':{ transform:'translateY(100vh)'  },
        },
        pulseHW: {
          '0%,100%':{ opacity:'1' },
          '50%':    { opacity:'0.3' },
        },
        pcbTrace: {
          from:{ strokeDashoffset:'200' },
          to:  { strokeDashoffset:'0'   },
        },
        blink: {
          '0%,100%':{ opacity:'1' },
          '50%':    { opacity:'0' },
        },
        kick: {
          '0%':   { transform:'rotate(0deg) scale(1)' },
          '30%':  { transform:'rotate(-20deg) scale(1.2)' },
          '60%':  { transform:'rotate(15deg) scale(0.95)' },
          '100%': { transform:'rotate(0deg) scale(1)' },
        },
      },
      backgroundImage: {
        'pcb-grid':  'var(--pcb-grid-image)',
        'dot-grid':  'radial-gradient(circle, var(--color-border) 1px, transparent 1px)',
        'noise':     "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        'dot-24': '24px 24px',
        'dot-32': '32px 32px',
      },
      boxShadow: {
        'accent':     '0 0 32px var(--color-accent-glow)',
        'accent-lg':  '0 0 64px var(--color-accent-glow)',
        'card-hw':    '0 0 0 1px var(--color-border), 0 0 24px var(--color-accent-glow)',
        'card-sw':    '0 4px 32px rgba(0,0,0,0.08)',
        'inset-glow': 'inset 0 0 32px var(--color-accent-glow)',
      },
      transitionTimingFunction: {
        'spring':  'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'staccato':'linear',
      },
    },
  },
  plugins: [],
};