import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gyiygwwbrcbhqepsqhyz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5aXlnd3dicmNiaHFlcHNxaHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNDM0MzMsImV4cCI6MjA4NzkxOTQzM30.qRNnlyRcXJ3wIAP9wOSY8I2_51eIs5r8ytyJhwmlM1k'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
