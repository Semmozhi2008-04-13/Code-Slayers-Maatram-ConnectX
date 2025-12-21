
"use client";

import { useState } from "react";
import Image from "next/image";
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
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Invalid email address.").min(1, "Email is required."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email address.").min(1, "Email is required."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    graduationYear: z.string().length(4, "Must be a 4-digit year.").regex(/^\d{4}$/, "Invalid year format."),
    department: z.string().min(1, "Department is required."),
    maatramId: z.string().min(1, "Maatram ID is required."),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

type LoginPageProps = {
  onLoginSuccess: () => void;
};

const SocialButton = ({ provider, icon, comingSoon }: { provider: string; icon: React.ReactNode; comingSoon?: boolean }) => {
    const { toast } = useToast();
    const handleClick = () => {
        if (comingSoon) {
            toast({
                title: "Coming Soon!",
                description: `Login with ${provider} is not yet available.`,
            });
        }
    };
    return (
        <Button variant="outline" className="w-full" onClick={handleClick} disabled={comingSoon}>
            {icon}
            Sign in with {provider}
        </Button>
    );
};


const GoogleIcon = () => <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 172.4 60.3l-66.8 64.2c-20-17.7-48.8-30.8-79.6-30.8-62.3 0-113.6 51.3-113.6 114.3s51.3 114.3 113.6 114.3c71.4 0 98.1-49.3 102.3-73.4H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>;
const LinkedInIcon = () => <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M100.3 448H7.4V148.9h92.9V448zM53.8 108.1C24.1 108.1 0 83.5 0 53.8S24.1 0 53.8 0s53.8 24.1 53.8 53.8-24.1 54.3-53.8 54.3zM448 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z"></path></svg>;


export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [formType, setFormType] = useState<"login" | "signup">("login");
  const [signupStep, setSignupStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const handleLogin = (values: LoginFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({ title: "Login Successful", description: "Welcome back!" });
      onLoginSuccess();
    }, 1500);
  };
  
  const handleSignup = (values: SignupFormValues) => {
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        toast({ title: "Sign Up Successful", description: "Welcome to Maatram ConnectX!" });
        onLoginSuccess();
    }, 1500);
  }

  const handleNextStep = async () => {
    const isValid = await signupForm.trigger(["name", "email", "password"]);
    if (isValid) {
      setSignupStep(2);
    }
  };

  const isLogin = formType === 'login';
  const progress = isLogin ? 0 : (signupStep - 1) / 2 * 100;
  
  const formVariants = {
    hidden: { opacity: 0, x: isLogin ? -100 : 100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isLogin ? 100 : -100 },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-950/50 p-4">
       <Card className="w-full max-w-md mx-auto overflow-hidden">
        <div className="h-2.5">
            <Progress value={progress} className="w-full h-full rounded-none bg-primary/20" indicatorClassName="bg-primary transition-all duration-500 ease-in-out" />
        </div>
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                <Image src="/logo.png" alt="Maatram ConnectX Logo" width={40} height={40} />
            </div>
            <CardTitle className="font-headline text-2xl">
                {isLogin ? "Welcome Back" : "Create Your Account"}
            </CardTitle>
            <CardDescription>
                {isLogin ? "Sign in to continue to Maatram ConnectX" : "Join the network and connect with peers"}
            </CardDescription>
        </CardHeader>
        
        <CardContent className="px-6 pb-2">
            <div className="relative h-[480px]">
                <AnimatePresence initial={false} mode="wait">
                    {isLogin ? (
                    <motion.div
                        key="login"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="absolute w-full"
                    >
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
                                disabled={!loginForm.formState.isValid || isLoading}
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Sign In
                            </Button>
                            </form>
                        </Form>
                         </FormProvider>
                    </motion.div>
                ) : (
                    <motion.div
                        key="signup"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                        className="absolute w-full"
                    >
                        <FormProvider {...signupForm}>
                        <Form {...signupForm}>
                           <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                                {signupStep === 1 && (
                                     <>
                                        <FormField name="name" control={signupForm.control} render={({ field }) => (
                                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Your Name" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField name="email" control={signupForm.control} render={({ field }) => (
                                            <FormItem><FormLabel>Email</FormLabel><FormControl><Input placeholder="name@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField name="password" control={signupForm.control} render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                <div className="relative">
                                                    <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground">
                                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                                    </button>
                                                </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <Button type="button" onClick={handleNextStep} className="w-full">
                                            Continue
                                        </Button>
                                    </>
                                )}
                                {signupStep === 2 && (
                                    <>
                                        <FormField name="graduationYear" control={signupForm.control} render={({ field }) => (
                                            <FormItem><FormLabel>Graduation Year</FormLabel><FormControl><Input placeholder="YYYY" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField name="department" control={signupForm.control} render={({ field }) => (
                                            <FormItem><FormLabel>Department</FormLabel><FormControl><Input placeholder="e.g., Computer Science" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField name="maatramId" control={signupForm.control} render={({ field }) => (
                                            <FormItem><FormLabel>Maatram ID</FormLabel><FormControl><Input placeholder="Your unique Maatram ID" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <div className="flex gap-2">
                                            <Button type="button" variant="outline" onClick={() => setSignupStep(1)} className="w-full">Back</Button>
                                            <Button type="submit" className="w-full" disabled={!signupForm.formState.isValid || isLoading}>
                                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                                Sign Up
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </form>
                        </Form>
                        </FormProvider>
                    </motion.div>
                 )}
                 </AnimatePresence>
            </div>
             <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <SocialButton provider="Google" icon={<GoogleIcon/>} comingSoon={true} />
                <SocialButton provider="LinkedIn" icon={<LinkedInIcon />} comingSoon={true} />
            </div>
        </CardContent>

        <CardFooter className="justify-center text-sm py-6">
            <button onClick={() => setFormType(isLogin ? "signup" : "login")}>
                <span className="text-muted-foreground">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                </span>
                <span className="font-medium text-primary hover:underline ml-1">
                    {isLogin ? "Sign Up" : "Sign In"}
                </span>
            </button>
        </CardFooter>
      </Card>
    </div>
  );
}

// Add this to your globals.css or a relevant CSS file if it's not already there for the Progress component
const progressIndicator = `
@keyframes indeterminate-progress {
  0% { transform: translateX(0) scaleX(0.1); }
  50% { transform: translateX(50%) scaleX(0.75); }
  100% { transform: translateX(100%) scaleX(0.1); }
}
.animate-indeterminate {
  animation: indeterminate-progress 1.5s infinite ease-in-out;
}
`;
