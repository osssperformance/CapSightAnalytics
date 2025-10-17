'use client'

import { CalendarDate } from '@internationalized/date'
import { CalendarDay, getDayNames } from '@/lib/calendar/utils'
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

interface MonthViewProps {
  days: CalendarDay[]
  eventsByDate: Record<string, Event[]>
  selectedDate: CalendarDate | null
  focusedDate: CalendarDate | null
  onSelectDate: (date: CalendarDate) => void
  onEventClick?: (event: Event) => void
}

export function MonthView({ days, eventsByDate, selectedDate, focusedDate, onSelectDate, onEventClick }: MonthViewProps) {
  const dayNames = getDayNames()

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

          const isFocused = focusedDate &&
            focusedDate.year === day.date.year &&
            focusedDate.month === day.date.month &&
            focusedDate.day === day.date.day

          const isSelected = selectedDate &&
            selectedDate.year === day.date.year &&
            selectedDate.month === day.date.month &&
            selectedDate.day === day.date.day

          return (
            <CalendarCell
              key={index}
              day={day}
              events={eventsForDay}
              isFocused={isFocused}
              isSelected={isSelected}
              onSelect={() => onSelectDate(day.date)}
              onEventClick={onEventClick}
            />
          )
        })}
      </div>
    </div>
  )
}
