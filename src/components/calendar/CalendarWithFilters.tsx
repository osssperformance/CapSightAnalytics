'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Calendar } from './Calendar'
import { FilterPanel, CalendarFilters } from './FilterPanel'

interface Event {
  id: string
  title: string
  event_date: string
  event_type: string
  company_name: string
  asx_code: string
  importance_score?: number
  commodities?: string[]
}

interface CalendarWithFiltersProps {
  events: Event[]
  commodities: string[]
}

export function CalendarWithFilters({ events, commodities }: CalendarWithFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showFilters, setShowFilters] = useState(true)

  // Initialize filters from URL params
  const getInitialFilters = (): CalendarFilters => {
    const commoditiesParam = searchParams.get('commodities')
    const eventTypesParam = searchParams.get('eventTypes')
    const startDateParam = searchParams.get('startDate')
    const endDateParam = searchParams.get('endDate')

    return {
      commodities: commoditiesParam ? commoditiesParam.split(',') : [],
      eventTypes: eventTypesParam ? eventTypesParam.split(',') : [],
      dateRange: {
        start: startDateParam || null,
        end: endDateParam || null,
      },
    }
  }

  const [filters, setFilters] = useState<CalendarFilters>(getInitialFilters)

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams()

    if (filters.commodities.length > 0) {
      params.set('commodities', filters.commodities.join(','))
    }

    if (filters.eventTypes.length > 0) {
      params.set('eventTypes', filters.eventTypes.join(','))
    }

    if (filters.dateRange.start) {
      params.set('startDate', filters.dateRange.start)
    }

    if (filters.dateRange.end) {
      params.set('endDate', filters.dateRange.end)
    }

    const queryString = params.toString()
    const newUrl = queryString ? `?${queryString}` : '/calendar'

    router.replace(newUrl, { scroll: false })
  }, [filters, router])

  // Filter events based on active filters
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Commodity filter
      if (filters.commodities.length > 0) {
        const eventCommodities = event.commodities || []
        const hasMatchingCommodity = eventCommodities.some(c =>
          filters.commodities.includes(c)
        )
        if (!hasMatchingCommodity) return false
      }

      // Event type filter
      if (filters.eventTypes.length > 0) {
        if (!filters.eventTypes.includes(event.event_type)) return false
      }

      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const eventDate = event.event_date.split('T')[0]

        if (filters.dateRange.start && eventDate < filters.dateRange.start) {
          return false
        }

        if (filters.dateRange.end && eventDate > filters.dateRange.end) {
          return false
        }
      }

      return true
    })
  }, [events, filters])

  return (
    <div className="h-full flex">
      {/* Filter Panel */}
      {showFilters && (
        <FilterPanel
          filters={filters}
          onFiltersChange={setFilters}
          availableCommodities={commodities}
          onClose={() => setShowFilters(false)}
        />
      )}

      {/* Calendar */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Filter toggle button (mobile/collapsed state) */}
        {!showFilters && (
          <div className="p-4 border-b border-gray-200 bg-white">
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Show Filters
              {(filters.commodities.length + filters.eventTypes.length + (filters.dateRange.start || filters.dateRange.end ? 1 : 0)) > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold text-white bg-primary rounded">
                  {filters.commodities.length + filters.eventTypes.length + (filters.dateRange.start || filters.dateRange.end ? 1 : 0)}
                </span>
              )}
            </button>
          </div>
        )}

        {/* Results summary */}
        <div className="px-6 py-2 bg-gray-50 border-b border-gray-200 text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredEvents.length}</span> of{' '}
          <span className="font-semibold text-gray-900">{events.length}</span> events
        </div>

        <Calendar events={filteredEvents} />
      </div>
    </div>
  )
}
