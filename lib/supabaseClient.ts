// lib/supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

// Vercel 환경 변수에서 값을 가져오고, 없으면 빈 문자열을 기본값으로 설정
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
