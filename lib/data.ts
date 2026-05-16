// ─── Testimonials ─────────────────────────────────────────────────────────────
export interface Testimonial {
  initial: string
  name: string
  meta: string
  body: string
}

export const testimonials: Testimonial[] = [
  {
    initial: 'A',
    name: 'Ana M.',
    meta: 'Rođendan · Podgorica',
    body: 'Sve je bilo nestvarno — od trenutka kad su djeca ušla, do posljednje fotografije. Tim je razmislio o svemu i pre nego smo mi pitali.',
  },
  {
    initial: 'J',
    name: 'Jelena Đ.',
    meta: 'Krštenje · Tivat',
    body: 'Bubble House je oduzeo dah svima — i djeci i nama. Postavljanje, kićenje, sve im je krenulo sa osmijehom.',
  },
  {
    initial: 'M',
    name: 'Marija K.',
    meta: 'Porodični skup · Bar',
    body: 'Sweet Corner je toliko lijepo izgledao da niko nije htio prvi da uzme — a onda nije ostalo ništa. Zovem ih opet sljedeće godine.',
  },
]

// ─── Instagram moments ────────────────────────────────────────────────────────
// Workflow:
//   src: '/images/ig/1.jpg'              → slika
//   src: { video: '/images/ig/1.mp4' }   → autoplay video (reel)
//   href: 'https://instagram.com/p/...'  → link ka objavi (obavezno)
export interface IgMoment {
  src: Slot
  href?: string
}

export const igMoments: IgMoment[] = [
  { src: { video: '/images/ig/video1.mp4' }, href: 'https://www.instagram.com/p/DYU2X7QoPz4/' },
  { src: '/images/ig/2.jpg',            href: 'https://www.instagram.com/p/DIrPfMQipK6/?img_index=1' },
  { src: { video: '/images/ig/3.mp4' }, href: 'https://www.instagram.com/p/DXj9kpJiBqZ/' },
  { src: '/images/ig/4.jpg',            href: 'https://www.instagram.com/p/DIrPfMQipK6/?img_index=1' },
  { src: {video: '/images/ig/5.mp4'},            href: 'https://www.instagram.com/p/DWW_1ASCL-7/' },
]

// ─── Categories ───────────────────────────────────────────────────────────────
// Struktura foldera po kategoriji:
//
//   public/images/soft/
//     hero.jpg      ← glavna slika (340px visina)
//     detail.jpg    ← lijeva slika u redu (1.4fr)
//     moment.jpg    ← desna slika u redu (1fr)
//     wide.jpg      ← široka slika na dnu (260px visina)
//     gallery/      ← slike za full galeriju
//       01.jpg
//       02.jpg
//       ...
//
//   public/images/bubble/  (isti raspored)
//   public/images/sweet/   (isti raspored)
//
// Workflow: ubaci sliku u public/, postavi path ovdje — Categories.tsx se ne dira.

// ─── Hero media ───────────────────────────────────────────────────────────────
// Dva zasebna slota — mobile (<1024px) i desktop (≥1024px).
// Svaki može biti slika ili video. Ostavi undefined za gradient fallback.
//
//   export const heroMediaMobile: Slot = '/images/hero/mobile.jpg'
//   export const heroMediaDesktop: Slot = '/images/hero/desktop.jpg'
//   export const heroMediaMobile: Slot = { video: '/images/hero/mobile.mp4' }
export const heroMediaMobile: Slot | undefined = '/images/hero/primary-bg-phone.jpg'
export const heroMediaDesktop: Slot | undefined = '/images/hero/bg.jpg'

export type CategoryKey = 'soft' | 'bubble' | 'sweet'

// String = putanja do slike. { video: '...' } = putanja do videa.
export type Slot = string | { video: string }

export interface Category {
  key: CategoryKey
  label: string
  numeral: string
  caption: string
  count: string
  tint: string
  tint2: string
  hero?: Slot
  detail?: Slot
  moment?: Slot
  wide?: Slot
  gallery: string[]
}

export const categories: Category[] = [
  {
    key: 'soft',
    label: 'Luxury Soft Play',
    numeral: 'I.',
    caption:
      'Pastelne forme, mekani materijali, sigurni krajevi — studio krojen za naše najmlađe.',
    count: '120+ realizacija',
    tint: 'rgba(212, 165, 160, 0.32)',
    tint2: 'rgba(243, 220, 208, 0.42)',
    hero: '/images/soft/hero.jpg',
    detail: { video:'/images/soft/detail.mp4'},
    moment: '/images/soft/moment.jpg',
    wide:   '/images/soft/wide.jpg',
    gallery: [
      // '/images/soft/gallery/01.jpg',
      // '/images/soft/gallery/02.jpg',
    ],
  },
  {
    key: 'bubble',
    label: 'Bubble House',
    numeral: 'II.',
    caption:
      'Transparentni mehurovi, igrivi oblici, nestvarni ugođaj — iskustvo koje djeca opisuju godinama poslije.',
    count: '80+ postavljanja',
    tint: 'rgba(180, 200, 220, 0.36)',
    tint2: 'rgba(231, 207, 154, 0.30)',
     hero: { video: '/images/bubble/hero.mp4' },
    // hero:   '/images/bubble/hero.jpg',
    detail: {video: '/images/bubble/detail.mp4'},
    moment: {video: '/images/bubble/moment.mp4'},
    wide: {video: '/images/bubble/wide.mp4'},
    gallery: [
      // '/images/bubble/gallery/01.jpg',
    ],
  },
  {
    key: 'sweet',
    label: 'Sweet Corner',
    numeral: 'III.',
    caption:
      'Handcrafted slatkiši, elegantna prezentacija, personalizovani detalji — slatki kutak koji krase svaki kadar.',
    count: '200+ evenata',
    tint: 'rgba(231, 207, 154, 0.42)',
    tint2: 'rgba(212, 165, 160, 0.30)',
    hero: { video: '/images/sweet/hero.mp4' },
    detail: { video: '/images/sweet/detail.mp4' },
    moment: { video: '/images/sweet/moment.mp4' },
    wide:   { video: '/images/sweet/wide.mp4' },
    gallery: [
      // '/images/sweet/gallery/01.jpg',
    ],
  },
]
