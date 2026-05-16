import { config } from '@/lib/config'

const NAV_LINKS = [
  { label: 'Studio',   href: '#studio' },
  { label: 'Koncepti', href: '#koncepti' },
  { label: 'Trenuci',  href: '#trenuci' },
  { label: 'Kontakt',  href: '#contact' },
]

function IgIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-ink text-cream/70 pt-[90px] pb-[110px] lg:pt-[100px] lg:pb-14 px-6 lg:px-12 relative overflow-hidden text-center lg:text-left">
      {/* Animated gold glow — always centered */}
      <div className="flex justify-center mb-9">
        <div
          className="h-[3px] rounded-full bg-gold-light animate-footer-glow motion-reduce:animate-none"
          style={{ width: 16 }}
        />
      </div>

      {/* Mobile layout — stacked centered */}
      <div className="lg:hidden">
        <p className="font-serif italic font-light text-[22px] leading-[1.3] max-w-[280px] mx-auto mb-9 text-cream/80">
          Stvaramo trenutke koje
          <br />
          <em className="italic text-gold-light not-italic">
            <span className="italic">djeca</span>
          </em>{' '}
          pamte.
        </p>

        <p className="font-serif font-medium text-[26px] text-cream leading-none mb-1.5">
          rentme<span className="text-gold-light">.</span>cg
        </p>
        <p className="font-sans text-[9px] uppercase tracking-[0.32em] text-gold-light/70 mb-9">
          Camaj Company L &amp; N
        </p>

        <div className="w-7 h-px mx-auto mb-9" style={{ background: 'rgba(201,163,90,0.5)' }} />

        <div className="flex justify-center gap-4 mb-9">
          <a href={config.instagramLink()} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
            className="w-[42px] h-[42px] rounded-full border border-gold-light/22 text-gold-light flex items-center justify-center">
            <IgIcon />
          </a>
          <a href={config.whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
            className="w-[42px] h-[42px] rounded-full border border-gold-light/22 text-gold-light flex items-center justify-center">
            <WhatsAppIcon />
          </a>
        </div>

        <p className="font-sans text-[10px] text-cream/40">© 2025 rentme.cg · Camaj Company L&amp;N</p>
      </div>

      {/* Desktop layout — 3-col grid */}
      <div className="hidden lg:grid grid-cols-[1.5fr_1fr_1fr] gap-20 max-w-screen-xl mx-auto">

        {/* Brand col */}
        <div>
          <p className="font-serif italic font-light text-[26px] leading-[1.3] max-w-xs mb-9 text-cream/80">
            Stvaramo trenutke koje
            <br />
            <em className="italic text-gold-light not-italic">
              <span className="italic">djeca</span>
            </em>{' '}
            pamte.
          </p>
          <p className="font-serif font-medium text-[26px] text-cream leading-none mb-1.5">
            rentme<span className="text-gold-light">.</span>cg
          </p>
          <p className="font-sans text-[9px] uppercase tracking-[0.32em] text-gold-light/70">
            Camaj Company L &amp; N
          </p>
        </div>

        {/* Nav col */}
        <div>
          <p className="font-sans text-[9px] uppercase tracking-[0.26em] text-gold-light/60 mb-6">Sajt</p>
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-sans text-[13px] text-cream/60 hover:text-gold-light hover:pl-1.5 transition-all duration-200"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        {/* Social col */}
        <div className="flex flex-col">
          <p className="font-sans text-[9px] uppercase tracking-[0.26em] text-gold-light/60 mb-6">Pratite nas</p>
          <div className="flex gap-3 mb-auto">
            <a
              href={config.instagramLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-[42px] h-[42px] rounded-full border border-gold-light/22 text-gold-light flex items-center justify-center motion-safe:transition-colors motion-safe:duration-200 hover:border-gold-light"
            >
              <IgIcon />
            </a>
            <a
              href={config.whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-[42px] h-[42px] rounded-full border border-gold-light/22 text-gold-light flex items-center justify-center motion-safe:transition-colors motion-safe:duration-200 hover:border-gold-light"
            >
              <WhatsAppIcon />
            </a>
          </div>
          <p className="font-sans text-[10px] text-cream/40 mt-9">© 2025 rentme.cg</p>
        </div>
      </div>
    </footer>
  )
}
