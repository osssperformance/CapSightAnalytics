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
        relative min-h-[120px] border-r border-b border-gray-200 p-2
        ${!day.isCurrentMonth ? 'bg-gray-50' : 'bg-white'}
        ${day.isToday ? 'bg-blue-50' : ''}
        ${isSelected ? 'bg-primary/10 ring-2 ring-primary ring-inset' : ''}
        ${isFocused && !isSelected ? 'ring-2 ring-gray-400 ring-inset' : ''}
        hover:bg-gray-50 transition-colors cursor-pointer
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
            ${day.isToday ? 'bg-primary text-white' : ''}
            ${!day.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'}
          `}
        >
          {day.date.day}
        </span>

        {/* Event count badge */}
        {events.length > 0 && (
          <span className="text-xs font-semibold text-gray-500">
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
            <div className="font-semibold truncate text-gray-900">
              {event.asx_code}
            </div>
            <div className="text-gray-600 truncate">{event.title}</div>
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
    drilling_results: 'bg-blue-50 border-blue-500',
    assay_results: 'bg-purple-50 border-purple-500',
    exploration_update: 'bg-green-50 border-green-500',
    jorc_resource: 'bg-orange-50 border-orange-500',
    resource_update: 'bg-yellow-50 border-yellow-500',
    production_update: 'bg-indigo-50 border-indigo-500',
    feasibility_study: 'bg-pink-50 border-pink-500',
    permits_approvals: 'bg-teal-50 border-teal-500',
    capital_raise: 'bg-red-50 border-red-500',
    quarterly_report: 'bg-cyan-50 border-cyan-500',
    agm_egm: 'bg-gray-50 border-gray-500',
    other: 'bg-slate-50 border-slate-500',
  }

  return colors[eventType] || colors.other
}
