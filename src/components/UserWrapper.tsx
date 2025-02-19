import { ReactNode } from 'react';
import { UserContextProvider } from '@/context/UserContext';
import { getAccessToken } from '@auth0/nextjs-auth0';

interface Props {
  children: ReactNode;
}
export const UserWrapper = async (props: Props) => {
  const { children } = props;
  let accessToken = null;

  try {
    accessToken = await getAccessToken({
      // @ts-ignore
      audience: process.env.AUTH0_AUDIENCE || '',
    });
  } catch (error) {}

  return (
    <UserContextProvider accessToken={accessToken?.accessToken || ''}>
      {children}
    </UserContextProvider>
  );
};
