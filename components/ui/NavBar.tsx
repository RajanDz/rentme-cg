'use client'

import { useEffect, useRef, useState } from 'react'
import { config } from '@/lib/config'

const NAV_LINKS = [
  { label: 'Studio',   href: '#studio' },
  { label: 'Koncepti', href: '#koncepti' },
  { label: 'Trenuci',  href: '#trenuci' },
  { label: 'Kontakt',  href: '#contact' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const rafRef = useRef<number | null>(null)

  // rAF-throttled scroll — prevents re-render storm while scrolling
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24)
        rafRef.current = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Lock body scroll; compensate scrollbar width to avoid layout shift
  useEffect(() => {
    if (menuOpen) {
      const w = window.innerWidth - document.documentElement.clientWidth
      document.body.style.paddingRight = `${w}px`
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  // Bar colours
  const barColor = menuOpen ? '#e7cf9a' : scrolled ? '#1d1612' : '#fbf6f1'
  const bar2Color = scrolled && !menuOpen ? '#1d1612' : menuOpen ? '#e7cf9a' : '#fbf6f1'

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      {/*
        will-change:transform promotes nav to its own GPU compositing layer,
        eliminating the repaint jitter caused by backdrop-blur during scroll.
      */}
      <nav
        style={{ willChange: 'transform' }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[22px] lg:px-12 py-[14px] transition-[background,border-color,backdrop-filter] duration-300 ${
          scrolled && !menuOpen
            ? 'bg-cream/80 backdrop-blur-md saturate-150 border-b border-charcoal/15'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <div>
          <div
            className={`font-serif text-[22px] leading-none transition-colors duration-300 ${
              menuOpen ? 'text-cream' : scrolled ? 'text-ink' : 'text-cream'
            }`}
          >
            rentme<span className={menuOpen ? 'text-gold' : 'text-gold-deep'}>.</span>cg
          </div>
          <p
            className={`font-sans text-[9px] font-medium uppercase tracking-[0.18em] mt-[3px] transition-colors duration-300 ${
              menuOpen ? 'text-cream/50' : scrolled ? 'text-muted' : 'text-cream/60'
            }`}
          >
            Camaj · L&amp;N
          </p>
        </div>

        {/* Desktop inline nav */}
        <div className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Navigacija">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className={`relative font-sans text-[12px] uppercase tracking-[0.18em] transition-colors duration-300
                after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-[18px] after:origin-left
                after:scale-x-0 motion-safe:hover:after:scale-x-100 after:transition-transform after:duration-[320ms]
                after:bg-gold ${
                scrolled ? 'text-charcoal hover:text-ink' : 'text-cream/80 hover:text-cream'
              }`}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Desktop WhatsApp pill */}
        <a
          href={config.whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center rounded-full px-4 py-[9px] font-sans text-[11px] uppercase tracking-[0.16em] text-ink font-medium motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[0_4px_14px_rgba(201,163,90,0.35)] transition-all duration-200"
          style={{ background: 'linear-gradient(135deg, var(--color-gold-light), var(--color-gold-deep))' }}
        >
          WhatsApp
        </a>

        {/* Hamburger / Close — mobile only */}
        <button
          aria-label={menuOpen ? 'Zatvori meni' : 'Otvori meni'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="relative w-[38px] h-[38px] rounded-full border lg:hidden transition-colors duration-300"
          style={{
            background: menuOpen ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.50)',
            borderColor: menuOpen ? 'rgba(201,163,90,0.30)' : 'rgba(58,46,38,0.15)',
          }}
        >
          {/*
            All three bars use ONLY inline style transforms.
            Never mix Tailwind translate utilities with inline transform —
            they write to the same CSS property and one silently overrides the other.
          */}

          {/* Bar 1 — rotates to first arm of X */}
          <span
            className="absolute h-px transition-all duration-300"
            style={{
              width: 14,
              left: '50%',
              top: menuOpen ? 19 : 12,
              transform: menuOpen ? 'translateX(-50%) rotate(45deg)' : 'translateX(-50%)',
              background: barColor,
            }}
          />
          {/* Bar 2 — fades out */}
          <span
            className="absolute h-px transition-all duration-300"
            style={{
              width: 14,
              left: '50%',
              top: 19,
              transform: 'translateX(-50%)',
              opacity: menuOpen ? 0 : 1,
              background: bar2Color,
            }}
          />
          {/* Bar 3 — rotates to second arm of X */}
          <span
            className="absolute h-px transition-all duration-300"
            style={{
              width: menuOpen ? 14 : 9,
              left: '50%',
              top: menuOpen ? 19 : 26,
              transform: menuOpen ? 'translateX(-50%) rotate(-45deg)' : 'translateX(-50%)',
              background: barColor,
            }}
          />
        </button>
      </nav>

      {/* ── Mobile menu overlay ──────────────────────────────────────────── */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 bg-ink flex flex-col lg:hidden transition-all duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Ambient blobs */}
        <div
          className="absolute top-0 right-0 w-[70%] aspect-square rounded-full blur-[80px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,163,90,0.12), transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 left-0 w-[55%] aspect-square rounded-full blur-[80px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(212,165,160,0.10), transparent 65%)' }}
        />

        {/* Spacer — navbar height */}
        <div className="h-[62px] shrink-0" />

        {/* Nav links */}
        <nav className="flex-1 flex flex-col justify-center px-8 gap-1" aria-label="Mobilna navigacija">
          {NAV_LINKS.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              onClick={close}
              className="group flex items-baseline gap-4 py-3 border-b border-gold-light/10 last:border-b-0"
              style={{
                transition: 'opacity 350ms ease, transform 350ms ease',
                transitionDelay: menuOpen ? `${i * 60 + 80}ms` : '0ms',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(-14px)',
              }}
            >
              <span className="font-serif text-[10px] italic text-gold/50 w-5 shrink-0 group-hover:text-gold transition-colors duration-300">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-serif font-light text-[44px] leading-none text-cream/80 group-hover:text-cream group-hover:italic transition-all duration-300">
                {label}
              </span>
            </a>
          ))}
        </nav>

        {/* Bottom — WhatsApp CTA */}
        <div
          className="px-8 pb-14 pt-6 border-t border-gold-light/10"
          style={{
            transition: 'opacity 350ms ease, transform 350ms ease',
            transitionDelay: menuOpen ? '340ms' : '0ms',
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          <p className="font-sans text-[9px] uppercase tracking-[0.26em] text-gold-light/50 mb-3">
            Brza rezervacija
          </p>
          <a
            href={config.whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="flex items-center justify-between w-full px-5 py-4 rounded-full border border-gold/30 text-cream active:scale-[0.97] transition-transform"
            style={{ background: 'linear-gradient(135deg, rgba(201,163,90,0.15), rgba(201,163,90,0.06))' }}
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-gold-light">
                Pišite na WhatsApp
              </span>
              <span className="font-serif italic text-[17px] text-cream leading-tight">
                {config.whatsappNumber}
              </span>
            </div>
            <span className="font-sans text-[18px] text-gold">→</span>
          </a>
        </div>
      </div>
    </>
  )
}
