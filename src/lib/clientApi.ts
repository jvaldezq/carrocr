'use client';
import axios from 'axios';

let token;

if (typeof window !== 'undefined') {
  token = localStorage.getItem(
    process.env.NEXT_PUBLIC_LOCAL_STORAGE_TOKEN || 'carrocr_token',
  );
}

export const clientApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const protectedAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
