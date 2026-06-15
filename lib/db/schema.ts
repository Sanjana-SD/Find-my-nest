import {
  pgTable,
  serial,
  text,
  timestamp,
  boolean,
  numeric,
  integer,
  decimal,
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

// Better Auth Tables
export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailverified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdat').notNull().defaultNow(),
  updatedAt: timestamp('updatedat').notNull().defaultNow(),
})

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expiresat').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdat').notNull().defaultNow(),
  updatedAt: timestamp('updatedat').notNull().defaultNow(),
  ipAddress: text('ipaddress'),
  userAgent: text('useragent'),
  userId: text('userid')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
})

export const account = pgTable('account', {
  id: text('id').primaryKey(),
  accountId: text('accountid').notNull(),
  providerId: text('providerid').notNull(),
  userId: text('userid')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accesstoken'),
  refreshToken: text('refreshtoken'),
  idToken: text('idtoken'),
  accessTokenExpiresAt: timestamp('accesstokenexpiresat'),
  refreshTokenExpiresAt: timestamp('refreshtokenexpiresat'),
  scope: text('scope'),
  password: text('password'),
  createdAt: timestamp('createdat').notNull().defaultNow(),
  updatedAt: timestamp('updatedat').notNull().defaultNow(),
})

export const verification = pgTable('verification', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expiresat').notNull(),
  createdAt: timestamp('createdat').defaultNow(),
  updatedAt: timestamp('updatedat').defaultNow(),
})

// App Tables
export const properties = pgTable(
  'properties',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description'),
    location: text('location').notNull(),
    address: text('address').notNull(),
    latitude: decimal('latitude', { precision: 10, scale: 8 }),
    longitude: decimal('longitude', { precision: 11, scale: 8 }),
    price: numeric('price', { precision: 12, scale: 2 }).notNull(),
    bedrooms: integer('bedrooms').notNull().default(1),
    bathrooms: decimal('bathrooms', { precision: 3, scale: 1 }).notNull().default(1),
    squareFeet: integer('squarefeet'),
    imageUrl: text('imageurl'),
    amenities: text('amenities').array(),
    propertyType: text('propertytype').default('apartment'),
    available: boolean('available').default(true),
    userId: text('userid')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    createdAt: timestamp('createdat').notNull().defaultNow(),
    updatedAt: timestamp('updatedat').notNull().defaultNow(),
  },
  (table) => ({})
)

export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey(),
  userId: text('userid')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  propertyId: integer('propertyid')
    .notNull()
    .references(() => properties.id, { onDelete: 'cascade' }),
  createdAt: timestamp('createdat').notNull().defaultNow(),
})

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  userId: text('userid')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  propertyId: integer('propertyid')
    .notNull()
    .references(() => properties.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('createdat').notNull().defaultNow(),
  updatedAt: timestamp('updatedat').notNull().defaultNow(),
})

// Relations
export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  properties: many(properties),
  favorites: many(favorites),
  reviews: many(reviews),
}))

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}))

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}))

export const propertiesRelations = relations(properties, ({ one, many }) => ({
  owner: one(user, { fields: [properties.userId], references: [user.id] }),
  favorites: many(favorites),
  reviews: many(reviews),
}))

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(user, { fields: [favorites.userId], references: [user.id] }),
  property: one(properties, {
    fields: [favorites.propertyId],
    references: [properties.id],
  }),
}))

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(user, { fields: [reviews.userId], references: [user.id] }),
  property: one(properties, {
    fields: [reviews.propertyId],
    references: [properties.id],
  }),
}))
