import { CountUp } from '@/components/ui/CountUp'

const storyStats = [
  { value: 300, suffix: '+', label: 'Realizovanih eventa' },
  { value: 3,   suffix: '',  label: 'Godine iskustva' },
  { value: 12,  suffix: '+', label: 'Tematskih setova' },
  { value: 100, suffix: '%', label: 'Personalizovano' },
] as const

export default function Story() {
  return (
    <section className="bg-ink text-cream relative overflow-hidden py-[90px] lg:py-[160px] px-6 lg:px-12">
      {/* Glow blobs */}
      <div
        aria-hidden
        className="absolute -top-[5%] -right-[15%] w-[90%] aspect-square rounded-full pointer-events-none story-blob-fwd"
        style={{ background: 'radial-gradient(circle, rgba(201,163,90,0.28), transparent 65%)' }}
      />
      <div
        aria-hidden
        className="absolute -bottom-[5%] -left-[15%] w-[75%] aspect-square rounded-full pointer-events-none story-blob-rev"
        style={{ background: 'radial-gradient(circle, rgba(212,165,160,0.18), transparent 65%)' }}
      />

      <div className="relative z-10 max-w-screen-xl mx-auto lg:grid lg:grid-cols-12 lg:gap-20 lg:items-start">

        {/* Head — 4 cols on desktop */}
        <div className="lg:col-span-4">
          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.34em] text-gold-light block mb-6">
            O nama
          </span>

          <h2 className="font-serif font-light text-[32px] lg:text-[56px] leading-tight text-cream mb-5">
            Stvaramo trenutke
            <br />
            koje se{' '}
            <em className="italic text-gold-light font-normal">pamte</em>
            <br />
            cijelog života.
          </h2>

          <p className="font-sans text-[14px] lg:text-[16px] leading-relaxed text-cream/[0.72] max-w-[320px] mb-12 lg:mb-0 text-pretty">
            Od ideje do izvođenja, svaki detalj je osmišljen da stvori sjećanja koja traju. Naš tim brine o svakom aspektu — Vi se samo radujete.
          </p>
        </div>

        {/* Stats — 8 cols, 4-col grid on desktop */}
        <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-y-0 lg:items-start">
          {storyStats.map((stat, i) => (
            <div
              key={stat.label}
              className={`border-t border-gold-light/22 pt-3 lg:pt-6
                ${i % 2 === 1 ? 'pl-[18px] border-l border-gold-light/22 lg:pl-0 lg:border-l-0' : ''}
                ${i > 0 ? 'lg:border-l lg:pl-6' : ''}
              `}
            >
              <div className="flex items-baseline gap-0.5 tabular-nums">
                <span className="font-serif font-light text-[44px] lg:text-[84px] leading-none text-gold-light">
                  <CountUp to={stat.value} />
                </span>
                {stat.suffix && (
                  <span className="font-serif font-light text-[26px] lg:text-[48px] leading-none text-gold">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-cream/60 mt-1.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
