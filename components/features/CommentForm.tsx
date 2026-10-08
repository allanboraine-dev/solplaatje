'use client'

import { addComment } from '@/actions/comments'
import { useFormStatus } from 'react-dom'
import { useRef } from 'react'

function SubmitBtn() {
  const { pending } = useFormStatus()
  return (
    <button 
      disabled={pending} 
      type="submit" 
      className="bg-slate-200 text-slate-800 px-4 py-2 rounded-r-md hover:bg-slate-300 font-medium disabled:opacity-50 text-sm border border-slate-300 border-l-0"
    >
      {pending ? '...' : 'Post'}
    </button>
  )
}

export function CommentForm({ updateId }: { updateId: string }) {
  const ref = useRef<HTMLFormElement>(null)
  
  async function action(formData: FormData) {
    await addComment(formData)
    ref.current?.reset()
  }

  return (
    <form ref={ref} action={action} className="mt-4 flex w-full">
      <input type="hidden" name="updateId" value={updateId} />
      <input 
        type="text" 
        name="content" 
        required 
        placeholder="Add a comment or ask the Comms Manager..." 
        className="flex-grow px-3 py-2 border border-slate-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary text-sm"
      />
      <SubmitBtn />
    </form>
  )
}
