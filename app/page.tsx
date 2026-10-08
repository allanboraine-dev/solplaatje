import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      
      {/* --- STUNNING HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center pt-12 pb-24 px-4 overflow-hidden bg-slate-50">
        
        {/* Background Magic: Grid Pattern & Animated Glassmorphism Orbs */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Subtle Grid */}
          <div 
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 40M40 0L40 40' fill='none' stroke='%23cbd5e1' stroke-width='1' opacity='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}
          ></div>
          
          {/* Deep Glowing Orbs */}
          <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/20 mix-blend-multiply filter blur-[120px] animate-pulse" style={{ animationDuration: '7s' }}></div>
          <div className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-cyan-400/20 mix-blend-multiply filter blur-[100px] animate-pulse" style={{ animationDuration: '11s' }}></div>
          <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/10 mix-blend-multiply filter blur-[120px] animate-pulse" style={{ animationDuration: '9s' }}></div>
        </div>

        {/* Hero Content */}
        <div className="container relative z-10 mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
            
            {/* Left side: Typography & Call to Action */}
            <div className="lg:w-[55%] text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-blue-800 text-sm font-bold mb-8 shadow-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
                </span>
                Official Sol Plaatje Civic Portal
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                Your City. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500">
                  Smarter & Connected.
                </span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed font-medium">
                Experience the future of civic engagement. Get real-time alerts tailored to your ward, track refuse trucks live, and connect directly with the municipality.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/signup" 
                  className="px-8 py-4 bg-blue-700 text-white rounded-2xl font-bold text-lg text-center shadow-[0_8px_30px_rgb(29,78,216,0.3)] hover:shadow-[0_8px_40px_rgb(29,78,216,0.5)] hover:-translate-y-1 transition-all duration-300"
                >
                  Register as Resident
                </Link>
                <Link 
                  href="/updates" 
                  className="px-8 py-4 bg-white text-slate-800 rounded-2xl font-bold text-lg text-center border border-slate-200 hover:border-blue-200 hover:bg-blue-50 shadow-sm hover:text-blue-700 transition-all duration-300"
                >
                  Explore Live Feed
                </Link>
              </div>
            </div>
            
            {/* Right side: Massive Interactive Logo Display */}
            <div className="lg:w-[45%] relative flex justify-center w-full mt-12 lg:mt-0">
              
              {/* Massive Glow behind the logo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-300 rounded-[3rem] transform rotate-3 scale-105 -z-10 blur-2xl opacity-40"></div>
              
              {/* The Logo Container */}
              <div className="relative w-80 h-80 sm:w-[400px] sm:h-[400px] lg:w-[540px] lg:h-[540px] bg-white rounded-[3rem] shadow-2xl border-[12px] border-white/80 backdrop-blur-xl flex items-center justify-center p-8 transform transition-transform hover:scale-[1.02] duration-500 group">
                <Image 
                  src="/logo.jpg" 
                  alt="Sol Plaatje Municipality Logo" 
                  fill 
                  className="object-contain p-8 sm:p-12 transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl"
                  priority
                />
              </div>
              
              {/* Floating Widget 1 */}
              <div className="absolute -bottom-8 -left-4 sm:left-4 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce" style={{ animationDuration: '3.5s' }}>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-inner">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-widest mb-0.5">Live System</p>
                  <p className="text-sm sm:text-base font-extrabold text-slate-900">All Wards Active</p>
                </div>
              </div>

              {/* Floating Widget 2 */}
              <div className="absolute -top-8 -right-4 sm:right-4 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shadow-inner">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">Instant Alerts</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 bg-white relative z-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Empowering the Frances Baard District</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">A fully integrated digital platform designed to bridge the gap between residents and municipal services.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-slate-50 rounded-[2rem] p-10 border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-white shadow-md text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Targeted Ward Alerts</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Receive crucial announcements like water outages or electricity maintenance targeted specifically to the ward you live in.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-slate-50 rounded-[2rem] p-10 border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-white shadow-md text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Live Truck Tracking</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Never miss collection day again. Watch exactly where the refuse trucks are in real-time within your neighborhood on a live map.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-slate-50 rounded-[2rem] p-10 border border-slate-100 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-white shadow-md text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Direct Engagement</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Ask questions, reply to announcements, and interact directly with the Communications Manager regarding any official updates.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
