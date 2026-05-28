import clientPromise from '@/lib/mongodb'

export async function DELETE(request, { params }) {
  const { ref } = await params

  const client = await clientPromise
  const db = client.db()

  await db.collection('schedules').updateOne(
    { 'bookings.bookingRef': ref },
    { $pull: { bookings: { bookingRef: ref } } }
  )

  return Response.json({ success: true })
}