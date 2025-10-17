'use client'

import { CalendarDate } from '@internationalized/date'
import { formatDate } from '@/lib/calendar/utils'

interface Event {
  id: string
  title: string
  event_date: string
  event_type: string
  company_name: string
  asx_code: string
  importance_score?: number
}

interface ListViewProps {
  events: Event[]
  selectedDate: CalendarDate | null
  onSelectDate: (date: CalendarDate) => void
}

export function ListView({ events, selectedDate, onSelectDate }: ListViewProps) {
  // Group events by date
  const eventsByDate = events.reduce((acc, event) => {
    const date = event.event_date.split('T')[0]
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(event)
    return acc
  }, {} as Record<string, Event[]>)

  const sortedDates = Object.keys(eventsByDate).sort()

  return (
    <div className="flex-1 overflow-auto bg-white">
      <div className="max-w-4xl mx-auto p-6">
        {sortedDates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No events to display</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sortedDates.map((dateKey) => {
              const eventsForDate = eventsByDate[dateKey]
              const [year, month, day] = dateKey.split('-').map(Number)
              const date = new CalendarDate(year, month, day)
              const isToday = new Date().toISOString().split('T')[0] === dateKey
              const isSelected = selectedDate &&
                selectedDate.year === year &&
                selectedDate.month === month &&
                selectedDate.day === day

              return (
                <div key={dateKey} className={`${isSelected ? 'ring-2 ring-primary rounded-lg' : ''}`}>
                  <div
                    className={`sticky top-0 z-10 py-3 px-4 border-b ${isToday ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'} cursor-pointer`}
                    onClick={() => onSelectDate(date)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`text-lg font-semibold ${isToday ? 'text-primary' : 'text-gray-900'}`}>
                          {formatDate(date, 'long')}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {eventsForDate.length} {eventsForDate.length === 1 ? 'event' : 'events'}
                        </p>
                      </div>
                      {isToday && (
                        <span className="px-2 py-1 text-xs font-semibold text-primary bg-primary/10 rounded">
                          Today
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {eventsForDate.map((event) => (
                      <div
                        key={event.id}
                        className="p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-1 h-full min-h-[60px] rounded ${getEventColorBorder(event.event_type)}`} />
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-gray-900">{event.asx_code}</span>
                                  <span className="text-sm text-gray-500">•</span>
                                  <span className="text-sm text-gray-600">{event.company_name}</span>
                                </div>
                                <h4 className="text-base font-medium text-gray-900 mb-2">
                                  {event.title}
                                </h4>
                                <div className="flex items-center gap-3">
                                  <span className={`text-xs px-2 py-1 rounded ${getEventColorBadge(event.event_type)}`}>
                                    {formatEventType(event.event_type)}
                                  </span>
                                  {event.importance_score && (
                                    <span className="text-xs text-gray-500">
                                      Importance: {event.importance_score}/10
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

function getEventColorBorder(eventType: string): string {
  const colors: Record<string, string> = {
    drilling_results: 'bg-blue-500',
    assay_results: 'bg-purple-500',
    exploration_update: 'bg-green-500',
    jorc_resource: 'bg-orange-500',
    resource_update: 'bg-yellow-500',
    production_update: 'bg-indigo-500',
    feasibility_study: 'bg-pink-500',
    permits_approvals: 'bg-teal-500',
    capital_raise: 'bg-red-500',
    quarterly_report: 'bg-cyan-500',
    agm_egm: 'bg-gray-500',
    other: 'bg-slate-500',
  }
  return colors[eventType] || colors.other
}

function getEventColorBadge(eventType: string): string {
  const colors: Record<string, string> = {
    drilling_results: 'bg-blue-100 text-blue-700',
    assay_results: 'bg-purple-100 text-purple-700',
    exploration_update: 'bg-green-100 text-green-700',
    jorc_resource: 'bg-orange-100 text-orange-700',
    resource_update: 'bg-yellow-100 text-yellow-700',
    production_update: 'bg-indigo-100 text-indigo-700',
    feasibility_study: 'bg-pink-100 text-pink-700',
    permits_approvals: 'bg-teal-100 text-teal-700',
    capital_raise: 'bg-red-100 text-red-700',
    quarterly_report: 'bg-cyan-100 text-cyan-700',
    agm_egm: 'bg-gray-100 text-gray-700',
    other: 'bg-slate-100 text-slate-700',
  }
  return colors[eventType] || colors.other
}

function formatEventType(eventType: string): string {
  return eventType
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
