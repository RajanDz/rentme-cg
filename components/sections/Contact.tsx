import { config } from '@/lib/config'

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
      <rect x="1" y="2.5" width="13" height="10" rx="1.5" />
      <path d="M1 4l6.5 5L14 4" strokeLinecap="round" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
      <path d="M7.5 1C5.015 1 3 3.015 3 5.5c0 3.75 4.5 8.5 4.5 8.5S12 9.25 12 5.5C12 3.015 9.985 1 7.5 1z" />
      <circle cx="7.5" cy="5.5" r="1.5" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden>
      <rect x="1" y="2.5" width="13" height="10" rx="2.5" />
      <circle cx="7.5" cy="7.5" r="2.5" />
      <circle cx="11.5" cy="4" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  )
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

interface ContactRowProps {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  last?: boolean
}

function ContactRow({ icon, label, value, href, last }: ContactRowProps) {
  const valueEl = href ? (
    <a href={href} className="font-serif text-[16px] text-ink leading-snug">{value}</a>
  ) : (
    <p className="font-serif text-[16px] text-ink leading-snug">{value}</p>
  )

  return (
    <div className={`flex items-center gap-4 py-[14px] border-t border-charcoal/15 ${last ? 'border-b' : ''}`}>
      <div className="w-8 h-8 rounded-full border border-gold-deep text-gold-deep flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted">{label}</p>
        {valueEl}
      </div>
    </div>
  )
}

export default function Contact({ id }: { id?: string }) {
  return (
    <section
      id={id}
      className="bg-gradient-to-b from-cream to-ivory py-14 lg:py-[100px] px-6 lg:px-12 relative"
    >
      <div className="max-w-screen-xl mx-auto lg:grid lg:grid-cols-12 lg:gap-14 lg:items-start">

        {/* Left col: heading + aside — col-span-5 */}
        <div className="lg:col-span-5">
          <span className="section-eyebrow">Rezervacije</span>
          <h2 className="font-serif font-light text-[36px] lg:text-[56px] leading-tight tracking-[-0.01em] text-charcoal mb-[22px] lg:mb-8 text-balance">
            Pišite nam.
            <br />
            <em className="italic">Odgovorimo</em> brzo.
          </h2>

          {/* Aside — desktop only */}
          <div className="hidden lg:block border-t border-charcoal/15 pt-7">
            <p className="font-serif italic font-light text-[17px] leading-[1.55] text-muted text-pretty">
              Odgovori obično stižu u roku od par sati. Rezervacije za vikende
              najavite 7–10 dana unaprijed da imamo prostora za pripremu.
            </p>
          </div>
        </div>

        {/* Right col: contact card — col-span-7 */}
        <div className="lg:col-span-7">
          <div className="bg-pearl border border-charcoal/15 rounded-sm px-6 py-8 lg:p-12 shadow-[0_30px_60px_-40px_rgba(58,46,38,0.25)]">
            <h3 className="font-serif font-light text-[30px] lg:text-[40px] leading-tight text-charcoal mb-3">
              Najjednostavniji
              <br />
              način — <em className="italic">WhatsApp</em>.
            </h3>
            <p className="font-sans text-[13px] lg:text-[15px] leading-[1.6] text-muted mb-6 text-pretty">
              Opišite Vašu viziju, datum i broj djece — mi se pobrinemo za sve ostalo. Odgovaramo u roku od nekoliko sati.
            </p>

            <div>
              <ContactRow icon={<MailIcon />} label="Mail" value={config.mail} href={`mailto:${config.mail}`} />
              <ContactRow icon={<PinIcon />} label="Lokacija" value="Podgorica · cijela Crna Gora" />
              <ContactRow icon={<CameraIcon />} label="Instagram" value={`@${config.instagramHandle}`} href={config.instagramLink()} last />
            </div>

            <a
              href={config.whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 flex items-center justify-between w-full px-[22px] py-[18px] rounded-full bg-ink text-cream
                active:scale-[0.97] motion-safe:transition-all motion-safe:duration-300
                motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_12px_32px_-10px_rgba(29,22,18,0.55)]"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-sans text-[9px] uppercase tracking-[0.26em] text-gold-light">
                  Pišite na WhatsApp
                </span>
                <span className="font-serif italic text-[18px] text-cream leading-tight">
                  {config.whatsappNumber}
                </span>
              </div>
              <span className="w-10 h-10 rounded-full bg-gold text-ink grid place-items-center shrink-0">
                <WhatsAppIcon size={18} />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
