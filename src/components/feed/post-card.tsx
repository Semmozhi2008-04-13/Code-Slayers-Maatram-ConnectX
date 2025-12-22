
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Post } from "@/lib/types";
import { ThumbsUp, MessageCircle, Share2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";
import type { View } from '@/app/page';
import { formatDistanceToNow } from 'date-fns';

type PostCardProps = {
  post: Post;
  navigate: (view: View, id?: string | null) => void;
};

export default function PostCard({ post, navigate }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [commentCount, setCommentCount] = useState(post.comments);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleLike = () => {
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Post by ${post.author.name}`,
          text: post.content,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link Copied!",
          description: "The link to this post has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error("Failed to share:", error);
      toast({
        variant: "destructive",
        title: "Sharing Failed",
        description: "Could not share this post.",
      });
    }
  };
  
  const handleCommentSubmit = () => {
    if (comment.trim()) {
        setCommentCount(prev => prev + 1);
        setComment("");
        setShowCommentInput(false);
        toast({
            title: "Comment Posted",
            description: "Your comment has been successfully posted."
        });
    }
  };
  
  const formattedDate = post.createdAt ? formatDistanceToNow(post.createdAt.toDate(), { addSuffix: true }) : 'Just now';


  return (
    <Card className="group">
      <CardHeader>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('profile', post.author.id)}>
            <Image
              src={post.author.avatarUrl}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full"
              data-ai-hint="profile avatar"
            />
          </button>
          <div>
            <button
              onClick={() => navigate('profile', post.author.id)}
              className="font-headline font-semibold hover:underline text-left"
            >
              {post.author.name}
            </button>
            <p className="text-xs text-muted-foreground">
              {post.author.headline}
            </p>
            <p className="text-xs text-muted-foreground">{formattedDate}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4 whitespace-pre-wrap">{post.content}</p>
        {post.imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            <Image
              src={post.imageUrl}
              alt="Post image"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="office teamwork professional"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start px-6 pb-4">
        <div className="flex justify-between w-full text-xs text-muted-foreground mb-2">
          <span>{likeCount} Likes</span>
          <span>{commentCount} Comments</span>
        </div>
        <Separator />
        <div className="w-full grid grid-cols-3 gap-1 pt-2">
          <Button
            variant="ghost"
            className={cn(
              "text-muted-foreground hover:text-primary",
              isLiked && "text-primary"
            )}
            onClick={handleLike}
          >
            <ThumbsUp
              className={cn("mr-2 h-4 w-4", isLiked && "fill-current")}
            />{" "}
            Like
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            onClick={() => setShowCommentInput(!showCommentInput)}
          >
            <MessageCircle className="mr-2 h-4 w-4" /> Comment
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            onClick={handleShare}
          >
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
        {showCommentInput && (
          <div className="w-full pt-4">
            <div className="flex items-start space-x-4">
              <div className="min-w-0 flex-1">
                <div className="relative">
                  <Textarea
                    placeholder="Add a comment..."
                    className="pr-16"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className="absolute bottom-1 right-1 flex items-center">
                    <Button
                      type="submit"
                      size="icon"
                      variant="ghost"
                      onClick={handleCommentSubmit}
                      disabled={!comment.trim()}
                    >
                      <Send className="h-5 w-5 text-primary" />
                      <span className="sr-only">Send comment</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

    