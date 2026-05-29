'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const airports = [
  { icao: 'NZNE', city: 'Auckland (Dairy Flat)' },
  { icao: 'YSSY', city: 'Sydney'                },
  { icao: 'NZRO', city: 'Rotorua'               },
  { icao: 'NZGB', city: 'Great Barrier Island'  },
  { icao: 'NZCI', city: 'Chatham Islands'       },
  { icao: 'NZTL', city: 'Lake Tekapo'           },
]

export default function HomePage() {
  const router = useRouter()
  const [origin,      setOrigin]      = useState('NZNE')
  const [destination, setDestination] = useState('YSSY')
  const [date,        setDate]        = useState('')

  function handleSearch(e) {
    e.preventDefault()
    router.push(`/results?origin=${origin}&destination=${destination}&date=${date}`)
  }

  return (
    <main>
      {/* Hero banner */}
      <div className="bg-black text-white py-20 px-6 text-center">
        <p className="text-sm uppercase tracking-widest text-gray-400 mb-3">New Zealand's boutique airline</p>
        <h1 className="text-5xl font-bold mb-4">Fly somewhere special</h1>
        <p className="text-gray-400 text-lg">Small planes. Real destinations. No crowds.</p>
      </div>

      {/* Search form card */}
      <div className="max-w-xl mx-auto px-6 -mt-8">
        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-5">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">From</label>
              <select value={origin} onChange={e => setOrigin(e.target.value)}
                className="w-full border rounded-lg p-3 mt-1 text-sm bg-white">
                {airports.map(a => <option key={a.icao} value={a.icao}>{a.city}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">To</label>
              <select value={destination} onChange={e => setDestination(e.target.value)}
                className="w-full border rounded-lg p-3 mt-1 text-sm bg-white">
                {airports.map(a => <option key={a.icao} value={a.icao}>{a.city}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wide">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} required
              className="w-full border rounded-lg p-3 mt-1 text-sm" />
          </div>

          <button type="submit"
            className="bg-black text-white rounded-xl py-4 font-medium text-sm hover:bg-gray-800 transition-colors">
            Search flights →
          </button>
        </form>

        {/* Fleet info */}
        <div className="mt-10 grid grid-cols-3 gap-4 text-center pb-16">
          {[
            { name: 'SyberJet SJ30i', seats: 6, route: 'Sydney' },
            { name: 'Cirrus SF50',    seats: 4, route: 'Rotorua · Great Barrier' },
            { name: 'HondaJet Elite', seats: 5, route: 'Chatham · Tekapo' },
          ].map(plane => (
            <div key={plane.name} className="bg-white rounded-xl p-4 border">
              <p className="font-medium text-sm">{plane.name}</p>
              <p className="text-2xl font-bold my-1">{plane.seats}</p>
              <p className="text-xs text-gray-400">seats · {plane.route}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

// 'use client'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'

// const airports = [
//   { icao: 'NZNE', city: 'Auckland (Dairy Flat)' },
//   { icao: 'YSSY', city: 'Sydney'                },
//   { icao: 'NZRO', city: 'Rotorua'               },
//   { icao: 'NZGB', city: 'Great Barrier Island'  },
//   { icao: 'NZCI', city: 'Chatham Islands'       },
//   { icao: 'NZTL', city: 'Lake Tekapo'           },
// ]

// export default function HomePage() {
//   const router = useRouter()

//   // Three pieces of state — one for each field in the form
//   const [origin,      setOrigin]      = useState('NZNE')
//   const [destination, setDestination] = useState('YSSY')
//   const [date,        setDate]        = useState('')

//   function handleSearch(e) {
//     e.preventDefault()  // stops the browser from refreshing the page
//     // Build the URL and navigate to results page
//     router.push(`/results?origin=${origin}&destination=${destination}&date=${date}`)
//   }

//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center p-8">
//       <h1 className="text-4xl font-bold mb-2">Dairy Flat Air ✈</h1>
//       <p className="text-gray-500 mb-8">Boutique flights from Auckland</p>

//       <form onSubmit={handleSearch} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md flex flex-col gap-4">
//         <div>
//           <label className="text-sm text-gray-600">From</label>
//           <select
//             value={origin}
//             onChange={e => setOrigin(e.target.value)}
//             className="w-full border rounded-lg p-2 mt-1"
//           >
//             {airports.map(a => (
//               <option key={a.icao} value={a.icao}>{a.city}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">To</label>
//           <select
//             value={destination}
//             onChange={e => setDestination(e.target.value)}
//             className="w-full border rounded-lg p-2 mt-1"
//           >
//             {airports.map(a => (
//               <option key={a.icao} value={a.icao}>{a.city}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label className="text-sm text-gray-600">Date</label>
//           <input
//             type="date"
//             value={date}
//             onChange={e => setDate(e.target.value)}
//             required
//             className="w-full border rounded-lg p-2 mt-1"
//           />
//         </div>

//         <button type="submit" className="bg-black text-white rounded-lg p-3 font-medium hover:bg-gray-800">
//           Search flights
//         </button>
//       </form>

//       <Link href="/my-bookings" className="mt-6 text-sm text-gray-500 underline">
//         View my bookings
//       </Link>
//     </main>
//   )
// }