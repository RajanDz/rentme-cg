import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://rentme.cg'),
  title: 'rentme.cg — Luxury Kids Eventi & Soft Play u Crnoj Gori',
  description:
    'Premium dječiji eventi u Crnoj Gori — Luxury Soft Play, Bubble House, Sweet Corner. 300+ realizovanih događaja. Rezervacije preko WhatsApp-a.',
  openGraph: {
    title: 'rentme.cg — Luxury Kids Eventi',
    description:
      'Premium dječiji eventi u Crnoj Gori — Luxury Soft Play, Bubble House, Sweet Corner. 300+ realizovanih događaja.',
    locale: 'sr_ME',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: 'https://rentme.cg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="sr-Latn-ME"
      className={`${cormorant.variable} ${manrope.variable}`}
    >
      <body>
        {/* Skip-to-content — visible only on keyboard focus */}
        <a href="#main-content" className="skip-link">
          Preskoči na sadržaj
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
