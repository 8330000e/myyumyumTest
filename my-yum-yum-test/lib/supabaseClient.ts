// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://xoqeyonaoeetnjsmauxi.supabase.co"; 
const supabaseAnonKey = "sb_publishable_OtsFpOM_buP_cI1xExamSA_ELBXgEGk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);