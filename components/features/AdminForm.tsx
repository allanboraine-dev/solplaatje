'use client'

import { createUpdate } from '@/actions/updates'
import { useFormState, useFormStatus } from 'react-dom'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-primary text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-800 transition-all disabled:opacity-50 shadow-md hover:shadow-lg flex justify-center items-center gap-2"
    >
      {pending ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Broadcasting...
        </>
      ) : (
        'Broadcast Update'
      )}
    </button>
  )
}

export function AdminForm() {
  const [state, formAction] = useFormState(createUpdate, null)

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
      <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200/80">
        <h2 className="text-lg font-bold text-slate-800">Compose Broadcast</h2>
        <p className="text-sm text-slate-500">Send an official update to residents in specific wards or city-wide.</p>
      </div>

      <div className="p-6">
        {state?.error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="title">
              Announcement Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-colors"
              placeholder="e.g. Water Outage Scheduled for Tomorrow"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="content">
              Full Details
            </label>
            <textarea
              id="content"
              name="content"
              required
              rows={5}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-colors"
              placeholder="Provide all necessary information for the residents..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="wardNumber">
              Target Audience (Ward / Region)
            </label>
            <select
              id="wardNumber"
              name="wardNumber"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-colors"
            >
              <option value="">-- All Wards / City-wide Broadcast --</option>
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

          <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <input
              id="isPushSent"
              name="isPushSent"
              type="checkbox"
              value="true"
              className="w-5 h-5 text-primary border-slate-300 rounded focus:ring-primary"
            />
            <label className="text-sm font-medium text-blue-900" htmlFor="isPushSent">
              Send an urgent Push Notification to affected residents' phones
            </label>
          </div>

          <div className="pt-2">
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  )
}
