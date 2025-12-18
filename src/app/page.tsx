
'use client';

import { useState } from 'react';
import MainView from '@/components/main-view';

export type View = 'feed' | 'alumni' | 'students' | 'jobs' | 'events' | 'mentors' | 'profile';

export default function Home() {
  const [view, setView] = useState<View>('feed');
  const [profileId, setProfileId] = useState<string | null>(null);

  const navigate = (newView: View, id: string | null = null) => {
    setView(newView);
    setProfileId(id);
    window.scrollTo(0, 0); // Scroll to top on view change
  };

  return <MainView view={view} profileId={profileId} navigate={navigate} />;
}
