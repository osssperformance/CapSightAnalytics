import { createClient } from '@/lib/supabase/server'
import { UserMenu } from '@/components/auth/UserMenu'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <div className="flex justify-end mb-4">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Link
              href="/login"
              className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
            >
              Sign in
            </Link>
          )}
        </div>

        <h1 className="text-4xl font-bold mb-4 text-center">
          CapSight Analytics
        </h1>
        <p className="text-xl text-center text-muted-foreground mb-8">
          ASX Commodities Event Calendar
        </p>

        <div className="bg-card rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">🚀 Phase 1, Day 2: Complete!</h2>

          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Database schema created (12 tables)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Row Level Security policies configured</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Seed data loaded (10 ASX companies, 15+ events)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Supabase Auth setup (magic links)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Auth components created (login, logout, user menu)</span>
            </div>
            {user && (
              <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 rounded">
                <span className="text-green-500">✓</span>
                <span className="font-semibold">You are signed in as {user.email}</span>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-2">Next Steps (Day 3):</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Set up Mailgun account and verify domain</li>
              <li>Create email templates (welcome, digest)</li>
              <li>Build homepage (hero + CTA)</li>
              <li>Deploy to Vercel staging</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
