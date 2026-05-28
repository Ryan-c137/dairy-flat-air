import clientPromise from '@/lib/mongodb'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const origin      = searchParams.get('origin')
  const destination = searchParams.get('destination')
  const date        = searchParams.get('date')

  const client = await clientPromise
  const db = client.db()

  const from = new Date(date)
  const to   = new Date(date)
  to.setDate(to.getDate() + 1)

  const flights = await db.collection('schedules').find({
    origin,
    destination,
    departure: { $gte: from, $lt: to }
  }).toArray()

  // Convert every _id from ObjectId → plain string
  const cleaned = flights.map(f => ({
    ...f,
    _id: f._id.toString()
  }))

  return Response.json(cleaned)
}