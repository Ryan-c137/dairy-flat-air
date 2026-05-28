import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request, { params }) {
  const { id } = await params

  const client = await clientPromise
  const db = client.db()

  const flight = await db.collection('schedules').findOne({
    _id: new ObjectId(id)
  })

  // Convert _id to string before sending
  return Response.json({ ...flight, _id: flight._id.toString() })
}