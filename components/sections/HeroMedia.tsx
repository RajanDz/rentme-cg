'use client'

import Image from 'next/image'
import type { Slot } from '@/lib/data'

function SlotEl({ slot, className }: { slot: Slot; className: string }) {
  if (typeof slot === 'object') {
    return (
      <video
        src={slot.video}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none touch-pan-y ${className}`}
      />
    )
  }
  return (
    <Image
      src={slot}
      alt=""
      fill
      priority
      className={`object-cover pointer-events-none touch-pan-y ${className}`}
      sizes="100vw"
    />
  )
}

interface HeroMediaProps {
  mobile?: Slot
  desktop?: Slot
}

export default function HeroMedia({ mobile, desktop }: HeroMediaProps) {
  const hasMobile = mobile !== undefined
  const hasDesktop = desktop !== undefined

  // Oba postoje — swap po breakpointu
  if (hasMobile && hasDesktop) {
    return (
      <div className="absolute inset-0 z-[1]">
        <SlotEl slot={mobile} className="lg:hidden" />
        <SlotEl slot={desktop} className="hidden lg:block" />
      </div>
    )
  }

  // Samo jedan od dva — prikazuje se na svim veličinama
  const single = mobile ?? desktop
  if (single) {
    return (
      <div className="absolute inset-0 z-[1]">
        <SlotEl slot={single} className="" />
      </div>
    )
  }

  // Nema medija — animirani gradient fallback
  return (
    <>
      <div
        className="absolute inset-0 z-[1] animate-hero-pan"
        style={{
          background: [
            'linear-gradient(135deg, rgba(201,163,90,0.10) 0%, transparent 45%)',
            'radial-gradient(ellipse 80% 60% at 25% 35%, rgba(58,46,38,0.95) 0%, transparent 65%)',
            'radial-gradient(ellipse 55% 50% at 82% 18%, rgba(212,165,160,0.15) 0%, transparent 60%)',
            'radial-gradient(ellipse 70% 60% at 68% 82%, rgba(58,46,38,0.85) 0%, transparent 65%)',
            'linear-gradient(160deg, #2e2018 0%, #1d1612 55%, #221810 100%)',
          ].join(', '),
        }}
      />
      <div
        className="absolute inset-0 z-[1] animate-hero-bokeh"
        style={{
          filter: 'blur(2px)',
          background: [
            'radial-gradient(circle 220px at 15% 28%, rgba(201,163,90,0.28) 0%, transparent 70%)',
            'radial-gradient(circle 160px at 78% 18%, rgba(212,165,160,0.22) 0%, transparent 70%)',
            'radial-gradient(circle 200px at 84% 72%, rgba(201,163,90,0.18) 0%, transparent 70%)',
            'radial-gradient(circle 140px at 8%  80%, rgba(243,220,208,0.18) 0%, transparent 70%)',
          ].join(', '),
        }}
      />
    </>
  )
}
