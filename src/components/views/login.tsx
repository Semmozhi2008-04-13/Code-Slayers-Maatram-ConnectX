'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, Network } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirebase } from '@/firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import type { View } from '@/app/page';

const SocialButton = ({
  provider,
  icon,
  onClick,
  isLoading,
}: {
  provider: string;
  icon: React.ReactNode;
  onClick: () => void;
  isLoading: boolean;
}) => {
  return (
    <Button variant="outline" className="w-full" onClick={onClick} disabled={isLoading}>
      {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : icon}
      Sign in with {provider}
    </Button>
  );
};

const LinkedInIcon = () => (
  <svg
    className="mr-2 h-4 w-4"
    aria-hidden="true"
    focusable="false"
    data-prefix="fab"
    data-icon="linkedin-in"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M100.3 448H7.4V148.9h92.9V448zM53.8 108.1C24.1 108.1 0 83.5 0 53.8S24.1 0 53.8 0s53.8 24.1 53.8 53.8-24.1 54.3-53.8 54.3zM448 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"
    ></path>
  </svg>
);

type LoginPageProps = {
  navigate: (view: View) => void;
};


export default function LoginPage({ navigate }: LoginPageProps) {
  const [isSocialLoading, setIsSocialLoading] = useState<false | 'LinkedIn'>(false);
  const { toast } = useToast();
  const { auth } = useFirebase();

  const handleSocialLogin = (provider: 'LinkedIn') => {
     if (provider === 'LinkedIn') {
        toast({
            title: 'Coming Soon!',
            description: 'LinkedIn sign-in is under development.',
        });
        return;
     }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-950/50 p-4">
      <Card className="w-full max-w-md mx-auto overflow-hidden">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Network className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="font-headline text-2xl">Welcome</CardTitle>
          <CardDescription>
            Sign in to continue to Maatram ConnectX
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-2">
          <div className="grid grid-cols-1 gap-4">
            <SocialButton
              provider="LinkedIn"
              icon={<LinkedInIcon />}
              onClick={() => handleSocialLogin('LinkedIn')}
              isLoading={isSocialLoading === 'LinkedIn'}
            />
          </div>
        </CardContent>

        <CardFooter className="justify-center text-sm py-6">
          <button onClick={() => navigate('signup')}>
            <span className="text-muted-foreground">
              Don't have an account?
            </span>
            <span className="font-medium text-primary hover:underline ml-1">
              Sign Up
            </span>
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
