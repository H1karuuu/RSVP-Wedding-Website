-- =============================================
-- SUPABASE SQL SCRIPT FOR WEDDING RSVP WEBSITE
-- =============================================
-- Safe to run multiple times (idempotent where possible).
-- Run this entire script in Supabase SQL Editor.

BEGIN;

-- 1) Table
CREATE TABLE IF NOT EXISTS public.rsvp_responses (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    attending BOOLEAN NOT NULL DEFAULT false,
    guest_count INTEGER NOT NULL DEFAULT 1,
    dietary_restrictions TEXT,
    song_request TEXT,
    message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.rsvp_responses IS 'Stores wedding RSVP form submissions from guests';

-- 2) Indexes
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON public.rsvp_responses (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_rsvp_attending ON public.rsvp_responses (attending);

-- 3) Permissions required by PostgREST (API)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON TABLE public.rsvp_responses TO anon;
GRANT SELECT ON TABLE public.rsvp_responses TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.rsvp_responses_id_seq TO anon, authenticated;

-- 4) Row Level Security
ALTER TABLE public.rsvp_responses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.rsvp_responses;
CREATE POLICY "Allow anonymous inserts"
    ON public.rsvp_responses
    FOR INSERT
    TO anon
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated select" ON public.rsvp_responses;
CREATE POLICY "Allow authenticated select"
    ON public.rsvp_responses
    FOR SELECT
    TO authenticated
    USING (true);

-- 5) Optional admin-friendly stats view
CREATE OR REPLACE VIEW public.rsvp_stats AS
SELECT
    COUNT(*) AS total_responses,
    COUNT(*) FILTER (WHERE attending = true) AS total_attending,
    COUNT(*) FILTER (WHERE attending = false) AS total_declined,
    COALESCE(SUM(guest_count) FILTER (WHERE attending = true), 0) AS total_guests
FROM public.rsvp_responses;

GRANT SELECT ON public.rsvp_stats TO authenticated;

-- 6) RPC used by backend: get_rsvp_stats
CREATE OR REPLACE FUNCTION public.get_rsvp_stats()
RETURNS TABLE (
    total_responses BIGINT,
    total_attending BIGINT,
    total_declined BIGINT,
    total_guests BIGINT
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT
        COUNT(*)::BIGINT AS total_responses,
        COUNT(*) FILTER (WHERE attending = true)::BIGINT AS total_attending,
        COUNT(*) FILTER (WHERE attending = false)::BIGINT AS total_declined,
        COALESCE(SUM(guest_count) FILTER (WHERE attending = true), 0)::BIGINT AS total_guests
    FROM public.rsvp_responses;
$$;

GRANT EXECUTE ON FUNCTION public.get_rsvp_stats() TO anon, authenticated;

COMMIT;

-- Optional verification:
-- SELECT * FROM public.rsvp_stats;
-- SELECT * FROM public.get_rsvp_stats();
