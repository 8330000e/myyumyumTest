// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env
  .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("환경 변수가 설정되지 않았습니다!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
