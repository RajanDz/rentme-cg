import HeroMedia from './HeroMedia'
import { heroMediaMobile, heroMediaDesktop } from '@/lib/data'

const GRADIENT_WASH = [
  'linear-gradient(180deg, rgba(29,22,18,0) 0%, rgba(29,22,18,0.08) 35%, rgba(29,22,18,0.58) 75%, rgba(29,22,18,0.88) 100%)',
  'radial-gradient(120% 80% at 50% 110%, rgba(29,22,18,0.6), transparent 60%)',
  'linear-gradient(180deg, rgba(29,22,18,0.42) 0%, transparent 30%)',
].join(', ')

export default function Hero({ id }: { id?: string }) {
  return (
    <section id={id} className="relative min-h-dvh w-full overflow-hidden flex flex-col justify-center px-6 lg:px-12 pb-14 lg:pb-[72px]">
      {/* 1 — Background media */}
      <HeroMedia mobile={heroMediaMobile} desktop={heroMediaDesktop} />

      {/* 2 — Gradient wash */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: GRADIENT_WASH }}
      />

      {/* 3 — Content block */}
      <div className="relative z-[3] flex flex-col gap-[22px] lg:max-w-[1280px] lg:w-full lg:gap-[30px]">
        {/* Eyebrow */}
        <div
          className="flex items-center gap-3 animate-hero-rise"
          style={{ animationDelay: '0ms' }}
        >
          <span className="w-7 h-px bg-gold-light shrink-0" />
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-gold-light">
           ORGANIZACIJA · DEKORACIJA · OPREMA
          </p>
        </div>

        {/* H1 */}
        <h1
          className="font-serif font-light text-[36px] lg:text-[80px] xl:text-[96px] leading-[1.05] tracking-[-0.015em] lg:tracking-[-0.025em] text-cream animate-hero-rise whitespace-nowrap"
          style={{ animationDelay: '120ms' }}
        >
          Komplet proslava
          <br />
          <em className="italic text-gold-light font-normal">bez stresa</em>
        </h1>

        {/* Sub */}
        <p
          className="font-sans text-[14px] lg:text-[18px] leading-relaxed text-cream/[0.78] max-w-[320px] lg:max-w-[540px] text-pretty animate-hero-rise"
          style={{ animationDelay: '240ms' }}
        >
          Kreiramo magična iskustva za Vaše najmlađe —  <br /> od luksuznog soft play prostora do bubble house doživljaja koji djeca nikada neće zaboraviti.
        </p>

        {/* CTAs */}
        <div
          className="flex gap-[10px] animate-hero-rise"
          style={{ animationDelay: '360ms' }}
        >
          <button
            className="group font-sans text-[14px] font-medium rounded-full px-[22px] py-[14px] text-ink flex items-center gap-2 active:scale-[0.97] transition-transform"
            style={{
              background: 'linear-gradient(180deg, #e7cf9a 0%, #c9a35a 55%, #a8814a 100%)',
            }}
          >
            Rezervišite termin
            <span className="transition-transform group-active:translate-x-1">→</span>
          </button>

          <button className="font-sans text-[14px] font-medium rounded-full px-[22px] py-[14px] bg-white/8 backdrop-blur-sm border border-cream/35 text-cream active:scale-[0.97] transition-transform">
            Galerija
          </button>
        </div>
      </div>


    </section>
  )
}
