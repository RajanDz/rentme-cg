'use client'

import { useEffect, useRef, useState } from 'react'
import { config } from '@/lib/config'

interface SubLink { label: string; href: string }
interface NavLink  { label: string; href: string; num: string; sub?: SubLink[] }

const NAV_LINKS: NavLink[] = [
  { num: '01', label: 'Galerija',           href: '#galerija' },
  { num: '02', label: 'Koncepti',           href: '#koncepti', sub: [
    { label: 'Soft play',           href: '#soft-play' },
    { label: 'Električni karuseli', href: '#karuseli' },
    { label: 'Stolovi & stolice',   href: '#stolovi' },
    { label: 'Luxury setups',       href: '#luxury-setups' },
    { label: 'Play zones',          href: '#play-zones' },
  ]},
  { num: '03', label: 'Bubble House',       href: '#bubble-house' },
  { num: '04', label: 'Dvorci',             href: '#dvorci' },
  { num: '05', label: 'LeoNi Sweet Corner', href: '#sweet-corner' },
  { num: '06', label: 'Dodatna oprema',     href: '#oprema' },
  { num: '07', label: 'Kontakt',            href: '#contact' },
]

export default function NavBar() {
  const [scrolled, setScrolled]         = useState(false)
  const [menuOpen, setMenuOpen]         = useState(false)
  const [subOpen, setSubOpen]           = useState(false)   // mobile accordion
  const [dropOpen, setDropOpen]         = useState(false)   // desktop dropdown
  const rafRef    = useRef<number | null>(null)
  const dropRef   = useRef<HTMLDivElement>(null)

  // rAF-throttled scroll
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

  // Close desktop dropdown on outside click
  useEffect(() => {
    if (!dropOpen) return
    const handle = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [dropOpen])

  // Lock body scroll when mobile menu open
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

  const close = () => { setMenuOpen(false); setSubOpen(false) }

  const barColor  = menuOpen ? '#e7cf9a' : scrolled ? '#1d1612' : '#fbf6f1'
  const bar2Color = scrolled && !menuOpen ? '#1d1612' : menuOpen ? '#e7cf9a' : '#fbf6f1'

  const linkClass = (scrolled: boolean) =>
    `relative font-sans text-[10px] uppercase tracking-[0.15em] transition-colors duration-300
     after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-[14px] after:origin-left
     after:scale-x-0 motion-safe:hover:after:scale-x-100 after:transition-transform after:duration-[320ms]
     after:bg-gold ${scrolled ? 'text-charcoal hover:text-ink' : 'text-cream/80 hover:text-cream'}`

  return (
    <>
      {/* ── Top bar ──────────────────────────────────────────────────────── */}
      <nav
        style={{ willChange: 'transform' }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[22px] lg:px-10 py-[14px] transition-[background,border-color,backdrop-filter] duration-300 ${
          scrolled && !menuOpen
            ? 'bg-cream/80 backdrop-blur-md saturate-150 border-b border-charcoal/15'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <div className="shrink-0">
          <div
            className={`font-serif text-[22px] uppercase leading-none tracking-[0.04em] transition-colors duration-300 ${
              menuOpen ? 'text-cream' : scrolled ? 'text-ink' : 'text-cream'
            }`}
          >
            RENTME<span className={menuOpen ? 'text-gold' : 'text-gold-deep'}>.</span>CG
          </div>
          <p
            className={`font-sans text-[8px] font-medium uppercase tracking-[0.16em] mt-[3px] transition-colors duration-300 ${
              menuOpen ? 'text-cream/50' : scrolled ? 'text-muted' : 'text-cream/60'
            }`}
          >
            Luxury Kids Corner Brand
          </p>
          <p
            className={`font-sans text-[7px] uppercase tracking-[0.14em] mt-[1px] transition-colors duration-300 ${
              menuOpen ? 'text-cream/30' : scrolled ? 'text-muted/70' : 'text-cream/40'
            }`}
          >
            Camaj Company L&amp;N
          </p>
        </div>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-7" role="navigation" aria-label="Navigacija">
          {NAV_LINKS.map((link) => {
            if (link.sub) {
              return (
                <div key={link.label} className="relative" ref={dropRef}>
                  <button
                    onClick={() => setDropOpen((o) => !o)}
                    aria-expanded={dropOpen}
                    aria-haspopup="true"
                    className={`${linkClass(scrolled)} flex items-center gap-1`}
                  >
                    {link.label}
                    <svg
                      width="8" height="8" viewBox="0 0 8 8" fill="none"
                      className={`transition-transform duration-300 ${dropOpen ? 'rotate-180' : ''}`}
                      style={{ opacity: 0.6 }}
                    >
                      <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </button>

                  {/* Dropdown panel */}
                  <div
                    className={`absolute top-[calc(100%+16px)] left-1/2 -translate-x-1/2 w-[220px] rounded-md border border-gold/20 overflow-hidden transition-all duration-300 ${
                      dropOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
                    }`}
                    style={{ background: 'rgba(29,22,18,0.96)', backdropFilter: 'blur(12px)' }}
                  >
                    {/* Thin gold top accent */}
                    <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #c9a35a, transparent)' }} />
                    <div className="py-2">
                      {link.sub.map((sub) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setDropOpen(false)}
                          className="flex items-center gap-3 px-5 py-[10px] font-sans text-[11px] uppercase tracking-[0.14em] text-cream/70 hover:text-gold-light hover:bg-white/[0.04] transition-colors duration-200"
                        >
                          <span className="w-px h-3 bg-gold/40 shrink-0" />
                          {sub.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }
            return (
              <a key={link.label} href={link.href} className={linkClass(scrolled)}>
                {link.label}
              </a>
            )
          })}
        </div>

        {/* Desktop WhatsApp pill */}
        <a
          href={config.whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center rounded-full px-4 py-[9px] font-sans text-[11px] uppercase tracking-[0.16em] text-ink font-medium motion-safe:hover:-translate-y-px motion-safe:hover:shadow-[0_4px_14px_rgba(201,163,90,0.35)] transition-all duration-200 shrink-0"
          style={{ background: 'linear-gradient(135deg, var(--color-gold-light), var(--color-gold-deep))' }}
        >
          WhatsApp
        </a>

        {/* Hamburger — mobile only */}
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
          <span className="absolute h-px transition-all duration-300"
            style={{ width: 14, left: '50%', top: menuOpen ? 19 : 12,
              transform: menuOpen ? 'translateX(-50%) rotate(45deg)' : 'translateX(-50%)',
              background: barColor }} />
          <span className="absolute h-px transition-all duration-300"
            style={{ width: 14, left: '50%', top: 19,
              transform: 'translateX(-50%)', opacity: menuOpen ? 0 : 1,
              background: bar2Color }} />
          <span className="absolute h-px transition-all duration-300"
            style={{ width: menuOpen ? 14 : 9, left: '50%', top: menuOpen ? 19 : 26,
              transform: menuOpen ? 'translateX(-50%) rotate(-45deg)' : 'translateX(-50%)',
              background: barColor }} />
        </button>
      </nav>

      {/* ── Mobile menu overlay ───────────────────────────────────────────── */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-40 bg-ink flex flex-col lg:hidden transition-all duration-500 ease-[cubic-bezier(0.7,0,0.2,1)] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Ambient blobs */}
        <div className="absolute top-0 right-0 w-[70%] aspect-square rounded-full blur-[80px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,163,90,0.12), transparent 65%)' }} />
        <div className="absolute bottom-0 left-0 w-[55%] aspect-square rounded-full blur-[80px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(212,165,160,0.10), transparent 65%)' }} />

        {/* Spacer */}
        <div className="h-[62px] shrink-0" />

        {/* Nav links */}
        <nav className="flex-1 flex flex-col justify-center px-8 gap-0 overflow-y-auto" aria-label="Mobilna navigacija">
          {NAV_LINKS.map((link, i) => {
            const isKoncepti = !!link.sub
            return (
              <div key={link.label}>
                {/* Main link row */}
                <div
                  className="flex items-baseline gap-4 border-b border-gold-light/10"
                  style={{
                    transition: 'opacity 350ms ease, transform 350ms ease',
                    transitionDelay: menuOpen ? `${i * 50 + 80}ms` : '0ms',
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateX(0)' : 'translateX(-14px)',
                  }}
                >
                  {isKoncepti ? (
                    <button
                      onClick={() => setSubOpen((o) => !o)}
                      className="group flex items-baseline gap-4 py-[10px] w-full text-left"
                    >
                      <span className="font-serif text-[10px] italic text-gold/50 w-5 shrink-0 group-hover:text-gold transition-colors duration-300">
                        {link.num}
                      </span>
                      <span className="font-serif font-light text-[38px] leading-none text-cream/80 group-hover:text-cream group-hover:italic transition-all duration-300 flex-1">
                        {link.label}
                      </span>
                      <svg
                        width="14" height="14" viewBox="0 0 14 14" fill="none"
                        className={`transition-transform duration-300 text-gold/50 mr-1 ${subOpen ? 'rotate-180' : ''}`}
                      >
                        <path d="M2 4.5L7 9.5L12 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      </svg>
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      onClick={close}
                      className="group flex items-baseline gap-4 py-[10px] w-full"
                    >
                      <span className="font-serif text-[10px] italic text-gold/50 w-5 shrink-0 group-hover:text-gold transition-colors duration-300">
                        {link.num}
                      </span>
                      <span className="font-serif font-light text-[38px] leading-none text-cream/80 group-hover:text-cream group-hover:italic transition-all duration-300">
                        {link.label}
                      </span>
                    </a>
                  )}
                </div>

                {/* Sub-links accordion */}
                {isKoncepti && (
                  <div
                    className="overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{ maxHeight: subOpen ? `${link.sub!.length * 52}px` : '0px' }}
                  >
                    <div className="pl-9 pb-2 flex flex-col gap-0">
                      {link.sub!.map((sub, si) => (
                        <a
                          key={sub.label}
                          href={sub.href}
                          onClick={close}
                          className="flex items-center gap-3 py-[11px] border-b border-gold-light/8 last:border-b-0 group"
                          style={{
                            transition: 'opacity 250ms ease, transform 250ms ease',
                            transitionDelay: subOpen ? `${si * 40}ms` : '0ms',
                            opacity: subOpen ? 1 : 0,
                            transform: subOpen ? 'translateX(0)' : 'translateX(-8px)',
                          }}
                        >
                          <span className="w-px h-3 bg-gold/35 shrink-0" />
                          <span className="font-sans text-[12px] uppercase tracking-[0.16em] text-cream/60 group-hover:text-gold-light transition-colors duration-200">
                            {sub.label}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Bottom WhatsApp CTA */}
        <div
          className="px-8 pb-10 pt-5 border-t border-gold-light/10 shrink-0"
          style={{
            transition: 'opacity 350ms ease, transform 350ms ease',
            transitionDelay: menuOpen ? '440ms' : '0ms',
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
