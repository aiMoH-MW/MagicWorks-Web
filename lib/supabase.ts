import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy singleton -- not initialized at module load, only when first called.
// Prevents build failures on Vercel when env vars are not available at compile time.
let _anon: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_anon) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    _anon = createClient(url, key);
  }
  return _anon;
}

// Browser-only anon client -- DO NOT use in API routes (app/api/**).
// API routes must use createServiceClient() to bypass RLS.
// This proxy throws at runtime if accidentally called server-side.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (typeof window === "undefined") {
      throw new Error(
        "[supabase] Anon client used server-side. Use createServiceClient() in API routes instead."
      );
    }
    return (getSupabase() as unknown as Record<string, unknown>)[prop as string];
  },
});

export function createServiceClient(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
