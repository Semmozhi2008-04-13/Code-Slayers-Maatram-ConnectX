
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Home from '@/app/page';

export default function ProfileRedirectPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page which will handle the profile view
    const newUrl = `/`;
    window.history.replaceState({ view: 'profile', profileId: params.id }, '', `/profile/${params.id}`);
    router.replace(newUrl);
  }, [params.id, router]);

  // This will render the main page which will then show the profile view
  return <Home />;
}
