import { Suspense } from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  getPropertyById,
  getPropertyReviews,
  isFavorite,
} from '@/app/actions/properties'
import ReviewSection from '@/components/review-section'
import FavoriteButton from '@/components/favorite-button'

export const metadata = {
  title: 'Property Details - Find My Nest',
}

async function PropertyDetails({ id }: { id: string }) {
  const property = await getPropertyById(parseInt(id))

  if (!property) {
    notFound()
  }

  const reviews = await getPropertyReviews(property.id)
  const favorited = await isFavorite(property.id)

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : 0

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative h-96 mb-6 bg-gray-200 rounded-lg overflow-hidden">
            {property.imageUrl ? (
              <Image
                src={property.imageUrl}
                alt={property.title}
                fill
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                <span className="text-gray-600">No image available</span>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {property.title}
                </h1>
                <p className="text-gray-600 text-lg">{property.address}</p>
              </div>
              <FavoriteButton propertyId={property.id} initialFavorited={favorited} />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 py-6 border-y">
              <div>
                <p className="text-gray-600 text-sm">Bedrooms</p>
                <p className="text-2xl font-bold text-gray-900">
                  {property.bedrooms}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Bathrooms</p>
                <p className="text-2xl font-bold text-gray-900">
                  {property.bathrooms}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Square Feet</p>
                <p className="text-2xl font-bold text-gray-900">
                  {property.squareFeet?.toLocaleString() || 'N/A'}
                </p>
              </div>
            </div>

            {property.description && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {property.description}
                </p>
              </div>
            )}

            {property.amenities && property.amenities.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Suspense
            fallback={
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600">Loading reviews...</p>
              </div>
            }
          >
            <ReviewSection propertyId={property.id} reviews={reviews} />
          </Suspense>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow sticky top-4">
            <div className="p-6">
              <div className="mb-6">
                <p className="text-gray-600 text-sm mb-2">Monthly Rent</p>
                <p className="text-4xl font-bold text-blue-600">
                  ${parseFloat(property.price).toLocaleString()}
                </p>
              </div>

              <div className="mb-6 pb-6 border-b">
                {reviews.length > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < Math.round(parseFloat(avgRating as string))
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {avgRating} ({reviews.length} reviews)
                    </span>
                  </div>
                )}
              </div>

              <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition mb-3">
                Contact Owner
              </button>

              <button className="w-full border-2 border-blue-600 text-blue-600 font-semibold py-3 rounded-lg hover:bg-blue-50 transition">
                Schedule Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold">Property Details</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Suspense
          fallback={
            <div className="text-center py-12">
              <p className="text-gray-600">Loading property details...</p>
            </div>
          }
        >
          <PropertyDetails id={params.id} />
        </Suspense>
      </div>
    </div>
  )
}
