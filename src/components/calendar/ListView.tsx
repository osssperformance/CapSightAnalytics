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
    <div className="flex-1 overflow-auto bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto p-6">
        {sortedDates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No events to display</p>
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
                    className={`sticky top-0 z-10 py-3 px-4 border-b ${isToday ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800'} cursor-pointer`}
                    onClick={() => onSelectDate(date)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`text-lg font-semibold ${isToday ? 'text-primary' : 'text-gray-900 dark:text-gray-100'}`}>
                          {formatDate(date, 'long')}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {eventsForDate.length} {eventsForDate.length === 1 ? 'event' : 'events'}
                        </p>
                      </div>
                      {isToday && (
                        <span className="px-2 py-1 text-xs font-semibold text-primary bg-primary/10 dark:bg-primary/20 rounded">
                          Today
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {eventsForDate.map((event) => (
                      <div
                        key={event.id}
                        className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-1 h-full min-h-[60px] rounded ${getEventColorBorder(event.event_type)}`} />
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-gray-900 dark:text-gray-100">{event.asx_code}</span>
                                  <span className="text-sm text-gray-500 dark:text-gray-500">•</span>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">{event.company_name}</span>
                                </div>
                                <h4 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
                                  {event.title}
                                </h4>
                                <div className="flex items-center gap-3">
                                  <span className={`text-xs px-2 py-1 rounded ${getEventColorBadge(event.event_type)}`}>
                                    {formatEventType(event.event_type)}
                                  </span>
                                  {event.importance_score && (
                                    <span className="text-xs text-gray-500 dark:text-gray-400">
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
    drilling_results: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    assay_results: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
    exploration_update: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    jorc_resource: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
    resource_update: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
    production_update: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
    feasibility_study: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
    permits_approvals: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',
    capital_raise: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    quarterly_report: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
    agm_egm: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300',
    other: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
  }
  return colors[eventType] || colors.other
}

function formatEventType(eventType: string): string {
  return eventType
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
