
'use client';

import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/event-card";
import { MOCK_EVENTS } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

export default function EventsPage() {
  const { toast } = useToast();

  const handleCreateEvent = () => {
    toast({
      title: "Feature Coming Soon!",
      description: "You'll be able to create your own events soon.",
    });
  };

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
        {MOCK_EVENTS.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
