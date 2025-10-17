'use client'

import { CalendarDate } from '@internationalized/date'
import { getDayNames } from '@/lib/calendar/utils'

interface Event {
  id: string
  title: string
  event_date: string
  event_type: string
  company_name: string
  asx_code: string
  importance_score?: number
}

interface WeekViewProps {
  weekDays: CalendarDate[]
  eventsByDate: Record<string, Event[]>
  selectedDate: CalendarDate | null
  onSelectDate: (date: CalendarDate) => void
}

export function WeekView({ weekDays, eventsByDate, selectedDate, onSelectDate }: WeekViewProps) {
  const dayNames = getDayNames()
  const hours = Array.from({ length: 24 }, (_, i) => i)

  return (
    <div className="flex-1 flex flex-col bg-white overflow-auto">
      {/* Day headers */}
      <div className="grid grid-cols-8 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="py-3 px-4 text-sm font-semibold text-gray-700 bg-gray-50 border-r"></div>
        {weekDays.map((day, index) => {
          const dateKey = `${day.year}-${String(day.month).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`
          const eventsForDay = eventsByDate[dateKey] || []
          const isToday = new Date().toISOString().split('T')[0] === dateKey
          const isSelected = selectedDate &&
            selectedDate.year === day.year &&
            selectedDate.month === day.month &&
            selectedDate.day === day.day

          return (
            <div
              key={index}
              className={`py-3 px-4 text-center border-r ${isToday ? 'bg-blue-50' : 'bg-gray-50'} ${isSelected ? 'bg-primary/10' : ''}`}
            >
              <div className="text-xs text-gray-600">{dayNames[index]}</div>
              <div className={`text-lg font-semibold ${isToday ? 'text-primary' : 'text-gray-900'}`}>
                {day.day}
              </div>
              <div className="text-xs text-gray-500">{eventsForDay.length} events</div>
            </div>
          )
        })}
      </div>

      {/* Time slots */}
      <div className="flex-1">
        {hours.map((hour) => (
          <div key={hour} className="grid grid-cols-8 border-b border-gray-200 min-h-[60px]">
            <div className="py-2 px-4 text-xs text-gray-500 bg-gray-50 border-r">
              {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
            </div>
            {weekDays.map((day, index) => {
              const dateKey = `${day.year}-${String(day.month).padStart(2, '0')}-${String(day.day).padStart(2, '0')}`
              const eventsForDay = eventsByDate[dateKey] || []

              return (
                <div
                  key={index}
                  className="border-r border-gray-100 hover:bg-gray-50 cursor-pointer relative"
                  onClick={() => onSelectDate(day)}
                >
                  {hour === 9 && eventsForDay.length > 0 && (
                    <div className="absolute inset-x-1 top-1 space-y-1">
                      {eventsForDay.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={`text-xs p-1 rounded border-l-2 ${getEventColor(event.event_type)}`}
                        >
                          <div className="font-semibold truncate">{event.asx_code}</div>
                          <div className="text-gray-600 truncate text-[10px]">{event.title}</div>
                        </div>
                      ))}
                      {eventsForDay.length > 2 && (
                        <div className="text-[10px] text-gray-500 px-1">+{eventsForDay.length - 2} more</div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

function getEventColor(eventType: string): string {
  const colors: Record<string, string> = {
    drilling_results: 'bg-blue-50 border-blue-500',
    assay_results: 'bg-purple-50 border-purple-500',
    exploration_update: 'bg-green-50 border-green-500',
    jorc_resource: 'bg-orange-50 border-orange-500',
    resource_update: 'bg-yellow-50 border-yellow-500',
    production_update: 'bg-indigo-50 border-indigo-500',
    feasibility_study: 'bg-pink-50 border-pink-500',
    permits_approvals: 'bg-teal-50 border-teal-500',
    capital_raise: 'bg-red-50 border-red-500',
    quarterly_report: 'bg-cyan-50 border-cyan-500',
    agm_egm: 'bg-gray-50 border-gray-500',
    other: 'bg-slate-50 border-slate-500',
  }

  return colors[eventType] || colors.other
}
