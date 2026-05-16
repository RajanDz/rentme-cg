'use client'

import Image from 'next/image'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { categories, type Category, type CategoryKey, type Slot } from '@/lib/data'

const PANEL_ID = 'category-panel'
const tabId = (key: CategoryKey) => `tab-${key}`
const keys = categories.map((c) => c.key)

// ─── CategoryTabs ─────────────────────────────────────────────────────────────

interface TabsProps {
  active: CategoryKey
  onChange: (key: CategoryKey) => void
}

function CategoryTabs({ active, onChange }: TabsProps) {
  const barRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})
  const [glow, setGlow] = useState({ x: 0, w: 0 })

  const reposition = useCallback(() => {
    const tab = tabRefs.current[active]
    const bar = barRef.current
    if (!tab || !bar) return
    const tabRect = tab.getBoundingClientRect()
    const barRect = bar.getBoundingClientRect()
    setGlow({ x: tabRect.left - barRect.left + bar.scrollLeft, w: tabRect.width })
  }, [active])

  useLayoutEffect(() => { reposition() }, [reposition])

  useEffect(() => {
    window.addEventListener('resize', reposition)
    document.fonts?.ready.then(reposition)
    return () => window.removeEventListener('resize', reposition)
  }, [reposition])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const currentIdx = keys.indexOf(active)
      let nextKey: CategoryKey | null = null

      switch (e.key) {
        case 'ArrowLeft':
          nextKey = keys[(currentIdx - 1 + keys.length) % keys.length]
          break
        case 'ArrowRight':
          nextKey = keys[(currentIdx + 1) % keys.length]
          break
        case 'Home':
          nextKey = keys[0]
          break
        case 'End':
          nextKey = keys[keys.length - 1]
          break
        default:
          return
      }

      e.preventDefault()
      onChange(nextKey)
      tabRefs.current[nextKey]?.focus()
    },
    [active, onChange],
  )

  return (
    <div
      ref={barRef}
      role="tablist"
      aria-label="Kategorije"
      onKeyDown={handleKeyDown}
      className="relative flex overflow-x-auto scrollbar-none px-6 lg:px-10 gap-7 lg:gap-14 mb-8 border-b border-charcoal/15"
    >
      {categories.map((c) => (
        <button
          key={c.key}
          id={tabId(c.key)}
          ref={(el) => { tabRefs.current[c.key] = el }}
          role="tab"
          aria-selected={c.key === active}
          aria-controls={PANEL_ID}
          tabIndex={c.key === active ? 0 : -1}
          onClick={() => onChange(c.key)}
          className={`pb-[18px] lg:pb-[28px] pt-1 font-serif text-[22px] lg:text-[32px] whitespace-nowrap transition-colors duration-[320ms] ${
            c.key === active
              ? 'text-ink italic'
              : 'text-muted hover:text-charcoal'
          }`}
        >
          {c.label}
        </button>
      ))}

      {/* Sliding glow underline */}
      <span
        aria-hidden
        className="absolute left-0 -bottom-px h-0.5 rounded-sm pointer-events-none transition-[transform,width] duration-[600ms] ease-[cubic-bezier(0.7,0,0.2,1)]"
        style={{
          transform: `translateX(${glow.x}px)`,
          width: glow.w,
          background:
            'linear-gradient(90deg, transparent, #c9a35a 20%, #e7cf9a 50%, #c9a35a 80%, transparent)',
          boxShadow:
            '0 0 14px rgba(201,163,90,0.7), 0 0 28px rgba(201,163,90,0.35)',
        }}
      >
        <span
          aria-hidden
          className="absolute inset-y-[-1px] inset-x-0 animate-shimmer motion-reduce:hidden"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,240,200,0.85), transparent)',
            backgroundSize: '50% 100%',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </span>
    </div>
  )
}

// ─── CatImg ────────────────────────────────────────────────────────────────────
// slot = string → <Image>, { video } → <video>, undefined → placeholder.
// hoverZoom adds a subtle scale on hover to the inner media element.

function CatImg({
  slot,
  alt,
  className,
  tint,
  sizes,
  hoverZoom,
}: {
  slot?: Slot
  alt: string
  className: string
  tint?: string
  sizes?: string
  hoverZoom?: boolean
}) {
  const zoomClass = hoverZoom
    ? 'motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-[1.02]'
    : ''
  const wrapClass = hoverZoom ? 'group' : ''

  if (!slot) {
    return (
      <div
        className={`rounded-sm overflow-hidden ${className}`}
        role="img"
        aria-label={alt}
        style={{ background: tint ?? 'var(--color-ivory-deep)' }}
      />
    )
  }

  if (typeof slot === 'object') {
    return (
      <div className={`rounded-sm overflow-hidden relative ${className} ${wrapClass}`}>
        <video
          src={slot.video}
          autoPlay
          muted
          loop
          playsInline
          aria-label={alt}
          className={`absolute inset-0 w-full h-full object-cover ${zoomClass}`}
        />
      </div>
    )
  }

  return (
    <div className={`rounded-sm overflow-hidden relative ${className} ${wrapClass}`}>
      <Image
        src={slot}
        alt={alt}
        fill
        className={`object-cover ${zoomClass}`}
        sizes={sizes ?? '(max-width: 768px) 100vw, 600px'}
      />
    </div>
  )
}

// ─── CategoryPanel ─────────────────────────────────────────────────────────────
//
// Mobile:  hero → caption → [detail|moment] → wide  (flex-col)
// Desktop: 6-col editorial grid
//   col 1-4 row 1-2: hero (580px tall)
//   col 5-6 row 1:   caption
//   col 5-6 row 2:   detail + moment stacked (min-h 270px each)
//   col 1-6 row 3:   wide (440px)

