import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SimpleAuthTest = () => {
  const [email, setEmail] = useState('user@gmail.com');
  const [password, setPassword] = useState('testpassword123');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testSignup = async () => {
    setLoading(true);
    setResult('Testing signup...');
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) {
        setResult(`Signup failed: ${error.message}`);
        console.error('Signup error:', error);
      } else {
        setResult(`Signup success! User ID: ${data.user?.id}`);
        console.log('Signup success:', data);
      }
    } catch (err) {
      setResult(`Signup exception: ${err}`);
      console.error('Signup exception:', err);
    }
    
    setLoading(false);
  };

  const testSignin = async () => {
    setLoading(true);
    setResult('Testing signin...');
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        setResult(`Signin failed: ${error.message}`);
        console.error('Signin error:', error);
      } else {
        setResult(`Signin success! User ID: ${data.user?.id}`);
        console.log('Signin success:', data);
      }
    } catch (err) {
      setResult(`Signin exception: ${err}`);
      console.error('Signin exception:', err);
    }
    
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Simple Auth Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex gap-2">
          <Button onClick={testSignup} disabled={loading}>
            Test Signup
          </Button>
          <Button onClick={testSignin} disabled={loading}>
            Test Signin
          </Button>
        </div>
        {result && (
          <div className="p-2 bg-muted rounded text-sm">
            {result}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SimpleAuthTest;