'use client'

interface CalendarHeaderProps {
  year: number
  month: string
  onPrevious: () => void
  onNext: () => void
  onToday: () => void
}

export function CalendarHeader({ year, month, onPrevious, onNext, onToday }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-900">
          {month} {year}
        </h2>
        <button
          onClick={onToday}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Today
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrevious}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          aria-label="Previous month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={onNext}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
          aria-label="Next month"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}
