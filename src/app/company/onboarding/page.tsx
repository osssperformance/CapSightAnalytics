import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CompanyOnboardingForm } from '@/components/company/CompanyOnboardingForm'

export default async function CompanyOnboardingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Check if user already has a company
  const { data: userData } = await supabase
    .from('users')
    .select('role, company_id')
    .eq('id', user.id)
    .single()

  if (userData?.role === 'company_admin' && userData?.company_id) {
    redirect('/company/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">CapSight Analytics</h1>
          <p className="text-gray-600 mt-2">Company Registration</p>
        </div>

        {/* Onboarding Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Tell us about your company</h2>
            <p className="text-gray-600 mt-1">We'll create your company profile and get you started</p>
          </div>

          <CompanyOnboardingForm user={user} />
        </div>
      </div>
    </div>
  )
}
