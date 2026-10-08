import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sol Plaatje Citizen App',
  description: 'Civic communications PWA for Sol Plaatje Municipality',
  manifest: '/manifest.json',
  themeColor: '#005a9c',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Sol Plaatje',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen bg-slate-50">{children}</main>
      </body>
    </html>
  )
}
