"use client";

import { useState, useEffect } from "react";
import {
  completeProfile,
  type CompleteProfileOutput,
} from "@/ai/flows/ai-profile-completion";
import { CURRENT_USER } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Plus } from "lucide-react";

export default function AiProfileCompletion() {
  const [suggestions, setSuggestions] =
    useState<CompleteProfileOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSuggestions() {
      setLoading(true);
      try {
        const result = await completeProfile({
          currentProfile: `Skills: ${CURRENT_USER.skills.join(", ")}. About: ${CURRENT_USER.about}`,
          jobTitle: CURRENT_USER.experience[0]?.title || CURRENT_USER.headline,
          industry: CURRENT_USER.industry,
        });
        setSuggestions(result);
      } catch (error) {
        console.error("Failed to fetch AI profile suggestions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSuggestions();
  }, []);

  if (loading) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-1/2"/>
                <Skeleton className="h-4 w-3/4 mt-1"/>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Skeleton className="h-5 w-1/4 mb-2"/>
                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-7 w-20 rounded-full"/>
                        <Skeleton className="h-7 w-24 rounded-full"/>
                        <Skeleton className="h-7 w-16 rounded-full"/>
                    </div>
                </div>
                 <div>
                    <Skeleton className="h-5 w-1/4 mb-2"/>
                    <div className="space-y-2">
                       <Skeleton className="h-8 w-full rounded-md"/>
                       <Skeleton className="h-8 w-full rounded-md"/>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
  }

  if (!suggestions || (suggestions.suggestedSkills.length === 0 && suggestions.suggestedExperiences.length === 0)) {
    return null;
  }

  return (
    <Card className="bg-accent/50 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                <Lightbulb className="h-6 w-6" />
            </div>
            <div>
                <CardTitle className="font-headline text-lg">Complete Your Profile</CardTitle>
                <CardDescription>Here are some AI-powered suggestions to stand out.</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestions.suggestedSkills.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Suggested Skills</h3>
            <div className="flex flex-wrap gap-2">
              {suggestions.suggestedSkills.map((skill, index) => (
                <Button key={index} variant="secondary" size="sm" className="h-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        )}
        {suggestions.suggestedExperiences.length > 0 && (
          <div>
            <h3 className="font-semibold mb-2">Suggested Experiences</h3>
            <div className="space-y-2">
              {suggestions.suggestedExperiences.map((exp, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-background rounded-md border">
                  <p className="text-sm flex-1 mr-4">{exp}</p>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" /> Add
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
