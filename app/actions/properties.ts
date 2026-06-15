'use server'

import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import {
  properties,
  favorites,
  reviews,
} from '@/lib/db/schema'
import { and, eq, desc, gte, lte, like, inArray } from 'drizzle-orm'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getUserId() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error('Unauthorized')
  return session.user.id
}

export async function getProperties(filters?: {
  location?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
}) {
  let query = db.select().from(properties).where(eq(properties.available, true))

  if (filters?.location) {
    query = query.where(
      like(properties.location, `%${filters.location}%`)
    )
  }

  if (filters?.minPrice) {
    query = query.where(gte(properties.price, filters.minPrice.toString()))
  }

  if (filters?.maxPrice) {
    query = query.where(lte(properties.price, filters.maxPrice.toString()))
  }

  if (filters?.bedrooms) {
    query = query.where(eq(properties.bedrooms, filters.bedrooms))
  }

  return query.orderBy(desc(properties.createdAt))
}

export async function getPropertyById(id: number) {
  const result = await db
    .select()
    .from(properties)
    .where(and(eq(properties.id, id), eq(properties.available, true)))

  return result[0] || null
}

export async function getPropertyReviews(propertyId: number) {
  return db
    .select()
    .from(reviews)
    .where(eq(reviews.propertyId, propertyId))
    .orderBy(desc(reviews.createdAt))
}

export async function addReview(
  propertyId: number,
  rating: number,
  comment: string
) {
  const userId = await getUserId()

  await db.insert(reviews).values({
    userId,
    propertyId,
    rating,
    comment,
  })

  revalidatePath(`/properties/${propertyId}`)
}

export async function toggleFavorite(propertyId: number) {
  const userId = await getUserId()

  const existing = await db
    .select()
    .from(favorites)
    .where(
      and(eq(favorites.userId, userId), eq(favorites.propertyId, propertyId))
    )

  if (existing.length > 0) {
    await db
      .delete(favorites)
      .where(
        and(
          eq(favorites.userId, userId),
          eq(favorites.propertyId, propertyId)
        )
      )
  } else {
    await db.insert(favorites).values({
      userId,
      propertyId,
    })
  }

  revalidatePath(`/properties/${propertyId}`)
  revalidatePath('/favorites')
}

export async function getFavorites() {
  const userId = await getUserId()

  const userFavorites = await db
    .select()
    .from(favorites)
    .where(eq(favorites.userId, userId))

  const propertyIds = userFavorites.map((f) => f.propertyId)

  if (propertyIds.length === 0) return []

  return db
    .select()
    .from(properties)
    .where(inArray(properties.id, propertyIds))
    .orderBy(desc(properties.createdAt))
}

export async function isFavorite(propertyId: number) {
  const userId = await getUserId()

  const result = await db
    .select()
    .from(favorites)
    .where(
      and(eq(favorites.userId, userId), eq(favorites.propertyId, propertyId))
    )

  return result.length > 0
}
