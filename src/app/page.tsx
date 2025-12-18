
'use client';

import { useState, useEffect } from 'react';
import MainView from '@/components/main-view';
import { AnimatedTitle } from '@/components/animated-title';
import { Skeleton } from '@/components/ui/skeleton';

export type View = 'feed' | 'alumni' | 'students' | 'jobs' | 'events' | 'mentors' | 'profile';

export default function Home() {
  const [view, setView] = useState<View>('feed');
  const [profileId, setProfileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Show loading animation for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  const navigate = (newView: View, id: string | null = null) => {
    setView(newView);
    setProfileId(id);
    window.scrollTo(0, 0); // Scroll to top on view change
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-primary p-4">
        <AnimatedTitle text="Maatram ConnectX" />
        <div className="mt-4 flex items-center space-x-2">
            <Skeleton className="h-4 w-4 rounded-full animate-pulse" style={{ animationDelay: '0.2s'}}/>
            <Skeleton className="h-4 w-4 rounded-full animate-pulse" style={{ animationDelay: '0.4s'}}/>
            <Skeleton className="h-4 w-4 rounded-full animate-pulse" style={{ animationDelay: '0.6s'}}/>
        </div>
      </div>
    );
  }

  return <MainView view={view} profileId={profileId} navigate={navigate} />;
}
