import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'

const envPath = path.resolve('.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')
const env = {}
envContent.split('\n').forEach(line => {
  const [key, ...values] = line.split('=')
  if (key && values.length) {
    env[key.trim()] = values.join('=').trim()
  }
})

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

async function checkDb() {
  console.log('Checking if public.profiles table exists...')
  const { data, error } = await supabase.from('profiles').select('*').limit(1)
  
  if (error) {
    console.error('Error querying profiles:', error.message)
  } else {
    console.log('Profiles table exists! Data:', data)
  }
}

checkDb()
