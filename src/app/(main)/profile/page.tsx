import React from 'react';
import { getUserInfo } from '@/app/(main)/profile/service/getUserInfo';
import { ProfileInfo } from '@/app/(main)/profile/ProfileInfo';
import { MyCars } from '@/app/(main)/profile/MyCars';

export default async function SellerAdmin() {
  const data = await getUserInfo();

  return (
    <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 pt-20">
      <ProfileInfo {...data?.account} />
      <MyCars listingCounters={data?.counts} />
    </main>
  );
}
