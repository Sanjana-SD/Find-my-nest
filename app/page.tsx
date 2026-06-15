import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import Hero from '@/components/hero'
import FeaturedProperties from '@/components/featured-properties'

export const metadata = {
  title: 'Find My Nest - Discover Your Perfect Rental Home',
  description: 'Find the perfect rental property with our comprehensive search platform',
}

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Hero isLoggedIn={!!session?.user} />
      <FeaturedProperties />
    </div>
  )
}
