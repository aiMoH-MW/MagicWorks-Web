import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // ── Safety rule: ban anon Supabase client in API routes ──────────────
  // API routes must use createServiceClient() to bypass Row Level Security.
  // Using the anon `supabase` export server-side silently blocks SELECT
  // after INSERT, causing 500 errors and data loss.
  {
    files: ["app/api/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/lib/supabase",
              importNames: ["supabase", "getSupabase"],
              message:
                "API routes must use createServiceClient() — never the anon client. See lib/supabase.ts.",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
