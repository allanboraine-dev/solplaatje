import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export default async function StressTestPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')

  const runTest = async () => {
    'use server'
    const db = createClient()
    const { data: { user: activeUser } } = await db.auth.getUser()
    
    if (!activeUser) return
    
    const mockUpdates = Array.from({ length: 50 }).map((_, i) => ({
      author_id: activeUser.id,
      title: `🚨 SYSTEM VOLUME TEST - BROADCAST #${i + 1}`,
      content: `This is an automatically generated stress-test packet. We are injecting massive amounts of data into the civic feed to ensure the platform remains stable, responsive, and scrollable under heavy load.\n\nTest ID: ${crypto.randomUUID()}`,
      ward_number: i % 3 === 0 ? 'Ward 1' : (i % 3 === 1 ? 'Ward 2' : null),
      is_push_sent: false
    }))
    
    await (db as any).from('updates').insert(mockUpdates)
    
    revalidatePath('/updates')
    redirect('/updates')
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 text-white">
      <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl border border-red-500/30 text-center shadow-2xl shadow-red-900/20">
        <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Data Stress Test</h1>
        <p className="text-slate-400 mb-8 text-sm">
          Warning: Clicking this button will instantly inject <strong>50 mock updates</strong> into the live database to test volume capacity and UI performance.
        </p>
        <form action={runTest}>
          <button 
            type="submit" 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-red-600/30 flex justify-center items-center gap-2"
          >
            EXECUTE DATA INJECTION
          </button>
        </form>
      </div>
    </div>
  )
}
