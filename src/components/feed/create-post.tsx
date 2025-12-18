"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { CURRENT_USER } from "@/lib/data";
import { Image as ImageIcon, Video, Calendar, Sparkles, Wand } from "lucide-react";
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

export default function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
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
              <div className="mt-2 flex justify-end">
                <Button>Post</Button>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-around border-t pt-2">
            <Button variant="ghost" className="flex-1">
              <ImageIcon className="mr-2 h-5 w-5 text-blue-500" /> Photo
            </Button>
            <Button variant="ghost" className="flex-1">
              <Video className="mr-2 h-5 w-5 text-green-500" /> Video
            </Button>
            <Button variant="ghost" className="flex-1" onClick={() => setIsAiModalOpen(true)}>
              <Sparkles className="mr-2 h-5 w-5 text-purple-500" /> AI Generate
            </Button>
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
    </>
  );
}
