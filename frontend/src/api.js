// API base URL — points to your Render backend in production
// In local dev, Vite proxy handles /api → http://localhost:3001

const API_BASE = import.meta.env.VITE_API_URL || ''

export async function submitRsvp(formData) {
  const response = await fetch(`${API_BASE}/api/rsvp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to submit RSVP')
  }

  return data
}

export async function getRsvpStats() {
  const response = await fetch(`${API_BASE}/api/rsvp/stats`)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch stats')
  }

  return data
}
