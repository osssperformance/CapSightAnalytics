'use client'

import { useState, useMemo } from 'react'
import { generateCalendarGrid, type CalendarDay } from './utils'

export interface UseCalendarReturn {
  year: number
  month: number
  days: CalendarDay[]
  goToNextMonth: () => void
  goToPreviousMonth: () => void
  goToToday: () => void
  goToMonth: (year: number, month: number) => void
}

export function useCalendar(initialYear?: number, initialMonth?: number): UseCalendarReturn {
  const now = new Date()
  const [year, setYear] = useState(initialYear || now.getFullYear())
  const [month, setMonth] = useState(initialMonth || now.getMonth() + 1) // 1-12

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
  }

  const goToMonth = (newYear: number, newMonth: number) => {
    setYear(newYear)
    setMonth(newMonth)
  }

  return {
    year,
    month,
    days,
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
    goToMonth,
  }
}
