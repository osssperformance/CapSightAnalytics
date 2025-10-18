import { createClient } from '@/lib/supabase/server'
import { CompaniesList } from '@/components/companies/CompaniesList'

export default async function CompaniesPage() {
  const supabase = await createClient()

  // Fetch all published companies
  const { data: companies, error } = await supabase
    .from('companies')
    .select('*')
    .eq('is_published', true)
    .order('company_name', { ascending: true })

  if (error) {
    console.error('Error fetching companies:', error)
    return <div>Error loading companies</div>
  }

  return <CompaniesList companies={companies || []} />
}
