import { supabase } from '@/integrations/supabase/client';

// Test Supabase connection
export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection error:', error);
      return { success: false, error };
    }
    
    console.log('Supabase connection successful');
    return { success: true, data };
  } catch (err) {
    console.error('Supabase connection exception:', err);
    return { success: false, error: err };
  }
};

// Test auth functionality
export const testSupabaseAuth = async () => {
  try {
    console.log('Testing Supabase auth...');
    
    // Get current session
    const { data: session, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Supabase auth error:', error);
      return { success: false, error };
    }
    
    console.log('Supabase auth test successful, session:', session);
    return { success: true, session };
  } catch (err) {
    console.error('Supabase auth exception:', err);
    return { success: false, error: err };
  }
};