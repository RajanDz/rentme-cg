export default function Intro() {
  return (
    <section
      id="studio"
      className="relative bg-cream overflow-hidden"
    >
      {/* Gold hairline — top of section */}
      <div className="absolute top-0 left-6 lg:left-12 w-px h-8 bg-gradient-to-b from-gold to-transparent" />

      <div className="pt-[100px] pb-20 lg:py-[180px] lg:pb-[160px] px-6 lg:px-12 max-w-screen-xl mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-20 lg:items-start">

          {/* Left col: eyebrow + gold rule + meta */}
          <div className="lg:col-span-4">
            <span className="section-eyebrow lg:mb-5 lg:block">Studio</span>

            {/* Gold rule — desktop only */}
            <div
              className="hidden lg:block h-px mt-4 mb-6"
              style={{ background: 'linear-gradient(90deg, var(--color-gold), transparent)' }}
            />

            {/* Meta — desktop left col */}
            <div className="hidden lg:flex items-baseline gap-4">
              <span className="font-sans text-[9px] font-medium uppercase tracking-[0.18em] text-muted shrink-0">
                Bazirano u
              </span>
              <em className="font-serif font-light italic text-[15px] text-charcoal">
                Podgorica · Crna Gora
              </em>
            </div>
          </div>

          {/* Right col: editorial paragraph */}
          <div className="lg:col-span-8">
            <p className="font-serif font-light text-[28px] lg:text-[44px] xl:text-[48px] leading-[1.25] lg:leading-[1.18] text-charcoal text-pretty mb-10 lg:mb-0">
              rentme.cg je{' '}
              <em className="italic">studio za premium dječije evente</em> u Crnoj
              Gori. Tri koncepta, jedna pažnja prema detalju — od prve poruke do
              posljednje fotografije.
            </p>
          </div>
        </div>

        {/* Meta row — mobile only */}
        <div className="flex lg:hidden items-baseline gap-6 border-t border-charcoal/15 pt-[22px]">
          <span className="font-sans text-[9px] font-medium uppercase tracking-[0.18em] text-muted shrink-0">
            Bazirano u
          </span>
          <em className="font-serif font-light italic text-[15px] text-charcoal">
            Podgorica · Crna Gora
          </em>
        </div>
      </div>
    </section>
  )
}
