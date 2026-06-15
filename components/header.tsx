'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'
import { Session } from 'better-auth/types'
import { Menu, X, Heart, LogOut } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  session: Session | null
}

export default function Header({ session }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Find My Nest
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/properties" className="text-gray-700 hover:text-blue-600">
              Properties
            </Link>

            {session?.user && (
              <>
                <Link
                  href="/favorites"
                  className="text-gray-700 hover:text-blue-600 flex items-center gap-2"
                >
                  <Heart size={20} />
                  Favorites
                </Link>

                <div className="flex items-center gap-4 pl-4 border-l">
                  <span className="text-gray-700">{session.user.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-700 hover:text-blue-600 flex items-center gap-2"
                  >
                    <LogOut size={20} />
                    Sign Out
                  </button>
                </div>
              </>
            )}

            {!session?.user && (
              <div className="flex items-center gap-4">
                <Link
                  href="/sign-in"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <Link
              href="/properties"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Properties
            </Link>

            {session?.user && (
              <>
                <Link
                  href="/favorites"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                >
                  <Heart size={20} />
                  Favorites
                </Link>

                <div className="px-4 py-2 border-t">
                  <p className="text-gray-700 text-sm mb-2">
                    {session.user.email}
                  </p>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut size={20} />
                    Sign Out
                  </button>
                </div>
              </>
            )}

            {!session?.user && (
              <div className="px-4 py-2 border-t space-y-2">
                <Link
                  href="/sign-in"
                  className="block w-full text-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
