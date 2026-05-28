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

  // Three pieces of state — one for each field in the form
  const [origin,      setOrigin]      = useState('NZNE')
  const [destination, setDestination] = useState('YSSY')
  const [date,        setDate]        = useState('')

  function handleSearch(e) {
    e.preventDefault()  // stops the browser from refreshing the page
    // Build the URL and navigate to results page
    router.push(`/results?origin=${origin}&destination=${destination}&date=${date}`)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-2">Dairy Flat Air ✈</h1>
      <p className="text-gray-500 mb-8">Boutique flights from Auckland</p>

      <form onSubmit={handleSearch} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-600">From</label>
          <select
            value={origin}
            onChange={e => setOrigin(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1"
          >
            {airports.map(a => (
              <option key={a.icao} value={a.icao}>{a.city}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">To</label>
          <select
            value={destination}
            onChange={e => setDestination(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1"
          >
            {airports.map(a => (
              <option key={a.icao} value={a.icao}>{a.city}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">Date</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            className="w-full border rounded-lg p-2 mt-1"
          />
        </div>

        <button type="submit" className="bg-black text-white rounded-lg p-3 font-medium hover:bg-gray-800">
          Search flights
        </button>
      </form>

      <Link href="/my-bookings" className="mt-6 text-sm text-gray-500 underline">
        View my bookings
      </Link>
    </main>
  )
}