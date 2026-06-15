import Link from 'next/link'
import { getProperties } from '@/app/actions/properties'
import PropertyCard from './property-card'

export default async function FeaturedProperties() {
  const properties = await getProperties()
  const featured = properties.slice(0, 6)

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Properties
          </h2>
          <p className="text-gray-600 text-lg">
            Discover some of our latest listings
          </p>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No properties available yet. Check back soon!
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/properties"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  )
}
