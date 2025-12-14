import Image from "next/image";
import { CURRENT_USER } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Link, Mail, Plus } from "lucide-react";
import AiProfileCompletion from "@/components/ai/profile-completion";
import placeholderData from '@/lib/placeholder-images.json';

const getPlaceholderImageUrl = (id: string) => {
    const image = placeholderData.placeholderImages.find(img => img.id === id);
    return image ? image.imageUrl : `https://picsum.photos/seed/default/600/400`;
}

export default function ProfilePage() {
  const user = CURRENT_USER;

  return (
    <div className="space-y-8">
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
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between relative -mt-20 sm:-mt-16">
            <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full bg-background p-1.5 inline-block">
                <Image
                    src={user.avatarUrl}
                    alt={user.name}
                    width={128}
                    height={128}
                    className="rounded-full"
                    data-ai-hint="profile avatar"
                />
                </div>
            </div>
            <div className="flex justify-start sm:justify-end gap-2 mt-4 sm:mt-0">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Connect
                </Button>
                <Button variant="outline">Message</Button>
            </div>
          </div>
          <div className="pt-4">
            <h1 className="text-2xl font-bold font-headline">{user.name}</h1>
            <p className="text-lg text-foreground">{user.headline}</p>
            <p className="text-sm text-muted-foreground mt-1">{user.location}</p>
            <p className="text-sm text-primary mt-1 font-semibold">{user.connections} connections</p>
          </div>
        </CardContent>
      </Card>
      
      <AiProfileCompletion />

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">About</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-foreground/90">{user.about}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Experience</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {user.experience.map((exp, index) => (
            <div key={index} className="flex gap-4">
              <Image
                src={exp.companyLogoUrl}
                alt={`${exp.company} logo`}
                width={48}
                height={48}
                className="rounded-lg border p-1 h-12 w-12"
                data-ai-hint="company logo"
              />
              <div>
                <h3 className="font-semibold">{exp.title}</h3>
                <p className="text-sm">{exp.company}</p>
                <p className="text-xs text-muted-foreground">{exp.startDate} - {exp.endDate}</p>
                <p className="text-sm mt-2">{exp.description}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Skills</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {user.skills.map((skill) => (
            <Badge key={skill} variant="secondary">{skill}</Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
