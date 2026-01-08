
"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/job-card";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import type { Job } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("all");
  const [isRemote, setIsRemote] = useState(false);
  const { toast } = useToast();
  const firestore = useFirestore();

  const jobsQuery = useMemoFirebase(() => collection(firestore, 'jobs'), [firestore]);
  const { data: jobs, isLoading } = useCollection<Job>(jobsQuery);

  const jobTypes = useMemo(() => {
    if (!jobs) return [];
    return [...new Set(jobs.map((job) => job.type).filter(Boolean))];
  }, [jobs]);

  const locations = useMemo(() => {
    if (!jobs) return [];
    return [...new Set(jobs.map((job) => job.location).filter(Boolean))];
  }, [jobs]);

  const handlePostJob = () => {
    toast({
      title: "Feature Coming Soon!",
      description: "You'll be able to post job openings soon.",
    });
  };

  const filteredJobs = useMemo(() => {
    if (!jobs) return [];

    return jobs.filter((job) => {
      const searchLower = search.toLowerCase();
      const titleMatch = job.title.toLowerCase().includes(searchLower);
      const companyMatch = job.company.toLowerCase().includes(searchLower);

      const typeMatch = jobType === "all" || job.type === jobType;
      const locationMatch = location === "all" || job.location === location;
      
      const remoteMatch = !isRemote || job.location.toLowerCase().includes('remote');

      return (titleMatch || companyMatch) && typeMatch && locationMatch && remoteMatch;
    });
  }, [jobs, search, jobType, location, isRemote]);
  
  const renderSkeletons = () => (
    [...Array(4)].map((_, i) => (
      <Card key={i}>
        <CardContent className="p-4 flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-lg" />
          <div className="flex-grow space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3 w-1/4" />
          </div>
          <div className="flex flex-col items-end gap-2">
             <div className="flex gap-2">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
             </div>
             <Skeleton className="h-10 w-28 rounded-md" />
          </div>
        </CardContent>
      </Card>
    ))
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold font-headline">Job Board</h1>
          <p className="text-muted-foreground">
            Find your next opportunity within the network.
          </p>
        </div>
        <Button onClick={handlePostJob}>Post a Job</Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by title or company..."
          className="flex-grow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-2 md:flex gap-4 items-center">
          <Select value={jobType} onValueChange={setJobType} disabled={isLoading || jobTypes.length === 0}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Job Types</SelectItem>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={location} onValueChange={setLocation} disabled={isLoading || locations.length === 0}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
           <div className="flex items-center space-x-2">
                <Checkbox id="remote-only" checked={isRemote} onCheckedChange={(checked) => setIsRemote(checked as boolean)} />
                <Label htmlFor="remote-only" className="text-sm font-medium">Remote only</Label>
            </div>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? renderSkeletons() : filteredJobs?.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
       {!isLoading && filteredJobs?.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No jobs found matching your criteria.</p>
          </div>
        )}
    </div>
  );
}
