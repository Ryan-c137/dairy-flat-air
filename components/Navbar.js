'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">✈</span>
          <span className="font-semibold text-lg">Dairy Flat Air</span>
        </Link>

        {/* Nav links */}
        <div className="flex gap-6 text-sm">
          <Link
            href="/"
            className={pathname === '/' ? 'text-black font-medium' : 'text-gray-500 hover:text-black'}
          >
            Search flights
          </Link>
          <Link
            href="/my-bookings"
            className={pathname === '/my-bookings' ? 'text-black font-medium' : 'text-gray-500 hover:text-black'}
          >
            My bookings
          </Link>
        </div>

      </div>
    </nav>
  )
}