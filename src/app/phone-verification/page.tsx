
'use client';

import { useState, useEffect } from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirebase, useUser } from '@/firebase';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  linkWithCredential,
  type ConfirmationResult,
} from 'firebase/auth';

const phoneSchema = z.object({
  countryCode: z.string(),
  phoneNumber: z.string().min(10, 'Please enter a valid 10-digit phone number.'),
});
const otpSchema = z.object({
  otp: z.string().min(6, 'OTP must be 6 digits.').max(6, 'OTP must be 6 digits.'),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

type PhoneVerificationPageProps = {
  onVerificationSuccess: () => void;
};

const countryCodes = [
    { name: "India", code: "IN", dial_code: "+91" },
    { name: "United States", code: "US", dial_code: "+1" },
    { name: "United Kingdom", code: "GB", dial_code: "+44" },
    { name: "Australia", code: "AU", dial_code: "+61" },
    { name: "Canada", code: "CA", dial_code: "+1" },
];


export default function PhoneVerificationPage({ onVerificationSuccess }: PhoneVerificationPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const { toast } = useToast();
  const { auth } = useFirebase();
  const { user } = useUser();
  
  // A div with id="recaptcha-container" is needed for RecaptchaVerifier
  useEffect(() => {
    if (step === 'phone' && auth && !window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      });
    }
  }, [auth, step]);

  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    mode: 'onBlur',
    defaultValues: {
        countryCode: '+91',
        phoneNumber: ''
    }
  });

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    mode: 'onBlur',
  });

  const handleSendOtp = async (values: PhoneFormValues) => {
    setIsLoading(true);
    try {
        const verifier = window.recaptchaVerifier;
        const fullPhoneNumber = `${values.countryCode}${values.phoneNumber}`;
        const result = await signInWithPhoneNumber(auth, fullPhoneNumber, verifier);
        setConfirmationResult(result);
        setStep('otp');
        toast({
            title: 'OTP Sent',
            description: 'An OTP has been sent to your phone number.',
        });
    } catch (error) {
        console.error('Error sending OTP:', error);
        toast({
            variant: 'destructive',
            title: 'Failed to Send OTP',
            description: 'Please check the phone number and try again.',
        });
    } finally {
        setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (values: OtpFormValues) => {
    if (!confirmationResult || !user) return;
    setIsLoading(true);
    try {
        const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, values.otp);
        await linkWithCredential(user, credential);

        toast({
            title: 'Phone Verified!',
            description: 'Your phone number has been successfully verified.',
        });
        onVerificationSuccess();
    } catch (error) {
        console.error('Error verifying OTP:', error);
        toast({
            variant: 'destructive',
            title: 'Invalid OTP',
            description: 'The OTP you entered is incorrect. Please try again.',
        });
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-950/50 p-4">
       <div id="recaptcha-container"></div>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Phone className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="font-headline text-2xl">
            Verify Your Phone Number
          </CardTitle>
          <CardDescription>
            We need to verify your phone number to secure your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {step === 'phone' ? (
            <FormProvider {...phoneForm}>
              <Form {...phoneForm}>
                <form
                  onSubmit={phoneForm.handleSubmit(handleSendOtp)}
                  className="space-y-4"
                >
                    <div className="grid grid-cols-3 gap-2">
                        <FormField
                            control={phoneForm.control}
                            name="countryCode"
                            render={({ field }) => (
                                <FormItem className="col-span-1">
                                    <FormLabel>Country</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Country Code" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {countryCodes.map(country => (
                                             <SelectItem key={country.code} value={country.dial_code}>
                                                {country.code} ({country.dial_code})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={phoneForm.control}
                            name="phoneNumber"
                            render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                <Input placeholder="123 456 7890" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      'Send OTP'
                    )}
                  </Button>
                </form>
              </Form>
            </FormProvider>
          ) : (
             <FormProvider {...otpForm}>
              <Form {...otpForm}>
                <form
                  onSubmit={otpForm.handleSubmit(handleVerifyOtp)}
                  className="space-y-4"
                >
                  <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter OTP</FormLabel>
                        <FormControl>
                          <Input placeholder="123456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      'Verify OTP'
                    )}
                  </Button>
                </form>
              </Form>
            </FormProvider>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
