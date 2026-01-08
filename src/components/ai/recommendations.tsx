
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getAIRecommendations,
  type AIRecommendationsOutput,
} from "@/ai/flows/ai-powered-recommendations";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useUser, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import type { User } from "@/lib/types";

export default function AiRecommendations() {
  const [recommendations, setRecommendations] =
    useState<AIRecommendationsOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, "userProfiles", user.uid) : null),
    [user, firestore]
  );
  const { data: userProfile, isLoading: isUserProfileLoading } = useDoc<User>(userDocRef);

  useEffect(() => {
    async function fetchRecommendations() {
      if (!userProfile || recommendations) return; // Don't refetch if we have recommendations

      setLoading(true);
      try {
        const profileString = `
          Name: ${userProfile.firstName} ${userProfile.lastName}
          Headline: ${userProfile.headline}
          Industry: ${userProfile.industry}
          Skills: ${userProfile.skills?.join(", ")}
          About: ${userProfile.about}
        `;
        const result = await getAIRecommendations({
          userProfile: profileString,
          recentActivity: "Searched for 'product manager' jobs. Viewed profiles in the tech industry.",
        });
        setRecommendations(result);
      } catch (error) {
        console.error("Failed to fetch AI recommendations:", error);
      } finally {
        setLoading(false);
      }
    }
    
    if (userProfile && !recommendations) {
        fetchRecommendations();
    } else if (!isUserProfileLoading) {
        setLoading(false);
    }
  }, [userProfile, isUserProfileLoading, recommendations]);

  const renderLoading = () => (
    <div className="space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-full" />
    </div>
  );

  const renderList = (items: string[], type: 'person' | 'job' | 'content') => {
    if (!items || items.length === 0) {
      return <p className="text-sm text-muted-foreground">No recommendations available.</p>;
    }
    return (
      <ul className="space-y-3">
        {items.slice(0, 5).map((item, index) => (
          <li key={index} className="flex items-start justify-between gap-2 text-sm">
            <span className="flex-1">{item}</span>
            <Button variant="outline" size="icon" className="h-7 w-7 shrink-0">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add</span>
            </Button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-lg">Recommended for you</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="people">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="people">People</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
          </TabsList>
          <TabsContent value="people" className="mt-4">
            {loading || isUserProfileLoading ? renderLoading() : renderList(recommendations?.connectionRecommendations ?? [], 'person')}
          </TabsContent>
          <TabsContent value="jobs" className="mt-4">
            {loading || isUserProfileLoading ? renderLoading() : renderList(recommendations?.jobRecommendations ?? [], 'job')}
          </TabsContent>
          <TabsContent value="content" className="mt-4">
            {loading || isUserProfileLoading ? renderLoading() : renderList(recommendations?.contentRecommendations ?? [], 'content')}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
