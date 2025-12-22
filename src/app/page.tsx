'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MainView from '@/components/main-view';
import { AnimatedTitle } from '@/components/animated-title';
import { Skeleton } from '@/components/ui/skeleton';
import LoginPage from '@/components/views/login';
import { useUser, useFirestore } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import CreateProfilePage from '@/app/create-profile/page';
import PhoneVerificationPage from '@/app/phone-verification/page';
import SignUpPage from '@/app/signup/page';

export type View =
  | 'feed'
  | 'alumni'
  | 'students'
  | 'jobs'
  | 'events'
  | 'mentors'
  | 'profile'
  | 'search'
  | 'login'
  | 'signup'
  | 'create-profile'
  | 'phone-verification';

function getViewFromPath(path: string): {
  view: View;
  id: string | null;
  query: string | null;
} {
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
      'login',
      'signup',
      'create-profile',
      'phone-verification',
    ].includes(view)
  ) {
    return { view, id: null, query: null };
  }

  return { view: 'feed', id: null, query: null };
}

export default function Home() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const [view, setView] = useState<View>('login');
  const [profileId, setProfileId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const [appLoading, setAppLoading] = useState(true);
  const [profileExists, setProfileExists] = useState<boolean | null>(null);
  const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentPath = window.location.pathname;
    const {
      view: initialView,
      id: initialId,
      query: initialQuery,
    } = getViewFromPath(currentPath);

    const handleState = async () => {
      setAppLoading(true);

      if (isUserLoading) {
        return;
      }

      if (!user) {
        // Not authenticated
        if (initialView === 'signup') {
          navigate('signup');
        } else {
          navigate('login');
        }
        setAppLoading(false);
        return;
      }

      // Authenticated: check phone, then profile
      if (!user.phoneNumber) {
        setIsPhoneNumberVerified(false);
        navigate('phone-verification');
        setAppLoading(false);
        return;
      }
      setIsPhoneNumberVerified(true);

      const userDocRef = doc(firestore, 'userProfiles', user.uid);
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setProfileExists(true);
          // Profile exists, show the intended page or default to feed
          if (
            initialView === 'login' ||
            initialView === 'signup' ||
            initialView === 'create-profile' ||
            initialView === 'phone-verification'
          ) {
            navigate('feed');
          } else {
            navigate(initialView, initialId, initialQuery);
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

    const handlePopState = (event: PopStateEvent) => {
      const { view, id, query } =
        event.state || getViewFromPath(window.location.pathname);
      setView(view);
      setProfileId(id);
      setSearchQuery(query);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [user, isUserLoading]);

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

    const newState = { view: newView, profileId: id, searchQuery: query };

    if (
      typeof window !== 'undefined' &&
      window.location.pathname + window.location.search !== newUrl
    ) {
      window.history.pushState(newState, '', newUrl);
    }

    setView(newView);
    setProfileId(id);
    setSearchQuery(query);
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
  };

  const renderContent = () => {
    if (appLoading || isUserLoading) {
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

    if (!user) {
      if (view === 'signup') {
        return <SignUpPage navigate={navigate} />;
      }
      return <LoginPage onLoginSuccess={() => {}} navigate={navigate} />;
    }

    if (!isPhoneNumberVerified) {
      return <PhoneVerificationPage onVerificationSuccess={() => setIsPhoneNumberVerified(true)} />;
    }

    if (!profileExists) {
      return <CreateProfilePage onProfileCreated={() => setProfileExists(true)} />;
    }

    return (
      <MainView
        view={view}
        profileId={profileId}
        searchQuery={searchQuery}
        navigate={navigate}
      />
    );
  };

  return <>{renderContent()}</>;
}
