
"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useUser, useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { Image as ImageIcon, Video, Sparkles, Wand, Send } from "lucide-react";
import { generatePost } from "@/ai/flows/ai-post-generation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "@/hooks/use-toast";
import type { Post, User } from "@/lib/types";
import FileUploader from "../file-uploader";

type CreatePostProps = {
  onPostCreated: (newPost: Post) => void;
};


export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const [postContent, setPostContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const { user } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'userProfiles', user.uid) : null),
    [user, firestore]
  );
  const { data: userProfile, isLoading: isUserProfileLoading } = useDoc<User>(userDocRef);


  const handleGeneratePost = async () => {
    if (!aiPrompt || !userProfile) return;
    setIsGenerating(true);
    try {
      const result = await generatePost({
        prompt: aiPrompt,
        userName: userProfile.name,
      });
      setPostContent(result.postContent);
      setIsAiModalOpen(false);
      setAiPrompt("");
    } catch (error) {
      console.error("Failed to generate AI post:", error);
      toast({
        variant: "destructive",
        title: "AI Post Generation Failed",
        description: "There was an error generating the post. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handlePost = () => {
    if (!userProfile) return;

    if (postContent.trim() === "") {
        toast({
            variant: "destructive",
            title: "Empty Post",
            description: "You can't create an empty post.",
        });
        return;
    }
    const newPost: Post = {
        id: `post-${Date.now()}-${Math.random()}`,
        author: {
            id: userProfile.id,
            name: userProfile.name,
            avatarUrl: userProfile.avatarUrl,
            headline: userProfile.headline,
        },
        content: postContent,
        imageUrl: imageUrl || undefined,
        likes: 0,
        comments: 0,
        createdAt: "Just now",
    };
    onPostCreated(newPost);
    setPostContent("");
    setImageUrl("");
     toast({
        title: "Post Created",
        description: "Your post has been successfully published.",
      });
  }

  const handleAddMedia = () => {
    setIsMediaModalOpen(false);
    toast({
        title: "Media Added",
        description: "Your media has been attached to the post.",
    });
  }
  
  const handleFeatureNotAvailable = () => {
    toast({
        title: "Feature Coming Soon",
        description: "We're working on bringing this feature to you.",
    });
  }
  
  if (isUserProfileLoading || !userProfile) {
      return (
          <Card>
              <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="w-full space-y-2">
                         <Skeleton className="h-10 flex-1 rounded-md" />
                         <div className="flex justify-between">
                            <Skeleton className="h-8 w-24 rounded-md" />
                            <Skeleton className="h-8 w-20 rounded-md" />
                         </div>
                      </div>
                  </div>
              </CardContent>
          </Card>
      )
  }

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Image
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              width={48}
              height={48}
              className="rounded-full"
              data-ai-hint="profile avatar"
            />
            <div className="w-full">
              <Textarea
                placeholder={`What's on your mind, ${userProfile.name.split(" ")[0]}?`}
                className="h-24 resize-none"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
              {imageUrl && (
                  <div className="mt-2 relative">
                    <Image src={imageUrl} alt="Post preview" width={100} height={100} className="rounded-md object-cover h-24 w-24" />
                    <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={() => setImageUrl('')}>
                        <Send className="h-4 w-4 transform rotate-45"/>
                    </Button>
                  </div>
              )}
              <div className="mt-2 flex justify-between items-center">
                <div className="flex items-center gap-1">
                     <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setIsMediaModalOpen(true)}>
                        <ImageIcon className="text-blue-500" />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setIsMediaModalOpen(true)}>
                         <Video className="text-green-500" />
                     </Button>
                     <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setIsAiModalOpen(true)}>
                         <Sparkles className="text-purple-500" />
                     </Button>
                </div>
                <Button onClick={handlePost}>
                    <Send className="mr-2 h-4 w-4"/>
                    Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isAiModalOpen} onOpenChange={setIsAiModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wand className="h-5 w-5 text-primary"/>
              Generate Post with AI
            </DialogTitle>
            <DialogDescription>
              Describe what you want to post about, and AI will draft it for you.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ai-prompt" className="text-right">
                Prompt
              </Label>
              <Input
                id="ai-prompt"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="col-span-3"
                placeholder="e.g., 'My recent promotion to Senior Developer'"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleGeneratePost} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Skeleton className="w-5 h-5 mr-2 rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                'Generate'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
       <Dialog open={isMediaModalOpen} onOpenChange={setIsMediaModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary"/>
              Add Photos or Videos to your Post
            </DialogTitle>
            <DialogDescription>
              Upload media to make your post more engaging.
            </DialogDescription>
          </DialogHeader>
            <FileUploader />
        </DialogContent>
      </Dialog>
    </>
  );
}
