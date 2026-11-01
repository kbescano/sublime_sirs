import React from 'react'
import { Anton, DM_Sans } from 'next/font/google'
import { getPayload } from 'payload'
import config from '@/payload.config'
import './globals.css'
import MobileMenu from './components/MobileMenu'
import SiteHeader from './components/SiteHeader'
import SiteFooter from './components/SiteFooter'
import ScrollVelocity from './components/ScrollVelocity'
import IntroCurtain, { introScript } from './components/IntroCurtain'

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })

export const metadata = {
  description: 'A. Mabini Chapter, Order of DeMolay',
  title: 'Pilantod',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const payload = await getPayload({ config })
  const headerData = await payload.findGlobal({ slug: 'header-config' })

  return (
    // The intro script toggles a class on <html> before hydration
    <html lang="en" className={`${anton.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body className="antialiased">
        <IntroCurtain tagline={headerData.topLabel} />
        <SiteHeader tagline={headerData.topLabel} />
        {/* Page lifts off the footer, which waits underneath */}
        <main className="relative z-10 min-h-screen bg-paper overflow-clip rounded-b-[32px] md:rounded-b-[56px] shadow-[0_30px_60px_rgba(11,11,16,0.35)]">
          {children}
        </main>
        <SiteFooter tagline={headerData.topLabel} />
        <MobileMenu />
        <ScrollVelocity />
      </body>
    </html>
  )
}
