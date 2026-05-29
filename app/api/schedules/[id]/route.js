import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request, { params }) {
  const { id } = await params

  // If id is bad format, ObjectId() will throw — catch it
  let objectId
  try {
    objectId = new ObjectId(id)
  } catch {
    return Response.json({ error: 'Invalid flight ID' }, { status: 400 })
  }

  const client = await clientPromise
  const db = client.db()

  const flight = await db.collection('schedules').findOne({ _id: objectId })

  if (!flight) {
    return Response.json({ error: 'Flight not found' }, { status: 404 })
  }

  return Response.json({ ...flight, _id: flight._id.toString() })
}