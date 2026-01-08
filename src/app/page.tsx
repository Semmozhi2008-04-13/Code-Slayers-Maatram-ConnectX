
'use client';

import { useState, useEffect } from 'react';
import MainView from '@/components/main-view';
import { AnimatedTitle } from '@/components/animated-title';
import { Skeleton } from '@/components/ui/skeleton';
import LoginPage from '@/components/views/login';
import { useUser, useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import CreateProfilePage from '@/app/create-profile/page';
import SignUpPage from '@/app/signup/page';


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
  | 'create-profile';

function getViewFromPath(path: string): {
  view: View;
  id: string | null;
  query: string | null;
} {
  if (typeof window === 'undefined') {
    return { view: 'login', id: null, query: null };
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

  if (
    [
      'feed',
      'alumni',
      'students',
      'jobs',
      'events',
      'mentors',
      'mentorships',
      'login',
      'signup',
      'create-profile',
    ].includes(view)
  ) {
    return { view, id: null, query: null };
  }

  return { view: 'feed', id: null, query: null };
}

export default function Home() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();

  const [currentView, setCurrentView] = useState<View>('login');
  const [profileId, setProfileId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [appLoading, setAppLoading] = useState(true);
  const [profileExists, setProfileExists] = useState<boolean | null>(null);
  
  // This effect handles the initial routing logic and state transitions
  useEffect(() => {
    const handleState = async () => {
        if (isUserLoading) {
            setAppLoading(true);
            return;
        }

        const {
            view: pathView,
            id: pathId,
            query: pathQuery,
        } = getViewFromPath(window.location.pathname);

        if (!user) {
            // Not authenticated
            setAppLoading(false);
            const targetView = pathView === 'signup' ? 'signup' : 'login';
            navigate(targetView);
            return;
        }

        // Authenticated: check for profile
        try {
            const userDocRef = doc(firestore, 'userProfiles', user.uid);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                setProfileExists(true);
                // Profile exists, show the intended page or default to feed
                if (
                    ['login', 'signup', 'create-profile'].includes(pathView)
                ) {
                    navigate('feed');
                } else {
                    navigate(pathView, pathId, pathQuery);
                }
            } else {
                setProfileExists(false);
                navigate('create-profile');
            }
        } catch (error) {
            console.error('Error checking user profile:', error);
            navigate('login'); // Fallback
        } finally {
            setAppLoading(false);
        }
    };
    
    handleState();
  }, [user, isUserLoading]);

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

    if (newView !== 'login' && newView !== 'signup' && currentUrl !== newUrl) {
        window.history.pushState(newState, '', newUrl);
    } else if ((newView === 'login' || newView === 'signup') && currentUrl !== '/') {
         window.history.pushState(newState, '', newView === 'login' ? '/' : '/signup');
    }


    setCurrentView(newView);
    setProfileId(id);
    setSearchQuery(query);
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  };

  const renderContent = () => {
    if (appLoading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-primary p-4">
          <AnimatedTitle text="Maatram ConnectX" />
          <div className="mt-4 flex items-center space-x-2">
            <Skeleton
              className="h-4 w-4 rounded-full animate-pulse"
              style={{ animationDelay: '0.2s' }}
            />
            <Skeleton
              className="h-4 w-4 rounded-full animate-pulse"
              style={{ animationDelay: '0.4s' }}
            />
            <Skeleton
              className="h-4 w-4 rounded-full animate-pulse"
              style={{ animationDelay: '0.6s' }}
            />
          </div>
        </div>
      );
    }
    
    if (currentView === 'login') {
      return <LoginPage navigate={navigate} />;
    }
    if (currentView === 'signup') {
      return <SignUpPage navigate={navigate} />;
    }
    if (currentView === 'create-profile') {
      return <CreateProfilePage onProfileCreated={() => {
        setProfileExists(true);
        navigate('feed');
      }} />;
    }

    // If we've reached here, the user should be authenticated and have a profile.
    // If not, something is wrong, but we can still try to render the main view.
    if (user && profileExists) {
        return (
          <MainView
              view={currentView}
              profileId={profileId}
              searchQuery={searchQuery}
              navigate={navigate}
          />
        );
    }
    
    // Fallback loading state while things resolve
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-primary p-4">
          <AnimatedTitle text="Maatram ConnectX" />
          <div className="mt-4 flex items-center space-x-2">
            <Skeleton
              className="h-4 w-4 rounded-full animate-pulse"
              style={{ animationDelay: '0.2s' }}
            />
            <Skeleton
              className="h-4 w-4 rounded-full animate-pulse"
              style={{ animationDelay: '0.4s' }}
            />
            <Skeleton
              className="h-4 w-4 rounded-full animate-pulse"
              style={{ animationDelay: '0.6s' }}
            />
          </div>
        </div>
      );
  };

  return <>{renderContent()}</>;
}
