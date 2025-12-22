'use client';

import { useState } from 'react';
import { useUser, useAuth } from '@/firebase';
import { sendEmailVerification, signOut } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MailCheck, MailWarning } from 'lucide-react';
import type { View } from '@/app/page';

type EmailVerificationPageProps = {
  navigate: (view: View) => void;
};

export default function EmailVerificationPage({ navigate }: EmailVerificationPageProps) {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleResendEmail = async () => {
    if (!user) return;
    setIsSending(true);
    try {
      await sendEmailVerification(user);
      toast({
        title: 'Verification Email Sent',
        description: 'A new verification link has been sent to your email address.',
      });
    } catch (error) {
      console.error('Error resending verification email:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send verification email. Please try again later.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleCheckVerification = async () => {
    if (!user) return;
    setIsChecking(true);
    try {
      await user.reload();
      if (user.emailVerified) {
        toast({
          title: 'Email Verified!',
          description: 'Thank you for verifying your email. You can now proceed.',
        });
        // The main page will handle navigation automatically on the next state check.
      } else {
        toast({
          variant: 'destructive',
          title: 'Not Verified Yet',
          description: 'Your email is not verified yet. Please check your inbox (and spam folder).',
        });
      }
    } catch (error) {
        console.error('Error checking verification status:', error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not check verification status. Please try again.',
        });
    } finally {
      setIsChecking(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-950/50 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <MailWarning className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-2xl">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a verification link to{' '}
            <strong className="text-foreground">{user?.email}</strong>. Please
            check your inbox to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <Button onClick={handleCheckVerification} className="w-full" disabled={isChecking}>
                {isChecking ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <MailCheck className="mr-2 h-4 w-4"/>}
                I've Verified My Email
            </Button>
            <p className="text-center text-sm text-muted-foreground">
                Didn't receive the email?
            </p>
            <Button
                variant="outline"
                className="w-full"
                onClick={handleResendEmail}
                disabled={isSending}
            >
                {isSending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Resend Verification Link
            </Button>
             <Button
                variant="link"
                className="w-full text-muted-foreground"
                onClick={handleLogout}
              >
                Sign out and use a different account
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
