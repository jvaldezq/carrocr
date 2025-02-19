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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      audience: process.env.AUTH0_AUDIENCE || '',
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {}

  return (
    <UserContextProvider accessToken={accessToken?.accessToken || ''}>
      {children}
    </UserContextProvider>
  );
};
