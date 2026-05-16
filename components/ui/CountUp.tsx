'use client'

import { useEffect, useRef, useState } from 'react'

export function CountUp({
  to,
  durationMs = 1400,
}: {
  to: number
  durationMs?: number
}) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setN(to)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        obs.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs)
          const eased = 1 - Math.pow(1 - t, 3)
          setN(Math.round(to * eased))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.6 },
    )

    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [to, durationMs])

  return <span ref={ref}>{n}</span>
}
