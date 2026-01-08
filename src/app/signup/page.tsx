
'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import type { View } from '@/app/page';
import PasswordStrengthChecker from '@/components/password-strength-checker';

const signUpSchema = z
  .object({
    email: z.string().min(1, 'Email is required.').email('Invalid email address.'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long.')
      .refine(
        (password) => /[A-Z]/.test(password),
        'Password must contain at least one uppercase letter.'
      )
      .refine(
        (password) => /[a-z]/.test(password),
        'Password must contain at least one lowercase letter.'
      )
      .refine(
        (password) => /[0-9]/.test(password),
        'Password must contain at least one number.'
      )
      .refine(
        (password) => /[^A-Za-z0-9]/.test(password),
        'Password must contain at least one special character.'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

type SignUpPageProps = {
  navigate: (view: View) => void;
};

export default function SignUpPage({ navigate }: SignUpPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { auth } = useFirebase();

  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSignUp = async (values: SignUpFormValues) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await sendEmailVerification(userCredential.user);
      
      toast({
        title: 'One last step...',
        description: `We've sent a verification link to ${values.email}. Please check your inbox.`,
      });
      // The main page component will now automatically handle navigation to the verify-email page.
    } catch (error: any) {
      let description = 'An unexpected error occurred. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        description = 'This email is already in use. Please try another email or sign in.';
      }
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-950/50 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Network className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="font-headline text-2xl">
            Create an Account
          </CardTitle>
          <CardDescription>
            Join Maatram ConnectX to network with professionals.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FormProvider {...signUpForm}>
            <Form {...signUpForm}>
              <form
                onSubmit={signUpForm.handleSubmit(handleSignUp)}
                className="space-y-4"
              >
                <FormField
                  control={signUpForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signUpForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordStrengthChecker {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signUpForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Re-enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Create Account
                </Button>
              </form>
            </Form>
          </FormProvider>
        </CardContent>

        <CardFooter className="justify-center text-sm py-6">
          <button onClick={() => navigate('login')}>
            <span className="text-muted-foreground">
              Already have an account?
            </span>
            <span className="font-medium text-primary hover:underline ml-1">
              Sign In
            </span>
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}
