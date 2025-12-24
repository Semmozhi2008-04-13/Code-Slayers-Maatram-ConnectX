
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
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import type { View } from '@/app/page';
import { Skeleton } from "../ui/skeleton";
import type { User } from "@/lib/types";
import { Card, CardContent } from "../ui/card";


type AlumniPageProps = {
  navigate: (view: View, id?: string | null) => void;
};


export default function AlumniPage({ navigate }: AlumniPageProps) {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("all");
  const [location, setLocation] = useState("all");
  const firestore = useFirestore();

  const alumniQuery = useMemoFirebase(
    () => query(collection(firestore, "userProfiles"), where("alumni", "==", true)),
    [firestore]
  );
  const { data: alumniUsers, isLoading } = useCollection<User>(alumniQuery);

  const industries = useMemo(() => {
    if (!alumniUsers) return [];
    return [...new Set(alumniUsers.map((user) => user.industry).filter(Boolean))];
  }, [alumniUsers]);

  const locations = useMemo(() => {
    if (!alumniUsers) return [];
    return [...new Set(alumniUsers.map((user) => user.location).filter(Boolean))];
  }, [alumniUsers]);


  const filteredUsers = useMemo(() => {
    if (!alumniUsers) return [];

    return alumniUsers.filter((user) => {
      const searchLower = search.toLowerCase();
      const nameMatch = `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchLower);
      const headlineMatch = user.headline.toLowerCase().includes(searchLower);
      const skillsMatch = user.skills?.some((skill) =>
        skill.toLowerCase().includes(searchLower)
      );

      const industryMatch = industry === "all" || user.industry === industry;
      const locationMatch = location === "all" || user.location === location;

      return (nameMatch || headlineMatch || skillsMatch) && industryMatch && locationMatch;
    });
  }, [alumniUsers, search, industry, location]);

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
        <h1 className="text-3xl font-bold font-headline">Alumni Directory</h1>
        <p className="text-muted-foreground">
          Connect with alumni, students, and faculty.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by name, headline, or skill..."
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
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? renderSkeletons() : filteredUsers?.map((user) => (
          <UserCard key={user.id} user={user} navigate={navigate} />
        ))}
      </div>
       {!isLoading && filteredUsers?.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-muted-foreground">No alumni found matching your criteria.</p>
          </div>
        )}
    </div>
  );
}
