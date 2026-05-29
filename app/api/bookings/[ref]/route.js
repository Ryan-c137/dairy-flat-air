import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function DELETE(request, { params }) {
  const { ref } = params

  if (typeof ref !== 'string' || !ref) {
    return NextResponse.json({ success: false, error: 'Missing or invalid ref' }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db()

    await db.collection('schedules').updateOne(
      { 'bookings.bookingRef': ref },
      { $pull: { bookings: { bookingRef: ref } } }
    )

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/bookings/[ref] error:', err)
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
