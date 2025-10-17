'use client'

import { useState, useMemo, useCallback } from 'react'
import { generateCalendarGrid, type CalendarDay } from './utils'
import { CalendarDate } from '@internationalized/date'

export interface UseCalendarReturn {
  year: number
  month: number
  days: CalendarDay[]
  selectedDate: CalendarDate | null
  focusedDate: CalendarDate | null
  goToNextMonth: () => void
  goToPreviousMonth: () => void
  goToToday: () => void
  goToMonth: (year: number, month: number) => void
  selectDate: (date: CalendarDate) => void
  setFocusedDate: (date: CalendarDate) => void
  navigateDay: (direction: 'up' | 'down' | 'left' | 'right') => void
}

export function useCalendar(initialYear?: number, initialMonth?: number): UseCalendarReturn {
  const now = new Date()
  const [year, setYear] = useState(initialYear || now.getFullYear())
  const [month, setMonth] = useState(initialMonth || now.getMonth() + 1) // 1-12
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null)
  const [focusedDate, setFocusedDate] = useState<CalendarDate | null>(
    new CalendarDate(now.getFullYear(), now.getMonth() + 1, now.getDate())
  )

  const days = useMemo(() => {
    return generateCalendarGrid(year, month)
  }, [year, month])

  const goToNextMonth = () => {
    if (month === 12) {
      setYear(year + 1)
      setMonth(1)
    } else {
      setMonth(month + 1)
    }
  }

  const goToPreviousMonth = () => {
    if (month === 1) {
      setYear(year - 1)
      setMonth(12)
    } else {
      setMonth(month - 1)
    }
  }

  const goToToday = () => {
    const today = new Date()
    setYear(today.getFullYear())
    setMonth(today.getMonth() + 1)
    const todayDate = new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate())
    setFocusedDate(todayDate)
  }

  const goToMonth = (newYear: number, newMonth: number) => {
    setYear(newYear)
    setMonth(newMonth)
  }

  const selectDate = (date: CalendarDate) => {
    setSelectedDate(date)
    setFocusedDate(date)
  }

  const navigateDay = useCallback((direction: 'up' | 'down' | 'left' | 'right') => {
    if (!focusedDate) return

    let newDate = focusedDate
    switch (direction) {
      case 'left':
        newDate = focusedDate.subtract({ days: 1 })
        break
      case 'right':
        newDate = focusedDate.add({ days: 1 })
        break
      case 'up':
        newDate = focusedDate.subtract({ days: 7 })
        break
      case 'down':
        newDate = focusedDate.add({ days: 7 })
        break
    }

    setFocusedDate(newDate)

    // Navigate to new month if needed
    if (newDate.month !== month || newDate.year !== year) {
      setYear(newDate.year)
      setMonth(newDate.month)
    }
  }, [focusedDate, month, year])

  return {
    year,
    month,
    days,
    selectedDate,
    focusedDate,
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
    goToMonth,
    selectDate,
    setFocusedDate,
    navigateDay,
  }
}
