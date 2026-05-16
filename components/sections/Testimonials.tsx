'use client'

import { useEffect, useRef, useState } from 'react'
import { testimonials } from '@/lib/data'

const GAP = 14

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const onScroll = () => {
      const firstCard = track.firstElementChild as HTMLElement | null
      if (!firstCard) return
      const cardWidth = firstCard.offsetWidth + GAP
      setActiveIdx(Math.round(track.scrollLeft / cardWidth))
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToCard = (idx: number) => {
    const track = trackRef.current
    if (!track) return
    const card = track.children[idx] as HTMLElement | undefined
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' })
  }

  return (
    <section className="bg-cream py-14 lg:py-[100px]">
      {/* Heading */}
      <div className="px-6 lg:px-12 mb-7 max-w-screen-xl mx-auto">
        <span className="section-eyebrow">Iskustva porodica</span>
        <h2 className="font-serif font-light text-[32px] lg:text-[64px] xl:text-[72px] leading-tight tracking-[-0.01em] text-charcoal text-balance">
          Najljepše <em className="italic">riječi</em>
          <br />
          su one koje vraćaju.
        </h2>
      </div>

      {/* Mobile: horizontal scroll track. Desktop: static 3-col grid */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 pb-4 gap-3.5 scrollbar-none
          lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:snap-none lg:pb-0 lg:px-12 max-w-screen-xl lg:mx-auto"
      >
        {testimonials.map((t) => (
          <article
            key={t.name}
            className="flex-[0_0_calc(100%-56px)] snap-center lg:flex-none
              bg-pearl border border-charcoal/15 rounded-md px-[22px] pt-[26px] pb-[22px] relative
              shadow-[0_20px_40px_-30px_rgba(58,46,38,0.25)] flex flex-col
              motion-safe:lg:transition-all motion-safe:lg:duration-[320ms]
              motion-safe:lg:hover:-translate-y-1 motion-safe:lg:hover:shadow-[0_28px_60px_-30px_rgba(58,46,38,0.32)]"
          >
            {/* Decorative quote */}
            <span
              aria-hidden
              className="absolute top-2 right-[18px] font-serif italic text-[70px] text-gold/35 leading-none pointer-events-none select-none"
            >
              &ldquo;
            </span>

            <p className="text-gold text-[12px] tracking-[1px] leading-none">★★★★★</p>

            <p className="font-serif italic font-light text-[18px] lg:text-[20px] leading-[1.45] text-charcoal mt-3 mb-6 flex-1 text-pretty">
              {t.body}
            </p>

            <div className="flex items-center gap-3 pt-[18px] border-t border-charcoal/15">
              <div
                className="w-9 h-9 rounded-full grid place-items-center font-serif text-base text-ink shrink-0"
                style={{
                  background:
                    'linear-gradient(135deg, var(--color-blush), var(--color-gold-light))',
                }}
              >
                {t.initial}
              </div>
              <div>
                <p className="font-serif text-[16px] text-charcoal leading-none">{t.name}</p>
                <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-muted mt-1">
                  {t.meta}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Dot indicator — mobile only */}
      <div className="flex lg:hidden justify-center gap-1.5 mt-3.5 px-6">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToCard(i)}
            aria-label={`Prikaži svjedočanstvo ${i + 1}`}
            className={`h-[5px] transition-[width,background-color] duration-300 ${
              i === activeIdx
                ? 'w-[18px] rounded bg-gold-deep'
                : 'w-[5px] rounded-full bg-charcoal/15'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
