
'use client';

import { useState } from 'react';
import Image from "next/image";
import type { Post, User } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bookmark, Users } from "lucide-react";
import CreatePost from "@/components/feed/create-post";
import PostCard from "@/components/feed/post-card";
import AiRecommendations from "@/components/ai/recommendations";
import type { View } from '@/app/page';
import { useUser, useDoc, useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, doc, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '../ui/skeleton';

type FeedPageProps = {
  navigate: (view: View, id?: string | null) => void;
};

export default function FeedPage({ navigate }: FeedPageProps) {
  const { user } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, "userProfiles", user.uid) : null),
    [user, firestore]
  );
  const { data: userProfile, isLoading: isUserProfileLoading } = useDoc<User>(userDocRef);
  
  const postsQuery = useMemoFirebase(
    () => query(collection(firestore, "posts"), orderBy("createdAt", "desc")),
    [firestore]
  );
  const { data: posts, isLoading: arePostsLoading } = useCollection<Post>(postsQuery);

  const handlePostCreated = (newPost: Post) => {
    // This function can now be simplified as useCollection handles real-time updates.
    // We can keep it for optimistic UI updates if needed, but for now, we'll rely on the listener.
  };
  
  const renderLeftColumn = () => {
    if (isUserProfileLoading || !userProfile) {
      return (
         <Card>
          <CardHeader className="p-0 relative h-20 bg-muted-foreground/20">
             <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-background p-1">
                <Skeleton className="w-full h-full rounded-full"/>
            </div>
          </CardHeader>
          <CardContent className="pt-12 text-center">
            <Skeleton className="h-6 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-full mx-auto mt-2" />
          </CardContent>
          <Separator />
          <CardContent className="p-4 space-y-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </CardContent>
        </Card>
      );
    }
    
    return (
       <Card>
          <CardHeader className="p-0 relative h-20 bg-muted-foreground/20">
             <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-background p-1">
                <button onClick={() => navigate('profile', userProfile.id)} className="block w-full h-full rounded-full overflow-hidden">
                    <Image
                        src={userProfile.profilePictureUrl}
                        alt={userProfile.firstName}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                        data-ai-hint="profile avatar"
                    />
                </button>
            </div>
          </CardHeader>
          <CardContent className="pt-12 text-center">
            <button onClick={() => navigate('profile', userProfile.id)} className="block w-full">
              <h2 className="text-xl font-headline font-semibold hover:underline">{`${userProfile.firstName} ${userProfile.lastName}`}</h2>
            </button>
            <p className="text-sm text-muted-foreground truncate">{userProfile.headline}</p>
          </CardContent>
          <Separator />
          <CardContent className="p-4 text-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground font-medium">Connections</span>
              <span className="font-semibold text-primary">0</span>
            </div>
             <button onClick={() => navigate('alumni')} className="flex items-center gap-2 font-semibold hover:underline text-primary text-left w-full">
                <Users className="h-4 w-4" />
                <span>Grow your network</span>
             </button>
          </CardContent>
           <Separator />
            <CardContent className="p-4">
                 <button onClick={() => navigate('profile', userProfile.id)} className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
                    <Bookmark className="h-4 w-4" />
                    <span>My Items</span>
                </button>
            </CardContent>
        </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-6 lg:gap-8">
      {/* Left Column */}
      <div className="md:col-span-3 lg:col-span-2 space-y-6 hidden md:block">
        {renderLeftColumn()}
      </div>

      {/* Middle Column */}
      <div className="md:col-span-7 lg:col-span-5 space-y-6">
        <CreatePost onPostCreated={handlePostCreated} />
        <div className="space-y-4">
          {arePostsLoading ? (
            [...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="w-full space-y-1.5">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6 mt-2" />
                    <Skeleton className="aspect-video w-full mt-4 rounded-lg" />
                  </CardContent>
                </Card>
              ))
          ) : (
            posts?.map((post) => (
              <PostCard key={post.id} post={post} navigate={navigate} />
            ))
          )}
           {!arePostsLoading && posts?.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Your feed is empty.</p>
              <p className="text-sm text-muted-foreground">Create a post to get started!</p>
            </div>
           )}
        </div>
      </div>

      {/* Right Column */}
      <div className="hidden lg:block lg:col-span-3 space-y-6">
        <AiRecommendations />
        <Card>
          <CardContent className="p-4 text-center text-xs text-muted-foreground">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              <a href="#" className="hover:underline hover:text-primary">About</a>
              <a href="#" className="hover:underline hover:text-primary">Accessibility</a>
              <a href="#" className="hover:underline hover:text-primary">Help Center</a>
              <a href="#" className="hover:underline hover:text-primary">Privacy & Terms</a>
            </div>
            <p className="mt-4 font-headline">Maatram ConnectX © {new Date().getFullYear()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    