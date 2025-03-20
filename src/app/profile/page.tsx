import React from 'react';
import { getUserInfo } from '@/app/profile/service/getUserInfo';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { ProfileInfo } from '@/app/profile/ProfileInfo';
import { MyCars } from '@/app/profile/MyCars';

export default async function SellerAdmin() {
  let accessToken = null;
  try {
    accessToken = await getAccessToken({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      audience: process.env.AUTH0_AUDIENCE || '',
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {}
  const data = await getUserInfo(accessToken?.accessToken || '');

  console.log('JORDAN', data);
  return (
    <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 pt-20">
      <ProfileInfo {...data} />
      <MyCars listingCounters={data?.listingCounters} />
    </main>
  );
}
