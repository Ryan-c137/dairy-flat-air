'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function MyBookingsPage() {
  const [email,    setEmail]    = useState('')
  const [flights,  setFlights]  = useState([])
  const [searched, setSearched] = useState(false)
  const [loading,  setLoading]  = useState(false)

  async function handleSearch(e) {
    e.preventDefault()
    setLoading(true)
    const res  = await fetch(`/api/bookings?email=${email}`)
    const data = await res.json()
    setFlights(data)
    setSearched(true)
    setLoading(false)
  }

  async function handleCancel(ref) {
    if (!confirm('Cancel this booking?')) return
    await fetch(`/api/bookings/${ref}`, { method: 'DELETE' })
    const res  = await fetch(`/api/bookings?email=${email}`)
    const data = await res.json()
    setFlights(data)
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <Link href="/" className="text-sm text-slate-600 font-semibold hover:text-black mb-6 inline-flex items-center gap-1 transition-colors">
        ← Back to Home
      </Link>
      <h1 className="text-2xl font-bold mb-2">My bookings</h1>
      <p className="text-gray-400 text-sm mb-8">Enter your email to view or cancel bookings.</p>

      <form onSubmit={handleSearch} className="flex gap-3 mb-10">
        <input type="email" placeholder="your@email.com" value={email}
          onChange={e => setEmail(e.target.value)} required
          className="flex-1 border rounded-xl px-4 py-3 text-sm" />
        <button type="submit"
          className="bg-black text-white px-6 rounded-xl text-sm hover:bg-gray-800 transition-colors">
          {loading ? '...' : 'Find'}
        </button>
      </form>

      {searched && flights.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">🎫</p>
          <p>No bookings found for this email.</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {flights.map(flight => {
          const mine = flight.bookings.find(b => b.email === email)
          return (
            <div key={flight._id} className="bg-white border rounded-2xl p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-black">{flight.flightNumber}</span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{flight.aircraft}</span>
                  </div>
                  <p className="text-sm text-gray-600">{flight.origin} → {flight.destination}</p>
                  <p className="text-sm text-gray-400 mt-1">{new Date(flight.departure).toLocaleString('en-NZ')}</p>
                  <p className="text-xs mt-3 font-mono bg-gray-50 border text-black rounded-lg px-3 py-1 inline-block">
                    {mine?.bookingRef}
                  </p>
                </div>
                <button onClick={() => handleCancel(mine?.bookingRef)}
                  className="text-sm text-red-500 border border-red-200 px-4 py-2 rounded-xl hover:bg-red-50 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}