import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const AuthDiagnostic = () => {
  const [status, setStatus] = useState<string>('Checking...');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const runDiagnostics = async () => {
      const newErrors: string[] = [];
      
      try {
        // Test 1: Check Supabase URL and Key
        setStatus('Testing Supabase connection...');
        
        if (!supabase) {
          newErrors.push('Supabase client not initialized');
          setErrors(newErrors);
          return;
        }

        // Test 2: Check auth session
        setStatus('Checking auth session...');
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          newErrors.push(`Session error: ${sessionError.message}`);
        } else {
          console.log('Session check successful:', sessionData);
        }

        // Test 3: Check database connection
        setStatus('Testing database connection...');
        const { data: dbData, error: dbError } = await supabase
          .from('profiles')
          .select('count')
          .limit(1);
        
        if (dbError) {
          newErrors.push(`Database error: ${dbError.message}`);
        } else {
          console.log('Database connection successful');
        }

        // Test 4: Test signup with dummy data
        setStatus('Testing signup functionality...');
        const testEmail = `test-${Date.now()}@example.com`;
        const { data: signupData, error: signupError } = await supabase.auth.signUp({
          email: testEmail,
          password: 'testpassword123',
          options: {
            data: {
              display_name: 'Test User'
            }
          }
        });

        if (signupError) {
          newErrors.push(`Signup error: ${signupError.message}`);
        } else {
          console.log('Signup test successful:', signupData);
          
          // Clean up test user if created
          if (signupData.user) {
            await supabase.auth.signOut();
          }
        }

        setStatus(newErrors.length === 0 ? 'All tests passed!' : 'Some tests failed');
        setErrors(newErrors);

      } catch (err) {
        newErrors.push(`Unexpected error: ${err}`);
        setErrors(newErrors);
        setStatus('Tests failed with exception');
      }
    };

    runDiagnostics();
  }, []);

  return (
    <div className="p-4 bg-card border border-border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Auth Diagnostic</h3>
      <p className="mb-2">Status: {status}</p>
      {errors.length > 0 && (
        <div>
          <h4 className="font-medium text-destructive mb-1">Errors:</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AuthDiagnostic;