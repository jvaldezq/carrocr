import { cache } from 'react';
import { getSession } from '@auth0/nextjs-auth0';
import jwt from 'jsonwebtoken';

interface ServerApiProps {
  path: string;
  params?: any; //TODO NEED TO FIX TYPE
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  revalidate?: number;
}

const getCachedSession = cache(async () => {
  return await getSession();
});

export const serverApi = async (props: ServerApiProps) => {
  try {
    const user = await getCachedSession();
    const secret = process.env.NEXT_CUSTOM_JWT_SECRET as string;
    const payload = { ...user };
    const token = jwt.sign(payload, secret, { expiresIn: 900 });
    const { path, params, method = 'GET', revalidate = 60 } = props;
    const parameters = params
      ? `?${new URLSearchParams(params).toString()}`
      : '';

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${path}${parameters}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method,
        next: { revalidate },
      },
    );

    if (!res.ok) {
      console.error(res);
      throw new Error(`Failed to fetch data from ${path}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
