'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Read the values from the URL — e.g. ?origin=NZNE&destination=YSSY&date=2026-06-06
  const origin      = searchParams.get('origin')
  const destination = searchParams.get('destination')
  const date        = searchParams.get('date')

  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // When the page loads, call your API with the same values from the URL
    fetch(`/api/schedules?origin=${origin}&destination=${destination}&date=${date}`)
      .then(res => res.json())
      .then(data => {
        setFlights(data)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="p-8">Searching flights...</p>

  return (
    <main className="max-w-2xl mx-auto p-8">
      <button onClick={() => router.back()} className="text-sm text-gray-500 mb-6 underline">
        ← Back to search
      </button>

      <h1 className="text-2xl font-bold mb-1">{origin} → {destination}</h1>
      <p className="text-gray-500 mb-6">{date}</p>

      {flights.length === 0 && (
        <p className="text-gray-500">No flights found for this date.</p>
      )}

      <div className="flex flex-col gap-4">
        {flights.map(flight => {
          const seatsLeft = flight.capacity - flight.bookings.length
          const isFull = seatsLeft === 0

          return (
            <div key={flight._id} className="border rounded-xl p-5 flex justify-between items-center">
              <div>
                <p className="font-semibold">{flight.flightNumber} · {flight.aircraft}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Departs {new Date(flight.departure).toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit' })}
                  {' · '}
                  Arrives {new Date(flight.arrival).toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="text-sm mt-1">
                  {isFull
                    ? <span className="text-red-500">Full</span>
                    : <span className="text-green-600">{seatsLeft} seat{seatsLeft > 1 ? 's' : ''} left</span>
                  }
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">${flight.price}</p>
                <button
                  onClick={() => router.push(`/book/${flight._id}`)}
                  disabled={isFull}
                  className="mt-2 bg-black text-white text-sm px-4 py-2 rounded-lg disabled:opacity-40"
                >
                  Book
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}