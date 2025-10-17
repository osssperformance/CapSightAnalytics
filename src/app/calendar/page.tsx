import { createClient } from '@/lib/supabase/server'
import { UserMenu } from '@/components/auth/UserMenu'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function CalendarPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/calendar" className="text-xl font-bold text-primary">
                CapSight Analytics
              </Link>
              <div className="hidden md:flex gap-6">
                <Link href="/calendar" className="text-sm font-medium text-primary">
                  Calendar
                </Link>
                <Link href="/companies" className="text-sm font-medium text-gray-700 hover:text-primary">
                  Companies
                </Link>
                <Link href="/watchlist" className="text-sm font-medium text-gray-700 hover:text-primary">
                  Watchlist
                </Link>
              </div>
            </div>
            <UserMenu user={user} />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              📅 Custom Calendar
            </h1>
            <p className="text-gray-600">
              Coming in Week 2 of development
            </p>
          </div>

          {/* Development Status */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">🚀 Week 1 Complete!</h2>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <div className="font-medium text-gray-900">Database Schema</div>
                  <div className="text-sm text-gray-600">12 tables with RLS policies, 10 companies seeded</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <div className="font-medium text-gray-900">Authentication</div>
                  <div className="text-sm text-gray-600">Magic link auth with Supabase</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <div className="font-medium text-gray-900">Email System</div>
                  <div className="text-sm text-gray-600">Mailgun integration with welcome & digest templates</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <span className="text-green-500 text-xl">✓</span>
                <div>
                  <div className="font-medium text-gray-900">Infrastructure</div>
                  <div className="text-sm text-gray-600">Vercel deployment, analytics, port 3050</div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-3">📋 Week 2: Custom Calendar Development</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Install calendar dependencies (@internationalized/date, react-aria)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Build headless calendar logic (date utilities, state management)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Create month grid component with event rendering</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Implement accessibility (keyboard navigation, ARIA labels)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Add animations with Framer Motion</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <div className="font-medium text-gray-900 mb-1">Signed in as</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                  <div className="text-xs text-gray-500 mt-2">
                    User ID: {user.id.slice(0, 8)}...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
