'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { formatDate } from '@/lib/calendar/utils'
import { CalendarDate } from '@internationalized/date'

interface Event {
  id: string
  title: string
  event_date: string
  event_type: string
  company_name: string
  asx_code: string
  importance_score?: number
  commodities?: string[]
}

interface EventDetailModalProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
}

export function EventDetailModal({ event, isOpen, onClose }: EventDetailModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !event) return null

  const eventDate = event.event_date.split('T')[0]
  const [year, month, day] = eventDate.split('-').map(Number)
  const calendarDate = new CalendarDate(year, month, day)

  const shareUrl = `${window.location.origin}/calendar?event=${event.id}`

  const handleShare = (platform: 'twitter' | 'linkedin' | 'email' | 'copy') => {
    const text = `${event.title} - ${event.company_name} (${event.asx_code})`

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')
        break
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(shareUrl)}`
        break
      case 'copy':
        navigator.clipboard.writeText(shareUrl)
        break
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>

          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-6 flex items-start justify-between">
            <div className="flex-1 pr-8">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(calendarDate, 'long')}</span>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeBadge(event.event_type)}`}>
                  {formatEventType(event.event_type)}
                </span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 leading-tight">{event.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-6">
            {/* Company Info */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Company</h3>
              <Link
                href={`/companies/${event.asx_code}`}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-900 dark:to-gray-800/50 rounded-xl hover:from-primary/5 hover:to-primary/10 dark:hover:from-primary/10 dark:hover:to-primary/20 border border-gray-200 dark:border-gray-700 hover:border-primary/20 dark:hover:border-primary/30 transition-all group"
              >
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">{event.company_name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{event.asx_code}</div>
                </div>
                <svg className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Commodities */}
            {event.commodities && event.commodities.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Commodities</h3>
                <div className="flex flex-wrap gap-2">
                  {event.commodities.map((commodity) => (
                    <span
                      key={commodity}
                      className="px-3 py-1.5 bg-blue-50/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg border border-blue-100 dark:border-blue-800"
                    >
                      {commodity}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Importance Score */}
            {event.importance_score && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Importance</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200/60 dark:bg-gray-700/60 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-primary to-primary/80 h-2.5 rounded-full transition-all shadow-sm"
                      style={{ width: `${event.importance_score * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-gray-900 dark:text-gray-100 min-w-[2.5rem] text-right">
                    {Math.round(event.importance_score * 10)}/10
                  </span>
                </div>
              </div>
            )}

            {/* Share */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">Share</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-[#1DA1F2] text-gray-600 dark:text-gray-400 hover:text-white transition-colors"
                  aria-label="Share on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-[#0077B5] text-gray-600 dark:text-gray-400 hover:text-white transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                <button
                  onClick={() => handleShare('email')}
                  className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-400 hover:text-white transition-colors"
                  aria-label="Share via Email"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </button>
                <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-1" />
                <button
                  onClick={() => handleShare('copy')}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors text-sm font-medium"
                  aria-label="Copy link to clipboard"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function getEventTypeBadge(eventType: string): string {
  const colors: Record<string, string> = {
    drilling_results: 'bg-blue-100 text-blue-700',
    assay_results: 'bg-purple-100 text-purple-700',
    exploration_update: 'bg-green-100 text-green-700',
    jorc_resource: 'bg-orange-100 text-orange-700',
    resource_update: 'bg-yellow-100 text-yellow-700',
    production_update: 'bg-indigo-100 text-indigo-700',
    feasibility_study: 'bg-pink-100 text-pink-700',
    permits_approvals: 'bg-teal-100 text-teal-700',
    capital_raise: 'bg-red-100 text-red-700',
    quarterly_report: 'bg-cyan-100 text-cyan-700',
    agm_egm: 'bg-gray-100 text-gray-700',
    other: 'bg-slate-100 text-slate-700',
  }
  return colors[eventType] || colors.other
}

function formatEventType(eventType: string): string {
  return eventType
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
