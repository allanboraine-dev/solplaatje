'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCommsManager, setIsCommsManager] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const supabase = createClient()
    
    async function checkRole() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await (supabase as any)
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()
          setIsCommsManager(profile?.role === 'comms_manager')
        } else {
          setIsCommsManager(false)
        }
      } catch {
        setIsCommsManager(false)
      }
    }

    checkRole()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkRole()
    })

    return () => subscription.unsubscribe()
  }, [])

  // Never show Manager Dashboard tab on resident registration/signup or for non-managers
  const showManagerDashboard = isCommsManager && pathname !== '/signup' && pathname !== '/login'

  return (
    <header className="bg-white/85 backdrop-blur-md shadow-xs sticky top-0 z-50 border-b border-slate-200/80 transition-all">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 md:gap-4 group z-50">
            <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border border-slate-100 shadow-sm group-hover:shadow-md transition-shadow">
              <Image 
                src="/logo.jpg" 
                alt="Sol Plaatje Municipality Logo" 
                fill 
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl md:text-2xl text-slate-900 leading-tight group-hover:text-primary transition-colors">
                Sol Plaatje
              </span>
              <span className="text-xs md:text-sm uppercase tracking-wider text-slate-500 font-bold">
                Civic Communications
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link href="/updates" className="px-4 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-50 hover:text-primary transition-colors">
              Updates
            </Link>
            <Link href="/trucks" className="px-4 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-50 hover:text-primary transition-colors">
              Truck Tracking
            </Link>
            {showManagerDashboard && (
              <Link href="/admin" className="px-4 py-2 text-sm font-medium text-slate-600 rounded-md hover:bg-slate-50 hover:text-primary transition-colors">
                Manager Dashboard
              </Link>
            )}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg hover:bg-blue-700 shadow-sm hover:shadow transition-all">
              Register
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="md:hidden p-2 text-slate-600 hover:text-primary focus:outline-none z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 md:top-24 left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xl py-4 px-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
          <Link 
            href="/updates" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-4 py-3 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg"
          >
            Updates Feed
          </Link>
          <Link 
            href="/trucks" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-4 py-3 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg"
          >
            Truck Tracking
          </Link>
          {showManagerDashboard && (
            <Link 
              href="/admin" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-slate-700 bg-slate-50 rounded-lg"
            >
              Manager Dashboard
            </Link>
          )}
          
          <div className="h-px bg-slate-200 my-2"></div>
          
          <Link 
            href="/login" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-4 py-3 text-sm font-medium text-center text-slate-700 border border-slate-200 rounded-lg"
          >
            Log in
          </Link>
          <Link 
            href="/signup" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="px-4 py-3 text-sm font-medium text-center text-white bg-primary rounded-lg shadow-sm"
          >
            Register as Resident
          </Link>
        </div>
      )}
    </header>
  )
}

