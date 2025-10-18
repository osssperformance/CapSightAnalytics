'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface CompanyProfileFormProps {
  company: any
}

export function CompanyProfileForm({ company }: CompanyProfileFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    companyName: company.company_name || '',
    website: company.website || '',
    contactEmail: company.contact_email || '',
    description: company.description || '',
    primaryCommodity: company.primary_commodity || '',
    secondaryCommodities: company.secondary_commodities?.join(', ') || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/company/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: formData.companyName,
          website: formData.website || null,
          contactEmail: formData.contactEmail || null,
          description: formData.description || null,
          primaryCommodity: formData.primaryCommodity,
          secondaryCommodities: formData.secondaryCommodities
            ? formData.secondaryCommodities.split(',').map((c: string) => c.trim()).filter(Boolean)
            : []
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      setSuccess(true)
      router.refresh()

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to update profile')
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

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">Profile updated successfully!</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          ASX Code
        </label>
        <input
          type="text"
          value={company.asx_code}
          disabled
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
        />
        <p className="mt-1 text-xs text-gray-500">ASX code cannot be changed</p>
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
        <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
          Contact Email
        </label>
        <input
          id="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="contact@company.com"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Tell investors about your company..."
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

      <div>
        <label htmlFor="secondaryCommodities" className="block text-sm font-medium text-gray-700 mb-1">
          Secondary Commodities
        </label>
        <input
          id="secondaryCommodities"
          type="text"
          value={formData.secondaryCommodities}
          onChange={(e) => setFormData({ ...formData, secondaryCommodities: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Gold, Silver, Copper (comma-separated)"
        />
        <p className="mt-1 text-xs text-gray-500">Separate multiple commodities with commas</p>
      </div>

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>

        {company.is_published ? (
          <span className="flex items-center gap-2 text-sm text-green-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Profile is live
          </span>
        ) : (
          <span className="flex items-center gap-2 text-sm text-orange-700">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Pending review
          </span>
        )}
      </div>
    </form>
  )
}
