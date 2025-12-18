
"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { User } from "@/lib/types";
import { Check, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { View } from '@/app/page';


type UserCardProps = {
  user: User;
  navigate: (view: View, id?: string | null) => void;
};

export function UserCard({ user, navigate }: UserCardProps) {
  const [requested, setRequested] = useState(false);
  const { toast } = useToast();

  const handleConnect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setRequested(true);
    toast({
      title: "Connection Request Sent",
      description: `Your request to connect with ${user.name} has been sent.`,
    });
  };

  return (
    <Card className="text-center transition-shadow hover:shadow-lg cursor-pointer" onClick={() => navigate('profile', user.id)}>
      <CardContent className="p-6">
        <Image
          src={user.avatarUrl}
          alt={user.name}
          width={80}
          height={80}
          className="rounded-full mx-auto mb-4"
          data-ai-hint="profile avatar"
        />
        <h3 className="font-semibold font-headline text-lg hover:underline">{user.name}</h3>
        <p className="text-sm text-muted-foreground h-10">{user.headline}</p>
        <Button 
          variant="outline" 
          className="mt-4 w-full"
          onClick={handleConnect}
          disabled={requested}
        >
          {requested ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Pending
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Connect
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
