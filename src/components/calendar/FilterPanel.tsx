'use client'

import { useState } from 'react'

export interface CalendarFilters {
  commodities: string[]
  eventTypes: string[]
  dateRange: { start: string | null; end: string | null }
}

interface FilterPanelProps {
  filters: CalendarFilters
  onFiltersChange: (filters: CalendarFilters) => void
  availableCommodities: string[]
  onClose?: () => void
}

const EVENT_TYPES = [
  { value: 'drilling_results', label: 'Drilling Results' },
  { value: 'assay_results', label: 'Assay Results' },
  { value: 'exploration_update', label: 'Exploration Update' },
  { value: 'jorc_resource', label: 'JORC Resource' },
  { value: 'resource_update', label: 'Resource Update' },
  { value: 'production_update', label: 'Production Update' },
  { value: 'feasibility_study', label: 'Feasibility Study' },
  { value: 'permits_approvals', label: 'Permits & Approvals' },
  { value: 'capital_raise', label: 'Capital Raise' },
  { value: 'quarterly_report', label: 'Quarterly Report' },
  { value: 'agm_egm', label: 'AGM/EGM' },
  { value: 'other', label: 'Other' },
]

export function FilterPanel({ filters, onFiltersChange, availableCommodities, onClose }: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState({
    commodities: true,
    eventTypes: true,
    dateRange: false,
  })

  const toggleCommodity = (commodity: string) => {
    const newCommodities = filters.commodities.includes(commodity)
      ? filters.commodities.filter(c => c !== commodity)
      : [...filters.commodities, commodity]

    onFiltersChange({ ...filters, commodities: newCommodities })
  }

  const toggleEventType = (eventType: string) => {
    const newEventTypes = filters.eventTypes.includes(eventType)
      ? filters.eventTypes.filter(t => t !== eventType)
      : [...filters.eventTypes, eventType]

    onFiltersChange({ ...filters, eventTypes: newEventTypes })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      commodities: [],
      eventTypes: [],
      dateRange: { start: null, end: null },
    })
  }

  const activeFilterCount =
    filters.commodities.length +
    filters.eventTypes.length +
    (filters.dateRange.start || filters.dateRange.end ? 1 : 0)

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 lg:hidden"
              aria-label="Close filters"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {activeFilterCount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {activeFilterCount} {activeFilterCount === 1 ? 'filter' : 'filters'} active
            </span>
            <button
              onClick={clearAllFilters}
              className="text-sm text-primary hover:text-primary/80 font-medium"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex-1 overflow-auto">
        {/* Commodities */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => setIsExpanded({ ...isExpanded, commodities: !isExpanded.commodities })}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">Commodities</span>
              {filters.commodities.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold text-primary bg-primary/10 rounded">
                  {filters.commodities.length}
                </span>
              )}
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded.commodities ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isExpanded.commodities && (
            <div className="px-4 pb-4 space-y-2 max-h-64 overflow-auto">
              {availableCommodities.map((commodity) => (
                <label key={commodity} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <input
                    type="checkbox"
                    checked={filters.commodities.includes(commodity)}
                    onChange={() => toggleCommodity(commodity)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{commodity}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Event Types */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => setIsExpanded({ ...isExpanded, eventTypes: !isExpanded.eventTypes })}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">Event Types</span>
              {filters.eventTypes.length > 0 && (
                <span className="px-2 py-0.5 text-xs font-semibold text-primary bg-primary/10 rounded">
                  {filters.eventTypes.length}
                </span>
              )}
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded.eventTypes ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isExpanded.eventTypes && (
            <div className="px-4 pb-4 space-y-2">
              {EVENT_TYPES.map((type) => (
                <label key={type.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <input
                    type="checkbox"
                    checked={filters.eventTypes.includes(type.value)}
                    onChange={() => toggleEventType(type.value)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <span className="text-sm text-gray-700">{type.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Date Range */}
        <div className="border-b border-gray-200">
          <button
            onClick={() => setIsExpanded({ ...isExpanded, dateRange: !isExpanded.dateRange })}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900">Date Range</span>
              {(filters.dateRange.start || filters.dateRange.end) && (
                <span className="px-2 py-0.5 text-xs font-semibold text-primary bg-primary/10 rounded">
                  Active
                </span>
              )}
            </div>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded.dateRange ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isExpanded.dateRange && (
            <div className="px-4 pb-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">From</label>
                <input
                  type="date"
                  value={filters.dateRange.start || ''}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    dateRange: { ...filters.dateRange, start: e.target.value || null }
                  })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">To</label>
                <input
                  type="date"
                  value={filters.dateRange.end || ''}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    dateRange: { ...filters.dateRange, end: e.target.value || null }
                  })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
