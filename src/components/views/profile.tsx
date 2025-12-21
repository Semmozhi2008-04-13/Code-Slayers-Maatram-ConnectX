
"use client";

import Image from "next/image";
import { useState } from "react";
import { MOCK_USERS, CURRENT_USER } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Check, Plus, Edit, MessageSquare, Award } from "lucide-react";
import AiProfileCompletion from "@/components/ai/profile-completion";
import placeholderData from '@/lib/placeholder-images.json';
import { useToast } from "@/hooks/use-toast";
import type { View } from '@/app/page';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const getPlaceholderImageUrl = (id: string) => {
    const image = placeholderData.placeholderImages.find(img => img.id === id);
    return image ? image.imageUrl : `https://picsum.photos/seed/default/600/400`;
}

type ProfilePageProps = {
  id: string;
  navigate: (view: View, id?: string | null) => void;
};

type Certification = {
  name: string;
  issuingOrganization: string;
  credentialId: string;
}

export default function ProfilePage({ id, navigate }: ProfilePageProps) {
  const user = MOCK_USERS.find(u => u.id === id);
  const [requested, setRequested] = useState(false);
  const { toast } = useToast();
  
  // State for editable profile fields
  const [headline, setHeadline] = useState(user?.headline || '');
  const [location, setLocation] = useState(user?.location || '');
  const [about, setAbout] = useState(user?.about || '');
  const [certifications, setCertifications] = useState<Certification[]>([]);

  // State for certification dialog
  const [certName, setCertName] = useState('');
  const [certOrg, setCertOrg] = useState('');
  const [certId, setCertId] = useState('');
  const [isCertDialogOpen, setIsCertDialogOpen] = useState(false);


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

  const handleSaveProfile = () => {
    // In a real app, you'd call an API here.
    // For now, we just update the state and show a toast.
    CURRENT_USER.headline = headline;
    CURRENT_USER.location = location;
    CURRENT_USER.about = about;
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleAddCertification = () => {
    if (certName && certOrg) {
      setCertifications(prev => [...prev, { name: certName, issuingOrganization: certOrg, credentialId: certId }]);
      setCertName('');
      setCertOrg('');
      setCertId('');
      setIsCertDialogOpen(false);
      toast({
        title: "Certification Added",
        description: `${certName} has been added to your profile.`,
      });
    }
  };
  
  const handleMessage = () => {
     toast({
      title: "Feature Coming Soon!",
      description: `The "Message" feature is currently under development.`,
    });
  }

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
                    <p className="text-base sm:text-lg text-foreground">{headline}</p>
                    <p className="text-sm text-muted-foreground mt-1">{location}</p>
                </div>
            </div>
             <div className="flex justify-start gap-2 mt-4 sm:mt-0 sm:pb-4">
                {isCurrentUser ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline"><Edit className="mr-2 h-4 w-4"/>Edit Profile</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="headline" className="text-right">Headline</Label>
                          <Input id="headline" value={headline} onChange={(e) => setHeadline(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="location" className="text-right">Location</Label>
                          <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label htmlFor="about" className="text-right mt-2">About</Label>
                          <Textarea id="about" value={about} onChange={(e) => setAbout(e.target.value)} className="col-span-3 h-32" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleSaveProfile}>Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
                        <Button variant="outline" onClick={handleMessage}>
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
          <p className="text-sm sm:text-base text-foreground/90 whitespace-pre-wrap">{about}</p>
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

      {(isCurrentUser || certifications.length > 0) && (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-headline text-xl flex items-center gap-2">
                  <Award className="w-6 h-6"/>
                  Licenses & Certifications
              </CardTitle>
              {isCurrentUser && (
                <Dialog open={isCertDialogOpen} onOpenChange={setIsCertDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon"><Plus className="h-4 w-4"/></Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Certification</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="cert-name" className="text-right">Name</Label>
                        <Input id="cert-name" value={certName} onChange={(e) => setCertName(e.target.value)} className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="cert-org" className="text-right">Issuing Org</Label>
                        <Input id="cert-org" value={certOrg} onChange={(e) => setCertOrg(e.target.value)} className="col-span-3" />
                      </div>
                       <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="cert-id" className="text-right">Credential ID</Label>
                        <Input id="cert-id" value={certId} onChange={(e) => setCertId(e.target.value)} className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddCertification}>Save</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-muted rounded-lg">
                    <Award className="w-6 h-6 text-muted-foreground"/>
                  </div>
                  <div>
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuingOrganization}</p>
                    {cert.credentialId && <p className="text-xs text-muted-foreground mt-1">Credential ID: {cert.credentialId}</p>}
                  </div>
                </div>
              ))}
               {certifications.length === 0 && isCurrentUser && (
                 <p className="text-sm text-muted-foreground text-center py-4">Showcase your professional accomplishments by adding your licenses and certifications.</p>
               )}
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

    