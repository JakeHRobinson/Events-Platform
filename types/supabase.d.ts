declare module './utils/supabase' {
  import { SupabaseClient } from '@supabase/supabase-js';

  const supabase: SupabaseClient;
  export default supabase;
}