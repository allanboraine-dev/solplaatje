import { fetchUpdates } from '@/actions/updates'
import { CommentForm } from '@/components/features/CommentForm'
import Link from 'next/link'

export default async function UpdatesPage() {
  const updates = await fetchUpdates()

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] pt-8 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        
        {/* Feed Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Civic Feed</h1>
            <p className="text-slate-500 mt-1">Showing active updates from the past 7 days.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/updates/archive" className="text-sm font-semibold text-slate-500 hover:text-primary underline-offset-4 hover:underline transition-all">
              View Archive
            </Link>
            <div className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live
            </div>
          </div>
        </div>
        
        {updates.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-slate-200">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            <h3 className="text-lg font-bold text-slate-700 mb-1">No updates yet</h3>
            <p className="text-slate-500">You're all caught up! Check back later for official announcements.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {updates.map((update: any) => (
              <div key={update.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-shadow hover:shadow-md">
                
                {/* Update Post Header */}
                <div className="p-6 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                        {update.profiles?.full_name?.charAt(0) || 'C'}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-none">{update.profiles?.full_name || 'Comms Manager'}</p>
                        <p className="text-xs text-slate-500 mt-1">{new Date(update.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                      </div>
                    </div>
                    {update.ward_number ? (
                      <span className="bg-blue-50 text-blue-700 border border-blue-100 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-right max-w-[40%] line-clamp-1">
                        {update.ward_number}
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        City-wide
                      </span>
                    )}
                  </div>
                  
                  {/* Update Content */}
                  <h2 className="text-xl font-bold text-slate-900 mb-3 leading-tight">{update.title}</h2>
                  <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{update.content}</p>
                </div>

                {/* Interaction Bar */}
                <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
                  <div className="flex items-center gap-2 font-medium">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    {update.comments?.length || 0} {update.comments?.length === 1 ? 'Comment' : 'Comments'}
                  </div>
                </div>

                {/* Comments Section */}
                <div className="px-6 pb-6 bg-slate-50">
                  {update.comments && update.comments.length > 0 && (
                    <div className="space-y-4 mb-4 pt-4 border-t border-slate-200/60">
                      {update.comments.map((comment: any) => (
                        <div key={comment.id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-600 font-bold text-sm">
                            {comment.profiles?.full_name?.charAt(0) || 'R'}
                          </div>
                          <div className="flex-grow bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm">
                            <div className="flex justify-between items-baseline mb-1">
                              <span className="font-bold text-sm text-slate-900">{comment.profiles?.full_name || 'Resident'}</span>
                              <span className="text-[10px] text-slate-400 font-medium">{new Date(comment.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-sm text-slate-700">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Add Comment Input */}
                  <div className={update.comments?.length > 0 ? "pt-2" : "pt-4 border-t border-slate-200/60"}>
                    <CommentForm updateId={update.id} />
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
