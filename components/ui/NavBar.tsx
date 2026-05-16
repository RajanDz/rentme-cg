'use client'

import { useEffect, useState } from 'react'
import { config } from '@/lib/config'

const NAV_LINKS = [
  { label: 'Studio',   href: '#studio' },
  { label: 'Koncepti', href: '#koncepti' },
  { label: 'Trenuci',  href: '#trenuci' },
  { label: 'Kontakt',  href: '#contact' },
]

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[22px] lg:px-12 py-[14px] transition-all duration-300 ${
        scrolled
          ? 'bg-cream/80 backdrop-blur-md saturate-150 border-b border-charcoal/15'
          : ''
      }`}
    >
      {/* Logo */}
      <div>
        <div
          className={`font-serif text-[22px] leading-none transition-colors duration-300 ${
            scrolled ? 'text-ink' : 'text-cream'
          }`}
        >
          rentme<span className="text-gold-deep">.</span>cg
        </div>
        <p
          className={`font-sans text-[9px] font-medium uppercase tracking-[0.18em] mt-[3px] transition-colors duration-300 ${
            scrolled ? 'text-muted' : 'text-cream/60'
          }`}
        >
          Camaj · L&amp;N
        </p>
      </div>

      {/* Desktop inline nav — hidden on mobile */}
      <div className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Navigacija">
        {NAV_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={`relative font-sans text-[12px] uppercase tracking-[0.18em] transition-colors duration-300
              after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-[18px] after:origin-left
              after:scale-x-0 motion-safe:hover:after:scale-x-100 after:transition-transform after:duration-[320ms]
              after:bg-gold ${
              scrolled
                ? 'text-charcoal hover:text-ink'
                : 'text-cream/80 hover:text-cream'
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      {/* Desktop WhatsApp pill — hidden on mobile */}
      <a
        href={config.whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden lg:flex items-center rounded-full px-4 py-[9px] font-sans text-[11px] uppercase tracking-[0.16em] text-ink font-medium motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[0_4px_14px_rgba(201,163,90,0.35)] transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, var(--color-gold-light), var(--color-gold-deep))',
        }}
      >
        WhatsApp
      </a>

      {/* Hamburger — hidden on desktop */}
      <button
        aria-label="Open menu"
        className="relative w-[38px] h-[38px] rounded-full border border-charcoal/15 bg-white/50 lg:hidden"
      >
        <span
          className={`absolute h-px left-1/2 -translate-x-1/2 transition-colors duration-300 ${
            scrolled ? 'bg-ink' : 'bg-cream'
          }`}
          style={{ width: 14, top: 12 }}
        />
        <span
          className={`absolute h-px left-1/2 -translate-x-1/2 transition-colors duration-300 ${
            scrolled ? 'bg-ink' : 'bg-cream'
          }`}
          style={{ width: 14, top: 19 }}
        />
        <span
          className={`absolute h-px left-1/2 -translate-x-1/2 transition-colors duration-300 ${
            scrolled ? 'bg-ink' : 'bg-cream'
          }`}
          style={{ width: 9, top: 26 }}
        />
      </button>
    </nav>
  )
}
