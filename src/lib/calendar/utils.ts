import { CalendarDate, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isToday } from '@internationalized/date'

export interface CalendarDay {
  date: CalendarDate
  isCurrentMonth: boolean
  isToday: boolean
  isPast: boolean
  isFuture: boolean
}

/**
 * Generate calendar grid for a given month
 * Returns 6 weeks (42 days) to maintain consistent grid height
 */
export function generateCalendarGrid(year: number, month: number): CalendarDay[] {
  const referenceDate = new CalendarDate(year, month, 1)
  const monthStart = startOfMonth(referenceDate)
  const monthEnd = endOfMonth(referenceDate)

  // Start from the beginning of the week that contains the first day of the month
  const gridStart = startOfWeek(monthStart, 'en-AU') // Australian week starts on Sunday

  // End at the end of the week that contains the last day of the month
  let gridEnd = endOfWeek(monthEnd, 'en-AU')

  // Always show 6 weeks (42 days) for consistent height
  const days: CalendarDay[] = []
  let currentDate = gridStart

  // Generate exactly 42 days (6 weeks)
  for (let i = 0; i < 42; i++) {
    const today = new CalendarDate(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate()
    )

    days.push({
      date: currentDate,
      isCurrentMonth: isSameMonth(currentDate, referenceDate),
      isToday: isToday(currentDate, 'Australia/Sydney'),
      isPast: currentDate.compare(today) < 0,
      isFuture: currentDate.compare(today) > 0,
    })

    // Move to next day
    currentDate = currentDate.add({ days: 1 })
  }

  return days
}

/**
 * Get month name from month number (1-12)
 */
export function getMonthName(month: number): string {
  const date = new Date(2024, month - 1, 1)
  return date.toLocaleDateString('en-AU', { month: 'long' })
}

/**
 * Get day of week abbreviations
 */
export function getDayNames(): string[] {
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
}

/**
 * Format date for display
 */
export function formatDate(date: CalendarDate, format: 'short' | 'long' = 'short'): string {
  const jsDate = new Date(date.year, date.month - 1, date.day)

  if (format === 'short') {
    return jsDate.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
    })
  }

  return jsDate.toLocaleDateString('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
