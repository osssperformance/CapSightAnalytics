'use client'

import { useEffect, useRef, useState } from 'react'
import { CalendarDate, startOfWeek, endOfWeek } from '@internationalized/date'
import { useCalendar } from '@/lib/calendar/useCalendar'
import { getMonthName, getDayNames } from '@/lib/calendar/utils'
import { CalendarGrid } from './CalendarGrid'
import { CalendarHeader } from './CalendarHeader'
import { MonthView } from './MonthView'
import { WeekView } from './WeekView'
import { ListView } from './ListView'
import { EventDetailModal } from './EventDetailModal'

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

type ViewType = 'month' | 'week' | 'list'

export function Calendar({ events }: CalendarProps) {
  const calendar = useCalendar()
  const monthName = getMonthName(calendar.month)
  const dayNames = getDayNames()
  const containerRef = useRef<HTMLDivElement>(null)
  const [view, setView] = useState<ViewType>('month')
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  // Group events by date (YYYY-MM-DD format)
  const eventsByDate = events.reduce((acc, event) => {
    const dateKey = event.event_date
    if (!acc[dateKey]) {
      acc[dateKey] = []
    }
    acc[dateKey].push(event)
    return acc
  }, {} as Record<string, Event[]>)

  // Get current week days for week view
  const getWeekDays = (): CalendarDate[] => {
    const today = calendar.focusedDate || new CalendarDate(calendar.year, calendar.month, 1)
    const start = startOfWeek(today, 'en-US')
    const days: CalendarDate[] = []
    for (let i = 0; i < 7; i++) {
      days.push(start.add({ days: i }))
    }
    return days
  }

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

  // Determine navigation functions based on view
  const handlePrevious = view === 'week' ? calendar.goToPreviousWeek : calendar.goToPreviousMonth
  const handleNext = view === 'week' ? calendar.goToNextWeek : calendar.goToNextMonth

  return (
    <div ref={containerRef} className="h-full flex flex-col" tabIndex={0} role="application" aria-label="Event Calendar">
      <CalendarHeader
        year={calendar.year}
        month={monthName}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToday={calendar.goToToday}
      />

      {/* View Switcher */}
      <div className="flex items-center gap-2 px-6 py-3 bg-white border-b border-gray-200">
        <button
          onClick={() => setView('month')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            view === 'month'
              ? 'bg-primary text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-pressed={view === 'month'}
        >
          Month
        </button>
        <button
          onClick={() => setView('week')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            view === 'week'
              ? 'bg-primary text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-pressed={view === 'week'}
        >
          Week
        </button>
        <button
          onClick={() => setView('list')}
          className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
            view === 'list'
              ? 'bg-primary text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
          aria-pressed={view === 'list'}
        >
          List
        </button>
      </div>

      {/* Render active view */}
      {view === 'month' && (
        <MonthView
          days={calendar.days}
          eventsByDate={eventsByDate}
          selectedDate={calendar.selectedDate}
          focusedDate={calendar.focusedDate}
          onSelectDate={calendar.selectDate}
          onEventClick={handleEventClick}
        />
      )}

      {view === 'week' && (
        <WeekView
          weekDays={getWeekDays()}
          eventsByDate={eventsByDate}
          selectedDate={calendar.selectedDate}
          onSelectDate={calendar.selectDate}
        />
      )}

      {view === 'list' && (
        <ListView
          events={events}
          selectedDate={calendar.selectedDate}
          onSelectDate={calendar.selectDate}
        />
      )}

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
