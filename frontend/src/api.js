// API base URL — points to Render backend in production.
// In local dev, Vite proxy handles /api -> http://localhost:3001.
const configuredBaseUrl = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '')
const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname)
const API_BASE = configuredBaseUrl || (isLocalHost ? '' : 'https://wedding-rsvp-api.onrender.com')

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').trim().replace(/\/+$/, '')
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim()
const hasDirectSupabaseAccess = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

const buildRsvpPayload = (formData) => ({
  full_name: formData.fullName,
  email: formData.email || null,
  phone: formData.phone || null,
  attending: formData.attending === true || formData.attending === 'yes',
  guest_count: formData.attending === true || formData.attending === 'yes' ? formData.guestCount || 1 : 0,
  dietary_restrictions: formData.dietary || null,
  song_request: formData.songRequest || null,
  message: formData.message || null,
})

async function submitRsvpDirectToSupabase(formData) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rsvp_responses`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(buildRsvpPayload(formData)),
  })

  if (!response.ok) {
    const bodyText = await response.text()
    throw new Error(bodyText || `Failed to submit RSVP (HTTP ${response.status})`)
  }

  return { success: true, message: 'RSVP submitted successfully!' }
}

export async function submitRsvp(formData) {
  if (hasDirectSupabaseAccess) {
    return submitRsvpDirectToSupabase(formData)
  }

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
