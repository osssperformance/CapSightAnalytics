import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password, fullName, accountType } = await request.json()
  const supabase = await createClient()

  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (authError) {
    return NextResponse.json({ error: authError.message }, { status: 400 })
  }

  if (!authData.user) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 400 })
  }

  // If company account, redirect to company onboarding
  if (accountType === 'company') {
    return NextResponse.json({
      success: true,
      redirectUrl: '/company/onboarding'
    })
  }

  // Default investor account redirects to calendar
  return NextResponse.json({
    success: true,
    redirectUrl: '/calendar'
  })
}
