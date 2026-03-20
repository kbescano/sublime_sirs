import React from 'react'
import './globals.css'
import MobileMenu from './components/MobileMenu'


export const metadata = {
  description: 'A. Mabini Chapter, Order of DeMolay',
  title: 'Pilantod',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
      </head>
      <body className="antialiased">
        <main className="min-h-screen pb-20 lg:pb-0">
          {children}
        </main>
        <MobileMenu />
      </body>
    </html>
  )
}