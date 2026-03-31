import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'

// ===== CONFIG =====
const PORT = process.env.PORT || 3001
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const normalizeOrigin = (value = '') => value.trim().replace(/\/+$/, '').toLowerCase()

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => normalizeOrigin(o))
  .filter(Boolean)

const hasConfiguredOrigins = ALLOWED_ORIGINS.length > 0

// ===== SUPABASE CLIENT =====
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ===== EXPRESS APP =====
const app = express()

// CORS — allow your Vercel frontend
app.use(
  cors({
    origin: (origin, callback) => {
      const requestOrigin = normalizeOrigin(origin || '')

      // Allow requests with no origin (curl, Postman, etc.) in dev
      // If ALLOWED_ORIGINS is not configured, allow all browser origins.
      if (!origin || !hasConfiguredOrigins || ALLOWED_ORIGINS.includes(requestOrigin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
)

app.use(express.json())

// ===== ROUTES =====

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Root info endpoint (helpful on Render URL)
app.get('/', (_req, res) => {
  res.json({
    name: 'Wedding RSVP API',
    status: 'ok',
    health: '/api/health',
    submitRsvp: 'POST /api/rsvp',
  })
})

// Submit RSVP
app.post('/api/rsvp', async (req, res) => {
  try {
    const { fullName, email, phone, attending, guestCount, dietary, songRequest, message } = req.body

    // Validation
    if (!fullName || fullName.trim().length === 0) {
      return res.status(400).json({ error: 'Full name is required.' })
    }
    if (attending === undefined || attending === null || attending === '') {
      return res.status(400).json({ error: 'Attendance response is required.' })
    }

    const isAttending = attending === true || attending === 'yes'

    const { data, error } = await supabase.from('rsvp_responses').insert([
      {
        full_name: fullName.trim(),
        email: email?.trim() || null,
        phone: phone?.trim() || null,
        attending: isAttending,
        guest_count: isAttending ? parseInt(guestCount) || 1 : 0,
        dietary_restrictions: dietary?.trim() || null,
        song_request: songRequest?.trim() || null,
        message: message?.trim() || null,
      },
    ]).select()

    if (error) {
      console.error('Supabase insert error:', error)

      let message = 'Failed to save RSVP. Please try again.'
      const errText = (error.message || '').toLowerCase()

      if (errText.includes('row-level security') || errText.includes('policy')) {
        message = 'Database policy blocked RSVP insert. Check Supabase RLS INSERT policy for anon role.'
      } else if (errText.includes('does not exist')) {
        message = 'RSVP table is missing. Run supabase-setup.sql in Supabase SQL editor.'
      } else if (error.message) {
        message = `Failed to save RSVP: ${error.message}`
      }

      return res.status(500).json({ error: message })
    }

    res.status(201).json({ success: true, message: 'RSVP submitted successfully!', data })
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).json({ error: 'Internal server error.' })
  }
})

// Get RSVP stats (public — just totals, no personal data)
app.get('/api/rsvp/stats', async (_req, res) => {
  try {
    const { data, error } = await supabase.rpc('get_rsvp_stats').single()

    // Fallback: query directly if RPC doesn't exist
    if (error) {
      const { data: responses, error: queryError } = await supabase
        .from('rsvp_responses')
        .select('attending, guest_count')

      if (queryError) {
        return res.status(500).json({ error: 'Failed to fetch stats.' })
      }

      const stats = {
        total_responses: responses.length,
        total_attending: responses.filter((r) => r.attending).length,
        total_declined: responses.filter((r) => !r.attending).length,
        total_guests: responses
          .filter((r) => r.attending)
          .reduce((sum, r) => sum + (r.guest_count || 0), 0),
      }
      return res.json(stats)
    }

    res.json(data)
  } catch (err) {
    console.error('Stats error:', err)
    res.status(500).json({ error: 'Internal server error.' })
  }
})

// ===== START =====
app.listen(PORT, () => {
  console.log(`🚀 Wedding RSVP API running on port ${PORT}`)
  console.log(`   Health: http://localhost:${PORT}/api/health`)
  console.log(`   RSVP:   POST http://localhost:${PORT}/api/rsvp`)
})
