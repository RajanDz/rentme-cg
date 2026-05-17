import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'rentme.cg — Luxury Kids Eventi & Soft Play u Crnoj Gori'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#1d1612',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '72px 80px',
          position: 'relative',
        }}
      >
        {/* Gold top accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 80,
            width: 48,
            height: 3,
            background: '#c9a35a',
            borderRadius: 2,
          }}
        />

        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: '60%',
            height: '80%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,163,90,0.18), transparent 65%)',
          }}
        />

        {/* Eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div style={{ width: 28, height: 1, background: '#e7cf9a' }} />
          <span
            style={{
              fontFamily: 'sans-serif',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#e7cf9a',
            }}
          >
            Premium Kids Events · Crna Gora
          </span>
        </div>

        {/* Wordmark */}
        <div
          style={{
            fontFamily: 'serif',
            fontSize: 88,
            fontWeight: 300,
            color: '#fbf6f1',
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          rentme
          <span style={{ color: '#c9a35a' }}>.</span>
          cg
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: 'sans-serif',
            fontSize: 22,
            color: 'rgba(251,246,241,0.65)',
            lineHeight: 1.5,
            margin: 0,
            maxWidth: 620,
          }}
        >
          Luxury Soft Play · Bubble House · Sweet Corner
        </p>
      </div>
    ),
    { ...size },
  )
}
