'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createUpdate(prevState: any, formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const wardNumber = formData.get('wardNumber') as string || null
  const isPushSent = formData.get('isPushSent') === 'true'

  if (!title || !content) {
    return { error: 'Title and content are required' }
  }

  const supabase = createClient()

  // Get current user to set author_id
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Unauthorized' }
  }

  const { error } = await (supabase as any)
    .from('updates')
    .insert({
      title,
      content,
      ward_number: wardNumber,
      is_push_sent: isPushSent,
      author_id: user.id
    })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/updates')
  revalidatePath('/admin')
  redirect('/updates')
}

export async function fetchUpdates(archived: boolean = false) {
  const supabase = createClient()
  
  // Get current user's ward if logged in
  const { data: { user } } = await supabase.auth.getUser()
  let userWard = null
  
  if (user) {
    const { data: profile } = await (supabase as any).from('profiles').select('ward_number').eq('id', user.id).single()
    userWard = profile?.ward_number
  }

  // Calculate cutoff date (e.g., 7 days ago)
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - 7)

  let query = (supabase as any)
    .from('updates')
    .select(`
      *, 
      profiles!updates_author_id_fkey(full_name),
      comments(
        id,
        content,
        created_at,
        profiles(full_name)
      )
    `)
    .order('created_at', { ascending: false })

  // Apply archive filter
  if (archived) {
    query = query.lt('created_at', cutoffDate.toISOString())
  } else {
    query = query.gte('created_at', cutoffDate.toISOString())
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching updates:', error.message)
    return []
  }

  // If user has a registered ward, only show their ward + city-wide (null) updates
  if (userWard && data) {
    return data.filter((update: any) => update.ward_number === null || update.ward_number === userWard)
  }

  return data
}
