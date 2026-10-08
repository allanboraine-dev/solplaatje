'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateTruckLocation(plateNumber: string, lat: number, lng: number, ward?: string) {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Unauthorized' }
  }

  // Upsert location based on driver/plate
  const { error } = await (supabase as any)
    .from('refuse_trucks')
    .upsert({
      driver_id: user.id,
      plate_number: plateNumber,
      latitude: lat,
      longitude: lng,
      current_ward: ward || null,
      last_updated: new Date().toISOString()
    }, { onConflict: 'plate_number' })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/trucks')
  return { success: true }
}

export async function fetchTrucks() {
  const supabase = createClient()
  const { data, error } = await (supabase as any)
    .from('refuse_trucks')
    .select('*')
    .order('last_updated', { ascending: false })

  if (error) {
    console.error('Error fetching trucks:', error.message)
    return []
  }

  return data
}
