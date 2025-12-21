
'use client';

import { useState, useEffect } from 'react';
import MainView from '@/components/main-view';
import { AnimatedTitle } from '@/components/animated-title';
import { Skeleton } from '@/components/ui/skeleton';

export type View = 'feed' | 'alumni' | 'students' | 'jobs' | 'events' | 'mentors' | 'profile' | 'search';

function getViewFromPath(path: string): { view: View; id: string | null, query: string | null } {
    const pathParts = path.split('/').filter(Boolean);
    const view = (pathParts[0] as View) || 'feed';

    if (view === 'profile' && pathParts[1]) {
        return { view: 'profile', id: pathParts[1], query: null };
    }
    if (view === 'search') {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        return { view: 'search', id: null, query };
    }

    if (['feed', 'alumni', 'students', 'jobs', 'events', 'mentors'].includes(view)) {
         return { view, id: null, query: null };
    }

    return { view: 'feed', id: null, query: null };
}


export default function Home() {
  const [view, setView] = useState<View>('feed');
  const [profileId, setProfileId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { view: initialView, id: initialId, query: initialQuery } = getViewFromPath(window.location.pathname);
    setView(initialView);
    setProfileId(initialId);
    setSearchQuery(initialQuery);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // Show loading animation for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
        const { view, profileId, searchQuery } = event.state || getViewFromPath(window.location.pathname);
        setView(view);
        setProfileId(profileId);
        setSearchQuery(searchQuery);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
        window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (newView: View, id: string | null = null, query: string | null = null) => {
    let newUrl = `/${newView}`;
    if (newView === 'profile' && id) {
      newUrl = `/profile/${id}`;
    } else if (newView === 'search' && query) {
      newUrl = `/search?q=${encodeURIComponent(query)}`;
    }
    
    const newState = { view: newView, profileId: id, searchQuery: query };
    
    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.pushState(newState, '', newUrl);
    }

    setView(newView);
    setProfileId(id);
    setSearchQuery(query);
    window.scrollTo(0, 0);
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

  return <MainView view={view} profileId={profileId} searchQuery={searchQuery} navigate={navigate} />;
}
