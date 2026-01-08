
'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  useCollection,
  useFirestore,
  useUser,
  useMemoFirebase,
} from '@/firebase';
import {
  collection,
  query,
  where,
  or,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import type { Mentorship, User } from '@/lib/types';
import type { View } from '@/app/page';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Handshake, Check, X, Hourglass } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { useToast } from '@/hooks/use-toast';

type MentorshipsPageProps = {
  navigate: (view: View, id?: string | null) => void;
};

// Function to fetch user profiles for mentorships
const fetchMentorshipUsers = async (
  firestore: any,
  mentorships: Mentorship[]
) => {
  const userIds = new Set<string>();
  mentorships.forEach((m) => {
    userIds.add(m.mentorId);
    userIds.add(m.menteeId);
  });

  if (userIds.size === 0) return [];

  const userPromises = Array.from(userIds).map((id) =>
    getDoc(doc(firestore, 'userProfiles', id))
  );
  const userDocs = await Promise.all(userPromises);

  const usersMap = new Map<string, User>();
  userDocs.forEach((doc) => {
    if (doc.exists()) {
      usersMap.set(doc.id, doc.data() as User);
    }
  });

  return mentorships.map((m) => ({
    ...m,
    mentor: usersMap.get(m.mentorId),
    mentee: usersMap.get(m.menteeId),
  }));
};

const MentorshipCard = ({
  mentorship,
  currentUser,
  onAction,
}: {
  mentorship: Mentorship;
  currentUser: User;
  onAction: (id: string, status: 'active' | 'declined') => void;
}) => {
  const isMentor = mentorship.mentorId === currentUser.id;
  const otherUser = isMentor ? mentorship.mentee : mentorship.mentor;
  const { toast } = useToast();

  if (!otherUser) {
    return <Skeleton className="h-24 w-full" />;
  }

  const handleAction = (status: 'active' | 'declined') => {
    onAction(mentorship.id, status);
  };

  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={otherUser.profilePictureUrl}
              alt={otherUser.firstName}
            />
            <AvatarFallback>
              {otherUser.firstName.charAt(0)}
              {otherUser.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{`${otherUser.firstName} ${otherUser.lastName}`}</h3>
            <p className="text-sm text-muted-foreground">
              {otherUser.headline}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {mentorship.status === 'pending' && isMentor && (
            <>
              <Button size="icon" variant="outline" onClick={() => handleAction('active')}>
                <Check className="h-4 w-4 text-green-500" />
              </Button>
              <Button size="icon" variant="outline" onClick={() => handleAction('declined')}>
                <X className="h-4 w-4 text-red-500" />
              </Button>
            </>
          )}
          {mentorship.status === 'pending' && !isMentor && (
            <Badge variant="secondary">
                <Hourglass className="mr-2 h-4 w-4"/>
                Pending
            </Badge>
          )}
          {mentorship.status === 'active' && (
            <Badge variant="default">
                <Handshake className="mr-2 h-4 w-4"/>
                Active
            </Badge>
          )}
          {mentorship.status === 'declined' && <Badge variant="destructive">Declined</Badge>}
          {mentorship.status === 'completed' && <Badge variant="outline">Completed</Badge>}
        </div>
      </CardContent>
    </Card>
  );
};

export default function MentorshipsPage({ navigate }: MentorshipsPageProps) {
  const { user: currentUserAuth } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [detailedMentorships, setDetailedMentorships] = useState<
    (Mentorship & { mentor?: User; mentee?: User })[]
  >([]);
  const [dataLoading, setDataLoading] = useState(true);

  const mentorshipsQuery = useMemoFirebase(() => {
    if (!currentUserAuth) return null;
    return query(
      collection(firestore, 'mentorships'),
      or(
        where('mentorId', '==', currentUserAuth.uid),
        where('menteeId', '==', currentUserAuth.uid)
      )
    );
  }, [firestore, currentUserAuth]);

  const { data: mentorships, isLoading: mentorshipsLoading } = useCollection<Mentorship>(mentorshipsQuery);
  const { data: currentUserProfile, isLoading: profileLoading } = useDoc<User>(currentUserAuth ? doc(firestore, 'userProfiles', currentUserAuth.uid) : null);

  useEffect(() => {
    if (mentorships && !mentorshipsLoading) {
      setDataLoading(true);
      fetchMentorshipUsers(firestore, mentorships)
        .then((detailedData) => {
          setDetailedMentorships(detailedData);
          setDataLoading(false);
        })
        .catch(() => setDataLoading(false));
    } else if (!mentorshipsLoading) {
      setDataLoading(false);
    }
  }, [mentorships, mentorshipsLoading, firestore]);

  const handleAction = async (id: string, status: 'active' | 'declined') => {
    const mentorshipRef = doc(firestore, 'mentorships', id);
    try {
        await updateDoc(mentorshipRef, { status });
        setDetailedMentorships(prev => prev.map(m => m.id === id ? {...m, status} : m));
        toast({
            title: `Request ${status === 'active' ? 'Accepted' : 'Declined'}`,
            description: `The mentorship has been updated.`
        });
    } catch (error) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not update the mentorship status.'
        });
    }
  };


  const { mentoring, menteeOf, pendingRequests } = useMemo(() => {
    const mentoring = detailedMentorships.filter(
      (m) => m.mentorId === currentUserAuth?.uid && m.status === 'active'
    );
    const menteeOf = detailedMentorships.filter(
      (m) => m.menteeId === currentUserAuth?.uid && m.status === 'active'
    );
    const pendingRequests = detailedMentorships.filter(
      (m) => m.mentorId === currentUserAuth?.uid && m.status === 'pending'
    );
    return { mentoring, menteeOf, pendingRequests };
  }, [detailedMentorships, currentUserAuth]);
  
  const isLoading = mentorshipsLoading || profileLoading || dataLoading;
  
  if (isLoading || !currentUserProfile) {
    return (
        <div className="space-y-8">
            <Skeleton className="h-12 w-1/2" />
            <Skeleton className="h-10 w-full" />
            <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
        </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Mentorships</h1>
        <p className="text-muted-foreground">
          Manage your mentorship connections and requests.
        </p>
      </div>

      <Tabs defaultValue="mentoring">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mentoring">Mentoring ({mentoring.length})</TabsTrigger>
          <TabsTrigger value="mentee">Mentee Of ({menteeOf.length})</TabsTrigger>
          <TabsTrigger value="requests">Requests ({pendingRequests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="mentoring" className="mt-6 space-y-4">
          {mentoring.length > 0 ? (
            mentoring.map((m) => (
              <MentorshipCard key={m.id} mentorship={m} currentUser={currentUserProfile} onAction={handleAction}/>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-10">You are not mentoring anyone yet.</p>
          )}
        </TabsContent>
        <TabsContent value="mentee" className="mt-6 space-y-4">
           {menteeOf.length > 0 ? (
            menteeOf.map((m) => (
              <MentorshipCard key={m.id} mentorship={m} currentUser={currentUserProfile} onAction={handleAction}/>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-10">You are not a mentee to anyone yet.</p>
          )}
        </TabsContent>
        <TabsContent value="requests" className="mt-6 space-y-4">
           {pendingRequests.length > 0 ? (
            pendingRequests.map((m) => (
              <MentorshipCard key={m.id} mentorship={m} currentUser={currentUserProfile} onAction={handleAction}/>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-10">You have no pending mentorship requests.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
