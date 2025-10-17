import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If user is logged in, redirect to calendar
  if (user) {
    redirect('/calendar')
  }

  // If not logged in, redirect to login
  redirect('/login')
}
