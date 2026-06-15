import { Suspense } from 'react'
import { getProperties } from '@/app/actions/properties'
import PropertyCard from '@/components/property-card'
import SearchBar from '@/components/search-bar'

export const metadata = {
  title: 'Properties - Find My Nest',
  description: 'Browse all available rental properties',
}

interface SearchParams {
  location?: string
  minPrice?: string
  maxPrice?: string
  bedrooms?: string
}

async function PropertiesList({ searchParams }: { searchParams: SearchParams }) {
  const filters = {
    location: searchParams.location,
    minPrice: searchParams.minPrice ? parseInt(searchParams.minPrice) : undefined,
    maxPrice: searchParams.maxPrice ? parseInt(searchParams.maxPrice) : undefined,
    bedrooms: searchParams.bedrooms ? parseInt(searchParams.bedrooms) : undefined,
  }

  const properties = await getProperties(filters)

  return (
    <div>
      {properties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No properties found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search filters
          </p>
        </div>
      )}
    </div>
  )
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-2">Available Properties</h1>
          <p className="text-blue-100">Browse all our rental listings</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <SearchBar />
        </div>

        <Suspense
          fallback={
            <div className="text-center py-12">
              <p className="text-gray-600">Loading properties...</p>
            </div>
          }
        >
          <PropertiesList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  )
}
