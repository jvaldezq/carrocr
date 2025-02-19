'use client';
import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
  useEffect,
} from 'react';

type UserContextType = {};

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
  accessToken: string;
}

export const UserContextProvider: FC<Props> = ({ children, accessToken }) => {
  const [token, setToken] = useState(accessToken);

  useEffect(() => {
    if (token) {
      localStorage.setItem(
        process.env.NEXT_PUBLIC_LOCAL_STORAGE_TOKEN || 'carrocr_token',
        token,
      );
    }
  }, [token]);

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};
