import axios, { InternalAxiosRequestConfig } from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// A function that will be provided at runtime from the client
// to fetch a fresh auth token (e.g., from Clerk) on every request.
let tokenProvider: null | (() => Promise<string | null | undefined>) = null;

export const setTokenProvider = (
  provider: null | (() => Promise<string | null | undefined>),
) => {
  tokenProvider = provider;
};

api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  try {
    const token = tokenProvider ? await tokenProvider() : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else if (config.headers && 'Authorization' in config.headers) {
      // Ensure we don't send a stale header when no token is available
      delete (config.headers as Record<string, unknown>).Authorization;
    }
  } catch (_) {
    // If token retrieval fails, proceed without auth header
  }
  return config;
});
