import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { getFavorites } from '@/app/actions/properties'
import PropertyCard from '@/components/property-card'

export const metadata = {
  title: 'Favorites - Find My Nest',
  description: 'Your favorite rental properties',
}

export default async function FavoritesPage() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user) {
    redirect('/sign-in')
  }

  const favorites = await getFavorites()

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2">My Favorites</h1>
          <p className="text-blue-100">
            Properties you&apos;ve saved for later
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              No favorites yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start saving properties to view them later
            </p>
            <a
              href="/properties"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Browse Properties
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
