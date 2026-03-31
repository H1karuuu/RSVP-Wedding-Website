// API base URL — points to Render backend in production.
// In local dev, Vite proxy handles /api -> http://localhost:3001.
const configuredBaseUrl = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '')
const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname)
const API_BASE = configuredBaseUrl || (isLocalHost ? '' : 'https://wedding-rsvp-api.onrender.com')

export async function submitRsvp(formData) {
  const response = await fetch(`${API_BASE}/api/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  let data = null
  try {
    data = await response.json()
  } catch {
    // Non-JSON body (usually wrong API URL or rewrite fallback)
    data = null
  }

  if (!response.ok) {
    throw new Error(data?.error || `Failed to submit RSVP (HTTP ${response.status})`)
  }

  if (!data) {
    throw new Error('Unexpected response from API. Check VITE_API_URL configuration.')
  }

  return data
}

export async function getRsvpStats() {
  const response = await fetch(`${API_BASE}/api/rsvp/stats`)
  let data = null
  try {
    data = await response.json()
  } catch {
    data = null
  }

  if (!response.ok) {
    throw new Error(data?.error || `Failed to fetch stats (HTTP ${response.status})`)
  }

  if (!data) {
    throw new Error('Unexpected response from API. Check VITE_API_URL configuration.')
  }

  return data
}
