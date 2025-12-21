
'use client';

import { SiteHeader } from '@/components/site-header';
import FeedPage from '@/components/views/feed';
import AlumniPage from '@/components/views/alumni';
import StudentsPage from '@/components/views/students';
import JobsPage from '@/components/views/jobs';
import EventsPage from '@/components/views/events';
import MentorsPage from '@/components/views/mentors';
import ProfilePage from '@/components/views/profile';
import SearchView from '@/components/views/search';
import type { View } from '@/app/page';

type MainViewProps = {
  view: View;
  profileId: string | null;
  searchQuery: string | null;
  navigate: (view: View, id?: string | null, query?: string | null) => void;
};

export default function MainView({ view, profileId, searchQuery, navigate }: MainViewProps) {
  const renderView = () => {
    if (view === 'profile' && profileId) {
      return <ProfilePage id={profileId} navigate={navigate} />;
    }
    if (view === 'search' && searchQuery) {
      return <SearchView query={searchQuery} navigate={navigate} />;
    }

    switch (view) {
      case 'feed':
        return <FeedPage navigate={navigate} />;
      case 'alumni':
        return <AlumniPage navigate={navigate} />;
      case 'students':
        return <StudentsPage navigate={navigate} />;
      case 'jobs':
        return <JobsPage />;
      case 'events':
        return <EventsPage />;
      case 'mentors':
        return <MentorsPage navigate={navigate} />;
      default:
        const path = typeof window !== 'undefined' ? window.location.pathname.substring(1) : '';
        if (['alumni', 'students', 'jobs', 'events', 'mentors'].includes(path)) {
            navigate(path as View);
            return null;
        }
        return <FeedPage navigate={navigate} />;
    }
  };

  return (
    <>
      <SiteHeader activeView={view} navigate={navigate} />
      <div className="container mx-auto px-4 py-8 pt-20 md:pt-24">{renderView()}</div>
    </>
  );
}
