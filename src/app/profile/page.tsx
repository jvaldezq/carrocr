import React from 'react';
import { getUserInfo } from '@/app/profile/service/getUserInfo';
import { getAccessToken } from '@auth0/nextjs-auth0';
import { ProfileInfo } from '@/app/profile/ProfileInfo';
import { Tabs } from '@/components/Tabs';
import { PencilLine, ListTodo, Frown, UserCheck } from 'lucide-react';

export default async function SellerAdmin() {
  // const session = await getSession();
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

  console.log('data', data);
  // console.log('session', session);

  const options = [
    {
      title: (
        <div className="flex gap-1 items-center">
          <UserCheck className="h-5 w-5" />
          Publicados
        </div>
      ),
      value: 'published',
      content: <>Hello</>,
    },
    {
      title: (
        <div className="flex gap-1 items-center">
          <PencilLine className="h-5 w-5" />
          En edición
        </div>
      ),
      value: 'drafts',
      content: <>Hello</>,
    },
    {
      title: (
        <div className="flex gap-1 items-center">
          <ListTodo className="h-5 w-5" />
          En revisión
        </div>
      ),
      value: 'pending',
      content: <>Hello</>,
    },
    {
      title: (
        <div className="flex gap-1 items-center">
          <Frown className="h-5 w-5" />
          Denegados
        </div>
      ),
      value: 'denied',
      content: <>Hello</>,
    },
  ];

  return (
    <main className="min-h-dvh max-w-screen-2xl mx-auto px-2 pt-20">
      <ProfileInfo {...data} />
      <Tabs
        options={options}
        defaultValue="published"
        ariaLabel="profile-cars"
      />
    </main>
  );
}
