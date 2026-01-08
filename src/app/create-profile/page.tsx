
'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Loader2, Network } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc } from 'firebase/firestore';

const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  headline: z.string().min(1, 'Headline is required.'),
  location: z.string().min(1, 'Location is required.'),
  about: z.string().min(10, 'Tell us a bit more about yourself (min. 10 characters).'),
  major: z.string().optional(),
  graduationYear: z.coerce.number().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

type CreateProfilePageProps = {
  onProfileCreated: () => void;
};

export default function CreateProfilePage({ onProfileCreated }: CreateProfilePageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      headline: '',
      location: '',
      about: '',
      major: '',
      graduationYear: '' as any, // Initialize with empty string to avoid uncontrolled error
    },
  });

  const handleCreateProfile = async (values: ProfileFormValues) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'You must be signed in to create a profile.',
      });
      return;
    }
    setIsLoading(true);
    try {
      const userProfileRef = doc(firestore, 'userProfiles', user.uid);
      await setDoc(userProfileRef, {
        id: user.uid,
        email: user.email,
        firstName: values.firstName,
        lastName: values.lastName,
        headline: values.headline,
        location: values.location,
        about: values.about,
        major: values.major,
        graduationYear: values.graduationYear || null, // Store as null if empty
        profilePictureUrl: user.photoURL || `https://picsum.photos/seed/${user.uid}/200/200`,
        skills: [],
        alumni: false, // Default value
        isMentor: false, // Default value
      }, { merge: true });

      toast({
        title: 'Profile Created!',
        description: "Welcome to Maatram ConnectX! Let's get started.",
      });
      onProfileCreated();
    } catch (error) {
      console.error('Error creating profile:', error);
      toast({
        variant: 'destructive',
        title: 'Profile Creation Failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-blue-950/50 p-4">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Network className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="font-headline text-2xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Just a few more details to get you started on Maatram ConnectX.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <FormProvider {...profileForm}>
            <Form {...profileForm}>
              <form
                onSubmit={profileForm.handleSubmit(handleCreateProfile)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={profileForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                 <FormField
                  control={profileForm.control}
                  name="headline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Professional Headline</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Software Engineer at Google" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={profileForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., San Francisco, CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                        control={profileForm.control}
                        name="major"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Major</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g., Computer Science" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={profileForm.control}
                        name="graduationYear"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Graduation Year</FormLabel>
                            <FormControl>
                            <Input type="number" placeholder="e.g., 2024" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <FormField
                  control={profileForm.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little about your professional journey and interests."
                          className="h-24"
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
                  Save and Continue
                </Button>
              </form>
            </Form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
