import { createClient } from '@/lib/supabase/server'
import { UserMenu } from '@/components/auth/UserMenu'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold text-primary">
                CapSight Analytics
              </Link>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <UserMenu user={user} />
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-700 hover:text-primary"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/login"
                    className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Never Miss Another{' '}
              <span className="text-primary">ASX Commodities</span> Announcement
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
              Track drilling results, JORC updates, and key events from 100+ ASX mining companies.
              Get AI-powered insights and personalized alerts for your watchlist.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {user ? (
                <Link
                  href="/calendar"
                  className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  View Calendar
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="rounded-md bg-primary px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Get Started Free
                </Link>
              )}
              <a href="#features" className="text-base font-semibold leading-7 text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">100+</div>
                <div className="mt-2 text-sm text-gray-600">ASX Companies</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">1,000+</div>
                <div className="mt-2 text-sm text-gray-600">Events Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">12</div>
                <div className="mt-2 text-sm text-gray-600">Critical Minerals</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to stay ahead
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Built for investors who demand the best
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white text-2xl mb-4">
                  📅
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Custom Calendar</h3>
                <p className="text-gray-600">
                  Purpose-built calendar with smart clustering, heatmap overlay, and gesture navigation.
                  Designed for 1,000+ events.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white text-2xl mb-4">
                  ⭐
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Watchlists</h3>
                <p className="text-gray-600">
                  Follow up to 10 companies (free tier) and get personalized email alerts for new events.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white text-2xl mb-4">
                  🤖
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Insights</h3>
                <p className="text-gray-600">
                  Event importance scoring and company recommendations based on multiple factors.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white text-2xl mb-4">
                  💎
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Critical Minerals Focus</h3>
                <p className="text-gray-600">
                  Filter by government priority minerals: lithium, rare earths, nickel, copper, and more.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white text-2xl mb-4">
                  📧
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Daily Digests</h3>
                <p className="text-gray-600">
                  Personalized email summaries of upcoming events, watchlist updates, and recommendations.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white text-2xl mb-4">
                  🔍
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Filtering</h3>
                <p className="text-gray-600">
                  Filter by commodity, event type, date range, and importance score. Find exactly what matters.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {!user && (
          <div className="bg-primary py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to get started?
              </h2>
              <p className="mt-4 text-lg text-blue-100">
                Join investors who never miss a critical announcement
              </p>
              <div className="mt-8">
                <Link
                  href="/login"
                  className="inline-block rounded-md bg-white px-8 py-3 text-base font-semibold text-primary shadow-sm hover:bg-gray-50"
                >
                  Sign up for free
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Development Progress Section (Temporary) */}
        {user && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-card rounded-lg p-8 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4">🚀 Development Progress</h2>

              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Database schema (12 tables, RLS policies)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Supabase Auth (magic links)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Mailgun integration & email templates</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>Homepage with hero & navigation</span>
                </div>
                <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 rounded border border-green-200">
                  <span className="text-green-500">✓</span>
                  <span className="font-semibold">Signed in as {user.email}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">Week 1 Status: Days 2-4 Complete!</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Next up: Custom calendar development (Week 2)
                </p>
                <Link
                  href="/calendar"
                  className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
                >
                  View Calendar →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} CapSight Analytics. All rights reserved.
              </p>
              <p className="mt-2 text-xs text-gray-500">
                ASX Commodities Event Calendar
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
