'use client'

import Link from 'next/link'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

interface Company {
  id: string
  asx_code: string
  company_name: string
  website: string | null
  contact_email: string | null
  logo_url: string | null
  description: string | null
  primary_commodity: string
  secondary_commodities: string[] | null
  is_critical_minerals: boolean
  critical_minerals_list: string[] | null
  market_cap_aud: number | null
  listing_date: string | null
  shares_on_issue: number | null
}

interface Event {
  id: string
  title: string
  event_date: string
  event_type: string
  importance_score?: number
  description?: string
}

interface RecommendationScore {
  total_score: number
  event_frequency_score: number
  insider_buying_score: number
  price_momentum_score: number
  critical_minerals_score: number
  resource_growth_score: number
  confidence_score: number
  reasoning?: any
}

interface CompanyDetailProps {
  company: Company
  upcomingEvents: Event[]
  recentEvents: Event[]
  recommendationScore: RecommendationScore | null
}

export function CompanyDetail({ company, upcomingEvents, recentEvents, recommendationScore }: CompanyDetailProps) {
  const formatMarketCap = (capInCents: number | null) => {
    if (!capInCents) return 'N/A'
    const capInMillions = capInCents / 100 / 1_000_000
    if (capInMillions >= 1000) {
      return `$${(capInMillions / 1000).toFixed(2)}B`
    }
    return `$${capInMillions.toFixed(2)}M`
  }

  const formatShares = (shares: number | null) => {
    if (!shares) return 'N/A'
    if (shares >= 1_000_000_000) {
      return `${(shares / 1_000_000_000).toFixed(2)}B`
    }
    if (shares >= 1_000_000) {
      return `${(shares / 1_000_000).toFixed(2)}M`
    }
    return shares.toLocaleString()
  }

  const formatDate = (date: string | null) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  const getEventTypeLabel = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/calendar" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                ← Back to Calendar
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Company Header */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-6">
              {company.logo_url && (
                <img
                  src={company.logo_url}
                  alt={`${company.company_name} logo`}
                  className="w-20 h-20 object-contain rounded-lg border border-gray-200 dark:border-gray-700 bg-white"
                />
              )}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{company.company_name}</h1>
                  <span className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary font-semibold rounded-lg">
                    {company.asx_code}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      Website
                    </a>
                  )}
                  {company.contact_email && (
                    <a href={`mailto:${company.contact_email}`} className="hover:text-primary flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact
                    </a>
                  )}
                </div>
              </div>
            </div>
            {company.is_critical_minerals && (
              <span className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-semibold rounded-lg">
                Critical Minerals
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            {company.description && (
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">About</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{company.description}</p>
              </div>
            )}

            {/* Recommendation Score */}
            {recommendationScore && (
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Investment Score</h2>
                <div className="flex items-center gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-1">
                      {recommendationScore.total_score.toFixed(0)}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Overall Score</div>
                  </div>
                  <div className="flex-1 space-y-3">
                    {[
                      { label: 'Event Frequency', score: recommendationScore.event_frequency_score },
                      { label: 'Price Momentum', score: recommendationScore.price_momentum_score },
                      { label: 'Critical Minerals', score: recommendationScore.critical_minerals_score },
                      { label: 'Resource Growth', score: recommendationScore.resource_growth_score },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                          <span className="text-gray-600 dark:text-gray-400">{item.score.toFixed(0)}</span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Confidence: {recommendationScore.confidence_score.toFixed(0)}%
                </div>
              </div>
            )}

            {/* Upcoming Events */}
            {upcomingEvents.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Upcoming Events</h2>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 dark:hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{formatDate(event.event_date)}</span>
                            <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
                              {getEventTypeLabel(event.event_type)}
                            </span>
                          </div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">{event.title}</h3>
                          {event.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{event.description}</p>
                          )}
                        </div>
                        {event.importance_score && (
                          <div className="ml-4 text-right">
                            <div className="text-sm font-semibold text-primary">
                              {(event.importance_score * 10).toFixed(1)}/10
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Importance</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Events */}
            {recentEvents.length > 0 && (
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Recent Events</h2>
                <div className="space-y-3">
                  {recentEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg opacity-75"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatDate(event.event_date)}</span>
                            <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded">
                              {getEventTypeLabel(event.event_type)}
                            </span>
                          </div>
                          <h3 className="font-medium text-gray-900 dark:text-gray-100">{event.title}</h3>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Key Stats */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Key Statistics</h2>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Market Cap</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {formatMarketCap(company.market_cap_aud)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Shares on Issue</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {formatShares(company.shares_on_issue)}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Listed Since</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {formatDate(company.listing_date)}
                  </div>
                </div>
              </div>
            </div>

            {/* Commodities */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Commodities</h2>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Primary</div>
                  <span className="inline-block px-3 py-1.5 bg-primary/10 dark:bg-primary/20 text-primary font-medium rounded-lg">
                    {company.primary_commodity}
                  </span>
                </div>
                {company.secondary_commodities && company.secondary_commodities.length > 0 && (
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Secondary</div>
                    <div className="flex flex-wrap gap-2">
                      {company.secondary_commodities.map((commodity) => (
                        <span
                          key={commodity}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg"
                        >
                          {commodity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {company.is_critical_minerals && company.critical_minerals_list && company.critical_minerals_list.length > 0 && (
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Critical Minerals</div>
                    <div className="flex flex-wrap gap-2">
                      {company.critical_minerals_list.map((mineral) => (
                        <span
                          key={mineral}
                          className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-lg"
                        >
                          {mineral}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
              <button className="w-full px-4 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors mb-3">
                Add to Watchlist
              </button>
              <Link
                href="/calendar"
                className="block w-full px-4 py-3 text-center border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                View All Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
