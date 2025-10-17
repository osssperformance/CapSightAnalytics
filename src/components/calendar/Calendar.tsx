'use client'

import { useEffect, useRef } from 'react'
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
  const containerRef = useRef<HTMLDivElement>(null)

  // Group events by date (YYYY-MM-DD format)
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = event.event_date
    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(event)
    return acc
  }, {} as Record<string, Event[]>)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't interfere with input fields
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          calendar.navigateDay('left')
          break
        case 'ArrowRight':
          e.preventDefault()
          calendar.navigateDay('right')
          break
        case 'ArrowUp':
          e.preventDefault()
          calendar.navigateDay('up')
          break
        case 'ArrowDown':
          e.preventDefault()
          calendar.navigateDay('down')
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          if (calendar.focusedDate) {
            calendar.selectDate(calendar.focusedDate)
          }
          break
        case 't':
        case 'T':
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault()
            calendar.goToToday()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [calendar])

  return (
    <div ref={containerRef} className="h-full flex flex-col" tabIndex={0} role="application" aria-label="Event Calendar">
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
        selectedDate={calendar.selectedDate}
        focusedDate={calendar.focusedDate}
        onSelectDate={calendar.selectDate}
      />
    </div>
  )
}
