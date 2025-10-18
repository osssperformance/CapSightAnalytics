import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()
  const supabase = await createClient()

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  if (!authData.user) {
    return NextResponse.json({ error: 'No user data returned' }, { status: 400 })
  }

  // Get user role to determine redirect
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('role, company_id')
    .eq('id', authData.user.id)
    .single()

  if (userError) {
    return NextResponse.json({ error: userError.message }, { status: 400 })
  }

  // Determine redirect based on role
  let redirectUrl = '/calendar' // default for investors

  if (userData.role === 'company_admin') {
    redirectUrl = '/company/dashboard'
  } else if (userData.role === 'platform_admin') {
    redirectUrl = '/admin/dashboard'
  }

  return NextResponse.json({ success: true, redirectUrl })
}
