'use client';
import { createContext, useContext, FC, ReactNode, useEffect } from 'react';
import { removeStoredToken, storeToken } from '@/lib/localStorage';
import { useGetMe } from '@/context/UserContext/service/getMe';
import { useUser as useAuth0User } from '@auth0/nextjs-auth0/client';
import { Me } from '@/types/Me';

type UserContextType = {
  user?: Me;
  isLoading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserContext');
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const UserContextProvider: FC<Props> = ({ children }) => {
  const { user: auth0User, isLoading: isLoadingAuth0User } = useAuth0User();
  const { data, isFetching } = useGetMe(!!auth0User?.sub);
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch('/api/token');
        const token = await res.json();
        console.log(token);
        if (token) {
          storeToken(token);
        } else {
          removeStoredToken();
        }
      } catch {}
    };

    fetchToken();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: data,
        isLoading: isLoadingAuth0User || isFetching,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
