import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Link from 'next/link'

export const metadata = {
  title: 'Profile - Find My Nest',
  description: 'Manage your account settings and preferences',
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect('/sign-in')
  }

  const user = session.user

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2">My Profile</h1>
          <p className="text-blue-100">Manage your account</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Information</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                Name
              </label>
              <p className="text-gray-900 text-lg">{user.name || 'Not set'}</p>
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                Email
              </label>
              <p className="text-gray-900 text-lg">{user.email}</p>
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-semibold mb-2">
                Email Verified
              </label>
              <p className="text-gray-900">
                {user.emailVerified ? (
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                    Verified
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                    Not Verified
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/properties"
              className="p-4 border border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition"
            >
              <h3 className="font-semibold text-gray-900 mb-2">Browse Properties</h3>
              <p className="text-sm text-gray-600">View all available rental properties</p>
            </Link>

            <Link
              href="/favorites"
              className="p-4 border border-gray-300 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition"
            >
              <h3 className="font-semibold text-gray-900 mb-2">My Favorites</h3>
              <p className="text-sm text-gray-600">View your saved properties</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
