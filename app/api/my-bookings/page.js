'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function MyBookingsPage() {
  const router = useRouter()
  const [email,    setEmail]    = useState('')
  const [flights,  setFlights]  = useState([])
  const [searched, setSearched] = useState(false)

  async function handleSearch(e) {
    e.preventDefault()
    const res = await fetch(`/api/bookings?email=${email}`)
    const data = await res.json()
    setFlights(data)
    setSearched(true)
  }

  async function handleCancel(ref) {
    if (!confirm('Cancel this booking?')) return

    await fetch(`/api/bookings/${ref}`, { method: 'DELETE' })

    // Refresh the list after cancelling
    const res = await fetch(`/api/bookings?email=${email}`)
    const data = await res.json()
    setFlights(data)
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <button onClick={() => router.push('/')} className="text-sm text-gray-500 mb-6 underline">
        ← Home
      </button>

      <h1 className="text-2xl font-bold mb-6">My bookings</h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="flex-1 border rounded-lg p-3"
        />
        <button type="submit" className="bg-black text-white px-6 rounded-lg">
          Find
        </button>
      </form>

      {searched && flights.length === 0 && (
        <p className="text-gray-500">No bookings found for this email.</p>
      )}

      <div className="flex flex-col gap-4">
        {flights.map(flight => {
          // Find this user's booking inside the flight's bookings array
          const myBooking = flight.bookings.find(b => b.email === email)

          return (
            <div key={flight._id} className="border rounded-xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{flight.flightNumber} · {flight.origin} → {flight.destination}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(flight.departure).toLocaleString('en-NZ')}
                  </p>
                  <p className="text-sm mt-1">
                    Ref: <span className="font-mono font-bold">{myBooking?.bookingRef}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleCancel(myBooking?.bookingRef)}
                  className="text-red-500 text-sm border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50"
                >
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