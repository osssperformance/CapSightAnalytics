'use client'

import { CalendarDay } from '@/lib/calendar/utils'
import { CalendarCell } from './CalendarCell'

interface Event {
  id: string
  title: string
  event_date: string
  event_type: string
  company_name: string
  asx_code: string
  importance_score?: number
}

interface CalendarGridProps {
  days: CalendarDay[]
  dayNames: string[]
  eventsByDate: Record<string, Event[]>
}

export function CalendarGrid({ days, dayNames, eventsByDate }: CalendarGridProps) {
  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Day names header */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {dayNames.map((name) => (
          <div
            key={name}
            className="py-3 text-center text-sm font-semibold text-gray-700 bg-gray-50"
          >
            {name}
          </div>
        ))}
      </div>

      {/* Calendar grid - 6 rows of 7 days */}
      <div className="flex-1 grid grid-cols-7 grid-rows-6 border-l border-t border-gray-200">
        {days.map((day, index) => {
          const dateKey = `${day.date.year}-${String(day.date.month).padStart(2, '0')}-${String(day.date.day).padStart(2, '0')}`
          const eventsForDay = eventsByDate[dateKey] || []

          return (
            <CalendarCell
              key={index}
              day={day}
              events={eventsForDay}
            />
          )
        })}
      </div>
    </div>
  )
}
