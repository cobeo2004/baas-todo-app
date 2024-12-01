set -o allexport
source .env set
+o allexport

npx supabase gen types typescript --project-id "$SUPABASE_PROJECT_ID" --schema public > ./lib/types/supabase.d.ts
