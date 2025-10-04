import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Cinzel } from 'next/font/google';


import '../../src/app/globals.css'

const inter = Inter({ subsets: ['latin'] })
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Casamento Cindy e Fausto',
  description: 'Website oficial do casamento de Cindy e Fausto - 18 de Outubro de 2025',
  keywords: ['casamento', 'wedding', 'Cindy', 'Fausto', '2025'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cinzel+Decorative:wght@400;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
