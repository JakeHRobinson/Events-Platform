import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseClient: SupabaseClient = createClient(
    'https://tdeiarvjcfnwlwbxzadr.supabase.co',
    import.meta.env.VITE_SUPABASE_KEY
);

export default supabaseClient;