import clientPromise from '@/lib/mongodb'

// Get searching result from DB
export async function GET(request) {

    const { searchParams } = new URL(request.url)
    const origin      = searchParams.get('origin')
    const destination = searchParams.get('destination')
    const date        = searchParams.get('date')  

    const client = await clientPromise
    const db = client.db()

    // Set from and to window
    const from = new Date(date)
    const to   = new Date(date)
    to.setDate(to.getDate() + 1)

    // Get flights that suit
    const flights = await db.collection('schedules').find({
        origin:      origin,
        destination: destination,
        departure:   { $gte: from, $lt: to }
    }).toArray()

    return Response.json(flights)
}