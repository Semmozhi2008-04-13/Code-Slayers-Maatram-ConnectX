
"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CURRENT_USER } from "@/lib/data";
import { Image as ImageIcon, Video, Calendar, Sparkles, Wand, Send } from "lucide-react";
import { generatePost } from "@/ai/flows/ai-post-generation";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "@/hooks/use-toast";
import type { Post } from "@/lib/types";

type CreatePostProps = {
  onPostCreated: (newPost: Post) => void;
};


export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const [postContent, setPostContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaUrl, setMediaUrl] = useState('');
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGeneratePost = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    try {
      const result = await generatePost({
        prompt: aiPrompt,
        userName: CURRENT_USER.name,
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
            id: CURRENT_USER.id,
            name: CURRENT_USER.name,
            avatarUrl: CURRENT_USER.avatarUrl,
            headline: CURRENT_USER.headline,
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
    setImageUrl(mediaUrl);
    setIsMediaModalOpen(false);
    setMediaUrl('');
    toast({
        title: "Image Added",
        description: "The image will be included in your post.",
    });
  }
  
  const handleFeatureNotAvailable = () => {
    toast({
        title: "Feature Coming Soon",
        description: "We're working on bringing this feature to you.",
    });
  }

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <Image
              src={CURRENT_USER.avatarUrl}
              alt={CURRENT_USER.name}
              width={48}
              height={48}
              className="rounded-full"
              data-ai-hint="profile avatar"
            />
            <div className="w-full">
              <Textarea
                placeholder={`What's on your mind, ${CURRENT_USER.name.split(" ")[0]}?`}
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
                     <Button variant="ghost" size="icon" className="h-9 w-9" onClick={handleFeatureNotAvailable}>
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary"/>
              Add an Image to your Post
            </DialogTitle>
            <DialogDescription>
              Paste an image URL below. The image will be displayed with your post.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="media-url" className="text-right">
                Image URL
              </Label>
              <Input
                id="media-url"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="col-span-3"
                placeholder="https://example.com/image.png"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddMedia} disabled={!mediaUrl}>Add Image</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

    