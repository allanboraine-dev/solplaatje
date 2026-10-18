import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  themeColor: '#005a9c',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Sol Plaatje Citizen App',
  description: 'Civic communications PWA for Sol Plaatje Municipality',
  manifest: '/manifest.json',
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
      <body className={`${inter.className} min-h-screen relative bg-slate-50/80 text-slate-900`}>
        {/* Global Ambient Civic Background */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden select-none">
          {/* Subtle civic dot mesh */}
          <div className="civic-dot-pattern absolute inset-0 opacity-[0.55]" />
          
          {/* Soft ambient gradient orbs */}
          <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-blue-600/10 blur-[130px] -z-10" />
          <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-cyan-400/10 blur-[120px] -z-10" />
          <div className="absolute bottom-10 left-1/3 w-[600px] h-[450px] rounded-full bg-indigo-500/8 blur-[140px] -z-10" />
          <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] rounded-full bg-amber-400/5 blur-[120px] -z-10" />
        </div>

        <Header />
        <main className="relative min-h-[calc(100vh-5rem)] flex flex-col">{children}</main>
      </body>
    </html>
  )
}

