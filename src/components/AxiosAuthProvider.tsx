'use client';

import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { setTokenProvider } from '@/lib/axios';

/**
 * Plugs Clerk's getToken into our axios instance so each
 * client request uses a fresh short-lived token.
 */
export function AxiosAuthProvider() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    // Provide a function that axios will call before each request
    setTokenProvider(async () => {
      if (!isLoaded || !isSignedIn) return null;
      try {
        // Skip cache; tokens are very short-lived (~30s)
        const token = await getToken({
          skipCache: true,
          leewayInSeconds: 30,
          template: 'default',
        });
        return token ?? null;
      } catch {
        return null;
      }
    });

    // Cleanup on unmount
    return () => setTokenProvider(null);
  }, [getToken, isLoaded, isSignedIn]);

  return null;
}

