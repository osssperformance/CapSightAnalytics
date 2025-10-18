import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

// DEV ONLY: Switch user role for testing
export async function POST(request: Request) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  const { role, companyId } = await request.json()
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Validate role
  if (!['investor', 'company_admin', 'platform_admin'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 })
  }

  // Update user role
  const { error } = await supabase
    .from('users')
    .update({
      role,
      company_id: role === 'company_admin' ? companyId : null
    })
    .eq('id', user.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, role })
}
