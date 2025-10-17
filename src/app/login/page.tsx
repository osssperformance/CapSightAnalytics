import { LoginForm } from '@/components/auth/LoginForm'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If user is already logged in, redirect to home
  if (user) {
    redirect('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to CapSight Analytics
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Never miss another ASX commodities announcement
          </p>
        </div>

        <div className="mt-8 rounded-lg bg-white px-8 py-8 shadow">
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
