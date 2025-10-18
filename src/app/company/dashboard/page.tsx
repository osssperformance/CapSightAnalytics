import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CompanyDashboard } from '@/components/company/CompanyDashboard'

export default async function CompanyDashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user's role and company
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('role, company_id, companies(asx_code, company_name, logo_url, is_published)')
    .eq('id', user.id)
    .single()

  if (userError || !userData) {
    redirect('/login')
  }

  if (userData.role !== 'company_admin') {
    redirect('/calendar')
  }

  if (!userData.company_id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No Company Linked</h1>
          <p className="text-gray-600">Your account is not linked to a company. Please contact support.</p>
        </div>
      </div>
    )
  }

  // Get dashboard data using the helper function
  const { data: dashboardData, error: dashboardError } = await supabase
    .rpc('get_company_admin_dashboard')

  if (dashboardError) {
    console.error('Dashboard error:', dashboardError)
  }

  // Get recent events
  const { data: events, error: eventsError } = await supabase
    .from('events')
    .select('id, title, event_date, event_type, is_published')
    .eq('company_id', userData.company_id)
    .order('event_date', { ascending: true })
    .limit(10)

  return (
    <CompanyDashboard
      user={user}
      company={userData.companies as any}
      stats={dashboardData?.stats || {}}
      upcomingEvents={events || []}
    />
  )
}
