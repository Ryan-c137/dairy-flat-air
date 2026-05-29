// import clientPromise from '@/lib/mongodb'

// export async function DELETE(request, { params }) {
//   const { ref } = await params

//   const client = await clientPromise
//   const db = client.db()

//   await db.collection('schedules').updateOne(
//     { 'bookings.bookingRef': ref },
//     { $pull: { bookings: { bookingRef: ref } } }
//   )

//   return Response.json({ success: true })
// }

import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function DELETE(request, { params }) {
  const { ref } = params

  if (typeof ref !== 'string' || !ref) return NextResponse.json({ success: false }, { status: 400 })

  const client = await clientPromise
  const db = client.db()

  await db.collection('schedules').updateOne(
    { 'bookings.bookingRef': ref },
    { $pull: { bookings: { bookingRef: ref } } }
  )

  return NextResponse.json({ success: true })
}
