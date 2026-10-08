import { fetchUpdates } from '@/actions/updates'
import { CommentForm } from '@/components/features/CommentForm'
import Link from 'next/link'

export default async function UpdatesArchivePage() {
  const updates = await fetchUpdates(true) // Pass true for archived updates

  return (
    <div className="bg-slate-100 min-h-[calc(100vh-4rem)] pt-8 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        
        {/* Feed Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-600 tracking-tight flex items-center gap-3">
              <Link href="/updates" className="text-slate-400 hover:text-primary transition-colors">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              </Link>
              Historical Archive
            </h1>
            <p className="text-slate-500 mt-1 ml-11">Viewing inactive updates older than 7 days.</p>
          </div>
          <div className="hidden sm:block">
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-slate-200 text-slate-600">
              Archived
            </span>
          </div>
        </div>
        
        {updates.length === 0 ? (
          <div className="text-center p-12 bg-white rounded-2xl shadow-sm border border-slate-200">
            <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
            <h3 className="text-lg font-bold text-slate-700 mb-1">No historical updates</h3>
            <p className="text-slate-500">There are no updates older than 7 days for your ward.</p>
          </div>
        ) : (
          <div className="space-y-8 opacity-80">
            {updates.map((update: any) => (
              <div key={update.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-shadow hover:shadow-md">
                
                {/* Update Post Header */}
                <div className="p-6 pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-slate-500 font-bold text-lg shadow-inner">
                        {update.profiles?.full_name?.charAt(0) || 'C'}
                      </div>
                      <div>
                        <p className="font-bold text-slate-700 leading-none">{update.profiles?.full_name || 'Comms Manager'}</p>
                        <p className="text-xs text-slate-400 mt-1">{new Date(update.created_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                      </div>
                    </div>
                    {update.ward_number ? (
                      <span className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-right max-w-[40%] line-clamp-1">
                        {update.ward_number}
                      </span>
                    ) : (
                      <span className="bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        City-wide
                      </span>
                    )}
                  </div>
                  
                  {/* Update Content */}
                  <h2 className="text-xl font-bold text-slate-700 mb-3 leading-tight">{update.title}</h2>
                  <p className="text-slate-600 whitespace-pre-wrap leading-relaxed">{update.content}</p>
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
                              <span className="font-bold text-sm text-slate-700">{comment.profiles?.full_name || 'Resident'}</span>
                              <span className="text-[10px] text-slate-400 font-medium">{new Date(comment.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-sm text-slate-500">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Add Comment Input - Still allowed on archived posts? Yes, why not */}
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
