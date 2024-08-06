import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ftazexyjxwfktbmkvono.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0YXpleHlqeHdma3RibWt2b25vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI2NzM2OTIsImV4cCI6MjAzODI0OTY5Mn0.vYyaeN7cL-qM_NHs9yHd0NzC56D_VyuhWE63ekOzvuQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});