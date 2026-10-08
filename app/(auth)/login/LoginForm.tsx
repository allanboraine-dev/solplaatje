'use client'

import { login } from '@/actions/auth'
import { useFormState, useFormStatus } from 'react-dom'

function SubmitBtn() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 mt-4 shadow-md hover:shadow-lg"
    >
      {pending ? 'Signing in...' : 'Sign In'}
    </button>
  )
}

export function LoginForm() {
  const [state, formAction] = useFormState(login, null)

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 text-center">
          {state.error}
        </div>
      )}
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50 focus:bg-white transition-colors"
          placeholder="name@example.com"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50 focus:bg-white transition-colors"
          placeholder="••••••••"
        />
      </div>
      <SubmitBtn />
    </form>
  )
}
