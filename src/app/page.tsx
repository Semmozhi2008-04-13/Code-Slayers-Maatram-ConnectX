import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CURRENT_USER, MOCK_POSTS } from "@/lib/data";
import { Bookmark, Dot, Link, Users } from "lucide-react";
import CreatePost from "@/components/feed/create-post";
import PostCard from "@/components/feed/post-card";
import AiRecommendations from "@/components/ai/recommendations";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-8">
      {/* Left Column */}
      <div className="md:col-span-1 lg:col-span-2 space-y-6">
        <Card>
          <CardHeader className="p-0 relative h-24 bg-muted-foreground/20">
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
              <div className="w-24 h-24 rounded-full bg-background p-1">
                <Image
                  src={CURRENT_USER.avatarUrl}
                  alt={CURRENT_USER.name}
                  width={96}
                  height={96}
                  className="rounded-full"
                  data-ai-hint="profile avatar"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-14 text-center">
            <h2 className="text-xl font-headline font-semibold">{CURRENT_USER.name}</h2>
            <p className="text-sm text-muted-foreground">{CURRENT_USER.headline}</p>
          </CardContent>
          <Separator />
          <CardContent className="p-4 text-sm space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Connections</span>
              <span className="font-semibold text-primary">{CURRENT_USER.connections}</span>
            </div>
             <a href="#" className="font-semibold hover:underline">Grow your network</a>
          </CardContent>
           <Separator />
            <CardContent className="p-4">
                 <a href="/profile" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                    <Bookmark className="h-4 w-4" />
                    <span>My Items</span>
                </a>
            </CardContent>
        </Card>
      </div>

      {/* Middle Column */}
      <div className="md:col-span-3 lg:col-span-5 space-y-6">
        <CreatePost />
        <div className="space-y-4">
          {MOCK_POSTS.map((post) => (
            <PostCard key={post.id} post={post} />
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
