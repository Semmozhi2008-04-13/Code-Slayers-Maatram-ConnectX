
'use client';

import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, or, orderBy, limit } from 'firebase/firestore';
import { UserCard } from '@/components/user-card';
import PostCard from '@/components/feed/post-card';
import { JobCard } from '@/components/job-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { View } from '@/app/page';
import type { User, Post, Job } from '@/lib/types';
import { useMemo } from 'react';

type SearchViewProps = {
  query: string;
  navigate: (view: View, id?: string | null) => void;
};

export default function SearchView({ query: searchQuery, navigate }: SearchViewProps) {
  const firestore = useFirestore();

  const peopleQuery = useMemoFirebase(() => {
    if (!searchQuery) return null;
    return query(
      collection(firestore, "userProfiles"),
      // This is a simple prefix match. For full-text search, a dedicated
      // service like Algolia or Typesense would be better.
      orderBy('firstName'),
      where('firstName', '>=', searchQuery),
      where('firstName', '<=', searchQuery + '\uf8ff'),
      limit(20)
    );
  }, [firestore, searchQuery]);

  const postsQuery = useMemoFirebase(() => {
    if (!searchQuery) return null;
    return query(
      collection(firestore, "posts"),
      // Firestore doesn't support full-text search on content. 
      // This will be empty without a proper search index.
      // where('content', '>=', searchQuery), where('content', '<=', searchQuery + '\uf8ff')
      limit(20)
    );
  }, [firestore, searchQuery]);
  
  const jobsQuery = useMemoFirebase(() => {
    if (!searchQuery) return null;
     return query(
      collection(firestore, "jobs"),
      orderBy('title'),
      where('title', '>=', searchQuery),
      where('title', '<=', searchQuery + '\uf8ff'),
      limit(20)
    );
  }, [firestore, searchQuery]);


  const { data: users, isLoading: usersLoading } = useCollection<User>(peopleQuery);
  const { data: posts, isLoading: postsLoading } = useCollection<Post>(postsQuery);
  const { data: jobs, isLoading: jobsLoading } = useCollection<Job>(jobsQuery);
  
  // This is a client-side filter because Firestore doesn't support OR queries
  // on different fields with inequality operators, or full-text search.
  const filteredPosts = useMemo(() => {
    if (!posts || !searchQuery) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return posts.filter(post => post.content.toLowerCase().includes(lowerQuery));
  }, [posts, searchQuery]);
  
  const totalResults = (users?.length || 0) + (filteredPosts?.length || 0) + (jobs?.length || 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Search Results</h1>
        <p className="text-muted-foreground">
          Found {totalResults} results for "{searchQuery}"
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="people">People ({users?.length || 0})</TabsTrigger>
          <TabsTrigger value="posts">Posts ({filteredPosts?.length || 0})</TabsTrigger>
          <TabsTrigger value="jobs">Jobs ({jobs?.length || 0})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-6">
            {totalResults === 0 ? (
                 <div className="text-center py-16">
                    <p className="text-muted-foreground">No results found for "{searchQuery}".</p>
                    <p className="text-sm text-muted-foreground">Try searching for something else.</p>
                </div>
            ) : (
                <>
                    {users && users.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold font-headline mb-4">People</h2>
                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {users.slice(0,4).map(user => <UserCard key={user.id} user={user} navigate={navigate} />)}
                            </div>
                        </section>
                    )}
                    {filteredPosts && filteredPosts.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold font-headline mb-4">Posts</h2>
                            <div className="space-y-4">
                                {filteredPosts.slice(0,3).map(post => <PostCard key={post.id} post={post} navigate={navigate} />)}
                            </div>
                        </section>
                    )}
                     {jobs && jobs.length > 0 && (
                        <section>
                            <h2 className="text-2xl font-bold font-headline mb-4">Jobs</h2>
                            <div className="space-y-4">
                                {jobs.slice(0,3).map(job => <JobCard key={job.id} job={job} />)}
                            </div>
                        </section>
                    )}
                </>
            )}
        </TabsContent>
        
        <TabsContent value="people" className="mt-6">
           {users && users.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {users.map(user => <UserCard key={user.id} user={user} navigate={navigate} />)}
                </div>
           ) : (
               <div className="text-center py-16">
                 <p className="text-muted-foreground">No people found matching your search.</p>
               </div>
           )}
        </TabsContent>

        <TabsContent value="posts" className="mt-6">
             {filteredPosts && filteredPosts.length > 0 ? (
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
            {jobs && jobs.length > 0 ? (
                 <div className="space-y-4">
                    {jobs.map(job => <JobCard key={job.id} job={job} />)}
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
