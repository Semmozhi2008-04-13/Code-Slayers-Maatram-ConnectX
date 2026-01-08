
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser, useFirebase } from '@/firebase';
import { signOut, sendEmailVerification } from 'firebase/auth';
import { Loader2, MailCheck, Network } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function VerifyEmailPage() {
  const { user, isUserLoading } = useUser();
  const { auth } = useFirebase();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [sendTime, setSendTime] = useState(0);

  useEffect(() => {
    // If the user's email becomes verified while they are on this page,
    // they will be automatically redirected by the main page component.
    // We can also set up an interval to periodically check their verification status.
    const interval = setInterval(async () => {
      if (user) {
        await user.reload();
        // The onAuthStateChanged listener in `useUser` will pick up the change
        // and trigger the redirect logic in `Home` component.
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, [user]);

  const handleResendEmail = async () => {
    if (!user) {
      toast({ variant: 'destructive', title: 'You are not logged in.' });
      return;
    }
    
    // Prevent spamming the resend button
    if (Date.now() - sendTime < 60000) {
        toast({ title: 'Please wait', description: 'You can request another email in a minute.' });
        return;
    }

    setIsSending(true);
    try {
      const actionCodeSettings = {
        url: window.location.origin, // Redirects to the homepage
        handleCodeInApp: true,
      };
      await sendEmailVerification(user, actionCodeSettings);
      setSendTime(Date.now());
      toast({
        title: 'Verification Email Sent',
        description: `A new verification link has been sent to ${user.email}.`,
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Failed to Send Email',
        description: error.message || 'An unexpected error occurred.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSignOut = () => {
    signOut(auth);
    // Main page component will handle redirect to login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-950/50 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <MailCheck className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="font-headline text-2xl">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a verification link to{' '}
            <span className="font-semibold text-primary">{user?.email || 'your email'}</span>.
            Please check your inbox (and spam folder) to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-sm text-muted-foreground">
          <p>
            You need to verify your email to access all features of Maatram ConnectX.
          </p>
          <p className="mt-2">
            Once verified, you will be automatically redirected.
          </p>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <Button onClick={handleResendEmail} className="w-full" disabled={isSending || isUserLoading}>
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              'Resend Verification Email'
            )}
          </Button>
          <Button variant="link" onClick={handleSignOut} className="text-muted-foreground">
            Sign out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
