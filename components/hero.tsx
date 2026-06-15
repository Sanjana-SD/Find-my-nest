'use client'

import Link from 'next/link'
import SearchBar from './search-bar'

export default function Hero({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>

      <div className="relative container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-pretty">
            Find My Nest
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 text-pretty">
            Discover your perfect rental home today
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar />
        </div>

        {!isLoggedIn && (
          <div className="text-center space-y-4">
            <p className="text-blue-100">
              Create an account to save your favorite properties
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/sign-up"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
              >
                Sign Up
              </Link>
              <Link
                href="/sign-in"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
