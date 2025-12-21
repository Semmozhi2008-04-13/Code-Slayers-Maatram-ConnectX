
"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Event } from "@/lib/types";
import { Calendar, MapPin, Users, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type EventCardProps = {
  event: Event;
};

export function EventCard({ event }: EventCardProps) {
  const { toast } = useToast();
  const [isRsvpd, setIsRsvpd] = useState(false);

  const handleRsvp = () => {
    setIsRsvpd(true);
    toast({
      title: "RSVP Successful!",
      description: `You have successfully RSVP'd for ${event.title}.`,
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-video w-full">
        <Image
          src={event.bannerUrl}
          alt={event.title}
          fill
          className="object-cover"
          data-ai-hint="event banner"
        />
      </div>
      <CardHeader>
        <CardTitle className="font-headline text-xl">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
         <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{event.attendees + (isRsvpd ? 1 : 0)} going</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleRsvp} disabled={isRsvpd}>
          {isRsvpd ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              RSVP'd
            </>
          ) : (
            'RSVP'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
