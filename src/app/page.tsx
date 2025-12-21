
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
    // Navigate to feed view if the path is empty
    if (window.location.pathname === '/') {
        setView('feed');
        setProfileId(null);
    }
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Show loading animation for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
        const { view, profileId } = event.state || { view: 'feed', profileId: null };
        setView(view);
        setProfileId(profileId);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
        window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (newView: View, id: string | null = null) => {
    const newUrl = newView === 'profile' && id ? `/profile/${id}` : `/${newView}`;
    const newState = { view: newView, profileId: id };
    
    // Only push state if it's different from the current state to avoid duplicates
    if (window.location.pathname !== newUrl) {
      window.history.pushState(newState, '', newUrl);
    }

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
