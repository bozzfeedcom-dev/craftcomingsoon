"use client"

import { useState, useEffect } from "react"

interface WaitlistEntry {
  email: string
  timestamp: string
}

export default function AdminPage() {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load waitlist from localStorage
    try {
      const stored = localStorage.getItem('waitlist')
      if (stored) {
        setWaitlist(JSON.parse(stored))
      }
    } catch (error) {
      console.error("Failed to load waitlist:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const exportEmails = () => {
    const emails = waitlist.map(entry => entry.email).join('\n')
    const blob = new Blob([emails], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'waitlist-emails.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  const clearWaitlist = () => {
    if (confirm('Are you sure you want to clear the waitlist?')) {
      localStorage.removeItem('waitlist')
      setWaitlist([])
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Waitlist Admin</h1>
            <div className="space-x-3">
              <button
                onClick={exportEmails}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Export Emails
              </button>
              <button
                onClick={clearWaitlist}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">
              Total signups: <span className="font-semibold">{waitlist.length}</span>
            </p>
          </div>

          {waitlist.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No waitlist entries yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {waitlist.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {entry.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(entry.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
