import React from 'react';
import { BackButton } from '@/components/Layout/BackButton';
import { Navigation } from '@/sections/header/Navigation';

export const Header = () => {
  return (
    <header className="flex justify-between items-center py-3 px-2 gap-4 fixed top-0 z-30 w-full bg-white">
      <BackButton />
      {/* <Suspense fallback={<></>}>
        <AutoFilters />
      </Suspense> */}
      {/* <ProfileMenu /> */}
      <Navigation />
    </header>
  );
};
