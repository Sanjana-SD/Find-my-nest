'use client'

import { useState } from 'react'
import { addReview } from '@/app/actions/properties'

interface ReviewSectionProps {
  propertyId: number
  reviews: Array<{
    id: number
    rating: number
    comment: string | null
    userId: string
    createdAt: Date
  }>
}

export default function ReviewSection({
  propertyId,
  reviews,
}: ReviewSectionProps) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await addReview(propertyId, rating, comment)
      setComment('')
      setRating(5)
    } catch (error) {
      console.error('Failed to add review:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>

      {/* Add Review Form */}
      <form onSubmit={handleSubmit} className="mb-8 pb-8 border-b">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Leave a Review
        </h3>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none transition"
              >
                <span
                  className={`text-3xl ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div
              key={review.id}
              className="pb-6 border-b last:border-b-0"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>

              {review.comment && (
                <p className="text-gray-700">{review.comment}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center py-8">
            No reviews yet. Be the first to review!
          </p>
        )}
      </div>
    </div>
  )
}
