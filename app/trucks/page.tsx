'use client'

import { useEffect, useState } from 'react'
import { fetchTrucks } from '@/actions/trucks'
import { Database } from '@/types/database.types'

type Truck = Database['public']['Tables']['refuse_trucks']['Row']

export default function TrucksPage() {
  const [trucks, setTrucks] = useState<Truck[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await fetchTrucks()
      setTrucks(data)
      setLoading(false)
    }
    load()
    
    // In a real app we might poll or use Supabase Realtime here
    const interval = setInterval(load, 15000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Live Truck Tracking</h1>
      
      {loading ? (
        <div className="text-center p-12 text-slate-500">Loading map data...</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Mock Map View */}
          <div className="bg-slate-200 h-[400px] rounded-xl flex items-center justify-center border border-slate-300 relative overflow-hidden shadow-inner">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cartographer.png")' }}></div>
            <p className="text-slate-500 font-medium z-10 bg-white/80 px-4 py-2 rounded-md shadow">
              Interactive Map Interface
            </p>
            {trucks.map(truck => (
              truck.latitude && truck.longitude && (
                <div 
                  key={truck.id} 
                  className="absolute w-4 h-4 bg-primary rounded-full border-2 border-white shadow-md transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ 
                    // This is a naive mock projection just for visual placeholder
                    left: `${50 + (truck.longitude % 1) * 100}%`, 
                    top: `${50 - (truck.latitude % 1) * 100}%` 
                  }}
                  title={truck.plate_number}
                />
              )
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-xl font-semibold mb-4 text-primary">Active Trucks</h2>
            {trucks.length === 0 ? (
              <p className="text-sm text-slate-500">No trucks currently tracked.</p>
            ) : (
              <ul className="space-y-4">
                {trucks.map(truck => (
                  <li key={truck.id} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-slate-800">{truck.plate_number}</span>
                      {truck.current_ward && (
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded max-w-[50%] text-right truncate">
                          {truck.current_ward}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-slate-500">
                      Last updated: {new Date(truck.last_updated).toLocaleTimeString()}
                    </div>
                    <div className="text-xs text-slate-400 mt-1">
                      GPS: {truck.latitude?.toFixed(4)}, {truck.longitude?.toFixed(4)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
