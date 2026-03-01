# Wedding RSVP Website

An elegant wedding RSVP website built with Vue 3, Express.js, and Supabase.

## Features
- Interactive envelope landing page with petal animation
- Live countdown to the wedding day (June 04, 2026)
- Prenup photo gallery with lightbox
- Background music with play/pause toggle
- QR codes for ceremony & reception locations
- RSVP form connected to Supabase
- Fully responsive pastel design

## Project Structure

```
├── frontend/          # Vue 3 + Vite (deployed to Vercel)
├── backend/           # Express.js API (deployed to Render)
├── supabase-setup.sql # Database schema (run in Supabase SQL Editor)
└── render.yaml        # Render deployment blueprint
```

## Setup

### 1. Database
1. Create a project on [Supabase](https://supabase.com)
2. Go to **SQL Editor** and run `supabase-setup.sql`

### 2. Backend
```bash
cd backend
npm install
# Edit .env with your Supabase credentials
npm run dev
```
Runs on `http://localhost:3001`

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:3000` (proxies `/api` to backend)

## Deployment

### Frontend → Vercel
1. Import the repo on Vercel
2. Set **Root Directory** to `frontend`
3. Add env var: `VITE_API_URL` = your Render backend URL (e.g. `https://your-app.onrender.com`)

### Backend → Render
1. Connect repo on Render (or use `render.yaml` blueprint)
2. Set **Root Directory** to `backend`
3. Add env vars: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `ALLOWED_ORIGINS` (your Vercel domain)

## Customization
- Replace `Groom & Bride` with actual names in the Vue files
- Add photos to `frontend/public/photos/`
- Add background music as `frontend/public/music/bg-music.mp3`
- Update Google Maps links in `MainPage.vue`

---
Made with ♡ by **JC Lopez**