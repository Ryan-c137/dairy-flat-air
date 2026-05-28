'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const router       = useRouter()

  const origin      = searchParams.get('origin')
  const destination = searchParams.get('destination')
  const date        = searchParams.get('date')

  const [flights, setFlights] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/schedules?origin=${origin}&destination=${destination}&date=${date}`)
      .then(res => res.json())
      .then(data => { setFlights(data); setLoading(false) })
  }, [])

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <button onClick={() => router.back()} className="text-sm text-gray-400 hover:text-black mb-6 flex items-center gap-1">
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-1">{origin} → {destination}</h1>
      <p className="text-gray-400 text-sm mb-8">{date}</p>

      {loading && (
        <div className="flex flex-col gap-3">
          {[1,2,3].map(n => (
            <div key={n} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {!loading && flights.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">✈</p>
          <p>No flights on this date.</p>
          <button onClick={() => router.back()} className="mt-4 text-sm underline">Try another date</button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {flights.map(flight => {
          const seatsLeft = flight.capacity - flight.bookings.length
          const full      = seatsLeft === 0

          return (
            <div key={flight._id} className={`bg-white border rounded-2xl p-6 flex justify-between items-center ${full ? 'opacity-60' : ''}`}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">{flight.flightNumber}</span>
                  <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{flight.aircraft}</span>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(flight.departure).toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit' })}
                  {' → '}
                  {new Date(flight.arrival).toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className={`text-xs mt-2 font-medium ${full ? 'text-red-400' : 'text-green-600'}`}>
                  {full ? 'Sold out' : `${seatsLeft} seat${seatsLeft > 1 ? 's' : ''} left`}
                </p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold">${flight.price}</p>
                <button
                  disabled={full}
                  onClick={() => router.push(`/book/${flight._id}`)}
                  className="mt-2 bg-black text-white text-sm px-5 py-2 rounded-xl disabled:opacity-30 hover:bg-gray-800 transition-colors">
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