import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { asxCode, companyName, website, primaryCommodity } = await request.json()
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Check if company already exists with this ASX code
  const { data: existingCompany } = await supabase
    .from('companies')
    .select('id')
    .eq('asx_code', asxCode)
    .single()

  if (existingCompany) {
    return NextResponse.json({ error: 'Company with this ASX code already exists' }, { status: 400 })
  }

  // Create company
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .insert({
      asx_code: asxCode,
      company_name: companyName,
      website: website || null,
      primary_commodity: primaryCommodity,
      is_published: false, // Pending review
    })
    .select()
    .single()

  if (companyError) {
    return NextResponse.json({ error: companyError.message }, { status: 400 })
  }

  // Update user to be company admin
  const { error: userError } = await supabase
    .from('users')
    .update({
      role: 'company_admin',
      company_id: company.id
    })
    .eq('id', user.id)

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 400 })
  }

  return NextResponse.json({
    success: true,
    company: {
      id: company.id,
      asx_code: company.asx_code,
      company_name: company.company_name
    }
  })
}
