import React, { Suspense } from 'react';
import { ProfileMenu } from '@/components/Layout/ProfileMenu';
import { BackButton } from '@/components/Layout/BackButton';
import { AutoFilters } from '@/components/Layout/AutoFilters/AutoFilters';

export const Header = () => {
  return (
    <header className="flex justify-between items-center py-3 px-2 gap-4 fixed top-0 z-30 w-full bg-white">
      <BackButton />
      <Suspense fallback={<></>}>
        <AutoFilters />
      </Suspense>
      <ProfileMenu />
    </header>
  );
};
