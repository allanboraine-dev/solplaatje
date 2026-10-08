'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addComment(formData: FormData) {
  const updateId = formData.get('updateId') as string
  const content = formData.get('content') as string

  if (!updateId || !content) {
    return { error: 'Comment content is required' }
  }

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'You must be logged in to comment' }
  }

  const { error } = await (supabase as any)
    .from('comments')
    .insert({
      update_id: updateId,
      author_id: user.id,
      content
    })

  if (error) {
    console.error('Error adding comment:', error.message)
    return { error: error.message }
  }

  revalidatePath('/updates')
  return { success: true }
}
