
'use client';

import { useState, useEffect } from 'react';
import MainView from '@/components/main-view';
import { AnimatedTitle } from '@/components/animated-title';
import { Skeleton } from '@/components/ui/skeleton';
import LoginPage from '@/components/views/login';

export type View = 'feed' | 'alumni' | 'students' | 'jobs' | 'events' | 'mentors' | 'profile' | 'search' | 'login';

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

    if (['feed', 'alumni', 'students', 'jobs', 'events', 'mentors', 'login'].includes(view)) {
         return { view, id: null, query: null };
    }

    return { view: 'feed', id: null, query: null };
}


export default function Home() {
  const [view, setView] = useState<View>('login');
  const [profileId, setProfileId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate checking auth status
    const authTimer = setTimeout(() => {
        // In a real app, you would check a token here.
        // For this demo, we'll just show the login page first.
        setLoading(false); 
    }, 2500);

    return () => clearTimeout(authTimer);
  }, []);

  useEffect(() => {
    if(isAuthenticated) {
        const { view: initialView, id: initialId, query: initialQuery } = getViewFromPath(window.location.pathname);
        setView(initialView === 'login' ? 'feed' : initialView);
        setProfileId(initialId);
        setSearchQuery(initialQuery);
    } else {
        setView('login');
    }

    const handlePopState = (event: PopStateEvent) => {
        if(isAuthenticated){
            const { view, profileId, searchQuery } = event.state || getViewFromPath(window.location.pathname);
            setView(view);
            setProfileId(profileId);
            setSearchQuery(searchQuery);
        }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
        window.removeEventListener('popstate', handlePopState);
    };
  }, [isAuthenticated]);

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

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate('feed');
  }


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

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return <MainView view={view} profileId={profileId} searchQuery={searchQuery} navigate={navigate} />;
}
