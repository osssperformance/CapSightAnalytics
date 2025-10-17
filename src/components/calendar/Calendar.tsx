'use client'

import { useCalendar } from '@/lib/calendar/useCalendar'
import { getMonthName, getDayNames } from '@/lib/calendar/utils'
import { CalendarGrid } from './CalendarGrid'
import { CalendarHeader } from './CalendarHeader'

interface Event {
  id: string
  title: string
  event_date: string
  event_type: string
  company_name: string
  asx_code: string
  importance_score?: number
}

interface CalendarProps {
  events: Event[]
}

export function Calendar({ events }: CalendarProps) {
  const calendar = useCalendar()
  const monthName = getMonthName(calendar.month)
  const dayNames = getDayNames()

  // Group events by date (YYYY-MM-DD format)
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = event.event_date
    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(event)
    return acc
  }, {} as Record<string, Event[]>)

  return (
    <div className="h-full flex flex-col">
      <CalendarHeader
        year={calendar.year}
        month={monthName}
        onPrevious={calendar.goToPreviousMonth}
        onNext={calendar.goToNextMonth}
        onToday={calendar.goToToday}
      />

      <CalendarGrid
        days={calendar.days}
        dayNames={dayNames}
        eventsByDate={eventsByDate}
      />
    </div>
  )
}
