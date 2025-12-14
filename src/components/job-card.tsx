import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Job } from "@/lib/types";
import { MapPin } from "lucide-react";

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="hover:bg-accent transition-colors">
      <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Image
          src={job.companyLogoUrl}
          alt={`${job.company} logo`}
          width={64}
          height={64}
          className="rounded-lg border p-1"
          data-ai-hint="company logo"
        />
        <div className="flex-grow">
          <h3 className="font-semibold font-headline text-lg">{job.title}</h3>
          <p className="text-muted-foreground text-sm">{job.company}</p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <MapPin className="h-3 w-3" />
            <span>{job.location}</span>
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
          <div className="flex gap-2">
            <Badge variant="secondary">{job.type}</Badge>
            <Badge variant="outline">Posted {job.postedAt}</Badge>
          </div>
          <Button className="mt-2 w-full sm:w-auto">Apply Now</Button>
        </div>
      </CardContent>
    </Card>
  );
}
