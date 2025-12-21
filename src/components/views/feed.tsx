
'use client';

import Image from "next/image";
import { CURRENT_USER, MOCK_POSTS } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bookmark } from "lucide-react";
import CreatePost from "@/components/feed/create-post";
import PostCard from "@/components/feed/post-card";
import AiRecommendations from "@/components/ai/recommendations";
import type { View } from '@/app/page';

type FeedPageProps = {
  navigate: (view: View, id?: string | null) => void;
};

export default function FeedPage({ navigate }: FeedPageProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-10 gap-6 lg:gap-8">
      {/* Left Column */}
      <div className="md:col-span-3 lg:col-span-2 space-y-6 hidden md:block">
        <Card>
          <CardHeader className="p-0 relative h-20 bg-muted-foreground/20">
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
              <button onClick={() => navigate('profile', CURRENT_USER.id)} className="block">
                <div className="w-20 h-20 rounded-full bg-background p-1">
                  <Image
                    src={CURRENT_USER.avatarUrl}
                    alt={CURRENT_USER.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                    data-ai-hint="profile avatar"
                  />
                </div>
              </button>
            </div>
          </CardHeader>
          <CardContent className="pt-12 text-center">
            <button onClick={() => navigate('profile', CURRENT_USER.id)} className="block w-full">
              <h2 className="text-xl font-headline font-semibold hover:underline">{CURRENT_USER.name}</h2>
            </button>
            <p className="text-sm text-muted-foreground">{CURRENT_USER.headline}</p>
          </CardContent>
          <Separator />
          <CardContent className="p-4 text-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Connections</span>
              <span className="font-semibold text-primary">{CURRENT_USER.connections}</span>
            </div>
             <button onClick={() => navigate('alumni')} className="font-semibold hover:underline text-primary text-left w-full">Grow your network</button>
          </CardContent>
           <Separator />
            <CardContent className="p-4">
                 <button onClick={() => navigate('profile', CURRENT_USER.id)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                    <Bookmark className="h-4 w-4" />
                    <span>My Items</span>
                </button>
            </CardContent>
        </Card>
      </div>

      {/* Middle Column */}
      <div className="md:col-span-7 lg:col-span-5 space-y-6">
        <CreatePost />
        <div className="space-y-4">
          {MOCK_POSTS.map((post) => (
            <PostCard key={post.id} post={post} navigate={navigate} />
          ))}
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
            <p className="mt-4">Maatram ConnectX © {new Date().getFullYear()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
