'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CompanyOnboardingFormProps {
  user: any
}

export function CompanyOnboardingForm({ user }: CompanyOnboardingFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    asxCode: '',
    companyName: '',
    website: '',
    primaryCommodity: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/company/onboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create company')
      }

      // Redirect to dashboard
      router.push('/company/dashboard')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to create company')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="asxCode" className="block text-sm font-medium text-gray-700 mb-1">
          ASX Code *
        </label>
        <input
          id="asxCode"
          type="text"
          value={formData.asxCode}
          onChange={(e) => setFormData({ ...formData, asxCode: e.target.value.toUpperCase() })}
          required
          maxLength={3}
          pattern="[A-Z]{3}"
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary uppercase"
          placeholder="ABC"
        />
        <p className="mt-1 text-xs text-gray-500">Your 3-letter ASX stock code</p>
      </div>

      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
          Company Name *
        </label>
        <input
          id="companyName"
          type="text"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Acme Mining Ltd"
        />
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
          Website
        </label>
        <input
          id="website"
          type="url"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="https://example.com"
        />
      </div>

      <div>
        <label htmlFor="primaryCommodity" className="block text-sm font-medium text-gray-700 mb-1">
          Primary Commodity *
        </label>
        <select
          id="primaryCommodity"
          value={formData.primaryCommodity}
          onChange={(e) => setFormData({ ...formData, primaryCommodity: e.target.value })}
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="">Select commodity...</option>
          <option value="Lithium">Lithium</option>
          <option value="Rare Earth Elements">Rare Earth Elements</option>
          <option value="Nickel">Nickel</option>
          <option value="Copper">Copper</option>
          <option value="Graphite">Graphite</option>
          <option value="Cobalt">Cobalt</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Iron Ore">Iron Ore</option>
          <option value="Zinc">Zinc</option>
          <option value="Lead">Lead</option>
          <option value="Uranium">Uranium</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Pending Review</p>
            <p>Your company profile will be reviewed before being published to the platform. You can start creating events immediately.</p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Creating company...' : 'Create Company Profile'}
      </button>
    </form>
  )
}
