
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://smgujwjtucsypnpahvhk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtZ3Vqd2p0dWNzeXBucGFodmhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNjQ5MTcsImV4cCI6MjA2NTY0MDkxN30.Rb7z3uSHgxnRyMdabVa0jz74PRkTQeY0OyWh_TljhvQ'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
