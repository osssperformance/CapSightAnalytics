'use client'

type ViewType = 'month' | 'week' | 'list'

interface CalendarHeaderProps {
  year: number
  month: string
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
  view: ViewType
  onViewChange: (view: ViewType) => void
  filteredCount?: number
  totalCount?: number
}

export function CalendarHeader({
  year,
  month,
  onPrevious,
  onNext,
  onToday,
  view,
  onViewChange,
  filteredCount,
  totalCount
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-8 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      {/* Left: Month/Year + Navigation */}
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100" aria-live="polite" aria-atomic="true">
          {month} {year}
        </h2>
        <div className="flex items-center gap-1">
          <button
            onClick={onPrevious}
            className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            aria-label="Previous month"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={onNext}
            className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            aria-label="Next month"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <button
          onClick={onToday}
          className="px-2.5 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900"
          aria-label="Go to today's date"
        >
          Today
        </button>
      </div>

      {/* Center: Event Count */}
      {filteredCount !== undefined && totalCount !== undefined && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-gray-100">{filteredCount}</span>
          {' '}/{' '}
          <span className="font-semibold text-gray-900 dark:text-gray-100">{totalCount}</span>
          {' '}events
        </div>
      )}

      {/* Right: View Switcher */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onViewChange('month')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
            view === 'month'
              ? 'bg-primary text-primary-foreground'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          aria-pressed={view === 'month'}
        >
          Month
        </button>
        <button
          onClick={() => onViewChange('week')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
            view === 'week'
              ? 'bg-primary text-primary-foreground'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          aria-pressed={view === 'week'}
        >
          Week
        </button>
        <button
          onClick={() => onViewChange('list')}
          className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
            view === 'list'
              ? 'bg-primary text-primary-foreground'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          aria-pressed={view === 'list'}
        >
          List
        </button>
      </div>
    </div>
  )
}
