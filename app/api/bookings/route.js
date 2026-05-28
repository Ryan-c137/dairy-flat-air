import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(request) {
  const { flightId, passengerName, email } = await request.json()

  const client = await clientPromise
  const db = client.db()

  // 1. Find the flight
  const flight = await db.collection('schedules').findOne({
    _id: new ObjectId(flightId)
  })

  if (!flight) {
    return Response.json({ error: 'Flight not found' }, { status: 404 })
  }

  // 2. Check if full
  if (flight.bookings.length >= flight.capacity) {
    return Response.json({ error: 'Flight is full' }, { status: 400 })
  }

  // 3. Generate a booking reference like "DF-X7K2P"
  const bookingRef = 'DF-' + Math.random().toString(36).toUpperCase().slice(2, 7)

  // 4. Push the new booking into the flight's bookings array
  await db.collection('schedules').updateOne(
    { _id: new ObjectId(flightId) },
    { $push: { bookings: { bookingRef, passengerName, email, bookedAt: new Date() } } }
  )

  return Response.json({ bookingRef, flight })
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  const client = await clientPromise
  const db = client.db()

  const flights = await db.collection('schedules').find({
    'bookings.email': email
  }).toArray()

  return Response.json(flights)
}