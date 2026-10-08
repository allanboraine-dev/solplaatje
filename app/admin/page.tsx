import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { logout } from '@/actions/auth'
import { AdminForm } from '@/components/features/AdminForm'

export default async function AdminDashboard() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await (supabase as any)
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single()
    
  if (profile?.role !== 'comms_manager') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-4">
        <div className="text-center p-8 bg-red-50 border border-red-200 rounded-xl max-w-md w-full shadow-sm">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          <h2 className="text-xl font-bold text-red-700 mb-2">Access Denied</h2>
          <p className="text-red-600">You do not have permission to view the Comms Command Center.</p>
        </div>
      </div>
    )
  }

  // Fetch their recent updates
  const { data: recentUpdates } = await (supabase as any)
    .from('updates')
    .select('id, title, ward_number, created_at, comments(id)')
    .eq('author_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
        <div>
          <h1 className="text-2xl font-bold">Comms Command Center</h1>
          <p className="text-slate-300 text-sm mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Logged in as {profile.full_name}
          </p>
        </div>
        <form action={logout}>
          <button className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors border border-slate-700 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Secure Logout
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: The Form */}
        <div className="lg:col-span-2">
          <AdminForm />
        </div>

        {/* Right Column: Recent Activity & Stats */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Recent Broadcasts Widget */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-5 py-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
                Your Recent Broadcasts
              </h3>
            </div>
            <div className="p-0">
              {recentUpdates && recentUpdates.length > 0 ? (
                <ul className="divide-y divide-slate-100">
                  {recentUpdates.map((update: any) => (
                    <li key={update.id} className="p-5 hover:bg-slate-50 transition-colors">
                      <p className="font-semibold text-slate-800 text-sm line-clamp-1 mb-2">{update.title}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[10px] font-bold px-2 py-1 bg-blue-100 text-blue-800 rounded">
                          {update.ward_number || 'City-wide'}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                          <span className="flex items-center gap-1" title="Comments">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                            {update.comments?.length || 0}
                          </span>
                          <span>{new Date(update.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 text-center text-sm text-slate-500 italic">
                  You haven't sent any broadcasts yet.
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Tips Widget */}
          <div className="bg-primary/5 rounded-2xl border border-primary/10 p-5 shadow-sm">
            <h3 className="font-bold text-primary mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Comms Guidelines
            </h3>
            <ul className="text-sm text-slate-700 space-y-3">
              <li className="flex gap-2">
                <span className="text-primary mt-0.5">•</span>
                Always specify a ward if the issue is localized (e.g., pipeline burst).
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-0.5">•</span>
                Only use the Push Notification toggle for urgent emergencies.
              </li>
              <li className="flex gap-2">
                <span className="text-primary mt-0.5">•</span>
                Monitor the Updates feed to respond to resident comments.
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}
