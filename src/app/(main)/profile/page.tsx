import React from 'react';
import { ProfileInfo } from '@/app/(main)/profile/ProfileInfo';
import { MyCars } from '@/app/(main)/profile/MyCars';
import { redirect } from 'next/navigation';
import { getRedirectPathFromErrorCode } from '@/lib/getRedirectPathFromErrorCode';
import { getUserInfo } from '@/app/(main)/profile/service/getUserInfo';

export default async function ProfileAdmin() {
  const { data, status } = await getUserInfo();

  if (status) redirect(getRedirectPathFromErrorCode(status));

  return (
    <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 pt-20">
      <ProfileInfo {...data?.account} />
      <MyCars listingCounters={data?.counts} />
    </main>
  );
}
