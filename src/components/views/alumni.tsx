
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
import { UserCard } from "@/components/user-card";
import { MOCK_USERS } from "@/lib/data";
import type { View } from '@/app/page';

const alumniUsers = MOCK_USERS.filter(user => user.role === 'Alumni');
const industries = [...new Set(alumniUsers.map((user) => user.industry))];
const locations = [...new Set(alumniUsers.map((user) => user.location))];

type AlumniPageProps = {
  navigate: (view: View, id?: string | null) => void;
};


export default function AlumniPage({ navigate }: AlumniPageProps) {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("all");
  const [location, setLocation] = useState("all");

  const filteredUsers = alumniUsers.filter((user) => {
    const searchLower = search.toLowerCase();
    const nameMatch = user.name.toLowerCase().includes(searchLower);
    const headlineMatch = user.headline.toLowerCase().includes(searchLower);
    const skillsMatch = user.skills.some((skill) =>
      skill.toLowerCase().includes(searchLower)
    );

    const industryMatch = industry === "all" || user.industry === industry;
    const locationMatch = location === "all" || user.location === location;

    return (nameMatch || headlineMatch || skillsMatch) && industryMatch && locationMatch;
  });

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
          <Select value={industry} onValueChange={setIndustry}>
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
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} navigate={navigate} />
        ))}
      </div>
       {filteredUsers.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-muted-foreground">No alumni found matching your criteria.</p>
          </div>
        )}
    </div>
  );
}
