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

const mentorUsers = MOCK_USERS.filter(user => user.isMentor);
const industries = [...new Set(mentorUsers.map((user) => user.industry))];
const skills = [...new Set(mentorUsers.flatMap((user) => user.skills))];

export default function MentorsPage() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("all");
  const [skill, setSkill] = useState("all");

  const filteredMentors = mentorUsers.filter((user) => {
    const searchLower = search.toLowerCase();
    const nameMatch = user.name.toLowerCase().includes(searchLower);
    const headlineMatch = user.headline.toLowerCase().includes(searchLower);
    
    const industryMatch = industry === "all" || user.industry === industry;
    const skillMatch = skill === "all" || user.skills.includes(skill);

    return (nameMatch || headlineMatch) && industryMatch && skillMatch;
  });

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
          <Select value={skill} onValueChange={setSkill}>
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
        {filteredMentors.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
       {filteredMentors.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-muted-foreground">No mentors found matching your criteria.</p>
          </div>
        )}
    </div>
  );
}
