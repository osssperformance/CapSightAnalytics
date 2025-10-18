'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

interface Company {
  id: string
  asx_code: string
  company_name: string
  website: string | null
  logo_url: string | null
  description: string | null
  primary_commodity: string
  secondary_commodities: string[] | null
  is_critical_minerals: boolean
  critical_minerals_list: string[] | null
  market_cap_aud: number | null
  listing_date: string | null
  shares_on_issue: number | null
  subscription_status: string
}

interface CompaniesListProps {
  companies: Company[]
}

export function CompaniesList({ companies }: CompaniesListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [commodityFilter, setCommodityFilter] = useState<string>('all')
  const [criticalMineralsOnly, setCriticalMineralsOnly] = useState(false)

  // Get unique commodities for filter
  const allCommodities = Array.from(
    new Set(
      companies.flatMap((c) => [
        c.primary_commodity,
        ...(c.secondary_commodities || []),
      ])
    )
  ).sort()

  // Filter companies
  const filteredCompanies = companies.filter((company) => {
    // Search filter
    const matchesSearch =
      searchQuery === '' ||
      company.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.asx_code.toLowerCase().includes(searchQuery.toLowerCase())

    // Commodity filter
    const matchesCommodity =
      commodityFilter === 'all' ||
      company.primary_commodity === commodityFilter ||
      company.secondary_commodities?.includes(commodityFilter)

    // Critical minerals filter
    const matchesCriticalMinerals =
      !criticalMineralsOnly || company.is_critical_minerals

    return matchesSearch && matchesCommodity && matchesCriticalMinerals
  })

  const formatMarketCap = (capInCents: number | null) => {
    if (!capInCents) return 'N/A'
    const capInMillions = capInCents / 100 / 1_000_000
    if (capInMillions >= 1000) {
      return `$${(capInMillions / 1000).toFixed(2)}B`
    }
    return `$${capInMillions.toFixed(2)}M`
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/calendar" className="text-xl font-bold text-primary">
                CapSight Analytics
              </Link>
              <nav className="hidden md:flex items-center gap-4">
                <Link
                  href="/calendar"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Calendar
                </Link>
                <Link
                  href="/companies"
                  className="text-sm text-gray-900 dark:text-gray-100 font-medium"
                >
                  Companies
                </Link>
              </nav>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            ASX Mining Companies
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Browse {companies.length} listed mining companies
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Company name or ASX code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Commodity Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Commodity
              </label>
              <select
                value={commodityFilter}
                onChange={(e) => setCommodityFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Commodities</option>
                {allCommodities.map((commodity) => (
                  <option key={commodity} value={commodity}>
                    {commodity}
                  </option>
                ))}
              </select>
            </div>

            {/* Critical Minerals Toggle */}
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={criticalMineralsOnly}
                  onChange={(e) => setCriticalMineralsOnly(e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 dark:border-gray-600 rounded focus:ring-primary"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Critical Minerals Only
                </span>
              </label>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredCompanies.length} of {companies.length} companies
          </div>
        </div>

        {/* Companies Table */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    ASX Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Commodities
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Market Cap
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredCompanies.map((company) => (
                  <tr
                    key={company.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {company.logo_url && (
                          <img
                            src={company.logo_url}
                            alt={`${company.company_name} logo`}
                            className="w-10 h-10 object-contain rounded border border-gray-200 dark:border-gray-700 bg-white"
                          />
                        )}
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {company.company_name}
                          </div>
                          {company.is_critical_minerals && (
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                              Critical Minerals
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary font-semibold text-sm rounded">
                        {company.asx_code}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded">
                          {company.primary_commodity}
                        </span>
                        {company.secondary_commodities?.slice(0, 2).map((commodity) => (
                          <span
                            key={commodity}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded"
                          >
                            {commodity}
                          </span>
                        ))}
                        {company.secondary_commodities && company.secondary_commodities.length > 2 && (
                          <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                            +{company.secondary_commodities.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100">
                      {formatMarketCap(company.market_cap_aud)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/companies/${company.asx_code}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10 dark:hover:bg-primary/20 rounded-lg transition-colors"
                      >
                        View Details
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredCompanies.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No companies found matching your filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
