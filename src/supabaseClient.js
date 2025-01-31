import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nmtxyfkjcceksccevwlz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tdHh5ZmtqY2Nla3NjY2V2d2x6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyNjI2NTQsImV4cCI6MjA1MzgzODY1NH0.iieH7bC9TL_6ijcwfCqY3cLYQ8wOx0LmSR9viLmSoN8';

export const supabase = createClient(supabaseUrl, supabaseKey);
