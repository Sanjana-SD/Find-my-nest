'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { toggleFavorite } from '@/app/actions/properties'

interface FavoriteButtonProps {
  propertyId: number
  initialFavorited: boolean
}

export default function FavoriteButton({
  propertyId,
  initialFavorited,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggle = async () => {
    setIsLoading(true)
    try {
      setIsFavorited(!isFavorited)
      await toggleFavorite(propertyId)
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
      setIsFavorited(!isFavorited)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition disabled:opacity-50"
    >
      <Heart
        size={28}
        className={
          isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'
        }
      />
    </button>
  )
}
