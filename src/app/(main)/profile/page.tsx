import React from 'react';
import { ProfileInfo } from '@/app/(main)/profile/ProfileInfo';
import { redirect } from 'next/navigation';
import { getRedirectPathFromErrorCode } from '@/lib/getRedirectPathFromErrorCode';
import { getUser } from '@/app/(main)/profile/service/getUserInfo';
import { getSession } from '@auth0/nextjs-auth0';

export default async function ProfileAdmin() {
  await getSession();
  const { data, status } = await getUser();
  console.log('data', data);

  if (status) redirect(getRedirectPathFromErrorCode(status));

  return (
    <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 pt-20">
      <ProfileInfo {...data} />
      {/*<MyCars listingCounters={data?.counts} />*/}
    </main>
  );
}
