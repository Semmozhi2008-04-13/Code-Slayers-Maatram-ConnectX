
'use client';

import { MOCK_USERS, MOCK_POSTS, MOCK_JOBS } from '@/lib/data';
import { UserCard } from '@/components/user-card';
import PostCard from '@/components/feed/post-card';
import { JobCard } from '@/components/job-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { View } from '@/app/page';

type SearchViewProps = {
  query: string;
  navigate: (view: View, id?: string | null) => void;
};

export default function SearchView({ query, navigate }: SearchViewProps) {
  const lowercasedQuery = query.toLowerCase();

  const filteredUsers = MOCK_USERS.filter(user => 
    user.name.toLowerCase().includes(lowercasedQuery) ||
    user.headline.toLowerCase().includes(lowercasedQuery) ||
    user.skills.some(skill => skill.toLowerCase().includes(lowercasedQuery))
  );

  const filteredPosts = MOCK_POSTS.filter(post => 
    post.content.toLowerCase().includes(lowercasedQuery) ||
    post.author.name.toLowerCase().includes(lowercasedQuery)
  );

  const filteredJobs = MOCK_JOBS.filter(job => 
    job.title.toLowerCase().includes(lowercasedQuery) ||
    job.company.toLowerCase().includes(lowercasedQuery)
  );

  const totalResults = filteredUsers.length + filteredPosts.length + filteredJobs.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Search Results</h1>
        <p className="text-muted-foreground">
          Found {totalResults} results for "{query}"
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="people">People ({filteredUsers.length})</TabsTrigger>
          <TabsTrigger value="posts">Posts ({filteredPosts.length})</TabsTrigger>
          <TabsTrigger value="jobs">Jobs ({filteredJobs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-6">
            {totalResults === 0 ? (
                 <div className="text-center py-16">
                    <p className="text-muted-foreground">No results found for "{query}".</p>
                    <p className="text-sm text-muted-foreground">Try searching for something else.</p>
                </div>
            ) : (
                <>
                    {filteredUsers.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold font-headline mb-4">People</h2>
                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredUsers.slice(0,4).map(user => <UserCard key={user.id} user={user} navigate={navigate} />)}
                            </div>
                        </section>
                    )}
                    {filteredPosts.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold font-headline mb-4">Posts</h2>
                            <div className="space-y-4">
                                {filteredPosts.slice(0,3).map(post => <PostCard key={post.id} post={post} navigate={navigate} />)}
                            </div>
                        </section>
                    )}
                     {filteredJobs.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold font-headline mb-4">Jobs</h2>
                            <div className="space-y-4">
                                {filteredJobs.slice(0,3).map(job => <JobCard key={job.id} job={job} />)}
                            </div>
                        </section>
                    )}
                </>
            )}
        </TabsContent>
        
        <TabsContent value="people" className="mt-6">
           {filteredUsers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredUsers.map(user => <UserCard key={user.id} user={user} navigate={navigate} />)}
                </div>
           ) : (
               <div className="text-center py-16">
                 <p className="text-muted-foreground">No people found matching your search.</p>
               </div>
           )}
        </TabsContent>

        <TabsContent value="posts" className="mt-6">
             {filteredPosts.length > 0 ? (
                <div className="max-w-2xl mx-auto space-y-4">
                    {filteredPosts.map(post => <PostCard key={post.id} post={post} navigate={navigate} />)}
                </div>
             ) : (
                <div className="text-center py-16">
                    <p className="text-muted-foreground">No posts found matching your search.</p>
                </div>
             )}
        </TabsContent>

        <TabsContent value="jobs" className="mt-6">
            {filteredJobs.length > 0 ? (
                 <div className="space-y-4">
                    {filteredJobs.map(job => <JobCard key={job.id} job={job} />)}
                </div>
            ) : (
                 <div className="text-center py-16">
                    <p className="text-muted-foreground">No jobs found matching your search.</p>
                </div>
            )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
