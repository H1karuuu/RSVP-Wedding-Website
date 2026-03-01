-- =============================================
-- SUPABASE SQL SCRIPT FOR WEDDING RSVP WEBSITE
-- =============================================
-- Run this in your Supabase SQL Editor:
-- Go to https://supabase.com/dashboard → Select your project → SQL Editor → New Query
-- Paste this entire script and click "Run"

-- 1) Create the RSVP responses table
CREATE TABLE IF NOT EXISTS rsvp_responses (
    id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    full_name       TEXT NOT NULL,
    email           TEXT,
    phone           TEXT,
    attending       BOOLEAN NOT NULL DEFAULT false,
    guest_count     INTEGER NOT NULL DEFAULT 1,
    dietary_restrictions TEXT,
    song_request    TEXT,
    message         TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2) Add a comment for documentation
COMMENT ON TABLE rsvp_responses IS 'Stores wedding RSVP form submissions from guests';

-- 3) Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp_responses (created_at DESC);

-- 4) Create an index on attending for filtering
CREATE INDEX IF NOT EXISTS idx_rsvp_attending ON rsvp_responses (attending);

-- 5) Enable Row Level Security (RLS)
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- 6) Policy: Allow anyone (anonymous users) to INSERT new RSVP responses
--    This is needed because guests submit the form without logging in
DROP POLICY IF EXISTS "Allow anonymous inserts" ON rsvp_responses;
CREATE POLICY "Allow anonymous inserts"
    ON rsvp_responses
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- 7) Policy: Allow only authenticated users (you, the admin) to SELECT all responses
--    This means only you can view the RSVP list from the Supabase dashboard
DROP POLICY IF EXISTS "Allow authenticated select" ON rsvp_responses;
CREATE POLICY "Allow authenticated select"
    ON rsvp_responses
    FOR SELECT
    TO authenticated
    USING (true);

-- 8) Optional: If you also want anonymous users to see a success confirmation,
--    you can allow them to read their own row. Uncomment below if needed:
-- CREATE POLICY "Allow anon to read own row"
--     ON rsvp_responses
--     FOR SELECT
--     TO anon
--     USING (true);

-- =============================================
-- OPTIONAL: Create a view for quick stats
-- =============================================
CREATE OR REPLACE VIEW rsvp_stats AS
SELECT
    COUNT(*) AS total_responses,
    COUNT(*) FILTER (WHERE attending = true) AS total_attending,
    COUNT(*) FILTER (WHERE attending = false) AS total_declined,
    COALESCE(SUM(guest_count) FILTER (WHERE attending = true), 0) AS total_guests
FROM rsvp_responses;

-- Grant the authenticated role access to the view
GRANT SELECT ON rsvp_stats TO authenticated;

-- =============================================
-- DONE! Your Supabase backend is ready.
-- =============================================
