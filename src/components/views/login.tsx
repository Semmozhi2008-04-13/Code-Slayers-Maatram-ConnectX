
"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2, Network } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFirebase } from "@/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import type { View } from '@/app/page';

const loginSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Invalid email address."),
  password: z.string().min(1, "Password is required."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

type LoginPageProps = {
  onLoginSuccess: () => void;
  navigate: (view: View) => void;
};

const SocialButton = ({ provider, icon, onClick }: { provider: string; icon: React.ReactNode; onClick: () => void; }) => {
    return (
        <Button variant="outline" className="w-full" onClick={onClick}>
            {icon}
            Sign in with {provider}
        </Button>
    );
};


const GoogleIcon = () => <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 172.4 60.3l-66.8 64.2c-20-17.7-48.8-30.8-79.6-30.8-62.3 0-113.6 51.3-113.6 114.3s51.3 114.3 113.6 114.3c71.4 0 98.1-49.3 102.3-73.4H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>;
const LinkedInIcon = () => <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M100.3 448H7.4V148.9h92.9V448zM53.8 108.1C24.1 108.1 0 83.5 0 53.8S24.1 0 53.8 0s53.8 24.1 53.8 53.8-24.1 54.3-53.8 54.3zM448 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"></path></svg>;


export default function LoginPage({ onLoginSuccess, navigate }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { auth } = useFirebase();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({ title: "Login Successful", description: "Welcome back!" });
      onLoginSuccess();
    } catch (error: any) {
        let description = "An unexpected error occurred. Please try again.";
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            description = "Invalid email or password. Please try again.";
        }
        toast({
            variant: "destructive",
            title: "Login Failed",
            description: description,
        });
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleSocialLogin = async (provider: 'Google' | 'LinkedIn') => {
    setIsLoading(true);
    toast({
        title: "Signing in...",
        description: `Authenticating with ${provider}.`,
    });
    try {
        const authProvider = new GoogleAuthProvider(); // Only Google is implemented for now
        await signInWithPopup(auth, authProvider);
        toast({
            title: "Login Successful",
            description: `Successfully signed in with ${provider}.`,
        });
        onLoginSuccess();
    } catch (error) {
        console.error(`${provider} sign-in error:`, error);
        toast({
            variant: "destructive",
            title: "Sign-In Failed",
            description: `Could not sign in with ${provider}. Please try again.`,
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-950/50 p-4">
       <Card className="w-full max-w-md mx-auto overflow-hidden">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                <Network className="h-10 w-10 text-primary"/>
            </div>
            <CardTitle className="font-headline text-2xl">
                Welcome Back
            </CardTitle>
            <CardDescription>
                Sign in to continue to Maatram ConnectX
            </CardDescription>
        </CardHeader>
        
        <CardContent className="px-6 pb-2">
            <FormProvider {...loginForm}>
            <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                    control={loginForm.control}
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
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                    <FormItem>
                        <div className="flex items-center justify-between">
                            <FormLabel>Password</FormLabel>
                            <button type="button" onClick={() => toast({ title: "Coming Soon!", description: "Password recovery is on its way."})} className="text-sm font-medium text-primary hover:underline">
                                Forgot Password?
                            </button>
                        </div>
                        <FormControl>
                        <div className="relative">
                            <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            />
                            <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                            >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                            ) : (
                                <Eye className="h-5 w-5" />
                            )}
                            </button>
                        </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                </Button>
                </form>
            </Form>
            </FormProvider>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <SocialButton provider="Google" icon={<GoogleIcon/>} onClick={() => handleSocialLogin('Google')} />
                <SocialButton provider="LinkedIn" icon={<LinkedInIcon />} onClick={() => toast({ title: "Coming Soon!", description: "LinkedIn sign-in is under development."})} />
            </div>
        </CardContent>

        <CardFooter className="justify-center text-sm py-6">
            <button onClick={() => navigate("signup")}>
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
