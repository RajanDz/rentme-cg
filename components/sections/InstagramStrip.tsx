import Image from 'next/image'
import { igMoments, type Slot } from '@/lib/data'
import { config } from '@/lib/config'

function PlayBadge() {
  return (
    <div className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-ink/50 backdrop-blur grid place-items-center">
      <svg width="8" height="10" viewBox="0 0 8 10" fill="none" aria-hidden>
        <path d="M0 0L8 5L0 10V0Z" fill="#e7cf9a" />
      </svg>
    </div>
  )
}

// string → <Image>, { video } → <video>, undefined → placeholder
function IgSlot({ src, alt, i }: { src: Slot; alt: string; i: number }) {
  const baseClass = 'absolute inset-0 w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.04]'

  if (typeof src === 'object') {
    return (
      <video
        src={src.video}
        autoPlay
        muted
        loop
        playsInline
        aria-label={alt}
        className={baseClass}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={`object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.04]`}
      sizes="(max-width: 1024px) 200px, 20vw"
    />
  )
}

export default function InstagramStrip() {
  return (
    <section id="trenuci" className="bg-cream pt-12 pb-16 lg:py-[100px]">
      {/* Header */}
      <div className="px-6 lg:px-12 mb-6 flex items-end justify-between gap-4 max-w-screen-xl mx-auto">
        <div>
          <span className="section-eyebrow">@rentme.cg</span>
          <h3 className="font-serif font-light text-[26px] lg:text-[48px] leading-tight text-charcoal">
            Trenuci sa <em className="italic">terena</em>.
          </h3>
        </div>
        <a
          href={config.instagramLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-ink border-b border-gold pb-0.5 shrink-0"
        >
          Vidi sve →
        </a>
      </div>

      {/* Mobile: scroll strip. Desktop: 5-col grid with zigzag */}
      <div className="flex overflow-x-auto snap-x snap-mandatory px-6 pb-3 gap-2 scrollbar-none
        lg:grid lg:grid-cols-5 lg:gap-3 lg:overflow-visible lg:snap-none lg:pb-0 lg:px-12 max-w-screen-xl lg:mx-auto">
        {igMoments.map((item, i) => {
          const isVideo = typeof item.src === 'object'
          return (
            <a
              key={i}
              href={item.href ?? config.instagramLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={isVideo ? 'Instagram Reel' : 'Instagram objava'}
              className="flex-[0_0_200px] h-[250px] lg:w-auto lg:h-[340px] relative snap-start rounded-sm overflow-hidden shrink-0
                border border-charcoal/10
                lg:flex-none [&:nth-child(even)]:lg:mt-12
                motion-safe:lg:transition-transform motion-safe:lg:duration-[600ms] motion-safe:lg:hover:-translate-y-1.5
                group"
            >
              <IgSlot src={item.src} alt={isVideo ? 'Reel' : 'Objava'} i={i} />
              {isVideo && <PlayBadge />}
            </a>
          )
        })}
      </div>
    </section>
  )
}
