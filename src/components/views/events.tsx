
'use client';

import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/event-card";
import { useToast } from "@/hooks/use-toast";
import type { Event } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { dummyEvents } from "@/lib/dummy-data";

export default function EventsPage() {
  const { toast } = useToast();
  
  const events = dummyEvents;
  const isLoading = false; // Using dummy data

  const handleCreateEvent = () => {
    toast({
      title: "Feature Coming Soon!",
      description: "You'll be able to create your own events soon.",
    });
  };
  
  const renderSkeletons = () => (
    [...Array(3)].map((_, i) => (
        <Card key={i} className="flex flex-col overflow-hidden">
            <Skeleton className="aspect-video w-full" />
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="flex-grow space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-full" />
            </CardFooter>
        </Card>
    ))
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold font-headline">Events</h1>
          <p className="text-muted-foreground">
            Join workshops, networking sessions, and more.
          </p>
        </div>
        <Button onClick={handleCreateEvent}>Create Event</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? renderSkeletons() : events?.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
       {!isLoading && events?.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-muted-foreground">No events scheduled at the moment.</p>
          </div>
        )}
    </div>
  );
}

    