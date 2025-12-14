import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Post } from "@/lib/types";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Link href={post.author.profileUrl}>
            <Image
              src={post.author.avatarUrl}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full"
              data-ai-hint="profile avatar"
            />
          </Link>
          <div>
            <Link href={post.author.profileUrl} className="font-headline font-semibold hover:underline">{post.author.name}</Link>
            <p className="text-xs text-muted-foreground">{post.author.headline}</p>
            <p className="text-xs text-muted-foreground">{post.createdAt}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{post.content}</p>
        {post.imageUrl && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg max-h-[350px]">
            <Image
              src={post.imageUrl}
              alt="Post image"
              fill
              className="object-cover"
              data-ai-hint="office teamwork"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start px-6 pb-4">
        <div className="flex justify-between w-full text-xs text-muted-foreground mb-2">
            <span>{post.likes} Likes</span>
            <span>{post.comments} Comments</span>
        </div>
        <Separator />
        <div className="w-full grid grid-cols-3 gap-1 pt-2">
          <Button variant="ghost">
            <ThumbsUp className="mr-2 h-4 w-4" /> Like
          </Button>
          <Button variant="ghost">
            <MessageCircle className="mr-2 h-4 w-4" /> Comment
          </Button>
          <Button variant="ghost">
            <Share2 className="mr-2 h-4 w-4" /> Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
