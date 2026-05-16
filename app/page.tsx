import NavBar from '@/components/ui/NavBar'
import Hero from '@/components/sections/Hero'
import Intro from '@/components/sections/Intro'
import Categories from '@/components/sections/Categories'
import Story from '@/components/sections/Story'
import Testimonials from '@/components/sections/Testimonials'
import InstagramStrip from '@/components/sections/InstagramStrip'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import StickyWhatsApp from '@/components/ui/StickyWhatsApp'
import FloatingFab from '@/components/ui/FloatingFab'
import { config } from '@/lib/config'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EventPlanner',
  name: 'rentme.cg',
  legalName: 'Camaj Company L&N',
  url: 'https://rentme.cg',
  telephone: config.whatsappNumber,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Podgorica',
    addressCountry: 'ME',
  },
  areaServed: 'ME',
  sameAs: [config.instagramLink()],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="main-content">
        <NavBar />
        <Hero id="hero" />
        <Intro />
        <Categories />
        <Story />
        <Testimonials />
        <InstagramStrip />
        <Contact id="contact" />
        <Footer />
        <StickyWhatsApp />
        <FloatingFab />
      </main>
    </>
  )
}
