
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
import CreateProfilePage from '@/app/create-profile/page';
import MentorshipsPage from './views/mentorships';
import LoginPage from './views/login';
import SignUpPage from '@/app/signup/page';

type MainViewProps = {
  view: View;
  profileId: string | null;
  searchQuery: string | null;
  navigate: (view: View, id?: string | null, query?: string | null) => void;
};

export default function MainView({ view, profileId, searchQuery, navigate }: MainViewProps) {
  const renderView = () => {
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
      case 'mentorships':
        return <MentorshipsPage navigate={navigate} />;
      case 'profile':
        if (profileId) {
          return <ProfilePage id={profileId} navigate={navigate} />;
        }
        return <FeedPage navigate={navigate} />; // Fallback to feed
      case 'search':
        if (searchQuery !== null) {
          return <SearchView query={searchQuery} navigate={navigate} />;
        }
        return <FeedPage navigate={navigate} />; // Fallback to feed
       case 'login':
        return <LoginPage navigate={navigate} />;
      case 'signup':
        return <SignUpPage navigate={navigate} />;
      default:
        return <FeedPage navigate={navigate} />;
    }
  };

  return (
    <>
      <SiteHeader activeView={view} navigate={navigate} />
      <div className="container mx-auto px-4 py-8 pt-20 md:pt-24">
        {renderView()}
      </div>
    </>
  );
}
