import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function PUT(request: Request) {
  const { companyName, website, contactEmail, description, primaryCommodity, secondaryCommodities } = await request.json()
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Get user's company
  const { data: userData } = await supabase
    .from('users')
    .select('company_id, role')
    .eq('id', user.id)
    .single()

  if (!userData || userData.role !== 'company_admin' || !userData.company_id) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }

  // Update company
  const { error } = await supabase
    .from('companies')
    .update({
      company_name: companyName,
      website,
      contact_email: contactEmail,
      description,
      primary_commodity: primaryCommodity,
      secondary_commodities: secondaryCommodities,
      updated_at: new Date().toISOString()
    })
    .eq('id', userData.company_id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true })
}
