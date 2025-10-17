'use client'

import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

interface UserMenuProps {
  user: User
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/auth/logout', { method: 'POST' })
    router.refresh()
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700">{user.email}</span>
      <button
        onClick={handleLogout}
        className="rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
      >
        Sign out
      </button>
    </div>
  )
}
