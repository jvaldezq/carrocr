import React from 'react';
import { UserProfile } from '@clerk/nextjs';

export default function Profile() {
  return (
    <main className="max-w-screen-xl min-h-[calc(100dvh-450px)] mx-auto px-2 py-20 flex flex-col justify-center items-center">
      <UserProfile routing='hash'/>
    </main>
  );
}
