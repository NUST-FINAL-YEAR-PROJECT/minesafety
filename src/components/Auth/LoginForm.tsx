import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const success = await login(email, password);
    
    if (!success) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const demoAccounts = [
    { email: 'admin@minesafety.com', role: 'Admin', password: 'any password' },
    { email: 'supervisor@minesafety.com', role: 'Supervisor', password: 'any password' },
    { email: 'operator@minesafety.com', role: 'Operator', password: 'any password' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <CardTitle className="text-xl">Mine Safety Management</CardTitle>
            <p className="text-sm text-muted-foreground">Sign in to your account</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="border-destructive/50 bg-destructive/5">
                  <AlertDescription className="text-destructive text-sm">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
            
            <div className="mt-6 pt-4 border-t">
              <p className="text-xs text-muted-foreground mb-3 text-center">Demo Accounts:</p>
              <div className="space-y-2">
                {demoAccounts.map((account) => (
                  <div key={account.email} className="flex justify-between items-center text-xs">
                    <div>
                      <span className="font-medium">{account.role}:</span> {account.email}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 text-xs px-2"
                      onClick={() => {
                        setEmail(account.email);
                        setPassword('demo123');
                      }}
                      disabled={isLoading}
                    >
                      Use
                    </Button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Use any password for demo purposes
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;