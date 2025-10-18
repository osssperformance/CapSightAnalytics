'use client'

import { CalendarDay } from '@/lib/calendar/utils'
import { useState } from 'react'

interface Event {
  id: string
  title: string
  event_date: string
  event_type: string
  company_name: string
  asx_code: string
  importance_score?: number
}

interface CalendarCellProps {
  day: CalendarDay
  events: Event[]
  isFocused: boolean
  isSelected: boolean
  onSelect: () => void
  onEventClick?: (event: Event) => void
}

export function CalendarCell({ day, events, isFocused, isSelected, onSelect, onEventClick }: CalendarCellProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Show max 3 events, then "+X more"
  const visibleEvents = events.slice(0, 3)
  const remainingCount = events.length - 3

  return (
    <div
      className={`
        relative h-full border-r border-b border-gray-200 dark:border-gray-800 p-2
        ${!day.isCurrentMonth ? 'bg-gray-50 dark:bg-gray-900/50' : 'bg-white dark:bg-gray-950'}
        ${day.isToday ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
        ${isSelected ? 'bg-primary/10 dark:bg-primary/20 ring-2 ring-primary ring-inset' : ''}
        ${isFocused && !isSelected ? 'ring-2 ring-gray-400 dark:ring-gray-600 ring-inset' : ''}
        hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      role="button"
      tabIndex={isFocused ? 0 : -1}
      aria-selected={isSelected}
      aria-label={`${day.date.day} ${events.length} events`}
    >
      {/* Date number */}
      <div className="flex items-center justify-between mb-1">
        <span
          className={`
            inline-flex items-center justify-center w-7 h-7 text-sm font-medium rounded-full
            ${day.isToday
              ? 'bg-primary text-primary-foreground'
              : !day.isCurrentMonth
                ? 'text-gray-400 dark:text-gray-600'
                : 'text-gray-900 dark:text-gray-100'
            }
          `}
        >
          {day.date.day}
        </span>

        {/* Event count badge */}
        {events.length > 0 && (
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            {events.length} {events.length === 1 ? 'event' : 'events'}
          </span>
        )}
      </div>

      {/* Events list */}
      <div className="space-y-1">
        {visibleEvents.map((event) => (
          <button
            key={event.id}
            onClick={(e) => {
              e.stopPropagation()
              onEventClick?.(event)
            }}
            className={`
              w-full text-left text-xs p-1.5 rounded border-l-2 transition-all
              ${getEventColor(event.event_type)}
              ${isHovered ? 'shadow-sm' : ''}
              hover:shadow-md hover:scale-[1.02]
            `}
          >
            <div className="font-semibold truncate text-gray-900 dark:text-gray-100">
              {event.asx_code}
            </div>
            <div className="text-gray-600 dark:text-gray-400 truncate">{event.title}</div>
          </button>
        ))}

        {remainingCount > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEventClick?.(events[3])
            }}
            className="text-xs text-primary font-medium hover:underline"
          >
            +{remainingCount} more
          </button>
        )}
      </div>
    </div>
  )
}

// Helper function to get color based on event type
function getEventColor(eventType: string): string {
  const colors: Record<string, string> = {
    drilling_results: 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-600',
    assay_results: 'bg-purple-50 dark:bg-purple-900/30 border-purple-500 dark:border-purple-600',
    exploration_update: 'bg-green-50 dark:bg-green-900/30 border-green-500 dark:border-green-600',
    jorc_resource: 'bg-orange-50 dark:bg-orange-900/30 border-orange-500 dark:border-orange-600',
    resource_update: 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-500 dark:border-yellow-600',
    production_update: 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500 dark:border-indigo-600',
    feasibility_study: 'bg-pink-50 dark:bg-pink-900/30 border-pink-500 dark:border-pink-600',
    permits_approvals: 'bg-teal-50 dark:bg-teal-900/30 border-teal-500 dark:border-teal-600',
    capital_raise: 'bg-red-50 dark:bg-red-900/30 border-red-500 dark:border-red-600',
    quarterly_report: 'bg-cyan-50 dark:bg-cyan-900/30 border-cyan-500 dark:border-cyan-600',
    agm_egm: 'bg-gray-50 dark:bg-gray-800 border-gray-500 dark:border-gray-600',
    other: 'bg-slate-50 dark:bg-slate-800 border-slate-500 dark:border-slate-600',
  }

  return colors[eventType] || colors.other
}
