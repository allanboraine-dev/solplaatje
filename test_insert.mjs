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

async function testInsert() {
  const testEmail = 'comms_test' + Date.now() + '@example.com'
  const testPassword = 'SecurePassword123!'
  
  console.log('1. Signing up new user...')
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
    options: {
      data: { full_name: 'Comms Test', role: 'citizen' }
    }
  })
  
  if (authError) {
    console.error('Auth Error:', authError.message)
    return
  }
  
  console.log('User signed up/in:', authData.user?.id)
  
  // Make sure role is comms_manager
  console.log('2. Updating role...')
  const { error: updateError } = await supabase.from('profiles').update({ role: 'comms_manager' }).eq('id', authData.user.id)
  if (updateError) {
    console.error('Update Role Error:', updateError.message)
  }
  
  console.log('3. Inserting update...')
  const { error } = await supabase.from('updates').insert({
    title: 'Test Title',
    content: 'Test Content',
    author_id: authData.user.id,
    is_push_sent: false
  })
  
  if (error) {
    console.error('Insert Error:', error.message)
  } else {
    console.log('Insert successful!')
  }
}

testInsert()
