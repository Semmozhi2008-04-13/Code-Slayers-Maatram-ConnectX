
'use client';

import Home from '@/app/page';

// This is a catch-all route that ensures any URL will load the main app.
// The main Home component will then handle displaying the correct view based on the URL.
export default function CatchAllPage() {
  return <Home />;
}
