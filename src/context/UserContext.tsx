'use client';
import { createContext, useContext, FC, ReactNode, useState } from 'react';
import axios from 'axios';

type UserContextType = {
  token?: string;
  protectedAxios?: axios.AxiosInstance;
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
  accessToken: string;
}

export const UserContextProvider: FC<Props> = ({ children, accessToken }) => {
  const [token] = useState(accessToken);

  const protectedAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  });

  console.log('token', token);

  return (
    <UserContext.Provider value={{ token, protectedAxios }}>
      {children}
    </UserContext.Provider>
  );
};
