import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { CompanyDetail } from '@/components/companies/CompanyDetail'

interface PageProps {
  params: Promise<{
    asx_code: string
  }>
}

export default async function CompanyPage({ params }: PageProps) {
  const { asx_code } = await params
  const supabase = await createClient()

  // Fetch company details
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select('*')
    .eq('asx_code', asx_code.toUpperCase())
    .eq('is_published', true)
    .single()

  if (companyError || !company) {
    notFound()
  }

  // Fetch upcoming events for this company
  const { data: upcomingEvents } = await supabase
    .from('events')
    .select('*')
    .eq('company_id', company.id)
    .eq('is_published', true)
    .gte('event_date', new Date().toISOString().split('T')[0])
    .order('event_date', { ascending: true })
    .limit(5)

  // Fetch recent events for this company
  const { data: recentEvents } = await supabase
    .from('events')
    .select('*')
    .eq('company_id', company.id)
    .eq('is_published', true)
    .lt('event_date', new Date().toISOString().split('T')[0])
    .order('event_date', { ascending: false })
    .limit(5)

  // Fetch recommendation score
  const { data: recommendationScore } = await supabase
    .from('recommendation_scores')
    .select('*')
    .eq('company_id', company.id)
    .single()

  return (
    <CompanyDetail
      company={company}
      upcomingEvents={upcomingEvents || []}
      recentEvents={recentEvents || []}
      recommendationScore={recommendationScore}
    />
  )
}
