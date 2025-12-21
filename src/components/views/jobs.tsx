
"use client";

import { useState } from "react";
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
import { MOCK_JOBS } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const jobTypes = [...new Set(MOCK_JOBS.map((job) => job.type))];
const locations = [...new Set(MOCK_JOBS.map((job) => job.location))];

export default function JobsPage() {
  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("all");
  const [isRemote, setIsRemote] = useState(false);
  const { toast } = useToast();

  const handlePostJob = () => {
    toast({
      title: "Feature Coming Soon!",
      description: "You'll be able to post job openings soon.",
    });
  };

  const filteredJobs = MOCK_JOBS.filter((job) => {
    const searchLower = search.toLowerCase();
    const titleMatch = job.title.toLowerCase().includes(searchLower);
    const companyMatch = job.company.toLowerCase().includes(searchLower);

    const typeMatch = jobType === "all" || job.type === jobType;
    const locationMatch = location === "all" || job.location === location;
    
    const remoteMatch = !isRemote || job.location.toLowerCase().includes('remote');

    return (titleMatch || companyMatch) && typeMatch && locationMatch && remoteMatch;
  });

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
          <Select value={jobType} onValueChange={setJobType}>
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
          <Select value={location} onValueChange={setLocation}>
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
        {filteredJobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
       {filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No jobs found matching your criteria.</p>
          </div>
        )}
    </div>
  );
}
