import Link from 'next/link'
import Image from 'next/image'
import { SignupForm } from './SignupForm'

export default function SignupPage() {
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
          <h2 className="text-4xl font-bold mb-4">Join Your Community.</h2>
          <p className="text-lg text-slate-300">Create an official resident profile to connect with your ward's Communications Manager, get real-time alerts, and more.</p>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-lg bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Register as a Resident</h1>
            <p className="text-slate-500 mt-2 text-sm">Please provide your details below</p>
          </div>
          
          <SignupForm />

          <p className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:text-blue-800 font-semibold transition-colors">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
