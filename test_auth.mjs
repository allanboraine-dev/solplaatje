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

async function testAuth() {
  const testEmail = `johndoe${Math.floor(Math.random() * 10000)}@gmail.com`
  const testPassword = 'SecurePassword123!'

  console.log(`\n1. Attempting to Sign Up as ${testEmail}...`)
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
    options: {
      data: {
        full_name: 'John Doe',
        role: 'citizen'
      }
    }
  })

  if (signUpError) {
    console.error('❌ Sign Up Failed:', signUpError.message)
    return
  }
  console.log('✅ Sign Up Successful! User ID:', signUpData.user?.id)
}

testAuth()
