
"use client";

import Image from "next/image";
import { useState } from "react";
import { MOCK_USERS, CURRENT_USER } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Check, Plus, Edit, MessageSquare } from "lucide-react";
import AiProfileCompletion from "@/components/ai/profile-completion";
import placeholderData from '@/lib/placeholder-images.json';
import { useToast } from "@/hooks/use-toast";
import type { View } from '@/app/page';

const getPlaceholderImageUrl = (id: string) => {
    const image = placeholderData.placeholderImages.find(img => img.id === id);
    return image ? image.imageUrl : `https://picsum.photos/seed/default/600/400`;
}

type ProfilePageProps = {
  id: string;
  navigate: (view: View, id?: string | null) => void;
};

export default function ProfilePage({ id, navigate }: ProfilePageProps) {
  const user = MOCK_USERS.find(u => u.id === id);
  const [requested, setRequested] = useState(false);
  const { toast } = useToast();

  if (!user) {
    return (
        <div className="text-center py-16">
            <p className="text-2xl font-bold">User not found</p>
            <p className="text-muted-foreground">The profile you are looking for does not exist.</p>
            <Button onClick={() => navigate('feed')} className="mt-4">Go to Feed</Button>
        </div>
    );
  }

  const isCurrentUser = user.id === CURRENT_USER.id;

  const handleConnect = () => {
    setRequested(true);
    toast({
      title: "Connection Request Sent",
      description: `Your request to connect with ${user.name} has been sent.`,
    });
  };

  const handleAction = (action: string) => {
    toast({
      title: "Feature Coming Soon!",
      description: `The "${action}" feature is currently under development.`,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <div className="relative h-32 md:h-48 rounded-t-lg overflow-hidden">
          <Image 
            src={getPlaceholderImageUrl('profile-cover-1')}
            alt="Profile cover image"
            fill
            className="object-cover"
            data-ai-hint="professional background abstract"
          />
        </div>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between relative -mt-20 sm:-mt-24">
            <div className="flex items-end gap-4">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-background p-1.5 inline-block shrink-0">
                  <Image
                      src={user.avatarUrl}
                      alt={user.name}
                      width={128}
                      height={128}
                      className="rounded-full"
                      data-ai-hint="profile avatar"
                  />
                </div>
                <div className="pb-4">
                    <h1 className="text-xl sm:text-2xl font-bold font-headline">{user.name}</h1>
                    <p className="text-base sm:text-lg text-foreground">{user.headline}</p>
                    <p className="text-sm text-muted-foreground mt-1">{user.location}</p>
                </div>
            </div>
             <div className="flex justify-start gap-2 mt-4 sm:mt-0 sm:pb-4">
                {isCurrentUser ? (
                    <Button variant="outline" onClick={() => handleAction('Edit Profile')}><Edit className="mr-2 h-4 w-4"/>Edit Profile</Button>
                ) : (
                    <>
                        <Button onClick={handleConnect} disabled={requested}>
                            {requested ? (
                            <>
                                <Check className="mr-2 h-4 w-4" />
                                Pending
                            </>
                            ) : (
                            <>
                                <Plus className="mr-2 h-4 w-4" />
                                Connect
                            </>
                            )}
                        </Button>
                        <Button variant="outline" onClick={() => handleAction('Message')}>
                            <MessageSquare className="mr-2 h-4 w-4"/>
                            Message
                        </Button>
                    </>
                )}
              </div>
          </div>
           <p className="text-sm text-primary mt-4 font-semibold">{user.connections} connections</p>
        </CardContent>
      </Card>
      
      {isCurrentUser && <AiProfileCompletion />}

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm sm:text-base text-foreground/90 whitespace-pre-wrap">{user.about}</p>
        </CardContent>
      </Card>

      {user.experience.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center gap-2">
                <Briefcase className="w-6 h-6"/>
                Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {user.experience.map((exp, index) => (
              <div key={index} className="flex gap-4">
                <Image
                  src={exp.companyLogoUrl}
                  alt={`${exp.company} logo`}
                  width={48}
                  height={48}
                  className="rounded-lg border p-1 h-12 w-12 shrink-0"
                  data-ai-hint="company logo"
                />
                <div>
                  <h3 className="font-semibold text-base sm:text-lg">{exp.title}</h3>
                  <p className="text-sm">{exp.company}</p>
                  <p className="text-xs text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
                  <p className="text-sm mt-2 whitespace-pre-wrap">{exp.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Skills</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {user.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-sm">{skill}</Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
