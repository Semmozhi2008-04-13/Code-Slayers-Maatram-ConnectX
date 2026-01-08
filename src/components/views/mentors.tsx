
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
import { UserCard } from "@/components/user-card";
import type { View } from '@/app/page';
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import type { User } from "@/lib/types";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";


type MentorsPageProps = {
  navigate: (view: View, id?: string | null) => void;
};

export default function MentorsPage({ navigate }: MentorsPageProps) {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("all");
  const [skill, setSkill] = useState("all");
  const firestore = useFirestore();
  
  const mentorsQuery = useMemoFirebase(
    () => query(collection(firestore, "userProfiles"), where("isMentor", "==", true)),
    [firestore]
  );
  const { data: mentorUsers, isLoading } = useCollection<User>(mentorsQuery);

  const industries = useMemo(() => {
    if (!mentorUsers) return [];
    return [...new Set(mentorUsers.map((user) => user.industry).filter(Boolean))];
  }, [mentorUsers]);
  
  const skills = useMemo(() => {
    if (!mentorUsers) return [];
    return [...new Set(mentorUsers.flatMap((user) => user.skills || []).filter(Boolean))];
  }, [mentorUsers]);


  const filteredMentors = useMemo(() => {
    if (!mentorUsers) return [];

    return mentorUsers.filter((user) => {
        const searchLower = search.toLowerCase();
        const nameMatch = `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchLower);
        const headlineMatch = user.headline.toLowerCase().includes(searchLower);
        
        const industryMatch = industry === "all" || user.industry === industry;
        const skillMatch = skill === "all" || user.skills?.includes(skill);

        return (nameMatch || headlineMatch) && industryMatch && skillMatch;
    });
  }, [mentorUsers, search, industry, skill]);
  
  const renderSkeletons = () => (
    [...Array(8)].map((_, i) => (
       <Card key={i}>
        <CardContent className="p-6 text-center">
            <Skeleton className="w-20 h-20 rounded-full mx-auto mb-4" />
            <Skeleton className="h-6 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-full mx-auto mt-2" />
            <Skeleton className="h-10 w-full mt-4 rounded-md" />
        </CardContent>
      </Card>
    ))
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Find a Mentor</h1>
        <p className="text-muted-foreground">
          Connect with experienced alumni for guidance and support.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by name or headline..."
          className="flex-grow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-2 md:flex gap-4">
          <Select value={industry} onValueChange={setIndustry} disabled={isLoading || industries.length === 0}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map((ind) => (
                <SelectItem key={ind} value={ind}>
                  {ind}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={skill} onValueChange={setSkill} disabled={isLoading || skills.length === 0}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Skill" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Skills</SelectItem>
              {skills.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? renderSkeletons() : filteredMentors.map((user) => (
          <UserCard key={user.id} user={user} navigate={navigate} />
        ))}
      </div>
       {!isLoading && filteredMentors.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-muted-foreground">No mentors found matching your criteria.</p>
          </div>
        )}
    </div>
  );
}
