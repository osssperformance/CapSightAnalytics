'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

interface CompanyNavProps {
  company: {
    asx_code: string
    company_name: string
  }
}

export function CompanyNav({ company }: CompanyNavProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const navItems = [
    { href: '/company/dashboard', label: 'Dashboard' },
    { href: '/company/events', label: 'Events' },
    { href: '/company/profile', label: 'Profile' },
  ]

  return (
    <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Logo + Company Info + Nav Links */}
          <div className="flex items-center gap-6">
            <Link href="/company/dashboard" className="text-xl font-bold text-primary">
              CapSight Analytics
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <span className="text-gray-600 dark:text-gray-400 font-medium">{company.company_name}</span>
              <span className="px-2 py-0.5 text-xs font-semibold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded">
                {company.asx_code}
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 ml-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Right: Theme Toggle + Sign Out */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
