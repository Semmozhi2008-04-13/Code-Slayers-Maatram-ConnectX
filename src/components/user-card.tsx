import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { User } from "@/lib/types";
import { Plus } from "lucide-react";

type UserCardProps = {
  user: User;
};

export function UserCard({ user }: UserCardProps) {
  return (
    <Card className="text-center transition-shadow hover:shadow-lg">
      <CardContent className="p-6">
        <Link href={user.profileUrl}>
          <Image
            src={user.avatarUrl}
            alt={user.name}
            width={80}
            height={80}
            className="rounded-full mx-auto mb-4"
            data-ai-hint="profile avatar"
          />
          <h3 className="font-semibold font-headline text-lg hover:underline">{user.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground h-10">{user.headline}</p>
        <Button variant="outline" className="mt-4 w-full">
          <Plus className="mr-2 h-4 w-4" />
          Connect
        </Button>
      </CardContent>
    </Card>
  );
}
