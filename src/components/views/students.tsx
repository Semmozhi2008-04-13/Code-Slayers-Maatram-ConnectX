
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

type StudentsPageProps = {
  navigate: (view: View, id?: string | null) => void;
};

export default function StudentsPage({ navigate }: StudentsPageProps) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("all");
  const firestore = useFirestore();

  const studentsQuery = useMemoFirebase(
    () => query(collection(firestore, "userProfiles"), where("alumni", "==", false)),
    [firestore]
  );
  const { data: studentUsers, isLoading } = useCollection<User>(studentsQuery);

  const locations = useMemo(() => {
    if (!studentUsers) return [];
    return [...new Set(studentUsers.map((user) => user.location).filter(Boolean))];
  }, [studentUsers]);

  const filteredStudents = useMemo(() => {
    if (!studentUsers) return [];
    
    return studentUsers.filter((user) => {
      const searchLower = search.toLowerCase();
      const nameMatch = `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchLower);
      const headlineMatch = user.headline.toLowerCase().includes(searchLower);
      const skillsMatch = user.skills?.some((skill) =>
        skill.toLowerCase().includes(searchLower)
      );

      const locationMatch = location === "all" || user.location === location;

      return (nameMatch || headlineMatch || skillsMatch) && locationMatch;
    });
  }, [studentUsers, search, location]);

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
        <h1 className="text-3xl font-bold font-headline">Student Directory</h1>
        <p className="text-muted-foreground">
          Find and connect with the next generation of talent.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search by name, headline, or skill..."
          className="flex-grow"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="grid grid-cols-1 md:flex gap-4">
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
        {isLoading ? renderSkeletons() : filteredStudents.map((user) => (
          <UserCard key={user.id} user={user} navigate={navigate} />
        ))}
      </div>
       {filteredStudents.length === 0 && !isLoading && (
          <div className="col-span-full text-center py-16">
            <p className="text-muted-foreground">No students found matching your criteria.</p>
          </div>
        )}
    </div>
  );
}
