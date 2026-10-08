'use client'

import { signup } from '@/actions/auth'
import { useFormState, useFormStatus } from 'react-dom'

function SubmitBtn() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 mt-6 shadow-md hover:shadow-lg"
    >
      {pending ? 'Creating Profile...' : 'Complete Registration'}
    </button>
  )
}

export function SignupForm() {
  const [state, formAction] = useFormState(signup, null)

  return (
    <form action={formAction} className="space-y-4">
      {state?.error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 text-center">
          {state.error}
        </div>
      )}
      
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="fullName">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50 focus:bg-white transition-colors"
          placeholder="e.g. John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="municipalAccountNumber">
          Municipal Account Number
        </label>
        <input
          id="municipalAccountNumber"
          name="municipalAccountNumber"
          type="text"
          required
          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50 focus:bg-white transition-colors"
          placeholder="e.g. 1234567890"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-1" htmlFor="wardNumber">
          Your Ward / Area
        </label>
        <select
          id="wardNumber"
          name="wardNumber"
          required
          className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-50 focus:bg-white transition-colors"
        >
          <option value="">-- Select Your Ward --</option>
          <optgroup label="Northern & Western Settlements">
            <option value="Ward 1">Ward 1: Roylglen, Sunset Manor, Lethabo Park, Platfontein</option>
            <option value="Ward 32">Ward 32: Phutanang</option>
            <option value="Ward 33">Ward 33: Riemvasmaak & surrounding informal settlements</option>
          </optgroup>
          <optgroup label="Galeshewe & Surrounds">
            <option value="Ward 2">Ward 2: Ipopeng and Ratanang</option>
            <option value="Ward 3">Ward 3: Galeshewe North, Homevale, Homelite, Homestead</option>
            <option value="Wards 4, 5 & 7">Wards 4, 5 & 7: Colville, Northview, Vergenoeg</option>
            <option value="Wards 6 & 8">Wards 6 & 8: Central Galeshewe</option>
          </optgroup>
          <optgroup label="Other Areas">
            <option value="Roodepan Area">Roodepan Area & extensions</option>
            <option value="Wards 14, 20, 23, 31">Wards 14, 20, 23, 31: Kimberley Central & Suburbs</option>
            <option value="Ritchie & Motswedimosa">Ritchie & Motswedimosa</option>
            <option value="Riverton & Spytfontein">Riverton & Spytfontein</option>
          </optgroup>
        </select>
      </div>

      <SubmitBtn />
    </form>
  )
}
