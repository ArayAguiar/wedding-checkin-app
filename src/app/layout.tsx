// src\app\layout.tsx
import type { Metadata } from 'next'
import { Cinzel, Cinzel_Decorative, Josefin_Sans } from 'next/font/google'
import './globals.css'


const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel', 
  display: 'swap',            
})

const cinzelDecorative = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel-decorative',
  display: 'swap',
})

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-josefin',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Casamento Cindy e Fausto',
  description: 'Website oficial do casamento de Cindy e Fausto - 18 de Outubro de 2025',
  keywords: ['casamento', 'wedding', 'Cindy', 'Fausto'],
  
  openGraph: {
    title: 'Casamento Cindy e Fausto',
    description: 'Junte-se a nos para celebrar o nosso dia especial',
    type: 'website',
    locale: 'pt_PT',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Casamento Cindy e Fausto',
    description: '18 de Outubro de 2025',
  },
  
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={`${cinzel.variable} ${cinzelDecorative.variable} ${josefin.variable}`}>
        {children}
      </body>
    </html>
  )
}