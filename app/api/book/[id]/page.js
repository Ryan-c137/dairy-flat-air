'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function BookPage() {
  const { id } = useParams()   // gets the flight ID from the URL
  const router = useRouter()

  const [flight,  setFlight]  = useState(null)
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [booking, setBooking] = useState(null)  // null = show form, object = show confirmation

  // Load flight details when page opens
  useEffect(() => {
    fetch(`/api/schedules/${id}`)
      .then(res => res.json())
      .then(data => setFlight(data))
  }, [])

  async function handleBook(e) {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ flightId: id, passengerName: name, email })
    })

    const data = await res.json()

    if (data.error) {
      alert(data.error)
      setLoading(false)
      return
    }

    setBooking(data)   // switch to confirmation view
    setLoading(false)
  }

  if (!flight) return <p className="p-8">Loading flight details...</p>

  // ── Confirmation / invoice view ──────────────────────────────
  if (booking) {
    return (
      <main className="max-w-lg mx-auto p-8">
        <div className="border rounded-xl p-8">
          <p className="text-green-600 font-semibold mb-4">✓ Booking confirmed</p>
          <h1 className="text-2xl font-bold mb-6">Your itinerary</h1>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Booking reference</span>
              <span className="font-mono font-bold text-lg">{booking.bookingRef}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Flight</span>
              <span>{flight.flightNumber} · {flight.aircraft}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Route</span>
              <span>{flight.origin} → {flight.destination}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Departure</span>
              <span>{new Date(flight.departure).toLocaleString('en-NZ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Arrival</span>
              <span>{new Date(flight.arrival).toLocaleString('en-NZ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Passenger</span>
              <span>{name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span>{email}</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold">
              <span>Total paid</span>
              <span>${flight.price}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-6">Save your booking reference to cancel later.</p>

          <button
            onClick={() => router.push('/')}
            className="mt-6 w-full border rounded-lg p-3 text-sm hover:bg-gray-50"
          >
            Back to home
          </button>
        </div>
      </main>
    )
  }

  // ── Booking form view ────────────────────────────────────────
  return (
    <main className="max-w-lg mx-auto p-8">
      <button onClick={() => router.back()} className="text-sm text-gray-500 mb-6 underline">
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-1">Book your seat</h1>
      <p className="text-gray-500 mb-6">
        {flight.flightNumber} · {flight.origin} → {flight.destination} ·{' '}
        {new Date(flight.departure).toLocaleDateString('en-NZ')}
      </p>

      <form onSubmit={handleBook} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-gray-600">Full name</label>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            required
            placeholder="Jane Smith"
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="jane@example.com"
            className="w-full border rounded-lg p-3 mt-1"
          />
        </div>
        <div className="border rounded-lg p-4 bg-gray-50 flex justify-between">
          <span className="text-gray-600">Price</span>
          <span className="font-bold">${flight.price}</span>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white rounded-lg p-3 font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? 'Confirming...' : 'Confirm booking'}
        </button>
      </form>
    </main>
  )
}