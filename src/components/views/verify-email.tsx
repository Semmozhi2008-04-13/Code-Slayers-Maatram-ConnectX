
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFirebase } from '@/firebase';
import { sendEmailVerification } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MailCheck } from 'lucide-react';

export default function VerifyEmail() {
  const { user, auth } = useFirebase();
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const handleResendVerification = async () => {
    if (!user) return;
    setIsSending(true);

    try {
       const actionCodeSettings = {
        url: `${window.location.origin}/?email=${user.email}`,
        handleCodeInApp: true,
      };
      await sendEmailVerification(user, actionCodeSettings);
      toast({
        title: 'Verification Email Sent',
        description: 'A new verification link has been sent to your email address.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to send verification email. Please try again.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-950/50 p-4">
      <Card className="w-full max-w-md mx-auto text-center">
        <CardHeader>
          <div className="flex justify-center items-center mb-4">
            <MailCheck className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="font-headline text-2xl">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a verification link to{' '}
            <strong className="text-foreground">{user?.email}</strong>. Please check your inbox
            (and spam folder) to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Once your email is verified, you will be automatically redirected. If you don't see the email, you can resend it.
          </p>
          <Button onClick={handleResendVerification} disabled={isSending} className="w-full">
            {isSending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Resend Verification Email
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
