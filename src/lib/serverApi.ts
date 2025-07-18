import { auth } from '@clerk/nextjs/server';

interface ServerApiProps<TParams = Record<string, unknown>> {
  path: string;
  params?: TParams;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  revalidate?: number;
  cache?: RequestCache;
  body?: string | object | null;
  requiresAuth?: boolean;
}

export type ServerApiResponse<T> = {
  data?: T;
  message?: string;
  status?: number;
  details?: string;
};

export const serverApi = async <
  TResponse = unknown,
  TParams = Record<string, unknown>,
>(
  props: ServerApiProps<TParams>,
): Promise<ServerApiResponse<TResponse>> => {
  const {
    path,
    params,
    method = 'GET',
    revalidate = 60,
    cache = 'default',
    body,
    requiresAuth = false,
  } = props;

  let token: string | undefined;

  if (requiresAuth) {
    try {
      const session = await auth();
      if (!session || !session.userId) {
        console.error(`Unauthorized: No user session ${path}`);
        return { status: 401, message: 'Unauthorized: No user session' };
      }
      
      // Get the raw token from the Authorization header
      const authHeader = await session.getToken();
      if (!authHeader) {
        console.error(`Unauthorized: Token is null ${path}`);
        return { status: 401, message: 'Unauthorized: Token is null' };
      }
      token = authHeader;

      if (!token) {
        console.error(`Unauthorized: No token ${path}`);
        return { status: 401, message: 'Unauthorized: No token' };
      }
    } catch (error) {
      console.error(`Unauthorized: Token fetch failed ${path}`, error);
      return { status: 401, message: 'Unauthorized: Token fetch failed' };
    }
  }

  let parametersString = '';
  if (params) {
    const stringifiedParams = Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)]);
    parametersString = `?${new URLSearchParams(stringifiedParams).toString()}`;
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${path}${parametersString}`,
      {
        method,
        headers: {
          ...(token && { Authorization: `Bearer ${token}` }),
          ...(typeof body === 'object' &&
            body !== null && { 'Content-Type': 'application/json' }),
        },
        body:
          typeof body === 'object' && body !== null
            ? JSON.stringify(body)
            : (body as BodyInit | null | undefined),
        next: { revalidate },
        cache,
      },
    );

    if (res.status === 401) {
      console.error(`Unauthorized`);
      return { status: 401, message: 'Unauthorized' };
    }

    if (!res.ok) {
      console.error(
        `Fetch message: ${res.statusText}. Fetch failed for ${path}`,
      );
      return {
        status: res.status,
        message: `Fetch message: ${res.statusText}`,
      };
    }

    const contentType = res.headers.get('content-type');
    if (contentType) {
      if (contentType.includes('application/json')) {
        const data = (await res.json()) as TResponse;
        return { data };
      } else if (contentType.includes('text/plain')) {
        const text = await res.text();
        return { data: text as unknown as TResponse };
      }
    }
    console.error(`Unexpected content type: ${contentType}`);
    return {
      status: 500,
      message: `Unexpected content type: ${contentType}`,
    };
  } catch (error) {
    console.error(`serverApi: Fetch failed for ${path}`, error);
    return { status: 500, message: 'Network or server error' };
  }
};
