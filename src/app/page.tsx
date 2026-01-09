
'use client';

import { useState, useEffect } from 'react';
import MainView from '@/components/main-view';
import { AnimatedTitle } from '@/components/animated-title';
import { Skeleton } from '@/components/ui/skeleton';
import { useFirebase } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import LoginPage from '@/components/views/login';
import CreateProfilePage from '@/app/create-profile/page';
import VerifyEmail from '@/components/views/verify-email';
import { useToast } from '@/hooks/use-toast';

export type View =
  | 'feed'
  | 'alumni'
  | 'students'
  | 'jobs'
  | 'events'
  | 'mentors'
  | 'mentorships'
  | 'profile'
  | 'search'
  | 'login'
  | 'signup'
  | 'verify-email';

function getViewFromPath(path: string): {
  view: View;
  id: string | null;
  query: string | null;
} {
  if (typeof window === 'undefined') {
    return { view: 'feed', id: null, query: null };
  }

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
  
  if (['login', 'signup'].includes(view)) {
    return { view, id: null, query: null };
  }


  if (
    [
      'feed',
      'alumni',
      'students',
      'jobs',
      'events',
      'mentors',
      'mentorships',
      'verify-email'
    ].includes(view)
  ) {
    return { view, id: null, query: null };
  }

  return { view: 'feed', id: null, query: null };
}

type AppState = 'loading' | 'login' | 'verify-email' | 'create-profile' | 'app';


export default function Home() {
  const { user, isUserLoading, firestore } = useFirebase();
  const { toast } = useToast();

  const [currentView, setCurrentView] = useState<View>('feed');
  const [profileId, setProfileId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppState>('loading');
  
  // This effect handles the main routing logic and state transitions
  useEffect(() => {
    const handleState = async () => {
      if (isUserLoading) {
        setAppState('loading');
        return;
      }

      if (!user) {
        setAppState('login');
        const { view } = getViewFromPath(window.location.pathname);
        if (view === 'signup') {
            navigate('signup');
        } else {
            navigate('login');
        }
        return;
      }

      if (user && !user.emailVerified) {
        setAppState('verify-email');
        navigate('verify-email');
        return;
      }

      // User is logged in and email is verified, check for profile
      try {
        const userDocRef = doc(firestore, 'userProfiles', user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setAppState('app');
           const {
            view: pathView,
            id: pathId,
            query: pathQuery,
          } = getViewFromPath(window.location.pathname);
          navigate(pathView, pathId, pathQuery);
        } else {
          setAppState('create-profile');
        }
      } catch (error) {
        console.error('Error checking user profile:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not load your profile. Please try again later.'
        });
        setAppState('login');
      }
    };

    handleState();
  }, [user, isUserLoading, firestore]);

  // This effect handles browser back/forward navigation
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const { view, id, query } = event.state || getViewFromPath(window.location.pathname);
      setCurrentView(view);
      setProfileId(id);
      setSearchQuery(query);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (
    newView: View,
    id: string | null = null,
    query: string | null = null
  ) => {
    let newUrl = `/${newView}`;
    if (newView === 'profile' && id) {
      newUrl = `/profile/${id}`;
    } else if (newView === 'search' && query) {
      newUrl = `/search?q=${encodeURIComponent(query)}`;
    } else if (newView === 'feed') {
      newUrl = `/`;
    }

    const newState = { view: newView, id: id, query: query };

    const currentUrl = typeof window !== 'undefined' ? window.location.pathname + window.location.search : '';

    if (currentUrl !== newUrl) {
        // Only push state if the URL is actually changing
        if (newView === 'login' || newView === 'signup' || newView === 'verify-email') {
             window.history.replaceState(newState, '', newUrl);
        } else {
             window.history.pushState(newState, '', newUrl);
        }
    }
    
    setCurrentView(newView);
    setProfileId(id);
    setSearchQuery(query);
    if (typeof window !== 'undefined' && ['feed', 'profile', 'search'].includes(newView)) window.scrollTo(0, 0);
  };
  
  const onProfileCreated = () => {
    setAppState('app');
    navigate('feed');
  }

  const renderContent = () => {
    switch(appState) {
        case 'loading':
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-background text-primary p-4">
                <AnimatedTitle text="Maatram ConnectX" />
                <div className="mt-4 flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}/>
                    <Skeleton className="h-4 w-4 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}/>
                    <Skeleton className="h-4 w-4 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}/>
                </div>
                </div>
            );
        case 'login':
            return <LoginPage navigate={navigate} />;
        case 'verify-email':
            return <VerifyEmail />;
        case 'create-profile':
            return <CreateProfilePage onProfileCreated={onProfileCreated} />;
        case 'app':
            return <MainView view={currentView} profileId={profileId} searchQuery={searchQuery} navigate={navigate} />;
        default:
             return <LoginPage navigate={navigate} />;

    }
  };

  return <>{renderContent()}</>;
}
