import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useToast } from '@/hooks/use-toast';

const AuthPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ email: '', password: '', displayName: '' });

  // Validate email domain
  const isValidEmailDomain = (email: string) => {
    const blockedDomains = ['example.com', 'test.com', 'fake.com', 'dummy.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    return domain && !blockedDomains.includes(domain);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!isValidEmailDomain(loginForm.email)) {
      toast({
        title: "Invalid Email Domain",
        description: "Please use a real email domain like gmail.com or outlook.com",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await signIn(loginForm.email, loginForm.password);
      
      if (error) {
        console.error('Login error:', error);
        toast({
          title: "Login Failed",
          description: error.message || 'An error occurred during login',
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "Successfully logged in.",
        });
      }
    } catch (err) {
      console.error('Login exception:', err);
      toast({
        title: "Login Failed", 
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!isValidEmailDomain(signupForm.email)) {
      toast({
        title: "Invalid Email Domain",
        description: "Please use a real email domain like gmail.com or outlook.com",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await signUp(signupForm.email, signupForm.password, signupForm.displayName);
      
      if (error) {
        console.error('Signup error:', error);
        toast({
          title: "Signup Failed",
          description: error.message || 'An error occurred during signup',
          variant: "destructive",
        });
      } else {
        toast({
          title: "Account Created!",
          description: "Please check your email and click the confirmation link before signing in.",
        });
      }
    } catch (err) {
      console.error('Signup exception:', err);
      toast({
        title: "Signup Failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              left: '50%',
              top: '50%',
              width: 2 + Math.random() * 2 + 'px',
              height: 2 + Math.random() * 2 + 'px',
            }}
            animate={{
              x: [
                Math.cos((i * 45) * (Math.PI / 180)) * (150 + i * 25),
                Math.cos((i * 45 + 360) * (Math.PI / 180)) * (150 + i * 25)
              ],
              y: [
                Math.sin((i * 45) * (Math.PI / 180)) * (150 + i * 25),
                Math.sin((i * 45 + 360) * (Math.PI / 180)) * (150 + i * 25)
              ],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className={`absolute rounded-full ${
              i % 3 === 0 ? 'bg-primary' :
              i % 3 === 1 ? 'bg-secondary' : 'bg-accent'
            } opacity-40`}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative z-10">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-foreground hover:bg-muted hover-glow"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <Card className="glass hover-glow bg-card border-border">
            <CardHeader className="text-center">
              <motion.div
                className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4 glow-primary"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <SparklesIcon className="w-8 h-8 text-primary-foreground" />
              </motion.div>
              <CardTitle className="text-2xl font-bold gradient-text">
                Welcome to TenderAI
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Your AI-powered tender discovery platform
                <br />
                <span className="text-xs text-orange-500">Note: Please use a real email domain (gmail.com, outlook.com, etc.)</span>
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-muted">
                  <TabsTrigger value="login" className="text-foreground">Login</TabsTrigger>
                  <TabsTrigger value="signup" className="text-foreground">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <motion.form
                    onSubmit={handleLogin}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-input border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-foreground">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                        className="bg-input border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/80 glow-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </motion.form>
                </TabsContent>

                <TabsContent value="signup">
                  <motion.form
                    onSubmit={handleSignup}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="displayName" className="text-foreground">Display Name</Label>
                      <Input
                        id="displayName"
                        type="text"
                        value={signupForm.displayName}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, displayName: e.target.value }))}
                        className="bg-input border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-email" className="text-foreground">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                        className="bg-input border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password" className="text-foreground">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={signupForm.password}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, password: e.target.value }))}
                        className="bg-input border-border text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-ring"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/80 glow-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Creating account...' : 'Create Account'}
                    </Button>
                  </motion.form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
