'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { toggleFavorite } from '@/app/actions/properties'

interface PropertyCardProps {
  property: {
    id: number
    title: string
    description?: string | null
    location: string
    price: string
    bedrooms: number
    bathrooms: string | number
    imageUrl?: string | null
  }
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)

  const handleFavorite = async () => {
    setIsFavorited(!isFavorited)
    await toggleFavorite(property.id)
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
      <div className="relative h-64 bg-gray-200">
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

        <button
          onClick={handleFavorite}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition"
        >
          <Heart
            size={24}
            className={isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4">{property.location}</p>

        <div className="flex gap-6 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">
              {property.bedrooms}
            </span>
            <span>Bedrooms</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">
              {property.bathrooms}
            </span>
            <span>Bathrooms</span>
          </div>
        </div>

        <div className="border-t pt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Monthly Rent</p>
            <p className="text-2xl font-bold text-blue-600">
              ${parseFloat(property.price).toLocaleString()}
            </p>
          </div>

          <Link
            href={`/properties/${property.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  )
}
