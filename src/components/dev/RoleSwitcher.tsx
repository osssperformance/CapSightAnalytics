'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function RoleSwitcher() {
  const router = useRouter()
  const [currentRole, setCurrentRole] = useState<string>('investor')
  const [companies, setCompanies] = useState<Array<{ id: string; asx_code: string; company_name: string }>>([])
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  useEffect(() => {
    const loadData = async () => {
      const supabase = createClient()

      // Get current user role
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data: userData } = await supabase
          .from('users')
          .select('role, company_id')
          .eq('id', user.id)
          .single()

        if (userData) {
          setCurrentRole(userData.role)
          if (userData.company_id) {
            setSelectedCompanyId(userData.company_id)
          }
        }
      }

      // Load all companies for the dropdown
      const { data: companiesData } = await supabase
        .from('companies')
        .select('id, asx_code, company_name')
        .order('company_name')

      if (companiesData) {
        setCompanies(companiesData)
        if (!selectedCompanyId && companiesData.length > 0) {
          setSelectedCompanyId(companiesData[0].id)
        }
      }
    }

    loadData()
  }, [])

  const switchRole = async (newRole: string) => {
    const response = await fetch('/api/dev/switch-role', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role: newRole,
        companyId: newRole === 'company_admin' ? selectedCompanyId : null
      })
    })

    if (response.ok) {
      setCurrentRole(newRole)
      setIsOpen(false)

      // Redirect based on role
      if (newRole === 'company_admin') {
        router.push('/company/dashboard')
      } else if (newRole === 'investor') {
        router.push('/calendar')
      } else if (newRole === 'platform_admin') {
        router.push('/admin/dashboard')
      }

      router.refresh()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-2 bg-yellow-400 text-yellow-900 rounded-lg shadow-lg hover:bg-yellow-500 transition-colors text-sm font-medium flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        DEV: {currentRole}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 p-4">
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900">Switch Role (DEV)</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500">Current: <span className="font-medium text-gray-900">{currentRole}</span></p>
          </div>

          <div className="space-y-2">
            {/* Investor Role */}
            <button
              onClick={() => switchRole('investor')}
              disabled={currentRole === 'investor'}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRole === 'investor'
                  ? 'bg-primary text-white cursor-default'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              👤 Investor
            </button>

            {/* Company Admin Role */}
            <div>
              <button
                onClick={() => switchRole('company_admin')}
                disabled={currentRole === 'company_admin'}
                className={`w-full text-left px-3 py-2 rounded-t-lg text-sm font-medium transition-colors ${
                  currentRole === 'company_admin'
                    ? 'bg-primary text-white cursor-default'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🏢 Company Admin
              </button>

              {companies.length > 0 && (
                <select
                  value={selectedCompanyId}
                  onChange={(e) => setSelectedCompanyId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border-t border-gray-300 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.asx_code} - {company.company_name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Platform Admin Role */}
            <button
              onClick={() => switchRole('platform_admin')}
              disabled={currentRole === 'platform_admin'}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentRole === 'platform_admin'
                  ? 'bg-primary text-white cursor-default'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ⚡ Platform Admin
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
