import { login } from '@/actions/auth'
import Link from 'next/link'
import Image from 'next/image'
import { LoginForm } from './LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/20 z-10 mix-blend-multiply"></div>
        <Image 
          src="/logo.jpg" 
          alt="Sol Plaatje Municipality" 
          fill 
          className="object-cover opacity-30 scale-110"
        />
        <div className="relative z-20 text-center text-white px-12">
          <h2 className="text-4xl font-bold mb-4">Welcome Back.</h2>
          <p className="text-lg text-slate-300">Log in to stay updated on critical civic announcements, track services, and communicate with your ward representatives.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Sign in to your account</h1>
            <p className="text-slate-500 mt-2 text-sm">Enter your email and password below</p>
          </div>
          <LoginForm />
          <p className="mt-8 text-center text-sm text-slate-600">
            Don't have an account yet?{' '}
            <Link href="/signup" className="text-primary hover:text-blue-800 font-semibold transition-colors">
              Register as Resident
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
