'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const airports = [
  { icao: 'NZNE', city: 'Auckland (Dairy Flat)' },
  { icao: 'YSSY', city: 'Sydney'                },
  { icao: 'NZRO', city: 'Rotorua'               },
  { icao: 'NZGB', city: 'Great Barrier Island'  },
  { icao: 'NZCI', city: 'Chatham Islands'       },
  { icao: 'NZTL', city: 'Lake Tekapo'           },
]

export default function HomePage() {
  const router = useRouter()
  const [origin,      setOrigin]      = useState('NZNE')
  const [destination, setDestination] = useState('YSSY')
  const [date,        setDate]        = useState('')

  function handleSearch(e) {
    e.preventDefault()
    router.push(`/results?origin=${origin}&destination=${destination}&date=${date}`)
  }

  return (
    <main className="bg-slate-50 min-h-screen">
      <div className="bg-black text-white py-20 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">New Zealand's airline</h1>
      </div>

      <div className="max-w-xl mx-auto px-6 -mt-8">
        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-5">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-700 font-bold uppercase tracking-wide">From</label>
              <select value={origin} onChange={e => setOrigin(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-3 mt-1 text-sm bg-white text-slate-900">
                {airports.map(a => <option key={a.icao} value={a.icao}>{a.city}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-700 font-bold uppercase tracking-wide">To</label>
              <select value={destination} onChange={e => setDestination(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-3 mt-1 text-sm bg-white text-slate-900">
                {airports.map(a => <option key={a.icao} value={a.icao}>{a.city}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-700 font-bold uppercase tracking-wide">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required
              className="w-full border border-slate-300 rounded-lg p-3 mt-1 text-sm text-slate-900" />
          </div>

          <button type="submit"
            className="bg-black text-white rounded-xl py-4 font-medium text-sm hover:bg-slate-800 transition-colors shadow-sm">
            Search flights →
          </button>
        </form>

        {/* Added "View my bookings" Link directly underneath the search form */}
        <div className="text-center mt-6">
          <Link 
            href="/my-bookings" 
            className="text-sm font-semibold text-slate-700 hover:text-black underline underline-offset-4 transition-colors"
          >
            Check your booking through email ✉
          </Link>
        </div>

        {/* Fleet info */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center pb-16">
          {[
            { name: 'SyberJet SJ30i', seats: 6, route: 'Sydney' },
            { name: 'Cirrus SF50',    seats: 4, route: 'Rotorua · Great Barrier' },
            { name: 'HondaJet Elite', seats: 5, route: 'Chatham · Tekapo' },
          ].map(plane => (
            <div key={plane.name} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
              <p className="font-semibold text-slate-900 text-sm">{plane.name}</p>
              <p className="text-2xl font-bold my-1 text-black">{plane.seats}</p>
              {/* Changed text-gray-400 to text-slate-600 */}
              <p className="text-xs font-medium text-slate-600">seats · {plane.route}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}