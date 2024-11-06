import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://iwuuezcrjidhfhrjhugq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3dXVlemNyamlkaGZocmpodWdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzMDYyODgsImV4cCI6MjAxOTg4MjI4OH0.A09o6N0sdtVy269NPYTqlb6R9BkG7HmKXHY2orZc8Qs'
export const supabase = createClient(supabaseUrl, supabaseKey)
console.log('init supabase', supabase);

