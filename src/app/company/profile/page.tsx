import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CompanyNav } from '@/components/company/CompanyNav'
import { CompanyProfileForm } from '@/components/company/CompanyProfileForm'
import { RoleSwitcher } from '@/components/dev/RoleSwitcher'

export default async function CompanyProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Get user's role and company
  const { data: userData } = await supabase
    .from('users')
    .select('role, company_id, companies(*)')
    .eq('id', user.id)
    .single()

  if (!userData || userData.role !== 'company_admin' || !userData.company_id) {
    redirect('/calendar')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyNav company={userData.companies as any} />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-600 mt-1">Manage your company information and settings</p>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <CompanyProfileForm company={userData.companies as any} />
        </div>
      </div>

      <RoleSwitcher />
    </div>
  )
}