function CategoryPanel({ cat }: { cat: Category }) {
  return (
    <div className="px-6 lg:px-10 animate-fade-in" id="koncepti">
      {/* Editorial grid */}
      <div className="flex flex-col gap-[14px] mb-[14px] lg:grid lg:grid-cols-6 lg:gap-3 lg:mb-3">

        {/* Hero — col-span-4, row-span-2 on desktop */}
        <CatImg
          slot={cat.hero}
          alt={`${cat.label} hero`}
          className="-mx-1 w-[calc(100%+8px)] h-[340px] lg:mx-0 lg:w-auto lg:col-span-4 lg:row-span-2 lg:h-[580px] motion-safe:lg:transition-transform motion-safe:lg:duration-700 motion-safe:lg:hover:-translate-y-0.5"
          tint={cat.tint}
          sizes="(max-width: 1024px) 100vw, 58vw"
        />

        {/* Caption — col-span-2 row-1 */}
        <div className="flex items-start gap-[18px] px-1 pt-3 pb-1.5 lg:col-span-2 lg:row-start-1 lg:self-center lg:px-4 lg:pt-0 lg:pb-0">
          <span className="font-serif italic text-gold-deep text-[13px] tracking-wide pt-1 shrink-0">
            {cat.numeral}
          </span>
          <p className="font-serif italic font-light text-[18px] lg:text-[22px] leading-[1.4] text-charcoal text-pretty m-0">
            {cat.caption}
          </p>
        </div>

        {/* Pair — mobile: side-by-side grid; desktop: col-span-2 row-2 stacked */}
        <div className="grid grid-cols-[1.4fr_1fr] gap-2 h-[200px] lg:col-span-2 lg:row-start-2 lg:grid-cols-1 lg:grid-rows-2 lg:gap-3 lg:h-auto">
          <CatImg
            slot={cat.detail}
            alt={`${cat.label} detail`}
            className="h-full lg:min-h-[270px]"
            tint={cat.tint2}
            hoverZoom
            sizes="(max-width: 1024px) 58vw, 25vw"
          />
          <CatImg
            slot={cat.moment}
            alt={`${cat.label} moment`}
            className="h-full lg:min-h-[270px]"
            tint={cat.tint}
            hoverZoom
            sizes="(max-width: 1024px) 42vw, 25vw"
          />
        </div>
      </div>

      {/* Wide — full width, col-span-6 on desktop */}
      <CatImg
        slot={cat.wide}
        alt={`${cat.label} wide`}
        className="w-full h-[260px] mb-7 lg:h-[440px] lg:mb-3 motion-safe:lg:transition-transform motion-safe:lg:duration-700 motion-safe:lg:hover:-translate-y-0.5"
        tint={cat.tint2}
        sizes="(max-width: 1024px) 100vw, 90vw"
      />

      <div className="flex items-center justify-between pt-1 lg:pt-3 mb-7">
        <a
          href="#"
          className="font-sans font-semibold tracking-wider uppercase text-[12px] text-ink border-b border-gold pb-1"
          aria-label={`${cat.label} — cijela galerija`}
        >
          Cijela galerija →
        </a>
        <span className="font-serif italic text-muted text-sm">{cat.count}</span>
      </div>
    </div>
  )
}

// ─── Categories ───────────────────────────────────────────────────────────────

export default function Categories() {
  const [activeCat, setActiveCat] = useState<CategoryKey>('soft')
  const active = categories.find((c) => c.key === activeCat)!

  return (
    <section className="relative isolate py-20 lg:py-[160px] bg-cream overflow-hidden">
      {/* Ambient tinted blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute top-[10%] -right-[20%] w-[80%] aspect-square rounded-full blur-[40px] motion-safe:transition-[background] motion-safe:duration-[900ms] motion-safe:ease-in-out"
          style={{ background: `radial-gradient(circle, ${active.tint}, transparent 65%)` }}
        />
        <div
          className="absolute -bottom-[5%] -left-[20%] w-[75%] aspect-square rounded-full blur-[50px] motion-safe:transition-[background] motion-safe:duration-[900ms] motion-safe:ease-in-out"
          style={{ background: `radial-gradient(circle, ${active.tint2}, transparent 60%)` }}
        />
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto">
        {/* Section head */}
        <div className="px-6 lg:px-10 mb-10">
          <span className="section-eyebrow">Naši koncepti</span>
          <h2 className="font-serif font-light text-[36px] lg:text-[64px] xl:text-[72px] leading-[1.1] tracking-[-0.01em] text-charcoal mb-4 text-balance">
            Tri svijeta. <em className="italic">Jedan</em>
            <br />
            nezaboravan dan.
          </h2>
          <p className="font-sans text-[14px] lg:text-[16px] text-muted max-w-[300px] lg:max-w-[420px] text-pretty">
            Svaki koncept nosi svoj karakter — odaberite onaj koji savršeno odgovara Vašoj viziji.
          </p>
        </div>

        {/* Tabs */}
        <div>
          <CategoryTabs active={activeCat} onChange={setActiveCat} />
        </div>

        {/* Tab panel */}
        <div
          id={PANEL_ID}
          role="tabpanel"
          aria-labelledby={tabId(activeCat)}
          tabIndex={0}
          className="outline-none"
        >
          <CategoryPanel key={activeCat} cat={active} />
        </div>
      </div>
    </section>
  )
}
