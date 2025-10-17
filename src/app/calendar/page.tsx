import { createClient } from '@/lib/supabase/server'
import { UserMenu } from '@/components/auth/UserMenu'
import { CalendarWithFilters } from '@/components/calendar/CalendarWithFilters'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function CalendarPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch all published events with company information
  const { data: events, error } = await supabase
    .from('events')
    .select(`
      id,
      title,
      event_date,
      event_type,
      importance_score,
      companies (
        asx_code,
        company_name
      )
    `)
    .eq('is_published', true)
    .order('event_date', { ascending: true })

  if (error) {
    console.error('Error fetching events:', error)
  }

  // For now, use a simple commodity list - we'll enhance this later when we understand the schema better
  const allCommodities = [
    'Lithium', 'Rare Earths', 'Cobalt', 'Nickel', 'Graphite',
    'Copper', 'Manganese', 'Vanadium', 'PGMs', 'Gold', 'Silver',
    'Zinc', 'Lead', 'Uranium', 'Iron Ore', 'Coal'
  ]

  // Format events for the calendar
  const formattedEvents = (events || []).map((event: any) => {
    return {
      id: event.id,
      title: event.title,
      event_date: event.event_date,
      event_type: event.event_type,
      asx_code: event.companies?.asx_code || 'N/A',
      company_name: event.companies?.company_name || 'Unknown Company',
      importance_score: event.importance_score,
      commodities: [], // Will be populated later when we have the right schema
    }
  })

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white flex-shrink-0">
        <div className="px-6">
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

      {/* Calendar - Full height remaining space with padding */}
      <main className="flex-1 overflow-hidden p-[50px]">
        <div className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden">
          <CalendarWithFilters events={formattedEvents} commodities={allCommodities} />
        </div>
      </main>
    </div>
  )
}
