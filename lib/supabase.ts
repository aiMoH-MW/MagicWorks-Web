import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy singleton — not initialized at module load, only when first called.
// Prevents build failures on Vercel when env vars aren't available at compile time.
let _anon: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_anon) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    _anon = createClient(url, key);
  }
  return _anon;
}

// Convenience re-export so call sites read naturally: supabase.from(...)
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as unknown as Record<string, unknown>)[prop as string];
  },
});

export function createServiceClient(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
