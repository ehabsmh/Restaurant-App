import { createClient } from "@supabase/supabase-js";
import { Database } from "../../databaseTypes";

export const supabaseUrl = "https://hpefyidsyroybtfpsmuh.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwZWZ5aWRzeXJveWJ0ZnBzbXVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NzY0ODcsImV4cCI6MjA1NDM1MjQ4N30.M3x0ngAsAflYsWqeTEiveaFWVFl_u1zFIUHhwIw21GY";
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
