'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import {
  storeToken,
  getStoredToken,
  removeStoredToken,
} from '@/lib/localStorage';

interface UserContextType {
  token: string | null;
  isLoading: boolean;
  refreshToken: () => Promise<void>;
  clearToken: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { getToken, isLoaded: authLoaded, isSignedIn } = useAuth();
  const { isLoaded: userLoaded } = useUser();
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to refresh token
  const refreshToken = useCallback(async () => {
    if (!isSignedIn) {
      setToken(null);
      removeStoredToken();
      return;
    }

    try {
      const freshToken = await getToken();
      if (freshToken) {
        setToken(freshToken);
        storeToken(freshToken);
      } else {
        setToken(null);
        removeStoredToken();
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      setToken(null);
      removeStoredToken();
    }
  }, [getToken, isSignedIn]);

  // Function to clear token
  const clearToken = () => {
    setToken(null);
    removeStoredToken();
  };

  useEffect(() => {
    const initializeToken = async () => {
      if (!authLoaded || !userLoaded) return;

      setIsLoading(true);

      if (isSignedIn) {
        // Try to get stored token first
        const storedToken = getStoredToken();
        if (storedToken) {
          setToken(storedToken);
        }

        // Always refresh to ensure we have a valid token
        await refreshToken();
      } else {
        // User is not signed in
        clearToken();
      }

      setIsLoading(false);
    };

    initializeToken();
  }, [authLoaded, userLoaded, isSignedIn, refreshToken]);

  useEffect(() => {
    if (!isSignedIn || !token) return;

    const refreshInterval = setInterval(refreshToken, 30 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [isSignedIn, refreshToken, token]);

  useEffect(() => {
    const handleFocus = () => {
      if (isSignedIn && token) {
        refreshToken();
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [isSignedIn, refreshToken, token]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'authToken' && e.newValue === null) {
        setToken(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const contextValue: UserContextType = {
    token,
    isLoading,
    refreshToken,
    clearToken,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const useAuthenticatedUser = () => {
  const { user } = useUser();
  const { token, isLoading } = useUserContext();

  return {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
  };
};
