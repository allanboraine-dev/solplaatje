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

async function testUpdatesTable() {
  console.log('Testing public.updates table...')
  const { data, error } = await supabase.from('updates').select('*').limit(1)
  
  if (error) {
    console.error('Error:', error.message)
    console.error('Hint:', error.hint || 'No hint provided')
  } else {
    console.log('Success! Table exists. Data:', data)
  }
}

testUpdatesTable()
