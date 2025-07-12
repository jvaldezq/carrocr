import React from 'react';
import { UserProfile } from '@clerk/nextjs';

export default function Profile() {
  return (
    <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 py-10 flex flex-col justify-center items-center">
      <UserProfile routing='hash'/>
    </main>
  );
}
