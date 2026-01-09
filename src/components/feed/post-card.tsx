
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Post, User, Comment } from "@/lib/types";
import { ThumbsUp, MessageCircle, Share2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";
import type { View } from '@/app/page';
import { formatDistanceToNow } from 'date-fns';
import { useUser, useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, setDocumentNonBlocking, deleteDocumentNonBlocking } from "@/firebase";
import { doc, collection, query, orderBy, getDoc, updateDoc } from "firebase/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CommentCard = ({ comment }: { comment: Comment }) => {
  return (
    <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
            <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
            <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="bg-muted rounded-lg px-3 py-2 text-sm w-full">
            <p className="font-semibold">{comment.author.name}</p>
            <p className="text-muted-foreground">{comment.content}</p>
        </div>
    </div>
  )
}

type PostCardProps = {
  post: Post;
  navigate: (view: View, id?: string | null) => void;
};

export default function PostCard({ post, navigate }: PostCardProps) {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  
  const postRef = post.id ? useMemoFirebase(() => doc(firestore, "posts", post.id), [firestore, post.id]) : null;
  const commentsQuery = postRef ? useMemoFirebase(() => query(collection(postRef, "comments"), orderBy("createdAt", "desc")), [postRef]) : null;
  const likesRef = postRef ? useMemoFirebase(() => collection(postRef, "likes"), [postRef]) : null;

  const { data: comments, isLoading: commentsLoading } = useCollection<Comment>(commentsQuery);

  useEffect(() => {
    if (!user || !likesRef) return;
    const likeDocRef = doc(likesRef, user.uid);
    getDoc(likeDocRef).then(doc => {
      if (doc.exists()) {
        setIsLiked(true);
      }
    });
  }, [likesRef, user]);


  const handleLike = async () => {
    if (!user || !postRef || !likesRef) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "You must be logged in to like a post.",
      });
      return;
    }
    
    const newIsLiked = !isLiked;
    const newLikeCount = newIsLiked ? (likeCount ?? 0) + 1 : Math.max(0, (likeCount ?? 0) - 1);
    
    setIsLiked(newIsLiked);
    setLikeCount(newLikeCount);

    const likeDocRef = doc(likesRef, user.uid);

    // Optimistically update UI, and handle Firestore update in the background
    if (newIsLiked) {
      setDocumentNonBlocking(likeDocRef, { userId: user.uid }, {});
      updateDoc(postRef, { likeCount: newLikeCount });
    } else {
      deleteDocumentNonBlocking(likeDocRef);
      updateDoc(postRef, { likeCount: newLikeCount });
    }
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
  
  const handleCommentSubmit = async () => {
    if (!user || !comment.trim() || !postRef) return;

    const userProfileRef = doc(firestore, 'userProfiles', user.uid);
    
    try {
      const userProfileSnap = await getDoc(userProfileRef);
      if (!userProfileSnap.exists()) {
        throw new Error("User profile not found");
      }
      const userProfile = userProfileSnap.data() as User;

      const newComment = {
        author: {
          id: user.uid,
          name: `${userProfile.firstName} ${userProfile.lastName}`,
          avatarUrl: userProfile.profilePictureUrl,
        },
        content: comment,
        createdAt: new Date(),
      };
      
      const commentsCollectionRef = collection(postRef, "comments");
      addDocumentNonBlocking(commentsCollectionRef, newComment);
      
      const postDoc = await getDoc(postRef);
      const currentCommentCount = postDoc.data()?.commentCount || 0;
      updateDoc(postRef, { commentCount: currentCommentCount + 1 });

      setComment("");
      setShowComments(true);
      toast({
        title: "Comment Posted",
        description: "Your comment has been successfully posted."
      });
    } catch (error) {
      console.error("Error posting comment:", error);
      toast({
          variant: "destructive",
          title: "Error",
          description: "Could not post your comment. Please try again."
      });
    }
  };
  
  const formattedDate = post.createdAt ? formatDistanceToNow(post.createdAt instanceof Date ? post.createdAt : post.createdAt.toDate(), { addSuffix: true }) : 'Just now';


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
              data-ai-hint="office teamwork"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start px-4 sm:px-6 pb-4">
        {(likeCount > 0 || post.commentCount > 0) && (
            <div className="flex justify-between w-full text-xs text-muted-foreground mb-2">
                <span>{likeCount} Likes</span>
                <span>{post.commentCount} Comments</span>
            </div>
        )}
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
            onClick={() => setShowComments(!showComments)}
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
        <div className="w-full pt-4 space-y-4">
            <div className="flex items-start space-x-2 sm:space-x-4">
                {user && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL ?? undefined}/>
                      <AvatarFallback>{user.displayName?.charAt(0) ?? 'U'}</AvatarFallback>
                    </Avatar>
                )}
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
            {showComments && (
              <div className="space-y-4">
                {commentsLoading && <p className="text-sm text-muted-foreground">Loading comments...</p>}
                {comments && comments.length > 0 ? (
                  comments.map(c => <CommentCard key={c.id} comment={c} />)
                ) : (
                  !commentsLoading && <p className="text-sm text-muted-foreground">No comments yet.</p>
                )}
              </div>
            )}
        </div>
      </CardFooter>
    </Card>
  );
}
