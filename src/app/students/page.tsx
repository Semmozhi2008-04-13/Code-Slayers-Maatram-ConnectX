
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

const studentUsers = MOCK_USERS.filter(user => user.role === 'Student');
const colleges = [...new Set(studentUsers.map((user) => user.college).filter(Boolean))];
const locations = [...new Set(studentUsers.map((user) => user.location))];

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [college, setCollege] = useState("all");
  const [location, setLocation] = useState("all");

  const filteredStudents = studentUsers.filter((user) => {
    const searchLower = search.toLowerCase();
    const nameMatch = user.name.toLowerCase().includes(searchLower);
    const headlineMatch = user.headline.toLowerCase().includes(searchLower);
    const skillsMatch = user.skills.some((skill) =>
      skill.toLowerCase().includes(searchLower)
    );

    const collegeMatch = college === "all" || user.college === college;
    const locationMatch = location === "all" || user.location === location;

    return (nameMatch || headlineMatch || skillsMatch) && collegeMatch && locationMatch;
  });

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
        <div className="grid grid-cols-2 md:flex gap-4">
          <Select value={college} onValueChange={setCollege}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="College" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Colleges</SelectItem>
              {colleges.map((col) => (
                <SelectItem key={col} value={col}>
                  {col}
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
        {filteredStudents.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
       {filteredStudents.length === 0 && (
          <div className="col-span-full text-center py-16">
            <p className="text-muted-foreground">No students found matching your criteria.</p>
          </div>
        )}
    </div>
  );
}
